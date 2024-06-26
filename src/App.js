import React from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import withAuthentication from './pages/withAuthentication';

const AuthenticatedHome = withAuthentication(Home);
const AuthenticatedAddEdit = withAuthentication(AddEdit);
const AuthenticatedView = withAuthentication(View);

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<AuthenticatedHome />} />
            <Route path="/AddEdit" element={<AuthenticatedAddEdit />} />
            <Route path="/update/:id" element={<AuthenticatedAddEdit />} />
            <Route path="/view/:id" element={<AuthenticatedView />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;