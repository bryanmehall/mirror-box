export type DirectionFlag = "left" | "right"

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
    direction: "left" | "right"
    points: PointArray;
}

export interface RayProps {
    rayGeometry: RayGeometry;
    highlighted: boolean;
    opacity:number;
}