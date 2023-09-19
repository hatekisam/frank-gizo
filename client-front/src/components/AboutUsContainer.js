import "./AboutUsContainer.css";
const AboutUsContainer = () => {
  return (
    <div className="infosection" data-scroll-to="infoSection">
      <div className="infocontent">
        <div className="headline2">
          <p className="get-to-know">Get to know us</p>
          <p className="p2">01</p>
        </div>
        <div className="infodescriptions">
          <div className="whoarewe">
            <div className="infodetails">
              <b className="who-are-we">Who are we?</b>
              <div className="sustainable-homes-and">
                Sustainable Homes and Designs Rwanda Ltd is something other than
                an interior design organization, we’re an accumulation of
                specialists and draftsmen with mutual reasoning of underscoring
                the basic and the sensitive. We control structures and mixes
                from our regular world to make a stylish, down-to-earth, and
                practical environment that changes a straightforward building or
                space into a position of bliss for you and your visitors
              </div>
            </div>
            <img
              className="depositphotos-126713320-stock-icon"
              alt=""
              src="/depositphotos-126713320stockphotoarchitectureprojectinprogress-1@2x.png"
            />
          </div>
          <div className="vision">
            <img
              className="png-clipart-architectural-draw-icon"
              alt=""
              src="/pngclipartarchitecturaldrawingsketcharchitectureplanhousedrawingarchitecturaldrawingremovebgpreview-1@2x.png"
            />
            <div className="infodetails1">
              <b className="who-are-we">Our Vision</b>
              <div className="sustainable-homes-and">
                Our vision is to be a reputable, sustainable, and desirable
                premier luxurious interior design firm of the global market
                place providing the state-of-the-art innovative designs and
                superior quality finishing
              </div>
            </div>
          </div>
          <div className="mission">
            <div className="infodetails1">
              <b className="who-are-we">Our Mission</b>
              <div className="sustainable-homes-and">
                Our mission is to create reward experience and value that
                combine functionality with high quality and innovation for our
                customers
              </div>
            </div>
            <img className="image-4-icon" alt="" src="/image-4@2x.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContainer;
