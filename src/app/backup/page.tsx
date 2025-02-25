"use client";

import { useState } from "react";
import { getCustomers } from "../../lib/indexedDB";

export default function Backup() {
  const [status, setStatus] = useState("");

  const handleBackup = async () => {
    setStatus("Backing up data...");

    // Get IndexedDB data
    const customers = await getCustomers();

    if (customers.length === 0) {
      setStatus("No data to backup.");
      return;
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwjoShz8xzzhf3JBEC2wf8FCq3VJiJQSuD2lTk4eHWR52vKjhyK4kIF18UfC5iZXqEf/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customers),
      });

      if (response.ok) {
        setStatus("Backup successful!");
      } else {
        setStatus("Backup failed. Try again.");
      }
    } catch (error) {
      console.error("Backup error:", error);
      setStatus("Error connecting to Google Sheets.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Backup Data</h1>
      <button
        onClick={handleBackup}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Backup to Google Sheets
      </button>
      {status && <p className="mt-3 text-gray-700">{status}</p>}
    </div>
  );
}
