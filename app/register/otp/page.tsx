"use client";

import Toast from "@/components/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterEmail() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();

    const handleOtpChange = (value: string, index: number) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        const newOtp = [...otp];
        newOtp[index] = digit;

        setOtp(newOtp);

        const completeOtp = newOtp.join("");
        setIsOtpValid(/^\d{4}$/.test(completeOtp));

        if (digit && index < 3) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    function onContinue() {
        if (isOtpValid) {
            const completeOtp = otp.join("");
            setShowToast(true)
            setTimeout(() => {
                router.replace("/register/set-password");
            }, 2000);
        }
    }

    return (
        <>
            <div className="main-text">
                <span className="font-bold text-xl">
                    Enter Verification Code
                </span>
            </div>

            <div className="description my-10">
                <span className="text-[#8391A1]">
                    We've sent a 4-digit code to the email you entered.
                    Enter it below to verify your number. <br />
                    By verifying, you agree to our
                    <a href="" className="text-strings">
                        Privacy Policy
                    </a>
                </span>
            </div>

            <div className="input-field flex gap-3">
                {[0, 1, 2, 3].map((index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[index]}
                        className="sm:w-[80px] w-[70px] h-[60px] text-center text-xl border border-[#E8ECF4] focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF666] rounded"
                        onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                        }
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>

            <div className="resend-section mt-5">
                Didn't receive the code?{" "}
                <a href="" className="text-strings">
                    Resend Code
                </a>
            </div>

            <div className="button-section my-10">
                <button
                    className={`md:w-[350px] w-[100%] bg-strings text-white py-3 rounded button-click ${isOtpValid
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                        }`}
                    disabled={!isOtpValid}
                    onClick={onContinue}
                >
                    Verify
                </button>
            </div>
            {showToast && (
                <Toast
                    message="Otp Verified!"
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}