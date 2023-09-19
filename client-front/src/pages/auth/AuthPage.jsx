import axios from "axios";
import React, { useState } from "react";
import "./AuthPage.css";
import Chat from "../../components/Chat/chat/Chat"; 

function AuthPage() {
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); 

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:8000/authenticate", { username: value })
      .then((r) => {
      
          if (r.data.success) {
             setLoggedIn(true);
        }
      })
      .catch((er) => console.log(er));

    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && !loggedIn && (
        <div className="modal-overlay">
          <form onSubmit={onSubmit} className="form-card">
            <div className="form-title">Welcome 👋</div>

            <div className="form-subtitle">Set a username to get started</div>

            <div className="auth">
              <div className="auth-label">Username</div>
              <input
                className="auth-input"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="auth-button" type="submit">
                Enter
              </button>
            </div>
          </form>
        </div>
      )}

      
      {loggedIn && <Chat user={username} />}
    </div>
  );
}

export default AuthPage;
