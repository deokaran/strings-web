
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/toast";

export default function ForgotPassword() {

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const router = useRouter();
    const [isOtpVerified, setOtpVerificationStatus] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);

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

    function onVerify() {
        if (isOtpValid) {
            const completeOtp = otp.join("");
            console.log("OTP:", completeOtp);
            setOtpVerificationStatus(true)

        }
    }



    const validatePassword = (
        passwordValue: string,
        confirmValue: string
    ) => {
        setPassword(passwordValue);
        setConfirmPassword(confirmValue);

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const valid =
            passwordRegex.test(passwordValue) &&
            passwordValue === confirmValue;

        setIsPasswordValid(valid);
    };

    function onSetPassword() {
        console.log("Password Changed", password);
        let tag = document.getElementById('password-changed-tag')
        if (tag) {
            tag.innerHTML = "Password changed succesfully"
        }
        setShowToast(true)
        setTimeout(() => {
            router.replace("/register/login")
        }, 2000);
    }


    return (
        <>
            {!isOtpVerified ?
                (<>
                    <div className="main-text">
                        <span className="font-bold text-xl">
                            Enter Verification Code
                        </span>
                    </div>

                    <div className="description my-10">
                        <span className="text-[#8391A1]">
                            We've sent a 4-digit code to the email you entered. <br />
                            Enter it below to reset Your Password.
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
                            onClick={onVerify}
                        >
                            Verify
                        </button>
                    </div>
                </>) : (<>


                    <div className="main-text">
                        <span className="font-bold text-xl">
                            Set Password
                        </span>
                    </div>
                    <div className="description my-10">
                        <span className="text-[#8391A1]">
                            Create a strong password to secure your account.
                        </span>
                    </div>
                    <div className="input-field ">
                        <div className="text-strings text-lg font-semibold mb-2">
                            Password
                        </div>

                        <input
                            type="password"
                            className="md:w-[350px] w-[100%] px-5 py-3 border-2 border-[#E8ECF4] rounded-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                validatePassword(
                                    e.target.value,
                                    confirmPassword
                                )
                            }
                        />
                    </div>

                    <div className="input-field mt-6">
                        <div className="text-strings text-lg font-semibold mb-2">
                            Confirm Password
                        </div>

                        <input
                            type="password"
                            className="md:w-[350px] w-[100%] px-5 py-3 border-2 border-[#E8ECF4] rounded-lg"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                validatePassword(
                                    password,
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="password-rules mt-5">
                        <span className="text-[#8391A1] text-sm">
                            Password must contain:
                            <br />
                            {password.length >= 8 ? (
                                <s>• At least 8 characters</s>
                            ) : (
                                <>• At least 8 characters</>
                            )}
                            <br />
                            {/[A-Z]/.test(password) ? (
                                <s>• One uppercase letter</s>
                            ) : (
                                <>• One uppercase letter</>
                            )}
                            <br />
                            {/[a-z]/.test(password) ? (
                                <s>• One lowercase letter</s>
                            ) : (
                                <>• One lowercase letter</>
                            )}
                            <br />
                            {/\d/.test(password) ? (
                                <s>• One number</s>
                            ) : (
                                <>• One number</>
                            )}
                            <br />
                            {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? (
                                <s>• One special character</s>
                            ) : (
                                <>• One special character</>
                            )}
                        </span>
                    </div>

                    {confirmPassword.length > 0 &&
                        password !== confirmPassword && (
                            <div className="text-red-500 text-sm mt-2">
                                Passwords do not match
                            </div>
                        )}

                    <div className="button-section my-10">
                        <button
                            className={`md:w-[350px] w-[100%] bg-strings text-white py-3 rounded button-click ${isPasswordValid
                                ? ""
                                : "opacity-50 cursor-not-allowed"
                                }`}
                            disabled={!isPasswordValid}
                            onClick={onSetPassword}
                        >
                            Set Password
                        </button>
                    </div>
                    <p className="text-green-400 md:absolute" id="password-changed-tag"></p>
                </>
                )
            }

            {showToast && (
                <Toast
                    message="Password Changed successfully!"
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}