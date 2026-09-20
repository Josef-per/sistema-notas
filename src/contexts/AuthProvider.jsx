import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { auth } from "../services/firebase";
import { buscarPerfil } from "../services/authService";

export default function AuthProvider({ children }) {
  const [perfil, setPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erroSessao, setErroSessao] = useState("");

  useEffect(() => {
    let ativo = true;
    let consultaAtual = 0;

    const cancelarObservacao = onAuthStateChanged(
      auth,
      async (usuario) => {
        const numeroConsulta = ++consultaAtual;

        if (!ativo) return;

        setCarregando(true);
        setPerfil(null);
        setErroSessao("");

        if (!usuario) {
          setCarregando(false);
          return;
        }

        try {
          const perfilEncontrado = await buscarPerfil(usuario.uid);

          // Ignora respostas antigas se a sessão mudou.
          if (!ativo || numeroConsulta !== consultaAtual) return;

          setPerfil(perfilEncontrado);
        } catch (erro) {
          if (!ativo || numeroConsulta !== consultaAtual) return;

          console.error("Erro ao carregar a sessão:", erro);

          setErroSessao(
            "Não foi possível carregar seu perfil. Confira sua conexão e tente novamente."
          );
        } finally {
          if (ativo && numeroConsulta === consultaAtual) {
            setCarregando(false);
          }
        }
      }
    );

    return () => {
      ativo = false;
      consultaAtual++;
      cancelarObservacao();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ perfil, carregando, erroSessao }}>
      {children}
    </AuthContext.Provider>
  );
}