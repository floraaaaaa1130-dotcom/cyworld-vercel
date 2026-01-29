// 1. NPC 데이터
const npcs = {
    sion: {
        name: "시온",
        sprite: "assets/images/sprites/sion.png",
        portrait: "assets/images/portraits/sion_default.png",
        gifts: {
            best: "스타드롭커피",  // ★ [추가] 가장 좋아하는 선물 딱 하나 지정
            love: ["설탕", "회", "커피"],
            hate: ["블롭피쉬", "쓰레기", "젖은 신문지", "깨진 안경", "흙", "리모컨"]
        },
        giftReactions: {
            best: [
                { text: "우와, 향기 뭐예요? 그냥 커피가 아닌데?", emotion: "happy" }, 
                { text: "저 주려고 직접 만들었다고요? 와... 이건 좀 감동이다.", emotion: "happy" },
                { text: "(한 모금 마셔본다)", emotion: "happy" },
                { text: "...!!", emotion: "happy" },
                { text: "제가 마셔본 커피 중에 제일 맛있어요. 진짜로요!", emotion: "happy" },
                { text: "피곤한 게 싹 사라지는 기분인데요?", emotion: "happy" },
                { text: "{user}(은)는 진짜... 저한테 필요한 게 뭔지 너무 잘 아는 것 같아요.", emotion: "happy" },
                { text: "아껴서 마셔야지ㅎㅎ 고마워요 진짜.", emotion: "happy" }
                ],
            love: { text: "어? 이거 제가 제일 좋아하는 건데 어떻게 아셨어요? 진짜 감동이다. 고마워요.", emotion: "default" },
            hate: { text: "마음은 고맙지만... 이건 좀 처치하기 곤란하네요.", emotion: "default" },
            default: { text: "오, 선물인가요? 고맙습니다.", emotion: "default" }
        },
        unknownReaction: { text: "음... 무슨 말씀이신지 잘 모르겠네요.", emotion: "default" },
        locations: { sunny: "hall", rainy: "hall", blossom: "forest" },
        positions: {
            hall: { top: "75%", left: "25%" },
            forest: { top: "48%", left: "16%" }
        }
    },
    
    riku: {
        name: "리쿠",
        sprite: "assets/images/sprites/riku.png",
        portrait: "assets/images/portraits/riku_default.png",
        unknownReaction: { text: "엥? 그게 뭐예여? 먹는 거예여?", emotion: "shock" },
        gifts: {
            best: "도토리",
            love: ["초코케이크", "아이스크림", "수선화"],
            hate: ["쓰레기", "젖은 신문지", "깨진 안경", "리모컨"]
        },
        giftReactions: {
            best: [
                { text: "에?? 도토리?? ㅋㅋㅋㅋ 리쿠 다람쥐 닮아서 주는 거예여??", emotion: "happy" }, 
                { text: "진짜 귀엽당... 빤질빤질하니 맘에 들엉", emotion: "happy" },
                { text: "볼에 저장은 못 하지만 주머니에 넣고 다닐게여 헤헤", emotion: "happy" },
                { text: "역시 리쿠 맘 아는 건 {user} 밖에 없엉! 최고예여!", emotion: "happy" }
                ],
            love: { text: "{user}(은)는 리쿠를 잘 아는구낭? 고마워영!", emotion: "happy" },
            hate: { text: "왜 리쿠한테 이런 거 줘여? 리쿠 이거 싫어하는 거 몰랏어여? 속상해여 ㅠㅠ", emotion: "serious" },
            default: { text: "와아 선물!! 리쿠 넘 행복해영!", emotion: "default" }
        },
        locations: { sunny: "shop", rainy: "saloon", blossom: "shop" },
        positions: {
            shop: { top: "75%", left: "24%" },
            saloon: { top: "80%", left: "16%" }
        }
    },
    yushi: {
        name: "유우시",
        sprite: "assets/images/sprites/yushi.png",
        portrait: "assets/images/portraits/yushi_default.png",
        gifts: {
             best: "외계인 인형",
             love: ["스타푸르트", "블루 재즈", "치즈볼", "푸딩"],
             hate: ["쓰레기", "젖은 신문지", "깨진 안경", "리모컨"]
        },
        giftReactions: {
            best: [
                { text: "에... 이거... (인형에서 눈을 떼지 못한다)", emotion: "happy" }, 
                { text: "외계인인가요 ? 너무너무 귀엽네요 !", emotion: "happy" },
                { text: "{user} 눈에는 제가 이런 이미지인가요 ?", emotion: "happy" },
                { text: "보자마자 제 생각이 났어요 ? ㅎㅎ", emotion: "happy" },
                { text: "아주 마음에 들어요 !", emotion: "happy" },
                { text: "새 친구가 하나 생긴 기분이네요 ^_^", emotion: "happy" },
                { text: "잘 때 머리맡에 두고 잘게요 ~ 볼 때마다 {user} 생각이 날 거야 !", emotion: "happy" }
                ],
            love: { text: "에 ! 저 주는 거예요 ? 너무 예쁘다 ~ 저 이거 진짜 좋아해요 ! ^_^", emotion: "happy" },
            hate: { text: "에..? 에에.. 이건.. 너무해요 !", emotion: "serious" },
            default: { text: "고마워요 ! 잘 간직할게요 ^_^ 우리 기분 좋은 추억이 하나 더 생겼네요 ~", emotion: "default" }
        },
        unknownReaction: { text: "에.. 죄송해요. 무슨 말인지 잘 모르겐네.. ^_^;", emotion: "shock" },
        locations: { sunny: "forest", rainy: "saloon", blossom: "forest" },
        // ★ [추가] 장소별 좌표 설정 (top: 위에서 거리, left: 왼쪽에서 거리)
        positions: {
            forest: { top: "28%", left: "61%" }, // 회관에서는 오른쪽 위에
            saloon: { top: "80%", left: "20%" }
        }
    },
    jaehee: { 
        name: "재희",
        sprite: "assets/images/sprites/jaehee.png",
        portrait: "assets/images/portraits/jaehee_default.png",
        gifts: {
            best: "제로콜라",
            love: ["에너지 드링크", "행운의 점심", "무화과"],
            hate: ["쓰레기", "젖은 신문지", "깨진 안경", "흙", "리모컨"]
        },
        giftReactions: {
             best: [
                { text: "으아!! 제로 콜라!! 대박!! 저 제로콜라 없이 못 사는 거 어떻게 알았어요?", emotion: "happy" }, 
                { text: "마침 사러 가려고 했는데!!", emotion: "happy" },
                { text: "와... 역시 {user}은(는) 저랑 뭔가 통하는 게 있다 그쵸??", emotion: "happy" },
                { text: "시원하게 원샷 할게요! 진짜 고마워요!!", emotion: "happy" },
                { text: "앗 아니다! {user} 먼저 한 입 해요!", emotion: "happy" }
                ],
            love: { text: "헐! 대박!! 제가 진짜 좋아하는 건데! {user} 최고예요!!", emotion: "happy" },
            hate: { text: "오..! 뭔지 모르겠지만 그래도 {user}(이)가 준 거니까 일단 잘 챙겨둘게요! 허허", emotion: "serious" },
            default: { text: "우와! 저 주는 거예요? 고마워요!!", emotion: "default" }
        },
        unknownReaction: { text: "그니까! ...사실 이해를 못 했어요! 죄송한데 한 번만 더 말해줄 수 있어요?", emotion: "shock" },
        locations: { sunny: "square", rainy: "saloon", blossom: "shop" },
        // ★ [추가] 장소별 좌표 설정 (top: 위에서 거리, left: 왼쪽에서 거리)
        positions: {
            shop: { top: "57%", left: "64%" }, 
            saloon: { top: "80%", left: "80%" },
            square: { top: "41%", left: "7%" }
        }
    },
                    
    ryo: { 
        name: "료", 
        sprite: "assets/images/sprites/ryo.png",
        portrait: "assets/images/portraits/ryo_default.png",
        gifts: {
            best: "별의 책",
            love: ["블롭피쉬", "에너지 드링크"],
            hate: ["쓰레기", "젖은 신문지", "깨진 안경", "흙"]
        },
        giftReactions: {
             best: [
                { text: "에! 별의 책이다!!", emotion: "happy" }, 
                { text: "진짜 읽고 싶었던 건데... 와! 안에 성운 사진도 있어 대박!", emotion: "happy" },
                { text: "{user} 센스 진짜 야바이다...", emotion: "happy" },
                { text: "오늘 밤새서 다 읽어야지!", emotion: "happy" },
                { text: "진짜진짜 고마워요! 우주만큼! 다 읽고 무슨 내용인지 알려줄게요! ", emotion: "happy" },
                { text: "나중에 책에 나온 별자리 같이 보러 가요!", emotion: "happy" }
                ],
            love: { text: "야하항~! 진짜 최고! 이거 완전 희귀한 건데! 고마워료!", emotion: "happy" },
            hate: { text: "오, 센스 대박! 감사해료!", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        unknownReaction: { text: "네? 무슨 말이에료 그게??", emotion: "shock" },
        locations: { sunny: "square", rainy: "hall", blossom: "square" }, 
        // ★ [추가] 장소별 좌표 설정 (top: 위에서 거리, left: 왼쪽에서 거리)
        positions: {
            hall: { top: "82%", left: "49%" },
            square: { top: "54%", left: "48%" }
        }
    },
    
    sakuya: { 
        name: "사쿠야",
        sprite: "assets/images/sprites/sakuya.png",
        portrait: "assets/images/portraits/sakuya_default.png",
        gifts: {
            best: "핑크케이크",
            love: ["스타푸르트", "레몬", "아이스크림", "치즈볼"],
            hate: ["쓰레기", "제로콜라", "젖은 신문지", "깨진 안경", "흙", "리모컨"]
        },
        giftReactions: {
            best: [
                { text: "에―?! 핑크 케이크?!", emotion: "happy" }, 
                { text: "색깔 진짜 예쁘다... 딸기 향도 나고.", emotion: "happy" },
                { text: "아까워서 어떻게 먹지? 일단 사진부터 찍어서 간직해야겠어요.", emotion: "happy" },
                { text: "역시 {user} 센스 진짜 인정. 잘 먹을게요! 기분 완전 좋아졌어요.", emotion: "happy" },
                { text: "근데 혼자 먹기엔 너무 커요. 같이 먹을래요?", emotion: "happy" }
                ],
            love: { text: "에에! 이거 완전 제 스타일! 센스 짱이네요. 잘 먹을게요!", emotion: "happy" },
            hate: { text: "아... 진짜 죄송한데... 이건 다른 사람 주는 게 어때요?", emotion: "serious" },
            default: { text: "에- 엄청 다정하네요. 이런 걸 다 챙겨주고. 고맙습니다.", emotion: "default" }
        },
        unknownReaction: { text: "에, 무슨 말인지 잘 모르겠어요. 죄송합니다.", emotion: "shock" },
        locations: { sunny: "saloon", rainy: "saloon", blossom: "forest" }, 
        // ★ [추가] 장소별 좌표 설정 (top: 위에서 거리, left: 왼쪽에서 거리)
        positions: {
            forest: { top: "85%", left: "50%" },
            saloon: { top: "75%", left: "41%" },
            square: { top: "25%", left: "43%" }
        }
    }
};

// 2. 대본 및 키워드 데이터
const dailyScripts = {
    // 1일차 대사 (배열로 변경)
    1: {
        riku: [
            { text: "안녕 ! 새로 이사 왓어여?? ", emotion: "happy" },
            { 
                text: "저는 리쿠고 상점 알바생이에여 히히~ 첫날부터 리쿠 봣으니 운이 좋당!", 
                emotion: "happy",
                choices: [
                    { label: "귀엽네ㅎㅎ", score: 3, reply: "에? 진짜용?? ㅎㅎㅎㅎㅎ리쿠 귀엽긴 하징" },
                    { label: "자주 놀러올게요!", score: 0, reply: "넹! 특별히 사과 하나 더 줄게용" }
                ]
            },
        ],
        
        sion: [
            { text: "아, 안녕하세요. 오늘 귀농하신다는 분 맞으시죠?" },
            { 
                text: "저는 마을회관 관리를 맡고 있는 오시온입니다.", 
                emotion: "happy",
                choices: [
                    { label: "마을을 위해 열심히 일하겠습니다! 잘 부탁드려요.", score: 3, reply: "오... 열정이 대단하시네요. 저도 도울 수 있는 건 도울게요." },
                    { label: "어쩌다보니 오게 되었는데... 잘 부탁드려요!", score: 0, reply: "네, 필요한 거 있으시면 말씀해주세요." },
                    { label: "저기 혹시... 소랑 대화 가능하세요?", score: 3,
                     reply: [ 
                         "...네? 소를 키우기는 하는데 대화는...",
                         "음... 시도는 해볼게요." ]
                    }
                    ],
            }
        ],
        
        yushi: [
            { text: "에.. 새로 오신 농장주님이시군요 ?", emotion: "default" },
            { text: "만나서 반가워요 !", emotion: "happy" },
            { 
                text: "숲이 참 조용하고 좋지요 ? ^_^", 
                emotion: "happy",
                choices: [
                    { label: "여기서 뭐하고 계세요?", score: 0, reply: "아무것도 하지 않아요 ! 사람이 없는 곳이 마음이 편해서요 ^_^" },
                    { label: "밤에 별 보면 예쁠 것 같아요", score: 3, reply: "맞아요 ! 종종 밤에 와서 하늘을 보는데 정말 예뻐요 ^_^ 다음에 같이 봐요 ~" }
                ]
            },
        ],

                jaehee: [
            { text: "안녕하세요! 새로 오신 분 맞죠? 저는 재희라고 해요!", emotion: "default" },
            { 
                text: "마을에 대해 궁금한 거 있으면 언제든 물어보세요! 제가 아는 건 다 알려드릴게요!", 
                emotion: "happy",
                choices: [
                    { label: "노래 한 곡 부탁해요", score: 10, reply: "네? 어.. 뭐 불러드릴까요?!" },
                    { label: "반가워요 재희님. 잘 부탁해요!", score: 3, reply: "네네! 저야말로 잘 부탁드려요! 우리 잘 지내봐요!" }
                ]
            },
        ],

        ryo: [
            { text: "오.. 안녕하세료. 료입니다아.", emotion: "default" },
            { 
                text: "(말똥말똥한 눈으로 바라보기만 한다.)", 
                emotion: "happy",
                choices: [
                    { label: "왜 그렇게 쳐다봐?", score: 10, reply: "앗... 죄송해요. 그냥 처음 보는 분이라 신기해서료.. (눈을 피한다)" },
                    { label: "안녕ㅎㅎ 귀엽게 생겼네", score: 3, reply: "에..? 저, 저요..? 아.. 가, 감사합니다.." }
                ]
            },
        ],

        sakuya: [
            { text: "에- 안녕하세요. 갓 구운 빵 드셔보실래요?", emotion: "default" },
            { 
                text: "아 저는 사쿠야예요. 스타주점 안에 있는 빵집에서 일하고 있어요. 빵 사러 마니 와주세요.", 
                emotion: "happy",
                choices: [
                    { label: "고마워! 잘 먹을게", score: 3, reply: "아무것도 하지 않아요 ! 사람이 없는 곳이 마음이 편해서요 ^_^" },
                    { label: "사쿠빵쨩ㅎㅎ", score: 10, reply: "맞아요 ! 종종 밤에 와서 하늘을 보는데 정말 예뻐요 ^_^ 다음에 같이 봐요 ~" }
                ]
            },
        ] 
    }
    };

// ★ 기존 randomDialogues 삭제!
const affinityDialogues = {
    sion: {
        very_low: {
            "맑음": [
                [
                { text: "...", emotion: "default" },
                { text: "(가볍게 목례만 한다.)", emotion: "default" }
                ],
                { text: "잠시만요. 이것만 처리하고요.", emotion: "default" },
                { text: "(무언가 열심히 적고 있다. 말을 걸기 어려운 분위기다...)", emotion: "default" },
                {
                    text: "지금 작성해야 하는 서류가 뭔지 아세요?", 
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "전입신고": { text: "오, 잘 아시네요. 저기 함에 넣어주세요.", emotion: "default", score: 3 },
                        "신고서": { text: "오, 잘 아시네요. 저기 함에 넣어주세요.", emotion: "default", score: 3 },
                        "몰라": { text: "음... 전입신고서입니다. 저기 있어요.", emotion: "default", score: 0 },
                        "뭐": { text: "음... 전입신고서입니다. 저기 있어요.", emotion: "default", score: 0 },
                        "모르겠": { text: "음... 전입신고서입니다. 저기 있어요.", emotion: "default", score: 0 }
                    }
                },
                { 
                    text: "죄송해요, 제가 지금 정리해야 할 문서가 좀 밀려있어서요. 용건만 간단히 부탁드려요.", 
                    emotion: "sad",
                    choices: [
                        { label: "아, 수고하세요! 나갈게요.", score: 0, reply: "네, 살펴 가세요." },
                        { label: "마을회관이 참 깨끗하네요.", score: 2, reply: "제가 열심히 관리하고 있으니까요. 감사합니다." },
                        { label: "혹시 야구 좋아하세요?", score: -2, reply: "네 좋..! 아니, 근무 시간에 사담은 좀 어렵습니다." }
                    ]
                }
            ],
            "비": [
                { text: "비 오고 나면 확 추워지니 조심하세요. 감기 걸리면 본인만 손해니까요.", emotion: "default" },
                { 
                text: "혹시 우산 색깔 뭐예요? 입구에 꽂아두신 거.", 
                emotion: "happy",
                choices: [
                    { label: "핑크", score: 1, reply: "아ㅋㅋ 우산 귀엽네요. 사쿠야 건 줄 알았어요." },
                    { label: "투명", score: 3, reply: "역시 투명이 앞이 잘 보여서 좋죠. 실용적이네요." },
                    { label: "검정", score: 0, reply: "다른 사람들 거랑 섞이지 않게 조심하세요." }
                ]
                }
            ],
            
            "벚꽃": [
                [
                { text: "산책 나오셨어요?", emotion: "default" },
                { text: "숲은 조용해서 좋아요. 생각 정리하기 딱이거든요.", emotion: "default" },
                ],
                {
                    text: "꽃가루 알레르기 같은 건 없으시죠?",
                    emotion: "default",
                    choices: [
                        { label: "완전 튼튼해요!", score: 0, reply: "다행이네요. 건강한 게 최고죠." },
                        { label: "에취! (재채기를 쥐어짜낸다.)", score: 3, reply: "어, 조심하세요. 마스크 여분 있는데 드릴까요?" }
                    ]
                }
            ]
        },
        
        low: {
            "맑음": [
                [
                { text: "새로운 환경이라 낯설지 않으세요? 저도 처음엔 적응하는 데 시간이 좀 걸렸거든요.", emotion: "happy" },
                { text: "그래도 잘 지내시는 것 같아 다행이네요.", emotion: "default" }
                ],
                {
                    text: "농장에서 뭐 키우세요? 제가 관심 있는 작물이 있는데...", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "커피": { text: "진짜요? 수확하면 저한테 좀 팔아주실 수 있나요?", emotion: "love", score: 3 },
                        "밀": { text: "오, 사쿠야가 좋아하겠다.", emotion: "happy", score: 3 },
                        "파": { text: "파... 건강에 좋죠. 요리할 때 필수니까.", emotion: "default", score: 0 }
                    }
                },
                {
                    text: "잠깐 쉴까 하는데 같이 스트레칭이라도 하실래요?",
                    emotion: "happy",
                    choices: [
                        { label: "좋아요! (없는 유연성까지 끌어다 뽐낸다)", score: 3, reply: "ㅋㅋ유연하시네요. 덕분에 잠 좀 깼어요." },
                        { label: "전 숨쉬기 운동만 합니다.", score: 0, reply: "가장 효율적인 운동이죠. 인정합니다." }
                    ]
                },
                { 
                text: "혹시 마을회관 이용 수칙은 다 읽어보셨나요? 꼼꼼히 확인해주시는 게 좋아요.", 
                emotion: "happy",
                choices: [
                    { label: "헉, 있는 줄 몰랐어요. 지금 읽어볼게요!", score: 0, reply: "네. 궁금한 부분 있으면 알려드릴게요." },
                    { label: "네! 누가 쓴 건지 아주 완벽하던데요?", score: 3, reply: "아... 알아봐 주시니 감사하네요. 열심히 썼거든요." }
                ]
            },
                { 
                text: "농장 일은 처음이라 부족한 게 많을 텐데, 혹시 지금 가장 필요한 게 뭐예요?", 
                emotion: "shy",
                type: "keyword", // ★ 여기가 핵심! 키워드 입력 타입 지정
                answers: {
                    "선배님": { text: "ㅋㅋ저도 전문가는 아니지만... 팁 정도는 알려드릴 수 있어요.", emotion: "happy", score: 5 },
                    "사랑": { text: "네?", emotion: "happy", score: 5 },
                    "너": { text: "네? 저는 왜... 일꾼으로 쓰시고 싶은 건가요?", emotion: "happy", score: 5 },
                    "도움": { text: "ㅋㅋ저도 전문가는 아니지만... 팁 정도는 알려드릴 수 있어요.", emotion: "happy", score: 5 },
                    "가르침": { text: "ㅋㅋ저도 전문가는 아니지만... 팁 정도는 알려드릴 수 있어요.", emotion: "happy", score: 5 }
                }
            }
                
            ],
            
            "비": [
                { text: "비가 오니 마을이 조용하네요. 빗소리 들으면서 업무 보는 것도 좋아요.", emotion: "default" },
                {
                    text: "주로 어떤 장르의 노래 들으세요?",
                    emotion: "default",
                    choices: [
                    { label: "힙합", score: 3, reply: "오! 진짜요? 저도요. 혹시 괜찮으면 플레이리스트 공유할래요? R&B도 좋아하세요?" },
                    { label: "클래식", score: 0, reply: "차분해지고 좋죠. 일할 때 들으면 집중 잘 될 것 같아요." },
                    { label: "동요", score: 3, reply: "동요요? ㅋㅋㅋ 귀여우시네요. 의외로 힐링 될지도..." }
                ]
                },
                { text: "우산 쓰고 다니세요. 감기 걸리면 본인만 손해니까요.", emotion: "default" },
                { 
                text: "비 오는 날은 습기 때문에 책 관리가 까다로워요. 제습기라도 하나 더 놔야 하나...", 
                emotion: "happy",
                choices: [
                    { label: "제가 좀 도와드릴까요?", score: 3, reply: "어... 괜찮으시겠어요? 감사합니다. 다음에 커피라도 한 잔 살게요." },
                    { label: "에궁ㅠㅠ 수고가 많으시네요!", score: 0, reply: "뭘요. 제 일이니까 열심히 해야죠." }
                ]
            },
                { 
                text: "비가 계속 오니까 따뜻한 게 마시고 싶네요.", 
                emotion: "happy",
                choices: [
                    { label: "저도요. 아메리카노 먹고 싶어요!", score: 3, reply: "오, 저도 아메리카노 생각하고 있었어요. 커피 좋아하시는구나." },
                    { label: "저도요. 캐모마일차 먹고 싶어요!", score: 0, reply: "그렇구나. 상점에 차 종류가 꽤 많은데 보셨어요?" },
                    { label: "저도요. 핫초코 먹고 싶어요!", score: 3, reply: "ㅋㅋ다음에 료랑 같이 회관 놀러오세요. 핫초코 타드릴게요." }
                ]
            },
            ],
            
            "벚꽃": [
                [
                { text: "잠시 머리 좀 식히러 나왔어요. 회관에만 있으면 답답할 때가 있어서요.", emotion: "happy" },
                { text: "벚꽃 비가 정말 예쁘죠?", emotion: "default" }
                ],
                {
                    text: "소풍 가고 싶네요. 물론 상상만 하는 거지만... 만약에 도시락 싼다면 뭐 넣고 싶어요?",
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "콩국수": { text: "오! 설탕파세요 소금파세요? 안 맞으면 같이 소풍 못 가는데ㅋㅋ", emotion: "happy", score: 3 },
                        "김치볶음밥": { text: "저 김치볶음밥 좋아해요. 잘 만드세요? ㅎㅎ", emotion: "love", score: 3 },
                        "케이크": { text: "좋죠. 사실 저 밥 대신 디저트만 먹어도 돼요ㅎㅎ", emotion: "happy", score: 3 },
                        "디저트": { text: "좋죠. 사실 저 밥 대신 디저트만 먹어도 돼요ㅎㅎ", emotion: "happy", score: 3 },
                        "두쫀쿠": { text: "어? 두쫑쿠? 어디서 사오게요? 혹시 만들 줄 아세요? 우와...", emotion: "happy", score: 3 },
                        "빵": { text: "좋죠. 사실 저 밥 대신 디저트만 먹어도 돼요ㅎㅎ", emotion: "happy", score: 3 }
                    }
                },
                { 
                text: "(떨어지는 벚꽃잎을 잡으려다 놓친다) 아... 쉽지 않네요.", 
                emotion: "happy",
                choices: [
                    { label: "무슨 소원 비시려고요?ㅎㅎ", score: 1, reply: "음... 더 나은 사람이 되게 해달라고요." },
                    { label: "아 그거 그렇게 하는 거 아닌데", score: 0, reply: "네? 그럼 뭐 어떻게 해야하죠..." },
                    { label: "(벚꽃잎을 하나 잡아 건넨다.)", score: 3, reply: "어... 저 주시는 거예요? 감사합니다. {user} 님도 같이 소원 빌어요." }
                ]
            }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "왔어요? 마침 커피 내리려고 했는데 타이밍이 좋네요.", emotion: "happy" },
                {
                    text: "저기 근데... 호칭을 어떻게 하면 좋을까요? 농장주 님은 너무 딱딱해서. 그냥 이름이 좋을까요?", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "누나": { text: "누... 누나요? 음... 노력은 해볼게요. 어... 누...나.", emotion: "shy", score: 5 },
                        "느나": { text: "느나...? 누나요? 음... 노력은 해볼게요.", emotion: "shy", score: 5 },
                        "느낭": { text: "느낭...? 누나요? 음... 노력은 해볼게요.", emotion: "shy", score: 5 },
                        "자기": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "여보": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "허니": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "애기": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "공주": { text: "ㅋㅋㅋ 불러드릴 수는 있는데 감당 가능하세요? 공주님?", emotion: "shy", score: 5 },
                        "이름": { text: "역시 이름이 제일 무난하죠. 그럼 {user}(이)라고 부를게요.", emotion: "happy", score: 1 }
                    }
                },
                { 
                text: "오늘따라 일이 손에 안 잡히네요. 자꾸 딴생각이 들어서.", 
                emotion: "happy",
                choices: [
                    { label: "무슨 생각 하는데요?", score: 1, reply: "음... 그냥 맛있는 거 먹고 싶다는 생각? 퀸아망에 아아라던가." },
                    { label: "어허. 집중력 부족.", score: 0, reply: "으... 팩트폭력 너무 아픈데요." },
                    { label: "그런 날은 그냥 푹 쉬거나 노는 것도 방법이에요!", score: 3, reply: "오... 이도저도 아닌 것보단 그게 낫겠네요. 근데 저랑 놀아주실 거예요?" }
                ]
                },
                { 
                text: "저 방금 스타주점 다녀왔는데 뭐 샀게요?", 
                emotion: "shy",
                type: "keyword", // ★ 여기가 핵심! 키워드 입력 타입 지정
                answers: {
                    "아메리카노": { text: "ㅎㅎ맞아요. 한 모금 드실래요?", emotion: "happy", score: 3 },
                    "아아": { text: "ㅎㅎ맞아요. 한 모금 드실래요?", emotion: "happy", score: 3 },
                    "커피": { text: "ㅎㅎ맞아요. 한 모금 드실래요?", emotion: "happy", score: 3 }
                }
                }
            ],
            "비": [
                { text: "...좀 전에 천둥칠 때 제 쪽 안 보셨죠? 못 봤다고 해주세요.", emotion: "happy" },
                { text: "비 오는 날 특유의 차분한 공기가 좋아요. {user}님 목소리도 더 잘 들리고.", emotion: "happy" },
                {
                     text: "공기가 눅눅하네요. 이럴 땐 제습기 틀고 가만히 있는 게 최곤데.", // 현실적인 고민
                     emotion: "default",
                    choices: [
                        { label: "같이 있자", score: 3, reply: "그럴까요? 문 닫고 조용히 빗소리만 듣죠. 방해 안 받을게요." },
                        { label: "일해야지", score: 0, reply: "하하.. 알겠어요. 농땡이 안 피울게요." }
                    ]
                 }
            ],
            "벚꽃": [
                { text: "옛날엔 여기서 숨바꼭질하고 놀았는데. 저 꽤 잘 숨어요. 찾아볼래요?", emotion: "happy" },
                { text: "봄이라 그런가, 자꾸 졸리네요. 커피를 마셔도 소용이 없어...", emotion: "shy" },
                { text: "어, 머리에 꽃잎 붙었다. ...가만히 있어봐요.", emotion: "happy" },
                {
                    text: "여기 서 있어 봐요. 배경이 예뻐서 사진 찍어 드릴게요.", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "김치~ (브이 한다)", score: 0, reply: "ㅋㅋ자연스럽게 잘 나왔네요. 보내드릴게요." },
                        { label: "같이 찍어요!", score: 3, reply: "네? 저요? 아... 전 사진 잘 안 찍는데... 그래도 오늘은 벚꽃이 유난히 예쁘니까 한 장 남겨야겠네요." }
                    ]
                },
            ]
        },
        high: { // 70점 이상
            "맑음": [
                { text: "오셨어요? 안 오면 섭섭할 뻔했는데.", emotion: "love" },
                { text: "내일도 날씨 맑대요. 내일도... 회관 들러주실 거죠?", emotion: "love" },
                {
                    text: "{user}, 주말에 시내 LP바 갈 건데 혹시 같이 갈래요?", //
                    emotion: "default",
                    choices: [
                        { label: "좋아", score: 3, reply: "다행이다. 맛있는 것도 먹고 와요 우리." },
                        { label: "글쎄", score: 0, reply: "부담 주는 건 아니에요. 그래도... 같이 가면 좋을 것 같아서요." }
                    ]
                },
                {
                    text: "오늘 일찍 퇴근할 것 같은데... 혹시 저녁에 뭐 하세요?", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "시온 씨랑 놀아야죠!", score: 3, reply: "ㅎㅎ그럴래요? 맛있는 거 먹으러 가요." },
                        { label: "고민 중이에요", score: 0, reply: "고민 중이면... 저랑 저녁 드실래요?" },
                        { label: "졸려서 푸데푸데 잘 거예용", score: 1, reply: "? 네? 푸데푸데... 가 뭔지 모르겠지만...ㅋㅋ 어감이 귀엽네요. 그럼 푹 주무세요." }
                    ]
                }
            ],
            "비": [
                {
                    text: "(작게 하품을 한다) 으... 어제 늦게 잤더니 좀 졸리네요.", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "제 어깨 빌려드릴까요?", score: 3, reply: "어... 진심이에요? 저 진짜 기대요? 무거울 텐데ㅋㅋ" },
                        { label: "(얼굴 앞에 박수를 짝 치며) 정신 차리십쇼 관리자님!", score: 0, reply: "아 ㅋㅋㅋ 깜짝이야. 덕분에 잠 확 깼네요. 고마워요." }
                    ]
                },
                { text: "아 어제 야구 보는데 우리 팀이 역전승했거든요! 진짜 소리 지를 뻔했어요.", emotion: "happy" },
                { 
                    text: "비도 오는데... 오늘 회관 일찍 닫고 파전이나 먹을까요? 농담이에요. ㅎㅎ", 
                    emotion: "happy" 
                }
            ],
            "벚꽃": [
                { text: "여기가 앉아서 책 읽기 딱 좋아요. 지금은 글자가 눈에 들어올지는 모르겠지만...", emotion: "happy" },
                {
                     text: "벚꽃잎 책갈피 하나 만들어 줄까요?",
                     emotion: "default",
                     choices: [
                        { label: "만들어줘요", score: 3, reply: "기다려봐요. 제일 예쁜 잎으로 골라서 만들어줄게요." },
                        { label: "괜찮아요", score: 0, reply: "이런 건 취향이 아닌가 보네요. 아쉽다." }
                    ]
                 },
                {
                    text: "나중에 은퇴하면 어디서 살고 싶어요?",
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "시골": { text: "저돈데. 한적한 곳에서 좋아하는 사람들이랑... 생각만 해도 좋네요.", emotion: "happy", score: 5 },
                        "바다": { text: "저도요! 사실 고향이 바닷가 마을이거든요. ...다음에 {user} 님도 초대하고 싶어요.", emotion: "happy", score: 5 },
                        "바닷가": { text: "저도요! 사실 고향이 바닷가 마을이거든요. ...다음에 {user} 님도 초대하고 싶어요.", emotion: "happy", score: 5 },
                        "도시": { text: "도시라... 편리하긴 하죠. 전 그래도 여기가 더 좋은 것 같아요.", emotion: "default", score: 3 },
                        "너랑": { text: "...! 그런 멘트는 어디서 배우시는 거예요...", emotion: "love", score: 5 },
                        "시온": { text: "...! 그런 멘트는 어디서 배우시는 거예요...", emotion: "love", score: 5 }
                    }
                }
            ]
        }
    },
    
    // 리쿠 예시 (나머지 멤버도 같은 구조로 추가)
    riku:
    {
        very_low:  {
            "맑음": [
                
                { text: "안녕하세용! 필요한 거 잇어여?", emotion: "default" },
                { text: "날씨가 넘 덥네영.. 녹을 거 같아 ㅠㅠ", emotion: "sad" },
                { text: "어서오세여. 물건은 눈으로만 봐주세여. 방금 정리햇거든여", emotion: "default" },
                {
                    text: "(진열대의 물건 줄을 칼같이 맞추고 있다)", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "각이 살아있네!", score: 3, reply: "그쳐? 삐뚤어진 거 보면 못 참겟어여.. 리쿠 쫌 꼼꼼하져?" },
                        { label: "대충 해~", score: 0, reply: "에.. 구럼 찜찜한데.. 깔끔한 게 보기 조차나여." }
                    ]
                },
                {
                    text: "(칙칙- 몸에 무언가를 뿌리고 있다)",
                    emotion: "default",
                    choices: [
                        { label: "뭐 뿌려?", score: 0, reply: "아, 땀 냄새 날까바여. 땀 나면 찝찝하자나여 ㅠㅠ" },
                        { label: "좋은 냄새 난다", score: 3, reply: "진짜영? 다행이다ㅎㅎ" }
                    ]
                }
                  
                  ],
            "비": [
                { text: "저 농떙이 피는 거 아니에용! 비 오는 날은 손님이 별로 없어서 일 안 해용!", emotion: "sad" },
                {
                    text: "우산 잘 털고 들어오세여 ~ 물기 떨어지면 미끄러우니까.", // 선택지: 챙김
                    emotion: "default",
                    choices: [
                        { label: "잔소리쟁이!", score: 0, reply: "아니거든여 ! {user} 넘어질까바 걱정해서 구런 거거든여 !" },
                        { label: "알겠어, 꼼꼼하네.", score: 3, reply: "히히 당연하져. 사장님이 리쿠를 아끼는 데에는 이유가 다 잇져~" }
                    ]
                },
                {
                     text: "눅눅해서 옷에서 냄새날 거 같아여.. {user}, 나한테서 꿉꿉한 냄새 나여?", // 위생 강박
                     emotion: "shock",
                     choices: [
                        { label: "좋은 냄새만 나", score: 3, reply: "휴.. 다행이다. {user}도 조은 냄새 나여 헤헤" },
                        { label: "조금...?", score: 0, reply: "으악!! 진짜영?! 집 가서 씻고 올래여 ㅠㅠ 오지 마여!!" }
                    ]
                 }
                 ],
            "벚꽃": [
                { text: "예쁜데 꽃가루 날려서 피부 뒤집어질 거 같아여.. 마스크가 어딨더라...", emotion: "sad" },
                { text: "꽃구경 가는 것두 조은데 리쿠는 걍 여기서 돗자리 펴고 눕고 시퍼여." },
                { text: "분홍색 눈이 내려여!", emotion: "happy" },
                {
                    text: "사람들 옷차림이 다 가벼워졋네영. 봄이 오긴 왔나 바여.", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "리쿠 옷 예쁘네", score: 3, reply: "헤헤.. 신경 쫌 썻어여. 패션의 완성은 리쿠징 ~" },
                        { label: "난 아직 추운데", score: 0, reply: "추워여? {user} 감기 걸리겟당. 따뜻하게 입고 다녀여." }
                    ]
                }
            ]
        },
            
        low: {
            "맑음": [
                { text: "{user} 왓어여? 기다리고 잇엇는데 ~ 히히", emotion: "happy" },
                { text: "{user} 왓어여? 으.. 방금 물류 정리해서 땀 범벅이에여 ㅠㅠ 오지 마여.", emotion: "sad" },
                {
                    text: "가게에서 좋은 냄새 나지 않아여? 오늘 라벤더 향초 켜놧는데", // 키워드 (향기)
                    emotion: "default",
                    choices: [
                        { label: "응 좋다~", score: 3, reply: "그쳐? 향기가 좋으니 기분이 좋다!" },
                        { label: "조금 독해", score: 0, reply: "에.. 독해여? 구롬 이제 꺼야겟다 미안해여" },
                        { label: "아무 냄새도 안 나는데..", score: 0, reply: "그럴 수가 잇나? 코가 막힌 거 아니에여??? 병원 가봐여 병원!" }
                    ]
                },
                {
                    text: "사람들이 쓰레기 아무데나 버려서 속상해여..", // 선택지
                    emotion: "sad",
                    choices: [
                        { label: "내가 같이 치워줄게.", score: 3, reply: "징짜여? 와.. {user} 천사예여? 감동받아따.." },
                        { label: "원래 축제가 그렇지 뭐.", score: 0, reply: "치.. 그래두 깨끗한 게 조은데.." }
                    ]
                },
                {
                    text: "이거 먹을래여? 입안이 시원해져여.", // 키워드
                    emotion: "happy",
                    choices: [
                        { label: "고마워!", score: 3, reply: "리쿠 필수템이에여! 식사하고 양치 바로 못 할 때 꼭 먹어여" },
                        { label: "매워...", score: 0, reply: "엥? 이게 맵다구여? {user} 아직 애기구낭ㅋㅋ" },
                        { label: "난 괜찮아", score: 0, reply: ".. 치. 구럼 리쿠 혼자만 먹을게여." }
                    ]
                },
                {
                    text: "오늘 날씨 짱 조아여. 이런 날엔 강가에 앉아서 물멍 때려야 대는데..",
                    emotion: "default",
                    choices: [
                        { label: "같이 갈래?", score: 3, reply: "오! 사장님한테 안 들키게 해줄 수 있으면 갈게여 히히" },
                        { label: "일해라 알바생", score: 0, reply: "넹.. ㅠㅠ 돈 벌어야징.. 리쿠는 개미예여 ㅠㅠ" }
                    ]
                },
                {
                    text: "아까 시온 형이 리쿠보고 고양이 닮앗다 햇어요. 왜지?? 어디가 닮은 거지?",
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "귀여워서": { text: "헤헤 그쳐? 리쿠가 좀 귀엽긴 하징 ~ 알썽 인정!", emotion: "happy", score: 5 },
                        "눈이": { text: "오.. 눈이 예쁘다는 건가? 칭찬이니 기분이 좋다", emotion: "happy", score: 3 },
                        "글쎄": { text: "엥? 반응이 왜 구래여 ㅠㅠ 대답해주기 귀찮은가?", emotion: "sad", score: 0 },
                        "몰라": { text: "엥? 반응이 왜 구래여 ㅠㅠ 리쿠 삐질거야", emotion: "sad", score: 0 },
                        "모르": { text: "엥? 반응이 왜 구래여 ㅠㅠ 리쿠 삐질거야", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "오늘따라 일이 넘 힘두러여 ㅠㅠ 응원해주세영..", // 선택지
                    emotion: "sad",
                    choices: [
                        { label: "(머리를 쓰다듬어 준다)", score: 3, reply: "헤헤.. 조타.. {user} 손길은 따뜻하니 잠이 온다.." },
                        { label: "말로만 힘내!", score: 3, reply: "치.. 쫌 더 성의잇게 해줘영 !!" }
                    ]
                }
            
            ],
            
            "비": [
                { text: "비 오니까 쳐진다 ㅠㅠ 충전이 필요해여..", emotion: "sad" },
                {
                    text: "혹시 단 거 조아해여? 여기 초코리 잇는데..", // 키워드
                    emotion: "shy",
                    choices: [
                        { label: "좋아해", score: 3, reply: "그쳐? 이거 진짜 마싯는 건데.. {user}니까 주는 거예여 ! 아 ~ 해봐여" },
                        { label: "싫어해", score: 0, reply: "에~ 나눠주려고 했는데 그럼 리쿠 혼자 다 먹어야겟넹. 이 썩겟다." }
                    ]
                },
                {
                    text: "어? {user} 어깨에 벌레 붙어써여. 가만히 잇어바여.", // 키워드: 벌레
                    emotion: "default",
                    choices: [
                        { label: "고마워", score: 0, reply: "별거 아니에여 ~ 히히" },
                        { label: "안 무서워?", score: 1, reply: "에? 이 쪼그만 게 뭐가 무서워여? 얘 입장에서는 우리가 더 무섭져" },
                        { label: "으악!", score: 3, reply: "ㅋㅋㅋㅋ 반응 귀엽당. 벌레 리쿠가 다 잡아줄게여 걱정 마여!" }
                    ]
                }
            ],
            
            "벚꽃": [
                
                { text: "꽃구경 갓다 왓어여? 누구랑 갓다 왓어여?", emotion: "default" },
                {
                    text: "{user}한테서 조은 냄새 나여. 샴푸 뭐 써여?", // 키워드: 향기
                    emotion: "shy",
                    choices: [
                        { label: "과일향", score: 1, reply: "아 ~ 달달해용! 리쿠도 이걸로 샴푸 바꿀까영" },
                        { label: "꽃향", score: 1, reply: "아 ~ 향기로워용! 리쿠도 이걸로 샴푸 바꿀까영" },
                        { label: "무향", score: 3, reply: "진짜영? 구롬 원래 살냄새가 조은가부다.. 부럽당" }
                    ]
                },
                {
                    text: "리쿠랑 꽃이랑 누가 더 예뻐여? 솔직히 말해바여 !", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "리쿠": { text: "꺄 히히히 정답 ! {user}는 눈이 좋네 ~ 넘 조아 !!", emotion: "love", score: 3 },
                        "꽃": { text: "흥.. 그래여 꽃이랑 사귀세여 ㅠㅠ 리쿠는 갈 거야..", emotion: "sad", score: 0 },
                        "둘다": { text: "에.. 그건 쫌 비겁한데.. 그래두 리쿠가 껴 잇으니 봐줄게영 ~", emotion: "default", score: 1 }
                    }
                },
                {
                    text: "도시락 싸서 소풍 가고 싶다~ {user}는 요리 잘해여?", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "완전 잘하지!", score: 3, reply: "오 ~ 나중에 리쿠한테두 맛보여줘영. 냉정하게 평가해줄게여." },
                        { label: "라면만 끓여", score: 0, reply: "ㅋㅋㅋㅋ 그것두 기술이져. 라면 잘 끓이는 것두 쉽지 않아여." }
                    ]
                }
            ]
        },
        
        mid: {
            "맑음": [
                [
                    { text: "{user} 오늘 머해여? 리쿠랑 놀장 ~", emotion: "sad" },
                    { text: "어? {user} 왓당! 오늘도 리쿠 보러 온 거져? 다 알아여 😙", emotion: "happy" },
                    { text: "아까 창고에서 넘어져서 무릎 까져떠여.. 호 해줘영 ㅠㅠ", emotion: "sad" },
                    {
                    text: "저기.. 나 땀 냄새 안 나여? 아까 춤 연습 쫌 하구 왓는데.. 솔직히 말해바여.", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "좋은": { text: "진짜영? 다행이다.. 섬유유연제 냄새인가? 맡아볼래여?", emotion: "happy", score: 3 },
                        "땀": { text: "헐 !! 충격.. 저리 가여 ! 씻고 올 거야 ㅠㅠ", emotion: "shock", score: 0 },
                        "안나": { text: "휴.. 리쿠 관리하는 남자예여. 이 정도는 기본이징.", emotion: "happy", score: 1 }
                    }
                },
                    {
                    text: "헉! 방금 {user} 보니까 심장이 쿵쿵해여. 병원 가야 되나??", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "내가 의사 해줄게!", score: 3, reply: "오 ! 녱 ! 고쳐주세영 선생님 히히" },
                        { label: "부정맥 아니야?", score: 0, reply: "아 진짜.. 분위기 다 깸 ㅠㅠ 넘해 !!" }
                    ]
                }
                ]
            ],
            "비": [
                {
                    text: "혹시 이상형이 어떠케 돼여?", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                    "귀여운": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "고양이": {text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "다람쥐": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "햄스터": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "애햄": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "잘생": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "깜고": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "일남": { text: "어? 그거 완전 리쿠인데? 히히 {user}는 리쿠를 조아하는구낭~", emotion: "happy", score: 5 },
                    "리쿠": { text: "악 ! 대박 ! 부끄러워 ㅠㅠ ..나두 조아해영..", emotion: "love", score: 5 }
                    }
                },
                {
                    text: "좋아하는 향기 잇어여? 담에 리쿠가 뿌리구 오게.", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "향": { text: "오 ! 리쿠랑도 잘 어울리겟네영. 접수 완료 !", emotion: "happy", score: 3 },
                        "리쿠": { text: "!!!!  ..그런 말은 예고하구 하라구여.. 심장 떨려떠여..", emotion: "love", score: 5 },
                        "너": { text: "!!!! ..그런 말은 예고하구 하라구여.. 심장 떨려떠여..", emotion: "love", score: 5 }
                    }
                },
                 {
                    text: "우산 쓰기 귀차는데.. 걍 {user} 옷 속에 숨어서 갈까여?", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "들어와!", score: 3, reply: "헤헤.. 따뜻하다. 캥거루 주머니 같아여." },
                        { label: "옷 늘어나", score: 0, reply: "치.. 리쿠 가볍거든여? 쫌 봐주지.." }
                    ]
                }
                ],
            
            "벚꽃": [
                { text: "벚꽃 잎 잡으면 소원 이루어진대여. 리쿠 소원은 비밀이징 ~", emotion: "happy" },
                { text: "밤에 보는 벚꽃이 더 예쁜 거 알아여? 가로등 켜지면 진짜 장난 아니에여.", emotion: "happy" },
                {
                    text: "머리에 꽃잎 묻엇어여. 가만히 잇어바여. (후 ~ 하고 불어준다)", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "간지러워 ㅋㅋ", score: 1, reply: "히히 일부러 그런 건데 ~ 반응 귀엽당" },
                        { label: "(눈을 마주친다)", score: 3, reply: "으.. 그렇게 쳐다보면 부끄러운뎅.. 얼굴 빨개졋져 ㅠㅠ" }
                    ]
                },
                {
                    text: "만약에 리쿠가 아이돌 한다구 하면 어떨 거 같아여? 춤추는 거 조아하거든여.", // 키워드
                    emotion: "shy",
                    choices: [
                        { label: "잘 어울려", score: 3, reply: "그쳐? 리쿠 끼가 쫌 넘치자나여 ~ " },
                        { label: "인기 많을 것 같아", score: 3, reply: "헤헤.. 구롬 {user}가 1호 팬 해줄 거예여? 약속 !" },
                        { label: "쉽지 않은 직업일 텐데..", score: 1, reply: "알아여.. 그래두 무대 서면 벅찰 거 같아서여!" },
                    ]
                },
                  ]
        },
        high: {
            "맑음": [
            { text: "{user} 님은 맨날 바쁘네여... 농장이 좋아여 리쿠가 좋아여? 빨리 골라여!", emotion: "shock" },   
                { 
                    text: "왜 어제는 안 왓어여?? 리쿠 심심햇는데", 
                    emotion: "sad", 
                    choices: [
                        { label: "미안~ 농장 일이 너무 바빴어", score: 0, reply: "흐음... 구롬 용서해줄게여" },
                        { label: "유우시랑 노느라...", score: -5, reply: "왜 리쿠를 두고 유우시랑 놀앗어여?? 질투나여 !!" },
                        { label: "보고 싶었어?", score: 3, reply: "녱 ! 넘 심심햇단 말이에여" }
                    ]
                },
            { text: "왜 이제 왓어여 ! 기다리다 목 빠지는 줄 아랏네 ㅠㅠ 농장 일이 글케 바빠여?", emotion: "sad" },
             {
                    text: "아까 시온 형이 같이 밥 먹자 그랫는데 안 먹엇어여. 왜 그랫게여?", // 키워드 (답정너)
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "나랑먹으려고": { text: "정답 ~ 눈치 빠르네여. {user}랑 먹는 게 젤 편하니깐", emotion: "happy", score: 5 },
                        "배불러서": { text: "아니거든여 ! 배고파 죽겟는데 참은 거거든여 ! 왜 이리 눈치가 없어여!", emotion: "shock", score: 0 },
                        "몰라": { text: "내가 말해줘야 해여? 왜 이리 눈치가 없는고야..", emotion: "shock", score: 0 },
                        "왜": { text: "내가 말해줘야 해여? 왜 이리 눈치가 없는고야..", emotion: "shock", score: 0 },
                        "모르": { text: "내가 말해줘야 해여? 왜 이리 눈치가 없는고야..", emotion: "shock", score: 0 }
                    }
                },
            { text: "어서 와여. {user} 오니까 가게가 환해지네영 ~", emotion: "love" },
                {
                    text: "나중에 돈 마니 벌면 도시 가서 살고 시퍼여? 아님 계속 여기 잇을 거예여?", // 키워드
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "너": { text: "진짜영? ..나두여. {user} 잇는 곳이 젤 조아여.", emotion: "love", score: 5 },
                        "리쿠": { text: "진짜영? ..나두여. {user} 잇는 곳이 젤 조아여.", emotion: "love", score: 5 },
                        "여기": { text: "진짜영? 그럼 나랑 계속 여기서 평생 살아여!", emotion: "love", score: 5 },
                        "도시": { text: "..에 구롬 리쿠도 따라가야지! 껌딱지처럼 붙어 잇을 거야.", emotion: "happy", score: 0 }
                    }
                },
                {
                    text: "손 줘바여. (손바닥에 소포장 젤리를 쥐여준다)", // 
                    emotion: "shy",
                    choices: [
                        { label: "이게 뭐야?", score: 0, reply: "리쿠가 아끼는 젤리예여. 먹구 힘내라구여." },
                        { label: "(손을 잡는다)", score: 3, reply: "어.. 젤리 주려구 한 건데.. {user}가 먼저 잡은 거예여 안 놔줘야징" }
                    ]
                }
                
            
            ],
            "비": [
                
                { text: "비 와도 {user}랑 있으면 조아용!", emotion: "happy" },
                { text: "비 와서 쫌 처졌었는뎅 {user} 보니 기분이 좋아졋어여", emotion: "happy" },
                { text: "나중에 리쿠랑 같이 도시 놀러 가여 맛잇는 거 다 사줄게여 리쿠만 믿엉", emotion: "love" },
                {
                    text: "만약에 리쿠가 아프면 어떠케 할 거예여?", // 키워드
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "간호": { text: "와.. 든든하당. 구럼 아파두 안 무섭겟네영 히히", emotion: "happy", score: 3 },
                        "병원가": { text: "아니.. 걱정해달라구여 ㅠㅠ T예여?", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "시온 형이 나보고 꼼꼼하대여. 청소두 잘하구 정리두 잘한다구. 갑자기 왜 칭찬햇지??", // 키워드: 답정너
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "신랑감": { text: "아 징짜여? ㅋㅋㅋ 리쿠랑 살면 편하긴 하겟당 그쳐?", emotion: "happy", score: 3 },
                        "일시키려": { text: "아.. 그런 건가? 낚인 건가? ㅠㅠ 리쿠 바보 아니거든여..", emotion: "shock", score: 0 }
                    }
                }
            ]
            
            ,
            "벚꽃": [
                
            { text: "벚꽃 보니 기분이 조아여 히히", emotion: "happy" },
            { 
                    text: "꽃잎 잡으면 소원 이루어진다 햇어요 ! 빨리 잡아봐여 !", 
                    emotion: "happy",
                    choices: [
                        { label: "이미 잡았지~ (리쿠에게 준다)", score: 5, reply: "어? 이고 리쿠 주는 거예여? ...감동이당 ㅠㅠ" },
                        { label: "그런 걸 믿냐 바보야", score: 0, reply: "아 진짜거등여?? 낭만이 없엉 !!" },
                        { label: "같이 잡자!", score: 3, reply: "조아여 ! 누가 더 많이 잡나 내기해여 !" }
                    ]
                },
            { text: "낭만이 별거 잇나여. 조은 사람이랑 맛잇는 거 먹으면 그게 낭만이징.", emotion: "default" },
                {
                    text: "내년 벚꽃 필 때두.. 여기 잇을 거예여? 안 갈 거져?", // 키워드 (불안/확인)
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "안가": { text: "약속해여. 리쿠는 한번 정 주면 오래 가니깐.. {user}두 그래야 돼여", emotion: "love", score: 5 },
                        "모르": { text: "와.. 냉정하네. 정 없당.. 갈 거면 미리 말해여 맘 준비하게", emotion: "sad", score: 0 }
                    }
                },
                [
                    { text: "리쿠는여. {user}(이)가 걍 조아여. 이유 없구 걍... 같이 잇으면 기분이 좋아져여~", emotion: "love" },
                    { text: "에? 믿겨가 안 돼? 진짜인뎅...", emotion: "love" }
                ]
            ]       
        }
    },

    yushi: {
        very_low: {
            "맑음": [
                { text: "에.. 오늘은 구름 모양이 꼭 붕어빵 같네요 ~", emotion: "happy" },
                { 
                text: "농장주 님의 농장에는 귀여운 게 많지요 ?", 
                emotion: "happy",
                choices: [
                    { label: "어떤 거요? 허수아비?", score: 1, reply: "네 ! 근데 낮에는 괜찮은데 밤에 보면 좀 무서워요.." },
                    { label: "어떤 거요? 트랙터?", score: 0, reply: "에.. 기계는 좀 시끄러워서.. 저는 별로 안 좋아해요." },
                    { label: "어떤 거요? 동물?", score: 3, reply: "맞아요 ! 특히 하얀색 꼬꼬가 아주 귀여워요 ^_^ 이름이 있나요 ?" }
                ]
                }
            ],
            
            "비": [
                { text: "비 냄새가 좋지요 ? 흙냄새도 나고..", emotion: "happy" },
                {
                    text: "비 오는 날에는 뭘 하는 게 제일 좋을까요 ?", // 키워드
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "낮잠": { text: "좋죠 ! 빗소리 들으면서 자면 꿀맛이지요 ~", emotion: "happy", score: 3 },
                        "산책": { text: "에.. 산책.. 좋지만 옷이 젖지 않을까요 ?", emotion: "happy", score: 0 },
                        "파전": { text: "와 ! 통했어요 ! 파전을 부치는 소리가 꼭 빗소리 같으니까요 ^_^ 에... 배고파졌다... 비 오는 날마다 주점에 파전을 파는데 같이 먹으러 가실래요 ?", emotion: "default", score: 3 }
                    }
                },
                {
                    text: "축축해서 털이 젖는 건 좀 싫네요..",
                    emotion: "sad",
                    choices: [
                        { label: "방금 털이라고 하셨어요?", score: 0, reply: "에..? 잘못 들으신 거 아니에요 ? ^_^;;" },
                        { label: "우산 같이 쓰실래요?", score: 3, reply: "감사해요 ! 덕분에 안 젖겠네요 ! 농장주 님은 천사 같아요~" }
                    ]
                }
            ],
            
            "벚꽃": [
                { text: "꽃잎 잡으려고 했는데.. 놓쳤어요.", emotion: "sad" },
                {
                    text: "저는 하늘색을 보면 기분이 좋아져요. 농장주 님은 무슨 색 좋아하세요 ?", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "분홍": { text: "분홍 ! 벚꽃을 닮아 이쁘지요 ~", emotion: "default", score: 3 },
                        "하늘": { text: "와 ! 저랑 똑같네요 ! 찌찌뽕 😙 벚꽃도 하늘색이면 좋겠어요 ~", emotion: "love", score: 5 },
                        "초록": { text: "숲이랑 같은 색이네요. 편안한 느낌이라 좋아요 ^_^", emotion: "happy", score: 3 }
                    }
                }
            ]
        },
        
        low: {
            "맑음": [
                { text: "에 ! 신기해요. 마침 {user} 님이 와줬으면 좋겠다 생각하고 있었는데 ~", emotion: "happy" },
                {
                    text: "무슨 노래 듣는 거 좋아하세요 ?", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "팝송": { text: "오 ~ 팝송 좋지요. 저도 자주 들어요 !", emotion: "happy", score: 3 },
                        "발라드": { text: "감성적이시네요 ~ 비 오는 날 들으면 딱이겠어요 !", emotion: "default", score: 0 },
                        "엑소": { text: "에..?! 엑소를 아세요 ? 저 완전 팬인데 ! 😙 최애가 누구예요 ?", emotion: "love", score: 5 }
                    }
                },
                {
                    text: "배고프지 않으세요 ? 푸딩이 하나 있긴 한데..", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "유우시 먹어요~ 난 괜찮아.", score: 3, reply: "에.. 진짜요 ? 그럼 제가 다 먹을게요 ! 잘 먹겠습니다 ~^_^" },
                        { label: "오! 먹을래요!", score: 0, reply: "아.. 근데 저도 먹어야 해서 ! 반만 드릴게요. 반만 !" }
                    ]
                }
            ],
            
            "비": [
                { text: "우산 안 가져왔어요 ? 에.. 제 거 같이 쓰실래요 ? 조금 좁긴 하지만..", emotion: "shy" },
                {
                    text: "비가 오니까 옛날 생각이 나네요. 추억은 소중한 거지요 ?", // 키워드
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "소중": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 3 },
                        "응": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 3 },
                        "당연": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 3 },
                        "맞아": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 3 },
                        "그닥": { text: "에.. 너무 삭막한 거 아니에요 ? 낭만이 없으시네 !", emotion: "sad", score: 0 },
                        "별로": { text: "에.. 너무 삭막한 거 아니에요 ? 낭만이 없으시네 !", emotion: "sad", score: 0 },
                        "글쎄": { text: "에.. 너무 삭막한 거 아니에요 ? 낭만이 없으시네 !", emotion: "sad", score: 0 },
                        "아니": { text: "에.. 너무 삭막한 거 아니에요 ? 낭만이 없으시네 !", emotion: "sad", score: 0 }
                    }
                },
               {
                    text: "빗소리가 꼭 피아노 치는 소리 같지 않아요 ?", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "감수성이 풍부하시네요!", score: 3, reply: "그런가요 ? ^_^ 저는 그냥 들리는 대로 말한 건데 ~" },
                        { label: "그냥 물 떨어지는 소리 같은데요!", score: 0, reply: "에.. 재미없어." }
                    ]
                }
            ],
            
            "벚꽃": [
                { text: "꽃잎이 머리에 붙었어요. 그치만 떼주지 않을 거예요 ! 예쁘니까 😙", emotion: "happy" },
                {
                    text: "도시락 싸 왔는데 같이 먹을래요 ? 메뉴는 비밀이지요 ~", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "김밥": { text: "땡 ! 틀렸습니다 ~ 정답은 유부초밥이지요 😙", emotion: "happy", score: 1 },
                        "초밥": { text: "오 ! 비슷해요. 유부초밥 싸 왔거든요. 하나 드릴까요 ?", emotion: "happy", score: 3 }
                    }
                },
                {
                    text: "사진 찍고 싶다..", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "제가 찍어드릴까요?", score: 0, reply: "좋아요 ! 예쁘게 찍어주세요 ~" },
                        { label: "같이 찍어요 우리!", score: 3, reply: "에.. 같이요 ? 음.. 좋아요 ^_^ 추억 하나 저장 !" }
                    ]
                }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "에.. 심심하다. {user} ! 저랑 놀아주세요. 네 ? 😙", emotion: "happy" },
                {
                    text: "우주에 간다면 뭘 하고 싶어요 ?", // 키워드 (4차원 질문)
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "수영": { text: "우주에서 수영이라니.. 낭만적이네요 ! 같이 헤엄칠까요 ? ^_^", emotion: "happy", score: 3 },
                        "낮잠": { text: "무중력 상태로 둥둥 떠서 자는 거네요. 와.. 진짜 편하겠다 ! ", emotion: "default", score: 3 },
                        "외계인": { text: "에.. {user}가 외계인 잡으러 다니면 저는 도망 다녀야겠네요 ~", emotion: "shy", score: 5 }
                    }
                },
                {
                    text: "(풀밭에 엎드려서 무언가를 열심히 찾고 있다)",
                    emotion: "default",
                    choices: [
                        { label: "뭐 찾아요? 네잎클로버?", score: 3, reply: "딩동댕 ! 찾으면 {user}한테 선물로 주려고 했지요 ~" },
                        { label: "개미 관찰해요?", score: 0, reply: "에.. 개미는 너무 작아서 안 보여요. 행운을 찾는 중 !" }
                    ]
                }

            ],
            
            "비": [
                { text: "비가 오는 날은 세상이 멈춘 것 같아요. 우리만 움직이는 느낌 ? ^_^", emotion: "default" },
                {
                    text: "이렇게 비 오는 날엔 따뜻한 게 마시고 싶어져요. {user}는 어떤 마실 것을 좋아해요 ?", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "핫초코": { text: "달달한 거 좋아하시는구나 ! ^_^", emotion: "love", score: 1 },
                        "우유": { text: "따뜻한 우유.. 잠 잘 오겠네요. 아기 같아요 ~", emotion: "happy", score: 3 },
                        "커피": { text: "에- 역시 {user}(은)는 어른이네요. 시온이 형도 커피를 참 좋아하지요 ^_^", emotion: "sad", score: 1 }
                    }
                },
                {
                    text: "신발 젖는 거 싫은데.. {user}가 나를 업고 가주면 조켄네...", // 
                    emotion: "shy",
                    choices: [
                        { label: "어휴, 업히세요! (등을 내민다)", score: 3, reply: "와 ! 진짜요 ? 농담이었는데 ! {user}는 정말 착하네요~^_^" },
                        { label: "그건 좀 무리일 것 같은데요?", score: 0, reply: "치.. 너무해 ! 그치만 저도 농담이었어요 !" },
                        { label: "(못 들은 척)", score: 0, reply: "{user}가 나를 업고 가주면 조켄네... {user}가 나를 업고 가주면 조켄네... {user}가 나를 업고 가주면 조켄네... (앵우시가 나타났다!)" }
                    ]
                }
                    ],
            "벚꽃": [
                { text: "벚꽃 잎이 눈처럼 내려요. 4월의 크리스마스 같지요 ? ^_^", emotion: "happy" }, 
                {
                    text: "꽃말 같은 거 믿으세요 ? 벚꽃의 꽃말이 뭔지 아시나요 ?", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "미인": { text: "에.. {user} 이야기하는 거예요 ? ^_^ 농담 ~", emotion: "happy", score: 1 },
                        "순결": { text: "오 ! 잘 아시네요. 역시 똑똑해 !", emotion: "default", score: 3 },
                        "중간고사": { text: "에에 ! 그건 너무 현실적인데요.. 분위기 깼어 !", emotion: "shock", score: 0 }
                    }
                },
                {
                    text: "저기 나무 흔들면 꽃비 내릴 것 같은데.. 같이 흔들어 볼래요 ?",
                    emotion: "happy",
                    choices: [
                        { label: "좋아! 하나, 둘, 셋!", score: 3, reply: "와아 ~ (꽃잎을 맞으며) 진짜 예쁘다 ! {user}도 예쁘.. 에.. 아무것도 아니에요." },
                        { label: "나무가 아파해요..", score: 0, reply: "아.. 그렇구나. 제가 생각이 짧았네요 ㅠ_ㅠ 미안해 나무야.." }
                    ]
                }
            
            ]
        },
        
        high: { // 70점 이상
            "맑음": [
                { text: "어 ? {user} 왔다 ! 오늘따라 늦게 온 것 같아요. 기다렸는데..", emotion: "sad" }, // 일반
                {
                    text: "저기.. 다른 사람들이랑 노는 거 재밌어요 ?", // 키워드 (질투)
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "재밌": { text: "에.. 그렇구나. 저는 {user}랑 노는 게 제일 재밌는데..", emotion: "sad", score: 0 },
                        "응": { text: "에.. 그렇구나. 저는 {user}랑 노는 게 제일 재밌는데..", emotion: "sad", score: 0 },
                        "그저": { text: "그럼 저랑 놀아요 ! 제가 더 재밌게 해줄 수 있어요 😙", emotion: "happy", score: 3 },
                        "별로": { text: "그럼 저랑 놀아요 ! 제가 더 재밌게 해줄 수 있어요 😙", emotion: "happy", score: 3 },
                        "아니": { text: "역시 그렇죠 ? 다행이에요~ ^_^", emotion: "happy", score: 5 }
                    }
                },
                {
                    text: "나른하네요.. {user} 어깨 좀 빌려도 돼요 ?", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "당연하지! (어깨를 내어준다)", score: 3, reply: "(기대며) 아.. 편하다. 냄새도 좋고.. 잠올 것 같아요." },
                        { label: "무거워~", score: 0, reply: "에.. 저 깃털처럼 가벼운데 ! 너무해 !" }
                    ]
                }

            ],
            "비": [
                { text: "비 오는 날은 위험하니까 숲에 가지 말고 저랑 여기 있어요. 알겠지요 ?", emotion: "serious" },
                {
                    text: "만약에 제가 갑자기 멀리 떠나면 어떨 것 같아요 ?", // 키워드
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "슬": { text: "저도요.. 상상만 해도 너무 슬퍼요. 그러니까 안 떠날래요 !", emotion: "happy", score: 5 },
                        "안돼": { text: "에.. 감동 ! ^_^ 절대 안 떠날게요. 딱 붙어있어야지 ~", emotion: "love", score: 5 }
                    }
                },
                {
                    text: "천둥 칠 때마다 깜짝 놀라요.. 손 잡아주면 안 무서울 것 같은데 !", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "(말없이 손을 잡아준다)", score: 3, reply: "에- 손 진짜 따뜻하다. 계속 잡고 있어도 돼요 ? 😙" },
                        { label: "겁쟁이네~", score: 0, reply: "아니거든요 ! 그냥 {user} 손이 잡고 싶었던.. 에.. 아무것도 아니에요 !" }
                    ]
                }
                
            ],
            "벚꽃": [
                { text: "꽃구경 다른 사람이랑 가지 마요. 저랑 가기로 했잖아요 ~ 기억나지요 ?", emotion: "default" },
                {
                    text: "내년에도, 내후년에도 벚꽃 필 때.. 제 옆에 있어 주세요 !", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "당연": { text: "약속했어요 ! 도장 꾹 😙 어기면 안 돼요 ~", emotion: "love", score: 3 },
                        "글쎄": { text: "에.. 너무해 ! 저는 계속 기다릴 건데..", emotion: "sad", score: 0 }
                    }
                },
            ]
        }
    },

    jaehee: {
        very_low: {
            "맑음": [
                { text: "안녕하세요! 마을은 좀 적응되셨나요?", emotion: "happy" },
                { text: "날씨 진짜 좋죠? 이런 날엔 빨래도 잘 마르고 기분 너무 좋아요!", emotion: "happy" },
                {
                    text: "농장 일은 안 힘드세요? 제가 가서 좀 도와드릴까요? 힘쓰는 건 자신 있는데! ( •̀ ω •́ )✧", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "도와줘": { text: "진짜요? 와! 언제든 불러만 주세요! 바로 달려갈게요!", emotion: "happy", score: 3 },
                        "괜찮아": { text: "에이~ 너무 무리하지 마요. 쓰러지면 마음 아프잖아요.", emotion: "sad", score: 1 },
                        "방해": { text: "헉.. 제가 방해가 된다니.. 조용히 있을게요.. (시무룩)", emotion: "shock", score: 0 }
                    }
                },
                {
                    text: "(재희가 콧노래를 부르며 걷다가 제 발에 걸려 휘청거린다)", // 선택지 (덜렁거림)
                    emotion: "shock",
                    choices: [
                        { label: "조심해야지!", score: 3, reply: "으아악! ..휴, 살았다. 잡아줘서 고마워요! {user} 아니었으면 코 깨질 뻔했네.. 허허." },
                        { label: "몸개그 해?", score: 0, reply: "아하하! 웃으셨으면 됐죠 뭐!" }
                    ]
                }
            ],
            
            "비": [
                { text: "비가 주룩주룩 오네요.. 그래도 빗소리는 낭만적인 거 같아요!", emotion: "default" }, 
                { text: "우산 있으세요? 혹시 없으시면... 아, 있으시구나! 다행이다! 허허.", emotion: "happy" },
                { text: "으아, 웅덩이 밟았다... 양말 다 젖었네... 찝찝해라...", emotion: "sad" },
                {
                    text: "비 오는 날엔 역시 파전인데.. 혹시 파전 좋아하세요?", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "좋아해": { text: "그쵸! 찌찌뽕! 나중에 같이 먹으러 가요! 제가 쏠게요!", emotion: "happy", score: 3 },
                        "싫어해": { text: "에.. 진짜요? 그럼 김치전은요? 감자전은?", emotion: "shock", score: 0 }
                    }
                },
                {
                    text: "앗.. 우산이 좀 작은가? (어깨가 축축하게 젖어있다)", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "내 우산 같이 쓸래?", score: 3, reply: "오! 대박! 천사세요? 그럼 실례하겠습니다~ ⸜( *ˊᵕˋ* )⸝" },
                        { label: "어깨가 넓네~^^", score: 1, reply: "앗ㅋㅋㅋ 그런 건가?! ㅎㅎ" },
                        { label: "감기 걸리겠다..", score: 0, reply: "괜찮아요! 저 튼튼하거든요! 에취! ..머쓱하네." }
                    ]
                }
            ],
            
            "벚꽃": [
                { text: "우와아! 꽃 진짜 예쁘다! 사진 100장 찍어야 될 거 같어!", emotion: "happy" },
                {
                    text: "꽃구경 갈 때 뭐 챙겨야 될까요? 추천 좀 해주세요!", // 키워드
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "돗자리": { text: "아 맞다! 돗자리! 바닥에 그냥 앉을 뻔했네. 땡큐!", emotion: "happy", score: 1 },
                        "도시락": { text: "오~ 맛있는 거! {user}가 싸주는 거예요? 기대되네~ 허허", emotion: "happy", score: 0 },
                        "재희": { text: "저요? 저를 챙겨가신다고요? ..어? (얼굴이 빨개진다)", emotion: "shy", score: 3 }
                    }
                },
                {
                    text: "사람들이 다 행복해 보여요. 저까지 기분 좋아지네요!", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "나도 재희 기분 좋아지면 기분 좋아", score: 3, reply: "네?! 에.. 갑자기 훅 들어오시네.. 부끄럽게.. (*ﾉωﾉ)" },
                        { label: "난 별로..", score: 0, reply: "에이~ 부정적인 생각은 퉤퉤! 웃어요 웃어! 스마일~" }
                    ]
                }
            ]
        },
        
        low: {
            "맑음": [
                { text: "{user}! 밥 먹었어요? 저는 좀전에 사쿠야가 뭐 줬는데 이름이.. 뭐였드라 쫀덕쿠키? 하여튼 맛있긴 한데! 저한텐 좀 달았어요 허허", emotion: "happy" },
                {
                    text: "오늘 점심 뭐 먹을까요? 메뉴 추천 좀 해주이소~", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "스시": { text: "스시? 음.. 나쁘지 않네요 ⸜( *ˊᵕˋ* )⸝", emotion: "love", score: 1 },
                        "고기": { text: "고기!! 대박!! 역시 {user}는 뭘 좀 아는구만! 가자 가자!", emotion: "happy", score: 3 },
                        "사랑": { text: "오? {user}의 사랑? 그럼 제가 와아아앙 먹어버릴게요! 냠냠!", emotion: "happy", score: 3 }
                    }
                },
                {
                    text: "(주머니를 뒤적거리다) 어? 나 지갑 어디 뒀지? 흘렸나?", // 선택지 (덜렁이)
                    emotion: "shock",
                    choices: [
                        { label: "또 잃어버렸어?", score: 0, reply: "아니.. '또'라뇨! 저번엔 찾았잖아요! ..아마도?" },
                        { label: "같이 찾아줄게", score: 3, reply: "역시 {user}밖에 없다.. 힝.. 감동이에요 ㅠㅠ" }
                    ]
                }
            ],
            
            "비": [
                { text: "비 오니까 몸이 쳐지네예.. {user} 보고 충전해야겠다!", emotion: "happy" },
                { 
                    text: "아까 고민이 있어서 머리가 좀 복잡했는데... 자고 일어나니까 까먹었어요! 뭐였더라?", 
                    emotion: "happy",
                    choices: [
                        { label: "단순해서 좋겠다.", score: 0, reply: "칭찬이죠? 허허!" },
                        { label: "별거 아니었나 보네요.", score: 3, reply: "맞아요! 중요한 거였으면 기억났겠죠? 긍정적으로 생각하려고요!" },
                        { label: "다시 생각해봐요.", score: 0, reply: "으음... 머리 아파요. 그냥 맛있는 거 먹고 잊을래요!" }
                    ]
                },
                {
                    text: "우산 꼭 챙기고 다니세요! 감기 걸리면 제가 어엄청 부담스럽게 업고 병원 뛰어갑니다!", // 선택지 (대구 사투리 훅)
                    emotion: "serious",
                    choices: [
                        { label: "오~ 박력 있는데?", score: 3, reply: "제가 또 한 박력 하죠! {user} 한정으로다가! ( •̀ ω •́ )✧" },
                        { label: "무거워서 못 업을걸?", score: 0, reply: "에이~ 저 힘세거든요? 진짜 한번 업어볼까요? 이리 와요!" }
                    ]
                }
            ],
            
            "벚꽃": [
                { text: "꽃가루가 눈처럼 내리네요. {user} 머리 위에도 앉았다!", emotion: "happy" },
                { text: "꽃잎 떨어지는 속도가 초속 5센티미터래요. 어디서 들었는데.. 맞나? ㅎㅎ", emotion: "default" },
                { text: "꽃잎 잡으려고 했는데 자꾸 도망가네요. 제가 너무 열정적으로 쫓아갔나?", emotion: "happy" },
                { 
                    text: "저기, 머리에 꽃잎 붙었어요. ...떼어드릴까요?", 
                    emotion: "shy",
                    choices: [
                        { label: "응, 고마워.", score: 3, reply: "(조심스럽게 떼어내며) 됐다! 꽃보다 {user} 님이 더 빛나서 꽃이 질투했나 봐요. 허허." },
                        { label: "내가 뗄게.", score: 0, reply: "아, 넵! 거울 보여드릴까요?" },
                        { label: "일부러 붙인 거야.", score: 1, reply: "아! 패션이구나! 죄송해요 제가 패션을 몰라봐서! 근데 잘 어울려요!" }
                    ]
                },
                { text: "{user} 님, 저기 봐요! 강아지가 산책하는데 너무 귀여워요! 나도 강아지 키우고 싶다...", emotion: "happy" }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "{user}!! 안 그래도 만나러 가려고 했는데! 텔레파시 통했나 봐요!", emotion: "happy" },
                { 
                    text: "혹시 쫀덕쿠키 좋아하세요요??", 
                    emotion: "happy",
                    choices: [
                        { label: "쫀덕이 아니라 쫀득이야", score: 1, reply: "헐? 몰랐어요!! 근데 쫀덕이 더 쫀~덕한 느낌이지 않아요? 뭔 말인지 알죠?ㅎㅎ" },
                        { label: "응 좋아해!", score: 3, reply: "짠! 사쿠야네 빵집 갔다가 하나 남았길래 사봤어요. 드세요!" },
                        { label: "별로 안 좋아해", score: 0, reply: "아! 그렇구나! 저도 사실 달아서 제 취향은 아니에요ㅋㅋ" }
                    ]
                },
                {
                    text: "(발이 꼬여서 넘어질 뻔한다) 으악! ..어? 안 넘어졌네?", // 선택지 (유저가 잡아줌)
                    emotion: "shock",
                    choices: [
                        { label: "내가 잡았으니까!", score: 3, reply: "와.. {user} 진짜 든든하다. 평생 저 잡아주시면 안 돼요? ⸜( *ˊᵕˋ* )⸝" },
                        { label: "정신 차려 똥강아지야", score: 0, reply: "멍! ..아니 제가 왜 똥강아지예요! 그래도 {user}네 강아지면 할래!" }
                    ]
                }

            ],
            
            "비": [
                {
                    text: "비 오니까 센치해지네.. 노래 불러줄게요! 신청곡 있어요?", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "발라드": { text: "오케이! 분위기 잡고 한번 뽑아보겠습니다! 흠흠!", emotion: "happy", score: 1 },
                        "댄스곡": { text: "이 분위기에 댄스요? ㅋㅋㅋ 아 진짜 {user} 웃겨서 좋아!", emotion: "happy", score: 3 }
                    }
                },
                {
                    text: "추우면 제 옷 덮을래요? 냄새 안 날.. 걸요! (킁킁)", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "좋은 냄새 나네", score: 3, reply: "그쵸! 다행이다.. {user} 덮어주려고 아껴 입은 옷이거든요." },
                        { label: "됐거등요", score: 0, reply: "칫.. 튕기기는. 감기 걸려도 전 몰라요! ..그래도 약은 사주겠지만." }
                    ]
                }
            ],
            
            "벚꽃": [
                [
                    { text: "꽃구경 따로 갈 필요 없겠는데요? 여기 꽃이 있는데~?", emotion: "shock" },
                { text: "으악 오글거려! 취소 취소! 죄송해요!", emotion: "shock" }
             ],
                 { 
                    text: "이렇게 좋은 날에 좋은 사람이랑 있으니까 진짜 좋다! 시간이 멈췄으면 좋겠어요.", 
                    emotion: "happy",
                    choices: [
                        { label: "나도 그래.", score: 3, reply: "진짜? 와... 다행이다. 나만 신난 줄 알았네! 우리 더 놀자!" },
                        { label: "시간은 멈추지 않아.", score: -2, reply: "으아, T야? 감성 파괴! 너무하네!" },
                        { label: "사진이나 찍자.", score: 1, reply: "그래! 남는 건 사진뿐이지! 김치~ 치즈~ 쫀덕~" }
                    ]
                },
                { text: "기분 너무 좋다아~ 날아갈 거 같어! 저 좀 잡아주세요!", emotion: "happy" },
                { 
                    text: "소풍 가고 싶다... 김밥 쌀 줄 아세요?", 
                    emotion: "default",
                    choices: [
                        { label: "당연하지! 내가 싸줄게.", score: 3, reply: "진짜요?! 대박! 와아아앙! 저 진짜 기대할 거예요? 약속!" },
                        { label: "요리는 영 꽝이라...", score: 0, reply: "괜찮아요! 사 먹으면 되죠! 편의점 김밥도 맛있잖아요~" },
                        { label: "재희 님이 싸오세요.", score: 0, reply: "제가요? 음... 도전해 볼까요? 계란말이 정도는 할 수 있는데!" }
                    ]
                },
                {
                    text: "저랑 꽃구경 갈래요? 싫으면 시집 오세요! 허허 농담!", // 키워드 (플러팅)
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "시집갈": { text: "네?! 진짜요????", emotion: "love", score: 3 },
                        "꽃구경": { text: "아.. 역시 꽃구경이 낫나? 그래도 같이 가는 거니까 좋다!", emotion: "happy", score: 0 }
                    }
                }
            ]
        },
        
        high: { // 70점 이상
            "맑음": [
                { text: "{user}! 여기서 볼 줄 알았다! 왠지 여기 있을 거 같더라니! 찌찌뽕! ⸜( *ˊᵕˋ* )⸝", emotion: "happy" },
                { text: "{user}! 나랑 달리기 시합할래요? 저기 나무까지! 진 사람이 아이스크림 쏘기!", emotion: "happy" },
                {
                    text: "이번 주말에 뭐 해요? 나랑 옆 마을 놀러 안 갈래요? 맛집 알아놨는데!", // 키워드 (데이트 신청)
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "좋아": { text: "진짜? 오예! 그럼 내가 풀코스로 쏠게요! 몸만 와요 몸만!", emotion: "happy", score: 3 },
                        "바빠": { text: "에.. 섭섭하게.. 그럼 바쁜 거 끝나고 가요! 기다릴 수 있음!", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "(슬쩍 옆으로 와서 어깨를 툭 친다) 심심한데.. 나랑 놀아주라~", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "그래 놀자! 뭐 하고 놀까?", score: 3, reply: "음.. 일단 {user} 얼굴 실컷 보기? 으하하! 농담이고 산책 가요!" },
                        { label: "바빠, 저리 가", score: 0, reply: "힝.. 너무해.. 그럼 옆에서 구경만 할게요. 조용히 있을게요.." }
                    ]
                },
                {
                    text: "아까 길 가다가 네잎클로버 찾았는데.. 주려다가 잃어버렸어요..", // 덜렁이
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "마음만받을게": { text: "진짜요? 천사다 천사.. 다음엔 꼭 코팅해서 가져올게요!", emotion: "happy", score: 3 },
                        "바보야": { text: "반박할 수가 없네.. 저는 왜 이렇게 덜렁거릴까요.. 흑흑.", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "(뒤에서 살금살금 다가와서 왁! 하고 놀래킨다)", // 장난
                    emotion: "happy",
                    choices: [
                        { label: "으악!!!", score: 3, reply: "으하하하!! 반응 대박! 아 웃겨서 배 아파 ㅋㅋㅋ" },
                        { label: "(정색)", score: 0, reply: "어.. 죄송합니다.. 너무 심했나.. 화풀어요 ㅠㅠ" }
                    ]
                }

            ],
            "비": [
                { text: "와! 웅덩이 엄청 크다! {user}, 여기서 점프하면 물 다 튀겠죠?", emotion: "happy" },
                { text: "비 그치면 무지개 뜨겠지? 우리 무지개 보러 가요!  {user}(이)랑 보면 왠지 행운이 올 거 같어.", emotion: "happy" },
                {
                     text: "비 맞으니까 시원하다! 우리 그냥 우산 버리고 축구할래요?", // 활동성
                     emotion: "happy",
                     choices: [
                        { label: "콜! 덤벼!", score: 3, reply: "오!! 역시 내 짝꿍! 옷 버려도 난 모른다! 으하하!" },
                        { label: "감기 걸려", score: 0, reply: "에이~ 약골이네 약골! 난 하나도 안 추운데! 에취!" }
                    ]
                 }
            ],
            
            "벚꽃": [
                { text: "꽃 다 떨어져도 상관없어요. 어차피 난 {user}랑 노는 게 더 재밌으니까!", emotion: "happy" },
                {
                     text: "어? 머리에 애벌레 붙었다!! 움직이지 마요!! 내가 떼줄게!!", // 소란스러움
                     emotion: "shock",
                     type: "keyword",
                     answers: {
                         "꺄악 떼줘": { text: "잠깐만요! ..어라? 그냥 벚꽃 잎이네? 으하하! 속았지!", emotion: "happy", score: 3 },
                         "거짓말이지": { text: "칫.. 안 속네. {user}는 너무 눈치가 빨라서 탈이라니까.", emotion: "default", score: 0 }
                     }
                 },
                { text: "{user}랑 있으면 시간이 너무 빨리 가요... 벌써 해 지네. 아쉽다. 조금만 더 놀다 가까?", emotion: "sad" }
            ]
        }
    },    

