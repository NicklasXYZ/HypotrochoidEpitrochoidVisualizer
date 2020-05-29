import View from "./webgl/View";

class App {
    private view: View;

    constructor() {
        const canvasBox = <HTMLCanvasElement>document.getElementById("canvas");
        this.view = new View(canvasBox);

        window.addEventListener("resize", this.resize);
        this.update(0);
    }

    resize = (): void => {
        this.view.onWindowResize(window.innerWidth, window.innerHeight);
    }

    update = (t: number): void => {
        this.view.update(0.0001);
        requestAnimationFrame(this.update);
    }
}

const app = new App();
