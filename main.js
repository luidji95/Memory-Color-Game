import './style.css'




const gridDiv = document.querySelector('.grid-div');
const easy = document.querySelector('.easy');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');
const result = document.querySelector('.result');

class Color {
    constructor(color){
        this.color = color;
    }

}

class MemoryGameCreator {
    constructor(){
        this.Colors = [];
        this.counter = 0;
        this.rounds = 9;
    }

    generateRandomColor(){
        this.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return this.randomColor;
    }

    addColor(color){
        if (!this.Colors.some(c => c.color === color)) {
            const newColor = new Color(color);
            newColor.changeClickedStatus();
            this.Colors.push(newColor);
        } else {
            alert('The game is over! You clicked the same color twice.');
        }
    }

    
    getCounter(){
        return this.counter;
    }

    increaseCounter(){
        this.counter++;
    }

    getRounds(){
        return this.rounds;
    }

    setRounds(rounds){
        this.rounds = rounds;
    }

    shuffleColors() {
        const colors = this.Colors.map(c => c.color);
        this.shuffleArray(colors);
        this.Colors.forEach((c, i) => c.color = colors[i]);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

const game = new MemoryGameCreator();

function createGrid(size){
    gridDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    gridDiv.innerHTML = "";

    const initialColors = [];

    for(let i=0; i<size*size; i++){
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        const color = game.generateRandomColor();
        cell.style.backgroundColor = color;
        initialColors.push(color);
        gridDiv.appendChild(cell);

        cell.addEventListener('click', (ev) => {
            if (game.getCounter() < game.getRounds()) {
                let color = ev.target.style.backgroundColor;
                game.addColor(color);
                game.increaseCounter();
                result.innerHTML = `${game.getCounter()} / ${game.getRounds()}`;
                console.log('Clicked color:', game.Colors);

                if (game.getCounter() === game.getRounds()) {
                    alert('Congratulations! You have completed all rounds.');
                }

                game.shuffleArray(initialColors); 
                applyShuffledColors(initialColors);
            }
        });
    }
}

function applyShuffledColors(colors) {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell, index) => {
        cell.style.backgroundColor = colors[index % colors.length];
    });
}

createGrid(3);

easy.addEventListener('click', () => {
    game.setRounds(9);
    game.counter = 0;
    game.Colors = [];
    createGrid(3);
    result.innerHTML = `0 / ${game.getRounds()}`;
});

medium.addEventListener('click', () => {
    game.setRounds(18);
    game.counter = 0;
    game.Colors = [];
    createGrid(4);
    result.innerHTML = `0 / ${game.getRounds()}`;
});

hard.addEventListener('click', () => {
    game.setRounds(25);
    game.counter = 0;
    game.Colors = [];
    createGrid(5);
    result.innerHTML = `0 / ${game.getRounds()}`;
});














