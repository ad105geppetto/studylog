-- drop database studylog;
-- create database studylog;
-- mysql -u root -p < ./server/db/studylog.sql -Dstudylog;
-- mysql -u root -p < server/db/seed.sql -Dstudylog;
INSERT INTO
    `users` (
        `userId`,
        `email`,
        `password`,
        `profile`
    )
VALUES
    (
        "kimcoding",
        "kimcoding@naver.com",
        "1234",
        "/img/사진0.jpg"
    ),
    (
        "cheacoding",
        "cheacoding@google.com",
        "1234",
        "/img/사진1.jpg"
    ),
    (
        "choecoding",
        "choecoding@naver.com",
        "1234",
        "/img/사진2.jpg"
    ),
    (
        "leecoding",
        "dhrjdn@naver.com",
        "1234",
        "/img/사진3.jpg"
    ),
    (
        "joecoding",
        "hdhj1026@naver.net",
        "1234",
        "/img/사진4.jpg"
    );

INSERT INTO
    `rooms` (
        `title`,
        `roomCurrent`,
        `content`
    )
VALUES
    (
        "자바스크립트 뽀개기",
        4,
        "열공!"
    ),
    (
        "SW 개발자 공부",
        4,
        "오늘도 화이팅!!"
    ),
    (
        "백엔드 지망생 공부방",
        4,
        "node.js, express.js, etc"
    ),
    (
        "프론트엔드 지망생 공부방",
        4,
        "React, Redux, etc"
    ),
    (
        "오늘도 코딩",
        4,
        "내일도 코딩"
    ),
    (
        "하루만 침대서 자고싶어~",
        4,
        "WOW"
    );

INSERT INTO
    `logs` (
        `mon`,
        `tue`,
        `wed`,
        `thu`,
        `fri`,
        `sat`,
        `sun`,
        `totalTime`
    )
VALUES
    (1, 2, 3, 4, 5, 4, 6, 345),
    (3, 5, 1, 2, 1, 3, 4, 145),
    (6, 2, 3, 4, 2, 6, 9, 425),
    (2, 1, 1, 4, 3, 3, 7, 745),
    (3, 2, 3, 4, 5, 6, 7, 335);

INSERT INTO
    `todos` (`userId`, `type`, `content`)
VALUES
    (1, "Todo", "자바스크립트 챕처 1 공부"),
    (4, "Progress", "MySQL 챕처 1 공부"),
    (2, "Done", "타입스크립트 챕처 1 공부"),
    (3, "Todo", "리엑트 챕처 1 공부"),
    (5, "Progress", "리덕스 챕처 1 공부"),
    (1, "Done", "자바스크립트 챕처 2 공부"),
    (4, "Todo", "MySQL 챕처 4 공부"),
    (4, "Progress", "Socket.IO 챕처 1 공부"),
    (2, "Done", "타입스크립트 챕처 3 공부"),
    (2, "Todo", "Socket.IO 챕처 4 공부"),
    (3, "Progress", "Socket.IO 챕처 2 공부"),
    (3, "Done", "리엑트 챕처 11 공부"),
    (5, "Todo", "리덕스 챕처 8 공부"),
    (5, "Progress", "자바스크립트 챕처 11 공부");

INSERT INTO
    `auth` (`certNum`, `email`, `verification`)
VALUES
    ("123", "admin@naver.com", 1);