import * as React from 'react'
import { Mirror } from './Mirror'

//independent variables
//TODO: add to state
const width = 4
//viewerPosition 
//objectPosition
//time

export const Visualization = () => {
    return <svg width="100%" height="100%" viewBox="-15 -10 30 12">
        <Mirror width={width} direction="left"/>
        <Mirror width={width} direction="right"/>
    </svg>
}

