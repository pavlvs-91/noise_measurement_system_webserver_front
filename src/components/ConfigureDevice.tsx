import { useAuth } from "react-oidc-context"
import { Link } from "react-router"
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { DeviceContext } from "../utils/Contexts";

function ConfigureDevice() {
    const {id} = useParams();
    const auth = useAuth();
    const deviceContext = useContext(DeviceContext);
    const [selectedDevice, setSelectedDevice] = useState("");
    const [noise, setNoise] = useState(0);
    const [lightOff, setLightOff] = useState(true);
    const [disableLight, setDisableLight] = useState(false);

    useEffect(() => {
        if(id){
            const device = deviceContext?.devices.find((d: any) => d.device_id === id);
            setLightOff(device?.led_off ?? false);
            setDisableLight(device?.led_disable ?? false);
        } else if (selectedDevice) {
            const device = deviceContext?.devices.find((d: any) => d.device_id === selectedDevice);
            setLightOff(device?.led_off ?? false);
            setDisableLight(device?.led_disable ?? false);
        }
    }, [id, selectedDevice, deviceContext?.devices]);

    function handleNoiseSave(e: any) {
        e.preventDefault();
        fetch('https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/threshold', {
            method: 'POST',
            headers: {
                Authorization: auth.user?.access_token || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                device_id: id ? id : selectedDevice,
                threshold: noise,
                send: true
            })
        }).then(() => { alert('Noise threshold updated!'); deviceContext.refreshDevices(); })
          .catch(err => alert(err));
    }

    function handleLightToggle() {
        const newValue = !lightOff;
        setLightOff(newValue);
        fetch('https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/led_off', {
            method: 'POST',
            headers: {
                Authorization: auth.user?.access_token || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                device_id: id ? id : selectedDevice,
                led_off: Number(newValue),
                send: true
            })
        }).then(() => { alert('Lights functionality changed!'); deviceContext.refreshDevices(); })
          .catch(err => alert(err));
    }

    function handleDisableLight() {
        const newValue = !disableLight;
        setDisableLight(newValue);
        fetch('https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/led_disable', {
            method: 'POST',
            headers: {
                Authorization: auth.user?.access_token || "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                device_id: id ? id : selectedDevice,
                led_disable: Number(newValue),
                send: true
            })
        }).then(() => { alert('Lights changed!'); deviceContext.refreshDevices(); })
          .catch(err => alert(err));
    }

    if (!auth.isAuthenticated) {
        return (
            <>
                <div className="container">
                    <h1>Configure device</h1>
                    <Link to={'/login'}>Log in first!</Link>
                </div>
            </>
        )
    }

    return (
        <>
        <div className="container">
            <h1>Configure device</h1>
            
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

                <label htmlFor="noise-threshold">Noise threshold</label> <br />
                <input type="number" name="noise-threshold" id="noise-threshold" placeholder="0" min={0} max={120} required onChange={(e) => setNoise(parseInt(e.target.value))} /> <br />
                <button onClick={handleNoiseSave}>Save noise thr</button> <br />
            </form>

            <button style={{backgroundColor: lightOff ? 'green' : 'red'}} onClick={handleLightToggle} disabled={disableLight}>
                Turn {lightOff ? "on" : "off"} light
            </button> <br />
            <button style={{backgroundColor: disableLight ? 'orange' : 'blue'}} onClick={handleDisableLight}>
                {disableLight ? "Enable" : "Disable"} light
            </button>
        </div>
        </>
    )
}

export default ConfigureDevice