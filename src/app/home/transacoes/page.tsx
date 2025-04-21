'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { useDespesas } from "@/data/hook/useDespesas";
import { useProdutos } from "@/data/hook/useProdutos";
import { useVendas } from "@/data/hook/useVendas";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

export default function Transacoes() {
    const { usuario } = useAuth()
    const { produtos } = useProdutos(usuario ?? undefined);
    const { vendas } = useVendas(usuario ?? undefined);
    const { despesas } = useDespesas(usuario ?? undefined);
    
    function acharNomeProduto(id: string) {
        const produto = produtos.find(p => p.id === id)
        const nome = produto && produto.nome
        return nome
    }
    
    return (
        <ForcarAutenticacao>
            <Template>
                <div className="flex flex-col min-h-[80vh] p-4">
                    <div className="overflow-auto max-h-[400px] py-2 flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">Lista de Vendas</h2>
                        <table>
                            <thead>
                                <tr className="bg-[--cor-4]">
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2 flex items-center justify-around gap-2">
                                        <p>Data:</p>
                                        <div className="flex gap-1">
                                            <button><FaArrowCircleUp /></button>
                                            <button><FaArrowCircleDown /></button>
                                        </div>
                                    </td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Produto Vendido:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2 flex items-center justify-around gap-2">
                                        <p>Quantidade Vendida:</p>
                                        <div className="flex gap-1">
                                            <button><FaArrowCircleUp /></button>
                                            <button><FaArrowCircleDown /></button>
                                        </div>
                                    </td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Preço Unitário:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Preço Unitário Venda:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Desconto:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2 flex items-center justify-around gap-2">
                                        <p>Valor Final da Venda:</p>
                                        <div className="flex gap-1">
                                            <button><FaArrowCircleUp /></button>
                                            <button><FaArrowCircleDown /></button>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vendas?.map((venda, i) => {
                                        console.log(venda)
                                        return (
                                            <tr key={i}>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{venda.data.toLocaleDateString()}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{acharNomeProduto(venda.produtoVendido)}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{venda.quantidadeVendida}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{`R$${Number(venda.precoUnitario).toFixed(2)}`}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{`R$${Number(venda.precoUnitarioVenda).toFixed(2)}`}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{venda.desconto}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{`R$${Number(venda.valorDaVenda).toFixed(2)}`}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-auto max-h-[400px] py-2 flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">Lista de Despesas</h2>
                        <table>
                            <thead>
                                <tr className="bg-[--cor-4]">
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2 flex items-center justify-around gap-2">
                                        <p>Data:</p>
                                        <div className="flex gap-1">
                                            <button><FaArrowCircleUp /></button>
                                            <button><FaArrowCircleDown /></button>
                                        </div>
                                    </td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Nome da Despesa:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Tipo:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2 flex items-center justify-around gap-2">
                                        <p>Valor:</p>
                                        <div className="flex gap-1">
                                            <button><FaArrowCircleUp /></button>
                                            <button><FaArrowCircleDown /></button>
                                        </div>
                                    </td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Forma de pagamento:</td>
                                    <td className="border-2 border-black border-collapse whitespace-nowrap py-1 px-2">Funcionario que pagou:</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    despesas?.map((despesa, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{despesa.data.toLocaleDateString()}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{despesa.nome}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{despesa.tipo}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{`R$${despesa.valor.toFixed(2)}`}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{despesa.formaDePagamento}</td>
                                                <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{despesa.funcionarioPagou}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}