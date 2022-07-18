import React, { useState } from "react";
import Modal from "components/Modal";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { dropout } from "../action/index";
import { logIn } from "../action/index";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import {
  Wrapper,
  ImageSection,
  Title,
  SmallButton,
  Logo,
  Input,
  ButtonWrapper,
  ErrorMsg,
  ImageBoard,
  InnerButton,
  Separation,
  SuccessMsg,
  Form,
} from "styles/Userpage_style";
import styled from "styled-components";

const Container = styled.div`
  background: #f7f6f2;
`;

const Buttonbox = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;

  min-width: 6vw;
  min-height: 5vh;
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  outline: 0;
  background: #4b6587;
  color: white;
  border: 1px solid #f7f6f2;
  margin: 1vh;
`;

const Mypage = () => {
  axios.defaults.withCredentials = true;
  const SERVER = process.env.REACT_APP_SERVER || "http://localhost:4000";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfoReducer.userInfo);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [errMsg, setErrMsg] = useState({
    pwdMsg: "",
    pwdCheckMsg: "",
    emailMsg: "",
  });
  const [sucessMsg, setSucessMsg] = useState({
    pwdMsg: "",
    pwdCheckMsg: "",
    emailMsg: "",
  });
  const [modifiedUserInfo, setModifiedUserInfo] = useState({
    pwd: "",
    pwdCheck: "",
    email: userInfo.email,
    profile: userInfo.profile,
  });
  const [validCheck, setValidCheck] = useState({
    pwd: false,
    pwdCheck: false,
    email: false,
  });

  // ------------------------- 이미지 업로드 ----------------------
  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files;
    if (file.length === 0) {
      return;
      //  input 이벤트는 실행 됐으나, 실제 파일이 업로드가 되지 않은 경우  그대로 종료
    } else {
      // 그 외의 경우에는 필요한 기능들이 작동

      setModifiedUserInfo({ ...modifiedUserInfo, profile: file });

      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function (e: any) {
        setPreview(e.target.result);
        // 파일 리드를 통해 프리뷰에 미리보기 구현
      };
    }
  }; // ---------------------------------------------------------------

  // ----------------------------- 유저 정보 수정 -----------------------
  const setModifyUserInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
        } else if (value === modifiedUserInfo.pwdCheck) {
          setErrMsg({ ...errMsg, pwdMsg: "" });
          setErrMsg({ ...errMsg, pwdCheckMsg: "" });
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
          setSucessMsg({ ...errMsg, emailMsg: "" });
        } else {
          setErrMsg({ ...errMsg, emailMsg: "" });
        }
        break;
    }
  };
  //-----------------------------------------------------------------------

  //  ------------------------------ 메일 인증 요청  ----------------------------
  const verifyEmailHandler = () => {
    if (userInfo.email === modifiedUserInfo.email) {
      setValidCheck({ ...validCheck, email: true });
      setSucessMsg({ ...errMsg, emailMsg: "이미 인증 된 이메일입니다." });
      setErrMsg({ ...errMsg, emailMsg: "" });
      return;
    } else {
      axios
        .post(`${SERVER}/signup/mail`, { email: modifiedUserInfo.email })
        .then((res: AxiosResponse) => {})
        .catch((err: AxiosError) => {
          console.log("에러메세지", err);
        });
    }
  };
  //  -----------------------------------------------------------------------

  // --------- 모달창 끄기 -------
  const modalOffHandler = () => {
    setModal((value) => !value);
  }; //--------

  // ---------------------------------- 정보 수정 요청 전송  --------------------
  const sendModifiedInfo = () => {
    const { email, pwd, profile } = modifiedUserInfo;

    let formData = new FormData();
    if (profile) {
      formData.append("email", email);
      formData.append("password", pwd);
      formData.append("profile", profile[0]);
    } else {
      formData.append("email", email);
      formData.append("password", pwd);
    }

    axios
      .patch(`${SERVER}/userinfo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      .then((res: AxiosResponse) => {
        switch (res.status) {
          case 200:
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
        alert("정상적으로 변경 완료 되었습니다.");
        navigate("/roomlist");
      })
      .catch((err: any) => {
        console.log("정보수정요청 에러 메시지 : ", err.response.data.message);
        switch (err.response.data.message) {
          case "이메일 인증버튼을 눌러주세요.":
            setErrMsg({ ...errMsg, emailMsg: "이메일 인증이 필요합니다." });
            break;
          case "이메일에서 인증버튼을 눌러주세요.":
            setErrMsg({ ...errMsg, emailMsg: "요청하신 메일에서 인증을 완료해주세요." });
            break;
          case "회원 정보가 존재하지않습니다.":
            setErrMsg({ ...errMsg, emailMsg: "올바르지 못 한 접근입니다." });
            break;
        }
      });
  };
  // ---------------------------------------------------------------------------

  // -------------------회원탈퇴 버튼 함수-------------------------
  const dropoutUserHandler = () => {
    axios
      .delete(`${SERVER}/dropout`, {
        headers: { authorization: `Bearer ${userInfo.accessToken}` },
      })
      .then((res: AxiosResponse) => {
        const accessToken = res.data.accessToken;
        dispatch(dropout(accessToken));
        navigate("/");
      })
      .catch((err: AxiosError) => console.log(err));
    modalOffHandler();
  };
  // ----------------------------------------------

  // ------------- 기본 이미지 -----------------
  const onErrorImg = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = userInfo.profile || "asset/dark_logo.png";
  }; // ----------------------------------

  return (
    <div>
      <NavLink to="/roomlist">
        <Logo alt="LOGO" src="asset/white_logo.png" object-fit="cover" />
      </NavLink>
      <Wrapper>
        <Title>회원정보</Title>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <Input type="text" value={userInfo.userId} disabled />
          <ImageSection>
            <ImageBoard src={preview} onError={onErrorImg} />
            <input
              style={{ display: "none" }}
              id="fileupload"
              type="file"
              accept=".jpg, .png"
              onChange={uploadImageHandler}
            />
            <InnerButton style={{ marginBottom: "1vh" }} as="label" htmlFor="fileupload">
              <BiImageAdd size="2rem" />
              프로필 이미지 변경
            </InnerButton>
          </ImageSection>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={setModifyUserInfo("pwd")}
          />
          <ErrorMsg> {errMsg.pwdMsg} </ErrorMsg>
          <Input
            type="password"
            placeholder="비밀번호를 확인 해주세요"
            onChange={setModifyUserInfo("pwdCheck")}
          />
          <ErrorMsg> {errMsg.pwdCheckMsg} </ErrorMsg>
          <Separation>
            <Input
              type="eamil"
              onChange={setModifyUserInfo("email")}
              defaultValue={userInfo.email}
            />
            <InnerButton id="verify_mail" type="button" onClick={verifyEmailHandler}>
              <MdOutlineMarkEmailRead size="2rem" /> 이메일 인증
            </InnerButton>
          </Separation>
          <ErrorMsg>{errMsg.emailMsg}</ErrorMsg>
          <SuccessMsg> {sucessMsg.emailMsg}</SuccessMsg>
          <ButtonWrapper>
            <div>
              <SmallButton
                type="submit"
                onClick={sendModifiedInfo}
                disabled={validCheck.pwd === true && validCheck.pwdCheck === true ? false : true}
              >
                회원정보 수정
              </SmallButton>
            </div>
            <div>
              <SmallButton
                onClick={() => {
                  setModal(true);
                }}
              >
                회원탈퇴
              </SmallButton>
            </div>
          </ButtonWrapper>
          {modal && (
            <Modal
              modal={modal}
              setModal={setModal}
              width="300"
              height="250"
              element={
                <Container>
                  <div>회원탈퇴를 하시겠습니까?</div>
                  <br />
                  <Buttonbox>
                    <Button type="button" onClick={dropoutUserHandler}>
                      확인
                    </Button>
                    <Button type="button" onClick={modalOffHandler}>
                      취소
                    </Button>
                  </Buttonbox>
                </Container>
              }
            />
          )}
        </Form>
      </Wrapper>
    </div>
  );
};

export default Mypage;
