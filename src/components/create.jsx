import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormInput = ({ label, name, type, value, onChange }) => (
  <div>
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
);

const Create = () => {
  const navigate = useNavigate();
	const [error, setError] = useState("");
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

	const validateForm = () => {
    if (!member.email.trim() && !member.password.trim()) {
      setError("Email and password are required.");
      return false;
    }

		if (!member.email.trim()) {
      setError("Email is required.");
      return false;
    }

		if (!member.password.trim()) {
      setError("Password is required.");
      return false;
    }
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(member.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (member.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError(""); // clear any previous errors
    return true;
  };

	const fields = [
    { label: "First Name", name: "first_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Father Name", name: "father_name", type: "text" },
    { label: "Full Address", name: "full_address", type: "text" },
    { label: "Blood Group", name: "blood_group", type: "text" },
    { label: "Phone Number", name: "phone_number", type: "text" },
    { label: "CNIC", name: "cnic", type: "text" },
    { label: "Emergency Contact", name: "emergency_contact", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Date of Birth", name: "dob", type: "date" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
		if (!validateForm()) return;
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
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <h1>Create Member</h1>
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
        <button type="submit">Create Member</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Create;
