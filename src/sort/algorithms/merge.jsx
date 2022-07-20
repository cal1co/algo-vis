export const merge = (arr) => {

    durstenfeldShuffle(arr)

    const n = arr.length
    const midPoint = arr.length / 2

    if (n === 1){
        return arr
    }

    const leftArr = arr.splice(0, midPoint)

    // console.log(leftArr, arr)
    const arrOne = merge(leftArr)
    const arrTwo = merge(arr)

    return merger(arrOne, arrTwo)
}

export const merger = (leftArr, rightArr) => {

    const tempArr = []

    while (leftArr.length && rightArr.length){ // while the arrays have elements
        if (leftArr[0] > rightArr[0]){
            tempArr.push(rightArr.shift())
        } else {
            tempArr.push(leftArr.shift())
        }
    }
    while (leftArr.length){
        tempArr.push(leftArr.shift())
    }
    while (rightArr.length){
        tempArr.push(rightArr.shift())
    }
    return tempArr
}


const durstenfeldShuffle = (inputArr) => {
    for (let i = inputArr.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1))
        const temp = inputArr[i]
        inputArr[i] = inputArr[j]
        inputArr[j] = temp;
    }
}
