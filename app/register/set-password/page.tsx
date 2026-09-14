"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/toast";
export default function RegisterPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();

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

    function onContinue() {
        if (isPasswordValid) {
            setShowToast(true)
            setTimeout(() => {
                router.replace("/register/details");
            }, 2000);
        }
    }

    return (
        <>
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
                    onClick={onContinue}
                >
                    Continue
                </button>
            </div>
             {showToast && (
                        <Toast
                            message="Password Set Successfully!"
                            type="success"
                            onClose={() => setShowToast(false)}
                        />
                    )}
        </>
    );
}