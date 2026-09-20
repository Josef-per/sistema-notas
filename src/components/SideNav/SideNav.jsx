import { useState } from "react";
import { BellElectric, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { sair } from "../../services/authService";
import "./SideNav.css";

export default function SideNav({ title, items }) {
  const navigate = useNavigate();

  const [saindo, setSaindo] = useState(false);
  const [erroSaida, setErroSaida] = useState("");

  async function handleSair() {
    if (saindo) return;

    setSaindo(true);
    setErroSaida("");

    try {
      await sair();
      navigate("/", { replace: true });
    } catch (erro) {
      console.error("Erro ao sair:", erro);
      setErroSaida("Não foi possível sair. Tente novamente.");
      setSaindo(false);
    }
  }

  return (
    <nav className="Side-Nav">
      <div className="Side-Nav_Logo">
        <BellElectric />
        <h1>GradeUp</h1>
      </div>

      <div className="Side-Nav_Menu">
        <span className="Side-Nav_Title">{title}</span>

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              className={({ isActive }) =>
                `Side-Nav_Item ${isActive ? "active" : ""}`
              }
              to={item.to}
              end={item.end}
            >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="Side-Nav_Bottom">
        {erroSaida && (
          <p className="Side-Nav_Error" role="alert">
            {erroSaida}
          </p>
        )}

        <button
          type="button"
          className="Side-Nav_Logout"
          onClick={handleSair}
          disabled={saindo}
        >
          <LogOut />
          <span>{saindo ? "Saindo..." : "Sair"}</span>
        </button>
      </div>
    </nav>
  );
}