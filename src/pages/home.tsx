import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import "../styles/home.sass";

// Página inicial, com botões para sair, trocar senha e acessar a lista de usuários.
// O botão de lista de usuários só é exibido para usuários com a role "Admin".

const Home: React.FC = () => {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();

  const clickLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Hola Mundo</h1>
      <div className="home-buttons">
        <button className="home-button logout" onClick={clickLogout}>Sair</button>
        <button className="home-button" onClick={() => navigate("/change-password")}>Trocar Senha</button>
        {userRole === "Admin" && (
          <button className="home-button" onClick={() => navigate("/users")}>Lista de Usuários</button>
        )}
      </div>
    </div>
  );
};

export default Home;