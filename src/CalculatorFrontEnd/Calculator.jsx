import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { io } from "socket.io-client";
import Input from './Components/Input/Input';
import CalculationLogs from './Components/CalculationLogs/CalculationLogs';
import 'bootstrap/dist/css/bootstrap.css';

const socket = io("localhost:5000");

function App() {
    const [logs, setLogs] = useState(["Not connect to server."]);

    useEffect(() => {
        socket.on("update", data =>{
          console.log("update")
          setLogs(data);
        })
      }, []);

    return (
        <div>
            <br></br>
            <h1>Calculator app exercise - Sezzle</h1>
            <Input socket={socket}/>
            <p>Show the last 10 calculations descending. Support open on multiple tabs within a browser simultaneously. Results remain between sessions.</p>
            <h3>Calculation logs:</h3>
            <CalculationLogs logs={logs}/>
        </div>
    );
}

export default App;