interface UseCountdown {
  remainingDate: {
    days: number;
    hours: number;
  };
  targetDate: {
    day: number;
    month: number;
    year: number;
  };
}

export const useCountdown = (): UseCountdown => {
  const targetDate = {
    month: 3,
    day: 22,
    year: 2026,
  };

  const difference =
    +new Date(`${targetDate.month}/${targetDate.day}/${targetDate.year}`) -
    +new Date();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  return { remainingDate: { days, hours }, targetDate };
};
