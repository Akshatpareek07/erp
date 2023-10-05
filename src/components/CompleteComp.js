import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai';
import '../loginUser.css';

const CompleteComp = (props) => {
  return (
    <div className='todo-list-item' key={props.key}>
    <div>
        <h3>{props.itm.taskName}</h3>
        <p>{props.itm.taskDescription}</p>
        <p><small>{props.itm.isComplete}</small></p>
    </div>
    <div>
        <AiOutlineDelete className='icon' onClick={props.deleteEvent} title='Delete?'/>
    </div>
    </div>
  )
}

export default CompleteComp