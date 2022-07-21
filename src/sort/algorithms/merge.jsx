
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



// export function merge(array) {
//     const animations = [];
//     if (array.length <= 1) return array;
//     const auxiliaryArray = array.slice();
//     mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
//     return animations;
//   }
  
//   function mergeSortHelper(
//     mainArray,
//     startIdx,
//     endIdx,
//     auxiliaryArray,
//     animations,
//   ) {
//     if (startIdx === endIdx) return;
//     const middleIdx = Math.floor((startIdx + endIdx) / 2);
//     mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
//     mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
//     doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
//   }
  
//   function doMerge(
//     mainArray,
//     startIdx,
//     middleIdx,
//     endIdx,
//     auxiliaryArray,
//     animations,
//   ) {
//     let k = startIdx;
//     let i = startIdx;
//     let j = middleIdx + 1;
//     while (i <= middleIdx && j <= endIdx) {
//       animations.push([i, j]);
//       if (auxiliaryArray[i] <= auxiliaryArray[j]) {
//         // We overwrite the value at index k in the original array with the
//         // value at index i in the auxiliary array.
//         animations.push([k, auxiliaryArray[i]]);
//         mainArray[k++] = auxiliaryArray[i++];
//       } else {
//         // We overwrite the value at index k in the original array with the
//         // value at index j in the auxiliary array.
//         animations.push([k, auxiliaryArray[j]]);
//         mainArray[k++] = auxiliaryArray[j++];
//       }
//     }
//     while (i <= middleIdx) {
//       animations.push([i, i]);
//       animations.push([k, auxiliaryArray[i]]);
//       mainArray[k++] = auxiliaryArray[i++];
//     }
//     while (j <= endIdx) {
//       animations.push([j, j]);
//       animations.push([k, auxiliaryArray[j]]);
//       mainArray[k++] = auxiliaryArray[j++];
//     }
//   }