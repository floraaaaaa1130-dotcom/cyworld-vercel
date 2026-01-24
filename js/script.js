// 1. NPC 데이터
const npcs = {
    sion: {
        name: "시온",
        sprite: "assets/images/sprites/sion.png",
        portraits: {
            default: "assets/images/portraits/sion_default.png",
            happy: "assets/images/portraits/sion_happy.png",
            shock: "assets/images/portraits/sion_serious.png"
        },
        gifts: {
            love: ["별조각", "에너지 드링크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "이거 제가 찾던 건데.. 고마워요, 정말 잘 쓸게요.", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        locations: { sunny: "hall", rainy: "hall" }
    },
    riku: {
        name: "리쿠",
        sprite: "assets/images/sprites/riku.png",
        portraits: {
            default: "assets/images/portraits/riku_default.png",
            happy: "assets/images/portraits/riku_happy.png",
            sad: "assets/images/portraits/riku_sad.png",
            shock: "assets/images/portraits/riku_shock.png"
        },
        gifts: {
            love: ["별조각", "에너지 드링크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "이거 제가 찾던 건데.. 고마워요, 정말 잘 쓸게요.", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        locations: { sunny: "shop", rainy: "shop" }
    },
    yushi: {
        name: "유우시",
        sprite: "assets/images/sprites/yushi.png",
        portraits: {
            default: "assets/images/portraits/yushi_default.png",
            happy: "assets/images/portraits/yushi_happy.png",
            shock: "assets/images/portraits/yushi_shock.png"
        },
        gifts: { // gifts 속성 추가 (코드 일관성을 위해 임의 추가함, 필요시 수정)
             love: ["별조각"],
             hate: ["쓰레기"]
        },
        giftReactions: {
            love: { text: "이거 제가 찾던 건데.. 고마워요, 정말 잘 쓸게요.", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        locations: { sunny: "forest", rainy: "saloon" }
    },
    jaehee: { 
        name: "재희",
        sprite: "assets/images/sprites/jaehee.png",
        portraits: { 
            default: "assets/images/portraits/jaehee_default.png",
            happy: "assets/images/portraits/jaehee_happy.png", // 임시 이미지 경로 주의
            sad: "assets/images/portraits/jaehee_sad.png",
            shock: "assets/images/portraits/jaehee_shock.png"
        },
        gifts: {
            love: ["별조각", "에너지 드링크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "이거 제가 찾던 건데.. 고마워요, 정말 잘 쓸게요.", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        locations: { sunny: "square", rainy: "saloon" } 
    },
    ryo: { 
        name: "료", 
        sprite: "assets/images/sprites/ryp.png",
        portraits: { 
            default: "assets/images/portraits/ryo_default.png",
            happy: "assets/images/portraits/ryo_happy.png",
            sad: "assets/images/portraits/ryo_sad.png",
            shock: "assets/images/portraits/ryo_shock.png"
        },
        gifts: {
            love: ["별조각", "에너지 드링크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "이거 제가 찾던 건데.. 고마워요, 정말 잘 쓸게요.", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        locations: { sunny: "square", rainy: "saloon" } 
    },
    sakuya: { 
        name: "사쿠야",
        sprite: "assets/images/sprites/sakuya.png",
        portraits: { 
            default: "assets/images/portraits/sakuya_default.png",
            happy: "assets/images/portraits/sakuya_happy.png",
            sad: "assets/images/portraits/sakuya_sad.png",
            shock: "assets/images/portraits/sakuya_shock.png"
        },
        gifts: {
            love: ["별조각", "에너지 드링크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "이거 제가 찾던 건데.. 고마워요, 정말 잘 쓸게요.", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        locations: { sunny: "square", rainy: "saloon" } 
    }
};

// 2. 대본 및 키워드 데이터
const dailyScripts = {
    1: {
        riku: { text: "누나 안냥 ! 새로 이사 왓어여?? 리쿠는 리쿠에여 잘 부타캐여 히히", emotion: "happy" },
        yushi: { text: "에.. 새로 오신 농장주님이시군요 ? 만나서 반가워요 !", emotion: "default" }
    },
    4: {
        sion: { text: "축제라 그런지 다들 즐거워 보여서 좋네요. 일 생각은 잠시 잊어도 돼요 !", emotion: "happy" }
    },
    "highAffinity": {
        riku: { text: "누나 보니까 리쿠 넘 기부니 조타 ! 오늘두 리쿠랑 마니 놀아조야 대여 히히", emotion: "happy" }
    }
};

const randomDialogues = {
    riku: {
        맑음: [
            { text: "누나 ! 오늘 날씨 짱 조타 그져??", emotion: "happy" },
            { text: "광장에 비둘기 징짜 마나여.", emotion: "happy" }
        ],
        비: [{ text: "비 오는 거 시러여..", emotion: "sad" }],
        벚꽃: [{ text: "와 핑크색 눈이 내리는 거 가타여 !!", emotion: "happy" }]
    },
    sion: {
        맑음: [
            { text: "안녕하세요, 농장주님. 산책 나오셨나요?", emotion: "happy" },
            { text: "오늘 같은 날은 독서하기 딱 좋죠.", emotion: "default" }
        ],
        비: [{ text: "빗소리가 참 좋네요.", emotion: "happy" }],
        벚꽃: [{ text: "꽃잎이 떨어지는 속도가 초속 5센티미터래요.", emotion: "serious" }]
    },
    
    // ... 다른 멤버들 (yushi, jaehee 등) 데이터도 형식 맞춰서 추가 ...
    yushi: { 맑음: [{text:"날씨가 좋네요.", emotion:"default"}], 비: [], 벚꽃: [] },
    jaehee: { 맑음: [{text:"허허 날씨 좋군요!", emotion:"happy"}], 비: [], 벚꽃: [] },
    ryo: { 맑음: [{text:"야하~ 날씨 대박!", emotion:"happy"}], 비: [], 벚꽃: [] },
    sakuya: { 맑음: [{text:"빵 굽기 좋은 날씨네요.", emotion:"default"}], 비: [], 벚꽃: [] }
};

const npcKeywords = {
    riku: {
        "안녕": { text: "누나 오하욘 ! 리쿠 보러 왓어여?? 히히", emotion: "happy" },
        "질투": { text: "왜 리쿠를 두고 먼저 갓어여?? 리쿠 서운해여 ㅠㅠ", emotion: "sad" }
    },
    yushi: {
        "안녕": { text: "에.. 안녕하세요 ! 오늘 날씨가 참 맑지요 ? ^_^", emotion: "happy" }
    }
};

const questLetters = {
    riku: "누나.. 리쿠는 쪼금 서운해여.. ㅠㅠ 나 이거 진짜 필요한뎅..",
    sion: "안녕하세요, 농장주님. 실은 제가 꼭 필요한 물건이 있는데.."
};

// 3. 장소 및 레시피 데이터
const locations = {
    farm: { name: "농장", bg: "assets/images/backgrounds/farm.png", items: ["수선화", "흙", "딸기"] },
    square: { name: "마을 광장", bg: "assets/images/backgrounds/square.png", items: ["수선화", "민들레", "리모컨", "에너지 드링크", "흙"] },
    forest: { name: "비밀의 숲", bg: "assets/images/backgrounds/forest.png", items: ["스타푸르트", "블루 재즈", "블롭피쉬", "딸기", "도토리", "흙"] },
    shop: { name: "피에르 상점", bg: "assets/images/backgrounds/shop.png", items: ["설탕", "치즈", "밀가루", "달걀"] },
    hall: { name: "마을 회관", bg: "assets/images/backgrounds/hall.png", items: ["에너지 드링크", "초코케이크", "흙"] },
    saloon: { name: "별빛 주점", bg: "assets/images/backgrounds/saloon.png", items: ["딸기 빵", "행운의 점심", "초코케이크", "커피"] }
};

const recipes = [
    { ingredients: ["밀가루", "달걀", "딸기", "설탕"], result: "핑크케이크" },
    { ingredients: ["수선화", "민들레", "블루 재즈"], result: "꽃다발" },
    { ingredients: ["스타푸르트", "커피"], result: "스타드롭커피" }
];

// 4. 아이템 정보 데이터 (이미지 경로 포함)
const itemData = {
    "수선화": { img: "assets/images/items/daffodil.png", desc: "봄에 피는 노란 꽃" }, //ㅎㅇ
    "민들레": { img: "assets/images/items/dandelion.png", desc: "후 불면 날아갈 것 같다" }, //ㅎㅇ
    "커피": { img: "assets/images/items/coffee.png", desc: "고소한 원두 향이 난다" }, //ㅎㅇ
    "블루 재즈": { img: "assets/images/items/bluejazz.png", desc: "동그란 모양의 푸른 꽃" }, //ㅎㅇ
    "치즈": { img: "assets/images/items/cheese.png", desc: "꼬릿꼬릿한 냄새가 난다" }, //ㅎㅇ
    "설탕": { img: "assets/images/items/sugar.png", desc: "혈당 관리 해야하는데..." }, //ㅎㅇ
    "핑크케이크": { img: "assets/images/items/pink_cake.png", desc: "사랑스러운 핑크색 케이크" }, //ㅎㅇ
    "초코케이크": { img: "assets/images/items/chocolate_cake.png", desc: "찐한 초콜릿 냄새가 난다" }, //ㅎㅇ
    "딸기": { img: "assets/images/items/strawberry.png", desc: "뚜왈기!" }, //ㅎㅇ
    "행운의 점심": { img: "assets/images/items/luckylunch.png", desc: "행운이 올 것 같다!" }, //ㅎㅇ
    "밀가루": { img: "assets/images/items/flour.png", desc: "제빵의 기본 재료" }, //ㅎㅇ
    "달걀": { img: "assets/images/items/egg.png", desc: "작고 소중한 달걀" }, //ㅎㅇ
    "흙": { img: "assets/images/items/clay.png", desc: "흙이다" }, //ㅎㅇ
    "스타푸르트": { img: "assets/images/items/starfruit.png", desc: "별 모양의 과일" }, //ㅎㅇ
    "스타드롭커피": { img: "assets/images/items/stardropcoffee.png", desc: "커피가 상큼할 수 있다니" }, //ㅎㅇ
    "리모컨": { img: "assets/images/items/remote.png", desc: "음...?" }, //ㅎㅇ
    "꽃다발": { img: "assets/images/items/bouquet.png", desc: "받으면 행복할 것 같다" }, //ㅎㅇ
    "블롭피쉬": { img: "assets/images/items/blobfish.png", desc: "오우..." }, //ㅎㅇ
    "도토리": { img: "assets/images/items/acorn.png", desc: "다람쥐가 좋아할 것 같다" }, //ㅎㅇ
    "에너지 드링크": { img: "assets/images/items/energytonic.png", desc: "피로가 싹 가신다" } //ㅎㅇ
};
