import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FormInput = ({ label, name, type, value, onChange }) => (
  <div>
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
);


const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    cnic: ''
  });

  useEffect(() => {
    const fetchMember = async () => {
			try {
				const response = await fetch(`http://localhost:3000/api/v1/members/${id}`);
				if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setMember(data);
			} catch (error) {
				console.error("Error fetching member:", error);
				}
    };

    fetchMember();
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

  const fields = [
    { label: "First Name", name: "first_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phone_number", type: "text" },
    { label: "CNIC", name: "cnic", type: "text" },
  ];


  return (
    <div>
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
            <FormInput
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={member[field.name]}
                onChange={handleChange}
            />
            ))}
            <button type="submit">Update Member</button>
        </form>
    </div>
  )
}

export default Update