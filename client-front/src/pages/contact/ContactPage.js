import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, config } from "../../utils/api";

import LinkContainer from "../../components/LinkContainer";
import "./ContactPage.css";
import ContactForm from "../../components/ContactForm";
import ChatButton from "../../components/Chat/chatbutton/ChatButton";
import Chat from "../../components/Chat/chat/Chat";


const ServicesPage = () => {
  
  const [chatActive, setChatActive] = useState(false);
  const closeActive = () => {
    setChatActive(false);
  };
  const onTwitterIconClick = () => {
    window.open("https://twitter.com/SHDRltd1");
  };
 

  return (
    <div className="contactpage">
      <div className="contactcontent">
        <div className="contact-inner">
          
          
        <ContactForm />
      </div>
      </div>
      <ChatButton onClick={() => setChatActive(true)} />
      {chatActive && <Chat close={closeActive} />}

      <LinkContainer
        dimensions="/facebookicon1.svg"
        dimensions89="/shdrremovebgpreview-1@2x.png"
        onTwitterIconClick={onTwitterIconClick}
      />
    </div>
  );
};

export default ServicesPage;
