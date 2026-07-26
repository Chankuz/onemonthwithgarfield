import { useState, useEffect } from 'react';

export function useCountdown(startDateString) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date(startDateString).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer(); // Initial call
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [startDateString]);

  return timeLeft;
}
