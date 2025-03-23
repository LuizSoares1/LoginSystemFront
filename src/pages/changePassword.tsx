import React, { useState } from "react";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/change-password.sass";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("As novas senhas não coincidem.");
      return;
    }
    try {
      await axios.post(
        "https://902f-2804-14d-a281-85af-2973-5de4-b54-1f25.ngrok-free.app/api/Auth/change-password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Senha alterada com sucesso!");
      setError("");
    } catch {
      setError("Erro ao alterar a senha. Verifique a senha atual.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={changePassword} className="login-form-container">
        <div className="users-buttons-container">
        <button className="change-password-button back" onClick={() => navigate(-1)}>
        Voltar
      </button>
        </div>

      <div className="login-title-container">
        <h1>Trocar Senha</h1>
      </div>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="login-input-container">
        <label className="label-login" htmlFor="currentPassword">Senha Atual:</label>
        <input
          className="input-login"
          type="password"
          placeholder="Digite sua senha atual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="login-input-container">
        <label className="label-login" htmlFor="newPassword">Nova Senha:</label>
        <input
          className="input-login"
          type="password"
          placeholder="Digite sua nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="login-input-container">
        <label className="label-login" htmlFor="confirmNewPassword">Confirme a Nova Senha:</label>
        <input
          className="input-login"
          type="password"
          placeholder="Confirme sua nova senha"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="login-button-container">
        <button className="login-button" type="submit">Alterar Senha</button>
      </div>
    </form>
  );
};

export default ChangePassword;