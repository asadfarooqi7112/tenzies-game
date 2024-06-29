
export default function Die(props){
  return (  
        <div onClick = {props.holdDice}className = {props.isHeld?"held-die":"die"}>
            <h2>{props.value}</h2>
        </div>
    )
}