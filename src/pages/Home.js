import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import fireDB from "../firebase";
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css"
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDB.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that contact?")) {
      fireDB.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDB
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
    fireDB.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    fireDB
      .child("contacts")
      .orderByChild("done")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
      console.log("Signed out successfully");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  }

  return (
    <div style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1><p> GDN Cloud 웹사이트 요청 관리 </p></h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Company</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Mobile</th>
            <th style={{ textAlign: "center" }}>Order</th>
            <th style={{ textAlign: "center" }}>Status</th>
            {!sort && <th style={{ textAlign: "center" }}>Done</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1} </th>
                  <td>{data[id].company}</td>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].mobile}</td>
                  <td>{data[id].order}</td>
                  <td>{data[id].done}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.company}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.order}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <label>Sort By:</label>
        <select className="dropdown" name="colValue" onChange={handleChange} style={{ width: "200px" }}>
          <option value="" disabled selected hidden>Please Select</option>
          <option value="company">Company</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="mobile">Mobile</option>
          <option value="order">order</option>
        </select>
        <button className="btn btn-reset" onClick={handleReset}>Reset</button>
        <br />
      </div>
      <div style={{ display: "flex" }}>
        <label style={{ marginRight: "10px" }}>Status:</label>
        <button className="btn btn-active" onClick={() => filterData("Done")}>처리</button>
        <button className="btn btn-inactive" onClick={() => filterData("NotDone")}>미처리</button>
      </div>
      <div>
        <button className="btn btn-reset" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;