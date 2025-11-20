import { useRef } from "react";

interface VerificationCodeInputProps {
  code: string;
  setCode: (code: string) => void;
}

export default function VerificationCodeInput({ code, setCode }: VerificationCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="flex gap-3 w-full justify-between">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          maxLength={1}
          value={code[index] || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const newCode = code.split('');
              newCode[index] = value;
              setCode(newCode.join(''));
              if (index < 5) {
                inputRefs.current[index + 1]?.focus();
              }
            } else {
              const newCode = code.split('');
              newCode[index] = '';
              setCode(newCode.join(''));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          className="w-12 h-12 text-center text-black text-xl font-parkinsans rounded-xl border border-gray-300 focus:border-[#A8E959] focus:ring-2 focus:ring-[#A8E959]/20 outline-none transition-all"
        />
      ))}
    </div>
  );
}
