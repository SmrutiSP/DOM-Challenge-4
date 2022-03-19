const grid = document.querySelector('.grid');
const score = document.querySelector('.score');
const defaultRows = 4, defaultCols = 4;
let rows = defaultRows,cols = defaultCols;

function formGrid(r,c) {
    const ans = randomDivPicker(r,c);
    const hsl = randomColorGenerator();
    for(let i=1;i<=c*r;i++) {
        const div = document.createElement('div');
        if(ans===i) {
            div.addEventListener('click',rightAnsChosen);
            div.style.backgroundColor=`hsl(${hsl[0]},${hsl[1]}%,${hsl[2]-10}%)`;
            div.style.cursor = 'pointer';
        } else {
            div.addEventListener('click',wrongAnsChosen);
            div.style.backgroundColor=`hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
            div.style.cursor = 'pointer';
        }
        grid.appendChild(div);
    }
}

function updateScore(verdict) {
    const currScore = +score.textContent.split(' ')[2];
    if(verdict) score.textContent = `Score : ${currScore+1}`;
    else score.textContent = `Score : ${0}`;
}

function rightAnsChosen() {
    rows = rows+1;
    cols = cols+1;
    grid.innerHTML="";
    grid.style.gridTemplateRows = `repeat(${rows},1fr)`;
    grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    formGrid(rows,cols);
    updateScore(true);
}

function wrongAnsChosen() {
    rows = defaultRows;
    cols = defaultCols;
    grid.classList.add('animation');
    setTimeout(()=>{
        grid.innerHTML = "";
        grid.style.gridTemplateRows = `repeat(${rows},1fr)`;
        grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
        formGrid(rows,cols);
        updateScore(false);
        grid.classList.remove('animation');
    },500);
}

function randomDivPicker(r,c) {
    return Math.ceil(Math.random()*(r*c));
}

function randomColorGenerator() {
    const hue = Math.ceil(Math.random()*360);
    const saturation = Math.ceil(Math.random()*100);
    const lightness = Math.ceil(Math.random()*100);
    return [hue,saturation,lightness];
}