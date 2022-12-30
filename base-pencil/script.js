const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: null,
    y: null,
}

canvas.addEventListener("click", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
});

canvas.addEventListener("mousemove", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

class Particle {
    constructor(){
        // this.x = mouse.x;
        // this.y = mouse.y;       
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.width;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();
    }
}

const handleParticle = () => {
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
    }
}

const init = () => {
    for(let i = 0; i < 100; i++){
        particleArray.push(new Particle)
    }
}

init();

const animate = ()=>{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handleParticle()
    requestAnimationFrame(animate);
}

animate()