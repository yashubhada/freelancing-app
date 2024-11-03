import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Conversation = ({ participantId, loggedInUser }) => {

    const url = "http://localhost:9171"; // API URL

    const [conversationList, setConversationList] = useState([]);
    const [filteredConversationList, setFilteredConversationList] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ name: '', image: '' });

    const fetchAllConversation = async () => {
        try {
            const response = await axios.post(`${url}/conversation/allConversations/${participantId}`);
            setConversationList(response.data);
            setFilteredConversationList(response.data);
        } catch (err) {
            console.error(err);
        }
    };

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
    }, [participantId]);

    const searchUser = (word) => {
        if (word.trim() === '') {
            // If search input is empty, reset to the full conversation list
            setFilteredConversationList(conversationList);
        } else {
            // Filter conversation list based on participant name
            const filteredList = conversationList.filter(conversation =>
                conversation.participants.some(participant =>
                    participant.userName.toLowerCase().includes(word.toLowerCase()) && participant.userId !== participantId
                )
            );
            setFilteredConversationList(filteredList);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [isOpenConversation]);

    const [userChat, setUserChat] = useState([]);
    const [chatid, setChatid] = useState('');
    const getAllMessages = async (chatId, user) => {
        setIsOpenConversation(true);
        setChatid(chatId);
        if (!user.name) {
            setSelectedUser({ name: user.userName, image: user.userProfileImage });
        }
        try {
            const response = await axios.post(`${url}/conversation/getAllMessages/${chatId}`);
            setUserChat(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const [newMsg, setNewMsg] = useState('');
    const sendMessage = async () => {
        try {
            const response = await axios.post(`${url}/conversation/addNewMessage/${chatid}`, {
                senderId: participantId,
                message: newMsg
            });
            if (response.status === 200) {
                getAllMessages(chatid, selectedUser);
                setNewMsg('');
                scrollToBottom();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <section className='md:w-[200px] p-2 rounded-t-md fixed bg-white right-1 border shadow-sm bottom-0 flex justify-between items-center'>
                <div className='hidden md:flex items-center'>
                    <div className='w-8 h-8 relative'>
                        <img className='w-full h-full object-cover rounded-full' src={loggedInUser.profileImage} alt="Profile image" />
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
                <section className='z-10 w-[250px] rounded-t-md fixed right-1 border shadow-sm bottom-0 bg-white overflow-y-auto max-h-[337px]'>
                    <div className='flex justify-between items-center p-2 border-b-2 fixed bg-white w-[248px]'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 relative'>
                                <img className='w-full h-full object-cover rounded-full' src={loggedInUser.profileImage} alt="Profile image" />
                                <div className='absolute right-0 bottom-0'>
                                    <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                                </div>
                            </div>
                            <p className='text-sm font-medium ml-2'>Message list</p>
                        </div>
                        <button onClick={() => setShowMessages(false)} className='text-xl font-medium text-white bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-full'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </div>
                    <div className='p-2'>
                        <div className="flex items-center mt-[50px] w-full">
                            <div className='w-full bg-white border border-indigo-500 rounded p-2 flex items-center'>
                                <i className='ri-search-line text-sm text-indigo-700 mr-2'></i>
                                <input onChange={(e) => searchUser(e.target.value)} type="text" className='outline-none border-0 w-full text-sm' placeholder='Find user...' />
                            </div>
                        </div>
                    </div>
                    {/* conversation */}
                    <div className=''>
                        {filteredConversationList.length > 0 ? (
                            filteredConversationList.map((conversation, index) => (
                                <div key={index} className='border-t'>
                                    {conversation.participants
                                        .filter((ary) => ary.userId !== participantId) // Exclude the logged-in user's information
                                        .map((ary, j) => (
                                            <div
                                                key={j}
                                                className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b'
                                                onClick={() => getAllMessages(conversation._id, ary)}
                                            >
                                                <div className='w-10 h-10 mr-2'>
                                                    <img
                                                        className='w-full h-full object-cover rounded-full'
                                                        src={ary.userProfileImage}
                                                        alt="Profile image"
                                                    />
                                                </div>
                                                <div>
                                                    <h1 className='text-sm text-gray-800 font-medium'>{ary.userName}</h1>
                                                    {/* Display timestamp of the last message */}
                                                    {conversation.messages.length > 0 && (
                                                        <p className='text-[12px] text-gray-500 font-medium'>
                                                            {new Date(conversation.messages[conversation.messages.length - 1].timestamp)
                                                                .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))
                        ) : (
                            <div className='h-[235px] flex items-center justify-center'>
                                <h1 className='text-sm text-gray-600'>No any messages</h1>
                            </div>
                        )}
                    </div>
                </section>
            }
            {
                isOpenConversation &&
                <section className="z-20 fixed right-0 md:right-1 h-screen md:h-fit bottom-0 bg-[#fcfcfc] flex flex-col w-full md:w-[500px] md:rounded-t-md md:border">
                    <div className='flex justify-between items-center p-2 border-b mb-2'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 relative'>
                                <img className='w-full h-full object-cover rounded-full border' src={selectedUser.image} alt="Profile image" />
                            </div>
                            <p className='text-sm font-medium ml-2'>{selectedUser.name}</p>
                        </div>
                        <button onClick={() => setIsOpenConversation(false)} className='text-base font-medium text-white bg-indigo-600 px-2 py-1 rounded-full'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </div>
                    <div ref={chatContainerRef} className="mb-[66px] md:max-h-[400px] overflow-y-auto hide-scrollbar space-y-1 px-2">
                        {userChat.map((message, i) => (
                            <div
                                key={i}
                                className={`flex ${message.senderId === participantId ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-64 p-2 rounded-lg text-white text-sm ${message.senderId === participantId ? 'bg-indigo-500' : 'bg-gray-500'}`}
                                >
                                    {message.message}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className='p-2 fixed w-full md:w-[498px] bottom-0 z-10 bg-[#fcfcfc]'>
                        <div className='bg-white rounded-md p-2 flex items-center justify-between w-full border focus-within:border-indigo-500'>
                            <input
                                type="text"
                                onChange={(e) => setNewMsg(e.target.value)}
                                value={newMsg}
                                placeholder="Type a message"
                                className="bg-transparent outline-none bottom-0 w-full pr-2"
                            />
                            <button onClick={sendMessage} className="bg-[#14a800] text-white rounded w-8 h-8 flex items-center justify-center">
                                <i className="ri-send-plane-2-fill"></i>
                            </button>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default Conversation;
