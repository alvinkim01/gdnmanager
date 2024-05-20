import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./AddEdit.css";
import fireDB from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  company: "",
  name: "",
  email: "",
  mobile: "",
  order: "",
  done: "NotDone"
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fireDB.child(`contacts/${id}`).once("value", (snapshot) => {
        if (snapshot.exists()) {
          setState({ ...snapshot.val() });
        } else {
          setState({ ...initialState });
        }
      });
    } else {
      setState({ ...initialState });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, name, email, mobile, order, done } = state;
  
    if (!company || !name || !email || !mobile || !order) {
      toast.error("Please provide value in each input field");
    } else {
      if (id) {
        fireDB.child(`contacts/${id}`).set(state, (err) => { // update 대신 set 사용
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Updated Successfully");
            navigate('/home', { replace: true });
          }
        });
      } else {
        fireDB.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added Successfully");
            navigate('/home', { replace: true });
          }
        });
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Your Company..."
          value={state.company || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={state.name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email..."
          value={state.email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="mobile">Contact</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          placeholder="Your Mobile..."
          value={state.mobile || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="order">Meeting Date</label>
        <input
          type="text"
          id="order"
          name="order"
          placeholder="Your Order..."
          value={state.order || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="done">Done</label>
        <select
          id="done"
          name="done"
          value={state.done || ""}
          onChange={handleInputChange}
        >
          <option value="">Select Status</option>
          <option value="Done">Done</option>
          <option value="NotDone">Not Done</option>
        </select>
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;