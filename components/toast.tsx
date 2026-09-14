"use client";

import { useEffect } from "react";

type ToastProps = {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
    onClose: () => void;
};

export default function Toast({
    message,
    type = "info",
    duration = 3000,
    onClose,
}: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const styles = {
        success: "border-green-500 text-green-600",
        error: "border-red-500 text-red-600",
        info: "border-blue-500 text-blue-600",
    };

    return (
        <div className="fixed top-5 right-5 z-[9999]">
            <div
                className={`min-w-[300px] bg-white border-l-4 ${
                    styles[type]
                } shadow-lg rounded-lg px-5 py-4 flex items-center justify-between gap-5`}
            >
                <span className="text-sm font-medium text-gray-700">
                    {message}
                </span>

                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700 text-lg"
                >
                    ×
                </button>
            </div>
        </div>
    );
}