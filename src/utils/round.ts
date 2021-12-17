export const round = (value) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}