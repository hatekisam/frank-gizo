import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, config } from "../../utils/api";
import PlansNav from "../../components/plansnav/Plansnav";
import PlanCardDetailsCard from "../../components/cards/plan-card/PlanCardDetailsCard";
import "./PlansPage.css";
import ChatButton from "../../components/Chat/chatbutton/ChatButton";
import Chat from "../../components/Chat/chat/Chat";
import AuthPage from "../auth/AuthPage";
import LinkContainer from "../../components/LinkContainer";
import { Link } from "react-router-dom";

const PlansPage = () => {
  const [user, setUser] = useState(undefined);
  const [chatActive, setChatActive] = useState(false);
  const closeActive = () => {
    setChatActive(false);
  };
  const onTwitterIconClick = () => {
    window.open("https://twitter.com/SHDRltd1");
  };
  const [plans, setPlans] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [plansKey, setPlansKey] = useState(0);

  const onLinkClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    const filteredPlans =
      categoryId === null
        ? allPlans
        : allPlans.filter((plan) => plan.category._id === categoryId);
    setPlans(filteredPlans);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/project-categories`,
          config
        );

        if (response.data.success) {
          setCategories(response.data.data.categories);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`, config);

        if (response.data.success) {
          setPlans(response.data.data.projects);
          setAllPlans(response.data.data.projects); // Store all plans separately
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    setPlansKey((prevKey) => prevKey + 1);
  }, [plans]);

  return (
    <div className="planspage">
      <div className="plans-content">
        <PlansNav
          categories={categories}
          activeCategoryId={activeCategoryId}
          onLinkClick={onLinkClick}
        />

        <div className="planslist">
          {plans.map((plan) => (
            <PlanCardDetailsCard
              images={plan.images}
              category={plan.category.title}
              price={plan.planPrice}
              location={plan.location}
              livingRooms={plan.livingRooms}
              washRooms={plan.washRooms}
              bedRooms={plan.bedRooms}
              floors={plan.numberOfFloors}
              likes={plan.likes}
              key={`${plan._id}_${plansKey}`}
            />
          ))}
        </div>
        <ChatButton onClick={() => setChatActive(true)} />

        {chatActive && !user ? (
          <AuthPage onAuth={(user) => setUser(user)} />
        ) : chatActive && user ? (
          <Chat user={user} />
        ) : (
          ""
        )}
      </div>
      <LinkContainer
        dimensions="/facebookicon2.svg"
        dimensions89="/shdrremovebgpreview-11@2x.png"
        onTwitterIconClick={onTwitterIconClick}
      />
    </div>
  );
};

export default PlansPage;
