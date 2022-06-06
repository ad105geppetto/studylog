import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logIn } from "../action/index";
import { useNavigate } from "react-router-dom";
import Dark_logo from "../../public/Dark_logo.png";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState();
  const [errMsg, setErrMsg] = useState({
    pwdMsg: "",
    pwdCheckMsg: "",
    emailMsg: "",
  });

  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 로그인시 저장 된 userInfo 가지고 오기

  const [modifiedUserInfo, setModifiedUserInfo] = useState({
    pwd: "",
    pwdCheck: "",
    email: userInfo.email,
    profile: null, // 프로필의 초기값은 무엇일까? 우리는 기본 이미지가 되겠지?
    // 동일한 이미지를 서버에서는 링크로 가질것이고, 나는 클라에서 따로 가지고 보여줘야하나?
  });

  const [validCheck, setValidCheck] = useState({
    pwd: false,
    pwdCheck: false,
    email: false,
  });

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  // ------------------------- 이미지 업로드 ----------------------

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files;
    setImageFile(file);
    console.log(imageFile);
    //  이미지 상태에 파일값 저장

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function (e: any) {
      setPreview(e.target.result);
      console.log(preview);
      // 파일 리드를 통해 프리뷰에 미리보기 구현
    };
  };

  // ----------------------------------------------------

  // ----------------------------- 유저 정보 수정 -----------------------
  const onModifyUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedUserInfo({ ...modifiedUserInfo, [key]: e.target.value });
    const value = e.target.value;

    switch (key) {
      case "pwd":
        if (value.includes(" ")) {
          setErrMsg({ ...errMsg, pwdMsg: "공백은 사용 할 수 없습니다" });
          setValidCheck({ ...validCheck, pwd: false });
        } else if (value.length < 5 || value.length > 15) {
          setErrMsg({ ...errMsg, pwdMsg: "비밀번호는 5글자 이상 15글자 미만 입니다." });
          setValidCheck({ ...validCheck, pwd: false });
        } else {
          setErrMsg({ ...errMsg, pwdMsg: "" });
          setValidCheck({ ...validCheck, pwd: true });
        }
        break;
      case "pwdCheck":
        if (modifiedUserInfo.pwd === value) {
          setErrMsg({ ...errMsg, pwdCheckMsg: "" });
          setValidCheck({ ...validCheck, pwdCheck: true });
        } else {
          setErrMsg({ ...errMsg, pwdCheckMsg: "비밀번호가 일치하지 않습니다." });
          setValidCheck({ ...validCheck, pwdCheck: false });
        }
        break;
      case "email":
        const emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(value)) {
          setErrMsg({ ...errMsg, emailMsg: "올바르지 못 한 이메일 형식입니다." });
        } else {
          setErrMsg({ ...errMsg, emailMsg: "" });
        }
        break;
    }
    console.log(modifiedUserInfo);
    console.log(validCheck);
    console.log(userInfo);
  };

  //  ------------------------------ 인증메일 전송 ----------------------------
  const onVerifyEmail = () => {
    axios
      .post(`${SERVER}/signup/auth`, { email: userInfo.email })
      .then((res: AxiosResponse) => {
        switch (res.status) {
          case 200:
            setErrMsg({ ...errMsg, emailMsg: "인증 완료 되었습니다." });
            setValidCheck({ ...validCheck, email: true });
            break;

          case 400:
            setErrMsg({ ...errMsg, emailMsg: "올바르지 못 한 이메일 형식입니다." });
            setValidCheck({ ...validCheck, email: false });
            break;

          default:
            setErrMsg({ ...errMsg, emailMsg: "올바르지 못 한 이메일 형식입니다." });
            setValidCheck({ ...validCheck, email: false });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  //  -----------------------------------------------------------------------

  // ------------------------------------ 회원정보 수정 --------------------
  const onModify = () => {
    const { email, pwd, profile } = modifiedUserInfo;

    axios
      .patch(
        `${SERVER}/userinfo`,
        { email: email, password: pwd, profile: profile },
        {
          headers: { authorization: `Bearer ${userInfo.accessToken}` },
        }
      )
      .then((res: AxiosResponse) => {
        switch (res.status) {
          case 200:
            alert("정상적으로 변경 완료 되었습니다.");
            dispatch(
              logIn(
                res.data.accessToken,
                res.data.userInfo.id,
                res.data.userInfo.userId,
                res.data.userInfo.email,
                res.data.userInfo.profile
              )
            );
            break;
        }
      })
      .catch((err: AxiosError) => console.log(err));
  };
  // ---------------------------------------------------------------------------

  const testClick = () => {
    setValidCheck({
      email: true,
      pwd: true,
      pwdCheck: true,
    });
    console.log(validCheck);
  };

  return (
    <div>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <div>
          아이디 :<input type="text" value={userInfo.userId} disabled />
        </div>
        <div>
          <img alt="프로필 사진" src={preview} />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={onUploadImage} />
        </div>
        비밀번호 : <input type="password" onChange={onModifyUserInfo("pwd")} />
        <div> {errMsg.pwdMsg} </div>
        비밀번호 확인 <input type="password" onChange={onModifyUserInfo("pwdCheck")} />
        <div> {errMsg.pwdCheckMsg} </div>
        <div>
          <input type="eamil" onChange={onModifyUserInfo("email")} defaultValue={userInfo.email} />
          <button type="button" onClick={onVerifyEmail}>
            이메일 인증
          </button>
          <div>{errMsg.emailMsg}</div>
        </div>
        <div>
          <button
            type="submit"
            onClick={onModify}
            disabled={
              validCheck.email === true && validCheck.pwd === true && validCheck.pwdCheck === true
                ? false
                : true
            }
          >
            회원정보 수정
          </button>
          <button type="button"> 회원 탈퇴 </button>
          {/* 탈퇴 클릭시 모달창 떠야되고 모달창 내부에서 axios 요청 갑니다.  */}
        </div>
        <div>
          <button type="button" onClick={testClick}>
            테스트버튼
          </button>
        </div>
      </form>
    </div>
  );
};

export default Mypage;
