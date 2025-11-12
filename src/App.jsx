import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Show from './components/show';
import Update from './components/update';
import Create from './components/create';

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/members")
      .then((response) => response.json())
      .then((data) => setMembers(data.members))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteMember = (id) => {
    fetch(`http://localhost:3000/api/v1/members/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setMembers((prevMembers) => prevMembers.filter((m) => m.id !== id));
      })
      .catch((err) => console.error("Error deleting member:", err));
  };

  return (

    <div className="App">
      <h1>Members List</h1>
      <Routes>
        <Route path='/' element = {
          <ul>
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.id}>
                <Link to={`/member/${member.id}`}>
                {member.first_name} {member.last_name} — {member.email}
                </Link>
                <button onClick={() => deleteMember(member.id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </ul>
        } />
        <Route path="/member/:id" element = {<Show />} />
        <Route path="/member/:id/update" element = {<Update />} />
        <Route path="/create" element = {< Create />} />
      </Routes>
    </div>
  );
}

export default App;

