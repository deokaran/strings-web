"use client";

import { useRouter } from "next/navigation";

type Friend = {
    id: string;
    username: string;
    lastMessage: string;
    lastMessageTime: string;
    messageStatus: string;
    profilePicture?: string;
};

export default function FriendList({
    friend,
}: {
    friend: Friend;
}) {
    const router = useRouter();

    return (
        <div
            className="Friend-cell flex my-3 cursor-pointer"
            onClick={() => {
                router.push(`/home/friends/${friend.id}`);
            }}
        >
            <div className="img-section">
                <img
                    src={friend.profilePicture || "/add_member.png"}
                    alt={friend.username}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                />
            </div>

            <div className="body-section flex-1 flex flex-col px-2 min-w-0">
                <div className="username-section">
                    {friend.username}
                </div>

                <div className="last-message text-[#8D8D8D] truncate">
                    {friend.lastMessage}
                </div>
            </div>

            <div className="time-status-section flex flex-col items-end justify-between">
                <div className="time text-[12px] text-[#8D8D8D]">
                    {friend.lastMessageTime}
                </div>

                <div className="status">
                    {friend.messageStatus === "seen" ? (
                        <img src="/seen.png" alt="Seen" />
                    ) : friend.messageStatus === "sent" ? (
                        <img src="/double-tick.png" alt="Sent" />
                    ) : (
                        <img src="/single-tick.png" alt="Not sent" />
                    )}
                </div>
            </div>
        </div>
    );
}