import React, { useState, useEffect } from 'react';
import styles from "../styles/Chat.module.css";
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { username} = useAuth();

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages', {
        credentials: 'include'
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {

    try {
      await fetch('http://localhost:8080/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user: username, message })
      });

      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const clearMessages = async () => {
    if (!window.confirm('Are you sure you want to clear the chat?')) return;

    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to clear chat');
      fetchMessages();
    } catch (error) {
      console.error('Clear chat error:', error);
      alert('Could not clear chat. Try again.');
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`${styles.message} ${msg.user === username ? styles.user : styles.other}`}
          >
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.messageInput}>
          {username}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={styles.messageInput}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
        <button
          onClick={clearMessages}
          className={styles.sendButton}
          style={{ backgroundColor: '#e74c3c', marginLeft: '0.5rem' }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Chat;
