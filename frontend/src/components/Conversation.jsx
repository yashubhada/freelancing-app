import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Conversation = ({ participantId }) => {

    const url = "http://localhost:9171"; // API URL

    const [conversationList, setConversationList] = useState([]);

    const fetchAllConversation = async () => {
        try {
            const response = await axios.post(`${url}/conversation/allConversations/${participantId}`);
            setConversationList(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const messages = [
        { id: 1, text: 'Hello! How are you?', sender: 'me' },
        { id: 2, text: 'I’m good, thank you! How about you?', sender: 'other' },
        { id: 3, text: 'I’m great, thanks for asking!', sender: 'me' },
        { id: 4, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 5, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 6, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 7, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 8, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 9, text: 'Good to hear!', sender: 'other' },
    ];
    const [showMessages, setShowMessages] = useState(false);
    const [isOpenConversation, setIsOpenConversation] = useState(false);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (participantId) {
            fetchAllConversation();
        }
    }, [fetchAllConversation, participantId]);

    useEffect(() => {
        scrollToBottom();
    }, [isOpenConversation]);

    return (
        <>
            <section className='md:w-[200px] p-2 rounded-t-md absolute right-1 border shadow-sm bottom-0 flex justify-between items-center'>
                <div className='hidden md:flex items-center'>
                    <div className='w-8 h-8 relative'>
                        <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                        <div className='absolute right-0 bottom-0'>
                            <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                        </div>
                    </div>
                    <p className='text-sm font-medium ml-2'>Messaging</p>
                </div>
                <button onClick={() => setShowMessages(true)} className='text-base font-medium text-white bg-indigo-600 px-2 py-1 rounded-full'>
                    <i className="ri-message-2-fill"></i>
                </button>
            </section>
            {
                showMessages &&
                <section className='z-10 w-[250px] rounded-t-md absolute right-1 border shadow-sm bottom-0 bg-white overflow-y-auto max-h-[337px]'>
                    <div className='flex justify-between items-center p-2 border-b-2 fixed bg-white w-[248px]'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 relative'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                                <div className='absolute right-0 bottom-0'>
                                    <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                                </div>
                            </div>
                            <p className='text-sm font-medium ml-2'>Messaging</p>
                        </div>
                        <button onClick={() => setShowMessages(false)} className='text-xl font-medium text-white bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-full'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </div>
                    {/* conversation */}
                    <div className='mt-[50px]'>
                        {
                            conversationList.length > 0
                                ? conversationList.map((conversation) => (
                                    conversation.messages.map((ary, j) => (
                                        <div key={j} className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b' onClick={() => setIsOpenConversation(true)}>
                                            <div className='w-10 h-10 mr-2'>
                                                <img className='w-full h-full object-cover rounded-full' src={ary.userProfileImage} alt="Profile image" />
                                            </div>
                                            <div>
                                                <h1 className='text-sm text-gray-800 font-medium'>{ary.userName}</h1>
                                                <p className='text-[12px] text-gray-500 font-medium'>{new Date(ary.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    ))
                                ))
                                : <h1>No any messages</h1>
                        }

                    </div>
                </section>
            }
            {
                isOpenConversation &&
                <section className="z-20 absolute right-0 md:right-1 h-screen md:h-fit bottom-0 bg-[#fcfcfc] flex flex-col w-full md:w-[500px] md:rounded-t-md md:border">
                    <div className='flex justify-between items-center p-2 border-b mb-2'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 relative'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                                <div className='absolute right-0 bottom-0'>
                                    <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                                </div>
                            </div>
                            <p className='text-sm font-medium ml-2'>Yash patel</p>
                        </div>
                        <button onClick={() => setIsOpenConversation(false)} className='text-base font-medium text-white bg-indigo-600 px-2 py-1 rounded-full'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </div>
                    <div ref={chatContainerRef} className="mb-[66px] md:max-h-[400px] overflow-y-auto hide-scrollbar space-y-1 px-2">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-64 p-2 rounded-lg text-white text-sm ${message.sender === 'me' ? 'bg-indigo-500' : 'bg-gray-500'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className='p-2 fixed w-full bottom-0 z-10 bg-[#fcfcfc]'>
                        <div className='bg-white rounded-md p-2 flex items-center justify-between w-full border focus-within:border-indigo-500'>
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="bg-transparent outline-none bottom-0 w-full pr-2"
                            />
                            <button className="bg-[#14a800] text-white rounded-full w-8 h-8 flex items-center justify-center text-base">
                                <i className="ri-send-plane-2-fill"></i>
                            </button>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Conversation
