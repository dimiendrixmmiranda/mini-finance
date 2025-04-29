import CadastroDeProduto from '@/interfaces/CadastroDeProduto';
import { ChangeEvent } from 'react';

export default function handleChangeCadastroProduto(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setCadastroDeProduto: React.Dispatch<React.SetStateAction<CadastroDeProduto>>
) {
    const { id, value } = e.target;
    setCadastroDeProduto(prev => ({
        ...prev,
        [id]: value
    }));
}
