// Import code from node modules
import * as THREE from "three";
// Import local code
import * as UTIL from "./Utilities";


// Abstract base class for generating roulette curves
abstract class RouletteCurve {
    radiusOne: number;
    radiusTwo: number;
    distance: number;
    stretch: number;
    scale: number;

    constructor(radiusOne: number, radiusTwo: number, distance: number, stretch: number, scale: number) {
        this.radiusOne = radiusOne;
        this.radiusTwo = radiusTwo;
        this.distance = distance;
        this.stretch = stretch;
        this.scale = scale;
    }

    abstract getPoint(t: number): THREE.Vector3;

    getPoints(n: number, multiplier: number): Array<THREE.Vector3> {
        var array = new Array<THREE.Vector3>(multiplier * n + 1);
        for (let index = 0; index < array.length; index++) {
            array[index] = this.getPoint(index / n);
        }
        return array;
    }
}

// Routlette curve: Hypotrochoid
class Hypotrochoid extends RouletteCurve {
    radiusDifference: number;

    constructor(radiusOne: number, radiusTwo: number, distance: number, stretch: number, scale: number) {
        super(radiusOne, radiusTwo, distance, stretch, scale);
        this.radiusDifference = radiusOne - radiusTwo; 
    }

    // Extend abstract base class
    getPoint(t: number) {
        // Main formulas for generating a hypotrochoid curve
        var angle = t * 360;
        var tx = this.radiusDifference * Math.cos(angle) + this.distance * Math.cos(this.radiusDifference * angle / this.radiusTwo);
        var ty = this.radiusDifference * Math.sin(angle) + this.distance * Math.sin(this.radiusDifference * angle / this.radiusTwo);
        var tz = t * this.stretch;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    }

}

// Roulette curve: Hypotrochoid
class Epitrochoid extends RouletteCurve {
    radiusSum: number;

    constructor(radiusOne: number, radiusTwo: number, distance: number, stretch: number, scale: number) {
        super(radiusOne, radiusTwo, distance, stretch, scale);
        this.radiusSum = radiusOne + radiusTwo; 
    }

    // Extend abstract base class
    getPoint(t: number) {
        // Main formulas for generating a epitrochoid curve
        var angle = t * 360;
        var tx = this.radiusSum * Math.cos(angle) - this.distance * Math.cos(this.radiusSum * angle / this.radiusTwo);
        var ty = this.radiusSum * Math.sin(angle) - this.distance * Math.sin(this.radiusSum * angle / this.radiusTwo);
        var tz = t * this.stretch;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    }
}

export default class Shape {

    // Variables: Pertaining to the scene where the main shape is rendered and shown 
    scene: THREE.Scene;
    geom: THREE.BufferGeometry;
    mat: THREE.LineBasicMaterial;

    // Variables: Pertaining to the main shape which is rendered and shown in a scene
    line: THREE.Line;
    // All the parameters needed to generate a certain shape
    radiusOne: number;
    radiusTwo: number;
    distance: number;
    stretch: number;
    scale: number;
    type: number; // 0: Hypotrochoide curve, 1: Epitrochoid curve
    segments: number;
    segmentMultiplier: number;

    // Variable: The material, which the main shape is made up of
    opacity: number;

    // Variables: Pertaining to the continuous update of a certain shape
    radiusOneIncrement: number;
    radiusTwoIncrement: number;
    distanceIncrement: number;
    stretchIncrement: number;

    // Variable: Shape parameters
    shapeParameters: UTIL.ShapeParameters;

    // Variable: Shape material parameters 
    shapeMaterialParameters: UTIL.ShapeMaterialParameters;

    // Class constructor
    constructor(parentScene: THREE.Scene, shapeParameters: UTIL.ShapeParameters, shapeMaterialParameters: UTIL.ShapeMaterialParameters) {
        this.shapeParameters = shapeParameters;
        this.shapeMaterialParameters = shapeMaterialParameters;
        this.scene = parentScene;

        // Set some default values. These will subsequently be overwritten by a preset
        this.radiusOne = 0;
        this.radiusTwo = 0;
        this.distance = 0;
        this.stretch = 0;
        this.scale = 0;
        this.type = 0;
        this.segments = 0;
        this.segmentMultiplier = 0;

        this.opacity = 0;

        this.radiusOneIncrement = 0;
        this.radiusTwoIncrement = 0;
        this.distanceIncrement = 0;
        this.stretchIncrement = 0;
    }

    removeShape(): void {
        if (this.line !== undefined) {
            // Remove the actual rendered shape
            if (this.line.geometry) {
                this.line.geometry.dispose();
                this.line.geometry = undefined;
            }
            if (this.line.material) {
                // Do nothing. Reuse material for
                // the next shape that is rendered
            }
        }
        this.scene.remove(this.line);
    }

    drawShape(): void {
        var curve;
        // Generate shape data
        console.log("Type: " + this.type);
        if (this.type == 0) {
            console.log("---> Drawing Hypotrochoid " + this.type);
            curve = new Hypotrochoid(
                this.radiusOne,
                this.radiusTwo,
                this.distance, 
                this.stretch,
                this.scale,
            );
        } else if (this.type == 1) {
            console.log("---> Drawing Epitrochoid " + this.type);
            curve = new Epitrochoid(
                this.radiusOne,
                this.radiusTwo,
                this.distance, 
                this.stretch,
                this.scale,
            );
        }
        var points = curve.getPoints(this.segments, this.segmentMultiplier);
        this.geom = new THREE.BufferGeometry().setFromPoints(points);
        this.mat = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 1});
        this.mat.transparent = true;
        this.mat.opacity = this.opacity;
        // Create and add the main shape object to the scene
        this.line = new THREE.Line(this.geom, this.mat);
        this.scene.add(this.line);
    }

    update(secs: number): void {
        this.radiusOne = (this.radiusOne + this.radiusOneIncrement * secs) % this.shapeParameters.radiusOne_max;
        this.radiusTwo = (this.radiusTwo + this.radiusTwoIncrement * secs) % this.shapeParameters.radiusTwo_max;
        this.distance = (this.distance + this.distanceIncrement * secs) % this.shapeParameters.distance_max;
        this.stretch = (this.stretch + this.stretchIncrement * secs) % this.shapeParameters.stretch_max;
        this.removeShape(); this.drawShape();
    }
}