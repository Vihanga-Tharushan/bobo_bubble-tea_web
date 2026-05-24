import { useState } from "react";

export default function TestPage() {

    const [count, setCount] = useState(10);
    const [status, setStatus] = useState("Online");

    return (
        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-secondary">
            <div className="w-125 h-125 bg-primary border border-accent rounded-[10px] flex items-center justify-center">
                <button className="w-25 h-10 bg-accent text-white rounded" onClick = {() => setCount(count - 1)}>-</button>
                <span className="mx-10">{count}</span>
                <button className="w-25 h-10 bg-accent text-white rounded" onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div className="w-125 h-125 bg-primary border border-accent rounded-[10px] flex items-center justify-center ml-10">

                <span className="mx-10">{status}</span>

                <button className="w-25 h-10 bg-accent text-white rounded ml-10 flex items-center justify-center cursor-pointer" onClick={() => setStatus("Online")}>
                    <span>Online</span>
                </button>
                <button className="w-25 h-10 bg-accent text-white rounded ml-10 flex items-center justify-center cursor-pointer" onClick={() => setStatus("Offline")}>
                    <span>Offline</span>
                </button>
                <button className="w-25 h-10 bg-accent text-white rounded ml-10 flex items-center justify-center cursor-pointer" onClick={() => setStatus("Deactive")}>
                    <span>Deactive</span>
                </button>
               
            </div>
        </div>
    );
}