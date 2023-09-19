import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Header from "./components/header/Header";

import LandingPage from "./pages/landing/LandingPage";
import PlansPage from "./pages/plans/PlansPage";
import ServicesPage from "./pages/services/ServicesPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ContactPage from "./pages/contact/ContactPage";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/plans":
        title = "";
        metaDescription = "";
        break;
      case "/ourservices":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/register":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    
    <div className="App">
      
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<PlansPage />}>
        <Route path="/projects/category/:id" element={<PlansPage />}/>
          </Route>
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}
export default App;
