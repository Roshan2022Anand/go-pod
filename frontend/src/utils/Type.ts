export type wsEvent = {
  event: string;
  data: { [key: string]: string | number };
};
