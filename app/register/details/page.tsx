"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/components/toast";

export default function Details() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();

    const [isValid, setIsValid] = useState(false);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    const validateDetails = (
        usernameValue: string,
        firstNameValue: string
    ) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const nameRegex = /^[a-zA-Z\s]{2,30}$/;

        const validUsername = usernameRegex.test(usernameValue);
        const validFirstName = nameRegex.test(firstNameValue);

        setIsValid(validUsername && validFirstName);
    };

    const handleUsernameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setUsername(value);
        validateDetails(value, firstName);
    };

    const handleFirstNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setFirstName(value);
        validateDetails(username, value);
    };

    const onContinue = () => {
        if (!isValid) return;

        console.log({
            username,
            firstName,
            lastName,
            photo,
        });
        setShowToast(true)
        setTimeout(() => {
            router.replace("/register/");
        }, 2000);
    };

    return (
        <>
            <div className="main-text">
                <span className="font-bold text-xl">
                    Enter Details.
                </span>
            </div>

            <div className="description mt-5 mb-10">
                <span className="text-[#8391A1]">
                    Enter your details below to enhance your experience.
                </span>
            </div>

            <div className="profile-photo-section flex md:block items-center justify-center">
                <label
                    htmlFor="profile-photo"
                    className="md:w-[150px] md:h-[150px] w-[70px] h-[70px] rounded-full bg-[#DDD2F2] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                >
                    {photo ? (
                        <img
                            src={photo}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full block border border-[#8B5CF6]"
                        />
                    ) : (
                        <>
                            <div className="w-[25px] h-[25px] rounded-md bg-[#8B5CF6] flex items-center justify-center">
                                <span className="text-white text-[18px] font-light leading-none">
                                    +
                                </span>
                            </div>

                            <span className="text-[#8B5CF6] text-[20px] leading-[32px] hidden md:inline text-center">
                                Enter<br />
                                Profile Picture
                            </span>
                        </>
                    )}
                </label>

                <input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                />
            </div>

            <div className="username-section my-10">
                <div className="text-strings text-lg font-semibold">
                    Enter Username
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="md:w-[350px] w-[100%] px-5 py-3 border-2 border-[#E8ECF4] rounded-lg"
                        placeholder="e.g.xyz"
                    />
                </div>

                {username.length > 0 &&
                    !/^[a-zA-Z0-9_]{3,20}$/.test(username) && (
                        <span className="text-red-500 text-sm">
                            Username must be 3-20 characters and contain only
                            letters, numbers or _
                        </span>
                    )}
            </div>

            <div className="first-name-section my-10">
                <div className="text-strings text-lg font-semibold">
                    Enter First Name
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="md:w-[350px] w-[100%] px-5 py-3 border-2 border-[#E8ECF4] rounded-lg"
                        placeholder="e.g.xyz"
                    />
                </div>

                {firstName.length > 0 &&
                    !/^[a-zA-Z\s]{2,30}$/.test(firstName) && (
                        <span className="text-red-500 text-sm">
                            Please enter a valid first name
                        </span>
                    )}
            </div>

            <div className="last-name-section my-10">
                <div className="text-strings text-lg font-semibold">
                    Enter Last Name{" "}
                    <span className="text-[#8391A1]">
                        (Optional)
                    </span>
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="md:w-[350px] w-[100%] px-5 py-3 border-2 border-[#E8ECF4] rounded-lg"
                        placeholder="e.g.xyz"
                    />
                </div>
            </div>

            <div className="button-section my-10">
                <button
                    className={`md:w-[350px] w-[100%] text-white py-3 rounded button-click ${isValid
                        ? "bg-strings"
                        : "bg-strings opacity-50 cursor-not-allowed"
                        }`}
                    disabled={!isValid}
                    onClick={onContinue}
                >
                    Continue
                </button>
            </div>
            {showToast && (
                <Toast
                    message="Details added Successfully!"
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}