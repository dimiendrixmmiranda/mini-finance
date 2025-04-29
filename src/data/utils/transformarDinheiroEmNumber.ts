export default function transformarDinheiroEmNumber(valor: string){
    return parseFloat(valor.replace('R$', '').replace(',', '.'))
}