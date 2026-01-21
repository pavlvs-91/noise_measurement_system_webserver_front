import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type NoiseData = {
    time: string;
    value: number;
};

function StaticGraph({ data }: { data: NoiseData[] }) {
    return (
        <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="value"
                stroke="green"
                dot={false}
            />
        </LineChart>
        </ResponsiveContainer>
    );
}

export default StaticGraph;
