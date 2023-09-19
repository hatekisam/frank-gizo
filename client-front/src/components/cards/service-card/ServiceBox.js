import "./ServiceBox.css";
const ServiceBox = ({ image, price, title, description }) => {
  function openWhatsapp() {
    const phoneNumber = "+250781279420";
    const message = encodeURIComponent("Hello, I'm interested in your bid.");

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
  }

  return (
    <div className="servicecard">
      <div className="serviceimage">
        <img className="image-10-icon" alt="" src={image} />
        <div className="serviceimage-child" />
      </div>
      <div className="servicedesciption">
        <div className="div32">{`$ ${price}.00`}</div>
        <b className="topography1">{ title}</b>
        <div className="topography-is-the-container">
          <p className="topography-is-the">
            {description}
          </p>
        </div>
        <button className="button7" onClick={()=> openWhatsapp()}>
          <div className="bid-now1">Bid now</div>
        </button>
      </div>
    </div>
  );
};

export default ServiceBox;
