//Array de la secuencia de paneles mostradas y por adivinar, puntaje, nivel y si se puede clickear
let score = 0;
let level = 1;
let sequence = [];
let sequenceToGuess = [];
let canClick = false; 

// Elementos del DOM, paneles, botones, displays, score, etc
const topLeft = document.getElementById('yellow');
const topRight = document.getElementById('green');
const bottomLeft = document.getElementById('blue');
const bottomRight = document.getElementById('red');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

// Sonidos
const losingSound = new Audio('sounds/losing_sound_effect.mp3');
const backgroundMusic = new Audio('sounds/background_music.mp3');
const lightGreensound = new Audio('sounds/green.mp3');
const lightYellowsound = new Audio('sounds/yellow.mp3');
const lightRedsound = new Audio('sounds/red.mp3');
const lightBluesound = new Audio('sounds/blue.mp3');

// Configurar la música de fondo para que se repita
backgroundMusic.loop = true;

// Funciones para reproducir sonidos
const playLosingSound = () => {
    losingSound.play();
};

const playBackgroundMusic = () => {
    backgroundMusic.play();
};

const stopBackgroundMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
};      

// Mostrar el leaderboard en el juego
const displayGameLeaderboard = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardContent = document.getElementById('leaderboardContent');
    leaderboardContent.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        leaderboardContent.appendChild(row);
    });
};

// Función para ir a la página de inicio
const goToLandingPage = () => {
    window.location.href = 'index.html';
};

// Función para obtener un panel aleatorio
const getRandomPanel = () => {
    const panels = [topLeft, topRight, bottomLeft, bottomRight];
    return panels[parseInt(Math.random() * panels.length)];
}

// Función para iluminar un panel
const flash = (panel) => {
    return new Promise((resolve) => {
        switch (panel.id) {
            case 'green':
                lightGreensound.currentTime = 0;
                lightGreensound.play();
                break;
            case 'yellow':
                lightYellowsound.currentTime = 0;
                lightYellowsound.play();
                break;
            case 'red':
                lightRedsound.currentTime = 0;
                lightRedsound.play();
                break;
            case 'blue':
                lightBluesound.currentTime = 0;
                lightBluesound.play();
                break;
        }
        panel.classList.add('active'); 
        setTimeout(() => {
            panel.classList.remove('active');
            setTimeout(resolve, 350);
        }, 400);
    });
};

// Función para mostrar popup del juego y llevar el puntaje, nivel, sonidos, etc
const panelClicked = (panel) => {
    if (!canClick) return;
    switch (panel.id) {
        case 'green':
            lightGreensound.currentTime = 0;
            lightGreensound.play();
            break;
        case 'yellow':
            lightYellowsound.currentTime = 0;
            lightYellowsound.play();
            break;
        case 'red':
            lightRedsound.currentTime = 0;
            lightRedsound.play();
            break;
        case 'blue':
            lightBluesound.currentTime = 0;
            lightBluesound.play();
            break;
    }
    flash(panel);
    const expectedPanel = sequenceToGuess.shift();

    if (expectedPanel.id === panel.id) {
        if (sequenceToGuess.length === 0) {
            score += 100; 
            level += 1; 
            scoreDisplay.textContent = score; 
            levelDisplay.textContent = level; 
            setTimeout(nextRound, 1200); 
        }
    } else {
        playLosingSound(); 
        showPopup('Perdiste el juego');
    }
};

//Función del popup si perdiste y cerrarlo
const showPopup = (message) => {
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('losePopup').style.display = 'block';
    canClick = false; 
    stopBackgroundMusic(); 
    saveScore(); 
};

// Función para cerrar el popup
const closePopup = () => {
    document.getElementById('losePopup').style.display = 'none';
};


//Función para empezar la secuencia de paneles
const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence) {
        await flash(panel);
    }
    canClick = true; 
};

// Función para empezar la secuencia de paneles
const startGame = () => {
    stopBackgroundMusic(); 
    playBackgroundMusic(); 
    score = 0; 
    level = 1; 
    scoreDisplay.textContent = score; 
    sequence = [getRandomPanel()];
    sequenceToGuess = [...sequence];
    startFlashing();
};

// Iniciar la siguiente ronda
const nextRound = () => {
    sequence.push(getRandomPanel());
    sequenceToGuess = [...sequence];
    startFlashing();
};

// Reiniciar el juego
const resetGame = () => {
    stopBackgroundMusic(); 
    closePopup();
    setTimeout(startGame, 2000); 
};

// Boton de reinicio dentro del juego
document.getElementById('resetButton').addEventListener('click', () => {
    canClick = false; 
    clearSequence(); 
    setTimeout(() => {
        startGame(); 
    }, 2000);
});

// Detener secuencia
const clearSequence = () => {
    sequence = [];
    sequenceToGuess = [];
    scoreDisplay.textContent = score; 
    levelDisplay.textContent = level; 
};

//Función para guardar el puntaje en el local storage
const saveScore = () => {
    const playerName = localStorage.getItem('playerName');
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []; 
    const existingPlayerIndex = leaderboard.findIndex(entry => entry.name === playerName); 

    if (existingPlayerIndex !== -1) {
        if (leaderboard[existingPlayerIndex].score < score) {
            leaderboard[existingPlayerIndex].score = score;
        }
    } else {
        leaderboard.push({ name: playerName, score: score });
    }
    const top5 = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(top5));
};


// Función para empezar a iluminar los paneles
displayGameLeaderboard();


// Asignar un evento cuando se clickea uno de los paneles
topLeft.addEventListener('click', () => panelClicked(topLeft));
topRight.addEventListener('click', () => panelClicked(topRight));
bottomLeft.addEventListener('click', () => panelClicked(bottomLeft));
bottomRight.addEventListener('click', () => panelClicked(bottomRight));


