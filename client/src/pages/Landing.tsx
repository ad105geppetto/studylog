import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  overflow-y: auto;
  font-size: 0;
`;

const Image = styled.img`
  height: 100vh;
  width: 100vw;
  z-index: 1;
`;

const Logo = styled.img`
  position: absolute;
  top: 26vh;
  left: 35vw;
  height: 50%;
  width: 28%;
`;

const Fadein = keyframes`
0% {
  opacity: 0;
  transform: translateY(20px);
}
100% {
  opacity: 1;
  transform: none;
}
`;

const Section = styled.div`
  animation: ${Fadein} 1s ease-in-out; ;
`;

const Title = styled.div`
  position: absolute;
  top: 15vh;
  left: 35vw;
  height: 50%;
  width: 28%;
  font-size: 3vw;
  color: white;
  text-align: center;
`;

const Landing = () => {
  return (
    <Wrapper>
      <Section>
        <Title>
          <div>함께 공부하고,</div>
          <div>기록을 할 땐!</div>
        </Title>
      </Section>
      <NavLink to="/roomlist">
        <Logo alt="studylog" src="asset/white_logo.png" />
      </NavLink>
      <Image alt="LandingPage_1" src="asset/pencils1920.jpg" />
    </Wrapper>
  );
};

export default Landing;
