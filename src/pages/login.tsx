import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.sass";
import { useAuth } from "../App";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Função para fazer login, com decodificador de token e redirecionamento.

  const loginAcc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://288c-2804-14d-a281-85af-89c7-da49-a7f8-a330.ngrok-free.app/api/Auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      login(token, role);
      navigate("/home");
    } catch {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <form onSubmit={loginAcc} className="login-form-container">
      <div className="login-title-container">
        <h1>Login</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="email">E-mail:</label>
        </div>
        <div className="login-input-container-pass-input">
          <input
            className="input-login"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="password">Senha:</label>
        </div>
        <div className="login-input-container-pass-input">
          <input
            className="input-login"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-register-container">
        <div className="login-register-text">
          <span>Ainda não é Usuário?</span>
        </div>
        <div className="login-register-link">
          <a className="login-register-link-a" href="/register">Registre-se</a>
        </div>
      </div>
      <div className="login-button-container">
        <button className="login-button" type="submit">Entrar</button>
      </div>
    </form>
  );
};

export default Login;