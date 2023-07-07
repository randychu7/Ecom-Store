
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NightlightIcon from '@mui/icons-material/Nightlight';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {


const hasToken = localStorage.getItem('token') !== null;

const logoutHandler = () =>{
  localStorage.removeItem('token');
  window.location.reload();
}


  return (
    <nav>
      <div className="pl-14 p-7 pr-14 flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center">
          <img src="../coffee-logo.png" className="h-[70px] mr-3" alt=" Logo" />
          
        </a>
        <div className="items-center justify-between w-full hidden md:flex md:w-auto md:order-1">
          <ul className="flex flex-col items-center font-medium md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className='hover:translate-y-[-3px] transition-transform w-[90px] h-[40px] flex items-center justify-center rounded-full bg-white'>
              <a href="/home" className=" text-black ">Home</a>
            </li>
            <li className='hover:translate-y-[-3px] transition-transform w-[90px] h-[40px] flex items-center justify-center rounded-full bg-white'>
              <a href="#" className=" text-black  ">About</a>
            </li>
            <li className='hover:translate-y-[-3px] transition-transform w-[90px] h-[40px] flex items-center justify-center rounded-full bg-white'>
              <a href="#" className=" text-black  ">Contact</a>
            </li>

            {!hasToken ? '' : (<li className='hover:translate-y-[-3px] transition-transform'>
              <a className="block py-2 text-1xl pl-3 pr-4 rounded md:p-0 text-white" onClick={logoutHandler}> Sign out</a>
            </li>)}
       
  

            {hasToken ? (
                <li className='hover:translate-y-[-3px] transition-transform w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center'>
                  <a href="#" className="block py-2 pl-3 text-2xl pr-4 rounded md:p-0 ">
                    <PersonOutlineIcon sx={{ height: "70px", color: "black" }} />
                  </a>
                </li>
              ) : (
                <li className='hover:translate-y-[-3px] transition-transform '>
                  <a href="/login" className='text-white'> <button type="button" className="text-white 
          bg-orange-500 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center">Get Started</button></a>
                </li>
              )}
          </ul>
        </div>

        <div className='hover:translate-y-[-3px] md:hidden transition-transform'>
              <a href="#" className="block py-2 pl-3 text-2xl pr-4 rounded md:p-0 "><MenuIcon sx={{height:"70px", color:"white"}}/></a>
            </div>
      </div>
    </nav>
  );
};

export default Navbar;
