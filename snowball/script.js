const canvas = document.getElementById("canvas");
const btn = document.getElementById("btn");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let maxLevel = 5, 
    branches = 2;
const ctx = canvas.getContext('2d');
ctx.translate(canvas.width / 2, canvas.height / 2);

const spread = (Math.random() * 48) + 0.51;
const angle = Math.PI * 2 * spread;
let sides = Math.floor((Math.random() * 10 ) + 3)
const drawLine = (level) => {
    if(level > maxLevel) return;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(100, 0);
    ctx.stroke();

    for(let i = 1; i < branches + 1; i++){
        ctx.save();
        ctx.translate(200 * i / (branches + 1), 0);
        ctx.scale(0.5, 0.5);
        ctx.save();

        ctx.rotate(angle);
        drawLine(level + 1);
        ctx.restore();
        ctx.save();

        ctx.rotate(-angle);
        drawLine(level + 1);
        ctx.restore();

        ctx.restore();
    }

}
for(let i = 0; i < sides; i++){
    drawLine(0);    
    ctx.rotate(Math.PI * 2 / sides)
}

function generateRandomTree(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let centerPointX = canvas.width / 2;
    let len = Math.floor((Math.random() * 2) + 100);
    let angle = 0;
    let branchWidth = (Math.random() * 70) + 1;
    let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    let color2 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    curve = (Math.random() * 20) + 2;
    curve2 = Math.random() * 50;
    btn.style.backgroundColor = color;
    drawTree(centerPointX, canvas.height - 80,len, angle, branchWidth, color, color2);
}

btn.addEventListener("click", generateRandomTree)