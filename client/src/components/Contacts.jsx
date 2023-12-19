import { useEffect, useState } from 'react';
import { createContact } from '../services/contactService';

export default function Contacts() {
    const [error, setError] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', comment: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const isFormValid = () => {
        return formData.name !== '' && formData.email !== '' && formData.comment !== '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setMessageSent(true);
            setError('');
            console.log(messageSent);
            // Here you can add your logic to handle form submission
        } else {
            setMessageSent(false);
            setError('Name, email, and message are mandatory.');
        }
    }

    useEffect(() => {
        if (messageSent) {
            createContact(formData);
        }
    }, [messageSent]);

    return (
        <div className="content contact">
            <h3>Contact Me</h3>
            <p>Please use this form to contact me for any question, request or suggestion you might have.</p>

            {messageSent
                ? <div>
                    <i className="fa-solid fa-envelope-circle-check"></i>
                    <h2>Thank you for your message! <br /> I'll get back to you in due course.</h2>
                </div>

                : <form onSubmit={handleSubmit}>
                    {error
                        ? <div className={`error contact`}>{error}</div>
                        : <h4>Send Us A Quick Message</h4>}

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name *"
                    />

                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                    />

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        cols="30"
                        rows="10"
                        placeholder="Your Comment"
                    ></textarea>

                    <input type="submit" className="submit" value="Submit Message" />
                </form>
            }
        </div>
    )
}
