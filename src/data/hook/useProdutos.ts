import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Produto from "@/interfaces/Produto"

export function useProdutos(usuario?: { uid: string }) {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<Error | null>(null)

    useEffect(() => {
        const buscar = async () => {
            if (!usuario?.uid) {
                setProdutos([])
                setCarregando(false)
                return
            }

            try {
                const produtosRef = collection(db, "usuarios", usuario.uid, "produtos")
                const snapshot = await getDocs(produtosRef)

                const lista: Produto[] = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        nome: data.nome,
                        categoria: data.categoria,
                        quantidade: data.quantidade,
                        precoUnitario: data.precoUnitario,
                        precoUnitarioVenda: data.precoUnitarioVenda,
                        tamanho: data.tamanho,
                        data: data.data?.toDate ? data.data.toDate() : new Date()
                    }
                })

                setProdutos(lista)
            } catch (err) {
                setErro(err as Error)
            } finally {
                setCarregando(false)
            }
        }

        buscar()
    }, [usuario?.uid])

    return { produtos, carregando, erro };
}