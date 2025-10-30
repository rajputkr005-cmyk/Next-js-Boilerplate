'use client';
import { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('nexus-username');
    if (saved) {
      setUserName(saved);
      fetchMessages();
    }

    const interval = setInterval(() => {
      if (userName) fetchMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, [userName]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.log("Fetch error:", e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !userName) return;
    const msg = input.trim();
    setInput('');

    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, message: msg }),
    });
    fetchMessages();
  };

  const setUsername = () => {
    if (name.trim()) {
      const final = name.trim();
      localStorage.setItem('nexus-username', final);
      setUserName(final);
      setName('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!userName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <h1 className="text-4xl font-bold text-purple-500 text-center mb-6">NEXUS CHAT</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setUsername()}
            className="w-full p-4 rounded-lg bg-gray-700 text-white text-lg mb-4"
          />
          <button
            onClick={setUsername}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg text-lg"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-purple-500 text-center">NEXUS CHAT</h1>
        <p className="text-sm text-gray-400 text-center">Logged in as: <strong>{userName}</strong></p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.name === userName ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.name === userName ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'}`}>
              {msg.name !== userName && <p className="text-xs font-bold opacity-70">{msg.name}</p>}
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-800 p-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white"
        />
        <button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold">
          Send
        </button>
      </div>
    </div>
  );
}