export const selection = (arr) => {

    const arrHistory = []
    durstenfeldShuffle(arr)
    console.log("UNSORTED (SELECTION): ", arr)
    const n = arr.length
    for (let i = 0; i < n; i++){
        let minVal = i
        for (let j = i + 1; j < n; j++){
            if (arr[minVal] > arr[j]){
                minVal = j
            }
        }
        if (minVal != i){
            const temp = arr[i]
            arrHistory.push(temp)
            arrHistory.push(arr[minVal])
            arr[i] = arr[minVal]
            arr[minVal] = temp
        }
    }
    console.log("SORTED (SELECTION): ", arr)
    return arrHistory
}

const durstenfeldShuffle = (inputArr) => {
    for (let i = inputArr.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1))
        const temp = inputArr[i]
        inputArr[i] = inputArr[j]
        inputArr[j] = temp;
    }
}