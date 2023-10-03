import './App.css';
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home'
import {Route,Routes} from 'react-router-dom'
import Nav from './widgets/Nav'


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/home' Component={Home}/>
      <Route path='/login' Component={Login}/>
      <Route path='/registration' Component={Registration}/>
      </Routes>
      
    </div>
  );
}

export default App;
