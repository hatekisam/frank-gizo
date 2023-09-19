import { useState } from "react";
import axios from 'axios';
import { API_URL, config } from "../utils/api";
import "./ContactForm.css";
  const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      console.log(formData);
      const response = await axios.post(`${API_URL}/send-email`, formData);
      console.log(response);
      if (response.data.success) {
        
        console.log('Email sent successfully');
      } else {
        
        console.error('Email not sent');
      }
    } catch (error) {
      
      console.error('Error sending email', error.message);
    }
  };
  return (
    <div className="contactsection" data-scroll-to="contactSectionContainer">
      <div className="headline-parent">
        <div className="contactform-parent">
          <div className="contactform">
            <span className="contact-text">Make the right choice now!</span>
            <form onSubmit={handleSubmit}>

            <div className="formcontent">
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="input1"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                className="textarea"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <input className="button3" type="submit" value="send" />
            </form>
              
            
          </div>
          <img
            className="undraw-contact-us-re-4qqt-1-icon"
            alt=""
            src="/undraw-contact-us-re-4qqt-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
