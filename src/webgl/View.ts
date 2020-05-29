// Import code from node modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as DAT from "dat.gui";
// Import local code
import * as UTIL from "./Utilities";
import Shape from "./Shape";


// Main class. This is the topmost class!
export default class View {
    // Variables: scene, camera and renderer
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    SCREEN_WIDTH: number;
    SCREEN_HEIGHT: number;
    ASPECT: number;
    VIEW_ANGLE: number;
    NEAR: number;
    FAR: number;
    CAMERA_Z: number;

    // Variables: camera and GUI controls
    controls: OrbitControls;
    gui: DAT.GUI;

    // Variable: The main object which is renderered in the scene
    shape: Shape;

    // Variable: Whether the rendered shape should be continuously updated
    animate: boolean;

    // Variables: GUI option folders
    f1: DAT.GUI; // Contains shape parameter settings
    f2: DAT.GUI; // Contains shape material settings
    f3: DAT.GUI; // Contains shape animation settings
    f4: DAT.GUI; // Contains different presets

    // Variable: Shape parameters
    shapeParameters: UTIL.ShapeParameters;

    // Variable: Shape material parameters 
    shapeMaterialParameters: UTIL.ShapeMaterialParameters;

    // Variables: Shape animation parameters
    shapeAnimationParameters: UTIL.ShapeAnimationParameters;

