import React, { useRef, useEffect } from "react";

interface PinInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
}

export default function PinInput({ length = 4, value, onChange, onComplete }: PinInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (value.length === length && onComplete) {
            onComplete(value);
        }
    }, [value, length, onComplete]);

    const handleChange = (index: number, char: string) => {
        if (!/^\d*$/.test(char)) return; // Only allow digits

        const newValue = value.split("");
        newValue[index] = char;
        const newPin = newValue.join("");

        // Ensure we don't exceed length (though array mapping handles UI)
        if (newPin.length <= length) {
            onChange(newPin);
        }

        // Auto-focus next input
        if (char && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!value[index] && index > 0) {
                // If current input is empty, move back and delete previous
                inputRefs.current[index - 1]?.focus();
                const newValue = value.split("");
                newValue[index - 1] = ""; // Clear previous
                onChange(newValue.join(""));
            } else {
                // Just clear current
                const newValue = value.split("");
                newValue[index] = "";
                onChange(newValue.join(""));
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, length).replace(/\D/g, "");
        if (pastedData) {
            onChange(pastedData);
            inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
        }
    };

    return (
        <div className="flex gap-3 justify-center">
            {[...Array(length)].map((_, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl font-bold text-black bg-gray-50 border border-gray-200 rounded-xl focus:border-[#144E42] focus:ring-2 focus:ring-[#144E42]/20 outline-none transition-all font-parkinsans"
                />
            ))}
        </div>
    );
}
