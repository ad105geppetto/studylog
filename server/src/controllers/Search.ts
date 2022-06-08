import models from "../models/Search"

export default {
  get: (req, res) => {
    models.get((error, result) => {
      if (error) {
        res.status(500).json({ message: "Internal Sever Error" })
      } else {
        const { title, limit, page } = req.query
        const reg = new RegExp(`${title}`);
        const rooms = result.filter((post) => reg.test(post.title));
        if (rooms.length !== 0) {
          const newResult = rooms.slice();
          const stack = [];  // 각 페이지가 보관 될 stack 배열 생성
          const totalPage = Math.ceil(newResult.length / limit) // 배열의 갯수를 limit으로 나누어 전체 페이지 수를 결정!

          for (let i = 0; i < totalPage; i++) {
            stack.push(newResult.splice(0, limit))
          }

          if (page > totalPage) {
            res.status(400).json({ message: `page는 ${totalPage} 이하여야 합니다.` })
          } else if (page <= 0) {
            res.status(400).json({ message: "page는 1 이상이어야 합니다." })
          } else {
            res.status(200).json({ data: stack[page - 1], total: limit })
          }
          res
            .status(200)
            .json({ data: rooms, total: rooms.length, message: "페이지 게시물들을 가져왔습니다." });
        } else {
          res.status(400).json({ message: "검색 결과 게시물이 존재하지 않습니다." });
        }
      }
    })
  }
}