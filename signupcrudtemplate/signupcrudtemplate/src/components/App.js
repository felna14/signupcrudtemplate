import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Addform from './Addform';
import AddStudent from './AddStudent';
import SignUp from './SignUp';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ViewForm from './ViewForm';
import DemoData from './DemoData';
import AddDemo from './AddDemo';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add-form" element={<Addform />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-form/:id" element={<AddStudent />} />
          <Route path="/view-form/:id" element={<ViewForm />} />
          <Route path="/add-demo" element={<DemoData />} />
          <Route path="/add" element={<AddDemo />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
