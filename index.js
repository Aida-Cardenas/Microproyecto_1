//Crear array de la secuencia, la secuencia a adivinar, score y nivel
let score = 0;
let level = 1;
let sequence = [];
let sequenceToGuess = [];
let canClick = false; // Controlar si el jugador puede hacer clic

// Paneles, score y lvl
const topLeft = document.getElementById('yellow');
const topRight = document.getElementById('green');
const bottomLeft = document.getElementById('blue');
const bottomRight = document.getElementById('red');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

// goofy ahh sounds
const losingSound = new Audio('sounds/losing_sound_effect.mp3');
const lightPanelSound = new Audio('sounds/light_panel_sound.mp3');
const clickPanelSound = new Audio('sounds/click_panel_sound.mp3');
const backgroundMusic = new Audio('sounds/background_music.mp3');

// Configurar la música de fondo para que se repita y vivas eternamente en el ascensor
backgroundMusic.loop = true;

// Funciones para reproducir sonidos
    // Sonido de perder
    const playLosingSound = () => {
        losingSound.play();
    };

    // Iluminar panel
    const playLightPanelSound = () => {
        lightPanelSound.play();
    };

    // Click en panel
    const playClickPanelSound = () => {
        clickPanelSound.play();
    };

    // Iniciar musica de fondo
    const playBackgroundMusic = () => {
        backgroundMusic.play();
    };

    // Detener musica de fondo y reiniciarla
    const stopBackgroundMusic = () => {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // reiniciar, por si no lo viste en el titulo
    };

// Obtener un panel aleatorio
const getRandomPanel = () => {
    const panels = [
        topLeft, 
        topRight, 
        bottomLeft, 
        bottomRight];
    return panels[parseInt(Math.random() * panels.length)];
};

//Iluminar panel
const flash = (panel) => {
    return new Promise((resolve) => {
        playLightPanelSound(); // sonido iluminar panel
        panel.classList.add('active'); 
        setTimeout(() => {
            panel.classList.remove('active');
            setTimeout(resolve, 300);
        }, 500);
    });
};

//Basicamente the fucking game
const panelClicked = (panel) => {
    if (!canClick) return;
    playClickPanelSound(); // sonido click panel
    flash(panel);
    const expectedPanel = sequenceToGuess.shift();

    if (expectedPanel.id === panel.id) {
        if (sequenceToGuess.length === 0) {
            score += 100; // sumar 100 puntos
            level += 1; // subir de nivel
            scoreDisplay.textContent = score; // mostrar puntuacion
            levelDisplay.textContent = level; // mostrar nivel
            setTimeout(nextRound, 1500); // esperar 1.5 segundos y empezar la siguiente ronda
        }
    } else {
        playLosingSound(); // sonido perder
        showPopup('Perdiste el juego');
    }
};

//mostrar popup si perdiste y cerrarlo
const showPopup = (message) => {
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('losePopup').style.display = 'block';
    canClick = false; //no clicks al perder
    stopBackgroundMusic(); // detener la música de fondo
};
const closePopup = () => {
    document.getElementById('losePopup').style.display = 'none';
};

//empezar la secuencia de paneles
const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence) {
        await flash(panel);
    }
    canClick = true; // dejar que se pueda clickear
};

// Boton Iniciar el juego
const startGame = () => {
    stopBackgroundMusic(); // detener musica de fondo si estaba sonando
    playBackgroundMusic(); // iniciar musica de fondo
    score = 0; // reinicio puntuacion
    level = 1; // reinicio nivel
    scoreDisplay.textContent = score; //mostrar score reiniciado
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
    stopBackgroundMusic(); // detener musica de fondo
    closePopup();
    setTimeout(startGame, 2000); // espera de dos segundos para que no empiece de un solo coñazo
};

// Boton de reinicio dentro del juego
document.getElementById('resetButton').addEventListener('click', () => {
    canClick = false; // no permitir clickear mientras se reinicia
    clearSequence(); // detener secuencia que se estaba mostrando
    setTimeout(() => {
        startGame(); // espera de dos segundos para empezar otro juego
    }, 2000);
});

// Detener secuencia
const clearSequence = () => {
    // limpiar secuencia y que no se muestre mas
    sequence = [];
    sequenceToGuess = [];
    scoreDisplay.textContent = score; // para no perder la puntuacion actual
    levelDisplay.textContent = level; // para no perder el nivel actual
};


// Asignar un evento cuando se clickea uno de los paneles
topLeft.addEventListener('click', () => panelClicked(topLeft));
topRight.addEventListener('click', () => panelClicked(topRight));
bottomLeft.addEventListener('click', () => panelClicked(bottomLeft));
bottomRight.addEventListener('click', () => panelClicked(bottomRight));

