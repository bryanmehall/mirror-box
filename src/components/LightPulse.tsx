import * as React from "react"
import { CLIP_NAME } from "../constants"
import { refColor } from "../utils"

type LightPulseProps = {
    radius: number,
    y: number,
    mirrorWidth: number,
    opacity: number
}

export const LightPulse = ({y, radius, mirrorWidth, opacity}: LightPulseProps): JSX.Element => {
    const count = Math.round(radius/mirrorWidth) //number of reflections
    const reflections = new Array(count)
        .fill(0)
        .map((e, i) => ([
            {x: (-i-1)*mirrorWidth,y, color: refColor(i+1)}, //left side
            {x: (i+1)*mirrorWidth,y, color: refColor(i+1)} //right side
        ]))
        .flat()
    const lightPulses = [{x:0, y, color:refColor(0)}, ... reflections]
    const pulseCircles = lightPulses.map((pulse, i) => {
        return <circle
            cx={pulse.x} 
            cy={-pulse.y} 
            r={radius} 
            opacity={opacity} 
            fill="none" 
            stroke={pulse.color} 
            strokeWidth="0.2"
            clipPath={`url(#${CLIP_NAME})`}
            key={i}
        />
    })
    return <g>
        {pulseCircles}
    </g>
}
