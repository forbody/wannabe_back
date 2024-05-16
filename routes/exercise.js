const express = require('express');
const router = express.Router();
const {getExercises, showRandom, sortExercise, exerciseInfo, hiddenInsert, favorite, unfavorite } =require('../controllers/exercise');
const { verifyToken } = require('../middlewares');

// /v1/exercise/ [GET - 전체 운동data 조회]
router.get('/', getExercises);

// sort별로 운동 목록을 조회할 수 있다. 이미지조회(썸네일)
// /v1/exercise/sort
router.get('/sort', sortExercise);

// 운동 데이터 저장
// router.get('/phj/secret', hiddenInsert);

// 각 운동에 대한 운동 설명, 영상링크 조회
router.get('/info/:id', exerciseInfo);

// 즐겨찾기 하고 싶은 운동을 상단에 표시가능
// router.post (이 기능 하려면 db에 테이블 생성 해야함)
// /v1/exercise/follow
router.post('/follow', verifyToken, favorite);
// router.post('/follow', favorite);
router.delete('/follow', verifyToken, unfavorite);


// /v1/exercise/:user_detail_id [로그인한 사용자가 지정한 셀럽 이미지 주소와 응원 문구 랜덤으로 반환하는 동작 구현]
// (박소희 -> 셀럽id값 알려주면 그때 작성)
router.get('/:user_detail_id', showRandom); //임의로 지정한 것


module.exports = router;