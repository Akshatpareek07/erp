import React, {useState,useEffect} from 'react';
import '../loginUser.css';
import ButtonComp  from './ButtonComp';
import ListComp from './ListComp';
import CompleteComp from './CompleteComp';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate=useNavigate();
    const [isCompleteScreen,setIsCompleteScreen]=useState(false);
    const [allTodos,setTodos]=useState([]);
    const [completedTodos,setCompletedTodos]=useState([]);
    const [inputField,setInputField]=useState({
        taskName:'',
        taskDescription:''
      });
      const [errField,setErrField]=useState({
        taskNameErr:'',
        taskDescriptionErr:''
      });

const inputHandler=(e)=>{
        setInputField({...inputField, [e.target.name]:e.target.value});
      }

const handleAddTodo=async ()=>{
        if(validForm())
        {
        let url='http://localhost:4000/loginUser/add'
        let options={
        method:"POST",
        url:url,
        header:{
        },
        data:inputField

        }
    try{
      let response=await axios(options)
      if(response.status===200)
      {
        toast.success("Added Successfully");
        // history.push('/login');
        // <Redirect to="/login" />
        // <Login/>
        navigate('/loginUser');
      }
    }catch(e){
      toast.error("Error!Unable to add");
      
    }
    }
    else 
    toast.error("Invalid Form");       
    }

    const validForm=()=>{

        let formValid=true;
        setErrField({
            taskNameErr:'',
            taskDescriptionErr:''
        });
        if(inputField.taskName==='')
        {
          setErrField((errField)=>({...errField,taskNameErr:'Please Enter Task Name'}));
          formValid=false;
        //   console.log(errField);
        }
        if(inputField.taskDescription==='')
        {
          setErrField((errField)=>({...errField,taskDescriptionErr:'Please Enter Task Description'}));
          formValid=false;
          
          console.log(errField);
        }
     
        return formValid;
      }
    

    const handleComplete=async (index)=>{
           let now=new Date();
           let dd=now.getDate();
           let mm=now.getMonth()+1;
           let yyyy=now.getFullYear();
           let h=now.getHours();
           let m=now.getMinutes();
           let s=now.getSeconds();
           let completedOn=dd+"-"+mm+"-"+yyyy+"at"+h+":"+m+":"+s;

           const filteredItem={
            ...allTodos[index],
            completedOn:completedOn
           }
           let updateCompleteArr=[...completedTodos,filteredItem];
           setCompletedTodos(updateCompleteArr);
           let removeTodoArr=[...allTodos];
           removeTodoArr.splice(index,1);
           setTodos(removeTodoArr); 
           let response= await axios.patch( `http://localhost:4000/loginUser/statusUpdate/${allTodos[index]._id}/${completedOn}`);
           if(response.data.updatedItem._id===allTodos[index]._id)
           toast.success("yeee! task Completed");
            else
            toast.error("Error ! Unable to Update Status");
    }

    const handelDeleteCompleteTodo=async (index)=>{
        let removeCompleteTodoArr=[...completedTodos];
        removeCompleteTodoArr.splice(index,1);
       let response= await axios.delete( `http://localhost:4000/loginUser/delete/${completedTodos[index]._id}`);
        setCompletedTodos(removeCompleteTodoArr);
        if(response.data.message==="Todo deleted successfully")
        toast.success("Deleted Successfully");
        else
        toast.error("Error ! Unable to Deleted");
        
     }

    const handelDeleteTodo=async (index)=>{

       let removeTodoArr=[...allTodos];
       removeTodoArr.splice(index,1);
       let response= await axios.delete( `http://localhost:4000/loginUser/delete/${allTodos[index]._id}`);
       setTodos(removeTodoArr); 
       if(response.data.message==="Todo deleted successfully")
        toast.success("Deleted Successfully");
        else
        toast.error("Error ! Unable to Deleted");
    }

    const fetchData=async ()=>{
        try{
        let response= await axios.get("http://localhost:4000/loginUser/find")
        if(response.status===200)
        {
            setTodos(response.data.allTasks);
            const newArr=allTodos.map((item,index)=>{
                return item.isComplete!=="NO"?item:null;
            }
            )
            setCompletedTodos(newArr);
        }
        }catch(e){
        toast.error("Error!Unable to Fetch");
        
        }
     
    }

    useEffect (() => {    
        fetchData();
      });

    return (
    <div className="App">
        <h1>My Todos</h1>
        <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className="todo-input-item">
                        <label  for="title">Title</label>
                        <input type="text" placeholder="Title of task" name="taskName" id="title" value={inputField.taskName} onChange={inputHandler}></input>
                        {errField.taskNameErr.length>0&&<span className='span'>{errField.taskNameErr}</span>}
                    </div>
                    <div className="todo-input-item">
                        <label for="description">Discription</label>
                        <input type="text" placeholder="Description of task" name="taskDescription" id="description" value={inputField.taskDescription} onChange={inputHandler}></input>
                        {errField.taskDescriptionErr.length>0&&<span className='span'>{errField.taskDescriptionErr}</span>}
                    </div>
                    <div className="todo-input-button">

                    <ButtonComp class="primaryBtn" event={handleAddTodo} toAdd="Add"/>
                    </div>
                </div>
                <div className='btn-area'>
                    <ButtonComp class={`secondaryBtn ${isCompleteScreen===false && 'active'}`} event={()=>setIsCompleteScreen(false)} toAdd="ToDo"/>
                    <ButtonComp class={`secondaryBtn ${isCompleteScreen===true && 'active'}`} event={()=>setIsCompleteScreen(true)} toAdd="Complete"/>
                </div>
                <div className='todo-list'>
                        {isCompleteScreen===false && allTodos.map((item,index)=>{
                            return item.isComplete==="NO"?(<ListComp
                                key={index}
                                itm={item}
                                deleteEvent={()=>handelDeleteTodo(index)} 
                                completeEvent={()=>handleComplete(index)} 
                            />):null;
                            
                        }
                        )}
                        {isCompleteScreen===true &&allTodos.map((item,index)=>{
                            return item.isComplete!=="NO"?(<CompleteComp
                                        key={index}
                                        itm={item}
                                        deleteEvent={()=>handelDeleteCompleteTodo(index)} 
                            />):null;
                        }
                        )}
                        
                    
                </div>
        </div>
    </div>
  );
}

export default App;
