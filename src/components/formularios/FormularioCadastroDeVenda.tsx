import Input from "../InputFormulario/Input";
import Select from "../InputFormulario/Select";

interface FormularioCadastroDeVendaProps {
    produtoVendido: string
    setProdutoVendido: (valor: string) => void
    quantidadeVendida: string
    setQuantidadeVendida: (valor: string) => void
    data: string
    setData: (valor: string) => void 
    precoUnitario: string,
    setPrecoUnitario: (valor: string) => void
    valorDaVenda:string
    setValorDaVenda: (valor: string) => void
    desconto: string
    setDesconto: (valor: string) => void
}

export default function FormularioCadastroDeVenda({produtoVendido, setProdutoVendido, quantidadeVendida, setQuantidadeVendida, data, setData, precoUnitario, setPrecoUnitario, valorDaVenda, setValorDaVenda, desconto, setDesconto}: FormularioCadastroDeVendaProps) {
    return (
        <form className="flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md">
            <h2 className="font-semibold text-xl uppercase text-center">Cadastro de Produto:</h2>
            {/* Esse select vai receber uma lista depois como todos os produtos cadastrados */}
            <Select
                id="produtoVendido"
                textoLabel="Selecione o produto vendido:"
                options={[{valor: '', texto: 'Selecione'}, {valor: 'camisa', texto: 'Camisa'}, {valor: 'calça', texto: 'Calça'}]}
                valor={produtoVendido}
                setValor={setProdutoVendido}

            />
            <Input
                id="quantidadeVendida"
                tipo="number"
                textoLabel="Quantidade vendida:"
                valor={quantidadeVendida}
                setValor={setQuantidadeVendida} />
            {/* tem que linkar quando eu selecionar o produto */}
            <Input
                id="precoUnitario"
                tipo="text"
                textoLabel="Data da venda:"
                valor={precoUnitario}
                setValor={setPrecoUnitario} />
            <Input
                id="valorDaVenda"
                tipo="text"
                textoLabel="Valor da Venda:"
                valor={valorDaVenda}
                setValor={setValorDaVenda} />
            
            <Input
                id="data"
                tipo="date"
                textoLabel="Data da Venda:"
                valor={data}
                setValor={setData} />
            
            <Input
                id="desconto"
                tipo="text"
                textoLabel="Desconto:"
                valor={desconto}
                setValor={setDesconto} />
            
            {/* Implementar um cadastro de clientes depois para utilizar um select aqui */}
            <button className="flex justify-center items-center text-center w-full bg-[--cor-2] uppercase font-bold text-xl py-1 text-white" style={{textShadow: '1px 1px 2px black'}}>Salvar</button>
        </form>
    )
}