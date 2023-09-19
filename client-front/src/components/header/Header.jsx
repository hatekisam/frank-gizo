import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { IoConstructOutline } from "react-icons/io5";
import {
  MdOutlineMiscellaneousServices,
  MdOutlineContactSupport,
} from "react-icons/md";
import "./Header.css";
import BlueButton from "../BlueButton/BlueButton";

const Header = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const navigationbar = document.querySelector(".navigationbar");
    const isNavbarVisible = navigationbar.getBoundingClientRect().top >= 0;

    if (isNavbarVisible && window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setActiveLink("home");
    } else if (location.pathname === "/services") {
      setActiveLink("services");
    } else if (location.pathname === "/projects") {
      setActiveLink("projects");
    } else if (location.pathname === "/contact") {
      setActiveLink("contact");
    } else {
      setActiveLink("");
    }
  }, [location.pathname]);

  const onLogoImageClick = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  const onLinkClick = (destination) => () => {
    navigate(destination);
    setActiveLink(destination);
    const navigationbar = document.querySelector(".nav");
    const hamburgermenu = document.querySelector(".hamburgermenu");
       hamburgermenu.classList.toggle("active");
    const navLinks = document.querySelector(".links");
    const nav = document.querySelector(".nav");
    navLinks.classList.remove("active");
    navigationbar.classList.remove("active");
    nav.classList.remove("active");
    navigationbar.classList.remove("active");
  };

const onHamburgerClick = () => {
  const navLinks = document.querySelector(".links");
  const hamburgermenu = document.querySelector(".hamburgermenu");
  const nav = document.querySelector(".nav");
  const navigationbar = document.querySelector(".navigationbar");
  const navButton = document.querySelector(".--main-blue-button");

  
  if (navLinks) navLinks.classList.toggle("active");
  if (hamburgermenu) hamburgermenu.classList.toggle("active");
  if (nav) nav.classList.toggle("active");
  if (navigationbar) navigationbar.classList.toggle("active");
  if (navButton) navButton.classList.toggle("active");
};

  return (
    <div className="navigationbar " id="navbar">
      <div className="nav">
        <img
          className="logo-icon2"
          alt=""
          src="/logo@2x.png"
          onClick={onLogoImageClick}
        />
        <div className="menulinks">
          <div className="links">
            <Link
              className={activeLink === "home" ? "active" : ""}
              onClick={onLinkClick("home")}
              to="/"
            >
              <HiOutlineHome />
              &nbsp; &nbsp;
              <span>Home</span>
            </Link>
            <Link
              className={activeLink === "services" ? "active" : ""}
              onClick={onLinkClick("services")}
              to="/services"
            >
              <MdOutlineMiscellaneousServices />
              &nbsp; &nbsp;
              <span> Our services</span>
            </Link>
            <Link
              className={activeLink === "projects" ? "active" : ""}
              onClick={onLinkClick("projects")}
              to="/projects"
            >
              <IoConstructOutline />
              &nbsp; &nbsp;
              <span>Projects</span>
            </Link>
            <Link
              className={activeLink === "contact" ? "active" : ""}
              onClick={onLinkClick("contact")}
              to="/contact"
            >
              <MdOutlineContactSupport />
              &nbsp; &nbsp;
              <span>Contact us</span>
            </Link>

            {/* <BlueButton to="/projects" text="Explore more" /> */}
          </div>
        </div>

        <button className="hamburgermenu" onClick={onHamburgerClick}>
          <img className="hamburgermenu-icon" alt="" src="/hamburgermenu.svg" />
        </button>
      </div>
    </div>
  );
};

export default Header;
