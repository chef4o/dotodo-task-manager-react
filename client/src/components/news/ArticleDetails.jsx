import { Link, useParams } from "react-router-dom";

export default function ArticleDetails({ profileDetails, setEditProfile }) {
  const { id } = useParams();

  const formatAddress = [profileDetails.street, profileDetails.town].filter(Boolean).join(", ");

  const deleteArticleHandler = async (id) => {
    if (!user || !user.id) {
      console.error("User is not available.");
      return;
    }

    setLoading(true);
    await deleteNote(id);
    sessionStorage.removeItem("notes");
    navigate(`/notes`);
    getDataFromStorageOrServer("notes", () => getAllNotesSorted(user.id, "startDate", "desc"), setNotes);
    setLoading(false);
  };


  return (
    <div className="user-details">
      <div className="profile-details">
        <div className="personal">
          <p className="username">{`Username: ${profileDetails.username}`}</p>

          {(profileDetails.firstName || profileDetails.lastName) && (
            <p className="name">{`Name: ${profileDetails.firstName} ${profileDetails.lastName}`}</p>
          )}

          {profileDetails.dob && <p className="dateOfBirth">{`Birthday: ${profileDetails.dob}`}</p>}
        </div>

        <div className="profile-image">
          {profileDetails.imageUrl ? (
            <img src={profileDetails.imageUrl} alt="" />
          ) : (
            <i className="fa-solid fa-user"></i>
          )}
        </div>

        <div className="contact">
          <p className="email">{`Email: ${profileDetails.email}`}</p>
          {profileDetails.phoneNumber && <p className="phoneNumber">{`Phone: ${profileDetails.phoneNumber}`}</p>}
          {(profileDetails.street || profileDetails.town) && <p className="address">{`Address: ${formatAddress}`}</p>}
        </div>

        <Link className="edit-btn" to={`/profile/edit/${id}`} onClick={() => setEditProfile(true)}>
          <button>Edit details</button>
        </Link>
      </div>
    </div>
  );
}
