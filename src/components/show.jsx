import React from 'react'
import { useParams, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Show = () => {
    const { id } = useParams();
    const [member, setMember] = useState([]);
		const [error, setError] = useState("");

    useEffect(() => {
        fetchMember();
    }, [id]);

    const fetchMember  = async () => {
			try {
				const response = await fetch(`http://localhost:3000/api/v1/members/${id}`);

				if (!response.ok) {
					throw new Error(`Failed to fetch member. Status: ${response.status}`);
				}

				const data = await response.json();
				setMember(data);
			} catch (error) {
				console.error("Error fetching member:", error);
				setError("Unable to fetch member details. Please try again later.");
			}
    }

    if (!member) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>show page</h1>
						{error && <p style={{ color: "red" }}>{error}</p>}
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