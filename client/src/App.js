import React,{useEffect} from "react";
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import {Link} from "react-router-dom"
import HomeComponent from "./HomeComponent";

function App()
{
    let componentToRender = (
                                <BrowserRouter>
                                    <HomeComponent/>
                                    <Routes>
                                        <Route path="/login" exact element={<Login/>}/>
                                        <Route path="/register" exact element={<Register/>}/>
                                        <Route path="/dashboard" exact element={<Dashboard/>}/>
                                    </Routes>
                                </BrowserRouter>
                            )

    if(window.location.href=='http://localhost:3000/dashboard')
    {
        componentToRender = (
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/dashboard" exact element={<Dashboard/>}/>
                                    </Routes>
                                </BrowserRouter>
                            )
    }

    return(
        <div className="app-main-container">     
            {componentToRender}
        </div>
    )
}

export default App