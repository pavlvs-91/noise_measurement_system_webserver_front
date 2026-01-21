import { Link } from "react-router";
import { useAuth } from "react-oidc-context";
import { useRef, useContext, useEffect, useState } from "react";
import type { Device } from "../utils/Types";
import { DeviceContext } from "../utils/Contexts";

function MyDevices() {
    const deviceContext = useContext(DeviceContext);
    const socketRef = useRef<WebSocket | null>(null);
    const [noises, setNoises] = useState<{device_id: string, noise: number}[]>([]);
    const auth = useAuth();

    useEffect(() => {
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

            if (data.parameter === 'noise') {
                setNoises((prev: any) => {
                    const filtered = prev.filter(
                        (n: any) => n.device_id !== data.device_id
                    );

                    return [
                        ...filtered,
                        {
                            device_id: data.device_id,
                            noise: data.value
                        }
                    ];
                });
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

    function computeLightStatus(led_off: boolean, led_disable: boolean): string {
        if (led_disable) {
            return "Disabled";
        } else {
            return led_off ? "Off" : "On";
        }
    }

    if (!auth.isAuthenticated) {
        return (
            <div className="container">
                <h1>My devices</h1>
                <Link to="/login">Log in first!</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>My devices</h1>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Noise</th>
                    <th>Threshold</th>
                    <th>Light status</th>
                    <th>Configure device</th>
                    <th>Statistics</th>
                </tr>

                {deviceContext?.devices.map((device: Device) => (
                    <tr key={device.device_id}>
                        <td style={{fontWeight: 'bold'}}>
                            {device.device_id}
                        </td>
                        <td>{noises.find((n: any) => n.device_id === device.device_id)?.noise}</td>
                        <td>{device.threshold} dB</td>
                        <td>{computeLightStatus(device.led_off, device.led_disable)}</td>
                        <td>
                            <Link to={`/configure-device/${device.device_id}`} style={{color: 'white'}}>
                                <button>CONFIG</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/statistics/${device.device_id}`} style={{color: 'white'}}>
                                <button style={{backgroundColor: 'green'}}>STATS</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default MyDevices;
