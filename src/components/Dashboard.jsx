// need to paste the NAOMI code here :)

import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// styling with custom CSS module: 
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate;
  // const [tdata, setTdata] = useState('no data fetched yet')

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out ");
    }
  }

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQestionCount] = useState(0);

  const questions = [
    "What is your name?",
    "What is your current weight?",
    "Do you have any medical conditions?",
    "Are you allergic to any food?",
  ];

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    const msg = message;
    setMessage("");
    setIsTyping(true);
    scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    try {
      setIsTyping(true);
      const apiUrl = "https://naomi.cs.wayne.edu:5001/get_answer";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
          chat_history: chats,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);

      msgs.push({ role: "AI", content: jsonData.response });
      setChats(msgs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsTyping(false);
      console.log("Data fetching completed!");
    }

    setIsTyping(false);
    scrollTo(0, 1e10);
  };

  return (
    <main>
        <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            {" "}
            Welcome to NAOMI! A chatbot based on Motivational Therapy
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    <h1> Weight loss inquiry</h1> 
    <section>
        {chats && chats.length? 
        chats.map((chat,index) => (
            <p key={index} className={chat.role === "user"? "user_msg" : ""}>
                <span>
                    <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>

            </p>
        ))  : ""}
    </section>
    <div className={isTyping ? "" : "hide"}> 
        <p> 
          <i>{isTyping ? "Typing" : ""}</i> 
        </p> 
      </div> 
 
      <form action="" onSubmit={(e) => chat(e, message)}> 
        <input 
          type="text" 
          name="message" 
          value={message} 
          placeholder="Type a message here and hit Enter..." 
          onChange={(e) => setMessage(e.target.value)} 
          disabled={isTyping} 
        /> 
      </form> 
   </main>
  );
}



/*

<Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            {" "}
            Welcome to NAOMI! A chatbot based on Motivational Therapy
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
*/