ryo: {
        very_low: {
            "맑음": [
                { text: "햇빛이 너무 강해요. 료는 광합성 하는 식물이 아닌데..", emotion: "sad" },
                { text: "저기, 혹시 사쿠야 못 보셨나료? 같이 놀기로 했는데 안 보여서료.", emotion: "default" },
                { text: "아.. 안녕하세료. (꾸벅 인사하고 시선을 피한다)", emotion: "default" },
                { text: "(이어폰을 끼고 무언가에 집중하고 있다. 말 걸기 어려운 분위기다...)", emotion: "default" },
                { 
                    text: "저기, 죄송한데료.. 저 지금 중요한 미션을 깨고 있어서..", 
                    emotion: "shame",
                    choices: [
                        { label: "무슨 게임이야?", score: 0, reply: "동물의 숲이요. 빚 갚아야 해서 노동 중이에료." },
                        { label: "방해해서 미안.", score: 1, reply: "아니에료.. 제가 너무 집중해서.." },
                        { label: "나도 게임 좋아해!", score: 3, reply: "오.. 그렇군료. (다시 게임에 집중한다)" }
                    ]
                },
                {
                        text: "저기, 혹시 파충류.. 어떻게 생각하세요?", // 키워드 (취향 탐색)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "별로 안 좋아해": { text: "아.. 역시. 존중해료.", emotion: "default", score: 0 },
                            "좋아해": { text: "에?! 진짜료? 도마뱀도? 뱀도?!", emotion: "shock", score: 5 },
                            "관심없어": { text: "음.. 혐오하는 것보단 낫네요. 다행이다.", emotion: "default", score: 3 }
                        }
                    }
            ],
            
            "비": [
                {
                        text: "저어기... 혹시 우산 있으세요? 료는 까먹고 안 들고 왔는데..", // 키워드
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "같이쓰자": { text: "음.. 괜찮아료. 어깨 젖는 거 싫어서. 그냥 비 그치면 갈게료.", emotion: "default", score: 0 },
                            "빌려줄게": { text: "오.. 꽤괜? 그럼 감사히 쓸게료. 다음에 돌려드릴게료.", emotion: "happy", score: 3 }
                        }
                    },
                {
                        text: "바닥에 달팽이 기어 가네요. 밟지 않게 조심하세료.", // 선택지 (관찰)
                        emotion: "default",
                        choices: [
                            { label: "으악 징그러!", score: 0, reply: "에? 생태계의 소중한 분해자인데.. 너무해료." },
                            { label: "응 피해서 가고 있어", score: 3, reply: "오.. 생명을 존중하는 자세 아주 좋아료." }
                        ]
                    }
            ],
            
            "벚꽃": [
                   ]
        },
        
        low: {
            "맑음": [
                { text: "아까 사쿠야한테 같이 놀자고 했는데 도망갔어료..", emotion: "sad" },
                { 
                    text: "이거 봐료. 방금 잡은 곤충인데.. 꽤 귀엽지 않나료?", 
                    emotion: "happy",
                    choices: [
                        { label: "으악, 징그러!", score: -2, reply: "에..? 귀여운데.. 자세히 보면 눈이 초롱초롱해료." },
                        { label: "오, 신기하게 생겼다.", score: 3, reply: "그쵸? 다리가 영롱한 색이에료. 완내스!" },
                        { label: "료가 더 귀여워.", score: 5, reply: "에..? 갑자기료? 료는 곤충이 아닌데료.. //" }
                    ]
                },
                { 
                    text: "농장 일은 할 만하세료? 저는 체력이 없어서 못 할 것 같아료.", 
                    emotion: "sad",
                    type: "keyword", 
                    answers: {
                        "힘들어": { text: "역시.. 세상에 쉬운 일은 없네료. 힘내세료.", emotion: "default", score: 0 },
                        "재밌어": { text: "오.. 꽤 긍정적이시네료. 꽤괜!", emotion: "happy", score: 3 },
                        "도와줘": { text: "에? 료가료? 음.. 마음으로 응원할게료. 야하항~", emotion: "happy", score: 0 }
                    }
                },
                {
                        text: "혹시 우주 좋아해료? 료는  우주비행사가 꿈인데.", // 키워드
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "좋아": { text: "진짜? 통했네료! 우주는 낭만적이잖아료. 끝이 없다는 게..", emotion: "happy", score: 3 },
                            "무서": { text: "그쵸. 미지의 세계니까. 그게 매력인데.. 아쉽네료.", emotion: "default", score: 1 },
                            "인터스텔라": { text: "오! 그 영화 봤어료? 료는 그거 보면서 5번 울었어료..", emotion: "happy", score: 3 }
                        }
                    },
                {
                        text: "야하~ 날씨 좋네료. 이런 날은 다큐멘터리 보기 딱인데.", // 선택지
                        emotion: "happy",
                        choices: [
                            { label: "나가서 안 놀고?", score: 0, reply: "집에서 에어컨 틀고 코끼리 다큐 보는 게 최고의 피서에료." },
                            { label: "무슨 다큐?", score: 1, reply: "동물의 왕국이요. 약육강식의 세계.. 꽤괜이에료." }
                        ]
                    }
            ],
            
            "비": [
                { text: "비 냄새 킁킁.. 뭔가 쇠 냄새 같기도 하고.. 우주 냄새가 이럴까료?", emotion: "default" },
                { text: "비 오는 날은 파충류들이 활동하기 좋대료. 혹시 보셨어료?", emotion: "happy" },
                {
                        text: "혹시 무슨 동물 제일 좋아해요?", // 키워드
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "고양이": { text: "고양이도 귀엽긴 하죠. 리쿠 형 같아서.", emotion: "happy", score: 0 },
                            "강아지": { text: "강아지도 귀엽긴 하죠. 재희 형 같아서.", emotion: "happy", score: 0 },
                            "코끼리": { text: "에, 진짜요?! 코끼리가 제일 좋다는 사람 처음이에요! 료도 동물 중에 코끼리가 제일 좋은데! 코끼리는 가족애도 깊고 똑똑하대료. 멋있지 않아료?", emotion: "happy", score: 3 }
                        }
                    },
                {
                        text: "장화 신고 왔어료? 료는 운동화 신고 와서 양말 다 젖었어료.. 축축해.", // 선택지
                        emotion: "sad",
                        choices: [
                            { label: "어부바 해줄까?", score: 3, reply: "에? 됐어료. 제가 애기도 아니고. ..근데 좀 편하긴 하겠다." },
                            { label: "맨발로 다녀", score: 0, reply: "에.. 그건 싫어료." }
                        ]
                    }
            ],
            
            "벚꽃": [
                {
                        text: "사진 찍어드릴까료? 료 사진 잘 찍는데. 구도 완벽하게.", // 키워드
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "부탁해": { text: "맡겨만 주세요. 다리 길어 보이게 찍어드릴게료. 꽤괜?", emotion: "happy", score: 0 },
                            "같이찍자": { text: "음.. 료는 셀카 별론데.. 그래도 기념이니까 한 장만?", emotion: "shy", score: 3 }
                        }
                    },
                {
                        text: "사쿠야한테 숲에 꽃구경 가자고 했는데 바쁘대요..", // 선택지
                        emotion: "sad",
                        choices: [
                            { label: "나랑 놀자", score: 3, reply: "야하~ 좋아료! {user}는 착하네료. 사쿠야보다 낫다." },
                            { label: "한 번 튕겨본 거 아냐? 다시 가봐", score: 0, reply: "싫어료. 여기서 {user}랑 쉴래료." }
                        ]
                    }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "야하항~ {user} 왔다! 료가 기다리고 있었어료!", emotion: "happy" },
                { 
                    text: "저 오늘 사쿠야랑 놀기로 했는데 같이 놀래요? 셋이 놀면 더 재밌을 거 같은데.", 
                    emotion: "happy",
                    choices: [
                        { label: "오! 좋아! 뭐 하고 놀 거야?", score: 3, reply: "그냥.. 숨바꼭질? 료가 술래 할게료!" },
                        { label: "사쿠야가 싫어하지 않을까?", score: 0, reply: "음.. 그럴 수도 있겠지만.. 료가 밀어붙이면 돼료! 으하항!" },
                        { label: "난 바빠서 패스.", score: -5, reply: "칫.. 알겠어료. 우리끼리 재밌게 놀아야지 뭐." }
                    ]
                },
                { text: "{user}! 오늘 기분 좋아 보이네료? 그럼 료도 기분 좋아료!", emotion: "happy" },
                {
                        text: "이거 봐료. 블롭피쉬 인형이에료. 귀엽죠? 만져볼래료?", // 선택지 (취향 공유)
                        emotion: "happy",
                        choices: [
                            { label: "으악 못생겼어", score: 0, reply: "에?! 취소해료! 세상에서 제일 억울하고 귀여운 표정인데!" },
                            { label: "말랑하다", score: 3, reply: "그쵸? 촉감 완내스(완전 내 스타일)에료. 힐링템이에료." }
                        ]
                    }
            ],
            
            "비": [
                {
                        text: "저기, 빗물 고인 웅덩이 봤어료? 거꾸로 된 세상이 보여료.", // 키워드
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "낭만": { text: "야하~ 료랑 코드가 맞네료. {user}도 꽤 감성적인가 봐료.", emotion: "happy", score: 3 },
                            "흙탕물": { text: "으음.. 너무 T 아니에료? 료보다 더해..", emotion: "sad", score: 0 }
                        }
                    },
                { text: "비 와서 나가기 싫었는데.. {user} 보려고 나왔어료. 칭찬해 주세료!", emotion: "shy" }
            ],
            
            "벚꽃": [
                {
                        text: "만약에 온 세상이 핑크색이면 어떨까료? 우주도 핑크색이고. 사쿠야는 이런 거 물어보면 반응 안 해줘요. {user}는 어때료?", // 키워드
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "재밌는데?": { text: "진짜료? 야하항! 역시 {user}랑 대화하면 즐거워료.", emotion: "love", score: 3 },
                            "쓸데없긴해": { text: "치.. {user}도 사쿠야랑 똑같네료. 재미없어.", emotion: "sad", score: 0 }
                        }
                },
                {
                        text: "이 꽃잎 {user} 닮았어료.", // 선택지 (츤데레 칭찬)
                        emotion: "shy",
                        choices: [
                            { label: "고마워", score: 0, reply: "들고 있어 봐요. 사진 찍어줄게요!" },
                            { label: "료가 더 예뻐", score: 3, reply: "에?! 예, 예쁘다고는 안 했는데에..." }
                        ]
                    }
            
            ]
        },
        
        high: { // 70점 이상
            "맑음": [
                { text: "야하~ {user}! 료가 엄청난 거 발견했어료! 이리 와봐료!", emotion: "happy" },
                {
                    text: "아까 사쿠야한테 장수풍뎅이 보여줬는데 도망갔어료.. 귀여운대..",
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "잘못": { text: "에? 왜료? 귀여운 건 공유해야 되는 건데.. 사쿠야는 바보야.", emotion: "sad", score: 0 },
                        "내가봐줄게": { text: "진짜료?! 역시 {user}는 완내스! 자, 여기료! (손바닥을 펼친다)", emotion: "happy", score: 3 }
                    }
                },
                { 
                    text: "있잖아요, 료는 {user} 님이랑 있으면 텐션이 올라가료. 사쿠야랑 있을 때랑은 좀 다른 느낌?", 
                    emotion: "happy",
                    choices: [
                        { label: "어떤 느낌인데?", score: 1, reply: "음.. 더 편안하다고 해야 하나? 사쿠야는 내가 챙겨줘야 할 거 같은데 {user} 님은 절 챙겨주니까료." },
                        { label: "내가 더 좋다는 거지?", score: 3, reply: "야하항! 뭐.. 부정은 안 할게료. 비밀이에료!" },
                        { label: "사쿠야한테 이른다?", score: 0, reply: "아 쫌! 이르지 마세료! 사쿠야 삐진단 말이에료!" }
                    ]
                },
            ],
            "비": [
                { text: "비 냄새 킁킁.. 뭔가 쇠 냄새 같기도 하고.. 우주 냄새가 이럴까료?", emotion: "default" },
                {
                     text: "(웅덩이를 쪼그려 앉아 보고 있다) 여기 웅덩이 속에 또 다른 세상이 있어료. 거꾸로 된 세상.", // 선택지
                     emotion: "default",
                     choices: [
                        { label: "료는 시인이네", score: 3, reply: "에.. 부끄럽게.. 그냥 보이는 대로 말한 건데료. (수줍)" },
                        { label: "물 튄다 일어나", score: 0, reply: "칫.. 감성이 없어료 감성이. 낭만 파괴자.." }
                     ]
                 }
            ],
            
            "벚꽃": [
                { text: "꽃 다 떨어져도 상관없어요. 어차피 난 {user}랑 노는 게 더 재밌으니까!", emotion: "happy" },
                {
                     text: "이거 봐료. 꽃잎이 핑글핑글 돌면서 떨어져료. 여기서 지구가 돌고 있다는 증거예요!", //
                     emotion: "happy",
                     type: "keyword",
                     answers: {
                         "똑똑": { text: "야하~ 료가 좀 잡지식이 많아료. 나중에 다큐 보여드릴게료.", emotion: "happy", score: 3 },
                         "어지러워": { text: "그쵸? 계속 보고 있으면 료도 눈이 핑글핑글 도는 거 같아료 @_@", emotion: "shock", score: 0 }
                     }
                 }
            ]
        }
    },    

    sakuya: {
        very_low: {
            "맑음": [
                { text: "(킁킁) 뭐 타는 냄새 안 나요? 에.. 어디지.", emotion: "default" },
                 { text: "안녕하세요. (가방에 달린 키링들이 짤랑거린다)", emotion: "default" },
                {
                        text: "팔에 있는 머리끈이요? 여동생이 준 거예요. 예쁘죠?", // 선택지 (가족)
                        emotion: "default",
                        choices: [
                            { label: "핑크색 잘 어울려", score: 3, reply: "알아요. 제가 핑크색 좀 잘 받거든요." }, // 자신감
                            { label: "좀 튀는데?", score: 0, reply: "왜요? 예쁘기만 한데. 취존(취향존중) 부탁드려요." }
                        ]
                    }
            ],
            
            "비": [
                { text: "비 오니까 눅눅해서 빵이 잘 안 부풀어요. 예민한 녀석이라니까.", emotion: "serious" },
                {
                        text: "저 민트초코 진짜 싫어하거든요. 치약 맛이잖아요. {user}님은요?", // 키워드 (호불호 확실)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "싫어해": { text: "역시! 맛을 좀 아시네요. 민초는 없어져야 해요.", emotion: "happy", score: 3 },
                            "좋아해": { text: "우와.. 진짜요? 저랑 겸상은 힘들겠네요. 농담이에요.", emotion: "shock", score: 0 }
                        }
                    },
                {
                        text: "아, 매운 냄새.. 누가 떡볶이 만드나 봐요. 코 따가워.", // 선택지 (맵찔이)
                        emotion: "sad",
                        choices: [
                            { label: "매운 거 못 먹어?", score: 3, reply: "못 먹는 게 아니라 안 먹는 거예요. 혀 아프잖아요." },
                            { label: "애기 입맛이네", score: 0, reply: "에-? 맛있는 게 얼마나 많은데 굳이 고통을 즐겨야 해요?" }
                        ]
                    }
            ],
            
            "벚꽃": [
                { text: "세상이 제 물건들처럼 변했네요. 예쁘다.", emotion: "happy" },
                {
                        text: "가방 무거워 보인다고요? 키링 78개밖에 안 달렸는데.", // 키워드 (수집광)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "무겁겠다": { text: "무거워도 포기 못 해요. 다 추억이 담긴 거라.", emotion: "happy", score: 3 },
                            "나도하나줘": { text: "음.. 안 되는데. 이거 한정판이라.. 대신 빵 드릴게요.", emotion: "default", score: 0 }
                        }
                    }
            ]
        },
        
        low: {
            "맑음": [
                {
                        text: "어제 오랜만에 꿈을 꿔서 꿈일기 썼어요.", // 키워드
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "알려": { text: "음.. {user}님이 빵 100개 사가는 꿈? 대박 날 징조인가 봐요.", emotion: "happy", score: 3 },
                            "무슨": { text: "음.. {user}님이 빵 100개 사가는 꿈? 대박 날 징조인가 봐요.", emotion: "happy", score: 3 },
                            "궁금": { text: "음.. {user}님이 빵 100개 사가는 꿈? 대박 날 징조인가 봐요.", emotion: "happy", score: 3 },
                            "악몽": { text: "아뇨. 저는 무서운 꿈 잘 안 꿔요. 자각몽은 가끔 꾸는데.", emotion: "default", score: 3 }
                        }
                    },
                {
                        text: "혹시 마인크래프트 해요? 저 어제 엔더드래곤 잡았어요.", // 키워드 (게임)
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "나도해": { text: "오! 진짜요? 나중에 멀티 해요!", emotion: "happy", score: 3 },
                            "그게뭐야": { text: "에.. 인생의 절반을 손해 보셨네. 네모난 세상이 얼마나 재밌는데요.", emotion: "default", score: 0 }
                        }
                    },
                {
                        text: "빵 만드는 거 쉬워 보이죠? 이거 다 과학이에요. 온도, 습도, 그리고 정성.", // 선택지 (프로의식)
                        emotion: "serious",
                        choices: [
                            { label: "멋있다 파티시에!", score: 3, reply: "에- 칭찬한다고 공짜 빵은 없어요. ..서비스 하나 정도는 줄 수 있지만." },
                            { label: "하나만 줘", score: 0, reply: "돈 내고 사 드세요. 저희 가게 장사해야죠." }
                        ]
                    }
            ],
            
            "비": [
                { text: "비 냄새 좋다.. 아스팔트 젖은 냄새랑 섞여서 오묘하지 않아요?", emotion: "default" },
                {
                        text: "저 딸기맛 치약 써요. 민트 치약은 너무 매워서.. 이상한가요?", // 키워드 (맵찔이)
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "귀여워": { text: "귀여운 게 아니라 현명한 거죠! 양치 시간이 즐거워야 하니까.", emotion: "happy", score: 3 },
                            "애기네": { text: "아 진짜.. 애기 아니거든요? 입맛이 섬세한 거라고요.", emotion: "serious", score: 3 }
                        }
                    },
                {
                        text: "료가 비 온다고 외계인 타령하던데.. {user}님도 들었어요?", // 선택지 (료 뒷담화?)
                        emotion: "default",
                        choices: [
                            { label: "응 귀엽던데", score: 3, reply: "귀엽긴 하죠. 손이 많이 가서 문제지. 걔는 제가 없으면 안 돼요." }, // 형아미
                            { label: "이상하던데", score: 0, reply: "원래 좀 4차원이에요. 나쁜 애는 아닌데.. 이해해 주세요." }
                        ]
                    }
            ],
            
            "벚꽃": [
                { text: "축제 때 불꽃놀이하면 그 냄새가 좋더라고요.", emotion: "happy" },
                { text: "꽃 예쁘네요. 사진 찍어서 엄마 보내드려야겠다.", emotion: "happy" },
                {
                        text: "바쁜데 아까 료가 꽃구경 가자고 징징대서 빵 하나 물려주고 왔어요. 조용하네.", // 선택지 (료 언급)
                        emotion: "happy",
                        choices: [
                            { label: "료 좀 챙겨줘", score: 3, reply: "에? 제가 얼마나 잘 챙겨주는데요. 가끔 좀 귀찮아서 그렇지." },
                            { label: "잘했어", score: 1, reply: "그쵸? 역시 다루는 법을 안다니까요." }
                        ]
                    }

            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "{user}님, 이거 드세요. 신메뉴 개발 중인데 시식해봐요.", emotion: "happy" },
                { 
                    text: "저기, 혹시 치약 뭐 써요? 저는 딸기맛 쓰는데...", 
                    emotion: "default",
                    choices: [
                        { label: "딸기맛? 애기야?", score: -5, reply: "아니거든요! 민트가 너무 매운 거라고요! 그게 치약이야 파스야..." }, // 민초단 배척
                        { label: "나도 과일향 나는 거 써.", score: 3, reply: "오, 동지다! 역시 과일맛으로 해야 기분이 좋아지죠." },
                        { label: "죽염 치약", score: 0, reply: "오.. 어른이다." }
                    ]
                },
        { text: "료가 자꾸 귀찮게 해요. 아까도 와서 껴안길래 더워서 저리 가라 그랬어요.", emotion: "default" }
                ],
            
            "비": [
                { text: "비 그치면 무지개 뜨려나? 보고 싶은데.", emotion: "default" },
    { text: "비 오니까 머리 가라앉네. ...이상해요? 아니라고 해줘요.", emotion: "shy" },

                {
                        text: "가끔은 아무 생각 없이 멍 때리는 것도 필요해요. {user}님도 너무 바쁘게 살지 마요.", // 키워드 (조언)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "고마워": { text: "별말씀을요. 힘들면 빵 먹으러 와요. 서비스 줄게요.", emotion: "happy", score: 3 },
                            "너나잘해": { text: "에- 걱정해줘도 난리네. 저 삐지면 오래가요.", emotion: "serious", score: 0 }
                        }
                    }
            ],
            
            "벚꽃": [
               { text: "벚꽃 잎으로 빵 만들면 무슨 맛일까요? 색깔은 예쁠 텐데.", emotion: "default" },
            { text: "여기 앉아봐요. 바람도 불고 새소리도 들리고... 좋지 않아요?", emotion: "happy" },
            { text: "료가 자꾸 벚꽃잎 잡겠다고 뛰어다니는데.. 진짜 초딩인가? (말은 그렇게 하면서 웃고 있다)", emotion: "happy" },
                {
                        text: "저기, 저한테 궁금한 거 없어요? 맨날 제가 질문만 하는 거 같아서.", // 키워드
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "이상형": { text: "이상형이요? 음.. 밥 잘 먹고, 향기 좋고, 제 장난 받아주는 사람?", emotion: "happy", score: 3 },
                            "보물": { text: "제 키링들이죠. 건드리면 물어요.", emotion: "happy", score: 3 }
                        }
                    },
                {
                        text: "료가 자꾸 {user}님 찾던데.. 둘이 뭐예요? 수상한데.", // 선택지 (살짝 질투?)
                        emotion: "serious",
                        choices: [
                            { label: "질투해?", score: 3, reply: "하! 참나. 제가요? 그럴 리가요. 그냥 료가 귀찮게 할까 봐 그렇죠." },
                            { label: "그냥 친해", score: 1, reply: "그렇구나.. 뭐, 친하게 지내면 좋죠." }
                        ]
                    }
            ]
        },
        
        high: { // 70점 이상
            "맑음": [
                { text: "이거 받아요. 제가 만든 두쫀쿠.", emotion: "happy" },
                {
                        text: "나중에 저랑 빵지순례 갈래요? 맛있는 집 리스트 쫙 뽑아놨는데.",
                        emotion: "happy",
                        choices: [
                            { label: "좋아! 가자!", score: 3, reply: "오예! 운전은 제가 할게요.. 아, 면허 없지. 버스 타고 가요!" },
                            { label: "살쪄", score: 0, reply: "맛있게 먹으면 0칼로리라던데. 실망이에요." }
                        ]
                    },
                { 
                    text: "자꾸 사람들이 저보고 볼살 빵 같다고 찌르는데... {user} 님도 찔러보고 싶어요?", 
                    emotion: "shy",
                    choices: [
                        { label: "(콕 찌른다) 와 진짜 빵이다!", score: 1, reply: "아! ㅋㅋㅋ 진짜 찌르네. ...뭐, {user} 님이니까 봐줄게요. 특별히." },
                        { label: "아니. 아껴줄 거야.", score: 3, reply: "오... 멘트 좀 치시네요." },
                        { label: "(양손으로 잡고 늘린다)", score: 3, reply: "으아, 아파요! 하지 마요! ㅋㅋㅋ" }
                    ]
                },
            ],
            "비": [
                { text: "비 오니까 손님도 없고.. 저랑 놀아요. 심심해 죽겠어요.", emotion: "default" },
                {
                        text: "(우산을 씌워주며) 왜 비 맞고 계세요. 감기 걸리면 빵 맛 못 느끼잖아요.", // 선택지
                        emotion: "shy",
                        choices: [
                            { label: "걱정해주는거야?", score: 3, reply: "뭐.. 단골손님 관리 차원이죠. 아프지 말라고요." },
                            { label: "너나 잘해", score: 0, reply: "전 튼튼하거든요! 걱정 붙들어 매세요." }
                        ]
                    }
            ],
            "벚꽃": [
                { text: "내년엔 핑크색 머리로 염색해볼까요? 벚꽃이랑 세트로.", emotion: "happy" },
                {
                        text: "저기, 이 키링 가질래요? 제가 아끼는 건데.. {user}님 주머니에 달면 예쁠 거 같아서.", // 키워드 (최고의 선물)
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "진짜": { text: "저한테 소중한 거니까 소중한 사람한테 주는 거예요. 잃어버리면 안 돼요!", emotion: "love", score: 3 },
                            "괜찮아": { text: "아.. 거절은 거절인데. 일단 받아봐요. 제 성의니까.", emotion: "sad", score: 3 }
                        }
                    },
                {
                        text: "료가 자꾸 우리 사이 수상하다고 하던데. 뭐라고 해줄까요?", // 선택지 (돌직구)
                        emotion: "happy",
                        choices: [
                            { label: "비밀이라고 해", score: 3, reply: "오~ 신비주의? 재밌겠네요. 료 약 좀 올려야겠다. (씨익)" },
                            { label: "아무 사이 아니라고 해", score: -5, reply: "에.. 아무 사이 아닌 건 아니지 않아요? 좀 섭섭해요." }
                        ]
                    }
            ]
        }
    }   
};

