![unknown (2)](https://user-images.githubusercontent.com/92367032/183646537-18084af6-d1e4-4d08-b19c-f3d27de3ef79.png)

## 🐋 Welcome

**본 레포지토리는 코드스테이츠(부트캠프) 수료 이후, 개선 및 추가 사항들을 반영하면서 그 기록들을 남긴 곳입니다.**

## ✏️ Intro

**프로젝트명: Studylog**

**팀 구성: 프론트 2명, 백앤드 2명 (백앤드 개발자로서 참여)**

~~**배포 Link: https://studylog.tk/**~~

- **현재 AWS 비용 문제로 인해 배포를 중지하였습니다. 필요하시면 소프트웨어를 다운로드하신 후 확인해주시기 바랍니다.**

## ✏️ About

“**StudyLog에서 모각공(모여서 각자 공부)하자!”**

**스터디카페에 가기는 귀찮고 혼자하자니 집중이 잘 안되시나요?**

**StudyLog에서는 함께 공부도 하고 기록도 할 수 있습니다.**

<div align=left>
    <h2>📚 STACKS</h2>
    <div align=left>
        <h4>CLIENT</h4>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
        <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
        <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
        <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
        <img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=WebRTC&logoColor=white">
        <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
    </div>
    <div align=left>
        <h4>SERVER</h4>
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
        <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
        <img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">
        <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white">
    </div>
    <div align=left>
        <h4>AWS</h4>
    <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white">
    <img src="https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
    <img src="https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
    <img src="https://img.shields.io/badge/RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
    </div>
</div>

## 📌 Install

```bash
## Client와 Server 각각의 폴더에서 설치
$ npm install
```

## 📌 Settings

### Client

```bash
## Client의 .env.example 파일명을 .env로 변경하여 사용
## .env 안에 들어갈 내용
REACT_APP_SERVER=http://localhost:4000
REACT_APP_GOOGLE_CLIENT_ID= 구글 클라이언트 정보의 Client ID
REACT_APP_GOOGLE_CLIENT_SECRET= 구글 클라이언트 정보의 Client SECRET
```

### Server

```bash
## Server의 .env.example 파일명을 .env로 변경하여 사용
## .env 안에 들어갈 내용
DATABASE_HOST= db 호스트
DATABASE_USER= db 계정
DATABASE_PORT= db 포트 번호
DATABASE_NAME= db 이름
DATABASE_PASSWORD= db 패스워드

SERVER_PORT= 서버 포트 번호(ex: 4000)

ACCESS_SECRET= jwt access 시크릿 키
REFRESH_SECRET= jwt refresh 시크릿 키

GOOGLE_CLIENT_ID= 구글 클라이언트 정보의 Client ID
GOOGLE_CLIENT_SECRET= 구글 클라이언트 정보의 Client SECRET

KAKAO_CLIENT_ID= 카카오 클라이언트 정보의 Client ID
KAKAO_CLIENT_SECRET= 카카오 클라이언트 정보의 Client SECRET


MAIL_ID= 보내는 메일의 주소
MAIL_PASSWORD= 보내는 메일의 비밀번호

SERVER=http://localhost:4000
CLIENT=http://localhost:3000/login
```

## 📌 앱 실행

```bash
## Client와 Server 각각의 폴더에서 실행
$ npm run start
```

## ✨ Feature

- **화상으로 거리 또는 시간에 관계없이 팀원과 의견을 실시간으로 공유하며 공부할 수 있습니다.**
- **4인까지 참여할 수 있는 채팅방에서 친구들과 같이 얼굴을 보며 대화와 채팅을 할 수 있습니다.**
- **todo목록을 할일, 진행중, 완료 3가지 단계로 구별하여 볼 수 있는 칸반보드를 제공합니다.**
- **일주일 간의 공부시간을 그래프화하여 확인하고 일주일간의 총 공부시간을 확인해볼 수 있습니다.**

<details>
    <summary><h3>1. 사용 스택 및 스택 아키텍쳐</h3></summary>
    <img src="https://user-images.githubusercontent.com/92367032/194754456-aac6da93-a940-47c3-a87a-9b33659d3f5e.png"/>
</details>

<details>
  <summary><h3>2. Wirframe</h3></summary>
  <details markdown="1">
    <summary>Landing Page</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170005268-4671e16e-59f1-4522-b93a-282c15ffcd6d.png"/>
  </details>
  <details markdown="2">
    <summary>회원 가입</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170005642-2981f006-e972-464a-a965-9b48944eb6a5.png"/>
  </details>

  <details markdown="3">
    <summary>로그인</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170005773-1f60cfc6-3252-4b4e-9d02-e059bfcbb8ff.png"/>
  </details>

  <details markdown="4">
    <summary>내 정보</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170005895-50f451a1-8b2d-4192-84c1-cab33bf8804c.png"/>
  </details>

  <details markdown="5">
    <summary>ID 찾기</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006034-41b115f5-48e6-42cf-9ba8-0d4fa9da42af.png"/>
  </details>

  <details markdown="6">
    <summary>PWD 찾기</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006144-e4f3960b-78ad-490b-abba-45c93cea3315.png"/>
  </details>

  <details markdown="7">
    <summary>공부방 목록</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006310-9a6c3539-faea-42b6-8d00-9a12ac89c25f.png"/>
  </details>

  <details markdown="8">
    <summary>공부방 생성</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006421-7224a5f7-70b2-4296-af8c-d4ffbcde70ae.png"/>
  </details>

  <details markdown="9">
    <summary>화상 채팅</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006564-087aa1e1-1541-4be5-95a8-012fd038f4ab.png"/>
  </details>

  <details markdown="10">
    <summary>Study To-Do</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006768-6cd2e5a7-f59e-4f06-ae05-fc1b03dbe945.png"/>
  </details>

  <details markdown="11">
    <summary>나의 공부</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170006855-7154170a-da8d-438c-8f7a-66af5e9ebe40.png"/>
  </details>

  <details markdown="12">
    <summary>관련 모달</summary>
    <img src="https://user-images.githubusercontent.com/92367032/170007028-2d263584-1cb2-4f6d-a221-c3d99c5e23c1.png"/>
  </details>
</details>

<details>
  <summary><h3>3. UI 디자인</h3></summary>
  
  <details markdown="1">
  <summary>Landing Page</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170432352-0783ca21-09ff-4234-b5fb-980f23af820c.png"/>
   <img src="https://user-images.githubusercontent.com/48144688/170432362-61cde06a-67ff-44e8-9e20-2b9ca57400d2.png"/>
   <img src="https://user-images.githubusercontent.com/48144688/170432369-d357e16e-8ff9-4d7a-a8ec-42178135bc8e.png"/>
  </details>

  <details markdown="2">
  <summary>회원 가입</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170428295-7b817d2f-86ad-4700-86bd-93a3ce151827.png"/>
  </details>

  <details markdown="3">
  <summary>로그인</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170432044-26e83174-1ced-4d5b-b175-52b0f8e8b05a.png"/>
  </details>

  <details markdown="4">
  <summary>내 정보</summary>
  <img src="https://user-images.githubusercontent.com/48144688/170432105-c8b9837c-95a1-4f1e-973e-aba5b10096ce.png"/>
  </details>

  <details markdown="5">
  <summary>ID 찾기</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170431501-f7160ea0-bb38-4b27-986c-e8f962af5344.png"/>
  </details>

  <details markdown="6">
  <summary>PWD 찾기</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170431520-4b159031-dc85-49a7-8044-42eccfecc52b.png"/>
  </details>

  <details markdown="7">
  <summary>공부방 목록</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170431250-2192c529-3ccd-4adf-a665-f115b1cfc946.png"/>
  </details>

  <details markdown="8">
  <summary>공부방 생성</summary>
   <img src="https://user-images.githubusercontent.com/48144688/170431095-a73f9a6c-5b28-4c26-9c6d-55a77726ddf8.png"/>
  </details>

  <details markdown="9">
  <summary>화상 채팅</summary>
   <img src="https://user-images.githubusercontent.com/92367032/170011592-fcbccef3-ce45-4ca5-80fa-236508d4dff6.png"/>
   <img src="https://user-images.githubusercontent.com/48144688/170150998-b95aa3a4-f804-442f-9ac1-ba6fc410d68b.png"/>
  </details>

  <details markdown="10">
  <summary>Study To-Do</summary>
  <img src="https://user-images.githubusercontent.com/48144688/170430680-b49a7fc6-247d-47db-83f3-8878b03b7b85.png"/>
  </details>

  <details markdown="11">
  <summary>나의 공부</summary>
  <img src="https://user-images.githubusercontent.com/48144688/170430642-7d132f75-2c26-4547-951c-94d6128ea24f.png"/>
  </details>

  <details markdown="12">
  <summary>관련 모달</summary>
  <img src="https://user-images.githubusercontent.com/48144688/170430483-9afefb1d-f042-4996-8fb3-981ebd038c3e.png"/>
  </details>
</details>

<details>
    <summary><h3>4. DB 스키마</h3></summary>
    <img src="https://user-images.githubusercontent.com/92367032/194754590-d9db6f3e-b07f-44b8-98d6-46335c0c4ad1.png"/>
</details>

<details>
    <summary><h3>5. API 문서</h3></summary>
    <div markdown="1">
    https://ad105geppetto.gitbook.io/studylog-api/
    </div>
</details>

<details>
    <summary><h3>6. 주요 기능별 시연 GIF</h3></summary>
    <details>
    <summary>랜딩 및 로딩 페이지</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194755208-04b95d30-5784-4365-9442-16576edc6dd7.gif"/>
    </div>
    </details>
    <details>
    <summary>회원가입</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194755853-5a2f8a0e-4214-478e-a9d4-2be5cbe7c7cf.gif"/>   
    </div>
    </details>
    <details>
    <summary>로그인</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194755893-20041e93-0c53-416c-86d0-71fa75aab233.gif"/>
        <img src="https://user-images.githubusercontent.com/92367032/194755920-4910a1b8-d203-4336-9bf0-1ef4aaa187ec.gif"/>
    </div>
    </details>
    <details>
    <summary>마이페이지</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194756022-638e2b57-5c8f-4ee0-9519-e28dbd2be87f.gif"/>
    </div>
    </details>
    <details>
    <summary>로그아웃</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194756056-03b589c6-80d5-40c7-ab86-ec5315bb3606.gif"/>
    </div>
    </details>
    <details>
    <summary>아이디/패스워드 찾기</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194756097-14f1e8fc-7d1e-4a42-899c-0492038bc10e.gif"/>
        <img src="https://user-images.githubusercontent.com/92367032/194756101-5dc9ff73-fc98-49f1-a719-3a1b7c5caca7.gif"/>
    </div>
    </details>
    <details>
    <summary>Todo 칸반보드</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194757354-f0041205-ed4c-4485-8353-882ea812fa8e.gif"/>
    </div>
    </details>
    <details>
    <summary>공부시간 차트</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194757377-2cb75682-2eba-46f4-80a6-9511558c149d.gif"/>
    </div>
    </details>
    <details>
    <summary>공부방 목록</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194757398-dedb2177-1625-4b6b-a68e-c3e2bef2947e.gif"/>
    </div>
    </details>
    <details>
    <summary>공부방 생성</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194757439-ff31bd25-ae60-4e40-924a-183a42c07f21.gif"/>
    </div>
    </details>
    <details>
    <summary>공부방 사용</summary>
    <div markdown="1">
        <img src="https://user-images.githubusercontent.com/92367032/194757477-e26e46d0-4c17-4856-882e-03c94e9cc945.gif"/>
    </div>
    </details>
</details>

## 🔥 Refactoring

- **의미있는 변수와 함수 이름으로 변경하기**

## 💧 Additional Details

- **카카오 소셜 로그인 추가하기**
- **Typescript type 재작성하기**
- **데이터베이스에 비밀번호 암호화하여 저장하기**
