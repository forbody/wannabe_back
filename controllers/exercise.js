const { Exercise, Category } = require('../models');
const express = require('express')
const app = express()

app.use(express.static('img'));

exports.getExercises = async (req, res, next) => {
    console.log('전체 운동data 조회');
    // 추가할 기능 -> 유저가 로그인 했을 경우 좋아요 표시한 운동 목록 조회 가능 기능 구현
    try {
        const exercises = await Exercise.findAll();
        res.json(exercises);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.sortExercise = async (req,res,next) => {
    console.log(req.query.q);
    console.log('sort별 운동 목록 조회');
    try {
        const exercises = await Exercise.findAll({
            where: {sort: req.query.q}
        });
        res.json(exercises);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.exerciseInfo = async (req,res,next) => {
    console.log('각 운동에 대한 상세 정보');
    try {
        const exercise_info = await Exercise.findOne({
            where : { id : req.params.id },
            // attributes: ['description', 'url']  -> react로 원하는 속성값 가져올 수 있음!
        })
        res.json(exercise_info);
    } catch (error) {
        console.error(error);
        next(error);
    }
}
// 즐겨찾기 추가
exports.favorite = async (req, res, next) => {
    console.log('운동 즐겨찾기');
    try {
        // 운동 테이블 목록에서 운동 테이블 요소 하나 가져오기
        const favorite = await Exercise.findOne({
            where: { id: req.body.id }
        });
        console.log(favorite);
        if (favorite) {
            // login 사용자 운동 즐겨찾기
            await favorite.addExerciseFollow(req.user.id);

            // 1번 사용자 운동 즐겨찾기
            // await favorite.addExerciseFollow(1);
            res.json({
                code: 200,
                message: '목록에 추가되었습니다.'
            })
        } else {
            res.json({
                code: 404,
                message: '목록을 조회할 수 없습니다.'
            })
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}
// 즐겨찾기 해제
exports.unfavorite = async (req, res, next) => {
    try {
        const favorite = await Exercise.findOne({
            where: { id: req.body.id }
        });
        if (favorite) {
            await user.removeExerciseFollow(req.user.id);
            res.json({
                code: 200,
                message: "목록에서 제외되었습니다."
            });
        } else {
            res.json({
                code: 404,
                message: "목록을 조회할 수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.showRandom = (req, res, next) => {
    console.log(req.params.user_detail_id);
    console.log('본인이 지정한 셀럽 이미지 배치. 랜덤 문구 표시');
}

// 작업 시 더미데이터 생성 (단, 배포 시 삭제할 것.)
exports.hiddenInsert = async(req, res, next) => {
    await Category.bulkCreate([{
        category_name: '운동',
        img: 'exercise.jpg'
    },{
        category_name: '식단',
        img: 'food.jpg'
    }]);

    await Exercise.bulkCreate([{
        name: '디클라인_벤치프레스',
        sort: '가슴',
        description: '인클라인과는 반대로 땅을 향해 기울어진 벤치 위에서 하는 운동이다. 가슴 하부 근육을 주로 발달시키며 예쁜 가슴 라인을 만들려는 목적으로 하는 운동이다.',
        img: '/img/가슴/디클라인_벤치프레스.png',
        url: 'https://youtube.com/shorts/IVCTkofB3ek?si=XDcBaUq5-Fxtwl1M',
        CategoryId: 1
    },{
        name: '인클라인_바벨_벤치_프레스',
        sort: '가슴',
        description: '평평한 벤치가 비스듬히 세워진 벤치에서 실시한다. 가슴 상부 근육을 좀 더 집중적으로 발달시키는 운동으로 보기 좋은 가슴 근육을 만들기 위해 빼놓을 수 없는 운동이다.',
        img: '/img/가슴/인클라인_바벨_벤치_프레스.jpg',
        url: 'https://youtube.com/shorts/RO39negnXxM?si=pTNKEPPPonLJ49vw',
        CategoryId: 1
    },{
        name: '체스트_프레스_머신',
        sort: '가슴',
        description: '상체근육을 강화하는 데 효율적인 운동기구 중 하나다. 무엇보다 기구에 앉아서 운동을 하기 때문에 자세 유지가 쉽다. 즉 초보자들이 안전하게 상체근육을 강화할 수 있다. 또 다양한 그립과 각도설정을 통해 여러 가슴근육을 자극할 수 있다.체스트프레스머신은 가슴, 어깨, 팔 등 상체 전반의 근육강화에 도움이 된다. 구체적으로 가슴근육, 어깨근육, 상완삼두근 등 상체근력을 단련할 수 있다. 또 전방거근과 이두근 등 다른 근육도 단련시킬 수 있다.단순히 상체근육을 강화하는 것 외에도 일상생활에서 필요한 상체 힘과 지구력을 향상시키는 데도 도움이 된다. 특히 고령자가 일상생활을 보다 쉽고 효율적으로 수행할 수 있는 근력을 길러준다. 또 골다공증 예방에도 도움을 준다.',
        img: '/img/체스트_프레스_머신.png',
        url: 'https://youtube.com/shorts/eLbsMnfoCq8?si=Ow9P17yRnGYYZ2wG',
        CategoryId: 1
    },{
        name: '펙덱_플라이',
        sort: '가슴',
        description: '대흉근의 흉근안쪽과 바깥쪽을 두텁게 해주며 지속적인 긴장을 유도한다. 뿐만 아니라 강도와 섬세함에 주안점을 두는 고립운동이다.',
        img: '/img/펙덱_플라이.jpg',
        url: 'https://youtube.com/shorts/f4SeWGYCdSk?si=TEKPvk5YX1XyQNuh',
        CategoryId: 1
    },{
        name: '플랫_벤치프레스',
        sort: '가슴',
        description: '글자 그대로 평평한 벤치에 누워서 한다. 일반적으로 벤치 프레스라고 하면 이것을 가리키며 많은 사람들이 선호하는 가슴 운동이다 . 벤치 프레스는 대흉근을 크게 키우는 대표적인 운동이지만, 부가적으로 삼두근도 발달시킨다. 벤치프레스는 가슴부위의 전면적인 형태를 만들어주는 가장 넓은 범위의 가슴운동이다.',
        img: '/img/플랫_벤치프레스.png',
        url: 'https://youtube.com/shorts/ub936ioAT9o?si=xus4aA69Xq0kigoP',
        CategoryId: 1
    },{
        name: '랫풀다운',
        sort: '등',
        description: '턱걸이를 하듯 어깨보다 좀 더 넓게 바를 잡은 다음, 상체를 뒤로 젖히고 팔이 아니라 등의 힘으로 당겨 내려오는 방식이 가장 기본적인 형태이다. 턱걸이와 가동부위는 거의 같으며, 좁게 잡을수록 광배근 안쪽이, 넓게 잡을수록 상부와 바깥쪽이 발달된다.',
        img: '/img/랫풀다운.webp',
        url: 'https://youtube.com/shorts/y5YNjCUzCpE?si=I56kZhtHaza0t9K0',
        CategoryId: 1
    },{
        name: '바벨로우',
        sort: '등',
        description: '등을 키우는 좋은 운동이다. 노를 젓는 것과 같다고 해서 로우라고 하며, 각도나 그립 종류, 그립을 잡는 넓이에 따라서 자극 부위가 달라져 그만큼 세부적으로 등을 키울 수 있으며 턱걸이가 등 상부를 담당한다면 로우는 등의 중하부와 코어 근육도 함께 단련 돼 몸을 더 탄탄하게 만들어준다. ',
        img: '/img/바벨로우.jpg',
        url: 'https://youtube.com/shorts/_sdc6D6WvtU?si=7ApWJ6Rh0c2qbOXM',
        CategoryId: 1
    },{
        name: '시티드로우',
        sort: '등',
        description: '멋진 역삼각형 몸매를 위한 등을 키워주는 운동들 중 하나이다.핸들에서 적당한 거리를 두고 앉은 뒤, 허리가 곧게 편 상태를 계속 유지해 주며 핸들을 몸 쪽으로 당겼다 놓는 동작을 반복한다. 마치 조정선수가 노를 젓는 것처럼 상체를 앞뒤로 젖히며 힘을 더하기도 하지만 상체를 고정시켜서 사용 근육을 특정 부위에 더 고립시켜주기도 한다. 흔히 사용되는 좁은 그립은 광배근에, 넓은 그립은 승모근 하부에 집중이 된다.',
        img: '/img/시티드로우.webp',
        url: 'https://youtube.com/shorts/t6edD5c7QWw?si=HjJ2amzNeg7fpl-p',
        CategoryId: 1
    },{
        name: '컨벤셔널_데드리프트',
        sort: '등',
        description: '웨이트 트레이닝을 대표하는 3대 운동(스쿼트, 벤치 프레스, 데드리프트) 중 하나이다. 신체 대부분의 근육까지 개입되는 최고의 전신 복합운동이며 등을 포함해 척추기립근, 대둔근, 햄스트링, 하체까지 사용하는 운동이다.',
        img: '/img/컨벤셔널_데드리프트.jpg',
        url: 'https://youtube.com/shorts/eip18bNyWMQ?si=aHrB0WTsEyGu8LXH',
        CategoryId: 1
    },{
        name: '케이블_풀다운',
        sort: '등',
        description: ' 케이블을 사용하여 광배근을 자극 시키는 단일 관절 운동이며 위에서 아래도 당기는 수직운동이기 때문에 광배근의 수축과 이완을 최대한 활용할 수 있고, 등의 너비를 넓혀주는 효과를 보여준다.',
        img: '/img/케이블_풀다운.webp',
        url: 'https://youtube.com/shorts/cTckQ2sXQPM?si=9L2bChp0S9P40TNM',
        CategoryId: 1
    },{
        name: '덤벨숄더프레스',
        sort: '어깨',
        description: '어깨의 삼각근을 발달시키는 운동. 삼각근의 뒷면보다는 앞과 옆면쪽을 타겟팅한다.',
        img: '/img/덤벨숄더프레스.png',
        url: 'https://youtube.com/shorts/6Jo5uCUOOy4?si=LXvlJFIBLHufatLB',
        CategoryId: 1
    },{
        name: '벤트오버레터럴레이즈',
        sort: '어깨',
        description: '어깨의 뒷부분 후면을 자극하기에 가장 좋은 운동으로 몸을 숙이고 하는 팔을 옆으로 뻗는 운동.',
        img: '/img/벤트오버레터럴레이즈.png',
        url: 'https://youtube.com/shorts/pRRlXqSY2Qc?si=qP4bvmMvaYoEWUCR',
        CategoryId: 1
    },{
        name: '사이드레터럴레이즈',
        sort: '어깨',
        description: '어깨를 낮추고 힘을 빼고, 덤벨을 든 손을 위로 올린다고 생각하지 말고 최대한 옆으로 멀리 보낸다는 생각을 하며 수행하면 승모근보다는 측면 삼각근에 제대로 자극을 먹일 수 있다',
        img: '/img/사이드레터럴레이즈.png',
        url: 'https://youtube.com/shorts/1HhMAvo9zTg?si=S2i4ivtLmkEW-iVt',
        CategoryId: 1
    },{
        name: '스미스_머신_숄더_프레스',
        sort: '어깨',
        description: '코어 단련에 들어가는 에너지를 좀 더 삼각근의 움직임과 자극에 집중할 수 있게 해준다. 즉, 하체나 코어의 협응보다는 삼각근 발달 그 자체에 목적을 두는 운동이다.',
        img: '/img/스미스_머신_숄더_프레스.png',
        url: 'https://youtube.com/shorts/UdWVe9bUVIk?si=98ehbbDc_kPS1Lbt',
        CategoryId: 1
    },{ 
        name: '프런트_레이즈',
        sort: '어깨',
        description: '원판을 앞으로 들어올리는 운동으로 전면 삼각근을 강화하기에 좋은 운동.',
        img: '/img/프런트_레이즈.png',
        url: 'https://youtube.com/shorts/bM8dWCNkW8M?si=NVmQBmVJid1-ZfLt',
        CategoryId: 1
    },{
        name: '스쿼트',
        sort: '전신',
        description: '하체운동 중에서도 가장 에너지를 많이 소비하는 운동이라 체지방 감소에도 효과가 크다. 적은 중량으로 고반복을 하거나 아예 빈 봉 스쿼트, 혹은 맨몸으로 하면 인터벌 유산소 운동으로도 적격이다. 또한 대표적인 다관절 운동인 스쿼트 훈련을 통해 하체 근육 대부분에 자극을 줄 수 있으며 전체적인 근육의 성장을 이룰 수 있다. 또한 허리나 코어 근육에도 많은 도움이 된다.',
        img: '/img/스쿼트.png',
        url: 'https://youtube.com/shorts/JzfEeZ-WYKE?si=ZKBLz6NlOaRgF_uR',
        CategoryId: 1
    },{
        name: '풀업',
        sort: '전신',
        description: '어떤 운동을 하든 등근육을 발달시키기 위해서는 반드시 들어가는 필수 동작으로 그 중요성과 효율성은 두말할 필요가 없는 그야말로 최고의 맨몸운동.',
        img: '/img/풀업.webp',
        url: 'https://youtube.com/shorts/T-EZHtEx8Jw?si=ptTtccWHlJuXsX9O',
        CategoryId: 1
    },{
        name: '플랭크',
        sort: '전신',
        description: '허리, 관절, 힘줄, 인대를 사용하지 않는 맨몸 운동의 일종으로써 땅과 몸만 있으면 어디서나 가능한 운동이다. 효과적인 코어/복근 운동이며, 허리디스크 재활 운동 안내에 거의 빠지지 않는 운동 ',
        img: '/img/플랭크.png',
        url: 'https://youtube.com/shorts/LVTJ26bbhUA?si=-t_RVAYrtvzRUIyO',
        CategoryId: 1
    },{
        name: '덤벨컬',
        sort: '팔',
        description: '아령(덤벨)을 들고 팔을 굽히는 운동이다. 주 타격부위는 이두근이며 보조로 삼각근 전면과 전완근이 쓰인다. 덤벨 컬은 양쪽 이두근의 균형잡힌 발달과 높은 범용성의 장점이 있다.',
        img: '/img/덤벨컬.png',
        url: 'https://youtube.com/shorts/2Tr67sP10QE?si=u8RAIprQ7Isr3s41',
        CategoryId: 1
    },{
        name: '바벨컬',
        sort: '팔',
        description: '무산소 운동의 하나로 이두근을 키우는데 필수적인 운동이다. 일반적으로 바벨과 덤벨의 사용이 둘 다 가능한 운동들과 같이 바벨 컬도 덤벨 컬에 비해 더 많은 무게를 사용할 수 있기 때문에 이두근의 크기를 키우는데 더 유리하다.',
        img: '/img/바벨컬.png',
        url: 'https://youtube.com/shorts/TJmc476epeg?si=nbWvnElbOs19zaSY',
        CategoryId: 1
    },{
        name: '리스트컬',
        sort: '팔',
        description: '전완근 근육 향상을 목표로 팔뚝 굵기를 키우고 싶다거나 야구나 팔씨름 등의 훈련을 위해 하는 운동. ',
        img: '/img/리스트컬.webp',
        url: 'https://youtube.com/shorts/DwPA31mKiFI?si=znxqz2QvRXCqkrjf',
        CategoryId: 1
    },{
        name: '라잉트라이셉스_익스텐션',
        sort: '팔',
        description: '무산소 운동의 하나로 삼두근과 전완근을 개발하는 운동. 팔 두께의 2/3를 차지하는 삼두근의 벌크 향상에 가장 효과적인 운동이기 때문에 굵은 팔을 만드는 데 큰 도움이 되는 운동 중 하나이다. 참고로 손목으로 버티기 때문에 전완근도 같이 된다.',
        img: '/img/라잉트라이셉스_익스텐션.webp',
        url: 'https://youtube.com/shorts/doVZ0vNnX3c?si=gBluygoTPkLhhWd2',
        CategoryId: 1
    },{
        name: '레그익스텐션',
        sort: '하체',
        description: '헬스장에서 쉽게 볼 수 있는 하체를 단련하기 위한 웨이트 트레이닝 운동. 대퇴직근에 타겟팅하는데 대퇴직근은 광근과 다르게 무릎을 펴는 역할 뿐만 아니라 대퇴골을 들어올리는 역할, 즉 고관절을 굴곡시키는 기능도 가지고 있기 때문에 수축할 때 허벅지를 들어 올린다는 느낌으로 수축시키고, 내릴 때 살짝 골반을 들어서 최대 이완을 유도하면 대퇴직근에 강한 자극을 느낄 수 있다.',
        img: '/img/레그익스텐션.png',
        url: 'https://youtube.com/shorts/MpdQ2S_G0J8?si=QPuh8bRBgqDx3m1k',
        CategoryId: 1
    },{
        name: '레그컬',
        sort: '하체',
        description: '업드린 채 다리를 굽혀 운동하는 웨이트 트레이닝의 한 종류이다. 주동근은 햄스트링이며, 보조근은 대퇴 사두근 등이다.',
        img: '/img/레그컬.png',
        url: 'https://youtube.com/shorts/fJtfxLTyml0?si=C6Ig_XyFWsyWFYpg',
        CategoryId: 1
    },{
        name: '레그프레스',
        sort: '하체',
        description: '머신을 이용하여 사선 방향으로 고중량의 무게를 밀어내는 하체 운동의 한 종류. 초보자가 해도 비교적 높은 중량을 다루는 게 가능한 운동인데, 무릎 관절에 하중이 많이 실리기에 운동 시 각별한 주의를 요한다. ',
        img: '/img/레그프레스.png',
        url: 'https://youtube.com/shorts/FcHwWI2sulg?si=8SzfPPvWM46fVvwS',
        CategoryId: 1
    },{
        name: '힙어덕션',
        sort: '하체',
        description: '저항 운동으로 타깃 근육으로 무게를 저항하면서 하는 운동이다. 머신의 쿠션쪽 방향에 따라서 내전근을 운동할건지 대둔근을 운동할건지 결정이 된다.',
        img: '/img/힙어덕션.png',
        url: 'https://youtube.com/shorts/IIz-inQQU5U?si=NWt-6PLChCa8gDYw',
        CategoryId: 1
    }])

    res.json({result: 'ok'});
}