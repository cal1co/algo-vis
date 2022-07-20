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
        const randArr = generateArr(100)
        setArr(randArr)
    }, [setArr])


    const generateArr = (arrLength) => {
        return Array(arrLength).fill().map((e, idx) => idx + 1)
    }
    const renderBoard = (board=arr) => {
        return board.map((length) => {
            return <div className={`sort-item sorted-${length}`} id={`sort-${length}`} key={length} style={{width: "0.8%", height:`${length}%`}}></div>
        })
    }

    const shuffleBoard = (board=arr) => {
        durstenfeldShuffle(board)
        console.log(board)
        board.forEach((item, idx) => {
            const sortItem = document.getElementsByClassName(`sorted-${idx+1}`)
            sortItem[0].style.height = `${item}%`
            sortItem[0].id = `sort-${item}`
        })
        setArr(board)
    }
    const durstenfeldShuffle = (inputArr) => {
        for (let i = inputArr.length -1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1))
            const temp = inputArr[i]
            inputArr[i] = inputArr[j]
            inputArr[j] = temp;
        }
    }

    const visualiseBubble = (arrHistory) => {
        for (let i = 0; i <= arrHistory.length; i++){
            if (i === arrHistory.length){
                console.log("END")
                setTimeout(() => {
                    for (let i = 0; i < 100; i++){
                        const item = document.getElementById(`sort-${i + 1}`)
                        setTimeout(() => {
                            item.classList.add("sort-visited")
                        }, 5 * i)
                        // item.classList.remove("sort-visited")
                    }
                }, 1 * i)
                return 
            }
            const index1 = arrHistory[i][0]
            const index2 = arrHistory[i][1]
            const itemOne = document.getElementById(`sort-${index1}`)
            const itemTwo = document.getElementById(`sort-${index2}`)
            setTimeout(() => {
                itemOne.style.height = `${index2}%`
                itemTwo.style.height = `${index1}%`
                itemOne.style.backgroundColor = 'red'
                itemTwo.style.backgroundColor = 'red'
                setTimeout(() => {
                    itemOne.style.backgroundColor = 'black'
                    itemTwo.style.backgroundColor = 'black'
                }, 1)
            }, 1 * i)
            
            itemOne.id = `sort-${index2}`
            itemTwo.id = `sort-${index1}`
        }
    }

    const showBubbleSort = () => {
        const sortedArr = bubble(arr)
        console.log(sortedArr)
        visualiseBubble(sortedArr)
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

            <div className="sort-board">
                {renderBoard()}

            </div>

            <div className="shuffle-butt">
                <button className="shuffle-board" onClick={() => shuffleBoard(arr)}>Shuffle Board</button>
            </div>
        </div>
    )

}

export default Sort