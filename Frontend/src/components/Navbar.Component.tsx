import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB, LINKEDIN } from "../constants";
const container = (delay) => ({
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay },
  },
});

const iconVariants = {
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  tap: { scale: 0.9, transition: { duration: 0.1 } }
};

interface Props {
  actionElement: ReactNode;
}

const NavbarComponent = ({  }: Props) => {


  const navItems = [
    {
      name: "Home",
      path: "/",
      iconName: <IoMdHome className="text-2xl" />,
      bgColor: "bg-white/300",
      actionElement: <>Dashboard Action</>
    },
    {
      name: "Notes",
      path: "/notes",
      iconName: <FaNoteSticky className="text-2xl" />,
      bgColor: "bg-white/300",

      actionElement: <></>
    },
    {
      name: "Tasks",
      path: "/task",
      iconName: <GoTasklist className="text-2xl" />,
      bgColor: "bg-white/300",

      actionElement: <></>
    },
  ];



  const location = useLocation();
  const currentPath = location.pathname;
  const currentNavItem = navItems.find(item => item.path === currentPath);
let navigate = useNavigate()
  let handleRedirect = (path)=>{
    navigate(path)
  }
  return (
    <div className="flex h-screen">
      <nav className="flex flex-col justify-between items-center w-20 py-6 bg-gray-900 shadow-lg border-r border-gray-800">
        <div className="flex flex-col items-center">
       
          
          <div className="space-y-6">
            {navItems.map((item, index) => {
              const isActive = item.path === currentPath;
              return (
                <div
                  key={index}
                  // variants={container(0.2 * index)}
                  // initial="hidden"
                  // animate="visible"
                  // whileHover="hover"
                  // whileTap="tap"
                  className="relative group"
                >
                  <div
                   onClick={()=>handleRedirect(item.path)}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 shadow-md ${isActive ? item.bgColor : "bg-gray-800 hover:bg-gray-700"}`}
                  >
                    <div className={`text-white ${isActive ? "scale-110" : ""}`}>
                      {item.iconName}
                    </div>
                    {isActive && (
                      <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-white shadow-md"></span>
                    )}
                  </div>
                  <div className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      
      </nav>
      
      {/* Content area */}
      {/* <div className="flex-1 bg-gray-100">
        {currentNavItem?.actionElement}
      </div> */}
    </div>
  );
};

export default NavbarComponent;