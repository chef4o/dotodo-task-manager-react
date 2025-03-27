import { useContext, useEffect, useState } from "react";
import { findUserById } from "../../services/userService";
import { getSomeNotesByDueDateDesc } from "../../services/noteService";
import ProfileDetails from "./ProfileDetails";
import ProfileNoteDetails from "./ProfileNoteDetails";
import ProfileNotes from "./ProfileNotes";
import AuthContext from "../../contexts/authContext";
import NavContext from "../../contexts/navContext";
import NoAccess from "../error/NoAccess";
import { useParams } from "react-router-dom";
import ProfileEditDetails from "./ProfileEditDetails";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { handleNavigationClick, setLoading } = useContext(NavContext);

  const initialData = JSON.parse(sessionStorage.getItem("profile")) || [];
  const [profileDetails, setProfileDetails] = useState(initialData);
  const [activeNoteId, setActiveNoteId] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user?.id && user.id === id) {
      (async () => {
        let profileData = sessionStorage.getItem("profile");
        if (profileData) {
          profileData = JSON.parse(profileData);
        } else {
          profileData = await findUserById(id);
        }
        const expiringNotes = await getSomeNotesByDueDateDesc(id, 3);
        profileData = { ...profileData, expiringNotes };
        sessionStorage.setItem("profile", JSON.stringify(profileData));
        setProfileDetails(profileData);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [user.id]);

  return (
    <div className="content profile">
      {!user?.id ? (
        <NoAccess onItemClick={handleNavigationClick} />
      ) : (
        <>
          {activeNoteId ? (
            profileDetails.expiringNotes
              .filter((item) => item.id === activeNoteId)
              .map((item) => <ProfileNoteDetails key={item.id} note={item} setActiveNoteId={setActiveNoteId} />)
          ) : editProfile ? (
            <ProfileEditDetails
              profileDetails={profileDetails}
              setProfileDetails={setProfileDetails}
              setEditProfile={setEditProfile}
            />
          ) : (
            <ProfileDetails profileDetails={profileDetails} setEditProfile={setEditProfile} />
          )}

          <ProfileNotes
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            expiringNotes={profileDetails.expiringNotes}
          />
        </>
      )}
    </div>
  );
}
