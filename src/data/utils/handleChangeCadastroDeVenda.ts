import CadastroDeVenda from "@/interfaces/CadastroDeVenda";
import Produto from "@/interfaces/Produto";
import { ChangeEvent } from "react";

export default function handleChangeCadastroDeVenda(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setCadastroDeVenda: React.Dispatch<React.SetStateAction<CadastroDeVenda>>,
    produtos: Produto[]
) {
    const { id, value } = e.target;
    const produtoSelecionado = produtos.find(prod => prod.nome === value);
    console.log(produtoSelecionado)
    if (id === "nome") {
        if (produtoSelecionado) {
            setCadastroDeVenda(prev => ({
                ...prev,
                nome: value,
                precoUnitario: produtoSelecionado.precoUnitario?.toString() || '',
                precoUnitarioVenda: produtoSelecionado.precoUnitarioVenda?.toString() || '',
            }));
            return;
        }
    }
    setCadastroDeVenda(prev => ({
        ...prev,
        [id]: value
    }));
}