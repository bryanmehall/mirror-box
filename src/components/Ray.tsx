import * as React from "react"
import { CLIP_NAME, LIGHT_SPEED } from "../constants"
import { PointArray, RayProps } from "../types"
import { getReflectionPath, isEven, refColor, xScale } from "../utils"
import { LightBulb } from "./LightBulb"

// convert PointArray [{x:num, y:num}, ...] to svg path string "Mnum numL..."
//Ray path and vector math adapted from Zibit
const pointsToString = (points: PointArray): string => {
    const lineString = points.slice(1)
        .map(point => `L${point.x} ${point.y}`)
        .join("")
    return `M${points[0].x} ${points[0].y}${lineString}`
}

export const Ray = ({ rayGeometry, highlightedIndex, opacity, time, startAnimation }: RayProps): JSX.Element => {
    const {points, reflections, width, targetPos, viewerPos, direction, index} = rayGeometry
    const highlighted = highlightedIndex === index
    const isInPath = getReflectionPath(highlightedIndex).includes(index)
    const xSign = xScale(direction)
    const length = (viewerPos+targetPos)
    const dx = (width*reflections*xSign)
    const dy = (length)
    const slope = dx/dy //0 slope is straight up, infinite slope is left-right
    const highlightedX = (width*highlightedIndex*xSign)
    const zeroAngle = index === 0 ? -isEven(highlightedIndex) : Math.sign(highlightedIndex)
    const angle = (Math.atan2(dy, highlightedX)-Math.PI/2)* zeroAngle
    const targetX = length*slope
    const rayOpacity = highlighted ? 1: opacity * 0.4
    const clip = true
    const rayColor = highlighted ? "red" : "white"
    const radius = LIGHT_SPEED * time
    const x = targetX+radius*Math.sin(angle)
    const y = -targetPos+radius*Math.cos(angle)
    return <g>
        {/* light path*/}
        <path 
            d={pointsToString(points)}
            stroke={rayColor}
            fill="none"
            strokeWidth={0.04}
            opacity={rayOpacity}
        />
        {/* image path*/}
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
        {/* light pulse*/}
        <circle
            cx={targetX} 
            cy={-targetPos} 
            r={radius} 
            opacity={isInPath ? 0.5 : rayOpacity} 
            fill="none" 
            stroke={refColor(reflections, highlighted||isInPath ? 1: 0)} 
            strokeWidth="0.07"
            clipPath={clip && !highlighted ? `url(#${ CLIP_NAME})`: null}
        />
        {/* light particle*/}
        <circle
            cx={x} 
            cy={y} 
            r={0.2} 
            opacity={isInPath && y < viewerPos ? 1 : 0} 
            fill={refColor(reflections, isInPath ? 1: 0)}
            clipPath={clip && !highlighted ? `url(#${ CLIP_NAME})`: null}
        />
        {/* light bulb*/}
        <LightBulb 
            onClick={() => {startAnimation(index)}
            }
            x={targetX} 
            y={targetPos} 
            opacity={opacity}
            illuminated = {(highlighted || index === 0) && time <0.5}
        />
    </g>
}