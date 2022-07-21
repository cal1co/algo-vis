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
    const [len, setLen] = useState(20)
    const [time, setTime] = useState(50)

    useEffect(() => {
        const randArr = generateArr(len)
        setArr(randArr)
    }, [setArr])


    const generateArr = (arrLength) => {
        return Array(arrLength).fill().map((e, idx) => idx + 1)
    }
    const renderBoard = (board=arr) => {
        const width = 80 / len
        const margin = 20 / len
        return board.map((length) => {
            return <div className={`sort-item sorted-${length}`} id={`sort-${length}`} key={length} style={{width: `${width}%`, height:`${length / len * 100}%`, marginLeft:`${margin}%`}}></div>
        })
    }

    const shuffleBoard = (board=arr) => {
        if (board.length === 0){
            board = Array(len).fill().map((e, idx) => idx + 1)
        }
        durstenfeldShuffle(board)
        console.log(board)
        board.forEach((item, idx) => {
            const sortItem = document.getElementsByClassName(`sorted-${idx+1}`)
            sortItem[0].style.height = `${item / len * 100}%`
            sortItem[0].id = `sort-${item}`
            const sortedItem = document.getElementById(`sort-${item}`)
            // console.log(sortItem, sortedItem)
            // console.log(sortedItem.classList)
            if (sortedItem.classList.contains("sort-visited")){
                sortedItem.classList.remove("sort-visited")
            }
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
    const finisherAnimation = () => {
        for (let i = 0; i < len; i++){
            const item = document.getElementById(`sort-${i + 1}`)
            setTimeout(() => {
                item.classList.add("sort-visited")
            }, 5 * i)
            item.classList.remove("sort-visited")
        }
    }
    const animate = (itemOne, itemTwo, swap, index1, index2, i) => {
        setTimeout(() => {
            if (swap){
                itemOne.style.height = `${index2 / len * 100}%`
                itemTwo.style.height = `${index1 / len * 100}%`
            }
            itemOne.style.backgroundColor = 'red'
            itemTwo.style.backgroundColor = 'red'
            setTimeout(() => {
                itemOne.style.backgroundColor = 'black'
                itemTwo.style.backgroundColor = 'black'   
            }, 5)
        }, time * i)
    }
    const visualiseBubble = (arrHistory) => {
        for (let i = 0; i <= arrHistory.length; i++){
            if (i === arrHistory.length){
                console.log("END")
                setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                return 
            }
            const index1 = arrHistory[i][0]
            const index2 = arrHistory[i][1]
            const itemOne = document.getElementById(`sort-${index1}`)
            const itemTwo = document.getElementById(`sort-${index2}`)
            setTimeout(() => {
                itemOne.style.height = `${index2 / len * 100}%`
                itemTwo.style.height = `${index1 / len * 100}%`
                itemOne.style.backgroundColor = 'red'
                itemTwo.style.backgroundColor = 'red'
                setTimeout(() => {
                    itemOne.style.backgroundColor = 'black'
                    itemTwo.style.backgroundColor = 'black'
                }, 1)
            }, time * i)
            
            itemOne.id = `sort-${index2}`
            itemTwo.id = `sort-${index1}`
        }
    }
    const visualiseSelection = (arrHistory) => {
        for (let i = 0; i <= arrHistory.length; i++){
            // console.log(arrHistory[i])
            if (i === arrHistory.length){
                console.log("END")
                setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                return 
            }
            const index1 = arrHistory[i][0]
            const index2 = arrHistory[i][1]
            const itemOne = document.getElementById(`sort-${index1}`)
            const itemTwo = document.getElementById(`sort-${index2}`)
            
            if (arrHistory[i].length === 2){
                animate(itemOne, itemTwo, false, index1, index2, i)
            }
            if (arrHistory[i].length === 3){
                animate(itemOne, itemTwo, true, index1, index2, i)
                itemOne.id = `sort-${index2}`
                itemTwo.id = `sort-${index1}`
            }
        }
    }
    const visualiseInsertion = (arrHistory) => {
        for (let i = 0; i <= arrHistory.length; i++){
            if (i === arrHistory.length){
                console.log("END")
                setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                return
            }
            const index1 = arrHistory[i][0]
            const index2 = arrHistory[i][1]
            const itemOne = document.getElementById(`sort-${index1}`)
            const itemTwo = document.getElementById(`sort-${index2}`)
            animate(itemOne, itemTwo, true, index1, index2, i)
            itemOne.id = `sort-${index2}`
            itemTwo.id = `sort-${index1}`
        }
    }
    const visualiseMerge = (arrHistory) => {

        for (let i = 0; i <= arrHistory.length; i++){
            if (i === arrHistory.length){
                console.log("END")
                setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                return
            }

            const swap = (i) => {
                const index1 = arrHistory[i][0]
                const index2 = arrHistory[i][1]
                const itemOne = document.getElementById(`sort-${index1}`)
                const itemTwo = document.getElementById(`sort-${index2}`)
                animate(itemOne, itemTwo, true, index1, index2, i)
                itemOne.id = `sort-${index2}`
                itemTwo.id = `sort-${index1}`
            }

            const currArr = arrHistory[i]
            const arr1 = [...currArr[0]]
            const arr2 = [...currArr[1]]

            if (currArr.length === 1){
                continue;
            }
            if (arr1.length === 1 && arr2.length === 1){
                if (arr1[0] > arr2[0]){
                    swap(i)
                } 
            } 
            if (arr1.length > 1 || arr2.length > 1){
                const tempArr = []
                let count = 0
                const copyArr = [...arr1, ...arr2].flat()
                while (arr1.length && arr2.length){
                    let value
                    if (arr1[0] > arr2[0]){
                        value = arr2.shift()
                        tempArr.push(value)
                    } else {
                        value = arr1.shift()
                        tempArr.push(value)
                    }
                    if (tempArr[count] !== copyArr[count]){
                        const itemOne = document.getElementById(`sort-${tempArr[count]}`)
                        const itemTwo = document.getElementById(`sort-${copyArr[count]}`)
                        animate(itemOne, itemTwo, true, tempArr[count], copyArr[count], i)
                        itemOne.id = `sort-${copyArr[count]}`
                        itemTwo.id = `sort-${tempArr[count]}`
                        const value = copyArr[count]
                        const swapIdx = copyArr.indexOf(tempArr[count])
                        copyArr[count] = tempArr[count]
                        copyArr[swapIdx] = value
                    }

                    count++
                }
                while (arr1.length){
                    const arr1Val = arr1.shift()
                    tempArr.push(arr1Val)
                    if (tempArr[count] !== copyArr[count]){
                        const itemOne = document.getElementById(`sort-${tempArr[count]}`)
                        const itemTwo = document.getElementById(`sort-${copyArr[count]}`)
                        animate(itemOne, itemTwo, true, tempArr[count], copyArr[count], i)
                        itemOne.id = `sort-${copyArr[count]}`
                        itemTwo.id = `sort-${tempArr[count]}`
                        const value = copyArr[count]
                        const swapIdx = copyArr.indexOf(tempArr[count])
                        copyArr[count] = tempArr[count]
                        copyArr[swapIdx] = value
                    }
                    count++
                }
                while (arr2.length){
                    const arr2Val = arr2.shift()
                    tempArr.push(arr2Val)
                    if (tempArr[count] !== copyArr[count]){
                        const itemOne = document.getElementById(`sort-${tempArr[count]}`)
                        const itemTwo = document.getElementById(`sort-${copyArr[count]}`)
                        animate(itemOne, itemTwo, true, tempArr[count], copyArr[count], i)
                        itemOne.id = `sort-${copyArr[count]}`
                        itemTwo.id = `sort-${tempArr[count]}`
                        const value = copyArr[count]
                        const swapIdx = copyArr.indexOf(tempArr[count])
                        copyArr[count] = tempArr[count]
                        copyArr[swapIdx] = value
                    }
                    count++
                }
            }
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
        visualiseSelection(sortedArr)
    }
    const showInsertionSort = () => {
        const sortedArr = insertion(arr)
        console.log(sortedArr)
        visualiseInsertion(sortedArr)
    }
    const showMergeSort = () => {
        const sortedArr = merge(arr)
        console.log(sortedArr)
        visualiseMerge(sortedArr) 
    }
    const showQuickSort = () => {
        const sortedArr = quick(arr)
        console.log(sortedArr)
    }
    const showRadixSort = () => {
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