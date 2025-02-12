const topLeft = document.getElementById('yellow');
const topRight = document.getElementById('green');
const bottomLeft = document.getElementById('blue');
const bottomRight = document.getElementById('red');

// Obtener un panel aleatorio
const getRandomPanel = () => {
    const panels = [
        topLeft, 
        topRight, 
        bottomLeft, 
        bottomRight
    ]
    return panels[parseInt(Math.random() * panels.length)];
}

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

//Iluminar panel
const flash = (panel) => {
    return new Promise((resolve) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(' active','');
            setTimeout(() => {
                resolve();
            }, 500);
        }, 700);
    });
};

const panelClicked = (panel) => {
    flash(panel);
    const expectedPanel = sequenceToGuess.shift(); // Panel que deberia clickear
    // Logica general del juego
    if (expectedPanel.id === panel.id) {
        if (sequenceToGuess.length === 0) {
            // Nueva ronda despues de 2 segundos
            setTimeout(() => {
                sequence.push(getRandomPanel());
                sequenceToGuess = [...sequence];
                startFlashing();
            }, 2000); // Espera entre cada secuencia (dos segundos)
        }
    } else {
        // Mostrar popup "Perdiste el juego"
        showPopup('Perdiste el juego');
    }
};

// Función para mostrar el popup "perdiste"
const showPopup = (message) => {
    const popup = document.getElementById('losePopup');
    const popupContent = popup.querySelector('.losePopup-content p');
    popupContent.textContent = message;
    popup.style.display = 'block'; //Mostrar el popup
};

// Función para cerrar el popup "perdiste"
function closePopup() {
    document.getElementById('losePopup').style.display = 'none';
};

//Controlar si se puede clickear o no
const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence) {
        await flash(panel);
    }
    canClick = true;
};

// Asignar eventos de clic a los paneles
topLeft.addEventListener('click', () => panelClicked(topLeft));
topRight.addEventListener('click', () => panelClicked(topRight));
bottomLeft.addEventListener('click', () => panelClicked(bottomLeft));
bottomRight.addEventListener('click', () => panelClicked(bottomRight));

startFlashing();
