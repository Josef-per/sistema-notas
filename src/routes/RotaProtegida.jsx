import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export default function RotaProtegida({ tipoPermitido }) {
  const { perfil, carregando, erroSessao } = useContext(AuthContext);

  if (carregando) {
    return (
      <main className="Login">
        <p role="status">Carregando sua sessão...</p>
      </main>
    );
  }

  if (erroSessao) {
    return (
      <main className="Login">
        <section className="Login_Section">
          <div className="Login_Card">
            <p className="Login_Error" role="alert">
              {erroSessao}
            </p>

            <button
              type="button"
              className="Login_BtnEntrar"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!perfil) {
    return <Navigate to="/" replace />;
  }

  if (perfil.tipo !== tipoPermitido) {
    const destino =
      perfil.tipo === "professor" ? "/professor" : "/aluno";

    return <Navigate to={destino} replace />;
  }

  return <Outlet />;
}