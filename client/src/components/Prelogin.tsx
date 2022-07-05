import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Large_Button } from "styles/Userpage_style";

interface NotLoginInterface {
  color: string;
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Prelogin = ({ color }: NotLoginInterface) => {
  const navigate = useNavigate();

  const onNavigate = (url: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(url);
  }; //  ----------------------------------------------------------------------

  return (
    <Wrapper>
      <div style={{ fontSize: "2rem", color: `${color}`, marginBottom: "5rem" }}>
        로그인 후 이용 가능 합니다.
      </div>

      <div>
        <Large_Button onClick={onNavigate("/login")}> 로그인 </Large_Button>
      </div>
      <div>
        <Large_Button onClick={onNavigate("/signup")}> 회원가입</Large_Button>
      </div>
    </Wrapper>
  );
};

export default Prelogin;
