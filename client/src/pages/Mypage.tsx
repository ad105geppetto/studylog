import React, { useState } from "react";
import Modal from "components/Modal";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dropout } from "../action/index";

axios.defaults.withCredentials = true;
const SERVER = process.env.REACT_APP_SERVER;

const Mypage = () => {
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  // 로그인시 저장 된 userInfo 가지고 오기

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const [drop, setDrop] = useState("");
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState();
  const [errMsg, setErrMsg] = useState({
    pwdMsg: "",
    pwdCheckMsg: "",
    emailMsg: "",
  });

  const [modifiedUserInfo, setModifiedUserInfo] = useState({
    pwd: "",
    pwdCheck: "",
    email: userInfo.email,
    profile: userInfo.profile, // 프로필의 초기값은 무엇일까? 기본 이미지가 되겠지?
  });

  const [validCheck, setValidCheck] = useState({
    pwd: false,
    pwdCheck: false,
    email: false,
  });

  // ------------------------- 이미지 업로드 ----------------------

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files;
    if (file.length === 0) {
      return;
      //  input 이벤트는 실행 됐으나, 실제 파일이 업로드가 되지 않은 경우  그대로 종료
    } else {
      // 그 외의 경우에는 필요한 기능들이 작동하도록 작성

      setModifiedUserInfo({ ...modifiedUserInfo, ["profile"]: file });
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function (e: any) {
        setPreview(e.target.result);
        // 파일 리드를 통해 프리뷰에 미리보기 구현
      };
    }
  };

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
    console.log(validCheck);
  };

  //  ------------------------------ 인증메일 전송 ----------------------------
  const onVerifyEmail = () => {
    console.log("기존메일 : ", userInfo.email);
    console.log("변경메일 : ", modifiedUserInfo.email);
    if (userInfo.email === modifiedUserInfo.email) {
      setValidCheck({ ...validCheck, email: true });
      return;
    } else {
      axios
        .post(`${SERVER}/signup/mail`, { email: modifiedUserInfo.email })
        .then((res: AxiosResponse) => {
          console.log(res);
        })
        .catch((err: AxiosError) => {
          console.log("에러메세지", err);
        });
    }
  };

  const onModalOff = () => {
    setModal((value) => !value);
  }; //  -----------------------------------------------------------------------

  // ---------------------------------- 정보 수정 요청 전송  --------------------
  const onModify = () => {
    const { email, pwd, profile } = modifiedUserInfo;
    console.log(profile);
    console.log(modifiedUserInfo);

    let formData = new FormData();

    if (profile) {
      formData.append("email", email);
      formData.append("password", pwd);
      formData.append("profile", profile[0], profile[0].name);
    } else {
      formData.append("email", email);
      formData.append("password", pwd);
    }

    // formData Key 확인하기
    // for (let key of formData.keys()) {
    //   console.log(`formData Key 값 : ${key}`);
    // }

    // // formdata value 확인하기
    // for (let value of formData.values()) {
    //   console.log("formData value : ", value);
    // }

    axios
      .patch(`${SERVER}/userinfo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        switch (res.status) {
          case 200:
            alert("정상적으로 변경 완료 되었습니다.");
            // dispatch(
            //   logIn(
            //     res.data.accessToken,
            //     res.data.userInfo.id,
            //     res.data.userInfo.userId,
            //     res.data.userInfo.email,
            //     res.data.userInfo.profile
            //   )
            // );
            break;
        }
        navigate("/");
      })
      .catch((err: AxiosError) => console.log(err));
  };
  // ---------------------------------------------------------------------------

  const dropOut = () => {
    setDrop("drop");
  };
  //  -------회원탈퇴 버튼 함수-------
  const onDropOutlBtn = () => {
    axios
      .delete(`${SERVER}/dropout`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        const accessToken = res.data.accessToken;
        dispatch(dropout(accessToken));
      })
      .catch((err: AxiosError) => console.log(err));
    onModalOff();
  };
  // ----------------------------------------------------------------

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
          <input type="file" accept=".jpg, .png" onChange={onUploadImage} />
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
            disabled={validCheck.pwd === true && validCheck.pwdCheck === true ? false : true}
          >
            회원정보 수정
          </button>

          <div className="im-container">
            <div className="im-wrapper">
              <button
                onClick={() => {
                  setModal(true);
                }}
              >
                회원탈퇴
              </button>
            </div>
            {modal && (
              <Modal
                modal={modal}
                setModal={setModal}
                width="250"
                height="200"
                // element={<div>회원탈퇴 하시겠습니까?</div>}
                element={
                  <div>
                    회원탈퇴를 하시겠습니까?
                    <br />
                    <button type="button" onClick={onDropOutlBtn}>
                      확인
                    </button>
                    <button type="button" onClick={onModalOff}>
                      취소
                    </button>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Mypage;

/*

    const data = {
      title: post.title,
      image: post.image,
    };

    const formData = new FormData();
    formData.append("image", imageFile[0]);
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

//////////
axios
      .put(
        `http://localhost:4000/records/${id}`,
        {
          title: 상태값,
          content: 상태값,
          image: 상태값
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));


*/
