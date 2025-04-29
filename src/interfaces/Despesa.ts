export default interface Despesa {
    data: Date
    formaDePagamento: string
    funcionarioPagou: string
    nome: string
    tipo: string
    valorDaDespesa: number
    categoriaDaDespesa: string
}