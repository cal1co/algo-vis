export const radix = (arr) => {

    const maxDigitCount = maxDigits(arr)

    for (let i = 0; i < maxDigitCount; i++){
        let digitBuckets = Array.from({length: 10}, () => [])
        // let digitBuckets = Array(10).fill([])
        for (let j = 0; j < arr.length; j++){
            let digit = getDigit(arr[j], i) //
            digitBuckets[digit].push(arr[j])
            // console.log(...digitBuckets)
        }

        // arr = [].concat(...digitBuckets)
        arr = [...digitBuckets].flat()
        
        console.log("arr", arr)
    }
    return arr;
}

const digitCount = (num) => {
    if (num === 0){
        return 1
    }
    return Math.floor(Math.log10(Math.abs(num))) + 1
}

const maxDigits = (arr) => {
    let maxDigits = 0
    for (let i = 0; i < arr.length; i++){
        maxDigits = Math.max(maxDigits, digitCount(arr[i]))
    }
    return maxDigits
}


const getDigit = (num, i) => {
    return Math.floor(Math.abs(num) / Math.pow(10, i) % 10)
}