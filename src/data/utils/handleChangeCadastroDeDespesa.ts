import CadastroDeDespesa from "@/interfaces/CadastroDeDespesa"
import { ChangeEvent } from "react"

export default function handleChangeCadastroDeDespesa(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setCadastroDeDespesa: React.Dispatch<React.SetStateAction<CadastroDeDespesa>>
) {    const { id, value } = e.target
    setCadastroDeDespesa(prev => ({
        ...prev,
        [id]: value
    }))
}