import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Template from "@/components/template/Template";

export default function Relatorios() {
    return (
        <ForcarAutenticacao>
            <Template>
                <div className="p-4 xl:p-6">
                    {/* Cards */}
                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Total de Vendas</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Total de Despesas</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Lucro Líquido</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                        <div className="bg-white text-black rounded-lg p-2 flex flex-col gap-2 max-w-[200px] w-full mx-auto">
                            <h2 className="uppercase text-center font-bold text-xl">Número de Produtos Vendidos</h2>
                            <p className="uppercase font-black text-3xl text-center">5</p>
                        </div>
                    </div>
                </div>
            </Template>
        </ForcarAutenticacao>
    )
}