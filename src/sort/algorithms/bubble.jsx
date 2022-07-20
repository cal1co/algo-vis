export const bubble = (arr) => { // O(n^2)
    const arrHistory = []
    durstenfeldShuffle(arr)
    console.log("UNSORTED (BUBBLE): ", arr)
    const n = arr.length
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (arr[j] > arr[j + 1]){
                const firstVal = arr[j]
                arrHistory.push(firstVal)
                arrHistory.push(arr[j + 1])
                arr[j] = arr[j + 1]
                arr[j + 1] = firstVal
            }
        }
    }
    console.log("SORTED (BUBBLE): ", arr)
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

