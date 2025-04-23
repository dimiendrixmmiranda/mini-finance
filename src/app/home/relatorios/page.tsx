'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { useDespesas } from "@/data/hook/useDespesas";
import { useProdutos } from "@/data/hook/useProdutos";
import { useVendas } from "@/data/hook/useVendas";
import acharProdutoPorId from "@/data/utils/acharProdutoPorId";
import { useEffect, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

interface Registro {
    data: string
    nome: string | undefined
    valor: number
    tipo: string
}

export default function Relatorios() {
    const { usuario } = useAuth()
    const { vendas } = useVendas(usuario ?? undefined)
    const { despesas } = useDespesas(usuario ?? undefined)
    const { produtos } = useProdutos(usuario ?? undefined);

    const [registros, setRegistros] = useState<Registro[]>([])

    useEffect(() => {
        if (vendas || despesas) {
            const registrosGerados: Registro[] = [
                ...(vendas?.map(venda => ({
                    data: venda.data.toLocaleDateString(),
                    nome: acharProdutoPorId(venda.produtoVendido, produtos),
                    valor: venda.valorDaVenda,
                    tipo: 'venda'
                })) ?? []),
                ...(despesas?.map(despesa => ({
                    data: despesa.data.toLocaleDateString(),
                    nome: despesa.nome,
                    valor: despesa.valor,
                    tipo: 'despesa'
                })) ?? [])
            ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()) // opcional: ordenar por data

            setRegistros(registrosGerados)
        }
    }, [vendas, despesas])

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="p-4 flex flex-col gap-4 xl:p-6">
                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Total de Vendas</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Total de Despesas</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Lucro Líquido</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Produtos Vendidos</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                    </div>
                    {/* registros */}
                    <div className="overflow-auto max-h-[400px] py-2 flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">Lista de Registros</h2>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-[--cor-4]">
                                    <th className="border-2 border-black py-1 px-2 whitespace-nowrap">
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Data:</span>
                                            <div className="flex gap-1">
                                                <button><FaArrowCircleUp /></button>
                                                <button><FaArrowCircleDown /></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="border-2 border-black py-1 px-2 whitespace-nowrap">Nome:</th>
                                    <th className="border-2 border-black py-1 px-2 whitespace-nowrap">
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Valor</span>
                                            <div className="flex gap-1">
                                                <button><FaArrowCircleUp /></button>
                                                <button><FaArrowCircleDown /></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="border-2 border-black py-1 px-2 whitespace-nowrap">
                                        <div className="flex items-center justify-between gap-2">
                                            <span>Tipo:</span>
                                            <div className="flex gap-1">
                                                <button><FaArrowCircleUp /></button>
                                                <button><FaArrowCircleDown /></button>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map((registro, i) => (
                                    <tr key={i}>
                                        <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{registro.data}</td>
                                        <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{registro.nome}</td>
                                        <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{"R$"+registro.valor.toFixed(2)}</td>
                                        <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 uppercase ${i % 2 == 0 ? 'bg-[--cor-2]' : 'bg-[--cor-5]'}`}>{registro.tipo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        Ranking dos produtos mais vendidos
                    </div>
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}