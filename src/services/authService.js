import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDocFromServer } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function buscarPerfil(uid) {
  const referencia = doc(db, "usuarios", uid);
  const documento = await getDocFromServer(referencia);

  if (!documento.exists()) {
    throw new Error(
      "Conta sem perfil cadastrado. Confira o UID no Firestore."
    );
  }

  const perfil = documento.data();

  if (!["professor", "aluno"].includes(perfil.tipo)) {
    throw new Error(
      "Perfil inválido. Confira o campo tipo no Firestore."
    );
  }

  return {
    uid,
    nome: perfil.nome,
    tipo: perfil.tipo,
  };
}

export async function entrar(email, senha) {
  const credencial = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  try {
    return await buscarPerfil(credencial.user.uid);
  } catch (erro) {
    await signOut(auth);
    throw erro;
  }
}

export async function sair() {
  await signOut(auth);
}