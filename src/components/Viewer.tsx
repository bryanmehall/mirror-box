import * as React from "react"

type ViewerProps = {
    viewerPosition: number
}

export const Viewer = ({viewerPosition}): JSX.Element => {
    return (
        <circle cx={0} cy={viewerPosition} r={0.3} fill="#aaa"></circle>
    )
}