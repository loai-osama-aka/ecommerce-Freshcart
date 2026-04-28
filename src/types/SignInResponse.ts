export type SignInSuccess = {
  message: "success";
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

export type SignInError = {
  message: "Incorrect email or password";
  errors: {
    msg: string;
  };
};

export type SignInResponse = SignInSuccess | SignInError;