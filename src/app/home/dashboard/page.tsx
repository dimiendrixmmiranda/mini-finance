"use client";

import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import GraficoDeBarra from "@/components/graficos/GraficoDeBarra";
import GraficoPizza from "@/components/graficos/GraficoPizza";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import Despesa from "@/interfaces/Despesa";
import Produto from "@/interfaces/Produto";
import Venda from "@/interfaces/Venda";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,

const tamanhosMaisVendidos = [
    { tamanho: 'M', quantidade: 18 },
    { tamanho: 'G', quantidade: 10 },
    { tamanho: 'GG', quantidade: 2 },
]

export default function Dashboard() {
    const { usuario } = useAuth()
    const [produtosDisponiveis, setProdutosDisponiveis] = useState<Produto[]>([]);
    const [vendas, setVendas] = useState<Venda[] | null>(null);
    const [, setDespesas] = useState<Despesa[] | null>(null);
    // Graficos
    const [produtoEQuantidade, setProdutoEQuantidade] = useState<{ produto: string, quantidade: number }[]>([]);
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState<{ produto: string, quantidade: number }[]>([]);
    const [depesasDoMes, setDepesasDoMes] = useState<{ despesa: string, quantidade: number }[]>([]);
    const [vendasUltimos7Dias, setVendasUltimos7Dias] = useState<{ dia: string, vendas: number }[]>([]);
    const [vendasUltimos6Meses, setVendasUltimos6Meses] = useState<{ mes: string, vendas: number }[]>([]);

    async function buscarProdutos() {
        if (!usuario?.uid) return;
        const produtosRef = collection(db, "usuarios", usuario.uid, "produtos");
        const snapshot = await getDocs(produtosRef);

        const lista: Produto[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                nome: data.nome,
                categoria: data.categoria,
                quantidade: data.quantidade,
                precoUnitario: data.precoUnitario,
                precoDeVenda: data.precoDeVenda,
                tamanho: data.tamanho,
                data: data.data?.toDate ? data.data.toDate() : new Date() // firebase.Timestamp para Date
            };
        });

        const mapeado = lista.map(prod => ({
            produto: prod.nome,
            quantidade: prod.quantidade ?? 0
        }));
        setProdutoEQuantidade(mapeado);
        setProdutosDisponiveis(lista);
    }

    async function buscarVendas() {
        if (!usuario?.uid) return;
        const vendasRef = collection(db, "usuarios", usuario.uid, "vendas");
        const snapshot = await getDocs(vendasRef);

        const lista: Venda[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                data: data.data?.toDate ? data.data.toDate() : new Date(),
                desconto: data.desconto ?? 0,
                precoUnitario: data.precoUnitario ?? 0,
                produtoVendido: data.produtoVendido ?? '',
                quantidadeVendida: data.quantidadeVendida ?? 0,
                valorDaVenda: data.valorDaVenda ?? 0,
            };
        });
        setVendas(lista)
    }
    async function buscarDespesas() {
        if (!usuario?.uid) return;
        const hoje = new Date();
        const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        const despesasRef = collection(db, "usuarios", usuario.uid, "despesas");
        const snapshot = await getDocs(despesasRef);

        const lista: Despesa[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                data: data.data?.toDate ? data.data.toDate() : new Date(),
                formaDePagamento: data.formaDePagamento,
                funcionarioPagou: data.funcionarioPagou,
                nome: data.nome,
                tipo: data.tipo,
                valor: data.valor,
            };
        });

        const filtrarDespesas = lista
            .filter(despesa => {
                const dataDespesa = despesa.data;
                return dataDespesa >= primeiroDiaDoMes && dataDespesa <= ultimoDiaDoMes;
            })
            .map(despesa => ({
                despesa: despesa.nome,
                quantidade: despesa.valor,
            }));
            console.log(filtrarDespesas)
        setDepesasDoMes(filtrarDespesas)
        setDespesas(lista)
    }

    useEffect(() => {
        buscarProdutos()
        buscarVendas()
        buscarDespesas()
    }, [usuario]);

    useEffect(() => {
        if (!vendas || produtosDisponiveis.length === 0) return;

        const contagem: Record<string, number> = {};

        vendas.forEach(venda => {
            const produto = produtosDisponiveis.find(p => p.id === venda.produtoVendido);
            const nome = produto?.nome ?? venda.produtoVendido;
            contagem[nome] = (contagem[nome] || 0) + venda.quantidadeVendida;
        });

        const lista = Object.entries(contagem)
            .map(([produto, quantidade]) => ({ produto, quantidade }))
            .sort((a, b) => b.quantidade - a.quantidade);

        setProdutosMaisVendidos(lista);
    }, [vendas, produtosDisponiveis]);

    // Vendas dos ultimos dias
    useEffect(() => {
        if (!vendas) return

        const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        const hoje = new Date()
        const ultimos7Dias: { [key: string]: number } = {}

        // Inicializa os últimos 7 dias com zero
        for (let i = 6; i >= 0; i--) {
            const data = new Date()
            data.setDate(hoje.getDate() - i)
            const chave = data.toDateString()
            ultimos7Dias[chave] = 0
        }

        vendas.forEach(venda => {
            const dataVenda = venda.data
            const chave = dataVenda.toDateString()
            if (chave in ultimos7Dias) {
                ultimos7Dias[chave] += venda.quantidadeVendida;
            }
        });

        const lista = Object.keys(ultimos7Dias).map(dataStr => {
            const data = new Date(dataStr);
            const nomeDia = diasDaSemana[data.getDay()];
            return {
                dia: nomeDia,
                vendas: ultimos7Dias[dataStr]
            };
        });

        setVendasUltimos7Dias(lista);
    }, [vendas]);

    useEffect(() => {
        if (!vendas) return;

        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const hoje = new Date();
        const ultimos6Meses: { [key: string]: number } = {};

        // Construindo os últimos 6 meses (incluindo o mês atual)
        for (let i = 5; i >= 0; i--) {
            const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            const chave = `${data.getFullYear()}-${String(data.getMonth()).padStart(2, "0")}`; // exemplo: "2024-03"
            ultimos6Meses[chave] = 0;
        }

        // Contabilizando as vendas por mês
        vendas.forEach(venda => {
            const dataVenda = venda.data;
            const chave = `${dataVenda.getFullYear()}-${String(dataVenda.getMonth()).padStart(2, "0")}`;
            if (chave in ultimos6Meses) {
                ultimos6Meses[chave] += venda.quantidadeVendida;
            }
        });

        // Convertendo para a lista final
        const lista = Object.keys(ultimos6Meses).map(chave => {
            const [ano, mesIndex] = chave.split("-").map(Number);
            return {
                mes: `${meses[mesIndex]}/${ano.toString().slice(-2)}`,
                vendas: ultimos6Meses[chave]
            };
        });

        setVendasUltimos6Meses(lista);
    }, [vendas]);

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="p-4 flex flex-col gap-4 xl:p-6">
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <GraficoPizza
                            array={produtoEQuantidade}
                            chaveNome="produto"
                            chaveValor="quantidade"
                            titulo="Produtos Disponíveis"
                        />
                        <GraficoPizza
                            array={produtosMaisVendidos}
                            chaveNome="produto"
                            chaveValor="quantidade"
                            titulo="Produtos Mais Vendidos"
                        />
                        <GraficoPizza
                            array={tamanhosMaisVendidos}
                            chaveNome="tamanho"
                            chaveValor="quantidade"
                            titulo="Tamanhos Mais Vendidos"
                        />
                        <GraficoPizza
                            array={depesasDoMes}
                            chaveNome="despesa"
                            chaveValor="quantidade"
                            titulo="Despesas do Mês"
                        />
                    </div>
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
                        <GraficoDeBarra
                            array={vendasUltimos7Dias}
                            chaveNome="dia"
                            chaveValor="vendas"
                            titulo="Vendas dos últimos 7 dias"
                        />
                        <GraficoDeBarra
                            array={vendasUltimos6Meses}
                            chaveNome="mes"
                            chaveValor="vendas"
                            titulo="Vendas dos últimos 6 meses"
                        />
                    </div>

                    {/* Gráfico de Lucro */}
                    {/* <div className="bg-white rounded-xl shadow p-4">
                        <h2 className="text-xl font-bold mb-4">Lucro Mensal</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={lucroMensal}>
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="lucro" stroke="#10B981" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div> */}
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}