import "./ElectricalContainer.css";
const ElectricalContainer = () => {
  return (
    <div className="group-parent">
      <div className="image-6-parent">
        <img className="image-6-icon" alt="" src="/image-6@2x.png" />
        <div className="group-child1" />
      </div>
      <div className="button-parent">
        <button className="button2">
          <div className="vector-parent1">
            <img className="vector-icon4" alt="" src="/vector5.svg" />
            <div className="know-more1">Know more</div>
          </div>
        </button>
        <div className="plumbing-and-electrical-works-parent">
          <b className="plumbing-and-electrical">
            Plumbing and electrical works
          </b>
          <img className="vector-icon5" alt="" src="/vector6.svg" />
        </div>
        <div className="water-parent">
          <div className="water">Water</div>
          <img className="vector-icon6" alt="" src="/vector7.svg" />
        </div>
        <div className="electricity-parent">
          <div className="electricity">Electricity</div>
          <img className="vector-icon7" alt="" src="/vector8.svg" />
        </div>
      </div>
    </div>
  );
};

export default ElectricalContainer;
