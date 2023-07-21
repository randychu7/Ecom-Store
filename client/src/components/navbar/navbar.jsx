
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NightlightIcon from '@mui/icons-material/Nightlight';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

const location = useLocation();
const isLoginPage = location.pathname === '/login';

const hasToken = localStorage.getItem('token') !== null;

const logoutHandler = () =>{
  localStorage.removeItem('token');
 
  window.location.reload();
}


  return (
    <nav>
  <div className="flex absolute top-0 left-0 right-0 flex-wrap items-center justify-between max-w-[2400px] mx-auto" style={{ zIndex: 1000 }}>
        <a href='/' className="flex items-center">
          <img src="../netflix.png" className=" h-[70px] md:h-[110px] ml-6" alt=" Logo" />
          
        </a>
        <div className="items-center justify-between w-full hidden md:flex md:w-auto md:order-1">
          <ul className="flex flex-col items-center font-medium md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
        
          {hasToken ? (
              <li className="hover:translate-y-[-3px] transition-transform w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                <a href='/logout' className="block py-2 pl-3 text-2xl pr-4 rounded md:p-0 ">
                <button
                    type="button"
                   
                    className="text-white bg-[#DB0012] focus:outline-none font-medium rounded-md text-sm px-5 mr-10 py-2.5 text-center"
                  >
                   Log Out
                  </button>
                </a>
              </li>
            ) : !isLoginPage && (
              <li>
                <a href="/login" className="text-white">
                  <button
                    type="button"
                    className="text-white bg-[#DB0012] focus:outline-none font-medium rounded-md text-sm px-5 mr-10 py-2.5 text-center"
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
  );
};

export default Navbar;
