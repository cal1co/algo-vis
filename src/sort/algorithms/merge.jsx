export const merge = (arr, len=-1) => {
    const n = arr.length
    const midPoint = arr.length / 2

    if (n > len){
        len = n
    }

    if (n === 1){
        return arr
    }

    const leftArr = arr.splice(0, midPoint)

    const arrOne = merge(leftArr, len)
    const arrTwo = merge(arr, len)

    return merger(arrOne, arrTwo, len)
}

const arrHistory = []

export const merger = (leftArr, rightArr, len) => {
    const tempArr = []
    arrHistory.push([[...leftArr], [...rightArr]])
    while (leftArr.length && rightArr.length){
        if (leftArr[0] > rightArr[0]){
            const value = rightArr.shift()
            tempArr.push(value)
        } else {
            const value = leftArr.shift()
            tempArr.push(value)
        }
    }
    while (leftArr.length && !rightArr.length){
        const value = leftArr.shift()
        tempArr.push(value)
    }
    while (rightArr.length && !leftArr.length){
        const value = rightArr.shift()
        tempArr.push(value)
    }
    if (tempArr.length >= len){
        return arrHistory
    }
    return tempArr
}


