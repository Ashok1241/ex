import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import EngineersList from './components/Agriculture/EngineersList';
import BeautyData from './components/Agriculture/BeautyData';
import Registerasworker from './components/Registerasworker';
import Profile from './components/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header/>}/>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Home" element={<Home/>}/>
        <Route path="/details/1" element={<EngineersList/>}/>
        <Route path="/details/2" element={<BeautyData/>}/>
        <Route path="/Registerasworker" element={<Registerasworker/>}/>
        <Route path='/Profile' element={<Profile/>}/>

  

      </Routes>
    </Router>
  );

}

export default App;