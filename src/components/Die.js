import {nanoid} from "nanoid"

export default function Die(props){
    let  dotElements = [];
    for(let i=0;i<props.value;i++){
        dotElements.push(<div key={nanoid()} className='die-dot'></div>)
    }
const styles = {
    backgroundColor : props.isHeld? "#59E391":"white"
}
    return(
        <div className="die" style={styles} onClick={()=>props.holdDie(props.id)}>
            <div className="dot-container">
                {dotElements}
            </div>
        </div>

    )
}