import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.sass";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerAcc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      await axios.post("http://localhost:5246/api/Auth/register", {
        name,
        email,
        password,
        cpf,
        role: role === "admin" ? "Admin" : "User",
      });
      setError(""); // Limpa erro em caso de sucesso
      navigate("/login");
    } catch (err) {
      console.error(err); // Log para depuração
      setError("Erro ao registrar. Verifique os dados ou tente novamente.");
    }
  };

  return (
    <form onSubmit={registerAcc} className="login-form-container">
      <div className="login-title-container">
        <h1>Registro</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="name">Nome:</label>
        </div>
        <div className="login-input-container-pass-input">
          <input
            className="input-login"
            type="text"
            placeholder="Digite seu Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="email">Email:</label>
        </div>
        <div className="login-input-container-pass-input">
          <input
            className="input-login"
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="cpf">CPF:</label>
        </div>
        <div className="login-input-container-pass-input">
          <input
            className="input-login"
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="confirmPassword">Repita sua Senha:</label>
        </div>
        <div className="login-input-container-pass-input">
          <input
            className="input-login"
            type="password"
            placeholder="Digite sua Senha Novamente"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-input-container">
        <div className="login-input-container-pass-label">
          <label className="label-login" htmlFor="user-role">Tipo de Perfil:</label>
        </div>
        <div className="login-input-container-pass-select">
          <select
            id="user-role"
            className="input-login"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Selecione</option>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      </div>
      <div className="login-register-container">
        <div className="login-register-text">
          <span>Já é Usuário?</span>
        </div>
        <div className="login-register-link">
          <a className="login-register-link-a" href="/login">Faça o seu Login</a>
        </div>
      </div>
      <div className="login-button-container">
        <button className="login-button" type="submit">Registrar</button>
      </div>
    </form>
  );
};

export default Register;