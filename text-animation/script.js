const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 70;

let particleArray = [];
const mouse = {
    x: null,
    y: null
}

let textCoordinates;
const config = {
    x: 2,
    y: -6,
    "space-x": 20,
    "space-y": 20,
    fontSize: 16,
    radius: 100,
    text: "TEXT"
}

document.getElementById("canvas").addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y - 70;
});



class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;
    }

    draw(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt( dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = config.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        

        if(distance < config.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}

const init = () => {
    ctx.fillStyle = "white";
    ctx.font = `${config.fontSize}px sans-serif`;

    ctx.fillText(config.text, 0, 30, canvas.width);
    textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

    particleArray = [];

    for(let y = 0; y <  textCoordinates.height; y++){
        for(let x = 0; x < textCoordinates.width; x++){
            const index = (y * 4 * textCoordinates.width) + (x * 4) + 3;
            if(textCoordinates.data[index] > 128){
                const posX = (x + config.x) * config["space-x"];
                const posY = (y + config.y) * config["space-y"];
                particleArray.push(new Particle(posX, posY))
            }
        }
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw()
        particleArray[i].update()
    }
  //  conectPacticle()
    requestAnimationFrame(animate)
}

const conectPacticle = () => {
    for(let a = 0; a < particleArray.length; a++){
        let dx = particleArray[a].x;
        let dy = particleArray[a].y;
        let distance = Math.sqrt( dx * dx + dy * dy);
        console.log( distance)

        // if(distance <= 40){
        //     ctx.strokeStyle = "white";
        //     ctx.lineWidth = 2;
        //     ctx.beginPath();
        //     ctx.moveTo( particleArray[a].x,  particleArray[a].y);
        //     ctx.lineTo( particleArray[b].x,  particleArray[b].y);
        //     ctx.stroke();
        // }
    }
}

const addHeaderButtons = () => {
    const navBar = document.getElementById("btns");
    const btnsRange = [
        {title: "Font Size", value: 30, max:100, min: 1, name: "fontSize"},
        {title: "Space X", value: 20, max:50, min: 1, name: "space-x"},
        {title: "Space Y", value: 20, max:50, min: 1, name: "space-y"},
        {title: "X", value: 0, max:50, min:-50, name: "x"},
        {title: "Y", value: 0, max:50, min:-50, name: "y"},
        {title: "Mouse range", value: config.radius, max:150, min:20, name: "radius"},
    ]

    btnsRange.map(el => {
        const container = document.createElement("div");
        const input = document.createElement("input");
        input.value = el.value;
        input.type = "range";
        input.max = el.max;
        input.min = el.min;
        const title = document.createElement("span");
        title.innerHTML = el.title;
        const valueOutput = document.createElement("span");
        valueOutput.innerHTML = config[el.name];

        container.appendChild(title);
        container.appendChild(input);
        container.appendChild(valueOutput);

        navBar.appendChild(container)     

        input.addEventListener("input", function(e){
            config[el.name] = parseInt(e.target.value);
            valueOutput.innerHTML = config[el.name]
            init()
        }) 
    })
    

    const container = document.createElement("div");
    const input = document.createElement("input");
    input.value = config.text;
    input.type = "text";
    const title = document.createElement("span");
    title.innerHTML = "Output";

    container.appendChild(title);
    container.appendChild(input);
    navBar.appendChild(container)     

    input.addEventListener("input", function(e){
        config.text =e.target.value;
        init()
    }) 

    
}

addHeaderButtons();
init();
animate()