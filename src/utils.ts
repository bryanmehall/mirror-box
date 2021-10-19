import { DirectionFlag, RayGeometry } from "./types"

export const xScale = (direction: DirectionFlag): number => (
    direction == "left" ? -1 : 1
)

const reflectionHues = [ 50, 100, 200, 270, 0, 25]
//cycle through colors then repeat
export const refColor = (n: number, saturation: number): string => {
    const hue = reflectionHues[n % reflectionHues.length]
    return `hsl(${hue},${saturation*100}%, 40%)`
}

export const rayOpacity = (reflections:number, ): number => ( 
    0.7**reflections
)
const isEven = (n:number): number => n % 2 === 0 ? 1 :-1
export const createRayGeometry = (width:number, targetPos:number, viewerPos:number, reflections: number, direction:"left" | "right"): RayGeometry => {
    const length = targetPos+viewerPos
    const xScale = direction === "left" ? -1 : 1 //scaling factor if array is going left or right
    const pitch = length/reflections //distance for full reflection cycle
    const reflectionPoints = new Array(reflections) 
        .fill(0)
        .map((e, i) => ({
            x: width/2*xScale*isEven(i), 
            y: -pitch*i-pitch/2+viewerPos
        }))
    const pointArray = [
        {x:0, y:viewerPos}, //viewer
        ...reflectionPoints,
        {x:0, y:-targetPos} //target
    ]
    return { points: pointArray, reflections, width, targetPos, viewerPos, length, direction}
}

//calculate possible paths based on occlusion angle
export const createPossiblePaths = (width: number, targetPos: number, viewerPos: number): RayGeometry[] => {
    const occlusionSlope = viewerPos/(width/2)
    const length = targetPos+viewerPos
    const maxReflections = Math.floor(length/(occlusionSlope*width))
    const reflectedPaths = new Array(maxReflections)
        .fill(0)
        .map((e, i) => ([
            createRayGeometry(width, targetPos, viewerPos, i+1, "left"),
            createRayGeometry(width, targetPos, viewerPos, i+1, "right")
        ]))
        .flat()
    return [createRayGeometry(width, targetPos, viewerPos, 0, "left"), ...reflectedPaths]
}

export const clamp = (n: number, min: number, max: number): number => (Math.min(Math.max(n, min), max))