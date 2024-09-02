import { Route, Routes } from "react-router-dom";
import { Home, Login, SignUp, Profile } from "./pages";
import { Navbar, Footer } from "./components";

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar/>
        <Routes>

          <Route path='/' element={<Home/>} />
          <Route index path='/login' element={<Login/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/profile' element={<Profile/>} />

        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
