# IoT Noise Monitoring System – Server Application

## 📖 Project Overview

This project implements a complete **IoT-based noise monitoring system** capable of measuring, processing, storing, and visualizing acoustic data in real time.

The system consists of:

- 📟 **IoT measurement device** (ESP32-S3 based)
- ☁ **Cloud-based backend infrastructure (AWS)**
- 🌐 **Web server application**
- 📱 **Mobile application**

The web server application acts as the **central system component**, responsible for:

- Device management
- Real-time monitoring
- Historical data visualization
- Configuration management
- Secure user authentication

All user data is processed and stored within **Amazon Web Services (AWS) cloud infrastructure**.

## 🧠 System Concept

### General Architecture

The system is designed as a distributed IoT solution:

1. **IoT Device Layer**
   - Analog microphone with amplifier
   - ESP32-S3 microcontroller
   - OLED display
   - LED signaling system

2. **Cloud Backend (AWS)**
   - Secure authentication
   - Data aggregation
   - Persistent storage (database)
   - Real-time data processing

3. **Web Application**
   - Device management
   - Real-time monitoring dashboard
   - Historical analytics
   - Configuration interface

4. **Mobile Application**
   - Historical data visualization
   - Device configuration
   - WiFi pairing
   - Push notifications

### 🎯 Project Goal

The goal was to create an IoT system capable of:

- Real-time noise measurement
- Acoustic signal analysis using FFT
- Cloud-based storage and aggregation
- Real-time monitoring
- Remote configuration
- Automatic alerting when noise thresholds are exceeded

## 🔊 IoT Device Functionality

The hardware module is built on **ESP32-S3** and includes:

### ✔ Real-Time Sound Processing
- Noise level calculation in **decibels (dB)**
- Dominant frequency detection using **Fast Fourier Transform (FFT)**
- Periodic transmission of data to the server

### ✔ Local Data Presentation
- Numeric display of noise level on OLED screen
- Graphical visualization of sound intensity
- LED status signaling

### ✔ Alarm System
- Detection of exceeded noise threshold
- LED color change
- Push notification sent to the user

---

## 🌐 Server Application

The web server application is the **central management and analytics component** of the system.

It enables:

- Secure authentication
- IoT device management
- Configuration of system parameters
- Real-time monitoring
- Historical data analysis
- Cloud-based storage and aggregation

All data is processed and stored in **AWS cloud infrastructure**, ensuring scalability, availability, and security.

---

## 🔐 Authentication & User Account Management

The application uses **AWS authentication services** to ensure secure user management.

### Users can:

- Create a new account
- Log in securely
- Log out

Access to application functionality is available **only after successful authentication**.

Security benefits include:

- Encrypted credential handling
- Protection against unauthorized access
- Cloud-managed authentication mechanisms

---

## 📡 IoT Device Management

After logging in, users gain access to their assigned IoT devices.

Each device represents an independent noise measurement module installed in a specific room.

### The application allows:

- Viewing the list of assigned devices
- Checking current device status
- Modifying device configuration parameters

### Configurable parameters include:

- Maximum allowed noise threshold
- LED signaling state
- Other operational parameters

This allows full remote control of deployed IoT modules.

---

## 📊 Historical Data Visualization

The web application provides advanced data analysis tools based on stored historical measurements.

Data is presented using **interactive charts**, enabling intuitive time-based analysis.

Available charts include:

- 📈 Noise level (noise)
- 📉 Mean noise level (mean noise)
- 🔄 Noise level difference (difference)
- 🎵 Dominant acoustic frequency (frequency)

Users can:

- Select custom time ranges
- Perform short-term and long-term analysis
- Identify acoustic patterns

All historical data is aggregated and stored in a cloud database.

---

## ⚡ Real-Time Device Monitoring

One of the key features of the web application is **real-time monitoring**.

Measurements sent by IoT devices are displayed with **minimal latency**.

### Real-time monitoring includes:

- Current noise level
- Current dominant frequency
- Dynamically updating charts
- Visual device status indicators

This enables immediate response to:

- Noise threshold exceedance
- Sudden acoustic events
- Environmental condition changes

---

## 🧩 Functional Scope

### ✔ Sound Measurement & Processing
- Real-time decibel calculation (dB)
- Dominant frequency detection using FFT

### ✔ Local Visualization
- Numeric OLED display
- Graphical OLED chart

### ✔ Mobile Application
- Historical charts
- IoT configuration
- WiFi pairing
- Push notifications
- Threshold configuration

### ✔ Server Application
- Real-time monitoring
- Historical analytics
- Cloud storage
- Remote configuration

### ✔ Alarm System
- Threshold detection
- LED signaling
- Push notifications

### ✔ Communication & Data Archiving
- Secure cloud communication
- Data aggregation
- Persistent database storage

---

## ☁ Cloud Infrastructure (AWS)

The system leverages **Amazon Web Services (AWS)** for:

- Authentication services
- Data storage
- Scalability
- Security
- Cloud hosting
- Backend processing

Cloud infrastructure ensures:

- High availability
- Secure user data management
- Scalability for multiple devices and users

---

## 🧱 Tech Stack

- ReactJS + Vite (TypeScript, HTML, CSS)
- using REST API provied by AWS backend
- using stream so as to receive data real-time

---

## 🚀 Live
🔗 https://main.d3i7a80okmdymt.amplifyapp.com/
