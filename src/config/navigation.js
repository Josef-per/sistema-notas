import {
    LayoutDashboard,
    CircleDot,
    Plus
} from "lucide-react";


export const professorMenu = [
    {
        label: "Dashboard",
        to: "/Professor",
        icon: LayoutDashboard
    },
    {
        label: "Alunos",
        to: "/Professor/Alunos",
        icon: CircleDot
    },
    {
        label: "Cadastrar nota",
        to: "/Professor/Alunos/Notas",
        icon: Plus
    }
];


export const alunoMenu = [
    {
        label: "Dashboard",
        to: "/Aluno",
        icon: LayoutDashboard
    }
];