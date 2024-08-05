import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {
    const [rec, setReceiver] = useState('');
    const [msg, setMsg] = useState('');
    const [allMsg, setAllMsg] = useState([]);
    const [group, setGroup] = useState('');

    const socket = useMemo(() => io("http://localhost:8080"));

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Client Side Connected', socket.id);
        });

        socket.on("welcome", (msg) => { console.log(msg) })
        socket.on("greeting", (msg) => { console.log(msg) })
        socket.on('receive-message', (msg) => { setAllMsg(prev => [...prev, msg]) })
    }, [group])


    const hendalsubmit = (event) => {
        event.preventDefault()
        socket.emit('message', {
            receiver: rec,
            message: msg
        });
    }

    const hendalGroupsubmit = (e) => {
        e.preventDefault();

        socket.emit('join-group', group)
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
            {
                allMsg.map((v) => (
                    <p>{v}</p>
                ))
            }
            <form onSubmit={hendalGroupsubmit}>
                <input
                    type="text"
                    id='rec'
                    placeholder="Enter group"
                    onChange={(e) => setGroup(e.target.value)}
                />
                <input type="submit" />
            </form>
            <br></br>
            <form onSubmit={hendalsubmit}>
                <input
                    type="text"
                    id='rec'
                    placeholder="Enter receiver id"
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <input
                    type="text"
                    id='msg'
                    placeholder="Type a message"
                    onChange={(e) => setMsg(e.target.value)}
                />
                <input type="submit" />
            </form>
        </>
    );
}

export default Chat;