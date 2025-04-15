'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import FormularioCadastroDeDespesa from "@/components/formularios/FormularioCadastroDeDespesa";
import FormularioCadastroDeProduto from "@/components/formularios/FormularioCadastroDeProduto";
import FormularioCadastroDeVenda from "@/components/formularios/FormularioCadastroDeVenda";
import Template from "@/components/template/Template";
import useAuth from "@/data/hook/useAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
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
    const { logout, usuario } = useAuth()

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
    const [valorDaVenda, setValorDaVenda] = useState('R$')
    const [data, setData] = useState('')
    const [desconto, setDesconto] = useState('')

    // Cadastro de Despesa
    const [nomeDaDespesa, setNomeDaDespesa] = useState('')
    const [tipoDaDespesa, setTipoDaDespesa] = useState('')
    const [valorDaVendaDespesa, setValorDaVendaDespesa] = useState('')
    const [dataDespesa, setDataDespesa] = useState('')
    const [categoriaDespesa, setCategoriaDespesa] = useState('')
    const [formaDePagamento, setFormaDePagamento] = useState('')

    const [dadosUsuario, setDadosUsuario] = useState<UsuarioFirestore | null>(null);

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

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="bg-zinc-200 p-4 text-black flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3">
                    {
                        dadosUsuario && (
                            <h1 className="text-center font-bold text-2xl md:col-start-1 md:col-end-3 xl:col-end-4">{dadosUsuario.nomeDoNegocio}</h1>
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
                    />

                    <FormularioCadastroDeVenda
                        produtoVendido={produtoVendido}
                        setProdutoVendido={setProdutoVendido}
                        quantidadeVendida={quantidadeVendida}
                        setQuantidadeVendida={setQuantidadeVendida}
                        precoUnitario={precoUnitarioVenda}
                        setPrecoUnitario={setPrecoUnitarioVenda}
                        valorDaVenda={valorDaVenda}
                        setValorDaVenda={setValorDaVenda}
                        data={data}
                        setData={setData}
                        desconto={desconto}
                        setDesconto={setDesconto}
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
                    />

                    <button onClick={logout}>logaut</button>
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}