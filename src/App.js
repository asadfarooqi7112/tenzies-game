import { useEffect, useState } from 'react';
import './App.css';
import Die from "./components/Die.js"
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"

function App() {

  //------States here -----------------//

  const [dieValue, setDieValue] = useState(allDieValues())
  const [tenzies, setTenzies] = useState({tenziesStarted:false, tenziesWon:false})
  const [count, setCount] = useState(0)
  const [startTime, setStartTime] = useState({})

  useEffect(()=>{
    const allHeld = dieValue.every(die=>die.isHeld)
    let allSameValues = dieValue.every(die=>dieValue[0].value===die.value);

    if(allHeld && allSameValues){
      setTenzies( prev=>({...prev,tenziesWon:true}))
      const timeLapsed = Math.floor((new Date() - startTime)/1000)

      if(localStorage.getItem("best-time")===null){
        localStorage.setItem("best-time",timeLapsed)
        console.log(localStorage.getItem(timeLapsed))
      }
      else if(timeLapsed<localStorage.getItem("best-time")){
        localStorage.setItem("best-time",timeLapsed)
      }
    }
  }
    ,[dieValue,startTime])

  //---------Functions Here ------------//

  function allDieValues(){       //Generates an array of objects contaning randomly generated values
    const randomNumbersArray = []
    for (let i=0;i<10;i++){ 
      randomNumbersArray.push({
        value:Math.ceil(Math.random()*6), 
        isHeld:false,
        id: nanoid(),
      })
    }
    return randomNumbersArray
  }

  //onClick function for the main button

  function rollTheDice(){ 
    !tenzies.tenziesStarted && setStartTime(new Date())
    setTenzies(prev=>({...prev,tenziesStarted:true}))
    tenzies.tenziesWon?setDieValue(allDieValues):setDieValue(prevDieValue => prevDieValue.map(die=>die.isHeld===true?die:{...die, value:Math.ceil(Math.random()*6)}))

    if(tenzies.tenziesWon){
      setStartTime(new Date())
      setTenzies( prev=>({...prev,tenziesWon:false}))
      setCount(0)
    }
    else{
      setCount(prevCount=>prevCount+1)
    }
  
  }
  // onCLick function for the dices
  function holdDie(id){
    tenzies.tenziesStarted && setDieValue(prevDieValue => prevDieValue.map(die=>die.id===id?{...die, isHeld:!die.isHeld}:die
    ))
  }
  //---------Array ELements here -------------
  const dieElements = dieValue.map(die=><Die 
    key = {die.id}
    value = {die.value}
    isHeld = {die.isHeld}
    id = {die.id}
    holdDie = {holdDie}
    />)

  return (
    <div className="App">   
      <main className='main-container'>
        {tenzies.tenziesWon && <Confetti/>}
        <h1>Tenzies</h1>
        <p className='main-text'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <h3 className='best-time'>Best Time: {localStorage.getItem("best-time")===null? "----" :`${localStorage.getItem("best-time")} Seconds`}</h3>
        <div className='die-container'>
          {dieElements}
        </div>
        <button className="main-button"
          onClick = {rollTheDice} 
          style={tenzies.tenziesStarted?(tenzies.tenziesWon?{backgroundColor:'green'}:{backgroundColor:'#5035FF'}):{backgroundColor:'green'}}
          >
            {tenzies.tenziesStarted?(tenzies.tenziesWon?"Start Again":"Roll"):"Start"}
        </button>
        {tenzies.tenziesWon && <h1 className="you-won">You Won</h1>}
        {tenzies.tenziesWon && <h4 >Took you {count} rolls and {Math.floor((new Date() - startTime)/1000)} seconds to win</h4>}
      </main>
    </div>
  );
}

export default App;
