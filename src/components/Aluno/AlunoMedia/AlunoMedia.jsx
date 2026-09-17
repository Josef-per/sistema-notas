import {Dot} from "lucide-react"

import "./AlunoMedia.css"

export default function AlunoMedia({
    nota = Text,
    status = Number
}){
    return(
        <>
            <div className="Aluno_Media">
                <p>NOTA FINAL</p>
                <h1>{nota}</h1>
                <div className="Aluno_Status">
                    <Dot/>
                    <span>{status}</span>
                </div>
            </div>
        </>
    )
}