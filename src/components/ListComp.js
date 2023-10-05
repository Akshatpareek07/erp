import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import '../loginUser.css';

const ListComp = (props) => {
  return (
    <div className='todo-list-item' key={props.key}>
    <div>
        <h3>{props.itm.taskName}</h3>
        <p>{props.itm.taskDescription}</p>
    </div>
    <div>
        <AiOutlineDelete className='icon' onClick={props.deleteEvent} title='Delete?'/>
        <BsCheckLg className='check-icon' onClick={props.completeEvent} title='Completed?'/>
    </div>
 </div>
  )
}

export default ListComp