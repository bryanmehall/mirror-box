import * as React from "react"

type TargetProps = {
    x: number,
    y: number,
    opacity: number
}

export const Target = ({x, y, opacity}: TargetProps): JSX.Element => (
    <circle cx={x} cy={-y} r={0.3} opacity={opacity} fill="blue"></circle>
)