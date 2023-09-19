import "./Hero.css";
import BlueButton from "../BlueButton/BlueButton";
const Hero = () => {

  return (
    <div className="herosection" data-scroll-to="heroSectionContainer">
      <div className="herocontent">
        <div className="herotext">
          <div className="make-the-right-container">
            <p className="make-the-right">{`Make the right `}</p>
            <p className="make-the-right">
              <span>choice now</span>
              <span className="span">.</span>
            </p>
          </div>
          <div className="stunning-interior-design">
            Stunning interior design services, now within reach.
          </div>
          <BlueButton to="/projects" text="Explore our plans" />
        </div>
        <div className="slideshow">
          <video className="background-video" autoPlay loop muted>
            {/* <source src="" type="video/mp4" /> */}
            <source src="/landing_video.mp4" type="video/mp4" />
          </video>

          <div className="masking-wrapper">
            <div className="masking" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
