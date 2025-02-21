import React, { useEffect, useState } from 'react'
export default function Chat()
{
    const [ws,setWs]=useState(null);
    const [onlinePeople,setOnlinePeople]=useState([]);
    useEffect(()=>{
        const ws=new WebSocket('ws://localhost:1234')
        setWs(ws);
        ws.addEventListener('message',handleMessage)
    },[])

    function showOnlinePeople(peopleArray){
        const people={};
        peopleArray.forEach(({userId,username})=>{
            people[userId]=username;
            console.log(userId)
        })
        setOnlinePeople(people);
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        console.log("Received message from WebSocket:", messageData);
    
        if ('online' in messageData) {
            console.log("Online users list:", messageData.online);
            showOnlinePeople(messageData.online);
        }
    
    
    }
    return (
        <div className='flex h-screen'>
            <div className="bg-blue-100 w-1/3 p-2">
            {Object.keys(onlinePeople).map((userId) => (
                <div key={userId} className="bg-white p-2 my-1 rounded shadow-sm">
                    {onlinePeople[userId]}
                </div>
            ))}
            </div>
            <div className=" flex flex-column bg-blue-300 w-2/3 p-2">
            <div className='flex-grow'>
                msg with selected person
            </div>
                <div className='flex gap-2 w-full'>
                    <input type="text" placeholder='Type your message here rounded-sm' 
                    className="bg-white  flex-grow border p-2 rounded-sm" />
                    <button type="submit" className="bg-black p-2 text-white rounded-sm w-10 h-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="w-5 h-5 rounded-sm">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}