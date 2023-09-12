import React,{useState,useEffect} from "react";
import fireDB from "../firebase";
import { useNavigate,useParams,Link } from "react-router-dom";
import "./View.css";


    const View =()=>{

        const[user,setUser] = useState({});

        const{id} = useParams();

        useEffect(()=> {
            fireDB
                .child(`contacts/${id}`)
                .get()
                .then((snapshot) =>{
                    if(snapshot.exists()){
                        setUser({...snapshot.val()});                        
                    } else{
                        setUser({})
                    }
                });
        },[id]);

        console.log("user",user);

        return(
            <div style={{marginTop :"150px"}}>
                <div className="card">
                    <div className="card-header">
                        <p>User Contact Detail</p>
                    </div>
                    <div className="container">
                   
                        <string><h3>Name:</h3></string>
                        <span>{user.name}</span>
                        <string><h3>Email:</h3></string>
                        <span>{user.email}</span>
                        <br/>
                        <br/>
                        <string><h3>Mobile:</h3></string>
                        <span>{user.mobile}</span>
                        <br/>
                        <br/>
                        <string><h3>Online Meeting Date:</h3></string>
                        <span>{user.order}</span>
                        <br/>
                        <br/>
                        <string><h3>Status:</h3></string>
                        <span>{user.done}</span>
                        <br/>
                        <br/>
                        <Link to="/home">
                            <button className="btn btn-edit">Go Back</button>
                        </Link>

                    </div>

                </div>
            </div>
        );
    };

    export default View;

