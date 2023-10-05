import './App.css';
import Login from './components/Login'
import Home from './components/Home'

import loginUser from './components/loginUser'
import {Route,Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Registration from './components/Registration';
// import Nav from './widgets/Nav'


function App() {
  return (
    
    <div className="App">
      <ToastContainer />
      <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/home' Component={Home}/>
      <Route path='/login' Component={Login}/>
      <Route path='/registration' Component={Registration}/>
      <Route path='/loginUser' Component={loginUser}/>
      
      </Routes>
      
    </div>
  );
}

export default App;
