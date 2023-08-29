import React, {useState, useEffect} from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
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
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/" element={<Login/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/home" element={<AuthenticatedHome />} />
               <Route path="/AddEdit" element={<AuthenticatedAddEdit />} />
               <Route path="/update/:id" element={<AuthenticatedAddEdit />} />
               <Route path="/view/:id" element={<AuthenticatedView />} />
               {/* <Route path="/home" element={<Home/>}/> */}
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Header from './components/Header';
// import Home from './pages/Home';
// import Login from './pages/Login';
// // import AddEdit from './pages/AddEdit';
// // import View from './pages/View';
// // import About from './pages/About';
// // import Search from './pages/Search';
// // import Signup from './pages/Signup';
// import withAuthentication from './pages/withAuthentication';
// import Signup from './pages/Signup';

// const AuthenticatedHome = withAuthentication(Home);
// // const AuthenticatedAddEdit = withAuthentication(AddEdit);
// // const AuthenticatedView = withAuthentication(View);
// // const AuthenticatedSearch = withAuthentication(Search);

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <ToastContainer position="top-center" />
//         <Routes>
//           <Route path="/" element={<AuthenticatedHome />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* <Route path="/AddEdit" element={<AuthenticatedAddEdit />} />
//           <Route path="/update/:id" element={<AuthenticatedAddEdit />} />
//           <Route path="/view/:id" element={<AuthenticatedView />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/search" element={<AuthenticatedSearch />} />
//           <Route path="/signup" element={<Signup />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;