// ★ 2. 호감도 달성 이벤트 (특정 점수 도달 시 1회 발동)
const affinityEvents = {
    sion: [
        {
            id: "sion_event_30", // 이벤트 고유 ID
            threshold: 30,       // 발동 조건 호감도
            bg: "assets/images/backgrounds/hall.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(마을회관 사무실. 책상 위에 서류가 산더미처럼 쌓여있다.)", emotion: "default" },
                { text: "아... 숫자가 왜 안 맞지... 분명 세 번 검토했는데.", emotion: "happy" },
                { text: "당 떨어져... 머리가 안 돌아가...", emotion: "default" },
                { text: "(다가가자 시온이 화들짝 놀라며 일어난다.)", emotion: "happy" },
                { text: "...아, {user}? 무슨 일로 오셨어요?",
                    choices: [
                        {
                            label: "(쫀득쿠키를 건넨다.)",
                            score: 5, // 호감도 증가
                            // 선택 후 이어지는 대사 (배열로 작성)
                            reply: [
                                { text: "어? 이거... 저 주시는 거예요? 와, 진짜... 센스쟁이", emotion: "happy" },
                                { text: "마침 커피 내리려고 했는데 같이 드실래요? 제가 또 커피는 기가 막히게 타거든요.", emotion: "default" }
                            ]
                        },
                        {
                            label: "일이 많이 힘든가 봐요.",
                            score: 0,
                            reply: [
                                { text: "아... 힘든 건 아닌데 완벽하게 하려고 하니까 일이 자꾸 밀리네요...", emotion: "sad" },
                                { text: "마침 커피 내리려고 했는데 같이 드실래요? 제가 또 커피는 기가 막히게 타거든요.", emotion: "default" }
                            ]
                        },
                        {
                            label: "열심히 하는 모습이 멋있어요. 그래도 쉬엄쉬엄해요.",
                            score: 3,
                            reply: [
                                { text: "...고마워요. 그렇게 말해주니까 힘이 좀 나네요. ", emotion: "sad" },
                                { text: "그럼 말씀대로 오늘은 이만 정리하고 퇴근해야겠어요. ", emotion: "default" },
                                { text: "(시온은 자리에서 일어나 기지개를 켠다. 당신을 보는 눈빛이 전보다 한결 편안해 보인다.)", emotion: "sad" }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            id: "sion_event_50", 
            threshold: 50,      
            bg: "assets/images/backgrounds/square.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(노을이 지기 시작하는 마을 광장 구석. 시온이 벽에다 테니스 공을 던지고 받고 있다.)", emotion: "default" },
                { text: "좋아, 이번엔 코너웍 제대로...", emotion: "happy" },
                { text: "얍!", emotion: "default" },
                { text: "(공이 빗나가서 당신의 발밑으로 굴러온다.)", emotion: "happy" },
                { text: "앗. ...어? {user}?", },
                { text: "아 방금... 못 본 걸로 해주세요. 폼 진짜 엉성했는데...", emotion: "happy" },
                { text: "네? 멋있었다고요? 빈말도 잘하시네요ㅋㅋ", emotion: "default" },
                { text: "...전 야구가 좋아요. 던진 만큼 결과가 나오잖아요.", emotion: "happy" },
                { text: "물론 운도 필요하지만 기본적으론 땀 흘린 만큼 돌아오니까.", emotion: "default" },
                { text: "저도 그런 사람이 되고 싶거든요. 요행 바라지 않고 묵묵히 제 몫을 해내는 사람.",
                    choices: [
                        {
                            label: "이미 그런 사람 같은데요?",
                            score: 0,
                            reply: [
                                { text: "ㅎㅎ아직 멀었어요. 그래도 그렇게 말해주니 힘이 좀 나네요.", emotion: "happy" },
                                { text: "...그거 알아요? 저 원래 낯 진짜 많이 가리는데.", emotion: "happy" },
                                { text: "{user}랑은 벌써 이만큼 편하게 말할 수 있다는 게... 좀 신기해요.", emotion: "happy" }
                            ]
                        },
                        {
                            label: "나랑 캐치볼 한 판 할래요?",
                            score: 5,
                            reply: [
                                { text: "진짜요? 저 꽤 진심으로 던질 건데 받을 수 있겠어요?", emotion: "sad" },
                                { text: "농담이고 ㅎㅎ 살살 할게요. 이리 와요!", emotion: "default" },
                                { text: "(잠시 후, 둘은 나란히 벤치에 앉아 물을 마신다.)", emotion: "default" },
                                { text: "...그거 알아요? 저 원래 낯 진짜 많이 가리는데.", emotion: "happy" },
                                { text: "{user}랑은 벌써 이만큼 편하게 말할 수 있다는 게... 좀 신기해요.", emotion: "happy" }
                            ]
                        },
                        {
                            label: "야구 잘 모르는데 시온 씨가 좋아하니까 관심 가네요.",
                            score: 3,
                            reply: [
                                { text: "진짜요? 나중에 제가 직관 데려가 줄게요. 직접 보면 룰은 금방 배울 수 있을 거예요.", emotion: "sad" },
                                { text: "...그거 알아요? 저 원래 낯 진짜 많이 가리는데.", emotion: "happy" },
                                { text: "{user}랑은 벌써 이만큼 편하게 말할 수 있다는 게... 좀 신기해요.", emotion: "happy" }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            id: "sion_event_70", 
            threshold: 70,       
            bg: "assets/images/backgrounds/hall.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(고소한 원두 향기를 따라와보니 시온이 진지한 표정으로 커피를 내리고 있다.)", emotion: "default" },
                { text: "어, 타이밍 기가 막히네요. 지금 막 추출 끝났는데.", emotion: "happy" },
                { text: "한 잔 드실래요? 산미는 적고 고소한 원두예요. 좋아하실지 모르겠네.", emotion: "default" },
                { text: "(시온이 예쁜 찻잔에 김이 모락모락 나는 커피를 따라 당신 앞에 놓아준다.)", emotion: "happy" },
                { text: "...요즘 그런 생각이 들어요.", emotion: "happy" },
                { text: "매일 반복되는 일상이 좀 지루했거든요.", emotion: "happy" },
                { text: "근데 {user}(이)가 마을에 오고 나서는, 내일은 또 무슨 일이 생길까 기대가 돼요.", emotion: "happy" },
                { text: "어때요? ...맛있어요?", emotion: "happy" },
                { text: "다행이다. 앞으로 커피 마시고 싶으면 언제든 와요.", emotion: "happy" },
                { text: "멀리 나갈 필요 없게 제가 {user} 전용 바리스타 할게요 ㅎㅎ", emotion: "happy" }
            ]
        }
    ],
    
    riku: [
        {
            id: "riku_event_50",
            threshold: 50,
            bg: "assets/images/backgrounds/shop.png",
            script: [
                { text: "누나! 이거 봐바여! 리쿠가 아꼈던 사탕인데 누나 줄게여!", emotion: "happy" },
                { text: "(리쿠의 소중한 사탕을 받았다...)", emotion: "default" }
            ]
        }
    ],
    
    yushi: [
        {
            id: "sion_event_30", // 이벤트 고유 ID
            threshold: 30,       // 발동 조건 호감도
            bg: "assets/images/backgrounds/forest.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(시온이 숲속에서 혼자 무언가를 보고 있다.)", emotion: "default" },
                { text: "아, 농장주님. 오셨군요.", emotion: "happy" },
                { text: "사실 여기서만 보이는 희귀한 꽃을 찾고 있었어요.", emotion: "default" },
                { text: "당신에게 보여주고 싶었거든요.", emotion: "happy" }
            ]
        }
    ],

    jaehee: [
        {
            id: "sion_event_30", // 이벤트 고유 ID
            threshold: 30,       // 발동 조건 호감도
            bg: "assets/images/backgrounds/forest.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(시온이 숲속에서 혼자 무언가를 보고 있다.)", emotion: "default" },
                { text: "아, 농장주님. 오셨군요.", emotion: "happy" },
                { text: "사실 여기서만 보이는 희귀한 꽃을 찾고 있었어요.", emotion: "default" },
                { text: "당신에게 보여주고 싶었거든요.", emotion: "happy" }
            ]
        }
    ],

    ryo: [
        {
            id: "sion_event_30", // 이벤트 고유 ID
            threshold: 30,       // 발동 조건 호감도
            bg: "assets/images/backgrounds/forest.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(시온이 숲속에서 혼자 무언가를 보고 있다.)", emotion: "default" },
                { text: "아, 농장주님. 오셨군요.", emotion: "happy" },
                { text: "사실 여기서만 보이는 희귀한 꽃을 찾고 있었어요.", emotion: "default" },
                { text: "당신에게 보여주고 싶었거든요.", emotion: "happy" }
            ]
        }
    ],

    sakuya: [
        {
            id: "sion_event_30", // 이벤트 고유 ID
            threshold: 30,       // 발동 조건 호감도
            bg: "assets/images/backgrounds/forest.png", // 이벤트 배경 (원하는 이미지 경로)
            script: [
                { text: "(시온이 숲속에서 혼자 무언가를 보고 있다.)", emotion: "default" },
                { text: "아, 농장주님. 오셨군요.", emotion: "happy" },
                { text: "사실 여기서만 보이는 희귀한 꽃을 찾고 있었어요.", emotion: "default" },
                { text: "당신에게 보여주고 싶었거든요.", emotion: "happy" }
            ]
        }
    ]
};

