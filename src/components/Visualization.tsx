import * as React from 'react'
import { CLIP_NAME, MIRROR_LENGTH } from '../constants'
import { Ray } from './Ray'
import { createPossiblePaths, rayOpacity } from '../utils'
import { Mirror } from './Mirror'
import { Viewer } from './Viewer'

const targetPosition = 8

export const Visualization = () => {
    // independent variables
    const [time, setTime] = React.useState(0)
    const [initialTime, setInitialTime] = React.useState(performance.now())
    const [playbackSpeed, setPlaybackSpeed] = React.useState(1)
    const [mirrorWidth, setMirrorWidth] = React.useState(4)
    const [viewerPosition, setViewerPosition] = React.useState(1)
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    
    // inverse svg coordinate transform -- adapted from Zibit
    const svg = React.useRef(null)
    const getCoord = (event) => {
        const pt = svg.current.createSVGPoint()
        pt.x = event.clientX
        pt.y = event.clientY
        return pt.matrixTransform(svg.current.getScreenCTM().inverse())
    }

    const startAnimation = (index) => {
        setHighlightedIndex(index)
        setInitialTime(performance.now())
        setTime(0)
    }
    // add animation for time value --adapted from Zibit
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
    // create list of all Rays visible above the occlusion angle
    const paths = createPossiblePaths(mirrorWidth, targetPosition, viewerPosition)
        const rays = paths.map((rayGeometry, i) => (
            <Ray 
                rayGeometry={rayGeometry} 
                highlightedIndex={highlightedIndex}
                startAnimation={startAnimation}
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
        
        {rays}
        <Viewer viewerPosition={viewerPosition} setViewerPosition={setViewerPosition} getCoord={getCoord}/>
    </svg>
}

const SVGFilters = ({width}) => (
        <defs>
            <clipPath id={CLIP_NAME}>
                <rect x={-width/2} y={-MIRROR_LENGTH} width={width} height={MIRROR_LENGTH+2} />
            </clipPath>
        </defs>
)
