import {
  collection,
  doc,
  getDocsFromServer,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export const CAMPOS_NOTAS = [
  "bimestre1",
  "bimestre2",
  "bimestre3",
  "bimestre4",
];

export async function listarAlunosDoProfessor(professorId) {
  if (!professorId || auth.currentUser?.uid !== professorId) {
    throw new Error("Sessão inválida. Entre novamente.");
  }

  const consulta = query(
    collection(db, "alunos"),
    where("professorId", "==", professorId)
  );

  const resultado = await getDocsFromServer(consulta);

  return resultado.docs
    .map((documento) => ({
      ...documento.data(),
      id: documento.id,
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

export async function salvarNotas(alunoId, notas) {
  if (!auth.currentUser) {
    throw new Error("Entre novamente para salvar.");
  }

  if (!alunoId) {
    throw new Error("Selecione um aluno.");
  }

  const notasValidadas = {};

  for (const campo of CAMPOS_NOTAS) {
    const nota = notas[campo];

    if (
      nota !== null &&
      (typeof nota !== "number" ||
        !Number.isFinite(nota) ||
        nota < 0 ||
        nota > 10)
    ) {
      throw new Error("As notas devem estar entre 0 e 10.");
    }

    notasValidadas[campo] = nota;
  }

  await updateDoc(doc(db, "alunos", alunoId), {
    notas: notasValidadas,
    atualizadoEm: serverTimestamp(),
  });
}

export function observarAluno(uid, aoReceber, aoFalhar) {
  const referencia = doc(db, "alunos", uid);

  return onSnapshot(
    referencia,
    (documento) => {
      if (!documento.exists()) {
        aoReceber(null);
        return;
      }

      aoReceber({
        ...documento.data(),
        id: documento.id,
      });
    },
    aoFalhar
  );
}

export function observarAlunosDoProfessor(
  professorId,
  aoReceber,
  aoFalhar
) {
  const consulta = query(
    collection(db, "alunos"),
    where("professorId", "==", professorId)
  );

  return onSnapshot(
    consulta,
    (resultado) => {
      const alunos = resultado.docs
        .map((documento) => ({
          ...documento.data(),
          id: documento.id,
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

      aoReceber(alunos);
    },
    aoFalhar
  );
}