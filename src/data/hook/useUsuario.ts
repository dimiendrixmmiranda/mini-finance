import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import UsuarioFirestore from "@/interfaces/UsuarioFirestore";
import Usuario from "@/interfaces/Usuario";
import { db } from "@/lib/firebase";


export function useDadosUsuario(usuario: Usuario| null) {
  const [dadosUsuario, setDadosUsuario] = useState<UsuarioFirestore | null>(null);

  useEffect(() => {
    async function buscarDados() {
      if (usuario?.uid) {
        const docRef = doc(db, "usuarios", usuario.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDadosUsuario(docSnap.data() as UsuarioFirestore);
        } else {
          console.log("Documento do usuário não encontrado.");
        }
      }
    }
    buscarDados();
  }, [usuario]);

  return dadosUsuario;
}
