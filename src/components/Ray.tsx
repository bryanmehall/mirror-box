import * as React from "react"
import { CLIP_NAME, LIGHT_SPEED } from "../constants"
import { PointArray, RayProps } from "../types"
import { getReflectionPath, isEven, refColor, xScale } from "../utils"
import { LightBulb } from "./LightBulb"

// Ray path and vector math adapted from Zibit
// convert PointArray [{x:0, y:0}, ...] to svg path string "M 0 0 L..."
const pointsToString = (points: PointArray): string => {
    const lineString = points.slice(1)
        .map(point => `L${point.x} ${point.y}`)
        .join("")
    return `M${points[0].x} ${points[0].y}${lineString}`
}

export const Ray = ({ rayGeometry, highlightedIndex, opacity, time, startAnimation }: RayProps): JSX.Element => {
    const {points, reflections, width, targetPos, viewerPos, direction, index} = rayGeometry
    // highlighted ray is the ray that was clicked
    const highlighted = highlightedIndex === index
    // isInPath is true if virtual object is part of the reflection path
    // if the fourth ray on the right is highlighted (index=4) then the rays in the path are: [4, -3, 2, -1, 0]
    const isInPath = getReflectionPath(highlightedIndex).includes(index)

    // calculate geometry for virtual ray
    const xSign = xScale(direction)
    const dx = width*reflections*xSign
    const dy = viewerPos+targetPos // distance from viewer to central lightBulb

    // calculate geometry for virtual light particle
    const highlightedX = width*highlightedIndex*xSign
    const zeroAngle = index === 0 ? -isEven(highlightedIndex) : Math.sign(highlightedIndex)
    const angle = (Math.atan2(dy, highlightedX)-Math.PI/2) * zeroAngle
    const radius = LIGHT_SPEED * time
    const x = dx + radius * Math.sin(angle)
    const y = -targetPos + radius * Math.cos(angle)

    // set visual parameters
    const rayOpacity = highlighted ? 1 : opacity * 0.4
    const clip = true
    const rayColor = highlighted ? "red" : "white"
    
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
            x2={dx}
            y2={-targetPos}
            stroke={rayColor}
            opacity = {rayOpacity}
            strokeDasharray=".2"
            strokeWidth = {0.04}
        />
        {/* light pulse*/}
        <circle
            cx={dx} 
            cy={-targetPos} 
            r={radius} 
            opacity={isInPath ? 0.5 : rayOpacity} 
            fill="none" 
            stroke={refColor(reflections, highlighted || isInPath ? 1: 0)} 
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
            onClick={() => {startAnimation(index)}}
            x={dx} 
            y={-targetPos} 
            opacity={highlighted ? 1 : opacity}
            illuminated = {(highlighted || index === 0) && time < 0.5}
        />
    </g>
}