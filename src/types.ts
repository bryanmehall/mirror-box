export type DirectionFlag = "left" | "right";

export interface CoordPoint {
    x: number;
    y: number;
}

export type PointArray = CoordPoint[]

export interface RayGeometry {
    reflections: number;
    width: number;
    length: number;
    targetPos: number;
    viewerPos: number;
    direction: DirectionFlag;
    points: PointArray;
    index: number;
}

export interface RayProps {
    rayGeometry: RayGeometry;
    highlightedIndex: null | number;
    opacity:number;
    time: number; 
    startAnimation: Function;
}