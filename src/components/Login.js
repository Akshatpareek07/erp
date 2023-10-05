import React,{useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Nav from '../widgets/Nav'
import { useNavigate } from 'react-router-dom';
import './loginUser'
import '../loginUser.css'

const Login = () => {
  
  const navigate = useNavigate();
  const [inputField,setInputField]=useState({ 
    email:'',
    password:''
   });
  const [errField,setErrField]=useState({
   
    emailErr:'',
    passwordErr:''
  });

  const inputHandler=(e)=>{
    setInputField({...inputField, [e.target.name]:e.target.value});
  }
  const LoginUser=async ()=>{
    if(validForm())
    {
     let url='http://localhost:4000/login'
     let options={
      method:"POST",
      url:url,
      header:{
      },
      data:inputField

    }
    try{
      let response=await axios(options)

      if(response.data.data.message==="Login Successfully")
      {
        toast.success("LogIn Successfully");
        // history.push('/login');
        // <Redirect to="/login" />
        // <Login/>
        navigate('/loginUser');

      }
    }catch(e){
      toast.error("Error!Unable to Login");
      
    }
    }
  else 
  toast.error("Invalid EmailId Password ");

  }
  const validForm=()=>{

    let formValid=true;
    setErrField({
      emailErr:'',
      passwordErr:''
    });
    if(inputField.email==='')
    {
      setErrField((errField)=>({...errField,emailErr:'Please Enter Email'}));
      formValid=false;
      // console.log(errField);
    }
    if(inputField.password==='')
    {
      setErrField((errField)=>({...errField,passwordErr:'Please Enter Passwords'}));
      formValid=false;
      // console.log(errField);
    }
    return formValid;
  }
  const toRegistation=()=>{
    navigate('/registration');
  }
  return (

    <div>
      <Nav/>
      <div className='container'>
    <div>
      <h3>Login</h3><br/>
      <div className='form_container'>
        <form action='/login-user' method='post' className='form'>
          <div className='form_item'>
              <div className='ip_item'>
                <label for='email'>Email</label>
                <input type='email' id='email' name='email' value={inputField.email}
                onChange={inputHandler}/>
              </div>
              {errField.emailErr.length>0&&<span className='span'>{errField.emailErr}</span>}
          </div>
          <div className='form_item'>
          <div className='ip_item'>
              <label for='password'>Password</label>
              <input type='password' id='password' name='password' value={inputField.password}
              onChange={inputHandler}/>
              </div>
              {errField.passwordErr.length>0&&<span className='span'>{errField.passwordErr}</span>}
          </div>

           <div>
             <button type='button' onClick={LoginUser} className='primaryBtn'>Login</button>
              
             <button type='button' onClick={toRegistation} className='primaryBtn'>Add User</button>
              
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Login