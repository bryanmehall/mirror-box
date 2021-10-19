import * as React from 'react'
import { MIRROR_LENGTH } from '../constants'
import { DirectionFlag } from '../types'
import { xScale } from '../utils'
import { Draggable } from './Draggable'

const MIRROR_WIDTH = 0.2 //offset mirror width for reflections

type MirrorProps = {
    width: number,
    direction: DirectionFlag
    setMirrorWidth: Function,
    getCoord: Function
}

export const Mirror = ({width, direction, setMirrorWidth, getCoord}: MirrorProps) => {
    const x = xScale(direction)*(width/2 + MIRROR_WIDTH/2) 
    const dragMove = (e) => {
        const newWidth = getCoord(e).x*2
        setMirrorWidth(newWidth)
    }
    return (
        <Draggable dragMove={dragMove}>
            <line 
                x1={x}
                y1={0}
                x2={x}
                y2={-1*MIRROR_LENGTH}
                stroke="#066"
                strokeWidth={MIRROR_WIDTH}
                cursor="ew-resize"
            />
        </Draggable>
    )
}