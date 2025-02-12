const topLeft = document.getElementById('yellow');
const topRight = document.getElementById('green');
const bottomLeft = document.getElementById('blue');
const bottomRight = document.getElementById('red');

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

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = (panel) => {
    return new Promise((resolve) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(' active','');
            setTimeout(() => {
                resolve();
            }, 700);
        }, 700);
    });
};

const panelClicked = (panel) => {
    flash(panel);
    const expectedPanel = sequenceToGuess.shift(); //panel que deberia clickear
    // lógica del juego
    if (expectedPanel.id === panel.id) {
        if (sequenceToGuess.length === 0) {
            // nueva ronda después de 2 segundos
            setTimeout(() => {
                sequence.push(getRandomPanel());
                sequenceToGuess = [...sequence];
                startFlashing();
            }, 2000); // Espera entre cada secuencia (dos segundos)
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
