"use client";

import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import GraficoDeBarra from "@/components/graficos/GraficoDeBarra";
import GraficoPizza from "@/components/graficos/GraficoPizza";
import Template from "@/components/template/Template";
// BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,

const vendasUltimos7dias = [
    { dia: "Terça", vendas: 8 },
    { dia: "Quarta", vendas: 10 },
    { dia: "Quinta", vendas: 6 },
    { dia: "Sexta", vendas: 12 },
    { dia: "Sábado", vendas: 10 },
    { dia: "Domingo", vendas: 1 },
    { dia: "Segunda", vendas: 2 },
];
const vendasUltimos6meses = [
    { mes: "Março", vendas: 102 },
    { mes: "Abril", vendas: 203 },
    { mes: "Maio", vendas: 156 },
    { mes: "Junho", vendas: 125 },
    { mes: "Julho", vendas: 152 },
    { mes: "Agosto", vendas: 98 },
    { mes: "Setembro", vendas: 105 },
];

// const despesasPorCategoria = [
//     { categoria: "Estoque", valor: 2500 },
//     { categoria: "Marketing", valor: 1500 },
//     { categoria: "Frete", valor: 1000 },
// ];

const produtosEQuantidade = [
    { produto: 'Camisa Corinthians', quantidade: 22 },
    { produto: 'Camisa Barcelona', quantidade: 16 },
    { produto: 'Camisa Borussia Dortmund', quantidade: 8 },
    { produto: 'Camisa Red Bull', quantidade: 8 },
    { produto: 'Camisa Chelsea', quantidade: 8 },
]
const produtosMaisVendidos = [
    { produto: 'Camisa Corinthians', quantidade: 8 },
    { produto: 'Camisa Barcelona', quantidade: 12 },
    { produto: 'Camisa Borussia Dortmund', quantidade: 6 },
]
const tamanhosMaisVendidos = [
    { tamanho: 'M', quantidade: 18 },
    { tamanho: 'G', quantidade: 10 },
    { tamanho: 'GG', quantidade: 2 },
]
// Gráfico de pizza de lucro preco unitario e preco vendido

export default function Dashboard() {
    return (
        <ForcarAutenticacao>
            <Template>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <GraficoPizza
                            array={produtosEQuantidade}
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
                    </div>
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
                        <GraficoDeBarra
                            array={vendasUltimos7dias}
                            chaveNome="dia"
                            chaveValor="vendas"
                            titulo="Vendas dos últimos 7 dias"
                        />
                        <GraficoDeBarra
                            array={vendasUltimos6meses}
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