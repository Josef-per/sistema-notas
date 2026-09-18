import React, { useState } from "react"
import {BellElectric, Mail, Lock, Eye, EyeOff} from "lucide-react"
import {Link, useNavigate} from "react-router-dom"

import "./Login.css"
import FormFiled from "../../components/FormField/FormField"

export default function Login(){

    //navegação entre as páginas
    const navigate = useNavigate();

    //estados padrão da tela
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    //estados de erro da tela
    const [mailError, setMailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    //estados da página
    const [showPassword, setShowPassword] = useState(false);

    //validação dos campos
    const handleSubmit = (event) => {
        event.preventDefault();

        let hasError = false;

        setMailError("");
        setPasswordError("");

        if (!mail.trim()) {
            setMailError("Informe seu e-mail.");
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError("Informe sua senha.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Temporário:
        // Depois vikito vc altera pra validação do backend

        navigate("/professor");
    };

    return(
        <>
            <main className="Login">
                <section className="Login_Section">

                    <div className="Login_Title">
                        <BellElectric className="Login_Icon"/>
                        <h1>GradeUp</h1>
                        <p>Sistema de gerenciamento de notas</p>
                    </div>

                    <div className="Login_Card">
                        <form className="Login_Form" onSubmit={handleSubmit}>
                            {/*Aqui vamos colocar os comnentes dos campos de cadastro*/}
                            <FormFiled
                                label="E-mail"
                                id="Email"
                                type="email"
                                placeholder="EmailInstituicional@educ.com"
                                icon={<Mail/>}
                                value={mail}
                                onChange = {(event) => setMail(event.target.value)}
                                error={mailError}
                            />

                            <FormFiled
                                label="Senha"
                                id="password"
                                type= {showPassword ? "text" : "password"}
                                placeholder="***********"
                                icon={<Lock/>}
                                value={password}
                                onChange = {(event) => setPassword(event.target.value)}
                                error={passwordError}
                                endIcon={
                                    <button
                                        type="button" 
                                        className="Password_Toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword
                                            ? <EyeOff size={17}/>
                                            : <Eye size={17}/>
                                        }
                                    </button>
                                }
                            />

                            <Link
                                to="#"
                                className="Forgot_Password"
                            >
                                <span>Esqueci minha senha</span>
                            </Link>

                            {/*Link temporário somente para testes*/}
                            <button
                                type="submit"
                                className="Login_BtnEntrar"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}