import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './components/Home';
import Reports from './components/manage/ManageReport'
import Login from './components/login/login';
import { isAuthenticated } from './components/auth/auth';
function App() {
  return (
      

    <div className=" relative flex flex-col justify-center items-center">
      
      <header className="container mx-auto App-header">
     
      </header>
      
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/manage' element={<Reports/>}/>
    <Route
        path="/login"
        element={
          isAuthenticated() ? (
          <Navigate to="/" />
          ) : (
            <Login />
          )
        }
      />
    <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Home />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manage"
        element={
          isAuthenticated() ? (
            <Reports />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      
    </Routes>
    </div>
  );
}

export default App;