// 3. 장소 및 레시피 데이터
const locations = {
    farm: { name: "농장", bg: "assets/images/backgrounds/farm.png", 
           items: ["수선화", "흙", "딸기", "우유", "무화과", "쓰레기"]
          },
    
    square: { name: "마을 광장", bg: "assets/images/backgrounds/square.png", 
             items: ["흙", { id: "제로콜라", chance: 0.4 }, "젖은 신문지",
                     "에너지 드링크",
                     { id: "외계인 인형", chance: 0.2 },
                     { id: "카메라", days: [1, 3, 5], chance: 0.5 },
                     { id: "별의 책", days: [1, 2, 5], chance: 0.1 },
                    ]
            },
    
    forest: { name: "비밀의 숲", bg: "assets/images/backgrounds/forest.png", 
             items: [{ id: "스타푸르트", chance: 0.4 }, { id: "블루 재즈", chance: 0.4 }, { id: "블롭피쉬", chance: 0.4 }, "깨진 안경",
                     { id: "만년필", days: [2, 3, 5], chance: 0.5 }, "딸기", { id: "도토리", chance: 0.5 }, "흙", ] },
    
    shop: { name: "피에르 상점", bg: "assets/images/backgrounds/shop.png", 
           items: ["설탕", "치즈", "밀가루", "달걀", "젖은 신문지", { id: "책", days: [2, 4, 5], chance: 0.5 }]
          },
    
    hall: { name: "마을 회관", bg: "assets/images/backgrounds/hall.png",
           items: [ "에너지 드링크", "쓰레기",
                   { id: "오마모리", days: [2, 4, 5], chance: 0.5 },
                   "흙", "민들레", "리모컨"] },
    
    saloon: { name: "별빛 주점", bg: "assets/images/backgrounds/saloon.png", 
             items: [{ id: "행운의 점심", chance: 0.2 }, { id: "초코케이크", chance: 0.3 }, "커피", "쓰레기", "푸딩", "치즈볼"] }
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
    "커피": { img: "assets/images/items/Coffee.png", desc: "고소한 원두 향이 난다" }, //ㅎㅇ
    "블루 재즈": { img: "assets/images/items/bluejazz.png", desc: "동그란 모양의 푸른 꽃" }, //ㅎㅇ
    "치즈": { img: "assets/images/items/cheese.png", desc: "꼬릿꼬릿한 냄새가 난다" }, //ㅎㅇ
    "설탕": { img: "assets/images/items/Sugar.png", desc: "혈당 관리 해야하는데..." }, //ㅎㅇ
    "핑크케이크": { img: "assets/images/items/pink_cake.png", desc: "사랑스러운 핑크색 케이크" }, //ㅎㅇ
    "초코케이크": { img: "assets/images/items/chocolate_cake.png", desc: "찐한 초콜릿 냄새가 난다" }, //ㅎㅇ
    "딸기": { img: "assets/images/items/Strawberry.png", desc: "뚜왈기!" }, //ㅎㅇ
    "행운의 점심": { img: "assets/images/items/luckylunch.png", desc: "행운이 올 것 같다!" }, //ㅎㅇ
    "밀가루": { img: "assets/images/items/Flour.png", desc: "제빵의 기본 재료" }, //ㅎㅇ
    "달걀": { img: "assets/images/items/egg.png", desc: "작고 소중한 달걀" }, //ㅎㅇ
    "흙": { img: "assets/images/items/Clay.png", desc: "흙이다" }, //ㅎㅇ
    "책": { img: "assets/images/items/book.png", desc: "정대건의 장편소설 <급류>. 열일곱 살 동갑내기 도담과 해솔의 관계를 통해 첫사랑으로 인한 상처의 극복과 성장을 다룬 작품이다." }, //ㅎㅇ
    "우유": { img: "assets/images/items/Milk.png", desc: "신선한 우유" }, //ㅎㅇ
    "카메라": { img: "assets/images/items/camera.png", desc: "누군가의 카메라" }, //ㅎㅇ
    "제로콜라": { img: "assets/images/items/Cola.png", desc: "혈당 관리를 위한 콜라" }, //ㅎㅇ
    "무화과": { img: "assets/images/items/fig.png", desc: "꽃 없이 열리는 열매라는 뜻을 가져 은화과라고도 불리지만, 실제로는 열매 안의 꽃이 보이지 않을 뿐 꽃이 없는 것은 아니다." }, //ㅎㅇ
    "외계인 인형": { img: "assets/images/items/doll.png", desc: "왹.." }, //ㅎㅇ
    "만년필": { img: "assets/images/items/pen.png", desc: "누군가의 만년필" }, //ㅎㅇ
    "푸딩": { img: "assets/images/items/pudding.png", desc: "카라멜 시럽이 없는 커스터드 푸딩" }, //ㅎㅇ
    "아이스크림": { img: "assets/images/items/Clay.png", desc: "세가지 맛의 아이스크림 콘" }, //ㅎㅇ
    "스타푸르트": { img: "assets/images/items/Ice.png", desc: "별 모양의 과일" }, //ㅎㅇ
    "스타드롭커피": { img: "assets/images/items/stardropcoffee.png", desc: "커피가 상큼할 수 있다니" }, //ㅎㅇ
    "리모컨": { img: "assets/images/items/Remote.png", desc: "음...?" }, //ㅎㅇ
    "꽃다발": { img: "assets/images/items/Bouquet.png", desc: "받으면 행복할 것 같다" }, //ㅎㅇ
    "오마모리": { img: "assets/images/items/omamori.png", desc: "누군가의 오마모리 키링" }, //ㅎㅇ
    "블롭피쉬": { img: "assets/images/items/Blobfish.png", desc: "오우..." }, //ㅎㅇ
    "별의 책": { img: "assets/images/items/Starbook.png", desc: "별들의 이야기가 가득 담긴 책" }, //ㅎㅇ
    "도토리": { img: "assets/images/items/Acorn.png", desc: "다람쥐가 좋아할 것 같다" }, //ㅎㅇ
    "치즈볼": { img: "assets/images/items/chesseball.png", desc: "식기 전에 먹어야 해!" }, //ㅎㅇ
    "쓰레기": { img: "assets/images/items/trash.png", desc: "으..." }, //ㅎㅇ
    "깨진 안경": { img: "assets/images/items/glasses.png", desc: "더이상 쓸 수 없는 안경" }, //ㅎㅇ
    "젖은 신문지": { img: "assets/images/items/news.png", desc: "글자도 번져서 읽을 수 없다" }, //ㅎㅇ
    "헤드폰": { img: "assets/images/items/headphone.png", desc: "누군가의 헤드폰" }, //ㅎㅇ
    "게임기": { img: "assets/images/items/game.png", desc: "누군가의 게임기" }, //ㅎㅇ
    "에너지 드링크": { img: "assets/images/items/energytonic.png", desc: "피로가 싹 가신다" } //ㅎㅇ
};

