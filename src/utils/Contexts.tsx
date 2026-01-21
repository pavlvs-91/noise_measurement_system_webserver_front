import { createContext } from "react";
import type { Device } from "./Types";

export const DeviceContext = createContext<{
    devices: Device[];
    refreshDevices: () => void;
}>({
    devices: [],
    refreshDevices: () => {},
});