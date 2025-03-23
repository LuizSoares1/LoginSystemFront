import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import "../styles/user-list.sass";

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  role: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5246/api/Auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch {
        setError("Erro ao carregar a lista de usuários.");
      }
    };
    fetchUsers();
  }, [token]);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://902f-2804-14d-a281-85af-2973-5de4-b54-1f25.ngrok-free.app/api/Auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      setError("Erro ao excluir o usuário.");
    }
  };

  return (
    <div className="users-container">
        <div className="users-buttons-container">
        <button className="users-button back" onClick={() => navigate(-1)}>
        Voltar
      </button>
        </div>
      
      <h1 className="users-title">Lista de Usuários</h1>
      {error && <p className="error">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Perfil</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>{user.role}</td>
              <td>
                <button className="users-button" onClick={() => deleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;