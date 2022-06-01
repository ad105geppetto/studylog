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
        "leecoding@google.com",
        "1234",
        "/img/사진3.jpg"
    ),
    (
        "joecoding",
        "joecoding@naver.com",
        "1234",
        "/img/사진4.jpg"
    );


INSERT INTO
    `rooms` (
        `title`,
        `entry`,
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
    `logs` (`mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`, `totalTime`)
VALUES
    (1, 2, 3, 4, 5, 4, 6, 345),
    (3, 5, 1, 2, 1, 3, 4, 145),
    (6, 2, 3, 4, 2, 6, 9, 425),
    (2, 1, 1, 4, 3, 3, 7, 745),
    (3, 2, 3, 4, 5, 6, 7, 335);

INSERT INTO
    `todos` (`userId`, `todo`, `progress`, `done`, `content`)
VALUES
    ("kimcoding", false, false, true, "자바스크립트 챕처 1 공부"),
    ("leecoding", false, false, true, "MySQL 챕처 1 공부"),
    ("cheacoding", false, false, true, "타입스크립트 챕처 1 공부"),
    ("choecoding", false, false, true, "리엑트 챕처 1 공부"),
    ("joecoding", false, false, true, "리덕스 챕처 1 공부"),
    ("kimcoding", true, false, false, "자바스크립트 챕처 2 공부"),
    ("leecoding", false, true, false, "MySQL 챕처 4 공부"),
    ("leecoding", true, false, false, "Socket.IO 챕처 1 공부"),
    ("cheacoding", false, true, false, "타입스크립트 챕처 3 공부"),
    ("cheacoding", true, false, false, "Socket.IO 챕처 4 공부"),
    ("choecoding", false, true, false, "Socket.IO 챕처 2 공부"),
    ("choecoding", true, false, false, "리엑트 챕처 11 공부"),
    ("joecoding", false, true, false, "리덕스 챕처 8 공부"),
    ("joecoding", true, false, false, "자바스크립트 챕처 11 공부");


 INSERT INTO `chats` (`userId`, `roomId`, `message`)
 VALUES
 ("kimcoding", 1, "안녕하세요!"),
 ("leecoding", 1, "안녕하세요!!!"),
 ("kimcoding", 1, "코딩 공부 잘되어가시나요?"),
 ("leecoding", 1, "아니요.."),
 ("cheacoding", 2, "안녕하세요!!"),
 ("choecoding", 2, "안녕하세요!"),
 ("joecoding", 2, "안녕하세요!!!"),
 ("cheacoding", 2, "오늘 어디부터였죠?"),
 ("choecoding", 2, "어.. 리덕스해야할거에요"),
 ("joecoding", 2, "맞아요!!");