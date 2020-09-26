export const addZero = (value: number): string => {
  const str = String(value);

  if (str.length > 2) {
    throw new Error('Incorrect string length');
  }

  if (str.length === 1) {
    return `0${value}`;
  }

  return String(value);
};

export const formatTime = (value: number): string => {
  const time = new Date(value);
  const seconds = time.getUTCSeconds();
  const minutes = time.getUTCMinutes();
  const hours = time.getUTCHours();

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};
