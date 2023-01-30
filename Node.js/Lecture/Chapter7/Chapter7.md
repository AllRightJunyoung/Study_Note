## Node.js와 Express로 REST API를 구축하는 세션
- Node.js + Express App
- ADD Routes
- ADD Controllers & Dummy Logic
- 서버사이드에서 수신된요청이 올바른지 확인한다

동기식 에러 핸들링 방법
- 데이터베이스가 없고 동기식으로 동작하는 경우에는 new throw로 핸들링해도좋다
  - 비동기식 핸들링에서는 next(new Error('Could not find a place for the provided user id.'))를 사용

~~~ js
const express = require('express');
const router = express.Router();
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    const error = new Error('Could not find a place for the provided id.');
    error.code = 404;
    throw error;
  }

  res.json({ place }); // => { place } => { place: place }
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    const error = new Error('Could not find a place for the provided user id.');
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

module.exports = router;
~~~
## Error핸들링을 쉽게하는방법
- 내장된 클래스인 Http에러를 사용한다
~~~ js
class HttpError extends Error {
    constructor(message, errorCode) {
      super(message); // Add a "message" property
      this.code = errorCode; // Adds a "code" property
    }
  }
throw new HttpError('Could not find a place for the provided id.', 404);
로 처리
~~~

## 올바른 request validator 처리하기
- express validator 사용