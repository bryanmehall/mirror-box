import * as React from 'react'
import { xScale } from '../utils'

const MIRROR_WIDTH = 0.2 //offset mirror width for reflections

type MirrorProps = {
    width: number,
    direction: "left" | "right"
}

export const Mirror = ({width, direction}: MirrorProps) => {
    const x = xScale(direction)*(width/2 + MIRROR_WIDTH/2) 
    return (
        <line 
            x1={x} 
            y1={0} 
            x2={x} 
            y2={-10} 
            stroke="cyan"
            strokeWidth={MIRROR_WIDTH}
            cursor="ew-resize"
        />
    )
}