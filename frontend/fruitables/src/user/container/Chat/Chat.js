import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {
    const socket = useMemo(() => io("http://localhost:8080"));

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Client Side Connected', socket.id);
        });

        socket.on("welcome", (msg) => { console.log(msg) })
        socket.on("greeting", (msg) => { console.log(msg) })
    }, [])
    //give value from form
    

    const hendalsubmit = (event) => {
        event.preventDefault()

        const id = document.getElementById("id").value
        const message = document.getElementById("message").value

        console.log(id,message);

        
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            <br></br><br></br>
            <form onSubmit={hendalsubmit}>
                <input type="text" name="id" id='id' placeholder="Enter id"/>
                <input type="text" name="message" id='message' placeholder="Type a message"/>
                <button type="submit">Send</button>
            </form>
        </>

    );
}

export default Chat;