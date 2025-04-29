import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Venda from "@/interfaces/Venda";

export function useVendas(usuario?: { uid: string }) {
    const [vendas, setVendas] = useState<Venda[] | null>(null);
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<Error | null>(null)

    useEffect(() => {
        const buscar = async () => {
            if (!usuario?.uid) {
                setVendas([])
                setCarregando(false)
                return
            }

            try {
                const vendasRef = collection(db, "usuarios", usuario.uid, "vendas");
                const snapshot = await getDocs(vendasRef);

                const lista: Venda[] = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        data: data.data?.toDate ? data.data.toDate() : new Date(),
                        desconto: data.desconto ?? 0,
                        nome: data.nome,
                        precoUnitario: data.precoUnitario ?? 0,
                        precoUnitarioVenda: data.precoUnitarioVenda ?? 0,
                        produtoId: data.produtoId ?? '',
                        quantidadeVendida: data.quantidadeVendida ?? 0,
                        valorFinalDaVenda: data.valorFinalDaVenda ?? 0,
                        tamanho: data.tamanho
                    };
                });
                setVendas(lista)
            } catch (err) {
                setErro(err as Error)
            } finally {
                setCarregando(false)
            }
        }

        buscar()
    }, [usuario?.uid])

    return { vendas, carregando, erro };
}