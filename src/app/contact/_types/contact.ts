export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type FormErrors = {
  [Key in keyof FormData]?: string;
};
