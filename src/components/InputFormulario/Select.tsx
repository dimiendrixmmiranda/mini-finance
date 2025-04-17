interface OPT {
    valor: string
    texto: string
    idProduto?: string
}

interface SelectProps {
    textoLabel: string
    id: string,
    options: OPT[]
    valor: string
    setValor: (valor: string) => void
}
export default function Select({ textoLabel, id, options, valor, setValor }: SelectProps) {
    return (
        <fieldset className="w-full h-full flex flex-col">
            <label htmlFor={id}>{textoLabel}</label>
            <select name={id} id={id} value={valor} onChange={(e) => setValor(e.target.value)} className="text-black h-[30px] px-1 capitalize">
                {
                    options.map((opt, i) => {
                        return (
                            <option key={i} value={opt.valor} id={opt.idProduto ? opt.idProduto : ''} className="capitalize">{opt.texto}</option>
                        )
                    })
                }
            </select>
        </fieldset>
    )
}