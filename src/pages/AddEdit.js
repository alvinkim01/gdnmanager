import React, { useState, useEffect} from "react";
import { useNavigate,useParams} from 'react-router-dom';
import "./AddEdit.css";
import fireDB from "../firebase";
import { toast } from "react-toastify";


const initialState = {
    name : "",
    email :"",
    mobile :"",
    order :"",
    done :""  
}

const AddEdit = () =>{
  const [state, setState] = useState(initialState);
 const [data, setData] = useState({});

    const { name,email,mobile,order,done} =state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        fireDB.child("contacts").on("value",(snapshot) =>{
            if (snapshot.val() !==null) {
                setData({...snapshot.val()});
            } else{
                setData({});
            }
        });
        return () =>{
            setData({});
        };
    },[id]);

    useEffect(() => {
      if (id && data[id]) {
        setState({ ...data[id] });
      } else {
        setState({ ...initialState });
      }
    }, [id, data]);
    

    // const history = useHistory();
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        // 이벤트가 발생한 요소(element)에서 name 속성과 value 속성을 추출하여 상수 name과 value에 할당하는 코드입니다.
        setState({...state, [name]:value }); //객체 전개 연산자임
        //이전 상태값(...state)과 새로운 값을 추가로 덮어씌운 {[name]:value} 객체를 합치기 위해, 
        //객체 전개 연산자({...state, [name]:value})를 사용하였습니다. 
        //이 때, [name]은 input 요소의 name 속성 값이고, value는 해당 input 요소의 값(value)
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !email || !mobile || !order) {
        toast.error("Please provide value in each input field");
      } else {
        if (!id) {
          fireDB.child("contacts").push(state, (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Contact Added Successfully");
              navigate('/home', { replace: true });
            }
          });
        } else {
          fireDB.child(`contacts/${id}`).set(state, (err) => {
            if (err) {
              toast.error(err);
            } else {
              toast.success("Contact Updated Successfully");
              navigate('/home', { replace: true });
            }
          });
        }
      }
    };
    
    
    return(
        <div style={{marginTop :"100px"}}>
            <form
              style={{
                margin :"auto",
                padding :"15px",
                maxWidth :"400px",
                alignContent : "center"
              }}
              onSubmit={handleSubmit}>
            
                <label htmlfor="name">Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name..."
                  value={name || ""}
                  onChange={handleInputChange}
                />
                <label htmlfor="email">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email..."
                  value={email || ""}
                  onChange={handleInputChange}
                />
                <label htmlfor="mobile">Contact</label>
                <input 
                  type="number"
                  id="mobile"
                  name="mobile"
                  placeholder="Your Mobile..."
                  value={mobile || ""}
                  onChange={handleInputChange}
                />
                <label htmlfor="order">Meeting Date</label>
                <input 
                  type="text"
                  id="order"
                  name="order"
                  placeholder="Your Order..."
                  value={order || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="done">Done</label>
                <select
                  id="done"
                  name="done"
                  value={done || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Done">Done</option>
                  <option value="NotDone">Not Done</option>
                </select>
                <input type="submit" value={id?"Update":"Save"} />
                
            </form>
        </div>
    );
};

export default AddEdit;