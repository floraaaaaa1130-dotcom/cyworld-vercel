// 1. NPC 데이터 (페르소나 및 위치 반영)
const npcs = {
    sion: {
        name: "시온",
        portraits: {
            default: "assets/images/portraits/sion_default.png",
            happy: "assets/images/portraits/sion_happy.png",
            serious: "assets/images/portraits/sion_serious.png"
        },
        locations: { sunny: "hall", rainy: "hall" }
    },
    riku: {
        name: "리쿠",
        portraits: {
            default: "assets/images/portraits/riku_default.png",
            happy: "assets/images/portraits/riku_happy.png",
            sad: "assets/images/portraits/riku_sad.png",
            shock: "assets/images/portraits/riku_shock.png"
        },
        locations: { sunny: "shop", rainy: "shop" }
    },
    yushi: {
        name: "유우시",
        portraits: {
            default: "assets/images/portraits/yushi_default.png",
            happy: "assets/images/portraits/yushi_happy.png",
            shock: "assets/images/portraits/yushi_shock.png"
        },
        locations: { sunny: "forest", rainy: "saloon" }
    },
    jaehee: {
        name: "재희",
        portraits: {
            default: "assets/images/portraits/jaehee_default.png",
            happy: "assets/images/portraits/jaehee_happy.png",
            smile: "assets/images/portraits/jaehee_smile.png"
        },
        locations: { sunny: "square", rainy: "saloon" }
    },
    ryo: {
        name: "료",
        portraits: {
            default: "assets/images/portraits/ryo_default.png",
            happy: "assets/images/portraits/ryo_happy.png",
            smart: "assets/images/portraits/ryo_smart.png"
        },
        locations: { sunny: "square", rainy: "saloon" }
    },
    sakuya: {
        name: "사쿠야",
        portraits: {
            default: "assets/images/portraits/sakuya_default.png",
            happy: "assets/images/portraits/sakuya_happy.png",
            serious: "assets/images/portraits/sakuya_serious.png"
        },
        locations: { sunny: "saloon", rainy: "saloon" }
    }
};

// 2. 날짜별 대본 (Day 1, 4 등 특수 이벤트)
const dailyScripts = {
    1: {
        sion: { text: "이사 오신 걸 환영해요 ! 도움이 필요하면 언제든 말씀하세요 ^_^", emotion: "happy" },
        riku: { text: "누나 안냥 ! 새로 이사 왓어여?? 리쿠는 리쿠에여 잘 부타캐여 히히", emotion: "happy" },
        yushi: { text: "에.. 새로 오신 농장주님이시군요 ? 만나서 반가워요 ! 잘 부탁드리지요 😙", emotion: "default" },
        jaehee: { text: "와아 ! 새로 이사 오셨군요 ! 잘 부탁드려요 ! 허허 !", emotion: "happy" },
        ryo: { text: "야하~ 농장주님 ! 마을에 오신 걸 환영해요. 대박이죠 ?", emotion: "happy" },
        sakuya: { text: "에.. 갓 구운 빵이에요. 하나 드실래요? 잘 부탁해요.", emotion: "default" }
    },
    4: {
        sion: { text: "축제라 그런지 다들 즐거워 보여서 좋네요. 일 생각은 잠시 잊어도 돼요 !", emotion: "happy" },
        riku: { text: "와 사람 징짜 만타 !! 누나 리쿠 요기 잇어여 ! 딴 데 가지 마여 ㅠㅠ 녱??", emotion: "happy" },
        yushi: { text: "에.. 축제 분위기가 참 몽글몽글하네요 ! 저랑 같이 구경하실래요 ? ^_^", emotion: "happy" }
    },
    "highAffinity": {
        riku: { text: "누나 보니까 리쿠 넘 기부니 조타 ! 오늘두 리쿠랑 마니 놀아조야 대여 히히", emotion: "happy" },
        yushi: { text: "에.. 농장주님 ! 오늘따라 더 멋져 보이네요 ! ..아, 진심이지요 ^_^", emotion: "happy" }
    }
};

// 3. 퀘스트 편지 (Day 5)
const questLetters = {
    riku: "누나.. 리쿠는 쪼금 서운해여.. ㅠㅠ 딴 애들이랑만 놀구.. 나 이거 진짜 필요한뎅.. 누나가 구해다 주면 안 대여?? 기다릴게영..",
    sion: "안녕하세요, 농장주님. 요즘 많이 바쁘신 것 같아 편지 남겨요. 실은 제가 꼭 필요한 물건이 있는데.. 도와주실 수 있을까요 ?"
};

// 4. 키워드 반응 데이터
const npcKeywords = {
    riku: {
        "안녕": { text: "누나 오하욘 ! 리쿠 보러 왓어여?? 히히", emotion: "happy" },
        "질투": { text: "왜 리쿠를 두고 먼저 갓어여?? 리쿠 서운해여 ㅠㅠ", emotion: "sad" },
        "뭐해": { text: "나 지금 데이터 충전 햇어. 충전을 하니 배가 부르다.", emotion: "default" }
    },
    yushi: {
        "안녕": { text: "에.. 안녕하세요 ! 오늘 날씨가 참 맑지요 ? ^_^", emotion: "happy" },
        "춤": { text: "에..?! 제가 춤추는 걸 보셨나요? 부끄럽지요..", emotion: "shock" }
    },
    sion: {
        "안녕": { text: "오늘 날씨가 참 좋네요. 농장 일은 잘 돼가시나요 ?", emotion: "happy" },
        "성장": { text: "매 순간 더 나은 사람이 되려고 노력하는 편이에요.", emotion: "serious" }
    }
};

// 5. 장소 데이터
const locations = {
    farm: { name: "농장", bg: "assets/images/bg/farm.png", items: ["수선화"] },
    square: { name: "마을 광장", bg: "assets/images/bg/square.png", items: ["수선화", "민들레"] },
    forest: { name: "비밀의 숲", bg: "assets/images/bg/forest.png", items: ["별조각", "블루 재즈"] },
    shop: { name: "피에르 상점", bg: "assets/images/bg/shop.png", items: ["설탕"] },
    hall: { name: "마을 회관", bg: "assets/images/bg/hall.png", items: ["낡은 신문"] },
    saloon: { name: "별빛 주점", bg: "assets/images/bg/saloon.png", items: ["딸기 빵"] }
};


// scripts.js 하단에 추가
const recipes = [
    { ingredients: ["꽃", "설탕"], result: "꽃 케이크", description: "달콤하고 향긋한 케이크예요." },
    { ingredients: ["별조각", "블루 재즈"], result: "반짝이는 유리병", description: "유우시가 좋아할 것 같은 신비로운 병이에요." },
    { ingredients: ["딸기 빵", "우유"], result: "딸기 우유 빵", description: "사쿠야의 최애 간식이에요 !" }
];

