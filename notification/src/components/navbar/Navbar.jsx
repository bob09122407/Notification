import "./navbar.css";
// import Notification from "../../img/notification.svg";
import imageUrl from "../../img/avatar1.jpg";
import {GrNotification} from 'react-icons/gr'


import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <div className="notification11">
        <img src={imageUrl} alt="notification" className="Logo" />
        <span>{`${senderName} ${action} your post.`}</span>
      </div>
    );
    
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Notify App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
        <GrNotification className="iconImg1"  />
          {
notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        // <div className="notifications">
        //   {notifications.map((n) => displayNotification(n))}
        //   <button className="nButton" onClick={handleRead}>
        //     Mark as read
        //   </button>
        // </div>
        <div className="notification-panel">
        <div class="notification-header">
          <h3>Notifications</h3>
        </div>
        <div className="notification-list">
          <div className="notification-item">
         
            {notifications.map((n) => displayNotification(n))}

          <button className="nButton" onClick={handleRead}>
             Mark as read
          </button>
          </div>
        
        </div>
      </div>
      )}
    </div>
  );
};

export default Navbar;