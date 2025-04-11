

import Providers from "./Providers"
import NavbarComponent from './components/Navbar.Component'
import Router from './routes/Router'
import "@styles/animations.css"

const App = () => {
  return (
  

   <div className="w-full max-h-screen relative flex flex-column  " >
    
    <NavbarComponent actionElement={<></>}/>
      <div className='w-full max-h-full overflow-auto' >
      <Router/>
      </div>
        
    
    </div>
   
      
  )
}

export default App