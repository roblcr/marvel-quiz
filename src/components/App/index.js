import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../../App.css';
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';

function App() {
  return (
    <Router>
      <Header />

        <Routes>
            <Route exact path='/' Component={Landing} />
            <Route path='/welcome' Component={Welcome} />
            <Route path='/login' Component={Login} />
            <Route path='/signup' Component={SignUp} />
            <Route path='*' Component={ErrorPage} />
            <Route path='/forgetpassword' Component={ForgetPassword} />
        </Routes>

      <Footer />
    </Router>
  );
}

export default App;
