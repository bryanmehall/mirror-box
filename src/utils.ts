import { DirectionFlag } from "./types"

export const xScale = (direction: DirectionFlag): number => (
    direction == "left" ? -1 : 1
)

const reflectionColors = ["#00f", "#0f0", "#fe0", "#fa0", "#f00", "#f0f", "#a0f"]
//cycle through colors then repeat
export const refColor = (n: number): string => (reflectionColors[n % reflectionColors.length])