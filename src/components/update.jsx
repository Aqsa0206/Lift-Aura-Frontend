import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/members/${id}`)
    .then((response) => response.json())
    .then((data) => setMember(data))
    .catch((error) => console.error("Error fetching member:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v1/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Updated member:', data);
        navigate(`/member/${id}`, { state: { updated: true } }); // go back to show page
      })
      .catch((err) => console.error('Error updating member:', err));
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label>First Name: </label>
            <input
                type="text"
                name="first_name"
                value={member.first_name}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Last Name: </label>
            <input
                type="text"
                name="last_name"
                value={member.last_name}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Email: </label>
            <input
                type="email"
                name="email"
                value={member.email}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Phone: </label>
            <input
                type="text"
                name="phone_number"
                value={member.phone_number}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>CNIC: </label>
            <input
                type="text"
                name="cnic"
                value={member.cnic}
                onChange={handleChange}
            />
            </div>
            <button type="submit">Update Member</button>
        </form>
    </div>
  )
}

export default Update