import React, { useState} from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./PlanCardDetailsCard.css";
import ImageCarousel from "../../imagecarousel/ImageCarousel";
const PlanCardDetailsCard = ({
  price,
  category,
  location,
  livingRooms,
  washRooms,
  floors,
  images,
  // likes,
  bedRooms
}) => {
  const [likesCount, setLikesCount] = useState(0);
 const [isLiked, setIsLiked] = useState(false);
   
   const handleLikeClick = () => {
    if (isLiked) {
      
      setLikesCount(likesCount - 1);
    } else {
     
      setLikesCount(likesCount + 1);
    }
   
    setIsLiked(!isLiked);
   };
  return (
    <React.Fragment>
      <div className="--plancard">
        <div className="planimage">
          {/* <img className="--card-image" alt="Card image" src={image} /> */}
          <div className="--card-image">
            <ImageCarousel imageList={images} />
          </div>
        </div>
        <div className="plancontent">
          <div className="price1">
            <div className="div28">{`$ ${price}.0`}</div>
          </div>
          <div className="heading">
            <b className="residential-building">{category}</b>
          </div>
          <div className="location">
            <div className="nyarugenge-kigali">{location}</div>
          </div>
          <div className="details">
            <div className="group-parent3">
              {/* <img className="frame-child8" alt="" /> */}
              <div className="div29">{livingRooms}</div>
            </div>
            <div className="group-parent4">
              {/* <img className="frame-child8" alt="" /> */}
              <div className="div30">
                <p className="p8">{washRooms}</p>
              </div>
            </div>
            <div className="group-parent4">
              <div className="--"> </div>

              <div className="div30">
                <p className="p8">{floors}</p>
              </div>
            </div>
          </div>
          <div className="row-container">
            <div className="plancontent-inner"></div>
            <div className="analytics">
              <div className="views">
                <div className="views1">
                  <span>
                    {likesCount} {likesCount === 1 ? "like" : "likes"}
                  </span>
                  <span className="like-button" onClick={handleLikeClick}>
                    {isLiked ? (
                      <AiFillHeart className="like" />
                    ) : (
                      <AiOutlineHeart className="like" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlanCardDetailsCard;
