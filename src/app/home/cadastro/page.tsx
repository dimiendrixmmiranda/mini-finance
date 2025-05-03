'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { useProdutos } from "@/data/hook/useProdutos";
import { categorias } from "@/data/utils/categoria";
import handleChangeCadastroDeDespesa from "@/data/utils/handleChangeCadastroDeDespesa";
import handleChangeCadastroProduto from "@/data/utils/handleChangeCadastroDeProduto";
import handleChangeCadastroDeVenda from "@/data/utils/handleChangeCadastroDeVenda";
import transformarDinheiroEmNumber from "@/data/utils/transformarDinheiroEmNumber";
import CadastroDeDespesa from "@/interfaces/CadastroDeDespesa";
import CadastroDeProduto from "@/interfaces/CadastroDeProduto";
import CadastroDeVenda from "@/interfaces/CadastroDeVenda";
import UsuarioFirestore from "@/interfaces/UsuarioFirestore";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page() {
    const { usuario } = useAuth()
    const { produtos } = useProdutos(usuario || undefined)
    const [dadosUsuario, setDadosUsuario] = useState<UsuarioFirestore | null>(null);

    const [cadastroDeProduto, setCadastroDeProduto] = useState<CadastroDeProduto>({
        nome: '',
        categoria: '',
        quantidade: '',
        tamanho: '',
        precoUnitario: '',
        precoUnitarioVenda: '',
        data: new Date().toISOString().split('T')[0],
        marca: '',
        modelo: '',
        garantia: '',
        pesoOuVolume: '',
        validade: '',
        cor: '',
    });

    const [cadastroDeVenda, setCadastroDeVenda] = useState<CadastroDeVenda>({
        nome: '',
        quantidadeVendida: '',
        precoUnitario: '',
        precoUnitarioVenda: '',
        desconto: '',
        valorFinalDaVenda: '',
        data: new Date().toISOString().split('T')[0],
    })
    const [cadastroDeDespesa, setCadastroDeDespesa] = useState<CadastroDeDespesa>({
        nome: '',
        valorDaDespesa: '',
        formaDePagamento: '',
        funcionarioQuePagou: '',
        data: new Date().toISOString().split('T')[0],
        categoriaDaDespesa: '',
    })

    function handleChangeQuantidade(e: React.ChangeEvent<HTMLInputElement>) {
        const quantidade = parseFloat(e.target.value);
        const precoUnitario = parseFloat(cadastroDeVenda.precoUnitarioVenda || "0");

        const valorFinal = !isNaN(quantidade) && !isNaN(precoUnitario)
            ? (quantidade * precoUnitario).toFixed(2)
            : '';

        setCadastroDeVenda(prev => ({
            ...prev,
            quantidadeVendida: e.target.value,
            valorFinalDaVenda: valorFinal
        }));
    }


    function removerCamposVazios<T extends object>(obj: T): Partial<T> {
        const novoObjeto = {} as Partial<T>;

        for (const chave in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, chave)) {
                const valor = obj[chave as keyof T];
                if (valor !== '') {
                    novoObjeto[chave as keyof T] = valor;
                }
            }
        }

        return novoObjeto;
    }

    async function salvarProduto(e: React.FormEvent) {
        e.preventDefault();

        if (!usuario?.uid) {
            alert("Usuário não autenticado.");
            return;
        }

        const produtoFiltrado = removerCamposVazios({
            ...cadastroDeProduto,
            precoUnitario: cadastroDeProduto.precoUnitario && parseFloat(cadastroDeProduto.precoUnitario.replace('R$', '').replace(',', '.')),
            precoUnitarioVenda: cadastroDeProduto.precoUnitarioVenda && parseFloat(cadastroDeProduto.precoUnitarioVenda.replace('R$', '').replace(',', '.')),
            data: cadastroDeProduto.data && Timestamp.fromDate(new Date(cadastroDeProduto.data))
        })

        console.log(produtoFiltrado)

        try {
            const produtosRef = collection(db, "usuarios", usuario.uid, "produtos");

            const docRef = await addDoc(produtosRef, produtoFiltrado);

            await updateDoc(docRef, { id: docRef.id });

            alert("Produto salvo com sucesso!");

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar produto. Verifique se você está autenticado.");
        }
    }

    async function salvarVenda(e: React.FormEvent) {
        e.preventDefault();

        if (!usuario?.uid) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            const produtoSelecionado = produtos.find(p => p.nome === cadastroDeVenda.nome);

            if (!produtoSelecionado) {
                alert("Produto não encontrado.");
                return;
            }

            const produtoRef = doc(db, "usuarios", usuario.uid, "produtos", produtoSelecionado.id);
            const produtoSnap = await getDoc(produtoRef);

            if (!produtoSnap.exists()) {
                alert("Produto não encontrado no banco.");
                return;
            }

            const produtoData = produtoSnap.data();
            const quantidadeAtual = Number(produtoData.quantidade);
            const quantidadeVenda = Number(cadastroDeVenda.quantidadeVendida);
            const valorFinalDaVenda = cadastroDeVenda.valorFinalDaVenda && Number(cadastroDeVenda.valorFinalDaVenda.replace('R$', '').replace(',', '.'));

            if (quantidadeVenda > quantidadeAtual) {
                alert("Erro: você está tentando vender mais do que há em estoque.");
                return;
            }

            if (dadosUsuario?.tipoDeLoja === 'eletronicos') {
                const venda = {
                    produtoId: produtoSelecionado.id,
                    nome: produtoSelecionado.nome,
                    quantidadeVendida: quantidadeVenda,
                    precoUnitario: cadastroDeVenda.precoUnitario && transformarDinheiroEmNumber(cadastroDeVenda.precoUnitario),
                    precoUnitarioVenda: cadastroDeVenda.precoUnitarioVenda && transformarDinheiroEmNumber(cadastroDeVenda.precoUnitarioVenda),
                    desconto: cadastroDeVenda.desconto,
                    valorFinalDaVenda: valorFinalDaVenda,
                    data: cadastroDeVenda.data && Timestamp.fromDate(new Date(cadastroDeVenda.data)),
                };


                const vendasRef = collection(db, "usuarios", usuario.uid, "vendas");
                await addDoc(vendasRef, venda);

                const novaQuantidade = quantidadeAtual - quantidadeVenda;
                await updateDoc(produtoRef, { quantidade: novaQuantidade });

                alert("Venda salva com sucesso!");
            } else if (dadosUsuario?.tipoDeLoja === 'loja-de-roupas') {
                const venda = {
                    produtoId: produtoSelecionado.id,
                    nome: produtoSelecionado.nome,
                    quantidadeVendida: quantidadeVenda,
                    precoUnitario: cadastroDeVenda.precoUnitario && transformarDinheiroEmNumber(cadastroDeVenda.precoUnitario),
                    precoUnitarioVenda: cadastroDeVenda.precoUnitarioVenda && transformarDinheiroEmNumber(cadastroDeVenda.precoUnitarioVenda),
                    desconto: cadastroDeVenda.desconto,
                    valorFinalDaVenda: valorFinalDaVenda,
                    data: cadastroDeVenda.data && Timestamp.fromDate(new Date(cadastroDeVenda.data)),
                    tamanho: produtoSelecionado.tamanho
                };
                console.log(produtoSelecionado)
                console.log(venda)

                const vendasRef = collection(db, "usuarios", usuario.uid, "vendas");
                await addDoc(vendasRef, venda);

                const novaQuantidade = quantidadeAtual - quantidadeVenda;
                await updateDoc(produtoRef, { quantidade: novaQuantidade });

                alert("Venda salva com sucesso!");
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (error) {
            console.error("Erro ao salvar venda:", error);
            alert("Erro ao salvar venda.");
        }
    }

    async function salvarDespesa(e: React.FormEvent) {
        e.preventDefault();

        if (!usuario?.uid) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            const despesasRef = collection(db, "usuarios", usuario.uid, "despesas");

            const valorDaDespesa = transformarDinheiroEmNumber(cadastroDeDespesa.valorDaDespesa)

            await addDoc(despesasRef, {
                nome: cadastroDeDespesa.nome,
                valorDaDespesa: valorDaDespesa,
                formaDePagamento: cadastroDeDespesa.formaDePagamento,
                funcionarioQuePagou: cadastroDeDespesa.funcionarioQuePagou,
                data: Timestamp.fromDate(new Date(cadastroDeDespesa.data)),
                categoriaDaDespesa: cadastroDeDespesa.categoriaDaDespesa,
            });

            alert("Despesa salva com sucesso!");

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Erro ao salvar despesa:", error);
            alert("Erro ao salvar despesa.");
        }
    }

    useEffect(() => {
        async function buscarDados() {
            if (usuario?.uid) {
                const docRef = doc(db, "usuarios", usuario.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDadosUsuario(docSnap.data() as UsuarioFirestore);
                } else {
                    console.log("Documento do usuário não encontrado.");
                }
            }
        }
        buscarDados();
    }, [usuario]);


    function identificarTipoDeLojaCadastrarProduto(usuario: UsuarioFirestore | null) {
        if (!usuario) {
            return <h2>Carregando informações do usuário...</h2>; // Ou outra mensagem apropriada
        }
        switch (usuario.tipoDeLoja) {
            case 'loja-de-roupas':
                return (
                    <div className="p-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        <form className="bg-red-600 flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md h-fit" onSubmit={salvarProduto}>
                            <h2>Cadastro de Produtos</h2>
                            {
                                categorias["loja-de-roupas"].cadastroDeProduto.filter(input => input.tipo === 'text' || input.tipo === 'date').map((inputText, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputText.id}>{inputText.textoLabel}</label>
                                            <input
                                                className="text-black h-[30px] px-1 w-full"
                                                type={inputText.tipo}
                                                id={inputText.id}
                                                value={cadastroDeProduto[inputText.id as keyof typeof cadastroDeProduto]}
                                                onChange={(e) => handleChangeCadastroProduto(e, setCadastroDeProduto)}
                                            />
                                        </fieldset>
                                    )
                                })
                            }
                            {
                                categorias["loja-de-roupas"].cadastroDeProduto.filter(input => input.tipo === 'select').map((inputSelect, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputSelect.id}>{inputSelect.textoLabel}</label>
                                            <select
                                                className="text-black h-[30px] px-1 capitalize"
                                                id={inputSelect.id}
                                                value={cadastroDeProduto[inputSelect.id as keyof typeof cadastroDeProduto]}
                                                onChange={(e) => handleChangeCadastroProduto(e, setCadastroDeProduto)}
                                            >
                                                {inputSelect.options?.map((opt, j) => (
                                                    <option value={opt.valor} key={j} className="capitalize">{opt.texto}</option>
                                                ))}
                                            </select>
                                        </fieldset>
                                    )
                                })
                            }
                            <button type="submit">Salvar</button>
                        </form>
                        <form className="bg-green-600 flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md h-fit" onSubmit={salvarVenda}>
                            <h2>Cadastro de Venda</h2>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="nome">Produto</label>
                                <select
                                    className="text-black h-[30px] px-1 capitalize"
                                    id="nome"
                                    value={cadastroDeVenda.nome}
                                    onChange={(e) => handleChangeCadastroDeVenda(e, setCadastroDeVenda, produtos)}
                                >
                                    <option value="">Selecione um produto</option>
                                    {produtos.map((produto) => (
                                        <option key={produto.id} value={produto.nome}>
                                            {`${produto.nome} - ${produto.tamanho}`}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="quantidade">Quantidade</label>
                                <input
                                    className="text-black h-[30px] px-1 w-full"
                                    type="number"
                                    id="quantidade"
                                    value={cadastroDeVenda.quantidadeVendida}
                                    onChange={handleChangeQuantidade}
                                />
                            </fieldset>
                            {
                                categorias["loja-de-roupas"].cadastroDeVenda.filter(input => input.tipo === 'text' || input.tipo === 'date').map((inputText, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputText.id}>{inputText.textoLabel}</label>
                                            <input
                                                className="text-black h-[30px] px-1 w-full"
                                                type={inputText.tipo}
                                                id={inputText.id}
                                                value={cadastroDeVenda[inputText.id as keyof typeof cadastroDeVenda]}
                                                onChange={(e) => handleChangeCadastroDeVenda(e, setCadastroDeVenda, produtos)}
                                            />
                                        </fieldset>
                                    )
                                })
                            }
                            <button type="submit">Salvar</button>
                        </form>
                        <form className="bg-blue-600 flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md h-fit" onSubmit={salvarDespesa}>
                            <h2>Cadastro de Despesa</h2>
                            {
                                categorias["loja-de-roupas"].cadastroDeDespesa.filter(input => input.tipo === 'text' || input.tipo === 'date').map((inputText, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputText.id}>{inputText.textoLabel}</label>
                                            <input
                                                className="text-black h-[30px] px-1 w-full"
                                                type={inputText.tipo}
                                                id={inputText.id}
                                                value={cadastroDeDespesa[inputText.id as keyof typeof cadastroDeDespesa]}
                                                onChange={(e) => handleChangeCadastroDeDespesa(e, setCadastroDeDespesa)}
                                            />
                                        </fieldset>
                                    )
                                })
                            }
                            {
                                categorias["loja-de-roupas"].cadastroDeDespesa.filter(input => input.tipo === 'select').map((inputSelect, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputSelect.id}>{inputSelect.textoLabel}</label>
                                            <select
                                                className="text-black h-[30px] px-1 capitalize"
                                                id={inputSelect.id}
                                                value={cadastroDeDespesa[inputSelect.id as keyof typeof cadastroDeDespesa]}
                                                onChange={(e) => handleChangeCadastroDeDespesa(e, setCadastroDeDespesa)}
                                            >
                                                {inputSelect.options?.map((opt, j) => (
                                                    <option value={opt.valor} key={j} className="capitalize">{opt.texto}</option>
                                                ))}
                                            </select>
                                        </fieldset>
                                    )
                                })
                            }
                            <button type="submit">Salvar</button>
                        </form>
                    </div>
                );
            case 'eletronicos':
                return (
                    <div className="p-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        <form className="bg-red-600 flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md h-fit" onSubmit={salvarProduto}>
                            <h2>Cadastro de Produtos</h2>
                            {
                                categorias.eletronicos.cadastroDeProduto.filter(input => input.tipo === 'text' || input.tipo === 'date').map((inputText, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputText.id}>{inputText.textoLabel}</label>
                                            <input
                                                className="text-black h-[30px] px-1 w-full"
                                                type={inputText.tipo}
                                                id={inputText.id}
                                                value={cadastroDeProduto[inputText.id as keyof typeof cadastroDeProduto]}
                                                onChange={(e) => handleChangeCadastroProduto(e, setCadastroDeProduto)}
                                            />
                                        </fieldset>
                                    )
                                })
                            }
                            {
                                categorias.eletronicos.cadastroDeProduto.filter(input => input.tipo === 'select').map((inputSelect, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputSelect.id}>{inputSelect.textoLabel}</label>
                                            <select
                                                className="text-black h-[30px] px-1 capitalize"
                                                id={inputSelect.id}
                                                value={cadastroDeProduto[inputSelect.id as keyof typeof cadastroDeProduto]}
                                                onChange={(e) => handleChangeCadastroProduto(e, setCadastroDeProduto)}
                                            >
                                                {inputSelect.options?.map((opt, j) => (
                                                    <option value={opt.valor} key={j} className="capitalize">{opt.texto}</option>
                                                ))}
                                            </select>
                                        </fieldset>
                                    )
                                })
                            }
                            <button type="submit">Salvar</button>
                        </form>
                        <form className="bg-green-600 flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md h-fit" onSubmit={salvarVenda}>
                            <h2>Cadastro de Venda</h2>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="nome">Produto</label>
                                <select
                                    className="text-black h-[30px] px-1 capitalize"
                                    id="nome"
                                    value={cadastroDeVenda.nome}
                                    onChange={(e) => handleChangeCadastroDeVenda(e, setCadastroDeVenda, produtos)}
                                >
                                    <option value="">Selecione um produto</option>
                                    {produtos.map((produto) => (
                                        <option key={produto.id} value={produto.nome}>
                                            {produto.nome}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="quantidade">Quantidade</label>
                                <input
                                    className="text-black h-[30px] px-1 w-full"
                                    type="number"
                                    id="quantidade"
                                    value={cadastroDeVenda.quantidadeVendida}
                                    onChange={handleChangeQuantidade}
                                />
                            </fieldset>
                            {
                                categorias.eletronicos.cadastroDeVenda.filter(input => input.tipo === 'text' || input.tipo === 'date').map((inputText, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputText.id}>{inputText.textoLabel}</label>
                                            <input
                                                className="text-black h-[30px] px-1 w-full"
                                                type={inputText.tipo}
                                                id={inputText.id}
                                                value={cadastroDeVenda[inputText.id as keyof typeof cadastroDeVenda]}
                                                onChange={(e) => handleChangeCadastroDeVenda(e, setCadastroDeVenda, produtos)}
                                            />
                                        </fieldset>
                                    )
                                })
                            }
                            <button type="submit">Salvar</button>
                        </form>
                        <form className="bg-blue-600 flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md h-fit" onSubmit={salvarDespesa}>
                            <h2>Cadastro de Despesa</h2>
                            {
                                categorias.eletronicos.cadastroDeDespesa.filter(input => input.tipo === 'text' || input.tipo === 'date').map((inputText, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputText.id}>{inputText.textoLabel}</label>
                                            <input
                                                className="text-black h-[30px] px-1 w-full"
                                                type={inputText.tipo}
                                                id={inputText.id}
                                                value={cadastroDeDespesa[inputText.id as keyof typeof cadastroDeDespesa]}
                                                onChange={(e) => handleChangeCadastroDeDespesa(e, setCadastroDeDespesa)}
                                            />
                                        </fieldset>
                                    )
                                })
                            }
                            {
                                categorias.eletronicos.cadastroDeDespesa.filter(input => input.tipo === 'select').map((inputSelect, i) => {
                                    return (
                                        <fieldset key={i} className="flex flex-col gap-1">
                                            <label htmlFor={inputSelect.id}>{inputSelect.textoLabel}</label>
                                            <select
                                                className="text-black h-[30px] px-1 capitalize"
                                                id={inputSelect.id}
                                                value={cadastroDeDespesa[inputSelect.id as keyof typeof cadastroDeDespesa]}
                                                onChange={(e) => handleChangeCadastroDeDespesa(e, setCadastroDeDespesa)}
                                            >
                                                {inputSelect.options?.map((opt, j) => (
                                                    <option value={opt.valor} key={j} className="capitalize">{opt.texto}</option>
                                                ))}
                                            </select>
                                        </fieldset>
                                    )
                                })
                            }
                            <button type="submit">Salvar</button>
                        </form>
                    </div>
                );
            default:
                return (
                    <h2>Erro na categoria</h2>
                );
        }
    }

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="min-h-[80vh]">
                    {dadosUsuario && identificarTipoDeLojaCadastrarProduto(dadosUsuario)}
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}