import "./LinkContainer.css";
const LinkContainer = ({ dimensions, dimensions89, onTwitterIconClick }) => {
  return (
    <div className="footer">
      <div className="footercontent">
        <div className="footertop">
          <div className="socialslinks">
            <img className="igicon" alt="" src="/igicon.svg" />
            <img className="facebookicon" alt="" src={dimensions} />
            <a
              className="twittericon"
              href="#"
              onClick={onTwitterIconClick}
            >
              <div className="twittericon-child" />
              <img className="vector-icon10" alt="" src="/vector.svg" />
            </a>
          </div>
          <img
            className="shdr-removebg-preview-1-icon"
            alt=""
            src={dimensions89}
          />
        </div>
        <div className="footermiddle">
          <div className="mail">
            <img
              className="ant-designmail-outlined-icon"
              alt=""
              src="/antdesignmailoutlined.svg"
            />
            <div className="find-us">Mail</div>
            <div className="sustainablehomesdesigngmailc">
              sustainablehomesdesign@gmail.com
            </div>
          </div>
          <div className="phone">
            <img
              className="material-symbolscall-icon"
              alt=""
              src="/materialsymbolscall.svg"
            />
            <div className="find-us">Phone</div>
            <div className="rwanda-kigali-kicukiro">+250 788 474 110</div>
          </div>
          <div className="location2">
            <img
              className="material-symbolslocation-on-icon"
              alt=""
              src="/materialsymbolslocationon.svg"
            />
            <div className="find-us">Find us</div>
            <div className="rwanda-kigali-kicukiro">
              Rwanda, Kigali, Kimironko
            </div>
          </div>
        </div>
        <div className="footerbottom">
          <div className="footerbottom-child" />
          <div className="footerbottom-inner">
            <div className="all-rights-reserved-2022-parent">
              <div className="all-rights-reserved">
                All rights reserved, 2022
              </div>
              <img
                className="icons8copyright"
                alt=""
                src="/icons8copyright.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkContainer;
