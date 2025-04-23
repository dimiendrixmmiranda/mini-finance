import Produto from "@/interfaces/Produto"

export default function acharProdutoPorId(id: string, produtos: Produto[]) {
    const produto = produtos.find(p => p.id === id)
    const nome = produto && produto.nome
    return nome
}