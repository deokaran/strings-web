"use client";

import FriendList from "@/components/friend-list";
import { usePathname } from "next/navigation";
import dummyData from "./dummy.json";
import { useState } from "react";

export default function HomeLayouut({
    children,
}: {
    children: React.ReactNode;
}) {
    const Data = dummyData;
    const [searchFilter, setSearchFilter] = useState("");
    const pathname = usePathname();
    const isFriendsOpen = pathname.includes("friends");

    return (
        <div className="w-full h-screen overflow-hidden grid grid-cols-3">

          
            <div
                className={`col-span-3 md:col-span-1 h-full flex flex-col min-h-0 border-e ${
                    isFriendsOpen ? "hidden md:flex" : "flex"
                }`}
            >
                <div className="shrink-0 bg-white pb-2">
                    <div className="head-section w-full flex justify-between items-center pt-5 px-5">
                        <div className="logo-section flex items-center">
                            <img src="/string_logo_purple.png" alt="" />

                            <span className="font-strings font-bold ms-3 text-[32px]">
                                Srings
                            </span>
                        </div>

                        <div className="other-section flex">
                            <img
                                src="/add_member.png"
                                alt=""
                                width={40}
                                className="me-3"
                            />

                            <div className="rounded-full border-2 border-[#8B5CF6]">
                                <img
                                    src="/add_member.png"
                                    alt=""
                                    width={40}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="search-section flex items-center justify-center mt-5 px-5">
                        <div className="w-full h-[51px] bg-[#F1F1F1] rounded-full flex items-center px-5">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="shrink-0"
                            >
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="7"
                                    stroke="#8A8A8A"
                                    strokeWidth="2"
                                />

                                <path
                                    d="M16.5 16.5L21 21"
                                    stroke="#8A8A8A"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Search from friends"
                                className="w-full bg-transparent outline-none border-none ml-3 text-[#555] placeholder:text-[#8A8A8A]"
                                onChange={(e) =>
                                    setSearchFilter(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* ONLY FRIEND LIST SCROLLS */}
                {Data.length === 0 ? (
                    <div className="flex-1 min-h-0 flex items-center justify-center flex-col">
                        <img
                            src="/add_member.png"
                            alt=""
                            width={150}
                        />

                        <h4 className="text-strings-dark font-semibold text-2xl mt-2">
                            No Friends Here Yet
                        </h4>

                        <p className="text-[#8D8D8D]">
                            Add friends and start the conversation
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        {Data
                            .filter((item) => {
                                const search = searchFilter
                                    .toLowerCase()
                                    .trim();

                                return (
                                    item.username
                                        .toLowerCase()
                                        .includes(search) ||
                                    item.firstName
                                        .toLowerCase()
                                        .includes(search) ||
                                    item.lastName
                                        .toLowerCase()
                                        .includes(search)
                                );
                            })
                            .map((item, i, filteredData) => (
                                <div
                                    className="px-5"
                                    key={i}
                                >
                                    <FriendList friend={item} />

                                    {i !== filteredData.length - 1 && (
                                        <hr />
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div
                className={`col-span-3 md:col-span-2 min-h-0 overflow-y-auto ${
                    isFriendsOpen ? "flex" : "hidden md:flex"
                }`}
            >
                {children}
            </div>
        </div>
    );
}