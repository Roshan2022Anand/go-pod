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

export const generateStudioID = (email: string): string => {
  const user = email.split("@")[0];
  const id = user + "-studio-" + generateID(3);
  return id;
};

export const CheckStudioID = (id: string, email: string) => {
  const user = email.split("@")[0];
  const regex = new RegExp(`^${user}-studio-[a-zA-Z0-9@#_-]{3}$`);
  return regex.test(id);
};
