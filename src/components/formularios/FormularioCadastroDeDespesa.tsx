import Input from "../InputFormulario/Input";
import Select from "../InputFormulario/Select";

interface FormularioCadastroDeDespesaProps {
    nomeDaDespesa: string
    setNomeDaDespesa: (valor: string) => void
    tipoDaDespesa: string
    setTipoDaDespesa: (valor: string) => void
    valorDaVenda: string,
    setValorDaVenda: (valor: string) => void
    data: string
    setData: (valor: string) => void
    categoria: string
    setCategoria: (valor: string) => void
    formaDePagamento: string
    setFormaDePagamento: (valor: string) => void
    salvarDespesa: (e: React.FormEvent) => void

}

export default function FormularioCadastroDeDespesa({ nomeDaDespesa, setNomeDaDespesa, tipoDaDespesa, setTipoDaDespesa, valorDaVenda, setValorDaVenda, data, setData, categoria, setCategoria, formaDePagamento, setFormaDePagamento, salvarDespesa }: FormularioCadastroDeDespesaProps) {
    return (
        <form className="flex flex-col gap-3 p-2 border-2 border-[--cor-2] rounded-md" onSubmit={salvarDespesa}>
            <h2 className="font-semibold text-xl uppercase text-center">Cadastro de Despesa:</h2>
            <Input
                id="nomeDaDespesa"
                textoLabel="Informe o tipo da Despesa"
                tipo="text"
                valor={nomeDaDespesa}
                setValor={setNomeDaDespesa}
            />

            <Select
                id="tipoDaDespesa"
                textoLabel="Selecione o tipo da despesa:"
                options={[{ valor: '', texto: 'Selecione' }, { texto: 'Fixo', valor: 'fixo' }, { texto: 'Variavel', valor: 'variavel' }]}
                valor={tipoDaDespesa}
                setValor={setTipoDaDespesa}
            />
            <Input
                id="valorDaDespesa"
                tipo="string"
                textoLabel="Valor da despesa:"
                valor={valorDaVenda}
                setValor={setValorDaVenda} />
            <Input
                id="data"
                tipo="date"
                textoLabel="Data da despesa:"
                valor={data}
                setValor={setData} />
            <Select
                id="categoria"
                textoLabel="Selecione a categoria da despesa:"
                options={[{ valor: '', texto: 'Selecione' }, { texto: 'Água', valor: 'agua' }, { texto: 'Luz', valor: 'luz' }]}
                valor={categoria}
                setValor={setCategoria}
            />
            <Input
                id="formaDePagamento"
                tipo="text"
                textoLabel="Forma de Pagamento:"
                valor={formaDePagamento}
                setValor={setFormaDePagamento} />

            {/* Implementar um cadastro de clientes depois para utilizar um select aqui */}
            <button className="flex justify-center items-center text-center w-full bg-[--cor-2] uppercase font-bold text-xl py-1 text-white" style={{ textShadow: '1px 1px 2px black' }} type="submit">Salvar</button>
        </form>
    )
}