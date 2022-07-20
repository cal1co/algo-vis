export const insertion = (arr) => {
    const arrHistory = []
    durstenfeldShuffle(arr)
    console.log("UNSORTED (INSERTION): ", arr)
    const n = arr.length
    
    for (let i = 1; i < n; i++){
        let j = i
        while (j > 0 && arr[j-1] > arr[j]){
            const temp = arr[j]
            arrHistory.push(temp)
            arrHistory.push(arr[j - 1])
            arr[j] = arr[j - 1]
            arr[j - 1] = temp
            j = j - 1
        }
    }


    console.log("SORTED (INSERTION): ", arr)
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