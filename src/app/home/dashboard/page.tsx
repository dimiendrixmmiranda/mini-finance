"use client";

import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import GraficoDeBarra from "@/components/graficos/GraficoDeBarra";
import GraficoDeLinha from "@/components/graficos/GraficoDeLinha";
import GraficoPizza from "@/components/graficos/GraficoPizza";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { useDespesas } from "@/data/hook/useDespesas";
import { useProdutos } from "@/data/hook/useProdutos";
import { useVendas } from "@/data/hook/useVendas";
import transformarDinheiroEmNumber from "@/data/utils/transformarDinheiroEmNumber";
import { useEffect, useState } from "react";

export default function Page() {
    const { usuario } = useAuth()
    const { produtos } = useProdutos(usuario || undefined)
    const { vendas } = useVendas(usuario || undefined)
    const { despesas } = useDespesas(usuario || undefined)

    // Graficos
    const [produtoEQuantidade, setProdutoEQuantidade] = useState<{ produto: string, quantidade: number }[]>([]);
    const [produtosMaisVendidos, setProdutosMaisVendidos] = useState<{ produto: string, quantidade: number }[]>([]);
    const [tamanhosMaisVendidos, setTamanhosMaisVendidos] = useState<{ tamanho: string, quantidade: number }[]>([])
    const [despesasDoMes, setDespesasDoMes] = useState<{ despesa: string, valor: number }[]>([]);

    const [vendasUltimos7Dias, setVendasUltimos7Dias] = useState<{ dia: string, ["Produtos Vendidos"]: number }[]>([])
    const [vendasUltimos6Meses, setVendasUltimos6Meses] = useState<{ mes: string, ["Produtos Vendidos"]: number }[]>([])
    
    const [lucroUltimos7Dias, setLucroUltimos7Dias] = useState<{ dia: string, lucro: number }[]>([])
    const [lucroMensal, setLucroMensal] = useState<{ mes: string, lucro: number }[]>([])

    console.log(lucroUltimos7Dias)
    console.log(lucroMensal)

    useEffect(() => {
        if (!produtos) return;

        const resultado = produtos.map(produto => ({
            produto: produto.nome,
            quantidade: produto.quantidade,
        }));

        setProdutoEQuantidade(resultado);
    }, [produtos]);

    useEffect(() => {
        if (!despesas) return;

        const resultado = despesas.map(despesa => ({
            despesa: despesa.nome,
            valor: transformarDinheiroEmNumber(despesa.valorDaDespesa.toString())
        }));
        setDespesasDoMes(resultado);
    }, [produtos]);

    useEffect(() => {
        if (!vendas) return;

        const quantidadePorProduto: Record<string, number> = {};
        const quantidadePorTamanho: Record<string, number> = {};

        vendas.forEach(venda => {
            const nomeProduto = venda.nome;
            const tamanhoProduto = venda.tamanho;
            quantidadePorProduto[nomeProduto] = (quantidadePorProduto[nomeProduto] || 0) + venda.quantidadeVendida;
            quantidadePorTamanho[tamanhoProduto] = (quantidadePorTamanho[tamanhoProduto] || 0) + venda.quantidadeVendida;
        });

        const resultado = Object.entries(quantidadePorProduto).map(([produto, quantidade]) => ({
            produto,
            quantidade,
        }));
        setProdutosMaisVendidos(resultado);

        const resultadoTamanhos = Object.entries(quantidadePorTamanho).map(([tamanho, quantidade]) => ({
            tamanho,
            quantidade,
        }));
        setTamanhosMaisVendidos(resultadoTamanhos);
    }, [vendas]);

    useEffect(() => {
        if (!vendas || !produtos) return;
    
        const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const hoje = new Date();
    
        const ultimos7Dias: { [key: string]: number } = {};
        const ultimos6Meses: { [key: string]: number } = {};
        const lucro7Dias: { [key: string]: number } = {};
        const lucroMeses: { [key: string]: number } = {};
    
        // Inicializa os últimos 7 dias e meses
        for (let i = 6; i >= 0; i--) {
            const data = new Date();
            data.setDate(hoje.getDate() - i);
            const chave = data.toDateString();
            ultimos7Dias[chave] = 0;
            lucro7Dias[chave] = 0;
        }
    
        for (let i = 5; i >= 0; i--) {
            const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            const chave = `${data.getFullYear()}-${String(data.getMonth()).padStart(2, "0")}`;
            ultimos6Meses[chave] = 0;
            lucroMeses[chave] = 0;
        }
    
        vendas.forEach(venda => {
            const dataVenda = venda.data;
            const produtoRelacionado = produtos.find(p => p.nome === venda.nome);
            if (!produtoRelacionado) return;
    
            const precoVenda = transformarDinheiroEmNumber(venda.precoUnitarioVenda.toString());
            const precoCusto = transformarDinheiroEmNumber(produtoRelacionado.precoUnitario.toString());
            const lucroUnitario = precoVenda - precoCusto;
            const lucroTotal = lucroUnitario * venda.quantidadeVendida;
    
            const chaveDia = dataVenda.toDateString();
            if (chaveDia in ultimos7Dias) {
                ultimos7Dias[chaveDia] += venda.quantidadeVendida;
                lucro7Dias[chaveDia] += lucroTotal;
            }
    
            const chaveMes = `${dataVenda.getFullYear()}-${String(dataVenda.getMonth()).padStart(2, "0")}`;
            if (chaveMes in ultimos6Meses) {
                ultimos6Meses[chaveMes] += venda.quantidadeVendida;
                lucroMeses[chaveMes] += lucroTotal;
            }
        });
    
        const vendas7Dias = Object.keys(ultimos7Dias).map(dataStr => {
            const data = new Date(dataStr);
            return {
                dia: diasDaSemana[data.getDay()],
                ["Produtos Vendidos"]: ultimos7Dias[dataStr],
            };
        });
    
        const vendas6Meses = Object.keys(ultimos6Meses).map(chave => {
            const [ano, mesIndex] = chave.split("-").map(Number);
            return {
                mes: `${meses[mesIndex]}/${ano.toString().slice(-2)}`,
                ["Produtos Vendidos"]: ultimos6Meses[chave],
            };
        });
    
        const lucro7DiasArr = Object.keys(lucro7Dias).map(dataStr => {
            const data = new Date(dataStr);
            return {
                dia: diasDaSemana[data.getDay()],
                lucro: lucro7Dias[dataStr],
            };
        });
    
        const lucroMesesArr = Object.keys(lucroMeses).map(chave => {
            const [ano, mesIndex] = chave.split("-").map(Number);
            return {
                mes: `${meses[mesIndex]}/${ano.toString().slice(-2)}`,
                lucro: lucroMeses[chave],
            };
        });
    
        setVendasUltimos7Dias(vendas7Dias);
        setVendasUltimos6Meses(vendas6Meses);
        setLucroUltimos7Dias(lucro7DiasArr);
        setLucroMensal(lucroMesesArr);
    }, [vendas, produtos]);
    

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
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
                            array={despesasDoMes}
                            chaveNome="despesa"
                            chaveValor="valor"
                            titulo="Despesas do Mês"
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
                            array={vendasUltimos7Dias}
                            chaveNome="dia"
                            chaveValor="Produtos Vendidos"
                            titulo="Vendas dos últimos 7 dias"
                        />
                        <GraficoDeBarra
                            array={vendasUltimos6Meses}
                            chaveNome="mes"
                            chaveValor="Produtos Vendidos"
                            titulo="Vendas dos últimos 6 meses"
                        />
                    </div>
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
                        <GraficoDeLinha
                            array={lucroUltimos7Dias}
                            chaveNome="dia"
                            chaveValor="lucro"
                            titulo="Lucro nos últimos 7 dias"
                        />
                        <GraficoDeLinha
                            array={lucroMensal}
                            chaveNome="mes"
                            chaveValor="lucro"
                            titulo="Lucro no último mês"
                        />
                    </div>
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}