import * as React from "react"

type TargetProps = {
    x: number,
    y: number,
    opacity: number,
    onClick: Function
}

export const Target = ({x, y, opacity, onClick}: TargetProps): JSX.Element => (
    <circle onClick={onClick} cx={x} cy={-y} r={0.3} opacity={opacity} fill="blue"></circle>
)