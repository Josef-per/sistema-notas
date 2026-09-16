import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDocFromServer } from "firebase/firestore";
import { auth, db } from "./firebase";

// Autentica e busca o perfil cadastrado no Firestore.
export async function entrar(email, senha) {
  const credencial = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  try {
    const referencia = doc(
      db,
      "usuarios",
      credencial.user.uid
    );

    const documento = await getDocFromServer(referencia);

    if (!documento.exists()) {
      throw new Error("Conta sem perfil cadastrado. Confira o UID no Firestore.");
    }

    const perfil = documento.data();

    if (!["professor", "aluno"].includes(perfil.tipo)) {
      throw new Error("Perfil inválido. Confira o campo tipo no Firestore.");
    }

    return {
      uid: credencial.user.uid,
      nome: perfil.nome,
      tipo: perfil.tipo,
    };
  } catch (erro) {
    // Se o perfil não puder ser validado, encerra o acesso.
    await signOut(auth);
    throw erro;
  }
}

export async function sair() {
  await signOut(auth);
}