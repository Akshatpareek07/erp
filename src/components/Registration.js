import React,{useState} from 'react'
import axios from 'axios'

const Registration = () => {
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
      console.log(response);
    }catch(e){
      
    }
    }
  else
  console.log("invalid");

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
  return (
    <div className='container'>
    <div>
      <h3>Add Registration</h3><br/>
      <div>
        <form action='/login' method='post'>
          <div>
              <label for='username'>User Name</label>
              <input type='text' id='username' name='username' value={inputField.username}
              onChange={inputHandler}/>
              {errField.usernameErr.length>0&&<span>{errField.usernameErr}</span>}

          </div>
          <div>
              <label for='email'>Email</label>
              <input type='email' id='email' name='email' value={inputField.email}
              onChange={inputHandler}/>
              {errField.emailErr.length>0&&<span>{errField.emailErr}</span>}
          </div>
          <div>
              <label for='phone'>Phone No</label>
              <input type='number' id='phone' name='phone' value={inputField.phone}
              onChange={inputHandler}/>
              {errField.phoneErr.length>0&&<span>{errField.phoneErr}</span>}
              
          </div>
          
          <div>
              <label for='password'>Password</label>
              <input type='password' id='password' name='password' value={inputField.password}
              onChange={inputHandler}/>
              {errField.passwordErr.length>0&&<span>{errField.passwordErr}</span>}
          </div>
          <div>
              <label for='cpassword'>Confirm password</label>
              <input type='password' id='cpassword' name='cpassword' value={inputField.cpassword}
              onChange={inputHandler}/>
              {errField.cpasswordErr.length>0&&<span>{errField.cpasswordErr}</span>}
          </div>
          <div>
             <button type='button' onClick={Adduser}>Add User</button>
              
             <button type='submit'>Login</button>
              
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Registration