import React, { useState } from "react";
import { BellElectric, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import "./Login.css";
import FormFiled from "../../components/FormField/FormField";
import { entrar } from "../../services/authService";

export default function Login() {
  // Estados padrão da tela.
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de erro da tela.
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Estados da página.
  const [showPassword, setShowPassword] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  // Envia os dados para o serviço de autenticação.
  async function handleSubmit(evento) {
    evento.preventDefault();

    if (carregando) return;

    setMailError("");
    setPasswordError("");
    setLoginError("");
    setMensagemSucesso("");

    if (!mail.trim()) {
      setMailError("Informe o e-mail.");
    }

    if (!password) {
      setPasswordError("Informe a senha.");
    }

    if (!mail.trim() || !password) return;

    setCarregando(true);

    try {
      const perfil = await entrar(mail, password);

      const tipo = perfil.tipo === "professor" ? "Professor" : "Aluno";

      setMensagemSucesso(
        `Login realizado! Bem-vindo, ${perfil.nome}. Perfil: ${tipo}.`,
      );

      setPassword("");
    } catch (erro) {
      const mensagens = {
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/user-not-found": "E-mail ou senha incorretos.",
        "auth/wrong-password": "E-mail ou senha incorretos.",
        "auth/invalid-email": "Informe um e-mail válido.",
        "auth/user-disabled": "Esta conta está desativada.",
        "auth/too-many-requests":
          "Muitas tentativas. Aguarde um pouco e tente novamente.",
        "auth/network-request-failed":
          "Falha de conexão. Confira sua internet.",
        "auth/operation-not-allowed":
          "Ative E-mail/senha no Firebase Authentication.",
        "permission-denied":
          "Não foi possível consultar o perfil. Confira as regras do Firestore.",
        unavailable: "Não foi possível acessar o banco. Tente novamente.",
      };

      setLoginError(
        mensagens[erro.code] ||
          (!erro.code
            ? erro.message
            : "Não foi possível entrar. Tente novamente."),
      );

      console.error("Falha no login:", erro.code || erro.message);
    } finally {
      setCarregando(false);
    }
  }

  // Front-end.
  return (
    <>
      <main className="Login">
        <section className="Login_Section">
          <div className="Login_Title">
            <BellElectric className="Login_Icon" />
            <h1>GradeUp</h1>
            <p>Sistema de gerenciamento de notas</p>
          </div>

          <div className="Login_Card">
            <form className="Login_Form" onSubmit={handleSubmit}>
              {/* Componentes dos campos de login. */}
              <FormFiled
                label="E-mail"
                id="Email"
                type="email"
                placeholder="EmailInstituicional@educ.com"
                icon={<Mail />}
                value={mail}
                onChange={(event) => setMail(event.target.value)}
                error={mailError}
              />

              <FormFiled
                label="Senha"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="***********"
                icon={<Lock />}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={passwordError}
                endIcon={
                  <button
                    type="button"
                    className="Password_Toggle"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                }
              />

              <Link to="#" className="Forgot_Password">
                <span>Esqueci minha senha</span>
              </Link>

              {loginError && (
                <p role="alert" className="Login_Error">
                  {loginError}
                </p>
              )}

              {mensagemSucesso && (
                <p role="status" className="Login_Success">
                  {mensagemSucesso}
                </p>
              )}

              <button
                type="submit"
                className="Login_BtnEntrar"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
