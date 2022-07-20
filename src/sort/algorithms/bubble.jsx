export const bubble = (arr) => { // O(n^2)
    const arrHistory = []
    console.log("UNSORTED (BUBBLE): ", arr)
    const n = arr.length
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (arr[j] > arr[j + 1]){
                const firstVal = arr[j]
                arrHistory.push([firstVal, arr[j + 1]])
                arr[j] = arr[j + 1]
                arr[j + 1] = firstVal
            }
        }
    }
    console.log("SORTED (BUBBLE): ", arr)
    return arrHistory
}

