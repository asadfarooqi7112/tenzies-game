import './App.css';
import Die from './components/Die';
import {useEffect, useState} from "react"
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"

function App() {


  function allNewDice(){
    const diceValues = []
    for(let i=0;i<10;i++){
      diceValues.push({value: Math.ceil(Math.random()*6),isHeld:false,id:nanoid()})
    }
    return diceValues
  }
  const [diceValues, setDiceValue] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{

    const checkHeld = diceValues.every(val=>val.isHeld)
    let firstValue = diceValues[0].value
    let allSameValues = diceValues.every(val=>firstValue===val.value)
    if(checkHeld && allSameValues){
      setTenzies(true)
      console.log("You Won")
    }
  },
  [diceValues])

  const diceElements = diceValues.map(dicevalue=><Die 
    value = {dicevalue.value} 
    isHeld = {dicevalue.isHeld}
    holdDice = {()=>holdDice(dicevalue.id)}
    />)

  function diceRoll(){
    setDiceValue(oldDiceValue=>oldDiceValue.map(val=>val.isHeld===true?val:{value: Math.ceil(Math.random()*6),isHeld:false,id:nanoid()}))
  }

  function holdDice(id){
    setDiceValue(odiceValues=>odiceValues.map(val=>val.id===id?{...val,isHeld:!val.isHeld}:val))
  }

  function resetDice(){
    setDiceValue(allNewDice())
    setTenzies(false)
  }
  return (
    <div className="App">
      <main>
        {tenzies && 
        <Confetti
        />
        }
        <div className = "die-div">
          {diceElements}
        </div>
        <button onClick = {tenzies? resetDice: diceRoll} className='roll-button'>{tenzies? "New Game": "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
