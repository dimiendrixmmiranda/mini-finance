import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface GraficoDeBarraProps<T> {
    array: T[];
    chaveNome: keyof T;
    chaveValor: keyof T;
    titulo: string
}

export default function GraficoDeBarra<T>({ array, chaveNome, chaveValor, titulo }: GraficoDeBarraProps<T>) {
    return (
        <div className="bg-white rounded-xl shadow p-4 text-black">
            <h2 className="text-xl font-bold mb-4 text-center">{titulo}</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={array}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={String(chaveNome)} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={String(chaveValor)} fill="#3B82F6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}