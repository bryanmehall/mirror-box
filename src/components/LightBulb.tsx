import * as React from "react"

type TargetProps = {
    x: number,
    y: number,
    opacity: number,
    onClick: Function, 
    illuminated: boolean
}

export const LightBulb = ({x, y, opacity, onClick, illuminated}: TargetProps): JSX.Element => {
    return <g 
        transform={`translate(${x-.3}, ${-y-.3})`}
        onClick={onClick}
        >
        <polygon 
            fill={illuminated ? "yellow": "#777" }
            opacity={illuminated ? 1 : opacity}
            stroke="#fff"
            strokeWidth="20"
            transform={`scale(0.002)`}
            points="300,150 225,280 75,280 0,150 75,20 225,20" 
        />
    </g>
}
//<rect x={0.18} y={0.55} width={.3} height={.3} strokeWidth="0.04" fill="#ccc" stroke="#fff"></rect>
/*<circle onClick={onClick} cx={x} cy={-y} r={0.3} opacity={opacity} fill="blue"></circle>*/