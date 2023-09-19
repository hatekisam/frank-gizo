import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, config } from "../../utils/api";
import ServiceBox from "../../components/cards/service-card/ServiceBox";
import LinkContainer from "../../components/LinkContainer";
import "./ServicesPage.css";
import ChatButton from "../../components/Chat/chatbutton/ChatButton";
import Chat from "../../components/Chat/chat/Chat";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
   const [chatActive, setChatActive] = useState(false);
  const closeActive = () => {
    setChatActive(false);
  };
  const onTwitterIconClick = () => {
    window.open("https://twitter.com/SHDRltd1");
  };
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get(`${API_URL}/services`, config);
          console.log(response.data.data.services);
          if (response.data.success) {
            setServices(response.data.data.services);
          } else {
            // toast.error("Failed to fetch owners");
          }
        } catch (error) {
          // toast.error("An error occurred while fetching owners");
        }
      };
      fetchServices();
    }, []);

  return (
    <div className="servicespage">
      <div className="servicescontent">
        {services.map((service) => (
          <ServiceBox
            image={service.image[0]}
            price={service.price}
            title={service.title}
            description={service.description}
            key={service._id}
          />
        ))}
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
