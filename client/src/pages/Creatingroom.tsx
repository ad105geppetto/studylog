import Nav from "components/Nav";

const Creatingroom = () => {
  const onCreateRoom = () => {};

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <div>
          <label htmlFor="roomName">방제목</label>
          <input type="text" id="roomName" />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input type="text" id="content" />
        </div>
        <button type="button" onClick={onCreateRoom}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Creatingroom;
