export const selection = (arr) => {

    const arrHistory = []
    // console.log("UNSORTED (SELECTION): ", arr)
    const n = arr.length
    for (let i = 0; i < n; i++){
        let minVal = i
        for (let j = i + 1; j < n; j++){
            arrHistory.push([arr[minVal], arr[j]])
            if (arr[minVal] > arr[j]){
                minVal = j
            }
        }
        if (minVal != i){
            const temp = arr[i]
            arrHistory.push([arr[minVal], temp, "SWAP"])
            arr[i] = arr[minVal]
            arr[minVal] = temp
        }
    }
    // console.log("SORTED (SELECTION): ", arr)
    return arrHistory
}
