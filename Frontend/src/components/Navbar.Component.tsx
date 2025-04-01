
import { FaGithub,FaLinkedin } from "react-icons/fa";
import { GITHUB, LINKEDIN } from "../constants";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { FaNoteSticky } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { DashboardActionElement } from "@screens/Dashboard/Dashboard";
const container = (delay: number) => ({
  hidden: { x: 0, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay },
  },
});

interface Props{
  actionElement:ReactNode
}
const NavbarComponent = ({actionElement}:Props) => {
  let handleRedirect = (path:string)=>{
    let a = document.createElement("a");
    a.href = path;
    a.target="_blank"
    a.click();
  }
  let navItems = [
    {
      name: "Home",
      path: "/",
      iconName: <IoMdHome className="text-2xl"/>,
      actionElement: <DashboardActionElement/>
    },
    {
      name: "Notes",
      path: "/notes",
      iconName: <FaNoteSticky className="text-2xl"/>,
      actionElement: <></>

    },
    {
      name: "Tasks",
      path: "/task",
      iconName: <GoTasklist className="text-2xl"/>,
      actionElement: <></>

    },
   
  ]
  let location = useLocation();
  let currentActionElement = actionElement ? navItems.find((i)=> i.path == location.pathname)?.actionElement :<></>
  return (
    <nav className='flex justify-start items-center flex-col w-18 px-3 bg-neutral-300  h-screen '>
        {/* <div>
            <img src={logo} />
        </div> */}
        
      
        <div className="h-auto mt-10">

          {
            navItems.map((i)=>{
              return <div className={`p-3 my-1 ${location.pathname == i.path? "hidden":"flex" } hover:bg-amber-100 rounded-2xl  flex-col justify-center items-center `}>
                <div>
                  {i.iconName}
                </div>
                 {/* <p className="font-bold" >{i.name}</p> */}
               </div>
            })
          }

        </div>
        <motion.div variants={container(0.8)}
            initial="hidden"
            animate="visible"
             className="flex flex-row w-auto gap-x-4">

          {currentActionElement}
        </motion.div>
    </nav>
  )
}

export default NavbarComponent