// --- 5. 엔딩 스크립트 데이터 (순애 6명 + 양다리 1명) ---
const endingScripts = {
    sion: {
        title: "시온과의 따뜻한 티타임",
        image: "assets/images/portraits/sion_default.png",
        text: "어, {user} 아직 안 갔네요? 해 졌는데.\n농장까지 데려다줄게요. 가로등도 별로 없어서 위험해요.\n...저기 혹시 이번 주말에 시간 괜찮으세요?\n얼마 전에 진짜 괜찮은 원두를 구했거든요. 향이 진짜 좋은데...\n제일 먼저 {user}님한테 내려주고 싶어요. ...우리 집 놀러 올래요?\n맛있는 커피랑, 귀여운 소들이랑... 그리고 저도 기다리고 있을게요."
    },
    riku: {
        title: "리쿠의 영원한 단짝",
        image: "assets/images/portraits/riku_default.png",
        text: "누나누나!! 이제 어디 가면 안 대여 알겟져?\n\n리쿠는 누나랑 평생~ 같이 놀 거야!\n약속 도장 꾹!! 헤헤, 사랑해여!!"
    },
    yushi: {
        title: "수줍은 고백",
        image: "assets/images/portraits/yushi_default.png",
        text: "(숲속 깊은 곳, 유우시가 나무 그루터기에 앉아 하늘을 보고 있다.)\n\n어 ? {user} ! 어떻게 알고 왔어요 ? 여기 제 비밀 기지인데 😙\n사실.. 아까부터 {user} 생각을 좀 하고 있었거든요.\n\n저는 원래 혼자 있는 게 제일 편하거든요 ? 누가 옆에 있으면 신경 쓰이고.. 귀찮고.."
    },
    jaehee: {
        title: "든든한 파트너",
        image: "assets/images/portraits/jaehee_default.png",
        text: "허허, 농장주님만큼 저랑 잘 맞는 사람은 처음 봤습니다.\n\n우리 둘이 힘을 합치면 못 할 게 없겠죠.\n앞으로도 잘 부탁합니다, 나의 파트너."
    },
    ryo: {
        title: "최고의 콤비",
        image: "assets/images/portraits/ryo_default.png",
        text: "야하~ 역시 누나가 최고야!\n\n나랑 같이 있으면 심심할 틈 없을걸?\n내가 매일매일 웃게 해 줄게! 진짜루!"
    },
    sakuya: {
        title: "달콤한 빵 냄새",
        image: "assets/images/portraits/sakuya_default.png",
        text: "갓 구운 빵 냄새보다 농장주님이 더 좋은걸요?\n\n매일 아침 맛있는 빵과 함께 당신을 기다릴게요.\n저랑.. 사귀어 주실래요?"
    },
    // 양다리 엔딩 (호감도 높은 사람이 2명 이상일 때)
    cheater: {
        title: "위시듀밸리의 카사노바",
        image: "assets/images/ui/star_icon.png", // 또는 경고 이미지
        text: "시온: 농장주님.. 저한테만 잘해주신 게 아니었나요?\n리쿠: 누나 미워!! 리쿠만 좋아한다구 해짜나!!\n\n모두의 마음을 얻으려다 결국 신뢰를 잃고 말았습니다...\n(Bad Ending?)"
    },
    // 노말 엔딩 (호감도 부족)
    normal: {
        title: "평화로운 귀농 생활",
        image: "assets/images/backgrounds/farm.png",
        text: "7일간의 체험이 끝났습니다.\n특별한 인연은 만들지 못했지만 훌륭한 농장주가 되었습니다.\n\n- The End -"
    }
};

