import * as React from 'react'
import { Ray } from './Ray'
import { createPossiblePaths, rayOpacity } from '../utils'
import { LightPulse } from './LightPulse'
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
    const [time, setTime] = React.useState(0)
    const [initialTime, setInitialTime] = React.useState(performance.now())
    const [playbackSpeed, setPlaybackSpeed] = React.useState(0)
    //add animation for time value
    React.useLayoutEffect(() => {
        if (playbackSpeed !== 0){
            let animationId
            const render = (time) => {
                setTime((time-initialTime)*playbackSpeed/1000)
                animationId = requestAnimationFrame(render)
            }
            animationId = requestAnimationFrame(render)
            return () => {cancelAnimationFrame(animationId)}
        }
    })
    const paths = createPossiblePaths(mirrorWidth, targetPosition, viewerPosition)
        const rays = paths.map((rayGeometry, i) => (
            <Ray 
                rayGeometry={rayGeometry} 
                highlighted={false}
                opacity={rayOpacity(rayGeometry.reflections)} 
                key={i}
            />
            ))
            .reverse() //render middle ray with highest z-index
        <Viewer viewerPosition={viewerPosition}/>
        <Target x={0} y={targetPosition} opacity={1}/>
        <LightPulse 
            y={targetPosition} 
            radius={time}
            mirrorWidth={width}
            opacity={1}
        {rays}
        />
    </svg>
}

const SVGFilters = () => (
        <defs>
            <clipPath id={CLIP_NAME}>
                <rect x={-width/2} y={-MIRROR_LENGTH} width={width} height={MIRROR_LENGTH*2} />
            </clipPath>
            <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation=".2" />
            </filter>
        </defs>
)
