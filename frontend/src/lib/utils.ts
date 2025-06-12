import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { gzip, ungzip } from "pako";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//to generate a random ID
export const generateID = (len: number): string => {
  const combo =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_-";
  let id = "";
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * combo.length);
    id += combo[index];
  }

  return id;
};

//to generate a studio ID based on user's email
export const generateStudioID = (email: string): string => {
  const user = email.split("@")[0];
  const id = user + "-studio-" + generateID(3);
  return id;
};

//to validate the studio ID
export const CheckStudioID = (id: string, email: string) => {
  const user = email.split("@")[0];
  const regex = new RegExp(`^${user}-studio-[a-zA-Z0-9@#_-]{3}$`);
  return regex.test(id);
};

// to compress the SDP to zip
export const compressSdp = (sdp: string): string => {
  const compress = gzip(sdp);
  return btoa(String.fromCharCode(...compress));
};

// to decompress the SDP from zip
export const decompressSdp = (sdp: string): string => {
  const bin = atob(sdp);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  const decompressed = ungzip(bytes);

  // 4. Decode UTF-8 bytes back into string
  return new TextDecoder("utf-8").decode(decompressed);
};
