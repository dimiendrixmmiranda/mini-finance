'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import FormularioCadastroDeDespesa from "@/components/formularios/FormularioCadastroDeDespesa";
import FormularioCadastroDeProduto from "@/components/formularios/FormularioCadastroDeProduto";
import FormularioCadastroDeVenda from "@/components/formularios/FormularioCadastroDeVenda";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import Produto from "@/interfaces/Produto";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface UsuarioFirestore {
    cidade: string;
    email: string;
    nome: string;
    nomeDoNegocio: string;
    tamanhoDaEmpresa: string;
    telefone: string;
}

export default function Page() {
    const { usuario } = useAuth()

    // Cadastro de Produto
    const [nomeDoProduto, setNomeDoProduto] = useState('')
    const [categoria, setCategoria] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [precoUnitario, setPrecoUnitario] = useState('R$')
    const [precoDeVenda, setPrecoDeVenda] = useState('R$')
    const [tamanhoDoProduto, setTamanhoDoProduto] = useState('')

    // Cadastro de venda
    const [produtoVendido, setProdutoVendido] = useState('')
    const [quantidadeVendida, setQuantidadeVendida] = useState('')
    const [precoUnitarioVenda, setPrecoUnitarioVenda] = useState('R$')
    const [desconto, setDesconto] = useState('');
    const [valorDaVenda, setValorDaVenda] = useState('R$')
    const [data, setData] = useState('')

    // Cadastro de Despesa
    const [nomeDaDespesa, setNomeDaDespesa] = useState('')
    const [tipoDaDespesa, setTipoDaDespesa] = useState('')
    const [valorDaVendaDespesa, setValorDaVendaDespesa] = useState('')
    const [dataDespesa, setDataDespesa] = useState('')
    const [categoriaDespesa, setCategoriaDespesa] = useState('')
    const [formaDePagamento, setFormaDePagamento] = useState('')

    const [dadosUsuario, setDadosUsuario] = useState<UsuarioFirestore | null>(null);

    const [produtosDisponiveis, setProdutosDisponiveis] = useState<Produto[]>([]);

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
    
        setProdutosDisponiveis(lista);
    }

    useEffect(() => {
        buscarProdutos();
    }, [usuario]);


    async function salvarProduto(e: React.FormEvent) {
        e.preventDefault();

        if (!usuario?.uid) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            const produtosRef = collection(db, "usuarios", usuario.uid, "produtos");

            // Primeiro, cria o documento com addDoc
            const docRef = await addDoc(produtosRef, {
                nome: nomeDoProduto,
                categoria,
                quantidade: Number(quantidade),
                precoUnitario: parseFloat(precoUnitario.replace('R$', '').replace(',', '.')),
                precoDeVenda: parseFloat(precoDeVenda.replace('R$', '').replace(',', '.')),
                tamanho: tamanhoDoProduto,
                data: new Date()
            });

            // Em seguida, atualiza o mesmo documento com seu próprio ID
            await updateDoc(docRef, { id: docRef.id });

            alert("Produto salvo com sucesso!");
            await buscarProdutos();

            setTimeout(() => {
                window.location.reload();
            }, 1000)

            // Resetar os campos do formulário
            setNomeDoProduto('');
            setCategoria('');
            setQuantidade('');
            setPrecoUnitario('R$');
            setPrecoDeVenda('R$');
            setTamanhoDoProduto('');
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar produto. Verifique se você está autenticado.");
        }
    }


    async function salvarVenda(e: React.FormEvent) {
        e.preventDefault();
        // const produtoSelecionado = produtosDisponiveis.find(p => p.id === produtoVendido);
        // console.log(produtoSelecionado)
        if (!usuario?.uid) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            const produtoRef = doc(db, "usuarios", usuario.uid, "produtos", produtoVendido);
            const produtoSnap = await getDoc(produtoRef);

            if (!produtoSnap.exists()) {
                alert("Produto não encontrado.");
                return;
            }

            const produtoData = produtoSnap.data();
            const quantidadeAtual = Number(produtoData.quantidade);
            const quantidadeVenda = Number(quantidadeVendida);

            if (quantidadeVenda > quantidadeAtual) {
                alert("Erro: você está tentando vender mais do que há em estoque.");
                return;
            }

            // Criar o objeto da venda
            const venda = {
                produtoVendido, // ID do produto
                quantidadeVendida: quantidadeVenda,
                precoUnitario: precoUnitarioVenda,
                valorDaVenda,
                desconto,
                data: data || new Date().toISOString().split('T')[0]
            };

            // Salvar venda
            const vendasRef = collection(db, "usuarios", usuario.uid, "vendas");
            await addDoc(vendasRef, venda);

            // Atualizar a quantidade do produto
            const novaQuantidade = quantidadeAtual - quantidadeVenda;
            await updateDoc(produtoRef, { quantidade: novaQuantidade });

            alert("Venda salva com sucesso!");

            setTimeout(() => {
                window.location.reload();
            }, 1000)

            // Limpar campos
            setProdutoVendido('');
            setQuantidadeVendida('');
            setPrecoUnitarioVenda('R$');
            setValorDaVenda('R$');
            setDesconto('');
            setData('');
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
    
            await addDoc(despesasRef, {
                nome: nomeDaDespesa,
                tipo: tipoDaDespesa,
                valor: parseFloat(valorDaVendaDespesa.replace('R$', '').replace(',', '.')),
                data: dataDespesa || new Date().toISOString().split('T')[0],
                categoria: categoriaDespesa,
                formaDePagamento
            });
    
            alert("Despesa salva com sucesso!");
    
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    
            // Resetar os campos
            setNomeDaDespesa('');
            setTipoDaDespesa('');
            setValorDaVendaDespesa('');
            setDataDespesa('');
            setCategoriaDespesa('');
            setFormaDePagamento('');
        } catch (error) {
            console.error("Erro ao salvar despesa:", error);
            alert("Erro ao salvar despesa.");
        }
    }
    

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="bg-zinc-200 p-4 text-black flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3">
                    {
                        dadosUsuario && (
                            <h1 className="text-center font-bold text-2xl md:col-start-1 md:col-end-3 xl:col-end-4 xl:text-4xl">{dadosUsuario.nomeDoNegocio}</h1>
                        )
                    }

                    <FormularioCadastroDeProduto
                        nomeDoProduto={nomeDoProduto}
                        categoria={categoria}
                        quantidade={quantidade}
                        precoUnitario={precoUnitario}
                        precoDeVenda={precoDeVenda}
                        tamanhoDoProduto={tamanhoDoProduto}
                        setNomeDoProduto={setNomeDoProduto}
                        setCategoria={setCategoria}
                        setQuantidade={setQuantidade}
                        setPrecoUnitario={setPrecoUnitario}
                        setPrecoDeVenda={setPrecoDeVenda}
                        setTamanhoDoProduto={setTamanhoDoProduto}
                        salvarProduto={salvarProduto}
                    />

                    <FormularioCadastroDeVenda
                        produtoVendido={produtoVendido}
                        setProdutoVendido={setProdutoVendido}
                        quantidadeVendida={quantidadeVendida}
                        setQuantidadeVendida={setQuantidadeVendida}
                        precoUnitario={precoUnitarioVenda}
                        setPrecoUnitario={setPrecoUnitarioVenda}
                        desconto={desconto}
                        setDesconto={setDesconto}
                        valorDaVenda={valorDaVenda}
                        setValorDaVenda={setValorDaVenda}
                        data={data}
                        setData={setData}
                        produtosDisponiveis={produtosDisponiveis}
                        salvarVenda={salvarVenda}
                    />

                    <FormularioCadastroDeDespesa
                        nomeDaDespesa={nomeDaDespesa}
                        setNomeDaDespesa={setNomeDaDespesa}
                        tipoDaDespesa={tipoDaDespesa}
                        setTipoDaDespesa={setTipoDaDespesa}
                        valorDaVenda={valorDaVendaDespesa}
                        setValorDaVenda={setValorDaVendaDespesa}
                        data={dataDespesa}
                        setData={setDataDespesa}
                        categoria={categoriaDespesa}
                        setCategoria={setCategoriaDespesa}
                        formaDePagamento={formaDePagamento}
                        setFormaDePagamento={setFormaDePagamento}
                        salvarDespesa={salvarDespesa}
                    />
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}