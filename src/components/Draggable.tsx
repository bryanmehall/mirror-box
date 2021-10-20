import * as React from "react"

// adapted from Zibit Draggable component
export const Draggable = (props) => {
    const mouseDown = (e) => {
        if (props.hasOwnProperty('dragStart')){props.dragStart(e)}
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    const mouseMove = (e) => {
        if (props.hasOwnProperty('dragMove')){props.dragMove(e)}
    }
    const mouseUp = (e) => {
        if (props.hasOwnProperty('dragEnd')){props.dragEnd(e)}
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

    }
    return(
        <g
            onMouseDown={mouseDown}
            pointerEvents = 'all'
            cursor='pointer'
            >
            {props.children}
        </g>
    )
}
