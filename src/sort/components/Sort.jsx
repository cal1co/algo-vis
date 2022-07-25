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
    const [len, setLen] = useState(100)
    const [time, setTime] = useState(2)
    const [sliderVal, setSliderVal] = useState(2)
    const [timers, setTimers] = useState([])
    const [started, setStarted] = useState(false)
    const [choiceSet, setChoiceSet] = useState(false)
    const [shuffled, setShuffled] = useState(false)
    const [bubbleSet, setBubbleSet] = useState(false)
    const [selectionSet, setSelectionSet] = useState(false)
    const [insertionSet, setInsertionSet] = useState(false)
    const [mergeSet, setMergeSet] = useState(false)


    useEffect(() => {
        const randArr = generateArr(len)
        setArr(randArr)
        renderBoard(randArr)
    }, [setArr])

    const generateArr = (arrLength) => {
        return Array(arrLength).fill().map((e, idx) => idx + 1)
    }
    const renderBoard = (board=arr, inputLen=len) => {
        const div = document.getElementById("board-div")
        while (div.firstChild){
            div.removeChild(div.firstChild)
        }
        // console.log(div)
        const width = 80 / inputLen
        const margin = 20 / inputLen
        return board.map((length) => {
            const node = document.createElement("div")
            node.className = `sort-item sorted-${length}`
            node.id = `sort-${length}`
            node.style.height = `${length / inputLen * 100}%`
            node.style.width = `${width}%`
            node.style.marginLeft = `${margin}%`
            div.appendChild(node)
        })
    }

    const shuffleBoard = (board=arr) => {
        setShuffled(true)
        if (board.length === 0){
            board = Array(len).fill().map((e, idx) => idx + 1)
        }
        durstenfeldShuffle(board)
        board.forEach((item, idx) => {
            const sortItem = document.getElementsByClassName(`sorted-${idx+1}`)
            sortItem[0].style.height = `${item / len * 100}%`
            sortItem[0].id = `sort-${item}`
            const sortedItem = document.getElementById(`sort-${item}`)
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
            const timeout = setTimeout(() => {
                item.classList.add("sort-visited")
            }, 5 * i)
            item.classList.remove("sort-visited")
            timers.push(timeout)
            if (i === len - 1) {
                setTimeout(() => {
                    setStarted(false)
                }, 5 * i)
            }
        }
    }
    const animate = (itemOne, itemTwo, swap, index1, index2, i) => {
        const timeout = setTimeout(() => {
            if (swap){
                itemOne.style.height = `${index2 / len * 100}%`
                itemTwo.style.height = `${index1 / len * 100}%`
            }
            itemOne.style.backgroundColor = 'red'
            itemOne.style.outline = '0.5px solid red'
            itemTwo.style.backgroundColor = 'red'
            itemTwo.style.outline = '0.5px solid red'
            const innerTimeout = setTimeout(() => {
                itemOne.style.backgroundColor = 'black'
                itemOne.style.outline = '0.5px solid white'
                itemTwo.style.backgroundColor = 'black'   
                itemTwo.style.outline = '0.5px solid white'   
            }, 3)
            timers.push(innerTimeout)
        }, time * i)
        timers.push(timeout)
    }

    const visualiseBubble = (arrHistory) => {
        for (let i = 0; i <= arrHistory.length; i++){
            if (i === arrHistory.length){
                console.log("END")
                const timeout = setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                timers.push(timeout)
                return 
            }
            const index1 = arrHistory[i][0]
            const index2 = arrHistory[i][1]
            const itemOne = document.getElementById(`sort-${index1}`)
            const itemTwo = document.getElementById(`sort-${index2}`)
            const timeout = setTimeout(() => {
                itemOne.style.height = `${index2 / len * 100}%`
                itemTwo.style.height = `${index1 / len * 100}%`
                itemOne.style.backgroundColor = 'red'
                itemTwo.style.backgroundColor = 'red'
                const innerTimeout = setTimeout(() => {
                    itemOne.style.backgroundColor = 'black'
                    itemTwo.style.backgroundColor = 'black'
                }, 1)
                timers.push(innerTimeout)
            }, time * i)
            itemOne.id = `sort-${index2}`
            itemTwo.id = `sort-${index1}`
            timers.push(timeout)
        }
    }
    const visualiseSelection = (arrHistory) => {
        for (let i = 0; i <= arrHistory.length; i++){
            // console.log(arrHistory[i])
            if (i === arrHistory.length){
                console.log("END")
                const timeout = setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                timers.push(timeout)
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
                const timeout = setTimeout(() => {
                    finisherAnimation()
                }, time * i)
                timers.push(timeout)
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
                const timeout = setTimeout(() => {
                    finisherAnimation()
                }, i * time * 10)
                timers.push(timeout)
                return
            }

            const swap = (i) => {
                const index1 = arrHistory[i][0]
                const index2 = arrHistory[i][1]
                const itemOne = document.getElementById(`sort-${index1}`)
                const itemTwo = document.getElementById(`sort-${index2}`)
                animate(itemOne, itemTwo, true, index1, index2, i * 10)
                itemOne.id = `sort-${index2}`
                itemTwo.id = `sort-${index1}`
            }

            const currArr = arrHistory[i]
            const arr1 = [...currArr[0]]
            const arr2 = [...currArr[1]]
            

            if (currArr.length === 1){
                continue;
            }
            // const timeout = setTimeout(() => {
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
                            animate(itemOne, itemTwo, true, tempArr[count], copyArr[count], i * 10)
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
                            animate(itemOne, itemTwo, true, tempArr[count], copyArr[count], i * 10)
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
                            animate(itemOne, itemTwo, true, tempArr[count], copyArr[count], i * 10)
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
            // }, i * time * 5)
            // timers.push(timeout)
        }
    }
    const visualiseQuick = (arrHistory) => {

    }
    const visualiseRadix = (arrHistory) => {
        for( let i = 0; i < arrHistory.length; i++){
            let referenceArr = [...arrHistory[i + 1]]
            console.log("REF", referenceArr)
            console.log("INPUT", arrHistory[i])
            for (let j = 0; j < referenceArr.length; j++){
                if (referenceArr[j] !== arrHistory[i][j]){
                    const itemOne = document.getElementById(`sort-${referenceArr[j]}`)
                    const itemTwo = document.getElementById(`sort-${arrHistory[i][j]}`)
                    animate(itemOne, itemTwo, true, referenceArr[j], arrHistory[i][j], j * (i + 1))
                    itemOne.id = `sort-${arrHistory[i][j]}`
                    itemTwo.id = `sort-${referenceArr[j]}`
                    const value = arrHistory[i][j]
                    const swapIdx = arrHistory[i].indexOf(referenceArr[j])
                    // console.log("SWAP IDX", swapIdx, "SWAP VAL", arrHistory[i][swapIdx])
                    arrHistory[i][j] = referenceArr[j]
                    arrHistory[i][swapIdx] = value
                    // console.log("CHANGED VAL", arrHistory[i][swapIdx])
                } else {
                    const timeout = setTimeout(() => {
                        const item = document.getElementById(`sort-${arrHistory[i][j]}`)
                        item.style.backgroundColor = 'red'
                        const innerTimeout = setTimeout(() => {
                            item.style.backgroundColor = 'black'
                        }, 5)
                        timers.push(innerTimeout)
                    }, (i+1) * j)
                    timers.push(timeout)
                }
            }
            
            console.log("SWITCHED", arrHistory[i])
            // referenceArr = arrHistory[i + 1]
            console.log("REF", referenceArr)
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
        visualiseRadix(sortedArr)
    }

    const handleSlider = (ev) => {
        // console.log(ev.target.value)
        const sliderValue = ev.target.value
        setSliderVal(sliderValue)

        if (sliderValue == 0){
            setLen(10)
            const getArr = generateArr(10)
            setArr(getArr)
            renderBoard(getArr, 10)
        }
        if (sliderValue == 1){
            setLen(25)
            const getArr = generateArr(25)
            setArr(getArr)
            renderBoard(getArr, 25)

        }
        if (sliderValue == 2){
            setLen(50)
            const getArr = generateArr(50)
            setArr(getArr)
            renderBoard(getArr, 50)

        }
        if (sliderValue == 3){
            setLen(100)
            const getArr = generateArr(100)
            setArr(getArr)
            renderBoard(getArr, 100)

        }
        if(sliderValue == 4){
            setLen(250)
            const getArr = generateArr(250)
            setArr(getArr)
            renderBoard(getArr, 250)

        }
        if(sliderValue == 5){
            setLen(500)
            const getArr = generateArr(500)
            setArr(getArr)
            renderBoard(getArr, 500)

        }
        if(sliderValue == 6){
            setLen(750)
            const getArr = generateArr(750)
            setArr(getArr)
            renderBoard(getArr, 750)

        }
    }
    const handleSpeed = (ev) => {
        const value = ev.target.value
        setTime(value)
    }
    const handleStartStop = () => {
        setShuffled(false)
        if (started) {
            setStarted(false)
            while (timers.length){
                window.clearTimeout(timers.shift())
            }
        }
        if (!started) {
            setStarted(true)
            if (bubbleSet) showBubbleSort()
            if (selectionSet) showSelectionSort()
            if (insertionSet) showInsertionSort()
            if (mergeSet) showMergeSort()
        }
    }
    const switchAlgo = (algo) => {
        if ( algo === 'b' ) {
            setBubbleSet(true)
            setSelectionSet(false)
            setInsertionSet(false)
            setMergeSet(false)
        }
        if ( algo === 's' ) {
            setBubbleSet(false)
            setSelectionSet(true)
            setInsertionSet(false)
            setMergeSet(false)
        }
        if ( algo === 'i' ) {
            setBubbleSet(false)
            setSelectionSet(false)
            setInsertionSet(true)
            setMergeSet(false)
        }
        if ( algo === 'm' ) {
            setBubbleSet(false)
            setSelectionSet(false)
            setInsertionSet(false)
            setMergeSet(true)
        }
        setChoiceSet(true)
    }

    return (
        <div className="Sort">
            <div className="vis-title">
                <h1 className="algo-type">Algo-Vis: Sorting Algorithm Visualiser</h1> 
            </div>
            <div className="sort-nav">
                <div className="sort-btn bubble" onClick={() => switchAlgo('b')} style={{color: bubbleSet ? '#03997E' : 'white'}}>Bubble Sort</div>
                <div className="sort-btn selection" onClick={() => switchAlgo('s')}style={{color: selectionSet ? '#03997E' : 'white'}}>Selection Sort</div>
                <div className="sort-btn insertion" onClick={() => switchAlgo('i')} style={{color: insertionSet ? '#03997E' : 'white'}}>Insertion Sort</div>
                <div className="sort-btn merge" onClick={() => switchAlgo('m')} style={{color: mergeSet ? '#03997E' : 'white'}}>Merge Sort</div>
                {/* <button onClick={showQuickSort}>Quick Sort</button> */}
                {/* <button onClick={showRadixSort}>Radix Sort</button> */}
            </div>
        
            <div className="sort-board" id="board-div">
                {/* {renderBoard()} */}
            </div>

            <div className="sort-setting-utils">
                <div className="length-slider slider">
                    <form action="post">
                        <input id="sample-size" name="sample-size" type="range" min="0" max="5" step="1" value={sliderVal} onChange={handleSlider} style={{disabled:'true'}}/>
                        <label htmlFor="sample-size">sample size</label>
                    </form>
                </div>
                <div className="shuffle-butt">
                    <button className="shuffle-board" onClick={() => shuffleBoard(arr)} disabled={started ? true : false}>Shuffle Board</button>
                </div>
                <button className="stop-sort" onClick={handleStartStop} style={{display: started ? 'none' : 'block'}} disabled={shuffled && choiceSet ? false : true}>
                        Start
                    </button>
                <button className="stop-sort" onClick={handleStartStop}style={{display: started ? 'block' : 'none'}}>
                    Reset
                </button>
                <div className="time-slider slider">
                    <form action="post">
                        <input id="speed-size" name="speed-size" type="range" min="10" max="100" step="5" value={time} onChange={handleSpeed}/>
                        <label htmlFor="speed-size">speed</label>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Sort