import '../style/Sort.css'
import { useState, useEffect } from 'react'
import { bubble } from '../algorithms/bubble'
import { selection } from '../algorithms/selection'
import { insertion } from '../algorithms/insertion'
import { merge } from '../algorithms/merge'
import { quick } from '../algorithms/quick'
import { radix } from '../algorithms/radix'

function Sort() {

    const [arr, setArr] = useState([])

    useEffect(() => {
        const randArr = Array(100).fill().map((e, idx) => idx + 1)
        setArr(randArr)
    }, [setArr])

    const durstenfeldShuffle = (inputArr) => {
        for (let i = inputArr.length -1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1))
            const temp = inputArr[i]
            inputArr[i] = inputArr[j]
            inputArr[j] = temp;
        }
    }

    const showBubbleSort = () => {
        const sortedArr = bubble(arr)
        console.log(sortedArr)
    }
    const showSelectionSort = () => {
        const sortedArr = selection(arr)
        console.log(sortedArr)
    }
    const showInsertionSort = () => {
        const sortedArr = insertion(arr)
        console.log(sortedArr)
    }
    const showMergeSort = () => {
        const sortedArr = merge(arr)
        console.log(sortedArr)
    }
    const showQuickSort = () => {
        durstenfeldShuffle(arr)
        const sortedArr = quick(arr)
        console.log(sortedArr)
    }
    const showRadixSort = () => {
        durstenfeldShuffle(arr)
        const sortedArr = radix(arr)
        console.log(sortedArr)
    }

    return (
        <div className="Sort">
            <div className="sort-nav">
                <button onClick={showBubbleSort}>Bubble Sort</button>
                <button onClick={showSelectionSort}>Selection Sort</button>
                <button onClick={showInsertionSort}>Insertion Sort</button>
                <button onClick={showMergeSort}>Merge Sort</button>
                <button onClick={showQuickSort}>Quick Sort</button>
                <button onClick={showRadixSort}>Radix Sort</button>
            </div>
        </div>
    )

}

export default Sort