    // Class constructor
    constructor(canvasElem: HTMLCanvasElement) {
        // Set default values for the scene and camera
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.ASPECT = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
        this.VIEW_ANGLE = 45;
        this.NEAR = 0.1;
        this.FAR = 500;
        this.CAMERA_Z = 2;

        // Setup: scene and camera
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.TextureLoader().load("./textures/background.png");
        this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
        this.camera.position.z = this.CAMERA_Z;

        // Setup: renderer - to eventually be able to render the scene with an added shape
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            antialias: true,
        });

        // Setup: camera controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Intialize essential parameter values
        this.shapeParameters = UTIL.initialzeShapeParameters();
        this.shapeMaterialParameters = UTIL.initialzeShapeMaterialParameters();
        this.shapeAnimationParameters = UTIL.initialzeShapeAnimationParameters();
        this.animate = true;

        // Setup: create a shape to add to the scene
        this.shape = new Shape(this.scene, this.shapeParameters, this.shapeMaterialParameters);
        // this.shape.drawShape();

        // Setup: a GUI for the different options and shape parameter settings 
        this.setupGUI();

        // Setup: the initial canvas size
        this.onWindowResize(window.innerWidth, window.innerHeight);
    }

    resetCamera(): void {
        // Setup: new camera object
        this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
        this.camera.position.z = this.CAMERA_Z;
        this.scene.add(this.camera);
        // Dispose of the old camera controls
        this.controls.dispose();
        // Setup: new camera controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    setupGUI(): void {
        // Setup: new GUI object
        this.gui = new DAT.GUI();

        // Create folders for each group of settings and options
        this.f1 = this.gui.addFolder("Shape parameters");
        this.f2 = this.gui.addFolder("Material options");
        this.f3 = this.gui.addFolder("Animation options");
        this.f4 = this.gui.addFolder("Presets");

        //// Define all user-configurable settings

        // Folder f1: Shape parameters
        this.shapeParameters.gui_shapeType = this.f1.add(
            this.shape, "type", // Object, Object.property
            {Hypotrochoid: 0, Epitrochoid: 1}, // Choices
        );
        this.shapeParameters.gui_shapeType.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_radiusOne = this.f1.add(
            this.shape, "radiusOne", // Object, Object.property
            this.shapeParameters.radiusOne_min, this.shapeParameters.radiusOne_max,
            this.shapeParameters.radiusOne_step,
        ).name("radiusOne");
        this.shapeParameters.gui_radiusOne.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_radiusTwo = this.f1.add(
            this.shape, "radiusTwo", // Object, Object.property
            this.shapeParameters.radiusTwo_min, this.shapeParameters.radiusTwo_max,
            this.shapeParameters.radiusTwo_step,
        ).name("radiusTwo");
        this.shapeParameters.gui_radiusTwo.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_distance = this.f1.add(
            this.shape, "distance", // Object, Object.property
            this.shapeParameters.distance_min, this.shapeParameters.distance_max,
            this.shapeParameters.distance_step,
        ).name("distance");
        this.shapeParameters.gui_distance.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_stretch = this.f1.add(
            this.shape, "stretch", // Object, Object.property
            this.shapeParameters.stretch_min, this.shapeParameters.stretch_max,
            this.shapeParameters.stretch_step,
        ).name("stretch");
        this.shapeParameters.gui_stretch.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_segments = this.f1.add(
            this.shape, "segments", // Object, Object.property
            this.shapeParameters.segments_min, this.shapeParameters.segments_max,
            this.shapeParameters.segments_step,
        ).name("segments");
        this.shapeParameters.gui_segments.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_segmentMultiplier = this.f1.add(
            this.shape, "segmentMultiplier", // Object, Object.property
            this.shapeParameters.segmentMultiplier_min, this.shapeParameters.segmentMultiplier_max,
            this.shapeParameters.segmentMultiplier_step,
        ).name("segmentMultiplier");
        this.shapeParameters.gui_segmentMultiplier.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        this.shapeParameters.gui_scale = this.f1.add(
            this.shape, "scale", // Object, Object.property
            this.shapeParameters.scale_min, this.shapeParameters.scale_max,
            this.shapeParameters.scale_step,
        ).name("scale");
        this.shapeParameters.gui_scale.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        // Folder f2: Material options
        this.shapeMaterialParameters.gui_opacity = this.f2.add(
            this.shape, "opacity", // Object, Object.property
            this.shapeMaterialParameters.opacity_min, this.shapeMaterialParameters.opacity_max,
            this.shapeMaterialParameters.opacity_step,
        ).name("opacity");
        this.shapeMaterialParameters.gui_opacity.onChange( () => { this.shape.removeShape(); this.shape.drawShape(); } );

        // Folder f3: Animation options
        this.shapeAnimationParameters.gui_radiusOneIncrement = this.f3.add(
            this.shape, "radiusOneIncrement", // Object, Object.property
            this.shapeAnimationParameters.radiusOneIncrement_min, this.shapeAnimationParameters.radiusOneIncrement_max,
            this.shapeAnimationParameters.radiusOneIncrement_step,
        ).name("radiusOne increment");

        this.shapeAnimationParameters.gui_radiusTwoIncrement = this.f3.add(
            this.shape, "radiusTwoIncrement", // Object, Object.property
            this.shapeAnimationParameters.radiusTwoIncrement_min, this.shapeAnimationParameters.radiusTwoIncrement_max,
            this.shapeAnimationParameters.radiusTwoIncrement_step,
        ).name("radiusTwo increment");

        this.shapeAnimationParameters.gui_distanceIncrement = this.f3.add(
            this.shape, "distanceIncrement", // Object, Object.property
            this.shapeAnimationParameters.distanceIncrement_min, this.shapeAnimationParameters.distanceIncrement_max,
            this.shapeAnimationParameters.distanceIncrement_step,
        ).name("distance increment");

        this.shapeAnimationParameters.gui_stretchIncrement = this.f3.add(
            this.shape, "stretchIncrement", // Object, Object.property
            this.shapeAnimationParameters.stretchIncrement_min, this.shapeAnimationParameters.stretchIncrement_max,
            this.shapeAnimationParameters.stretchIncrement_step,
        ).name("stretch increment");

        this.shapeAnimationParameters.gui_animate = this.f3.add(this, "animate").name("animate ");

        // Folder f4: Presets
        var presets = {
            preset01: () => this.preset01(),
            preset02: () => this.preset02(),
            preset03: () => this.preset03(),
        }
        this.f4.add(presets, "preset01" ).name("Preset 01");
        this.f4.add(presets, "preset02" ).name("Preset 02");
        this.f4.add(presets, "preset03" ).name("Preset 03");

        // Define other standalone options
        // Define a couple of "standalone" options
        var parameters = {
            resetCamera:  () => { this.resetCamera(); },
        };
        this.gui.add(parameters, "resetCamera" ).name("Reset camera");

        this.preset01(); // Apply the first preset
    }

    onWindowResize(windowWidth: number, windowHeight: number): void {
        this.renderer.setSize(windowWidth, windowHeight);
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.ASPECT = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
        this.camera.aspect = this.ASPECT;
        this.camera.updateProjectionMatrix();
    }

    updateGUI(): void {
        // Update all shape parameter controllers in the f1 GUI options folder
        for (var i in this.f1.__controllers) {
            this.f1.__controllers[i].updateDisplay();
        }
    }

    update(secs: number): void {
        // If an animation option has been chosen
        // then update the shape continuously
        if (this.animate) {
            this.shape.update(secs);
        }
        // Update the numbers displayed in the GUI controllers
        this.updateGUI();
        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    preset01(): void {
        this.shapeParameters.gui_shapeType.setValue(0) // Draw Hypotrochoid
        // Shape parameter settings
        this.shapeParameters.gui_radiusOne.setValue(
            this.shapeParameters.radiusOne_max * 0.3305,
        );
        this.shapeParameters.gui_radiusTwo.setValue(
            this.shapeParameters.radiusTwo_max * 0.66,
        );
        this.shapeParameters.gui_distance.setValue(
            this.shapeParameters.distance_max * 0.75,
        );
        this.shapeParameters.gui_segments.setValue(
            this.shapeParameters.segments_min * 1.00,
        );
        this.shapeParameters.gui_segmentMultiplier.setValue(
            this.shapeParameters.segmentMultiplier_max * 0.75,
        );
        this.shapeParameters.gui_stretch.setValue(
            this.shapeParameters.stretch_max * 0.20,
        );
        this.shapeParameters.gui_scale.setValue(
            this.shapeParameters.scale_max * 0.20,
        );

        // Shape material settings
        this.shapeMaterialParameters.gui_opacity.setValue(
            this.shapeMaterialParameters.opacity_max * 0.25,
        );

        // Shape animation settings
        this.animate = true;
        this.shapeAnimationParameters.gui_radiusOneIncrement.setValue(
            this.shapeAnimationParameters.radiusOneIncrement_max * 0.05,
        );
        this.shapeAnimationParameters.gui_radiusTwoIncrement.setValue(0);
        this.shapeAnimationParameters.gui_distanceIncrement.setValue(
            this.shapeAnimationParameters.distanceIncrement_max * 0.05,
        );
        this.resetCamera();
    }

    preset02(): void {
        this.shapeParameters.gui_shapeType.setValue(1) // Draw Epitrochoid
        // Shape parameter settings
        this.shapeParameters.gui_radiusOne.setValue(
            this.shapeParameters.radiusOne_max * 0.166,
        );
        this.shapeParameters.gui_radiusTwo.setValue(
            this.shapeParameters.radiusTwo_max * 0.133,
        );
        this.shapeParameters.gui_distance.setValue(
            this.shapeParameters.distance_max * 0.50,
        );
        this.shapeParameters.gui_segments.setValue(
            this.shapeParameters.segments_max * 0.20,
        );
        this.shapeParameters.gui_segmentMultiplier.setValue(
            this.shapeParameters.segmentMultiplier_max * 0.75,
        );
        this.shapeParameters.gui_stretch.setValue(
            this.shapeParameters.stretch_max * 0.25,
        );
        this.shapeParameters.gui_scale.setValue(
            this.shapeParameters.scale_max * 0.20,
        );

        // Shape material settings
        this.shapeMaterialParameters.gui_opacity.setValue(
            this.shapeMaterialParameters.opacity_max * 0.25,
        );

        // Shape animation settings
        this.animate = true;
        this.shapeAnimationParameters.gui_radiusOneIncrement.setValue(
            this.shapeAnimationParameters.radiusOneIncrement_max * 0.05,
        );
        this.shapeAnimationParameters.gui_radiusTwoIncrement.setValue(0);
        this.shapeAnimationParameters.gui_distanceIncrement.setValue(0);
        this.resetCamera();
    }

    preset03(): void {
        this.shapeParameters.gui_shapeType.setValue(0) // Draw Hypotrochoid
        // Shape parameter settings
        this.shapeParameters.gui_radiusOne.setValue(
            this.shapeParameters.radiusOne_max * 0.2222,
        );
        this.shapeParameters.gui_radiusTwo.setValue(
            this.shapeParameters.radiusTwo_max * 0.4444,
        );
        this.shapeParameters.gui_distance.setValue(
            this.shapeParameters.distance_max * 0.50,
        );
        this.shapeParameters.gui_segments.setValue(
            this.shapeParameters.segments_max * 0.20,
        );
        this.shapeParameters.gui_segmentMultiplier.setValue(
            this.shapeParameters.segmentMultiplier_max * 0.75,
        );
        this.shapeParameters.gui_stretch.setValue(
            this.shapeParameters.stretch_max * 0.25,
        );
        this.shapeParameters.gui_scale.setValue(
            this.shapeParameters.scale_max * 0.10,
        );

        // Shape material settings
        this.shapeMaterialParameters.gui_opacity.setValue(
            this.shapeMaterialParameters.opacity_max * 0.25,
        );

        // Shape animation settings
        this.animate = true;
        this.shapeAnimationParameters.gui_radiusOneIncrement.setValue(
            this.shapeAnimationParameters.radiusOneIncrement_max * 0.05,
        );
        this.shapeAnimationParameters.gui_radiusTwoIncrement.setValue(0);
        this.shapeAnimationParameters.gui_distanceIncrement.setValue(0);
        this.shapeAnimationParameters.gui_stretchIncrement.setValue(
            this.shapeAnimationParameters.stretchIncrement_max * 0.05,
        );
        this.resetCamera();
    }
}