import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { NoisePoint } from "../utils/Types";

function Graph({ data }: { data: NoisePoint[] }) {
    return (
      <ResponsiveContainer width='100%' height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis
            dataKey="time"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString("pl-PL")
            }
          />
          
          <YAxis />

          <Tooltip
            labelFormatter={(label) => `Time: ${label}`}
            formatter={(value) => [`${value} dB`, "Value"]}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="green"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default Graph