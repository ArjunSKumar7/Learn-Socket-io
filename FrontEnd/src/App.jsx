import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./App.css";

const socket = io.connect("http://localhost:3000");
function App() {
  const [userName, setUserName] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [message, setMessages] = useState([]);
  const [newMessages, setnewMessages] = useState("");

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
      // setMessages([...message, message]);
      
    })
    console.log(message);
  },[message,socket])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const messageData = {
      user: userName,
      message: newMessages,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };
if(!newMessages==""){
  socket.emit("send-message", messageData);
 
}else{
  alert("please enter a message")
}
setnewMessages("")
 
  }

  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
        {chatActive ? (
          <div className="rounded-md w-full p-2 md:w-[80vw] lg:w-[40vw]">
            <h1 className="text-center font-bold text-xl my-2 uppercase" >chat App</h1>
            <div>
              <div className="overflow-scroll h-[80vh] lg:h-[60vh]">
                {message.map((message, index) => {
                  return ( <div key={index} className={`flex rounded-md shadow-md my-5 w-fit ${userName === message.user && "ml-auto"}`}>
                    <div className="bg-green-400 flex justify-center items-center rounded-l-md" >
                 <h3 className="font-bold text-lg px-2"> {
                    message.user.charAt(0).toUpperCase() + message.user.slice(1)
                  }
                  </h3>
                    </div>
                    <div className="px-2 bg-white rounded-md">
                      <span className="text-sm">{message.user}</span>
                      <h3 className="font-bold">{message.message}</h3>
                      <h3 className="text-xs text-right">{message.time}</h3>
                    </div>
                  </div>);
                })}
              </div>
              <form className="flex gap-2 md:gap-4 justify-between  " onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="type your message"
                  className=" w-full text-center px-3 py-2 outline-none border-2 rounded-md"
                  value={newMessages}
                  onChange={(e) => setnewMessages(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
                >
                  send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-center gap-2">
            <input
              type="text"
              name=""
              id=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-center px-3 py-2 outline-none border-2 rounded-md"
            ></input>
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
              onClick={() => !userName == "" && setChatActive(true)}
            >
              start Chat
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
