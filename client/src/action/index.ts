// interface Login {
//   id: number;
//   userId: string;
//   email: string;
//   accessToken: string;
//   refreshToken: String;
// }

export const LOG_IN = "LOG_IN";
export const logIn = (
  id: string,
  userId: string,
  email: string,
  profile: string,
  accessToken: string,
  refreshToken?: string
) => {
  return {
    type: LOG_IN,
    payload: {
      id,
      userId,
      email,
      profile,
      accessToken,
    },
  };
};
