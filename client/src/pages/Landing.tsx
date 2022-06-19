import Nav from "components/Nav";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

const Wrapper = styled.div`
  overflow-y: auto;
  font-size: 0;
`;

const Image = styled.img`
  height: 100vh;
  width: 100vw;
  z-index: 1;
`;
const InnerImage = styled.img`
  height: 85vh;
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
  const [page, setPage] = useState(0);

  const html = document.documentElement;

  const height = html.scrollHeight / 3;

  const onWheelHandler = (e: any) => {
    e.preventDefault();
    // console.log(e);
    const { deltaY } = e;
    // console.log(deltaY);

    if (deltaY > 0 && page === 0) {
      // 페이지가 내려가는 경우
      window.scrollTo({ top: height, left: 0, behavior: "smooth" });
      setPage(1);
    } else if (deltaY > 0 && page === 1) {
      window.scrollTo({ top: height * 2, left: 0, behavior: "smooth" });
      setPage(2);
    } else if (deltaY < 0 && page === 2) {
      window.scrollTo({ top: height, left: 0, behavior: "smooth" });
      setPage(1);
    } else if (deltaY < 0 && page === 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setPage(0);
    }

    /*
     왜 한번만 작동하고 멈추는걸까?
     scroll to 는 top 만큼 이동하는게 아니라 top이 저 위치까지 이동하는거였음
     
    */
  };

  window.addEventListener("wheel", onWheelHandler, { passive: false });

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

      {/* <div>
        <Nav />
        <InnerImage alt="Landing_page2" src="asset/space.jpg" />
      </div>
      <div>
        <Nav />
        <InnerImage alt="Landing_page3" src="asset/universe.jpg" />
      </div> */}
    </Wrapper>
  );
};

export default Landing;

/*
 
휠 이벤트가 초기 로딩과정에서 버벅거림이 있음
- heigth 값을 구하는데 있어서 버벅거림이 있는것 같은데
- 처음에 LOGO에 애니메이션 효과를 주면서 시간 벌이를 해봄이 어떨까 

*/
