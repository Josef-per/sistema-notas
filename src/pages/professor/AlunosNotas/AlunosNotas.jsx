import { useState } from "react";
import { Tally1, Tally2, Tally3, Tally4 } from "lucide-react";

import FormField from "../../../components/FormField/FormField";
import SideNav from "../../../components/SideNav/SideNav";

import "./AlunosNotas.css";

export default function AlunosNotas() {

    const [aluno, setAluno] = useState("");

    const [nota1, setNota1] = useState("");
    const [nota2, setNota2] = useState("");
    const [nota3, setNota3] = useState("");
    const [nota4, setNota4] = useState("");

    const [nota1Error, setNota1Error] = useState("");
    const [nota2Error, setNota2Error] = useState("");
    const [nota3Error, setNota3Error] = useState("");
    const [nota4Error, setNota4Error] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        // Validação e salvamento futuramente
    }

    function handleCancel() {
        setAluno("");
        setNota1("");
        setNota2("");
        setNota3("");
        setNota4("");

        setNota1Error("");
        setNota2Error("");
        setNota3Error("");
        setNota4Error("");
    }

    return (
        <>
            <SideNav />

            <main className="Aluno_Notas">

                <div className="Aluno_GradeForm">

                    <div className="GradeForm_Header">
                        <h1>Notas do aluno</h1>
                        <p>Selecione o aluno e informe as notas dos bimestres.</p>
                    </div>

                    <form
                        className="GradeForm"
                        onSubmit={handleSubmit}
                    >

                        {/* Seleção do aluno */}
                        <div className="GradeForm_Select">

                            <label htmlFor="aluno">
                                Nome do aluno
                            </label>

                            <select
                                id="aluno"
                                value={aluno}
                                onChange={(event) => setAluno(event.target.value)}
                            >
                                <option value="">
                                    Selecione um aluno
                                </option>

                                {/* Futuramente será preenchido pelos alunos cadastrados */}
                                <option value="joao">
                                    João Silva
                                </option>

                                <option value="maria">
                                    Maria Souza
                                </option>
                            </select>

                        </div>

                        {/* Notas */}
                        <div className="GradeForm_Grades">

                            <FormField
                                label="1° Bimestre"
                                id="nota1"
                                type="number"
                                placeholder="0.0 - 10.0"
                                value={nota1}
                                onChange={(event) => setNota1(event.target.value)}
                                error={nota1Error}
                            />

                            <FormField
                                label="2° Bimestre"
                                id="nota2"
                                type="number"
                                placeholder="0.0 - 10.0"
                                value={nota2}
                                onChange={(event) => setNota2(event.target.value)}
                                error={nota2Error}
                            />

                            <FormField
                                label="3° Bimestre"
                                id="nota3"
                                type="number"
                                placeholder="0.0 - 10.0"
                                value={nota3}
                                onChange={(event) => setNota3(event.target.value)}
                                error={nota3Error}
                            />

                            <FormField
                                label="4° Bimestre"
                                id="nota4"
                                type="number"
                                placeholder="0.0 - 10.0"
                                value={nota4}
                                onChange={(event) => setNota4(event.target.value)}
                                error={nota4Error}
                            />

                        </div>

                        {/* Botões */}
                        <div className="Form_Buttons">

                            <button
                                type="button"
                                className="Form_Button Form_Button-Cancel"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="Form_Button Form_Button-Save"
                            >
                                Salvar notas
                            </button>

                        </div>

                    </form>

                </div>

            </main>
        </>
    );
}