import * as React from "react"
import { CLIP_NAME, LIGHT_SPEED } from "../constants"
import { PointArray, RayProps } from "../types"
import { getReflectionPath, refColor } from "../utils"
import { Target } from "./Target"

// convert PointArray [{x:num, y:num}, ...] to svg path string "Mnum numL..."
//Ray path and vector math adapted from Zibit
const pointsToString = (points: PointArray): string => {
    const lineString = points.slice(1)
        .map(point => `L${point.x} ${point.y}`)
        .join("")
    return `M${points[0].x} ${points[0].y}${lineString}`
}

export const Ray = ({ rayGeometry, highlightedIndex, opacity, time, setHighlightedIndex }: RayProps): JSX.Element => {
    const {points, reflections, width, targetPos, viewerPos, direction, index} = rayGeometry
    const highlighted = highlightedIndex === index
    const isInPath = getReflectionPath(highlightedIndex).includes(index)
    const xScale = direction == "left" ? -1: 1 //TODO: use util
    const length = (viewerPos-targetPos)
    const slope = xScale*length/(width*reflections)
    const targetX = length/slope
    const rayOpacity = highlighted ? 1: opacity*.4
    const clip = true
    const rayColor = highlighted ? "red" : "white"
    return <g>
        <path 
            d={pointsToString(points)}
            stroke={rayColor}
            fill="none"
            strokeWidth={ 0.04}
            opacity={rayOpacity}
        />
        <line
            x1={points[1].x}
            y1={points[1].y}
            x2={targetX}
            y2={-targetPos}
            stroke={rayColor}
            opacity = {rayOpacity}
            strokeDasharray=".2"
            strokeWidth = {0.04}
        />
        <circle
            cx={targetX} 
            cy={-targetPos} 
            r={LIGHT_SPEED*time} 
            opacity={rayOpacity} 
            fill="none" 
            stroke={refColor(reflections, highlighted ? 1: 0)} 
            strokeWidth="0.1"
            clipPath={clip ? `url(#${ CLIP_NAME})`: null}
        />
        <circle
            cx={targetX} 
            cy={-targetPos} 
            r={LIGHT_SPEED*time} 
            opacity={rayOpacity} 
            fill="none" 
            stroke={refColor(reflections, highlighted ? 1: 0)} 
            strokeWidth="0.1"
            clipPath={clip ? `url(#${ CLIP_NAME})`: null}
        />
        <Target 
            onClick={() => {setHighlightedIndex(index)}}
             x={targetX} y={targetPos} opacity={opacity}/>
    </g>
}