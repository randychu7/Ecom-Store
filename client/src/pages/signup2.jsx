import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Navbar from '../components/navbar/navbar';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {

    const hasToken = localStorage.getItem('token') !== null;

    

    const [data, setData] = useState({ email: '', password: ''});
    const [next, setNext] = useState(false);


    const handleNext = () =>{
      setNext(!next);
    
    }

    const handleChange =(e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(data);
      
        try { 
          const res = await axios.post('http://localhost:5080/api/auth/register', {
            email: data.email,
            password: data.password
          });
          window.location = "/login";
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
    };
    
    const logout = async () => {
  
      localStorage.removeItem('token');
      window.location.href = "/login";
    
    };
      

  return (
    <div className='w-full h-screen flex justify-center items-center bg-white'>
       <nav>
            <div className="flex absolute top-0 left-0 right-0 flex-wrap pb-[2px] items-center border-b-2 justify-between  mx-auto" style={{ zIndex: 1000 }}>
                
                  <div className="items-center w-full  md:order-1">
                    <ul className="flex justify-between items-center font-medium md:p-0 mt-4 rounded-lg md:space-x-8 md:mt-0 md:border-0">
                  <li><a className="flex items-center">
                    <img src="../netflix.png" className=" h-[40px] md:h-[110px] ml-6" alt=" Logo" />
                  </a></li>
                    

                    {hasToken ? (
                        <li className=" flex items-center justify-center">
                          <a href="#" className="mr-3 text-xl pr-4 rounded md:p-0 ">
                            Sign Out
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a onClick={logout} className="text-white">
                            <button
                              type="button"
                              className="text-black text-[14px] md:text-[20px] px-5 mr-10 py-2.5 text-center"
                            >
                              Sign In
                            </button>
                          </a>
                        </li>
                      )}

                    </ul>
                  </div>

            
                </div>
        </nav>

        <div className={`w-[300px] -translate-y-44 mt-[12em] 2xl:mt-[0em] flex flex-col justify-center items-center ${!next ? '' : "-translate-x-[50px] opacity-0 transition-all duration-200"}`} >
          <div className='w-full flex justify-center mb-6'><CheckCircleOutlineIcon sx={{fontSize:"50px", color:"#ee3d3d"}}/></div>
          
          <p className='text-center text-[12px]'>STEP <span>3</span> OF <span>3</span></p>
          <h2 className='text-2xl text-left font-bold'>Create a password to start your membership</h2>
          <div className='w-full'>
            <div className='flex mb-4 mt-3'> Just a few more steps and you're done! We hate paperwork, too.</div>

            <div className='mt-4'>

                      <label className='relative cursor-pointer'>
                      <input
                        type="text"
                        placeholder="Input"
                        className='h-[50px] w-full text-[15px] pl-[19px] pt-4 text-gray-500 rounded-lg  border placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:outline-black !important focus:ring-transparent focus:border-none' 
                        id="email" name="email"
                        value={data.email}
                        onChange= {handleChange}
                        />
                          <span className='text-[14px] text-gray-600 text-opacity-70 absolute mt-[14px] left-4 transition duration-200 input-text'>Email Address</span>
                      </label>

                    
             </div>
             <div className='mt-5'>
             <label className='relative cursor-pointer'>
                      <input
                        type="password"
                        placeholder="Input"
                        className='h-[50px] w-full text-[15px] pl-[20px] pt-4 text-gray-500 rounded-lg  border placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:outline-black !important focus:ring-transparent focus:border-none' 
                        id="password" name="password"
                        value={data.password}
                        onChange= {handleChange}
                        />
                          <span className='text-[14px] text-gray-600 text-opacity-70 absolute mt-[14px] left-4 transition duration-200 input-text'>Add Password</span>
                      </label>
             </div>
             
            <button type="submit" className="text-white bg-[#DB0012] w-full h-[50px] mt-9 rounded-lg" onClick={handleSubmit}>Next</button>
         
          </div>
          
        </div>

    
        
        
        <div className='absolute bottom-0 w-full h-[15em] opacity-70 bg-gray-200'>
        <div className='text-gray-500 p-8 opacity-80'>
          <h2 >Questions? Call <span className='underline'>1-844-505-2993</span></h2>
          <div className='grid underline text-[13px] mt-7 grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
            <p>FAQ</p>
            <p>Help Center</p>
            <p>Netflix Shop</p>
            <p>Terms of Use</p>
            <p>Privacy</p>
            <p>Cookie Preferences</p>
            <p>Corporate Information</p>
            <p>Do Not Sell or Share My Personal Information</p>
            
          </div>
        </div>




      </div>

    </div>
  );
}