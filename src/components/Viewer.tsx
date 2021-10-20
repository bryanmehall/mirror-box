import * as React from "react"
import { clamp } from "../utils"
import { Draggable } from "./Draggable"

type ViewerProps = {
    viewerPosition: number,
    setViewerPosition: Function,
    getCoord: Function
}

export const Viewer = ({viewerPosition, setViewerPosition, getCoord}: ViewerProps): JSX.Element => {
    const dragMove = (e) => {
        const newPos = clamp(getCoord(e).y, 0.1, 3)
        setViewerPosition(newPos)
    }
    return (
        <Draggable dragMove={dragMove}>
            <g transform={`translate(${-.3}, ${viewerPosition-.3}) scale(0.002)`}>
                <polygon 
                    fill="#88f"
                    points="300,150 225,280 75,280 0,150 75,20 225,20" 
                />
                <polygon 
                    fill="black"
                    transform="translate(45,45) scale(.7)"
                    points="300,150 225,280 75,280 0,150 75,20 225,20" 
                />
                <path 
                    d="M-150 150 L0 20 L 300 20 L 450 150"
                    strokeWidth="30"
                    fill="none"
                    stroke="#ccc"
                />
            </g>
        </Draggable>
    )
}