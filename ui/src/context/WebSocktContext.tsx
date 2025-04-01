import { createContext, useContext, useEffect, useState } from "react";

interface WebSocketContextType {
  transcript: string;
  connectWebSocket: () => WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [transcript, setTranscript] = useState<string>("");

  const connectWebSocket = () => {
    if (ws) return ws; // If already connected, return existing WebSocket

    console.log("Connecting WebSocket...");
    const newWs = new WebSocket("ws://localhost:8000/ws");

    newWs.onmessage = (event) => {
      console.log("Received message:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.status === "transcribing") {
          setTranscript((prev) => prev + " " + data.text); // Append new transcript
        } else if (data.status === "completed") {
          setTranscript(data.full_transcript);
        }
      } catch (err) {
        console.error("Error parsing response:", err);
      }
    };

    newWs.onclose = () => console.log("WebSocket closed");
    setWs(newWs);
    return newWs;
  };

  return (
    <WebSocketContext.Provider value={{ transcript, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
