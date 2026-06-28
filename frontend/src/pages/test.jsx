import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import mediaUpload from "../utils/mediaUpload";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaWR1Y21weHRzcHh2b2Z1cHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNTIxMTAsImV4cCI6MjA5NzYyODExMH0.QoOZTLOTEUp9Az8oy2YwNVu8EpCwVK0mTOWjvcx81d0";
const supabaseUrl = "https://vhiducmpxtspxvofupul.supabase.co";
const supabase = createClient(supabaseUrl, anonKey);
const publicUrl = null;

export default function TestPage() {

    //file input ui

    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        setFile(e.target.files[0]);
        console.log(e);
    }

    async function uploadImage() {

        publicUrl = await mediaUpload(file);
        console.log(publicUrl);
    }



    return (
        <div className="w-full min-h-screen bg-primary flex items-center justify-center">
            <input type="file" onChange={handleFileChange} />
            {file && <p>Selected file: {file.name}</p>}

            <button onClick={uploadImage} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Upload Image</button>



             <div className="w-full min-h-screen bg-primary flex items-center justify-center">
            <img src={publicUrl} alt="Uploaded" />
            </div>

        </div>

       

    );
}