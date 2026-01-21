export type Device = {
    device_id: string,
    owner_id: string,
    threshold: number,
    led_disable: boolean,
    led_off: boolean,
    diff_level: number
}

export type NoiseMeasurement = {
    user_id: string,
    device_id: string,
    parameter: string,
    value: number
}

export type NoisePoint = {
    device_id: string;
    time: string;
    value: number;
};
