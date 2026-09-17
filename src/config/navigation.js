import {
    LayoutDashboard,
    CircleDot,
    Plus
} from "lucide-react";


export const professorMenu = [
    {
        label: "Dashboard",
        to: "/Professor",
        icon: LayoutDashboard,
        end: true
    },
    {
        label: "Alunos",
        to: "/Professor/Alunos",
        icon: CircleDot,
        end: true
    },
    {
        label: "Cadastrar nota",
        to: "/Professor/Alunos/Notas",
        icon: Plus,
        end: true
    }
];


export const alunoMenu = [
    {
        label: "Dashboard",
        to: "/Aluno",
        icon: LayoutDashboard,
        end: true
    }
];