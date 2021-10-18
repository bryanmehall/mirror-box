import { DirectionFlag } from "./types";

export const xScale = (direction: DirectionFlag): number => (
    direction == "left" ? -1 : 1
)