import { useEffect } from "react";
import { useParams } from "react-router-dom"
const baseUrl = "http://localhost:3030/jsonstore/users";

export default function Profile({ user, setUser }) {
    const { id } = useParams();

    useEffect(() => {
        fetch(`${baseUrl}/${id}`)
            .then(res => res.json())
            .then(setUser)
            .catch(error => {
                console.error("Failed to fetch user:", error);
            });
    }, [id]);

    return (
        <div className="content profile"></div>
    )
}