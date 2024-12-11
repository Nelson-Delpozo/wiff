import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    return {
      days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
      minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
      seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center text-yellow-600">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wide font-flick">
        WIFF WEEK 2025
      </h1>
      <h4 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-wide">
        IS COMING
      </h4>
      <h4 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 tracking-wide">
        Dec 1st, 2025 at 8:00 PM EST
      </h4>
      <div className="flex space-x-4 text-3xl md:text-5xl lg:text-6xl">
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeRemaining.days}</span>
          <span className="text-sm md:text-base uppercase">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeRemaining.hours}</span>
          <span className="text-sm md:text-base uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeRemaining.minutes}</span>
          <span className="text-sm md:text-base uppercase">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{timeRemaining.seconds}</span>
          <span className="text-sm md:text-base uppercase">Seconds</span>
        </div>
      </div>
      {/* <div className="text-lg md:text-xl mt-4 uppercase">Eastern Standard Time (EST)</div> */}
    </div>
  );
};

export default CountdownTimer;
