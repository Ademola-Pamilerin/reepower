import { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
  onResend: () => void;
}

export default function Timer({ initialTime, onResend }: TimerProps) {
  const [timer, setTimer] = useState(initialTime);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (startTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setStartTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTimer, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResend = () => {
    setTimer(initialTime);
    setStartTimer(true);
    onResend();
  };

  return (
    <div className="text-gray-600 font-parkinsans">
      <button
        type="button"
        disabled={startTimer}
        onClick={handleResend}
        className={`font-medium ${
          startTimer
            ? "text-gray-400 cursor-not-allowed"
            : "text-[#14841E] hover:text-[#14841E] underline cursor-pointer"
        }`}
      >
        Resend Code
      </button>{" "}
      {startTimer && `in ${formatTime(timer)} seconds`}
    </div>
  );
}