// [신규] 5일차 퀘스트 데이터 (편지 내용 + 요구 아이템 + 보상 대사)
const questScripts = {
    sion: {
        letter: "안녕하세요, 저 시온이에요. 사실 제가 어제 현장 점검을 나갔다가 아끼는 만년필을 잃어버린 것 같아요. 아버지께 선물 받은 거라 저한테는 정말 소중한 물건이거든요. 혹시라도 찾아주신다면 꼭 사례하겠습니다. 다른 사람한테 말하면 관리자가 칠칠맞게 물건이나 잃어버린다고 할까 봐... {user} 한테만 말씀드리는 거예요. 비밀 지켜주실 거죠?",
        item: "만년필",
        success: [
            { text: "...어?! 찾았어요? 와... 진짜 감사합니다.", emotion: "happy" },
            { text: "포기하고 있었는데... 정말 감사합니다. 이거 저한테 진짜 의미 있는 거거든요.", emotion: "happy" },
            { text: "잃어버린 줄 알고 어제 잠도 한숨 못 잤는데...", emotion: "happy" },
            { text: "진짜 은인이네요. 이 은혜는 절대 안 잊을게요.", emotion: "happy" },
            { text: "오늘 저녁에 시간 되면 제가 밥이라도 대접하고 싶은데, 괜찮으세요?", emotion: "happy" },
            { text: "아니면 카페도 좋아요ㅎㅎ {user} 먹고 싶은 거 말해봐요.", emotion: "happy" }
            ]
    },
    
    yushi: {
        letter: "에.. 큰일 났어요.. ㅠ_ㅠ {user}.. 저예요, 유우시.. 지금 제가 너무 슬퍼서 글씨가 좀 삐뚤빼뚤해도 이해해 주세요.. 제가 제일 아끼는 카메라가 없어졌어요 ! 정말 소중한 추억들이 다 들어있는데.. ㅠ_ㅠ 누가 훔쳐간 건 아니겠지요 ? 혹시라도 어딘가에서 카메라를 줍게 된다면 저에게 꼭 ! 가져다주세요.. 사례는 제가 제일 좋아하는 치즈볼로 할게요.. 부탁해요 {user} !",
        item: "카메라",
        success: [
            { text: "에..?! 이거 제 카메라 ! 와 ! 진짜 찾았네요 ?!", emotion: "happy" },
            { text: "소중한 추억들이 사라진 줄 알고 울 뻔했어요..", emotion: "happy" },
            { text: "{user}는 천사예요 ? 고마워요 ! 이 은혜는 절대 안 잊을게요 ^_^", emotion: "happy" },
            { text: "약속대로 제가 맛있는 치즈볼 쏠게요 ! 같이 먹으러 가요 ~", emotion: "happy" }
            ]
    },

    riku: {
        letter: "{user} 님.. 저 리쿠예여.. 지금 넘 우울해여 ㅠㅠ 제 헤드폰이 없어졌어여... 그거 없으면 노래도 못 듣고 세상이 넘 시끄러운데 ㅠㅠ 어디다 둿는지 기억이 안 나여.. 혹시 제 헤드폰 보시면 주워주세여... 사례는 섭섭하지 않게 할게여.. 리쿠의 평화를 지켜주세여.. ㅠㅠ",
        item: "헤드폰",
        success: [
            { text: "헐... 이거 제 헤드폰이자나여! 어디서 찾앗어여?", emotion: "happy" },
            { text: "와 대박! {user} 완전 짱! 리쿠 감동받앗어여 ㅠㅠ", emotion: "happy" },
            { text: "노래도 못 듣고 넘 심심햇는데... 다행이다", emotion: "happy" },
            { text: "이제 다시 음악의 세계로 갈 수 잇겟네여. {user} 덕분이에여 😙", emotion: "happy" },
            { text: "고마우니까 내일 리쿠랑 데이트하게 해줄게여!", emotion: "happy" },
            { text: "소중한 쉬는 날인데 특별히 {user}랑 보내주는 거예여", emotion: "happy" },
            { text: "에? 당연히 거부권은 없어영", emotion: "happy" }
            ]
    },

    jaehee: {
        letter: "{user}!! 큰일 났다!! 내 좀 도와주라!! ㅠㅠ 책 잃어버렸어... <급류>라는 소설책인데... 선물 받은 거라 진짜 소중한 거거든? 근데 내가 아직 작가의 말밖에 못 읽었단 말이야... ㅠㅠ 표지는 파란색이고 혹시 농장 근처나 마을에서 보면 꼭 좀 챙겨주라! 내가 맛있는 거 다 사줄게!! 제발!",
        item: "책",
        success: [
            { text: "으아아!! 찾았어?! 진짜?! 대박!!", emotion: "happy" },
            { text: "책도 멀쩡하네 다행이다... 와... 내 진짜 {user}밖에 없다!", emotion: "happy" },
            { text: "책 다 읽으면 제일 먼저 빌려줄게! 감상평 나누자!", emotion: "happy" },
            { text: "암튼 진짜 고맙데이~ 맛있는 거 먹으러 가까? 뭐 먹고 싶은 거 있나?", emotion: "happy" }
            ]
    },

    ryo: {
        letter: "안녕하세요 {user} .. 료예요.. 저 지금 인생 최대의 위기예요. 제 닌텐도를 잃어버렸어요... ㅠㅠ 그 안에 열심히 지은 집이랑.. 열심히 모은 돈이랑.. 열심히 데려온 주민들이랑.. 다 들어있는데.. 잃어버리면 료는 끝이에요.. 혹시 빨간색 닌텐도 보시면 꼭 좀 찾아주세요.. 부탁드릴게요 ㅠㅠ 사례는 료가 아끼는 걸로 드릴게료..",
        item: "게임기",
        success: [
            { text: "와아! 제 닌텐도! 진짜 감사해료 ㅠㅠ", emotion: "happy" },
            { text: "세이브 파일 무사하겠죠? 켜봐야지..", emotion: "happy" },
            { text: "야하항~! 다 그대로다! {user}는 료의 영웅이에요!", emotion: "happy" },
            { text: "나중에 제 마을 놀러오세요. {user}를 위한 집도 지어놓을게요. 진짜! ", emotion: "happy" }
            ]
    },

    sakuya: {
        letter: "{user}, 저 사쿠야예요. 바쁘신데 죄송해요. 근데 이건 진짜 비상사태라... 제 가방에 달려있던 오마모리 키링 못 보셨나요? 키링 중에 제일 아끼는 건데... 혹시라도 보신다면 저한테 바로 연락 주세요. 빵 100개라도 만들어드릴 테니까... 부탁드립니다.",
        item: "오마모리",
        success: [
            { text: "에에! 진짜 찾았어요?", emotion: "happy" },
            { text: "하... 다행이다. 진짜 십년감수했네. 이거 료가 준 거라서요.", emotion: "happy" },
            { text: "덕분에 추억을 지켰어요. 고마우니까 오늘 빵집 무제한 이용권 줄게요.", emotion: "happy" },
            { text: "원하는 거 다 골라요. 크루아상? 소금빵? 메론빵?", emotion: "happy" },
            { text: "에? 사쿠빵이라니요. 안 팔아요.", emotion: "happy" },
            { text: "원하면 매일 볼 수 있잖아요. 계속 함께 있을 거니까.", emotion: "happy" }
            ]
    }
};

