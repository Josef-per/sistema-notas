

import Register from "../../../components/Registers/Register/Register";
import SideNav from "../../../components/SideNav/SideNav";
import { professorMenu } from "../../../config/navigation";
import "./AlunosList.css"


export default function AlunosList (){
    return(
        <>
            <SideNav 
                title={"Professor"}
                items={professorMenu}
            />
            <main className="Alunos_Table">
                <Register/>
            </main>
        </>
    )
}