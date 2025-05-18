class SandHill {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = random(5, 25);
        this.b = random(0.01, 0.03);
        this.strokeColor = color(random(190, 255), random(80, 150), 0, 255);
        this.noiseScale = random(10, 30);
        this.numSpirals = 1; // Immer nur eine Spirale
        this.strokeWeight = random(4, 8);
        this.startOffset = random(0, TWO_PI);
    }

    display() {
        push();
        translate(this.x, this.y);
        noFill();

        // let numSpirals = Math.floor(random(1, 5)); // Entferne die zufällige Anzahl

        for (let i = 0; i < this.numSpirals; i++) { // Verwende this.numSpirals
            let tempA = this.a + random(-1, 1);
            let tempB = this.b + random(-0.0001, 0.0001);
            let tempNoiseScale = this.noiseScale + random(-1, 1);
            let tempStrokeColor = color(red(this.strokeColor), green(this.strokeColor), blue(this.strokeColor), alpha(this.strokeColor));

            stroke(tempStrokeColor);
            strokeWeight(this.strokeWeight);
            beginShape();
            for (let theta = this.startOffset; theta < 8 * TWO_PI + this.startOffset; theta += 0.01) {
                let r = tempA * Math.exp(tempB * theta);
                let x = r * Math.cos(theta) + noise(theta) * tempNoiseScale;
                let y = r * Math.sin(theta) + noise(theta) * tempNoiseScale;
                vertex(x, y);
            }
            endShape();

            // Zeichne einen Punkt in der Nähe der Spirale, aber nicht zu nah
            let minDistance = 70; // Mindestabstand vom Zentrum erhöht
            let maxDistance = 100; // Maximaler Abstand vom Zentrum

            let angle = random(TWO_PI);
            let distance = random(minDistance, maxDistance);

            let pointX = distance * cos(angle);
            let pointY = distance * sin(angle);

            fill(0);
            noStroke();
            ellipse(pointX, pointY, 10, 10);

            noFill();
            stroke(tempStrokeColor);
        }

        pop();
    }
}

function setup() {
    const canvas = createCanvas(500, 500);
    canvas.parent("sketch");
    background(250, 190, 10, 190);

    let x = 25;
    while (x < width) {
        let y = 25;
        while (y < height) {
            let sandHill = new SandHill(x + random(-10, 10), y + random(-10, 10));
            sandHill.display();
            y += random(100, 300);
        }
        x += random(100, 300);
    }
}

function draw() { }