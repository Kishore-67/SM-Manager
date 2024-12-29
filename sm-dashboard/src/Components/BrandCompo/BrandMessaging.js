import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "../../Styles/messages.css";

const BrandMessaging = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Joe Swanson",
      profilePic: "https://via.placeholder.com/50",
      lastMessage: "You didn’t get any ice cream?",
      messages: [{ sender: "Joe", text: "You didn’t get any ice cream?", type: "received" }],
    },
    {
      id: 2,
      name: "Meg Griffin",
      profilePic: "https://via.placeholder.com/50",
      lastMessage: "Good Chris. I’ve taught you well.",
      messages: [{ sender: "Meg", text: "Good Chris. I’ve taught you well.", type: "received" }],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    if (currentMessage.trim() && selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              lastMessage: currentMessage,
              messages: [...user.messages, { sender: "You", text: currentMessage, type: "sent" }],
            }
          : user
      );
      setUsers(updatedUsers);
      setSelectedUser({
        ...selectedUser,
        messages: [
          ...selectedUser.messages,
          { sender: "You", text: currentMessage, type: "sent" },
        ],
      });
      setCurrentMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleEmojiClick = (event, emojiObject) => {
    setCurrentMessage(currentMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="brandauth-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Users</h3>
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? "active" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.profilePic} alt={user.name} className="profile-pic" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="last-message">{user.lastMessage}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h3>Chat with {selectedUser.name}</h3>
            </div>
            <div className="messages-list">
              {selectedUser.messages.map((msg, index) => (
                <div key={index} className={`message-item ${msg.type}`}>
                  <strong>{msg.sender}</strong>: {msg.text}
                </div>
              ))}
            </div>
            <div className="input-area">
              <button
                className="emoji-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="send-btn">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="placeholder">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default BrandMessaging;
