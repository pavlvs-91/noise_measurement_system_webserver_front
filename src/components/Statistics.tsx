import { useAuth } from "react-oidc-context";
import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { DeviceContext } from "../utils/Contexts";
import StaticGraph from "./StaticGraph";

function Statistics() {
    const auth = useAuth();
    const {id} = useParams();
    const [selectedDevice, setSelectedDevice] = useState("");
    const [noises, setNoises] = useState<any[]>([]);
    const [means, setMeans] = useState<any[]>([]);
    const [diffs, setDiffs] = useState<any[]>([]);
    const [freqs, setFreqs] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const deviceContext = useContext(DeviceContext);

    useEffect(() => {
            if (!auth.isAuthenticated) return;

            const dev = id ? id : selectedDevice;            
            if (dev && auth.isAuthenticated && startDate && endDate) {
    
                fetch(`https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/noise?from=${startDate}&to=${endDate}&device=${dev}`, {
                    headers: {
                        Authorization: auth.user?.access_token || "",
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setNoises(data.readings);
                    });
                
                fetch(`https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/mean?from=${startDate}&to=${endDate}&device=${dev}`, {
                    headers: {
                        Authorization: auth.user?.access_token || "",
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setMeans(data.readings);
                    });

                fetch(`https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/diff?from=${startDate}&to=${endDate}&device=${dev}`, {
                    headers: {
                        Authorization: auth.user?.access_token || "",
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setDiffs(data.readings);
                    });
                
                fetch(`https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/freq?from=${startDate}&to=${endDate}&device=${dev}`, {
                    headers: {
                        Authorization: auth.user?.access_token || "",
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setFreqs(data.readings);
                    });

                }

        }, [auth.isAuthenticated, id, selectedDevice, startDate, endDate]);

    if (!auth.isAuthenticated) {
        return (
            <>
                <div className="container">
                    <h1>Statistics</h1>
                    <Link to={'/login'}>Log in first!</Link>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="stats-container">
                <h1>Statistics</h1>

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

                <label htmlFor="start-date">Select start date</label>
                <input type="date" name="start-date" id="start-date" onChange={(e) => setStartDate(e.target.value)} /> <br />

                <label htmlFor="end-date">Select end date</label>
                <input type="date" name="end-date" id="end-date" onChange={(e) => setEndDate(e.target.value)} /> <br />
            </form>

            {noises.length > 0 && <>
                <h2>Noise graph</h2>
                <StaticGraph data={noises} />
            </>}
            {means.length > 0 && <>
                <h2>Mean noise level graph</h2>
                <StaticGraph data={means} />
            </> }
            {diffs.length > 0 && <>
                <h3>Differences graph</h3>
                <StaticGraph data={diffs} />
            </>}
            {freqs.length > 0 && <>
                <h3>Frequencies graph</h3>
                <StaticGraph data={freqs} />
            </>}
            </div>
        </>
    )
}

export default Statistics