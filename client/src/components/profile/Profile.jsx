import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findUserById } from "../../services/userService";
import { getSomeNotesByDueDateDesc } from "../../services/noteService";
import ProfileDetails from "./ProfileDetails";
import ProfileNoteDetails from "./ProfileNoteDetails";
import ProfileNotes from "./ProfileNotes";
import NoAccess from "../error/NoAccess";
import ProfileEditDetails from "./ProfileEditDetails";
import AuthContext from "../../contexts/authContext.jsx";
import NavContext from "../../contexts/navContext.jsx";

export default function Profile() {
  const { setLoading } = useContext(NavContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const initialData = sessionStorage.getItem("profile") ? JSON.parse(sessionStorage.getItem("profile")) : [];
  const [profileDetails, setProfileDetails] = useState(initialData);
  const [activeNoteId, setActiveNoteId] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (user?.id && user.id === id) {
      const storedProfile = sessionStorage.getItem("profile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfileDetails(parsedProfile);
        (async () => {
          try {
            const expiringNotes = await getSomeNotesByDueDateDesc(id, 3);
            const updatedProfile = { ...parsedProfile, expiringNotes };
            setProfileDetails(updatedProfile);
            sessionStorage.setItem("profile", JSON.stringify(updatedProfile));
          } catch (error) {
            console.error("Error updating expiring notes:", error);
          }
        })();
      } else {
        setLoading(true);
        (async () => {
          try {
            let profileData = await findUserById(id);
            const expiringNotes = await getSomeNotesByDueDateDesc(id, 3);
            profileData = { ...profileData, expiringNotes };
            sessionStorage.setItem("profile", JSON.stringify(profileData));
            setProfileDetails(profileData);
          } catch (error) {
            console.error("Error fetching profile data:", error);
          } finally {
            setLoading(false);
          }
        })();
      }
    } else {
      setLoading(false);
    }
  }, [user?.id, id, setLoading]);

  return (
    <div className="content profile">
      {!user?.id ? (
        <NoAccess />
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
