import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main >  
                <section>      
                    <div style={{ textAlign: "center" }}>
                        <h1><p> GDN Cloud Login </p></h1>
                            <form
                            style={{
                                margin: "auto",
                                padding: "15px",
                                maxWidth: "400px",
                                alignContent: "center"
                            }}>
                            <div>
                                <label htmlFor="email-address">
                                Email address
                                </label>
                                <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button className='btn btn-edit'                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        {/* <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/Signup">
                                Sign up
                            </NavLink>
                        </p> */}
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login