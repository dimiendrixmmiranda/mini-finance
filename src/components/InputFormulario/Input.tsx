interface InputProps {
    textoLabel: string,
    tipo: string,
    id: string
    valor: string
    setValor: (valor: string) => void
}

export default function Input({ textoLabel, tipo, id, valor, setValor }: InputProps) {
    return (
        <fieldset className="w-full h-full">
            <label htmlFor={id} className="w-full">{textoLabel}</label>
            <input
                type={tipo}
                name={id}
                id={id}
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="text-black h-[30px] px-1 w-full"
            />
        </fieldset>
    )
}