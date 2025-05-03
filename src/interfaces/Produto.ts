export default interface Produto {
    id: string;
    nome: string;
    categoria: string;
    quantidade: number;
    precoUnitario: number;
    precoUnitarioVenda: number;
    data: Date;
    tamanho?: string;
    marca?: string;
    modelo?: string
}
