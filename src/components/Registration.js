import React,{useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../components/loginUser';
import { useNavigate } from 'react-router-dom';
import '../loginUser.css'

const Registration = () => {
  const navigate = useNavigate();
  const [inputField,setInputField]=useState({
    username:'',
    email:'',
    phone:'',
    password:'',
    cpassword:''
  });
  const [errField,setErrField]=useState({
    usernameErr:'',
    emailErr:'',
    phoneErr:'',
    passwordErr:'',
    cpasswordErr:''
  });
  const inputHandler=(e)=>{
    setInputField({...inputField, [e.target.name]:e.target.value});
  }

  const Adduser=async ()=>{
    if(validForm())
    {
     let url='http://localhost:4000/add'
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
        navigate('/login');
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
      usernameErr:'',
      emailErr:'',
      phoneErr:'',
      passwordErr:'',
      cpasswordErr:''
    });
    if(inputField.username==='')
    {
      setErrField((errField)=>({...errField,usernameErr:'Please Enter UserName'}));
      formValid=false;
      console.log(errField);
    }
    if(inputField.email==='')
    {
      setErrField((errField)=>({...errField,emailErr:'Please Enter Email'}));
      formValid=false;
      
      console.log(errField);
    }
    if(inputField.phone===''||inputField.phone.length>10)
    {
      if(inputField.phone.length>10)
       setErrField((errField)=>({...errField,phoneErr:'Please Enter valid Phone Number'}));
      else
       setErrField((errField)=>({...errField,phoneErr:'Please Enter Phone Number'}));
      formValid=false;
      
      console.log(errField);
    }
    if(inputField.password===''&&inputField.cpassword==='')
    {
      setErrField((errField)=>({...errField,passwordErr:'Please Enter Passwords',cpasswordErr:'Please Enter Confirm Passwords'}));
      formValid=false;
      console.log(errField);
    }
    else if(inputField.password===''||inputField.cpassword==='')
    {
      setErrField((errField)=>({...errField,cpasswordErr:'Diffrent Password and Confirm password',passwordErr:'Diffrent Password and Confirm password'}));
      formValid=false;
      
      console.log(errField);
    }
    else if(inputField.password!==inputField.cpassword)
    {
      setErrField((errField)=>({...errField,passwordErr:'Diffrent Password and Confirm password'}));
       formValid=false;
       
      console.log(errField);
    }
    return formValid;
  }
  const toLogin=()=>{
    navigate('/login');
  }
  return (
    <div className='container'>
    <div>
      <h3>Add Registration</h3><br/>
      <div className='form_container'>
        <form action='/login' method='post' className='form'>
          <div className='form_item'>
            <div className='ip_item'>
              <label for='username'>User Name</label>
              <input type='text' id='username' name='username' value={inputField.username}
              onChange={inputHandler}/>
            </div>  
              {errField.usernameErr.length>0&&<span className='span'>{errField.usernameErr}</span>}

          </div>
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
              <label for='phone'>Phone No</label>
              <input type='number' id='phone' name='phone' value={inputField.phone}
              onChange={inputHandler}/>
              </div>
              {errField.phoneErr.length>0&&<span className='span'>{errField.phoneErr}</span>}
              
          </div>
          
          <div className='form_item'>
              <div className='ip_item'>
              <label for='password'>Password</label>
              <input type='password' id='password' name='password' value={inputField.password}
              onChange={inputHandler}/>
              </div>
              {errField.passwordErr.length>0&&<span className='span'>{errField.passwordErr}</span>}
          </div>
          <div className='form_item'>
            <div className='ip_item'>
              <label for='cpassword'>Confirm password</label>
              <input type='password' id='cpassword' name='cpassword' value={inputField.cpassword}
              onChange={inputHandler}/>
              </div>
              {errField.cpasswordErr.length>0&&<span className='span'>{errField.cpasswordErr}</span>}
          </div>
          <div className='btn_area'>
             <button type='button' onClick={Adduser} className='primaryBtn'>Add User</button>
              
             <button type='botton' onClick={toLogin} className='primaryBtn'>Login</button>
              
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Registration