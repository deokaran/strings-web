"use client";
import Toast from "@/components/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();


    const isValid = (value: string) => {
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };


    function onLogin() {
        if (isEmailValid) {
            // router.replace("/register/otp")
            setShowToast(true)

        }
    }

    function onForgotPassword() {
        if (isEmailValid) {
            router.replace("/register/forgot-password")
        } else {
            let tag = document.getElementById("temp")
            if (tag) {
                tag.innerHTML = "Enter Email First"
            }
        }
    }

    return <>
        <div className="main-text">
            <span className="font-bold text-xl">
                Enter Your Email ID and Password
            </span>
        </div>

        <div className="input-field my-10">
            <div className="text-strings text-lg font-semibold">
                Enter Username
            </div>
            <input type="text" className="md:w-[350px] w-[100%] px-5 py-3 border border-2 border-[#E8ECF4] rounded-lg" placeholder="example@abc.com" onChange={(e) => isValid(e.target.value)} />
        </div>
        <div className="input-field">
            <div className="text-strings text-lg font-semibold">
                Enter Password
            </div>
            <input type="password" className="md:w-[350px] w-[100%] px-5 py-3 border border-2 border-[#E8ECF4] rounded-lg" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
            <div className="text-strings mt-5 text-sm">
                <button onClick={() => onForgotPassword()}>
                    Forgot Password
                </button>
            </div>
            <p id="temp" className="text-red-300 mt-5 text-md"></p>
        </div>
        <div className="button-section my-10">
            <button
                className={`md:w-[350px] w-[100%] bg-strings text-white py-3 rounded button-click ${isEmailValid ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                disabled={!isValid} onClick={() => onLogin()}>
                Login
            </button>
        </div>
        {showToast && (
            <Toast
                message="Login successful!"
                type="success"
                onClose={() => setShowToast(false)}
            />
        )}
    </>
}