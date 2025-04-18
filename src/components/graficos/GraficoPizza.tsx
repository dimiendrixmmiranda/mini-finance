import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF4444"];

interface GraficoPizzaProps<T> {
    array: T[];
    chaveNome: keyof T;
    chaveValor: keyof T;
    titulo: string
}

export default function GraficoPizza<T>({ array, chaveNome, chaveValor, titulo }: GraficoPizzaProps<T>) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold mb-4 text-black text-center">{titulo}</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={array}
                        dataKey={String(chaveValor)}
                        nameKey={String(chaveNome)}
                        outerRadius={90}
                        label
                    >
                        {array.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
