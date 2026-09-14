"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/toast";

export default function RegisterEmail() {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const router = useRouter();
    const [showToast, setShowToast] = useState(false);


    const isValid = (value: string) => {
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    function onContinue() {
        if (isEmailValid) {
            setShowToast(true)
            setTimeout(() => {
                router.replace("/register/otp")
            }, 2000);

        }
    }

    return <>
        <div className="main-text">
            <span className="font-bold text-xl">
                Enter Your Email ID
            </span>
        </div>
        <div className="description my-10">
            <span className="text-[#8391A1]">
                Enter a valid Email ID. We'll send you a verification code to ensure it's you. <br />The verified Email ID can be used for login. <a href="" className="text-strings">Learn More</a>
            </span>
        </div>
        <div className="input-field">
            <input type="text" className="md:w-[350px] w-[100%] px-5 py-3 border border-2 border-[#E8ECF4] rounded-lg" placeholder="example@abc.com" onChange={(e) => isValid(e.target.value)} />
        </div>
        <div className="button-section my-10">
            <button
                className={`md:w-[350px] w-[100%] bg-strings text-white py-3 rounded button-click ${isEmailValid ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                disabled={!isValid} onClick={() => onContinue()}
            >
                Continue
            </button>
        </div>
         {showToast && (
                    <Toast
                        message="Otp Sent!"
                        type="success"
                        onClose={() => setShowToast(false)}
                    />
                )}
    </>
}