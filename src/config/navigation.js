import {
    LayoutDashboard,
    CircleDot,
    Plus
} from "lucide-react";


export const professorMenu = [
    {
        label: "Dashboard",
        to: "/professor",
        icon: LayoutDashboard,
        end: true
    },
    {
        label: "Alunos",
        to: "/professor/alunos",
        icon: CircleDot,
        end: true
    },
    {
        label: "Cadastrar nota",
        to: "/professor/alunos/notas",
        icon: Plus,
        end: true
    }
];


export const alunoMenu = [
    {
        label: "Dashboard",
        to: "/aluno",
        icon: LayoutDashboard,
        end: true
    }
];