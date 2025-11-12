import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();
  const [member, setMember] = useState({
		first_name: '',
    last_name: '',
    email: '',
		father_name: '',
		full_address: '',
		blood_group: '',
    phone_number: '',
    cnic: '',
    emergency_contact: '',
    password: '',
    dob: ''
	});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Created member:", data);
        navigate(`/member/${data.id}`);
      })
      .catch((err) => console.error("Error creating member:", err));
  };

  return (
    <div>
      <h1>Create Member</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={member.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={member.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={member.email}
            onChange={handleChange}
          />
        </div>
				<div>
          <label>Father Name:</label>
          <input
            type="text"
            name="father_name"
            value={member.father_name}
            onChange={handleChange}
          />
        </div>
				<div>
          <label>Full Address:</label>
          <input
            type="text"
            name="full_address"
            value={member.full_address}
            onChange={handleChange}
          />
        </div>
				<div>
          <label>Blood Group:</label>
          <input
            type="text"
            name="blood_group"
            value={member.blood_group}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone_number"
            value={member.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CNIC:</label>
          <input
            type="text"
            name="cnic"
            value={member.cnic}
            onChange={handleChange}
          />
        </div>
				<div>
          <label>Emergency Contact:</label>
          <input
            type="text"
            name="emergency_contact"
            value={member.emergency_contact}
            onChange={handleChange}
          />
        </div>
				<div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={member.password}
            onChange={handleChange}
          />
        </div>
				<div>
          <label>Date of Birth:</label>
          <input
            type="text"
            name="dob"
            value={member.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Member</button>
      </form>
    </div>
  );
}

export default Create;