/* ==========================================================================
   [추가] 이미지 업로드 및 Cropper.js 처리 로직
   ========================================================================== */

let currentCropper = null;
let currentMemberId = null;

// HTML이 모두 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 모달 관련 요소 가져오기 (index.html에 이 ID들이 있어야 함)
    const modal = document.getElementById('crop-modal');
    const imageToCrop = document.getElementById('image-to-crop');
    const btnCrop = document.getElementById('btn-crop');
    const btnCancel = document.getElementById('btn-cancel');

    // NPC 목록을 순회하며 이벤트 연결
    const members = Object.keys(npcs); // ['sion', 'riku', 'yushi', ...]

    members.forEach(member => {
        const input = document.getElementById(`upload-${member}`);
        
        if (input) {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        // 1. 현재 어떤 멤버를 수정 중인지 저장
                        currentMemberId = member; 
                        
                        // 2. 모달에 이미지 띄우기
                        imageToCrop.src = event.target.result;
                        if(modal) modal.style.display = 'flex';

                        // 3. 기존 크로퍼 초기화
                        if (currentCropper) {
                            currentCropper.destroy();
                        }

                        // 4. 새 크로퍼 생성 (1:1 비율 강제)
                        currentCropper = new Cropper(imageToCrop, {
                            aspectRatio: 1, 
                            viewMode: 1,
                            minContainerWidth: 300,
                            minContainerHeight: 300
                        });
                    };
                    reader.readAsDataURL(file);
                }
                // 같은 파일 다시 선택 가능하게 초기화
                e.target.value = ''; 
            });
        }
    });

    // [자르기 & 저장 버튼 클릭 시]
    if (btnCrop) {
        btnCrop.addEventListener('click', function() {
            if (currentCropper && currentMemberId) {
                // 자른 이미지를 Base64 데이터로 변환
                const croppedCanvas = currentCropper.getCroppedCanvas({
                    width: 200, // 게임 내 표시될 크기
                    height: 200
                });
                const croppedImage = croppedCanvas.toDataURL();

                // 1) 미리보기 이미지 업데이트
                const preview = document.getElementById(`preview-${currentMemberId}`);
                if (preview) preview.src = croppedImage;

                // 2) 게임 데이터(npcs) 업데이트 ★핵심★
                if (npcs[currentMemberId]) {
                    npcs[currentMemberId].portrait = croppedImage;
                    console.log(`${currentMemberId}의 초상화가 변경되었습니다.`);
                }

                // 3) 정리
                modal.style.display = 'none';
                currentCropper.destroy();
                currentCropper = null;
            }
        });
    }

    // [취소 버튼 클릭 시]
    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            if(modal) modal.style.display = 'none';
            if (currentCropper) {
                currentCropper.destroy();
                currentCropper = null;
            }
        });
    }
});

