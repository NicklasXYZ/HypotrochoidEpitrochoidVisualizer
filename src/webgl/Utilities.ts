// Import code from node modules
import * as DAT from "dat.gui";


//// Define interfaces for organizing the different categories of options and settings
// Shape GUI controller and parameter settings
export interface ShapeParameters {
    gui_radiusOne: DAT.GUIController;
    radiusOne_max: number;
    radiusOne_min: number;
    radiusOne_step: number;

    gui_radiusTwo: DAT.GUIController;
    radiusTwo_max: number;
    radiusTwo_min: number;
    radiusTwo_step: number;

    gui_distance: DAT.GUIController;
    distance_max: number;
    distance_min: number;
    distance_step: number;

    gui_segments: DAT.GUIController;
    segments_max: number;
    segments_min: number;
    segments_step: number;

    gui_segmentMultiplier: DAT.GUIController;
    segmentMultiplier_max: number;
    segmentMultiplier_min: number;
    segmentMultiplier_step: number;

    gui_stretch: DAT.GUIController;
    stretch_max: number;
    stretch_min: number;
    stretch_step: number;

    gui_shapeType: DAT.GUIController;

    gui_scale: DAT.GUIController;
    scale_max: number;
    scale_min: number;
    scale_step: number;
}

// Define a function to easily be able to initialize and set properties
// of a "ShapeParameters" object
export function initialzeShapeParameters(): ShapeParameters {
    let shapeParameters = {};
    shapeParameters["gui_radiusOne"]  = undefined;
    shapeParameters["radiusOne_max"]  = 10.00;
    shapeParameters["radiusOne_min"]  =  0.10;
    shapeParameters["radiusOne_step"] =  0.01;

    shapeParameters["gui_radiusTwo"]  = undefined;
    shapeParameters["radiusTwo_max"]  = 10.00;
    shapeParameters["radiusTwo_min"]  =  0.10;
    shapeParameters["radiusTwo_step"] =  0.01;

    shapeParameters["gui_distance"]  = undefined;
    shapeParameters["distance_max"]  = 10.00;
    shapeParameters["distance_min"]  =  0.10;
    shapeParameters["distance_step"] =  0.01;

    shapeParameters["gui_segments"]  = undefined;
    shapeParameters["segments_max"]  = 10000;
    shapeParameters["segments_min"]  =   100;
    shapeParameters["segments_step"] =    10;

    shapeParameters["gui_segmentMultiplier"]  = undefined;
    shapeParameters["segmentMultiplier_max"]  = 10.00;
    shapeParameters["segmentMultiplier_min"]  =  1.00;
    shapeParameters["segmentMultiplier_step"] =  1.00;

    shapeParameters["gui_stretch"]  = undefined;
    shapeParameters["stretch_max"]  = 10.00;
    shapeParameters["stretch_min"]  =  0.00;
    shapeParameters["stretch_step"] =  0.01;

    shapeParameters["gui_shapeType"] = undefined;

    shapeParameters["gui_scale"]  = undefined;
    shapeParameters["scale_max"]  = 0.50;
    shapeParameters["scale_min"]  = 0.01;
    shapeParameters["scale_step"] = 0.01;

    return shapeParameters as ShapeParameters;
}

// Shape material GUI controller parameter settings
export interface ShapeMaterialParameters {
    gui_opacity: DAT.GUIController;
    opacity_max: number;
    opacity_min: number;
    opacity_step: number;
}

// Define a function to easily be able to initialize and set properties
// of a "ShapeMaterialParameters" object
export function initialzeShapeMaterialParameters(): ShapeMaterialParameters {
    let shapeMaterialParameters = {};
    shapeMaterialParameters["gui_opacity"]  = undefined;
    shapeMaterialParameters["opacity_max"]  = 1.00;
    shapeMaterialParameters["opacity_min"]  = 0.00;
    shapeMaterialParameters["opacity_step"] = 0.01;

    return shapeMaterialParameters as ShapeMaterialParameters;
}

// Shape animation parameter settings
export interface ShapeAnimationParameters {
    gui_animate: DAT.GUIController;

    gui_radiusOneIncrement: DAT.GUIController;
    radiusOneIncrement_max: number;
    radiusOneIncrement_min: number;
    radiusOneIncrement_step: number;

    gui_radiusTwoIncrement: DAT.GUIController;
    radiusTwoIncrement_max: number;
    radiusTwoIncrement_min: number;
    radiusTwoIncrement_step: number;

    gui_distanceIncrement: DAT.GUIController;
    distanceIncrement_max: number;
    distanceIncrement_min: number;
    distanceIncrement_step: number;

    gui_stretchIncrement: DAT.GUIController;
    stretchIncrement_max: number;
    stretchIncrement_min: number;
    stretchIncrement_step: number;
}

// Define a function to easily be able to initialize and set properties
// of a "ShapeMaterialParameters" object
export function initialzeShapeAnimationParameters(): ShapeAnimationParameters {
    let shapeAnimationParameters = {};
    shapeAnimationParameters["gui_animate"] = undefined;

    shapeAnimationParameters["gui_radiusOneIncrement"]  = undefined;
    shapeAnimationParameters["radiusOneIncrement_max"]  = 1.00;
    shapeAnimationParameters["radiusOneIncrement_min"]  = 0.00;
    shapeAnimationParameters["radiusOneIncrement_step"] = 0.01;

    shapeAnimationParameters["gui_radiusTwoIncrement"]  = undefined;
    shapeAnimationParameters["radiusTwoIncrement_max"]  = 1.00;
    shapeAnimationParameters["radiusTwoIncrement_min"]  = 0.00;
    shapeAnimationParameters["radiusTwoIncrement_step"] = 0.01;

    shapeAnimationParameters["gui_distanceIncrement"]  = undefined;
    shapeAnimationParameters["distanceIncrement_max"]  = 1.00;
    shapeAnimationParameters["distanceIncrement_min"]  = 0.00;
    shapeAnimationParameters["distanceIncrement_step"] = 0.01;

    shapeAnimationParameters["gui_stretchIncrement"]  = undefined;
    shapeAnimationParameters["stretchIncrement_max"]  = 1.00;
    shapeAnimationParameters["stretchIncrement_min"]  = 0.00;
    shapeAnimationParameters["stretchIncrement_step"] = 0.01;

    return shapeAnimationParameters as ShapeAnimationParameters;
}
