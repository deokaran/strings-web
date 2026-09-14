"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isLogin = pathname === "/register/login";

    return (
        <div className="w-full min-h-screen grid items-center md:px-25 px-[5%]">
            <div className="grid md:grid-cols-2 gap-20 max-w-full w-full">
                <div className="col-span-1 flex items-center justify-center flex-col">
                    <div className="title-text flex items-center gap-3 mt-10">
                        <img
                            src="/string_logo_purple.png"
                            alt="String"
                            width={50}
                        />

                        <span className="font-strings text-strings-datk text-5xl font-bold">
                            String
                        </span>
                    </div>

                    <div className="lottiefile-section md:block hidden">
                        <img
                            src="/strings_animation.svg" className="lottie-animation"
                            alt=""
                            width={500}
                        />
                    </div>

                    <div className="login-text hidden md:block text-center">
                        <div className="text-[#8391A1]">
                            {isLogin
                                ? "Not Registered?"
                                : "Already Registered?"}{" "}
                            <Link
                                href={
                                    isLogin
                                        ? "/register"
                                        : "/register/login"
                                }
                                className="text-strings font-semibold"
                            >
                                {isLogin ? "Register" : "Login"}
                            </Link> Instead
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    {children}

                    <div className="login-text block md:hidden mt-10 mb-5 text-center">
                        <div className="text-[#8391A1]">
                            {isLogin
                                ? "Not Registered Yet?"
                                : "Already Registered?"}{" "}
                            <Link
                                href={
                                    isLogin
                                        ? "/register"
                                        : "/register/login"
                                }
                                className="text-strings font-semibold"
                            >
                                {isLogin ? "Register" : "Login"}
                            </Link> Instead
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}