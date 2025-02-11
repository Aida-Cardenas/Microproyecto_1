const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');

// Sacar un panel random
const getRandomPanel = () => {
    const panels = [
        topLeft, 
        topRight, 
        bottomLeft, 
        bottomRight
    ]
    return panels[parseInt(Math.random() * panels.length)];
}

// Constantes de la secuencia
const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = (panel) => {
    return new Promise((resolve) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(' active','');
            setTimeout(() => {
                resolve();
            }, 250);
        }, 700);
    });
};

let canClick = false;
const panelClicked = (panel) => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    // lógica del juego
    if (expectedPanel === panel) {
        if (sequenceToGuess.length === 0) {
            // nueva ronda
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            startFlashing();
        }
    } else {
        // perdiste
        alert('perdiste :c');
    }
};

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
