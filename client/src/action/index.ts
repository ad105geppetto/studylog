export const LOG_IN = "LOG_IN";
export const OAUTH_LOGIN = "OAUTH_LOGIN";
export const DROP_OUT = "DROP_OUT";
export const LOG_OUT = "LOG_OUT";
export const ROOM_LIST = "ROOM_LIST";

export const logIn = (
  accessToken: string,
  id: string,
  userId: string,
  email: string,
  profile: string
) => {
  return {
    type: LOG_IN,
    payload: {
      accessToken,
      id,
      userId,
      email,
      profile,
    },
  };
};

export const OauthlogIn = (accessToken: string) => {
  return {
    type: LOG_IN,
    payload: {
      accessToken,
    },
  };
};

export const dropout = (accessToken: string) => {
  return {
    type: DROP_OUT,
    payload: {
      accessToken,
    },
  };
};

export const logout = (accessToken: string) => {
  return {
    type: LOG_OUT,
    payload: {
      accessToken,
    },
  };
};

export const roomlist = (posts: []) => {
  return {
    type: ROOM_LIST,
    payload: {
      posts,
    },
  };
};
