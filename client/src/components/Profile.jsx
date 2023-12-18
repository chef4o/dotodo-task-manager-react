import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { findUserById } from "../services/userService";

export default function Profile({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profileDetails, setProfileDetails] = useState({});

    async function loadUser() {
        const userData = await findUserById(id);

        if (user._id === id && userData) {
            setProfileDetails({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                username: userData.username,
                dateOfBirth: userData.dateOfBirth,
                phoneNumber: userData.phoneNumber,
                imageUrl: userData.imageUrl,
                address: Object.values(userData.address),
            })
        } else {
            navigate('/404');
        }
    }

    useEffect(() => {
        loadUser();
    }, [id, user._id]);

    const formatAddress = (address) => {
        return Object.values(address)
            .filter(value => value)
            .join(', ');
    };
    
    return (
        <div className="content profile">
            <div className="user-details">
                <div className="profile-details">
                    <div className="personal">
                        {(profileDetails.firstName || profileDetails.lastName) &&
                            <p className="name">{`Name: ${profileDetails.firstName} ${profileDetails.lastName}`}</p>}
                        <p className="username">{`Username: ${profileDetails.username}`}</p>
                        {profileDetails.dateOfBirth &&
                            <p className="dateOfBirth">{`Birthday: ${profileDetails.dateOfBirth}`}</p>}
                    </div>

                    <div className="profile-image">
                        <img src={profileDetails.imageUrl} alt="" />
                    </div>

                    <div className="contact">
                        <p className="email">{`Email: ${profileDetails.email}`}</p>
                        {profileDetails.phoneNumber &&
                            <p className="phoneNumber">{`Phone: ${profileDetails.phoneNumber}`}</p>}
                        {profileDetails.address &&
                            <p className="address">{`Address: ${formatAddress(profileDetails.address)}`}</p>}
                    </div>
                </div>
            </div>
        </div>

    )
}