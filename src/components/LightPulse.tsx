import * as React from "react"
import { CLIP_NAME } from "../constants"
import { refColor } from "../utils"

type LightPulseProps = {
    radius: number,
    y: number,
    mirrorWidth: number,
    opacity: number,
    saturation: number,
    clip: boolean
}

export const LightPulse = ({y, radius, mirrorWidth,  opacity, saturation, clip}: LightPulseProps): JSX.Element => {
    const count = Math.round(radius/mirrorWidth) //number of reflections
    const reflections = new Array(count)
        .fill(0)
        .map((e, i) => {
            const color = refColor(i+1, saturation)
            return [
                {x: (-i-1)*mirrorWidth,y, color, clip}, //left side
                {x: (i+1)*mirrorWidth,y, color, clip} //right side
            ]
        })
        .flat()
    const lightPulses = [{x:0, y, color:refColor(0, saturation), clip}, ... reflections]

    const pulseCircles = lightPulses.map((pulse, i) => {
        return <circle
            cx={pulse.x} 
            cy={-pulse.y} 
            r={radius} 
            opacity={opacity} 
            fill="none" 
            stroke={pulse.color} 
            strokeWidth="0.1"
            clipPath={pulse.clip ? `url(#${ CLIP_NAME})`: null}
            key={i}
        />
    })
    
    return <g>
        {pulseCircles}
    </g>
}
