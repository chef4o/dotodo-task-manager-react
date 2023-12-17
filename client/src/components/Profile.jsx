import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
const baseUrl = "http://localhost:3030/jsonstore/users";

export default function Profile({ user, setUser }) {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/${id}`)
            .then(res => {
                if(!res.ok) {
                    throw new Error('404 Not found')
                }
                return res.json();
            })
            .then(setUser)
            .catch(error => {
                console.error("Failed to fetch user:", error);
                navigate('/404')
            });
    }, [id]);

    return (
        <div className="content profile"></div>
    )
}