import Nav from "components/Nav";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

const Wrapper = styled.div`
  overflow-y: auto;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const Image = styled.img`
  height: 100vh;
  width: 100vw;
  z-index: 1;
`;
const InnerImage = styled.img`
  height: 93vh;
  width: 100vw;
  z-index: 1;
`;
const Logo = styled.img`
  position: absolute;
  top: 25vh;
  left: 35vw;
  max-height: 50vh;
  max-width: 50vh;
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
      <div>
        <NavLink to="/guide">
          <Logo alt="studylog" src="asset/white_logo.png" />
        </NavLink>
        <Image alt="LandingPage_1" src="asset/pencils1920.jpg" />
      </div>
      <div>
        <Nav />
        <InnerImage alt="Landing_page2" src="asset/space.jpg" />
      </div>
      <div>
        <Nav />
        <InnerImage alt="Landing_page3" src="asset/universe.jpg" />
      </div>
    </Wrapper>
  );
};

export default Landing;
