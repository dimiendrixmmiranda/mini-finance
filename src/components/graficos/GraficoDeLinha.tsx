import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface GraficoDeLinhaProps<T> {
    array: T[];
    chaveNome: keyof T;
    chaveValor: keyof T;
    titulo: string
}

export default function GraficoDeLinha<T>({ array, chaveNome, chaveValor, titulo }: GraficoDeLinhaProps<T>) {
    return (
        <div className="bg-white rounded-xl shadow p-4 text-black">
            <h2 className="text-xl font-bold mb-4 text-center">{titulo}</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={array}>
                    <XAxis dataKey={String(chaveNome)} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={String(chaveValor)} stroke="#10B981" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
