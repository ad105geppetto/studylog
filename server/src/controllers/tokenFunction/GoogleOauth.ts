import axios from "axios";

export default {
  verify: (accessToken) => {
    return axios
      .get("https://www.googleapis.com/drive/v2/files", {
        // https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&access_type=offline&
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => {
        return data;
      });
  },
};
