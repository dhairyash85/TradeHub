import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Pages/Signin.js';
import Signup from './Pages/Signup.js';
import LandingPage from './Pages/LandingPage.js';
import HomePage from './Pages/HomePage.js';
import Upload from './Pages/Upload.js';
import Profile from './Pages/Profile.js';
import RequestPage from './Pages/RequestPage.js';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/upload' element={<Upload />}/>
          <Route path='/request' element={<RequestPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
