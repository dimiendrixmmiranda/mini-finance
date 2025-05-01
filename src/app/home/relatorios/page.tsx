'use client'

import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { useDespesas } from "@/data/hook/useDespesas";
import { useDadosUsuario } from "@/data/hook/useUsuario";
import { useVendas } from "@/data/hook/useVendas";
import UsuarioFirestore from "@/interfaces/UsuarioFirestore";
import Venda from "@/interfaces/Venda";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

interface Registro {
    data: Date
    nome: string
    valor: number
    tipo: string
}

export default function Relatorios() {
    const { usuario } = useAuth()
    const { vendas } = useVendas(usuario ?? undefined)
    const { despesas } = useDespesas(usuario ?? undefined)
    // const { produtos } = useProdutos(usuario ?? undefined);
    const dadosUsuario = useDadosUsuario(usuario || null)
    const [registros, setRegistros] = useState<Registro[]>([])
    const [top3Vendas, setTop3Vendas] = useState<string[]>([])
    const [registrosOrdenados, setRegistrosOrdenados] = useState<Registro[]>([])
    
    function getTop3MaisVendidos(vendas: Venda[]) {
        const contagem: Record<string, number> = {};

        vendas.forEach(({ nome }) => {
            contagem[nome] = (contagem[nome] || 0) + 1;
        });

        const ordenado = Object.entries(contagem)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return ordenado.map(([nome]) => nome);
    }

    useEffect(() => {
        if (vendas || despesas) {
            const registrosGerados: Registro[] = [
                ...(vendas?.map(venda => ({
                    data: venda.data,
                    nome: venda.nome,
                    valor: venda.valorFinalDaVenda,
                    tipo: 'venda'
                })) ?? []),
                ...(despesas?.map(despesa => ({
                    data: despesa.data,
                    nome: despesa.nome,
                    valor: despesa.valorDaDespesa,
                    tipo: 'despesa'
                })) ?? [])
            ]
            setRegistros(registrosGerados)
        }

        if (vendas) {
            setTop3Vendas(getTop3MaisVendidos(vendas))
        }

    }, [vendas, despesas])

    useEffect(() => {
        if (despesas) setRegistrosOrdenados([...registros]);
    }, [registros]);

    function ordernarRegistrosPorData(crescente: boolean) {
        const ordenado = [...registros].sort((a, b) => {
            return crescente
                ? new Date(a.data).getTime() - new Date(b.data).getTime()
                : new Date(b.data).getTime() - new Date(a.data).getTime();
        });
        setRegistrosOrdenados(ordenado);
        console.log('aqui')
    }

    function ordernarRegistrosPorValor(crescente: boolean) {
        const ordenado = [...registros].sort((a, b) => {
            return crescente
                ? a.valor - b.valor
                : b.valor - a.valor
        });
        setRegistrosOrdenados(ordenado);
    }
    
    function ordenarRegistrosPorTipo(crescente: boolean) {
        const ordenado = [...registros].sort((a, b) => {
          if (a.tipo === b.tipo) return 0;
          return crescente
            ? a.tipo.localeCompare(b.tipo)
            : b.tipo.localeCompare(a.tipo);
        });
      
        setRegistrosOrdenados(ordenado);
      }

    function identificarTipoDeLojaCadastrarProduto(usuario: UsuarioFirestore | null) {
        if (!usuario) {
            return <h2>Carregando informações do usuário...</h2>
        }
        switch (usuario.tipoDeLoja) {
            case 'loja-de-roupas':
                return (
                    <>
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            <div className="flex flex-col gap-2 items-center sm:grid sm:grid-cols-2 xl:grid-cols-4">
                                <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 w-[160px] h-[160px] mx-auto">
                                    <h2 className="uppercase text-center font-bold text-xl">Total de Vendas</h2>
                                    <p className="uppercase font-black text-3xl text-center">{vendas?.length}</p>
                                </div>
                                <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 w-[160px] h-[160px] mx-auto">
                                    <h2 className="uppercase text-center font-bold text-xl">Total de Despesas</h2>
                                    <p className="uppercase font-black text-3xl text-center">{despesas?.length}</p>
                                </div>
                                <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 w-[160px] h-[160px] mx-auto">
                                    <h2 className="uppercase text-center font-bold text-xl">Lucro Líquido</h2>
                                    <p className="uppercase font-black text-3xl text-center">5</p>
                                </div>
                                <div className="bg-white text-black rounded-lg p-2 flex flex-col justify-between gap-2 w-[160px] h-[160px] mx-auto">
                                    <h2 className="uppercase text-center font-bold text-xl">Produtos Vendidos</h2>
                                    <p className="uppercase font-black text-3xl text-center">5</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="uppercase font-bold text-xl text-center">Top 3 Produtos mais vendidos</h2>
                                <div className="w-fit flex flex-col mx-auto">
                                    <div className="relative flex items-end h-[260px] w-fit">
                                        <div className="w-10 h-10 rounded-full bg-red-500 absolute left-14 top-[6.5em]">
                                            <div className="relative">
                                                <p className="absolute -top-10 left-[50%] text-center leading-4 line-clamp-2" style={{ transform: 'translate(-50%)' }}>{top3Vendas[1] ?? 'Não Disponível'}</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-green-500 absolute right-32 top-[3.2em]">
                                            <div className="relative">
                                                <p className="absolute -top-10 left-[50%] text-center leading-4 line-clamp-2" style={{ transform: 'translate(-50%)' }}>{top3Vendas[0] ?? 'Não Disponível'}</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-yellow-500 absolute right-14 top-[4.8em]">
                                            <div className="relative">
                                                <p className="absolute -top-10 left-[50%] text-center leading-4 line-clamp-2 z-20" style={{ transform: 'translate(-50%)' }}>{top3Vendas[2] ?? 'Não Disponível'}</p>
                                            </div>
                                        </div>
                                        <Image alt="ranking" src={'/ranking.png'} width={300} height={50}></Image>
                                    </div>
                                </div>
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
                                                    <button onClick={() => ordernarRegistrosPorData(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarRegistrosPorData(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border-2 border-black py-1 px-2 whitespace-nowrap">Nome:</th>
                                        <th className="border-2 border-black py-1 px-2 whitespace-nowrap">
                                            <div className="flex items-center justify-between gap-2">
                                                <span>Valor</span>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordernarRegistrosPorValor(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordernarRegistrosPorValor(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="border-2 border-black py-1 px-2 whitespace-nowrap">
                                            <div className="flex items-center justify-between gap-2">
                                                <span>Tipo:</span>
                                                <div className="flex gap-1">
                                                    <button onClick={() => ordenarRegistrosPorTipo(true)}><FaArrowCircleUp /></button>
                                                    <button onClick={() => ordenarRegistrosPorTipo(false)}><FaArrowCircleDown /></button>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrosOrdenados.map((registro, i) => (
                                        <tr key={i}>
                                            <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${registro.tipo === 'venda' ? 'bg-green-600' : 'bg-red-600'}`}>{registro.data.toLocaleDateString()}</td>
                                            <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${registro.tipo === 'venda' ? 'bg-green-600' : 'bg-red-600'}`}>{registro.nome}</td>
                                            <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 ${registro.tipo === 'venda' ? 'bg-green-600' : 'bg-red-600'}`}>{"R$" + registro.valor}</td>
                                            <td className={`border-2 border-black border-collapse whitespace-nowrap py-1 px-2 uppercase ${registro.tipo === 'venda' ? 'bg-green-600' : 'bg-red-600'}`}>{registro.tipo}</td>
                                        </tr>
                                    ))}
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
                <div className="p-4 flex flex-col gap-4 xl:p-6">
                    {dadosUsuario && identificarTipoDeLojaCadastrarProduto(dadosUsuario)}
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}