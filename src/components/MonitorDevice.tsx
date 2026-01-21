import Graph from "./Graph"
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";
import { DeviceContext } from "../utils/Contexts";
import { useRef, useMemo } from "react";

function MonitorDevice() {
    const MAX = 100;
    const auth = useAuth();
    const {id} = useParams();
    const [selectedDevice, setSelectedDevice] = useState("");
    const deviceContext = useContext(DeviceContext);
    const socketRef = useRef<WebSocket | null>(null);
    const [allNoises, setAllNoises] = useState<{device_id: string, time: string, value: number}[]>([]);
    const [allMeans, setAllMeans] = useState<{device_id: string, time: string, value: number}[]>([]);
    const [allDiffs, setAllDiffs] = useState<{device_id: string, time: string, value: number}[]>([]);
    const [allFreqs, setAllFreqs] = useState<{device_id: string, time: string, value: number}[]>([]);

    useEffect(() => {
        console.log(auth.user?.profile["cognito:username"]);
        const ws = new WebSocket(
            `wss://cyqb7ia4zl.execute-api.eu-north-1.amazonaws.com/dev/?user_id=${auth.user?.profile["cognito:username"]}`
        );

        socketRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const receivedAt = new Date();

            if (data.parameter === 'noise') {
                setAllNoises(prev => [
                    ...prev.slice(-MAX + 1),
                    {
                        device_id: data.device_id,
                        time: receivedAt.toISOString(),
                        value: data.value
                    }
                ]);

            } else if (data.parameter === 'mean_noise') {
                setAllMeans(prev => [
                    ...prev.slice(-MAX + 1),
                    {
                        device_id: data.device_id,
                        time: receivedAt.toISOString(),
                        value: data.value
                    }
                ]);

            } else if (data.parameter === 'diff') {
                setAllDiffs(prev => [
                    ...prev.slice(-MAX + 1),
                    {
                        device_id: data.device_id,
                        time: receivedAt.toISOString(),
                        value: data.value
                    }
                ]);

            } else if (data.parameter === 'freq') {
                setAllFreqs(prev => [
                    ...prev.slice(-MAX + 1),
                    {
                        device_id: data.device_id,
                        time: receivedAt.toISOString(),
                        value: data.value
                    }
                ]);

            }
        } catch (err) {
            console.error("Invalid WS message", err);
        }
        };

        ws.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            ws.close();
        };
    }, [auth.user?.profile["cognito:username"]]);
    
    const noises = useMemo(() => {
        if (!selectedDevice) return [];
        return allNoises.filter(
            n => n.device_id === selectedDevice
        );
    }, [allNoises, selectedDevice]);

    const means = useMemo(() => {
        if (!selectedDevice) return [];
        return allMeans.filter(
            m => m.device_id === selectedDevice
        );
    }, [allMeans, selectedDevice]);

    const diffs = useMemo(() => {
        if (!selectedDevice) return [];
        return allDiffs.filter(
            d => d.device_id === selectedDevice
        );
    }, [allDiffs, selectedDevice]);

    const freqs = useMemo(() => {
        if (!selectedDevice) return [];
        return allFreqs.filter(
            d => d.device_id === selectedDevice
        );
    }, [allFreqs, selectedDevice]);

    if (!auth.isAuthenticated) {
        return (
            <>
                <div className="container">
                    <h1>Monitor device</h1>
                    <Link to={'/login'}>Log in first!</Link>
                </div>
            </>
        )
    }

    return (
        <>
        <div className="stats-container">
            <h1>Monitor device</h1>
            <form action="">
                {!id && 
                <>
                <label htmlFor="device-name">Select device</label> <br />
                <select id="light" name="light" value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} required>
                    <option value="" disabled>
                        --- select device ---
                    </option>
                    {deviceContext?.devices.map((d: any) => (
                        <option key={d.device_id} value={d.device_id}>{d.device_id}</option>
                    ))}
                </select> <br />
                </>
                }
                {
                id && <h2>{id}</h2>
                }
            </form>

            {noises.length > 0 && <>
                <h2>Noise level</h2>
                <p>Current noise level: {noises.at(noises.length - 1)?.value} dB</p>
                <Graph data={noises}></Graph>
            </>}
            {means.length > 0 && <>
                <h2>Mean noise level</h2>
                <p>Mean noise level: {means.at(means.length - 1)?.value} dB</p>
                <Graph data={means}></Graph>
            </>}
            {diffs.length > 0 && <>
                <h2>Differences</h2>
                <p>Difference: {diffs.at(diffs.length - 1)?.value} %</p>
                <Graph data={diffs}></Graph>
            </>}
            {freqs.length > 0 && <>
                <h2>Frequencies</h2>
                <p>Frequency: {freqs.at(freqs.length - 1)?.value} Hz</p>
                <Graph data={freqs}></Graph>
            </>}
        </div>
        </>
    )
}

export default MonitorDevice