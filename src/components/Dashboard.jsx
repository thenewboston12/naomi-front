import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// styling with custom CSS module:
//import styles from "./Dashboard.module.css";
import "./Dashboard.css";

// some constant HTML elements for displaying
const U_HTML_L = '<div class="d-flex justify-content-end mb-4"> <div class="msg_container_send">'
const U_HTML_M = '<span class="msg_time_send">'
const U_HTML_R = '</span></div><div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"/></div></div>'
const B_HTML_L = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" class="rounded-circle user_img_msg"></div><div class="msg_container">'
const B_HTML_M = '<span class="msg_time">'
const B_HTML_R = '</span></div></div>'
const FIRST_GREETING = 'Hello! I am a Neural Agent for Obesity Motivational Interviewing, but you can call me Naomi. I am designed to provide counseling with a focus on weight loss. Ask me anything you would like regarding weight loss.'

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

  // chatbot logic
  const [message, setMessage] = useState("");
  // to reduce storage size, change 'chats'  to 'htmlChats' because it contains lots of HTML
  // and create separate messages/chats for database purposes.
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const getDate = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return hour+ ":"+minute;
  }
 
  const appendUser = (userHtml) => {
    console.log("Appending message...")
    setChats(prevMessages => [...prevMessages, userHtml]);
  };

  const appendBot = (botHtml) => {
    console.log("Appending BOT message...")
    setChats(prevMessages => [...prevMessages, botHtml]);
  };

  const first_greeting_html = B_HTML_L + FIRST_GREETING +B_HTML_M + getDate() + B_HTML_R;

  const chat = async (e, message) => {
    e.preventDefault();

    // my added code
    const str_time =  getDate()

    //append User's message
    var userHtml =  U_HTML_L+ message + U_HTML_M + str_time + U_HTML_R;
    appendUser(userHtml);

    setMessage("");
    setIsTyping(true);
    scrollTo(0, 1e10);

    // let msgs = chats;
    // msgs.push({ role: "user", content: message });
    // setChats(msgs);




    try {
      setIsTyping(true);

      //
      //   const apiUrl = "https://naomi.cs.wayne.edu:5001/get_answer";
      //   const response = await fetch(apiUrl, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       question: message,
      //       chat_history: chats,
      //     }),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      //   const jsonData = await response.json();
      // COMMENT: fake Delay:
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("response  arrived!");
      const dummy_jsonData = {
        character_count: 19,
        response: "Hello From Chatbot!",
      };
      
      console.log(dummy_jsonData.response);

      var bot_text = dummy_jsonData.response;
      var botHtml = B_HTML_L + bot_text +  B_HTML_M+ str_time +B_HTML_R ;
      
      appendBot(botHtml);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsTyping(false);
      console.log("Data fetching completed!");
    }

    setIsTyping(false);
    //scrollTo(0, 1e10);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card  m-card" >
            {/* HEAD */}
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"
                    className="rounded-circle user_img"
                  />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>NAOMI</span>
                  <p>Ask me anything!</p>
                </div>
              </div>
            </div>

            {/* MESSAGES */}

            <div id="messageFormeight" className="card-body msg_card_body">
            {/* Render existing messages */}
            <div key={100000} dangerouslySetInnerHTML={{ __html: first_greeting_html }} />
            {chats.map((message, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: message }} />
            ))}

            </div>

            {/* FOOTER INPUT PART */}
            <div className="card-footer">
              <form
                id="messageArea"
                className="input-group"
                action=""
                onSubmit={(e) => chat(e, message)}
              >
                <input
                  type="text"
                  id="text"
                  name="message"
                  value={message}
                  placeholder="Type your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="off"
                  className="form-control type_msg"
                  required
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    id="send"
                    className="input-group-text send_btn"
                  >
                    <i className="fas fa-location-arrow"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
