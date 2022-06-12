import Nav from "components/Nav";

const Roomlist = () => {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <input
          type="text"
          placeholder="search"
          // autocomplete="off"
        />
        <span>
          <button>공부방만들기</button>
        </span>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

// 쿠팡 검색 인풋창 ----------------------------------------------------------------
// // {/* <input
//   type="text"
//   id="headerSearchKeyword"
//   class="coupang-search is-speech"
//   name="q"
//   title="쿠팡 상품 검색"
//   value="냉면"
//   data-searchad='{"channel":"", "copy":"찾고 싶은 상품을 검색해보세요!", "linkType":"", "linkContent":"", "newWindow":""}'
//   placeholder="찾고 싶은 상품을 검색해보세요!"
//   autocomplete="off"
// ></input>; */}

// 검색버튼 ----------------------------------------------------------------
{
  /* <a href="javascript:;" id="headerSearchBtn" className="search" title="검색">
  검색
</a>; */
}
export default Roomlist;
