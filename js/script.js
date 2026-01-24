// 1. 게임 상태 데이터
let gameState = {
    day: 1,
    energy: 3,
    weather: '맑음', // 맑음, 비, 눈, 벚꽃
    currentLocation: 'farm',
    inventory: [],
    affinities: {
        sion: 0, riku: 0, yushi: 0, jaehee: 0, ryo: 0, sakuya: 0
    },
    hasGiftedToday: {
        sion: false, riku: false, yushi: false, jaehee: false, ryo: false, sakuya: false
    },
    metToday: []
};

// 2. NPC 데이터 (페르소나 반영)
const npcs = {
    sion: {
        name: "시온",
        // 기존: portrait: "images/portraits/sion.png",
        // 변경: portraits 객체로 여러 표정 등록
        portraits: {
            default: "assets/images/portraits/sion_default.png", // 기본
            happy: "assets/images/portraits/sion_happy.png",   // 웃음
            serious: "assets/images/portraits/sion_serious.png" // 진지
        },
        // ... 나머지 데이터
    },
    riku: {
        name: "리쿠",
        portraits: {
            default: "assets/images/portraits/riku_default.png",
            happy: "assets/images/portraits/riku_happy.png",
            sad: "assets/images/portraits/riku_sad.png",
            shock: "assets/images/portraits/riku_shock.png" // 당황
        },
        // ...
    },
    // ... 다른 멤버들도 동일하게 추가
};

// scripts.js
const dailyScripts = {
    1: {
        // 그냥 문자열 대신 객체 사용!
        riku: { 
            text: "누나 안냥 ! 새로 이사 왓어여?? 리쿠는 리쿠에여 잘 부타캐여 히히", 
            emotion: "happy" // <-- 이렇게 표정을 지정!
        },
        yushi: {
            text: "에.. 새로 오신 농장주님이시군요 ? 만나서 반가워요 !",
            emotion: "default" // 딱히 감정이 없으면 default
// ... 나머지 멤버
    },
    // [Day 4] 축제 특별 대사
    4: {
        sion: "축제라 그런지 다들 즐거워 보여서 좋네요. 오늘 같은 날은 일 생각은 잠시 잊어도 돼요 !",
        riku: "와 사람 징짜 만타 !! 누나 리쿠 요기 잇어여 ! 딴 데 가지 마여 ㅠㅠ 녱??",
        yushi: "에.. 축제 분위기가 참 몽글몽글하네요 ! 저랑 같이 구경하실래요 ? ^_^",
    },
    // [공통] 호감도가 높을 때 (평소 대사)
    "highAffinity": {
        riku: "누나 보니까 리쿠 넘 기부니 조타 ! 오늘두 리쿠랑 마니 놀아조야 대여 히히",
        yushi: "에.. 농장주님 ! 오늘따라 더 멋져 보이네요 ! ..아, 진심이지요 ^_^"
    }
};

// [Day 5] 2순위 멤버의 퀘스트 편지 (질투 컨셉)
const questLetters = {
    riku: "누나.. 리쿠는 쪼금 서운해여.. ㅠㅠ 딴 애들이랑만 놀구.. 나 이거 진짜 필요한뎅.. 누나가 구해다 주면 안 대여?? 기다릴게영..",
    sion: "안녕하세요, 농장주님. 요즘 많이 바쁘신 것 같아 편지 남겨요. 실은 제가 꼭 필요한 물건이 있는데.. 도와주실 수 있을까요 ?",
};



// NPC별 기본 키워드 대사도 똑같이 바꿉니다.
const npcKeywords = { // (기존 main.js에 있던 keywords를 이쪽으로 옮겨 관리하는 게 편해요)
    riku: {
        "안녕": { text: "누나 오하욘 ! 리쿠 보러 왓어여?? 히히", emotion: "happy" },
        "질투": { text: "왜 리쿠를 두고 먼저 갓어여?? 리쿠 서운해여 ㅠㅠ", emotion: "sad" },
        "뭐해": { text: "나 지금 데이터 충전 햇어. 멍 때리니 배가 부르다.", emotion: "default" }
    },
    yushi: {
        "안녕": { text: "에.. 안녕하세요 ! 오늘 날씨가 참 맑지요 ? ^_^", emotion: "happy" },
        "춤": { text: "에..?! 제가 춤추는 걸 보셨나요? 부끄럽지요..", emotion: "shock" }
    }
    // ...
};


// 3. 장소 및 아이템 데이터
const locations = {
    square: { name: "마을 광장", bg: "images/bg/square.png", items: ["수선화", "민들레"] },
    forest: { name: "비밀의 숲", bg: "images/bg/forest.png", items: ["별조각", "블루 재즈"] },
    shop: { name: "피에르 상점", bg: "images/bg/shop.png", items: ["설탕"] },
    hall: { name: "마을 회관", bg: "images/bg/hall.png", items: ["낡은 신문"] },
    saloon: { name: "별빛 주점", bg: "images/bg/saloon.png", items: ["딸기 빵"] }
};

