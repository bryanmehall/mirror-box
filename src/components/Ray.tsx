import * as React from "react"
import { PointArray, RayProps } from "../types"
import { Target } from "./Target"

// convert PointArray [{x:num, y:num}, ...] to svg path string "Mnum numL..."
//Ray path and vector math adapted from Zibit
const pointsToString = (points: PointArray): string => {
    const lineString = points.slice(1)
        .map(point => `L${point.x} ${point.y}`)
        .join("")
    return `M${points[0].x} ${points[0].y}${lineString}`
}

export const Ray = ({ rayGeometry, highlighted, opacity }: RayProps): JSX.Element => {
    const {points, reflections, width, targetPos, viewerPos, direction} = rayGeometry
    const xScale = direction == "left" ? -1: 1 //TODO: use util
    const length = (viewerPos-targetPos)
    const slope = xScale*length/(width*reflections)
    const targetX = length/slope
    const rayOpacity = opacity*.4
    return <g>
        <path 
            d={pointsToString(points)}
            stroke={highlighted ? "red" : "white"}
            fill="none"
            strokeWidth={highlighted ? 0.08 : 0.04}
            opacity={rayOpacity}
        />
        <line
            x1={points[1].x}
            y1={points[1].y}
            x2={targetX}
            y2={-targetPos}
            stroke="white"
            opacity = {rayOpacity}
            strokeDasharray=".2"
            strokeWidth = {0.04}
        />
        <Target x={targetX} y={targetPos} opacity={opacity}/>
    </g>
}