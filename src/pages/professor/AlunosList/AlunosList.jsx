

import Register from "../../../components/Registers/Register/Register";
import SideNav from "../../../components/SideNav/SideNav";
import "./AlunosList.css"


export default function AlunosList (){
    return(
        <>
            <SideNav />
            <main className="Alunos_Table">
                <Register/>
            </main>
        </>
    )
}