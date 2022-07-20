export const quick = (arr, low=0, high=arr.length-1) => {

    if (arr.length > 1){
        const idx = partition(arr, low, high)
        if (low < idx - 1){
            quick(arr, low, idx -1)
        }
        if (idx < high){
            quick(arr, idx, high)
        }
    }
    return arr
}

const partition = (arr, low, high) => {
    let itemFromLeft = low
    let itemFromRight = high
    const pivot = arr[Math.floor((high + low) / 2)]
    const arrHistory = []

    while (itemFromLeft <= itemFromRight){
        while(arr[itemFromLeft] <= pivot && itemFromLeft != high){ // incase pivot is largets
            itemFromLeft++
        }
        while(arr[itemFromRight] >= pivot && itemFromRight != low){ // incase pivot is smallest
            itemFromRight--
        }

        if (itemFromLeft <= itemFromRight){
            const temp = arr[itemFromLeft]
            arrHistory.push(temp)
            arrHistory.push(arr[itemFromRight])
            arr[itemFromLeft] = arr[itemFromRight]
            arr[itemFromRight] = temp;
            itemFromLeft++;
            itemFromRight--
        }
    }
    const temp = arr[high]
    arrHistory.push(temp)
    arrHistory.push(arr[itemFromLeft])
    arr[high] = arr[itemFromLeft]
    arr[itemFromLeft] = temp

    console.log(arrHistory)
    return itemFromLeft
}


const durstenfeldShuffle = (inputArr) => {
    for (let i = inputArr.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1))
        const temp = inputArr[i]
        inputArr[i] = inputArr[j]
        inputArr[j] = temp;
    }
}
