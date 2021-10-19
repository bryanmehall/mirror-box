import * as React from 'react'
import { CLIP_NAME, MIRROR_LENGTH } from '../constants'
import { Ray } from './Ray'
import { createPossiblePaths, rayOpacity } from '../utils'
import { Mirror } from './Mirror'
import { Target } from './Target'
import { Viewer } from './Viewer'

//independent variables
//TODO: add to state
const viewerPosition = 0.5
const targetPosition = 8

export const Visualization = () => {
    const [time, setTime] = React.useState(-2)
    const [initialTime, setInitialTime] = React.useState(performance.now())
    const [playbackSpeed, setPlaybackSpeed] = React.useState(0.5)
    const [mirrorWidth, setMirrorWidth] = React.useState(4)
    const svg = React.useRef(null)
    //inverse svg coordinate transform --adapted from Zibit
    const getCoord = (event) => {
        const pt = svg.current.createSVGPoint()
        pt.x = event.clientX
        pt.y = event.clientY
        return pt.matrixTransform(svg.current.getScreenCTM().inverse())
    }
    //add animation for time value --adapted from Zibit
    React.useLayoutEffect(() => {
        let animationId
        if (playbackSpeed !== 0){
            const render = (time) => {
                setTime((time-initialTime)*playbackSpeed/1000)
            }

            animationId = requestAnimationFrame(render)
        } else {
            return () => {cancelAnimationFrame(animationId)}
        }
    })
    const paths = createPossiblePaths(mirrorWidth, targetPosition, viewerPosition)
        const rays = paths.map((rayGeometry, i) => (
            <Ray 
                rayGeometry={rayGeometry} 
                highlighted={i==3}
                opacity={rayOpacity(rayGeometry.reflections)} 
                time={time}
                key={i}
            />
            ))
            .reverse() //render middle ray with highest z-index
    return <svg width="100%" height="100%" viewBox="-15 -10 30 14" ref={svg}>
        <SVGFilters width={mirrorWidth}></SVGFilters>
        <Mirror width={mirrorWidth} direction="left" setMirrorWidth={setMirrorWidth} getCoord={getCoord}/>
        <Mirror width={mirrorWidth} direction="right" setMirrorWidth={setMirrorWidth} getCoord={getCoord}/>
        <Viewer viewerPosition={viewerPosition}/>
        <Target x={0} y={targetPosition} opacity={1}/>
        {rays}
    </svg>
}

const SVGFilters = ({width}) => (
        <defs>
            <clipPath id={CLIP_NAME}>
                <rect x={-width/2} y={-MIRROR_LENGTH} width={width} height={MIRROR_LENGTH+2} />
            </clipPath>
        </defs>
)
