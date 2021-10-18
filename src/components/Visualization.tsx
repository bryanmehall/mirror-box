import * as React from 'react'
import { Mirror } from './Mirror'
import { Target } from './Target'
import { Viewer } from './Viewer'

//independent variables
//TODO: add to state
const width = 4
const viewerPosition = -0.2
const targetPosition = 8
//time

export const Visualization = () => {
    return <svg width="100%" height="100%" viewBox="-15 -10 30 12">
        <Mirror width={width} direction="left"/>
        <Mirror width={width} direction="right"/>
        <Viewer viewerPosition={viewerPosition}/>
        <Target x={0} y={targetPosition} opacity={1}/>
    </svg>
}

