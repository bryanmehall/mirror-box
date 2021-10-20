import { DirectionFlag, RayGeometry } from "./types"

export const xScale = (direction: DirectionFlag): number => (
    direction === "left" ? -1 : 1
)

const reflectionHues = [ 50, 100, 200, 270, 0, 25]
// cycle through colors then repeat
export const refColor = (n: number, saturation: number): string => {
    const hue = reflectionHues[n % reflectionHues.length]
    return `hsl(${hue},${saturation*100}%, 40%)`
}

export const rayOpacity = (reflections:number): number => ( 
    0.7**reflections
)

export const orientationFlag = (n:number): number => n % 2 === 0 ? 1 : -1

export const createRayGeometry = (width:number, targetPos:number, viewerPos:number, reflections: number, direction:DirectionFlag): RayGeometry => {
    const length = targetPos+viewerPos
    const xSign =  xScale(direction) // scaling factor if array is going left or right
    const index = xSign*reflections
    const pitch = length/reflections // distance for full reflection cycle

    // create coordinates of reflection
    const reflectionPoints = new Array(reflections).fill(0)
        .map((e, i) => ({
            x: width/2*xSign*orientationFlag(i), 
            y: -pitch*i-pitch/2+viewerPos
        }))

    // add coordinates of reflection between beginning and ending point
    const pointArray = [
        {x:0, y:viewerPos}, // viewer
        ...reflectionPoints,
        {x:0, y:-targetPos} // target
    ]
    return { points: pointArray, reflections, width, targetPos, viewerPos, length, direction, index}
}

// calculate possible paths based on occlusion angle
export const createPossiblePaths = (width: number, targetPos: number, viewerPos: number): RayGeometry[] => {
    const occlusionSlope = viewerPos/(width/2)
    const length = targetPos+viewerPos
    const maxReflections = Math.floor(length/(occlusionSlope*width))

    // calculate all possible reflected paths for a given occlusion angle
    const reflectedPaths = new Array(maxReflections).fill(0)
        .map((e, i) => ([
            createRayGeometry(width, targetPos, viewerPos, i+1, "left"),
            createRayGeometry(width, targetPos, viewerPos, i+1, "right")
        ]))
        .flat()
    return [createRayGeometry(width, targetPos, viewerPos, 0, "left"), ...reflectedPaths]
}

// get indices in reflection path ie. 4 => [4, -3, 2, -1, 0]
export const getReflectionPath = (maxIndex: null | number) => {
    if (maxIndex === null){
       return [] 
    } else {
        return new Array(Math.abs(maxIndex)+1).fill(0)
            .map((e,i) => orientationFlag(i)*i*orientationFlag(maxIndex)*Math.sign(maxIndex))
    }
}

export const clamp = (n: number, min: number, max: number): number => (Math.min(Math.max(n, min), max))