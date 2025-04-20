import Produto from "@/interfaces/Produto";
import Input from "../InputFormulario/Input";
import Select from "../InputFormulario/Select";
import { useState } from "react";

interface FormularioCadastroDeVendaProps {
    produtoVendido: string
    setProdutoVendido: (valor: string) => void
    quantidadeVendida: string
    setQuantidadeVendida: (valor: string) => void
    data: string
    setData: (valor: string) => void
    precoUnitario: string,
    setPrecoUnitario: (valor: string) => void
    precoUnitarioVenda: string,
    setPrecoUnitarioVenda: (valor: string) => void
    desconto: string
    setDesconto: (valor: string) => void
    valorDaVenda: string
    setValorDaVenda: (valor: string) => void
    produtosDisponiveis: Produto[]
    salvarVenda: (e: React.FormEvent) => void

}

export default function FormularioCadastroDeVenda({ produtoVendido, setProdutoVendido, quantidadeVendida, setQuantidadeVendida, data, setData, precoUnitario, setPrecoUnitario, precoUnitarioVenda, setPrecoUnitarioVenda, desconto, setDesconto, valorDaVenda, setValorDaVenda, produtosDisponiveis, salvarVenda }: FormularioCadastroDeVendaProps) {
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState<number | null>(null)

    function calcularDesconto(e: React.FormEvent) {
        e.preventDefault()
        const qtde = parseInt(quantidadeVendida)
        const descontoFormatado = parseFloat(desconto) / 100
        const precoPorUnidade = parseFloat(precoUnitarioVenda)
        console.log(precoPorUnidade)
        const precoFinal = qtde * precoPorUnidade
        const precoFinalComDesconto = precoFinal - (precoFinal * descontoFormatado)
        setValorDaVenda(`R$${precoFinalComDesconto.toFixed(2)}`)
    }
    return (
        <form className="flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md" onSubmit={salvarVenda}>
            <h2 className="font-semibold text-xl uppercase text-center">Cadastro de Venda:</h2>
            {/* Esse select vai receber uma lista depois como todos os produtos cadastrados */}
            <Select
                id="produtoVendido"
                textoLabel="Selecione o produto vendido:"
                options={[
                    { valor: '', texto: 'Selecione' },
                    ...produtosDisponiveis.map(p => ({
                        valor: p.id,
                        texto: p.nome,
                    }))
                ]}
                valor={produtoVendido}
                setValor={(valor) => {
                    setProdutoVendido(valor);
                    const produtoSelecionado = produtosDisponiveis.find(p => p.id === valor);
                    console.log(produtoSelecionado)
                    if (produtoSelecionado) {
                        setPrecoUnitario(`${produtoSelecionado.precoUnitario}`)
                        setPrecoUnitarioVenda(`${produtoSelecionado.precoDeVenda}`)
                    }
                    if (produtoSelecionado) {
                        setQuantidadeDisponivel(produtoSelecionado.quantidade)
                    }
                }}
            />
            <p>Quantidade Disponível: {quantidadeDisponivel ?? '—'}</p>
            <Input
                id="quantidadeVendida"
                tipo="number"
                textoLabel="Quantidade vendida:"
                valor={quantidadeVendida}
                setValor={(valor) => {
                    setQuantidadeVendida(valor)
                    const qtde = Number(valor)
                    const preco = parseFloat(precoUnitarioVenda)
                    const total = qtde * preco
                    setValorDaVenda(`R$${total.toFixed(2).replace('.', ',')}`)
                }}
            />
            {/* tem que linkar quando eu selecionar o produto */}
            <Input
                id="precoUnitario"
                tipo="text"
                textoLabel="Preco Unitário:"
                valor={precoUnitario}
                setValor={setPrecoUnitario} />
            <Input
                id="precoUnitarioVenda"
                tipo="text"
                textoLabel="Preco Unitário da Venda:"
                valor={precoUnitarioVenda}
                setValor={setPrecoUnitarioVenda} />
            <div className="flex items-center justify-center
            gap-2">
                <Input
                    id="desconto"
                    tipo="text"
                    textoLabel="Desconto:"
                    valor={desconto}
                    setValor={setDesconto}
                />
                <button className="bg-green-500 self-end py-1 px-2 uppercase font-bold text-white" onClick={(e) => calcularDesconto(e)}>Aplicar!</button>
            </div>

            <Input
                id="valorDaVenda"
                tipo="text"
                textoLabel="Valor da Venda:"
                valor={valorDaVenda}
                setValor={setValorDaVenda} />
            <Input
                id="data"
                tipo="date"
                textoLabel="Data da Venda:"
                valor={data}
                setValor={setData} />

            {/* Implementar um cadastro de clientes depois para utilizar um select aqui */}
            <button className="flex justify-center items-center text-center w-full bg-[--cor-2] uppercase font-bold text-xl py-1 text-white" style={{ textShadow: '1px 1px 2px black' }} type="submit">Salvar</button>
        </form>
    )
}