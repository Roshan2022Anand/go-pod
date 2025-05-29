//to generate a random ID
export const generateID = (len: number): string => {
  const combo =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#_-";
  let id = "";
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * combo.length);
    id += combo[index];
  }

  return id;
};
