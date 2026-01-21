import './css/App.css'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import MyDevices from './components/MyDevices'
import MonitorDevice from './components/MonitorDevice'
import ConfigureDevice from './components/ConfigureDevice'
import Statistics from './components/Statistics'
import type { Device } from './utils/Types'
import { useState, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { DeviceContext } from './utils/Contexts'

function App() {
  const auth = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);

  const refreshDevices = () => {
    if (!auth.isAuthenticated) return;

    fetch("https://jxj9zqgdmj.execute-api.eu-north-1.amazonaws.com/device", {
      headers: {
        Authorization: auth.user?.access_token || "",
      },
    })
      .then(res => res.json())
      .then(data => {
        setDevices(data.devices);
      });
  };

  useEffect(() => {
    refreshDevices();
  }, [auth.isAuthenticated]);

  return (
    <>
      <DeviceContext.Provider value={{ devices, refreshDevices }}>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='my-devices' element={<MyDevices />} />
            <Route path='monitor-device/' element={<MonitorDevice />} />
            <Route path='monitor-device/:id' element={<MonitorDevice />} />
            <Route path='configure-device/:id' element={<ConfigureDevice />} />
            <Route path='configure-device/' element={<ConfigureDevice />} />
            <Route path='statistics/:id' element={<Statistics />} />
            <Route path='statistics/' element={<Statistics />} />
          </Route>
        </Routes>
      </DeviceContext.Provider>
    </>
  )
}

export default App
