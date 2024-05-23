const { User, sequelize } = require('../models');
const { Food, Category, Todo_element } = require('../models');
const moment = require('moment');

exports.uploadFood = async  (req, res, next) => {
    try {
        const fakeFood = [
            { "name":"국밥" , "calory":418, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"농어초밥" , "calory":396, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"돼지국밥" , "calory":911, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"류산슬덮밥" , "calory":574, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"멍게비빔밥" , "calory":547, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"멸치주먹밥" , "calory":312, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"묵밥" , "calory":642, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"문어초밥" , "calory":392, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"비빔밥" , "calory":691, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"삼선볶음밥" , "calory":686, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우초밥" , "calory":387, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우튀김롤" , "calory":606, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"샐러드김밥" , "calory":405, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"생선초밥(광어)" , "calory":453, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"생선초밥(모듬)" , "calory":461, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"소고기국밥" , "calory":330, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"소고기김밥" , "calory":400, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"송이덮밥" , "calory":581, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"숯불갈비 삼각김밥" , "calory":161, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"약초비빔밥" , "calory":511, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"연어롤" , "calory":510, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"연어초밥" , "calory":47, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오곡밥" , "calory":388, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"자장밥" , "calory":741, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"잡탕밥" , "calory":777, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"장어덮밥" , "calory":716, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"장어초밥" , "calory":486, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"참치덮밥" , "calory":679, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"참치마요네즈 삼각김밥" , "calory":172, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"충무김밥" , "calory":583, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"캘리포니아롤" , "calory":487, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"한치초밥" , "calory":374, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"해물덮밥" , "calory":771, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"해물볶음밥" , "calory":705, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"회덮밥" , "calory":683, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"치킨퐁듀 그라탕" , "calory":370, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"트러플 리조또" , "calory":121, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"BBQ갈비라이스" , "calory":567, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"베이컨 크림리조또" , "calory":567, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우리조또" , "calory":545, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"낙지리조또" , "calory":574, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콘치즈그라탕" , "calory":365, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"불고기 크림 리소토" , "calory":410, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"클래식 햄 로제 리소토" , "calory":510, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"유기쌀로만든햇살밥" , "calory":325, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"간편곤드레나물밥" , "calory":415, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"구궁가마솥연잎찰밥" , "calory":400, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우볶음밥" , "calory":325, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"잡채볶음밥" , "calory":360, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"짜장컵밥" , "calory":360, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"치킨데리야끼볶음밥" , "calory":415, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"카레컵밥" , "calory":360, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"치킨 크림 리조또" , "calory":454, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"스파이시 씨푸드 리조또" , "calory":361, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"로제 펜네 그라탕" , "calory":383, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쏘야그라탕(소세지야채)" , "calory":306, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"검정콩밥" , "calory":330, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"계란볶음밥" , "calory":84, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"고추김밥" , "calory":490, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"기장밥" , "calory":331, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김밥" , "calory":322, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김치김밥" , "calory":351, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김치볶음밥" , "calory":550, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"낙지덮밥" , "calory":525, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"날치알김밥" , "calory":461, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"닭고기덮밥" , "calory":510, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"돈까스김밥" , "calory":646, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"돌솥비빔밥" , "calory":558, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"돼지머리국밥	 " , "calory":1233, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"모듬회덮밥" , "calory":593, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"무밥" , "calory":266, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"보리밥" , "calory":321, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"볶음밥" , "calory":640, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"불고기덮밥" , "calory":728, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"비빔밥" , "calory":637, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우볶음밥" , "calory":635, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"생선모듬초밥" , "calory":607, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"소머리국밥" , "calory":239, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기김밥" , "calory":447, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기볶음밥" , "calory":456, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기주먹밥" , "calory":355, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"수수밥" , "calory":321, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"순대국밥" , "calory":673, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"알밥" , "calory":422, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"영양돌솥밥" , "calory":643, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오므라이스" , "calory":692, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오징어덮밥" , "calory":484, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"완두콩밥" , "calory":276, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"유부초밥" , "calory":388, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"육회비빔밥" , "calory":442, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"잡곡밥" , "calory":292, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"잡채밥" , "calory":825, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"제육덮밥" , "calory":949, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"짜장밥" , "calory":572, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"짬뽕밥" , "calory":647, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"차조밥" , "calory":313, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"찰밥" , "calory":429, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"참치김밥" , "calory":435, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"참치마요삼각김밥" , "calory":398, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"참치볶음밥" , "calory":412, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"채소김밥" , "calory":442, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"채소볶음밥" , "calory":474, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"치즈김밥" , "calory":476, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"카레라이스" , "calory":518, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩나물국밥" , "calory":403, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩나물밥" , "calory":392, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"팥밥" , "calory":286, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"표고버섯볶음밥" , "calory":551, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"하이라이스" , "calory":401, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"현미밥" , "calory":396, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"흑미밥" , "calory":348, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"게국지" , "calory":415, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"곰치국" , "calory":419, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"굴국밥" , "calory":683, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김치국" , "calory":89, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"떡만둣국" , "calory":624, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"만둣국" , "calory":434, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"맑은감자국" , "calory":221, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"매생이국	" , "calory":119, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"무된장국	" , "calory":104, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"미소된장국" , "calory":38, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"바지락조개국	" , "calory":157, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"뼈다귀해장국	" , "calory":714, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"선지해장국" , "calory":312, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"소고기무국" , "calory":123, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"소고기미역국" , "calory":151, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"순대국" , "calory":540, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"시래기된장국" , "calory":99, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"올갱이국" , "calory":144, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"우거지해장국" , "calory":154, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"우렁된장국" , "calory":245, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"탕국" , "calory":92, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"홍합미역국" , "calory":167, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"황태해장국" , "calory":181, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"미역국컵밥" , "calory":300, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"성게알미역국" , "calory":90, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"시래기된장국" , "calory":100, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"육개장" , "calory":250, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"황태국컵밥" , "calory":325, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"감자된장국" , "calory":98, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"감잣국" , "calory":82, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"굴무국" , "calory":123, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"근대된장국" , "calory":38, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김치콩나물국" , "calory":48, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김칫국" , "calory":90, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"냉이된장국" , "calory":86, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"달걀국" , "calory":52, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"대합미역국" , "calory":44, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"동태국" , "calory":66, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"메밀묵국" , "calory":87, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"무시래기된장국" , "calory":61, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"미역국" , "calory":46, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"미역냉국" , "calory":128, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"미역된장국" , "calory":96, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"미역오이냉국" , "calory":21, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"배추된장국" , "calory":79, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"북엇국" , "calory":111, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"뼈해장국" , "calory":206, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"사골국" , "calory":220, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우미역국" , "calory":63, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"선짓국" , "calory":173, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기무국" , "calory":61, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기미역국" , "calory":52, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기배추국" , "calory":62, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"순댓국" , "calory":509, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"시금치된장국" , "calory":37, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쑥된장국" , "calory":60, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"아욱된장국" , "calory":81, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"애호박된장국" , "calory":122, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"어묵국" , "calory":106, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"얼갈이배춧국" , "calory":36, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오이냉국" , "calory":38, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오징어국" , "calory":91, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"우거지된장국" , "calory":78, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"일본된장국" , "calory":20, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"재첩국" , "calory":81, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"조갯국" , "calory":62, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩나물국" , "calory":24, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩나물된장국" , "calory":123, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"토란국" , "calory":62, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"해물된장국" , "calory":111, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"호박잎된장국" , "calory":23, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"홍합무국" , "calory":87, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"떡국" , "calory":588, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"떡만두국" , "calory":666, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"사골만두국" , "calory":606, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"고등어찌개" , "calory":601, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김치찌개" , "calory":243, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"꽁치찌개" , "calory":355, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"두부전골" , "calory":315, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"버섯찌개" , "calory":167, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"부대찌개" , "calory":399, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"새우젓두부찌개" , "calory":166, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"소곱창전골" , "calory":529, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"햄김치찌개" , "calory":189, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"호박찌개" , "calory":95, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"묵은지찌개" , "calory":70, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"우렁된장찌개" , "calory":120, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"청국장찌개" , "calory":240, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩비지찌개" , "calory":640, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"갈치찌개" , "calory":94, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"감자탕" , "calory":375, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"김치전골" , "calory":197, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"꽁치김치찌개" , "calory":241, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"꽃게탕" , "calory":101, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"낙지전골" , "calory":153, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"내장탕" , "calory":423, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"냉이된장찌개" , "calory":66, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"달래된장찌개" , "calory":122, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"닭볶음탕" , "calory":332, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"대구 매운탕" , "calory":	134, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"동태찌개" , "calory":87, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"돼지고기김치찌개" , "calory":90, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"돼지고기찌개" , "calory":143, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"된장찌개" , "calory":91, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"두부고추장찌개" , "calory":261, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"두부된장찌개" , "calory":110, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"두부쇠고기고추장찌개" , "calory":162, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"두부애호박된장찌개" , "calory":189, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"버섯샤브샤브" , "calory":104, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"버섯전골" , "calory":233, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"부대찌개" , "calory":737, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기 샤브샤브" , "calory":259, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기된장찌개" , "calory":163, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"쇠고기전골" , "calory":187, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"순두부김치찌개" , "calory":69, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"순두부찌개" , "calory":85, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"알탕" , "calory":203, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"어묵김치찌개" , "calory":98, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오리백숙" , "calory":335, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오리탕" , "calory":728, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"오징어찌개" , "calory":85, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"장어탕" , "calory":536, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"조개된장찌개" , "calory":68, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"참치김치찌개" , "calory":154, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"청국장찌개" , "calory":93, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"추어탕" , "calory":188, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩나물된장찌개" , "calory":146, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"콩비지찌개" , "calory":275, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"해물매운탕" , "calory":211, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"햄 김치찌개" , "calory":93, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"호박고추장찌개" , "calory":115, "sort" : "main_dish", "CategoryId" : 2},
            { "name":"대구찜" , "calory":376, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"도미찜" , "calory":125, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"동태찜" , "calory":394, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지등갈비찜" , "calory":961, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지머리고기" , "calory":650, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"매운갈비찜" , "calory":517, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"문어숙회" , "calory":66, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"민어찜" , "calory":136, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"병어찜" , "calory":179, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"북어찜" , "calory":235, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"붕어찜" , "calory":835, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소갈비찜" , "calory":494, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"순대" , "calory":542, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"아구찜" , "calory":310, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"아구찜" , "calory":492, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"안동찜닭	" , "calory":1364, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"전어찜" , "calory":278, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"조기찜" , "calory":182, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"참꼬막" , "calory":90, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"한방오리백숙" , "calory":469, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"해물찜" , "calory":400, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"홍어찜" , "calory":202, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지갈비찜" , "calory":830, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"가오리찜" , "calory":204, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"깻잎찜" , "calory":97, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"꼬막찜" , "calory":192, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"꽈리고추찜" , "calory":103, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"달걀찜(우유)" , "calory":209, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"달걀찜" , "calory":116, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭찜" , "calory":320, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지갈비찜" , "calory":581, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지고기 수육" , "calory":936, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠갈비찜" , "calory":256, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠고기사태찜" , "calory":328, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠고기수육" , "calory":498, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"순대" , "calory":410, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"아귀찜" , "calory":168, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"애호박찜" , "calory":181, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"족발" , "calory":582, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"코다리찜" , "calory":188, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"풋고추찜" , "calory":51, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"해물콩나물찜" , "calory":111, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"꿩불고기" , "calory":	68, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭갈비" , "calory":595, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭갈비" , "calory":558, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭꼬치" , "calory":176, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"더덕구이" , "calory":184, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"도미구이" , "calory":397, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지갈비" , "calory":240, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"병어구이" , "calory":488, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"불고기" , "calory":395, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"붕장어소금구이" , "calory":296, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소양념갈비구이" , "calory":989, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"양념왕갈비" , "calory":480, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"양념장어구이" , "calory":433, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"임연수구이" , "calory":494, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"짚불구이곰장어" , "calory":326, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"햄버그스테이크" , "calory":457, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"황태구이" , "calory":437, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"훈제오리" , "calory":797, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"가자미구이" , "calory":245, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"간장양념닭다리구이" , "calory":740, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"갈치구이" , "calory":275, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"고등어구이" , "calory":551, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"고등어석쇠구이" , "calory":679, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"굴비구이" , "calory":291, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"꽁치구이" , "calory":604, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭고기대파꼬치구이" , "calory":416, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭구이" , "calory":872, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭발구이" , "calory":431, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지갈비구이" , "calory":881, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지고기산적" , "calory":339, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지불고기" , "calory":449, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"등심스테이크" , "calory":388, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"런천미트구이" , "calory":484, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"뱅어포구이" , "calory":261, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"버섯구이" , "calory":41, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"삼겹살고추장구이" , "calory":805, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"삼겹살구이" , "calory":933, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"삼치구이" , "calory":355, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"새송이버섯구이" , "calory":66, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"새우구이" , "calory":260, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소갈비구이" , "calory":722, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소곱창구이" , "calory":275, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소불고기" , "calory":339, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"안심스테이크" , "calory":366, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"오리고기구이" , "calory":586, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"오리불고기" , "calory":361, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"장어고추장구이" , "calory":258, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"조기구이" , "calory":460, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"조미김" , "calory":23, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쥐포구이" , "calory":238, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"참치머리구이" , "calory":346, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"치킨데리야끼" , "calory":707, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"키조개구이" , "calory":234, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"표고버섯구이" , "calory":79, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"함박스테이크" , "calory":347, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"햄구이" , "calory":577, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"깻잎나물볶음" , "calory":206, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지고기볶음" , "calory":350, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지껍데기볶음" , "calory":352, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"두부김치" , "calory":288, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"머위나물볶음" , "calory":108, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"멸치풋고추볶음" , "calory":52, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소세지볶음" , "calory":471, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"순대볶음" , "calory":582, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"양송이버섯볶음" , "calory":136, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"오삼불고기" , "calory":363, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"주꾸미볶음" , "calory":211, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"표고버섯볶음" , "calory":142, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"해물볶음" , "calory":419, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"국물떡볶이" , "calory":796, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"국물떡볶이" , "calory":636, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"치즈국물떡볶이" , "calory":2530, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"감자볶음" , "calory":100, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"감자채소볶음" , "calory":139, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"건새우볶음" , "calory":60, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"고추볶음" , "calory":69, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"김치볶음" , "calory":106, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"꽈리고추멸치볶음" , "calory":126, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"낙지볶음" , "calory":182, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"느타리버섯볶음" , "calory":47, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭가슴살피망볶음" , "calory":97, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭발볶음" , "calory":372, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"닭볶음" , "calory":558, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"당근볶음" , "calory":85, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지고기김치볶음" , "calory":371, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지고기채소볶음" , "calory":388, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"돼지곱창순대볶음" , "calory":299, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"떡볶이" , "calory":260, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"라볶이" , "calory":268, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"마늘쫑볶음" , "calory":123, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"마늘쫑잔멸치볶음" , "calory":58, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"마파두부" , "calory":174, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"멸치견과류볶음" , "calory":206, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"멸치마늘쫑볶음" , "calory":138, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"멸치볶음" , "calory":137, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"묵은지삼겹살볶음" , "calory":302, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"문어고추장볶음" , "calory":175, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"미역줄기볶음" , "calory":61, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"브로콜리볶음" , "calory":46, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"새송이버섯볶음" , "calory":145, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"새우볶음" , "calory":166, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"소시지볶음" , "calory":559, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠고기고추장볶음" , "calory":434, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠고기버섯볶음" , "calory":330, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠고기볶음" , "calory":543, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"쇠고기채소볶음" , "calory":288, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"양파볶음" , "calory":44, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"어묵볶음" , "calory":275, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"어묵잡채" , "calory":414, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"어묵채소볶음" , "calory":136, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"오징어볶음" , "calory":255, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"오징어채볶음" , "calory":59, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"유산슬" , "calory":189, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"잔멸치견과류볶음" , "calory":193, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"잔멸치고추볶음" , "calory":114, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"잔멸치꽈리고추볶음" , "calory":146, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"잔멸치볶음" , "calory":170, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"잔멸치풋고추볶음" , "calory":127, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"잡채" , "calory":291, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"제육볶음" , "calory":487, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"죽순쇠고기볶음" , "calory":276, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"참치 김치볶음" , "calory":121, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"채소떡볶이" , "calory":515, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"콩나물잡채" , "calory":153, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"팔보채" , "calory":196, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"풋고추멸치볶음" , "calory":94, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"햄채소볶음" , "calory":401, "sort" : "side_dish", "CategoryId" : 2},
            { "name":"귤" , "calory":9, "sort" : "dessert", "CategoryId" : 2},
            { "name":"딸기" , "calory":34, "sort" : "dessert", "CategoryId" : 2},
            { "name":"망고" , "calory":57, "sort" : "dessert", "CategoryId" : 2},
            { "name":"무화과" , "calory":54, "sort" : "dessert", "CategoryId" : 2},
            { "name":"배" , "calory":46, "sort" : "dessert", "CategoryId" : 2},
            { "name":"복숭아" , "calory":49, "sort" : "dessert", "CategoryId" : 2},
            { "name":"블루베리" , "calory":48, "sort" : "dessert", "CategoryId" : 2},
            { "name":"사과" , "calory":56, "sort" : "dessert", "CategoryId" : 2},
            { "name":"수박" , "calory":31, "sort" : "dessert", "CategoryId" : 2},
            { "name":"참외" , "calory":47, "sort" : "dessert", "CategoryId" : 2},
            { "name":"체리" , "calory":67, "sort" : "dessert", "CategoryId" : 2},
            { "name":"파인애플" , "calory":53, "sort" : "dessert", "CategoryId" : 2},
            { "name":"포도" , "calory":60, "sort" : "dessert", "CategoryId" : 2},
        ]
        // await Category.bulkCreate([
        //     {"category_name" : "workout", "img" : "workout.png"},
        //     {"category_name" : "food", "img" : "food.png"},
        // ])

        await Food.bulkCreate(fakeFood)
        res.json("ok")
    } catch (err) {
        console.error(err);
        next(err)
    }
}

// 물 마신 횟수를 유저 정보에서 따오기
// exports.watercount = async (req, res, next) => {
//     console.log('물 마신 횟수 체크');
//     try {
//         const Count = await User.findAll({
//             where : { id : req.params.id }
//         })
//         res.json(Count);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// }

// 음식들 가져오기
exports.getDishes = async (req, res, next) => {
    try{
        const food =  await Food.findAll({  
            where: { sort: req.params.sort },
        });
        res.json ({
            code: 200,
            payload: food || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 음식 가져오기
exports.getDish = async (req, res, next) => {
    try{
        const food =  await Food.findOne({  
            where: { id : req.params.id  },
        });
        res.json ({
            code: 200,
            payload: food || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// random
exports.getRandomDishes = async (req, res, next) => {
    try {
        const [result] = await sequelize.query(
            `(select * from food where sort = 'main_dish' order by rand() limit 1) union
            (select * from food where sort = 'side_dish' order by rand() limit 3) union
            (select * from food where sort = 'dessert' order by rand() limit 1);`
        )
        res.json({
            code: 200,
            result
        })
    } catch (error) {
        console.error(error);
        next(error);;
    }
}

exports.getTodayDishes = async(req, res, next) => {
    try {
        const orderMeal = (req.body.meal === '아침' ? 1 : req.body.meal === '점심' ? 2 : 3)

        const addedMeal = await Todo_element.findOne({
            where: {
                order: orderMeal,
                date: moment().format('YYYY-MM-DD'),
                UserId : req.user.id
            }
        });
        const isAdded = Boolean(addedMeal);
        let result;
        if (isAdded) {
            // already bring
            // SELECT f.* FROM food f JOIN todo_elements te ON f.id = te.todo_id where te.user_id = 10 and te.deleted_at is null and te.order = 2 and date='2024-05-23';
            result = await Food.findAll({
                    include: [{
                        model: Todo_element,
                        where:
                        {
                            order: orderMeal,
                            date: moment().format('YYYY-MM-DD'),
                            UserId : req.user.id
                        }
                    }]
            })

        } else {
            // random
            [result] = await sequelize.query(
                `(select * from food where sort = 'main_dish' order by rand() limit 1) union
                (select * from food where sort = 'side_dish' order by rand() limit 3) union
                (select * from food where sort = 'dessert' order by rand() limit 1);`
            )
        }

        res.json({
            code: 200,
            isAdded,
            result
        })
    } catch (error) {
        console.error(error);
        next(error);;
    }
}
// 하루 권장 칼로리 섭취량 제공

// 오늘 섭취한 칼로리 입력

// 식단 생성 테이블 제공

// 음식 정보 검색 테이블 