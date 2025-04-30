export default interface Despesa {
    data: Date
    formaDePagamento: string
    funcionarioQuePagou: string
    nome: string
    tipo: string
    valorDaDespesa: number
    categoriaDaDespesa: string
}