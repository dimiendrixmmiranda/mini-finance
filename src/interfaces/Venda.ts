export default interface Venda {
    data: Date
    desconto: number
    precoUnitario: number,
    precoUnitarioVenda: number,
    produtoId: string
    quantidadeVendida: number
    valorFinalDaVenda: number
    nome: string
    tamanho: string
}