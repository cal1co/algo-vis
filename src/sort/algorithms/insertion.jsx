export const insertion = (arr) => {
    const arrHistory = []
    console.log("UNSORTED (INSERTION): ", arr)
    const n = arr.length
    
    for (let i = 1; i < n; i++){
        let j = i
        while (j > 0 && arr[j-1] > arr[j]){
            // arrHistory.push([arr[j], i])
            const temp = arr[j]
            arrHistory.push([ arr[j - 1], temp, "SWAP"])
            arr[j] = arr[j - 1]
            arr[j - 1] = temp
            j = j - 1
        }
    }


    console.log("SORTED (INSERTION): ", arr)
    return arrHistory
}
