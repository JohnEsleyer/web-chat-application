import React, { useState } from 'react';
import {over} from "stompjs";
import SockJS from "sockjs-client";



var stompClient = null;

const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([])
    const [privateChats, setPrivateChats] = useStae(new Map());
    const [userData, setUserData] = useState({
        username: "",
        receivername: "",
        connected: false,
        message:""
    });

    const handleUserName = (event) => {
        const [value] = event.target;
        setUserData({...userData, "username": value});
    }

    const registerUser = () => {
        let Sock = new SockJS("https://localhostL8080/ws");
        stompClient = Over(Sock);
        stompClient.connect({}, onConnected, onError)
    
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true})
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/user'+userData.username+'/private', onPrivateMessageReceived);
    }

    const onPublicMessageReceived = (payLoad) => {
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName, []);
                    setPrivateClass(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats({...publicChats});
                break;
        }
    }

    const onPrivateMessageReceived = (payLoad) => {
        let payloadData = JSON.parse(payload);
        if (privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list = [];
            list.push(payloadData);

            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError=(err)=>{
        console.log(err);
    }
    return (
        <div className="container">
            {userData.connected ? 
            <div className="chat-box">
                <ul>
                  <li>Chatroom</li>
                  {[...privateChats.keys()].map((name, index) => {
                    <li className="member" key={index}>
                        {name}
                    </li>
                  })}  
                </ul>
            </div>
            :
            <div className="register">
                <input
                    id="user-name"
                    placeholder="Enter the user name"
                    value={userData.username}
                    onChange={handleUsername}
                />
            </div>
            }
        </div>
    )
}

export default ChatRoom;