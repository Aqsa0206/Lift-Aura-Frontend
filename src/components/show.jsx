import React from 'react'
import { useParams, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Show() {
    const { id } = useParams();
    const [member, setMember] = useState([]);

    useEffect(() => {
        fetchMember();
    }, [id]);

    function fetchMember() {
        fetch(`http://localhost:3000/api/v1/members/${id}`)
        .then((response) => response.json())
        .then((data) => setMember(data))
        .catch((error) => console.error("Error fetching member:", error));
    }

  return (
    <>
        <h1>show page</h1>
        <h2>{member.first_name} {member.last_name}</h2>
        <p>Email: {member.email}</p>
        <p>Phone: {member.phone_number}</p>

        <Link to="/"> Back to Members</Link>
        <br />
        <Link to={`/member/${id}/update`}> Update Member</Link>

    </>

  )
}

export default Show