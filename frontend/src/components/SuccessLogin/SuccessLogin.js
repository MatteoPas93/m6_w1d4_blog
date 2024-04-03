import React from "react";
import { Link } from "react-router-dom";
import "./successLogin.css"

function SuccessLogin() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  return (
    <div className="container-success">
      <div> Account collegato con successo </div>
      <button>
      <Link to={'/home'}>
      Clicca per proseguire la navigazione</Link>
      </button>
    </div>
  );
}

export default SuccessLogin;