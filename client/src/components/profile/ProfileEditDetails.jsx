import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initialState, validationIsEmpty } from "../../util/validation/commonValidation";
import NavContext from "../../contexts/navContext";
import AuthContext from "../../contexts/authContext";
import { editUser } from "../../services/userService";
import { profileValidation } from "../../util/validation/profileValidation";
// import * as profileAvatarUploader from "../../util/uploadProfileAvatar";

export default function ProfileEditDetails({ setEditProfile, profileDetails, setProfileDetails }) {
  const [formValues, setFormValues] = useState({
    username: profileDetails.username,
    email: profileDetails.email,
    dob: profileDetails.dob || "",
    firstName: profileDetails.firstName || "",
    lastName: profileDetails.lastName || "",
    imageUrl: profileDetails.imageUrl || "",
    phoneNumber: profileDetails.phoneNumber || "",
    street: profileDetails.street || "",
    town: profileDetails.town || "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState(() => initialState(profileValidation.FORM_ERROR_FIELDS));
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);

    const errors = profileValidation.getValidationErrors(newValues);
    setValidationErrors(errors);
  };

  async function editProfileHandler(event) {
    event.preventDefault();

    const errors = profileValidation.getValidationErrors(formValues);
    setValidationErrors(errors);

    if (!validationIsEmpty(errors)) {
      return;
    }

    try {
      setLoading(true);
      const data = await editUser(user.id, formValues);

      const profileData = { ...data, expiringNotes: profileDetails.expiringNotes };
      setProfileDetails(profileData);
      sessionStorage.setItem("profile", JSON.stringify(profileData));
      setLoading(false);
      setEditProfile(false);
      navigate(`/profile/${user.id}`);
    } catch (err) {
      console.error("Error updating profile:", err);
      setLoading(false);
    }
  }

  return (
    <div className="profile-edit">
      <button
        className="xmark"
        onClick={() => {
          setEditProfile(false);
          navigate(`/profile/${id}`);
        }}>
        <i className="fa-solid fa-xmark"></i>
      </button>

      <form className="form-edit" encType="multipart/form-data">
        <div className="personal">
          <label className="first-name" htmlFor="firstName">
            First name:
            <input
              id="firstName"
              className="name"
              name="firstName"
              placeholder="Add first name"
              value={formValues.firstName}
              onChange={changeHandler}
            />
          </label>

          <label className="last-name" htmlFor="lastName">
            Last name:
            <input
              id="lastName"
              className="name"
              name="lastName"
              placeholder="Add last name"
              value={formValues.lastName}
              onChange={changeHandler}
            />
          </label>

          <label className="username" htmlFor="username">
            Username:
            <input
              id="username"
              className="username"
              name="username"
              placeholder="Add username"
              required
              autoComplete="on"
              value={formValues.username}
              onChange={changeHandler}
            />
          </label>

          <label className="dob" htmlFor="dob">
            Date of birth:
            <input
              id="dob"
              type="date"
              name="dob"
              className={validationErrors && validationErrors["dob"] ? "error" : ""}
              value={formValues.dob}
              onChange={changeHandler}
            />
          </label>
        </div>

        <div className="profile-image">
          {formValues.imageUrl ? <img src={formValues.imageUrl} alt="image" /> : <i className="fa-solid fa-user"></i>}

          <div className="custom-file-upload">
            <label htmlFor="profilePicture" className="file-button">
              Update avatar
            </label>
            <span id="file-chosen">No file selected</span>
            <input type="file" id="profilePicture" name="profilePicture" accept="image/*" hidden />
          </div>
        </div>

        <div className="contact">
          <label className="email" htmlFor="emailAddress">
            Email:
            <input
              id="emailAddress"
              className="email"
              name="email"
              placeholder="Add email"
              required
              autoComplete="on"
              value={formValues.email}
              onChange={changeHandler}
            />
          </label>

          <label className="phone" htmlFor="phoneNumber">
            Phone:
            <input
              id="phoneNumber"
              className="phoneNumber"
              name="phoneNumber"
              placeholder="Add phone #"
              value={formValues.phoneNumber}
              onChange={changeHandler}
            />
          </label>

          <label className="address" htmlFor="street">
            Address:
            <input
              id="street"
              className="address"
              name="street"
              placeholder="Add address"
              value={formValues.street}
              onChange={changeHandler}
            />
          </label>

          <label className="address" htmlFor="town">
            Town/City:
            <input
              id="town"
              className="address"
              name="town"
              placeholder="Add town/city"
              value={formValues.town}
              onChange={changeHandler}
            />
          </label>
        </div>

        {!validationIsEmpty(validationErrors) && (
          <div className="error edit-details error-list">
            {Object.entries(validationErrors).map(([key, error]) =>
              error ? (
                <p className="error" key={key}>
                  {error}
                </p>
              ) : null
            )}
          </div>
        )}

        <button type="submit" className="update-btn" onClick={editProfileHandler}>
          Save
        </button>
      </form>
    </div>
  );
}
