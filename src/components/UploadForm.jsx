import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert("Uploaded: " + data.url);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Upload
      </button>
    </div>
  );
}
