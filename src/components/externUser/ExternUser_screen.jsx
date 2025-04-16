import React from "react";
import logo from '../auth/imgs/logo.png';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import './ExternUser.css'
import SliderMakers from "../Slider/SliderMakers/SliderMakers";
import Slider from "../Slider/Slider";



function ExternUser () {

    const navigate = useNavigate();
    const data = [
        {id: '1', img1: "./img1.jpeg"},
        {id: '2', img1: "./img2.jpeg"},
        {id: '3', img1: "./img3.jpeg"},
        {id: '4', img1: "./img4.jpeg"},
        {id: '5', img1: "./img5.jpeg"}
    ]

    return (
        <div className="container">
        <div className="header">
            <div className="Box-logo"><img src={logo} alt="IfMakerLogo" className="logo"/></div>
            <ul className="PageList">
                <li><a href="" onClick={() => navigate('/userHome')}>Home</a></li>
                <li><a href="" onClick={() => navigate('/userSolicitar')}>Projetos</a></li>
                <li><a href="" onClick={() => navigate('/userHome')}>Visitar</a></li>
            </ul>
            
        </div>
        
            <div className="container-Home">
                <SliderMakers />
            </div>
        </div>
    )
}

export default ExternUser;