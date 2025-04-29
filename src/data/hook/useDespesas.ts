import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Despesa from "@/interfaces/Despesa";

export function useDespesas(usuario?: { uid: string }) {
    const [despesas, setDespesas] = useState<Despesa[] | null>(null);
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<Error | null>(null)

    useEffect(() => {
        const buscar = async () => {
            if (!usuario?.uid) {
                setDespesas([])
                setCarregando(false)
                return
            }

            try {
                if (!usuario?.uid) return;
                const despesasRef = collection(db, "usuarios", usuario.uid, "despesas");
                const snapshot = await getDocs(despesasRef);

                const lista: Despesa[] = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        data: data.data?.toDate ? data.data.toDate() : new Date(),
                        formaDePagamento: data.formaDePagamento,
                        funcionarioPagou: data.funcionarioPagou,
                        nome: data.nome,
                        tipo: data.tipo,
                        valorDaDespesa: data.valorDaDespesa,
                        categoriaDaDespesa: data.categoriaDaDespesa
                    };
                })
                setDespesas(lista)
            } catch (err) {
                setErro(err as Error)
            } finally {
                setCarregando(false)
            }
        }

        buscar()
    }, [usuario?.uid])

    return { despesas, carregando, erro };
}