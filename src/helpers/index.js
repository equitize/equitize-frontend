export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

export function formattedSum(sum){
    return Number(sum).toLocaleString()
}

export function haveSameData(obj1, obj2){
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
        return Object.keys(obj1).every(
            key => Object.prototype.hasOwnProperty.call(obj2, key)
                && obj2[key] === obj1[key]);
    }
    return false;
}

// TO CHANGE
export function round(number){
    return Math.round( number * 100 + Number.EPSILON ) / 100
}

export function getTailwindWidthFraction(width){
    const roundedNumber = round5(width)
    const NumberMapping = {
        5: "w-1/20",
        10: "w-1/10",
        15: "w-3/20",
        20: "w-1/5",
        25: "w-1/4",
        30: "w-3/10",
        35: "w-7/20",
        40: "w-2/5",
        45: "w-9/20",
        50: "w-1/2",
        55: "w-11/20",
        60: "w-3/5",
        65: "w-13/20",
        70: "w-7/10",
        75: "w-3/4",
        80: "w-8/10",
        85: "w-17/20",
        90: "w-9/10",
        95: "w-19/20",
        100: "w-full"
    }

    return NumberMapping[roundedNumber]
}

function round5(number){
    return Math.ceil(number/5) * 5;
}