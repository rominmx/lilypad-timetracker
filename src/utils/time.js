export const addZero = (value) => {
  const str = String(value);

  if (str.length > 2) {
    throw new Error('Incorrect string length');
  }

  if (str.length === 1) {
    return `0${value}`;
  }

  return value;
};

export const formatTime = (value) => {
  const time = new Date(value);
  const seconds = time.getUTCSeconds();
  const minutes = time.getUTCMinutes();
  const hours = time.getUTCHours();

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};
