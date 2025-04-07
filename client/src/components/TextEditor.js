import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import socket from "../socket";

const SAVE_INTERVAL_MS = 2000;

export default function TextEditor() {
  const [quill, setQuill] = useState(null);
  const [users, setUsers] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const wrapperRef = useRef();

  const initializeQuill = useCallback(() => {
    const editorContainer = document.createElement("div");
    wrapperRef.current.innerHTML = "";
    wrapperRef.current.append(editorContainer);

    const q = new Quill(editorContainer, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      },
    });

    q.disable();
    q.setText("Loading document...");
    setQuill(q);
  }, []);

  useEffect(() => {
    initializeQuill();
  }, [initializeQuill]);

  useEffect(() => {
    if (!quill) return;

    socket.emit("get-document");

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    const handleChange = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    const handleReceive = (delta) => {
      quill.updateContents(delta);
    };

    quill.on("text-change", handleChange);
    socket.on("receive-changes", handleReceive);

    return () => {
      quill.off("text-change", handleChange);
      socket.off("receive-changes", handleReceive);
    };
  }, [quill]);

  useEffect(() => {
    if (!quill) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1200);
    }, SAVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [quill]);

  useEffect(() => {
    const handleUserCountUpdate = (count) => {
      const tempUsers = [];
      for (let i = 0; i < count; i++) {
        tempUsers.push(`U${i + 1}`);
      }
      setUsers(tempUsers);
    };

    socket.on("update-user-count", handleUserCountUpdate);

    return () => {
      socket.off("update-user-count", handleUserCountUpdate);
    };
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", position: "relative" }}>
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
        <div>{users.length} Collaborator(s)</div>
        <div style={{ display: "flex", gap: "8px" }}>
          {users.map((id, i) => (
            <div key={i} style={{ background: "#4caf50", borderRadius: "50%", width: "30px", height: "30px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {id}
            </div>
          ))}
        </div>
      </div>
      <div ref={wrapperRef} />
      {showSaved && (
        <div style={{ position: "absolute", bottom: "20px", right: "20px", background: "#4caf50", color: "white", padding: "6px 12px", borderRadius: "5px" }}>
          💾 Document saved
        </div>
      )}
    </div>
  );
}
