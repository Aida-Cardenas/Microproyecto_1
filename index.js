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
    return panels[parseInt(Math.random() * panels.length)]
}

// Constantes de la secuencia
const sequence = [
    getRandomPanel(),
    getRandomPanel(),
    getRandomPanel(),
    getRandomPanel()
];

const flash = (panel) => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(' active','');
            setTimeout(() => {
                resolve();
            }, 250);
        }, 1000)
    });
};

const main = async () => {
    for (let panel of sequence) {
        await flash(panel);
    }
};

main();
