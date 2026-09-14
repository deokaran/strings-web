"use client";

import { useEffect, useRef, useState } from "react";
import dummyData from "../../dummy.json";
import BackButton from "@/components/backbutton";
import { useParams } from "next/navigation";

export default function FriendPage() {
    const params = useParams<{ slug: string }>();
    const slug = params.slug as string;
    const [input, setInput] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "67a1f001",
            message: "No problem at all!\nI'll be there in about 15 minutes.",
            time: "10:11 PM",
        },
        {
            id: 2,
            sender: "67a1f001",
            message: "I'll text you when I arrive.",
            time: "10:11 PM",
        },
        {
            id: 3,
            sender: "67a1f001",
            message:
                "This is your delivery driver from Speedy Chow.\nI'm just around the corner from your place. 😊",
            time: "10:10 PM",
        },
        {
            id: 4,
            sender: "me",
            message: "Great! 😊",
            time: "10:12 PM",
        },
    ]);



    const friend = dummyData.find((item) => item.id === slug);

    if (!friend) {
        return (
            <div className="h-full flex items-center justify-center">
                Friend not found
            </div>
        );
    }

    function sendMessage() {
        const text = input.trim();

        if (!text) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: Date.now(),
                sender: "me",
                message: text,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            },
        ]);

        setInput("");
    }

    useEffect(() => {
        const container = messagesContainerRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [messages]);

    return (
        <div className="h-full w-full flex flex-col">

            <div className="header-section h-[70px] flex items-center px-5 shrink-0">
                <div className="flex items-center gap-3 w-full">

                    <BackButton />

                    <img
                        src={friend.profilePicture}
                        alt={friend.username}
                        className="w-[45px] h-[45px] rounded-full object-cover"
                    />

                    <div className="name-section w-full">
                        <div className="font-semibold">
                            {friend.username}
                        </div>

                        <div className="text-sm text-[#8D8D8D]">
                            {friend.online ? "Online" : friend.lastSeen}
                        </div>
                    </div>

                    <button className="dot-button">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="5"
                                r="1.5"
                                fill="currentColor"
                            />
                            <circle
                                cx="12"
                                cy="12"
                                r="1.5"
                                fill="currentColor"
                            />
                            <circle
                                cx="12"
                                cy="19"
                                r="1.5"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col chat-section">

                <div className="flex-1 min-h-0 overflow-y-auto px-3 py-5" ref={messagesContainerRef}>

                    <div className="min-h-full flex flex-col justify-end gap-3">

                        {messages.map((message) => {
                            const isMine = message.sender === "me";

                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isMine
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] px-6 py-4 ${isMine
                                            ? "bg-[#8B5CF6] text-white rounded-[20px] rounded-br-none"
                                            : "bg-white text-[#333] rounded-[20px] rounded-tl-none shadow-sm"
                                            }`}
                                    >
                                        <p className="whitespace-pre-line text-[17px]">
                                            {message.message}
                                        </p>

                                        <div
                                            className={`flex justify-end items-center gap-2 mt-3 text-sm ${isMine
                                                ? "text-white/60"
                                                : "text-[#999]"
                                                }`}
                                        >
                                            <span>{message.time}</span>

                                            {isMine && (
                                                <span className="text-base">
                                                    <img src="/single-tick.png" alt="" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

                <div className="flex items-center gap-4 px-6 py-2 bg-white">

                    <input
                        type="text"
                        value={input}
                        placeholder="Type a message ..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        className="flex-1 h-[54px] rounded-full border-2 border-[#AFAFAF] px-6 text-[18px] text-[#333] placeholder:text-[#999] outline-none focus:border-[#8B5CF6]"
                    />

                    <button
                        type="button"
                        onClick={sendMessage}
                        className="w-[64px] h-[64px] shrink-0 rounded-full bg-[#F5F5F5] flex items-center justify-center"
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M21.5 3.5L11 14"
                                stroke="#999"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            <path
                                d="M21.5 3.5L15 20.5L11 14L3.5 10L21.5 3.5Z"
                                fill="#999"
                                stroke="#999"
                                strokeWidth="1"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    );
}