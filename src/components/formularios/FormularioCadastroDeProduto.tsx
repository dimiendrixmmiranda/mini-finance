import Input from "../InputFormulario/Input";
import Select from "../InputFormulario/Select";

interface FormularioCadastroDeProdutoProps {
    nomeDoProduto: string,
    setNomeDoProduto: (valor: string) => void,
    categoria: string,
    setCategoria: (valor: string) => void,
    quantidade: string,
    setQuantidade: (valor: string) => void,
    precoUnitario: string,
    setPrecoUnitario: (valor: string) => void,
    precoDeVenda: string
    setPrecoDeVenda: (valor: string) => void,
    tamanhoDoProduto: string,
    setTamanhoDoProduto: (valor: string) => void,
    salvarProduto: (e: React.FormEvent) => void
}

export default function FormularioCadastroDeProduto({ nomeDoProduto, setNomeDoProduto, categoria, setCategoria, quantidade, setQuantidade, precoUnitario, setPrecoUnitario, precoDeVenda, setPrecoDeVenda, tamanhoDoProduto, setTamanhoDoProduto, salvarProduto }: FormularioCadastroDeProdutoProps) {
    return (
        <form className="flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md">
            <h2 className="font-semibold text-xl uppercase text-center">Cadastro de Produto:</h2>
            <Input
                id="nomeDoProduto"
                tipo="text"
                textoLabel="Nome do produto:"
                valor={nomeDoProduto}
                setValor={setNomeDoProduto} />
            <Select
                id="categoria"
                textoLabel="Informe a Categoria"
                options={[{ valor: '', texto: 'Selecione' }, { valor: 'roupas', texto: 'Roupas' }, { valor: 'eletronicos', texto: 'Eletrônicos' }]}
                valor={categoria}
                setValor={setCategoria}
            />
            <Input
                id="quantidade"
                tipo="number"
                textoLabel="Informe a quantidade:"
                valor={quantidade}
                setValor={setQuantidade} />
            <Input
                id="precoUnitario"
                tipo="text"
                textoLabel="Preço unitário do produto:"
                valor={precoUnitario}
                setValor={setPrecoUnitario} />
            <Input
                id="precoDeVenda"
                tipo="text"
                textoLabel="Preço de venda do produto:"
                valor={precoDeVenda}
                setValor={setPrecoDeVenda} />
            <Input
                id="tamanho"
                tipo="text"
                textoLabel="Tamanho do Produto: (Opcional)"
                valor={tamanhoDoProduto}
                setValor={setTamanhoDoProduto} />
            <button
                className="flex justify-center items-center text-center w-full bg-[--cor-2] uppercase font-bold text-xl py-1 text-white"
                onClick={(e) => salvarProduto(e)}
                style={{ textShadow: '1px 1px 2px black' }}>
                Salvar
            </button>
        </form>
    )
}