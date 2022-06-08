import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Idinquiry from "components/Idinquiry";
import Pwinquiry from "components/Pwinquiry";
import Change from "pages/Change";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const SERVER = process.env.REACT_APP_SERVER;
  // const OAUTH_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // const OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_ID}&redirect_uri=http://localhost:3000&response_type=code&scope=openid`;

  // --------------------------- OAUTH 로그인---------------------
  const sendAuthCode = (authCode: string | null) => {
    axios
      .post(`${SERVER}/Oauth`, { authorizationCodr: authCode })
      .then((res) => {})
      .catch((err) => {});
  };

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const authCode = url.searchParams.get("code");
  //   console.log(url);
  //   console.log(authCode);
  //   sendAuthCode(authCode);
  // }, []);
  // ----------------------------------------

  return (
    <div className="App">
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Idinquiry /> */}
      {/* <Pwinquiry /> */}
      <Change />
    </div>
  );
}

export default App;
