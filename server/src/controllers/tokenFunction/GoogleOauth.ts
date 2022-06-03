import axios from "axios";

export default {
  verify: (accessToken) => {
    return axios
      .get("https://www.googleapis.com/drive/v2/files", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => {
        return data;
      });
  },
};