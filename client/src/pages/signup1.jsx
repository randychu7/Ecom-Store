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

    const [next, setNext] = useState(false);


    const handleNext = () =>{
        setNext(!next);
  
        setTimeout(() => {
          window.location = "/signup2";
        }, 300);
      
      }
      

  return (
    <div className='w-full h-screen flex justify-center items-center bg-white'>
       <nav>
            <div className="flex absolute top-0 left-0 right-0 flex-wrap pb-[2px] items-center border-b-2 justify-between  mx-auto" style={{ zIndex: 1000 }}>
                
                  <div className="items-center w-full md:order-1">
                    <ul className="flex justify-between items-center font-medium md:p-0 mt-4 rounded-lg md:space-x-8 md:mt-0 md:border-0">
                  <li><a className="flex items-center">
                    <img src="../netflix.png" className=" h-[40px] md:h-[110px] ml-6" alt=" Logo" />
                  </a></li>
                    

                    {hasToken ? (
                        <li className=" w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                          <a href="#" className="block py-2 pl-3 text-2xl pr-4 rounded md:p-0 ">
                            Sign Out
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a href="/login" className="text-white">
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

        <div className={`w-[360px] -translate-y-44 flex flex-col justify-center items-center ${!next ? '' : "-translate-x-[50px] opacity-0 transition-all duration-200"}`} >
          
          <p className='text-center text-[12px]'>STEP <span>2</span> OF <span>3</span></p>
          <h2 className='text-2xl text-center font-bold'>Finish setting up your <br/> account</h2>
          <div className='w-[70%]'>
            <div className='flex mb-4 mt-4 text-center'> Netflix is personalized for you. Create a password to start watching Netflix</div>
           
            <button type="button" className="text-white bg-[#DB0012] w-full h-[50px] mt-2 rounded-lg" onClick={handleNext}>Next</button>
         
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

    
    // <ThemeProvider theme={defaultTheme}>
    //   <Container component="main" maxWidth="xs" className='bg-white pt-1 pb-10 rounded-lg'>
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign up
    //       </Typography>
    //       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               autoComplete="given-name"
    //               name="firstName"
    //               required
    //               fullWidth
    //               id="firstName"
    //               label="First Name"
    //               autoFocus
    //               onChange={handleChange}
    //             />
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="lastName"
    //               label="Last Name"
    //               name="lastName"
    //               autoComplete="family-name"
    //                 onChange={handleChange}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //                 onChange={handleChange}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="username"
    //               label="Username"
    //               name="username"
    //               autoComplete="username"
    //                 onChange={handleChange}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="new-password"
    //                 onChange={handleChange}
    //             />
    //           </Grid>
            
    //         </Grid>
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign Up
    //         </Button>
    //         <Grid container justifyContent="flex-end">
    //           <Grid item>
    //             <Link href="/login" variant="body2">
    //               Already have an account? Sign in
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //     <Copyright sx={{ mt: 5 }} />
    //   </Container>
    // </ThemeProvider>
  );
}