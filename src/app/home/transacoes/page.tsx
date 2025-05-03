'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { useDespesas } from "@/data/hook/useDespesas";
import { useProdutos } from "@/data/hook/useProdutos";
import { useDadosUsuario } from "@/data/hook/useUsuario";
import { useVendas } from "@/data/hook/useVendas";
import Despesa from "@/interfaces/Despesa";
import UsuarioFirestore from "@/interfaces/UsuarioFirestore";
import Venda from "@/interfaces/Venda";
import { useEffect, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

export default function Page() {
    const { usuario } = useAuth()
    const { produtos } = useProdutos(usuario || undefined)
    const { vendas } = useVendas(usuario || undefined)
    const { despesas } = useDespesas(usuario || undefined)
    const dadosUsuario = useDadosUsuario(usuario || null)

    console.log(produtos)

    const [vendasOrdenadas, setVendasOrdenadas] = useState<Venda[]>([]);
    const [despesasOrdenadas, setDespesasOrdenadas] = useState<Despesa[]>([]);

    useEffect(() => {
        if (vendas) setVendasOrdenadas([...vendas]);
    }, [vendas]);

    useEffect(() => {
        if (despesas) setDespesasOrdenadas([...despesas]);
    }, [despesas]);

    function ordenarVendasPorData(crescente: boolean) {
        const ordenado = [...vendasOrdenadas].sort((a, b) => {
            return crescente
                ? new Date(a.data).getTime() - new Date(b.data).getTime()
                : new Date(b.data).getTime() - new Date(a.data).getTime();
        });
        setVendasOrdenadas(ordenado);
    }

    function ordenarDespesasPorData(crescente: boolean) {
        const ordenado = [...despesasOrdenadas].sort((a, b) => {
            return crescente
                ? new Date(a.data).getTime() - new Date(b.data).getTime()
                : new Date(b.data).getTime() - new Date(a.data).getTime();
        });
        setDespesasOrdenadas(ordenado);
    }
    function ordernarVendasPorValorFinal(crescente: boolean) {
        const ordenado = [...vendasOrdenadas].sort((a, b) => {
            return crescente
                ? a.valorFinalDaVenda - b.valorFinalDaVenda
                : b.valorFinalDaVenda - a.valorFinalDaVenda
        });
        setVendasOrdenadas(ordenado);
    }
    function ordernarVendasPorQuantidade(crescente: boolean) {
        const ordenado = [...vendasOrdenadas].sort((a, b) => {
            return crescente
                ? a.quantidadeVendida - b.quantidadeVendida
                : b.quantidadeVendida - a.quantidadeVendida
        });
        setVendasOrdenadas(ordenado);
    }
    function ordernarDespesasPorValor(crescente: boolean) {
        const ordenado = [...despesasOrdenadas].sort((a, b) => {
            return crescente
                ? a.valorDaDespesa - b.valorDaDespesa
                : b.valorDaDespesa - a.valorDaDespesa
        });
        console.log('aqui')
        setDespesasOrdenadas(ordenado);
    }

    function identificarTipoDeLojaCadastrarProduto(usuario: UsuarioFirestore | null) {
        if (!usuario) {
            return <h2>Carregando informações do usuário...</h2>
        }
        switch (usuario.tipoDeLoja) {
            case 'loja-de-roupas':
                return (
                    <>
                        <div className="flex flex-col gap-2 overflow-auto pb-2">
                            <h2 className="text-xl font-bold">Lista de Produtos Disponiveis</h2>
                            <table className="bg-[--cor-6]">
                                <thead>
                                    <tr>
                                        <th className="border border-collapse border-white text-center p-1">Nome</th>
                                        <th className="border border-collapse border-white text-center p-1">Categoria</th>
                                        <th className="border border-collapse border-white text-center p-1">Preco Unitário</th>
                                        <th className="border border-collapse border-white text-center p-1">Preco Unitário Venda</th>
                                        <th className="border border-collapse border-white text-center p-1">Quantidade Restante</th>
                                        <th className="border border-collapse border-white text-center p-1">Tamanho</th>
                                        <th className="border border-collapse border-white text-center p-1">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        produtos?.map((venda, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.nome}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.categoria}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{`R$${venda.precoUnitario.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{`R$${venda.precoUnitarioVenda.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.quantidade}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.tamanho}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.data.toLocaleDateString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col gap-2 overflow-auto pb-2">
                            <h2 className="text-xl font-bold">Lista de Vendas</h2>
                            <table className="bg-[--cor-6]">
                                <thead>
                                    <tr>
                                        <th className="border border-white text-center p-1">Nome</th>
                                        <th className="border border-white text-center p-1">Preço Unitário</th>
                                        <th className="border border-white text-center p-1">Preço Unitário Venda</th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Quantidade Vendida</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarVendasPorQuantidade(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarVendasPorQuantidade(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border border-white text-center p-1">Tamanho</th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Valor Final da Venda</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarVendasPorValorFinal(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarVendasPorValorFinal(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Data</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordenarVendasPorData(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordenarVendasPorData(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vendasOrdenadas?.map((venda, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.nome}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${venda.precoUnitario.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${venda.precoUnitarioVenda.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.quantidadeVendida}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.tamanho}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${venda.valorFinalDaVenda.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.data.toLocaleDateString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col gap-2 overflow-auto pb-2">
                            <h2 className="text-xl font-bold">Lista de Despesas</h2>
                            <table className="bg-[--cor-6]">
                                <thead>
                                    <tr>
                                        <th className="border border-collapse border-white text-center p-1">Nome</th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Valor a Pagar</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarDespesasPorValor(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarDespesasPorValor(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border border-collapse border-white text-center p-1">Forma de pagamento</th>
                                        <th className="border border-collapse border-white text-center p-1">Funcionario que pagou</th>
                                        <th className="border border-collapse border-white p-1 text-center flex justify-around">
                                            <p>Data de Pagamento:</p>
                                            <div className="flex gap-1">
                                                <button onClick={() => ordenarDespesasPorData(true)}><FaArrowCircleUp /></button>
                                                <button onClick={() => ordenarDespesasPorData(false)}><FaArrowCircleDown /></button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        despesasOrdenadas?.map((despesa, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.nome}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${despesa.valorDaDespesa}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.formaDePagamento}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.funcionarioQuePagou}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.data.toLocaleDateString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            case 'eletronicos':
                return (
                    <>
                        <div className="flex flex-col gap-2 overflow-auto pb-2">
                            <h2 className="text-xl font-bold">Lista de Produtos Disponiveis</h2>
                            <table className="bg-[--cor-6]">
                                <thead>
                                    <tr>
                                        <th className="border border-collapse border-white text-center p-1">Nome</th>
                                        <th className="border border-collapse border-white text-center p-1">Marca</th>
                                        <th className="border border-collapse border-white text-center p-1">Modelo</th>
                                        <th className="border border-collapse border-white text-center p-1">Categoria</th>
                                        <th className="border border-collapse border-white text-center p-1">Preco Unitário</th>
                                        <th className="border border-collapse border-white text-center p-1">Preco Unitário Venda</th>
                                        <th className="border border-collapse border-white text-center p-1">Quantidade Restante</th>
                                        <th className="border border-collapse border-white text-center p-1">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        produtos?.map((venda, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.nome}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.marca}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.modelo}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.categoria}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{`R$${venda.precoUnitario.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{`R$${venda.precoUnitarioVenda.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.quantidade}</td>
                                                    <td className="border border-white border-collapse p-1 text-center">{venda.data.toLocaleDateString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col gap-2 overflow-auto pb-2">
                            <h2 className="text-xl font-bold">Lista de Vendas</h2>
                            <table className="bg-[--cor-6]">
                                <thead>
                                    <tr>
                                        <th className="border border-white text-center p-1">Nome</th>
                                        <th className="border border-white text-center p-1">Preço Unitário</th>
                                        <th className="border border-white text-center p-1">Preço Unitário Venda</th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Quantidade Vendida</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarVendasPorQuantidade(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarVendasPorQuantidade(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Valor Final da Venda</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarVendasPorValorFinal(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarVendasPorValorFinal(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Data</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordenarVendasPorData(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordenarVendasPorData(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vendasOrdenadas?.map((venda, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.nome}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${venda.precoUnitario.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${venda.precoUnitarioVenda.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.quantidadeVendida}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${venda.valorFinalDaVenda.toFixed(2)}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{venda.data.toLocaleDateString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col gap-2 overflow-auto pb-2">
                            <h2 className="text-xl font-bold">Lista de Despesas</h2>
                            <table className="bg-[--cor-6]">
                                <thead>
                                    <tr>
                                        <th className="border border-collapse border-white text-center p-1">Nome</th>
                                        <th className="border border-white p-1">
                                            <div className="flex justify-around items-center">
                                                <p>Valor a Pagar</p>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarDespesasPorValor(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarDespesasPorValor(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border border-collapse border-white text-center p-1">Forma de pagamento</th>
                                        <th className="border border-collapse border-white text-center p-1">Funcionario que pagou</th>
                                        <th className="border border-collapse border-white p-1 text-center flex justify-around">
                                            <p>Data de Pagamento:</p>
                                            <div className="flex gap-1">
                                                <button onClick={() => ordenarDespesasPorData(true)}><FaArrowCircleUp /></button>
                                                <button onClick={() => ordenarDespesasPorData(false)}><FaArrowCircleDown /></button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        despesasOrdenadas?.map((despesa, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.nome}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{`R$${despesa.valorDaDespesa}`}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.formaDePagamento}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.funcionarioQuePagou}</td>
                                                    <td className="border border-white border-collapse p-1 text-start">{despesa.data.toLocaleDateString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>

                )
            default:
                break;
        }
    }

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="flex flex-col gap-4 p-4 lg:min-h-[80vh]">
                    {dadosUsuario && identificarTipoDeLojaCadastrarProduto(dadosUsuario)}
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}