

import Providers from "./Providers"
import NavbarComponent from './components/Navbar.Component'
import Router from './routes/Router'


const App = () => {
  return (
  

   <div className="w-full max-h-screen relative flex flex-column bg-neutral-900 ">
    
    <NavbarComponent actionElement={<></>}/>
      <div className='w-full max-h-full overflow-auto'>
      <Router/>
      </div>
        
    
    </div>
   
      
  )
}

export default App