export const get2DGrid = (input: string): string[][] => {
    return input.split('\n').map((row) => row.split(''));
};