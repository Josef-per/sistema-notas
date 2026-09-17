//import dos icons
import {
    LayoutDashboard,
    CircleDot,
    BellElectric,
    MoveRight,
    Plus
} from "lucide-react";

import { Link } from "react-router-dom";
import "./SideNav.css"

export default function SideNav() {
    return (
        <nav className="Side-Nav">

            <div className="Side-Nav_Logo">
                <BellElectric />
                <h1>GradeUp</h1>
            </div>

            <div className="Side-Nav_Menu">

                <span className="Side-Nav_Title">
                    PROFESSOR
                </span>

                <Link className="Side-Nav_Item" to="/Professor">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </Link>

                <Link className="Side-Nav_Item" to="/AlunosList">
                    <CircleDot />
                    <span>Alunos</span>
                </Link>

                <Link className="Side-Nav_Item" to="/CadastrarNota">
                    <Plus />
                    <span>Cadastrar nota</span>
                </Link>

            </div>

            <div className="Side-Nav_Bottom">
                <Link to="/">
                    <MoveRight />
                    <span>Sair</span>
                </Link>
            </div>

        </nav>
    );
}