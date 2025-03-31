import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/authContext";
import { contactForm } from "../services/contactService";
import NavContext from "../contexts/navContext";

export default function Contacts() {
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(NavContext);

  const [error, setError] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", comment: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactForm.isValid(formData, setError)) {
      setLoading(true);
      contactForm.sendMessage(formData);
      setMessageSent(true);
      setLoading(false);
    } else {
      setMessageSent(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.firstName || "",
        email: user.email || "",
        phone: "",
        comment: "",
      });
    }
  }, [user]);

  return (
    <div className="content contact">
      {!messageSent ? (
        <>
          <h2>Contact Me</h2>

          <form className="form contact-us" onSubmit={handleSubmit}>
            {error ? <div className={`error contact`}>{error}</div> : <h4>Send Us A Quick Message</h4>}

            <input
              type="text"
              name="name"
              autoComplete="on"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="email"
              autoComplete="on"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              autoComplete="on"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              name="comment"
              cols="30"
              rows="10"
              placeholder="Your Comment"
              value={formData.comment}
              onChange={handleChange}></textarea>

            <input type="submit" className="submit" value="Submit Message" />
          </form>
        </>
      ) : (
        <div className="submit-ok">
          <i className="fa-solid fa-envelope-circle-check"></i>
          <h3>
            Thank you for your message! <br /> I'll get back to you in due course.
          </h3>
        </div>
      )}
    </div>
  );
}
