// 1. NPC 데이터
const npcs = {
    sion: {
        name: "시온",
        sprite: "assets/images/sprites/sion.png",
        portrait: "assets/images/portraits/sion_default.png",
        gifts: {
            love: ["커피", "에너지 드링크", "설탕", "회"],
            hate: ["블롭피쉬"]
        },
        giftReactions: {
            love: { text: "와... 이거 제가 제일 좋아하는 건데. 어떻게 아셨어요? 진짜 감동이다. 고마워요.", emotion: "default" },
            hate: { text: "마음은 고맙지만... 이건 좀 처치하기 곤란하네요.", emotion: "default" },
            default: { text: "오, 선물인가요? 고맙습니다.", emotion: "default" }
        },
        unknownReaction: { text: "음... 무슨 말씀이신지 잘 모르겠네요.", emotion: "default" },
        locations: { sunny: "hall", rainy: "hall", blossom: "forest" },
        // ★ [추가] 장소별 좌표 설정 (top: 위에서 거리, left: 왼쪽에서 거리)
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
            love: ["도토리", "초코케이크", "아이스크림"],
            hate: ["흙"]
        },
        giftReactions: {
            love: { text: "{user}(은)는 리쿠를 잘 아는구낭? 고마워영!", emotion: "happy" },
            hate: { text: "왜 리쿠한테 이런 거 줬어여? 리쿠 이거 싫어하는 거 몰랏어여? 속상해여 ㅠㅠ", emotion: "serious" },
            default: { text: "와아, 리쿠 넘 행복해영!", emotion: "default" }
        },
        locations: { sunny: "shop", rainy: "saloon", blossom: "shop" },
        // ★ [추가] 장소별 좌표 설정 (top: 위에서 거리, left: 왼쪽에서 거리)
        positions: {
            shop: { top: "75%", left: "24%" },
            saloon: { top: "80%", left: "16%" }
        }
    },
    yushi: {
        name: "유우시",
        sprite: "assets/images/sprites/yushi.png",
        portrait: "assets/images/portraits/yushi_default.png",
        gifts: { // gifts 속성 추가 (코드 일관성을 위해 임의 추가함, 필요시 수정)
             love: ["스타푸르트", "블루 재즈"],
             hate: ["쓰레기"]
        },
        giftReactions: {
            love: { text: "에 ! 저 주는 거예요 ? 너무 예쁘다 ~ {user} 저 이거 진짜 좋아해요 ! ^_^", emotion: "happy" },
            hate: { text: "에..? 이건.. 너무해요 !", emotion: "serious" },
            default: { text: "고마워요 ! 잘 간직할게요 ^_^ 우리 기분 좋은 추억이 하나 더 생겼네요 ~", emotion: "default" }
        },
        unknownReaction: { text: "에.. 죄송해요. 무슨 말씀이신지 잘 모르겠어요.. ^_^;", emotion: "shock" },
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
            love: ["행운의 점심", "에너지 드링크"],
            hate: ["쓰레기"]
        },
        giftReactions: {
            love: { text: "우와아!! 진짜 대박!! 저 이거 진짜 좋아하는데! 최고예요!!", emotion: "happy" },
            hate: { text: "마음은 고맙지만.. 이건 좀 처치하기 곤란하네요.", emotion: "serious" },
            default: { text: "오..! 와! 대박! 뭔지 모르겠지만 그래도 {user}(이)가 준 거니까 일단 잘 챙겨둘게요! 허허", emotion: "default" }
        },
        unknownReaction: { text: "에.. 죄송해요. 무슨 말씀이신지 잘 모르겠어요.. ^_^;", emotion: "shock" },
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
            love: ["블롭피쉬", "에너지 드링크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "야하항~! 진짜 최고! 이거 완전 희귀한 건데! 고마워료!", emotion: "happy" },
            hate: { text: "오, 센스 대박! 감사해료!", emotion: "serious" },
            default: { text: "선물인가요? 고맙습니다.", emotion: "default" }
        },
        unknownReaction: { text: "에.. 죄송해요. 무슨 말씀이신지 잘 모르겠어요.. ^_^;", emotion: "shock" },
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
            love: ["핑크케이크"],
            hate: ["쓰레기", "잉어"]
        },
        giftReactions: {
            love: { text: "에에! 이거 완전 제 스타일! 센스 짱이네요. 잘 먹을게요!", emotion: "happy" },
            hate: { text: "아... 진짜 죄송한데... 이건 다른 사람 주는 게 어때요?", emotion: "serious" },
            default: { text: "에- 엄청 다정하네요. 이런 걸 다 챙겨주고. 고맙습니다.", emotion: "default" }
        },
        unknownReaction: { text: "에.. 죄송해요. 무슨 말씀이신지 잘 모르겠어요.. ^_^;", emotion: "shock" },
        locations: { sunny: "square", rainy: "saloon", blossom: "forest" }, 
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
            { text: "누나 안녕 ! 새로 이사 왓어여??", emotion: "happy" },
            { 
                text: "저는 리쿠고 상점 알바생이에여 히히 리쿠 봣으니 누나는 운이 좋당!", 
                emotion: "happy",
                choices: [
                    { label: "리쿠 귀엽네", score: 10, reply: "에? 진짜용?? ㅎㅎㅎㅎㅎ" },
                    { label: "자주 놀러올게요!", score: 5, reply: "넹! 누나는 특별히 사과 하나 더 줄게용" }
                ]
            },
        ],
        
        sion: [
            { text: "아, 안녕하세요. 오늘 귀농하신다는 분 맞으시죠?" },
            { 
                text: "저는 마을회관 관리를 맡고 있는 오시온입니다.", 
                emotion: "happy",
                choices: [
                    { label: "마을을 위해 열심히 일하겠습니다! 잘 부탁드려요.", score: 5, reply: "오... 열정이 대단하시네요. 저도 도울 수 있는 건 도울게요." },
                    { label: "네 어쩌다보니...(ㅎㅎ) 잘 부탁드려요!", score: 0, reply: "네, 필요한 거 있으시면 말씀해주세요." },
                    { label: "혹시... 소랑 대화 가능하세요?", score: 5, reply: "...네? 소를 키우기는 하는데 대화는... 음... 시도는 해볼게요." }
                ]
            },
        ],
        
        yushi: [
            { text: "에.. 새로 오신 농장주님이시군요 ?", emotion: "default" },
            { text: "만나서 반가워요 !", emotion: "happy" },
            { 
                text: "숲이 참 조용하고 좋지요 ? ^_^", 
                emotion: "happy",
                choices: [
                    { label: "여기서 뭐하고 계세요?", score: 5, reply: "아무것도 하지 않아요 ! 사람이 없는 곳이 마음이 편해서요 ^_^" },
                    { label: "밤에 별 보면 예쁠 것 같아요", score: 10, reply: "맞아요 ! 종종 밤에 와서 하늘을 보는데 정말 예뻐요 ^_^ 다음에 같이 봐요 ~" }
                ]
            },
        ],

                jaehee: [
            { text: "안녕하세요!! 저는 재희라고 해요!", emotion: "default" },
            { 
                text: "인상이 정말 좋으시네요! ㅎㅎ", 
                emotion: "happy",
                choices: [
                    { label: "노래 한 곡 부탁해요", score: 10, reply: "아무것도 하지 않아요 ! 사람이 없는 곳이 마음이 편해서요 ^_^" },
                    { label: "반가워요 재희님", score: 5, reply: "맞아요 ! 종종 밤에 와서 하늘을 보는데 정말 예뻐요 ^_^ 다음에 같이 봐요 ~" }
                ]
            },
        ],

        ryo: [
            { text: "{ text: "오.. 안녕하세료. 료입니다아.", emotion: "default" },", emotion: "default" },
            { 
                text: "(말똥말똥한 눈으로 바라보기만 한다.)", 
                emotion: "happy",
                choices: [
                    { label: "왜 그렇게 쳐다봐?", score: 10, reply: "앗... 죄송해요. 그냥 처음 보는 분이라 신기해서료.. (눈을 피한다)" },
                    { label: "안녕ㅎㅎ 귀엽게 생겼네", score: 5, reply: "에..? 저, 저요..? 아.. 가, 감사합니다.." }
                ]
            },
        ],

        sakuya: [
            { text: "에- 안녕하세요. 갓 구운 빵 드셔보실래요?", emotion: "default" },
            { 
                text: "아 저는 사쿠야예요. 스타주점 안에 있는 빵집에서 일하고 있어요. 빵 사러 마니 와주세요.", 
                emotion: "happy",
                choices: [
                    { label: "고마워! 잘 먹을게", score: 5, reply: "아무것도 하지 않아요 ! 사람이 없는 곳이 마음이 편해서요 ^_^" },
                    { label: "사쿠빵쨩ㅎㅎ", score: 10, reply: "맞아요 ! 종종 밤에 와서 하늘을 보는데 정말 예뻐요 ^_^ 다음에 같이 봐요 ~" }
                ]
            },
        ] 
    },
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
                { text: "(서류에 코를 박고 있다) 잠시만요. 이것만 처리하고요.", emotion: "default" },
                {
                    text: "지금 작성해야 하는 서류가 뭔지 아세요?", 
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "전입신고": { text: "오, 잘 아시네요. 저기 함에 넣어주세요.", emotion: "default", score: 5 },
                        "신고서": { text: "오, 잘 아시네요. 저기 함에 넣어주세요.", emotion: "default", score: 5 },
                        "몰라": { text: "음... 전입신고서입니다. 저기 있어요.", emotion: "default", score: 0 },
                        "뭐": { text: "음... 전입신고서입니다. 저기 있어요.", emotion: "default", score: 0 },
                        "모르겠": { text: "음... 전입신고서입니다. 저기 있어요.", emotion: "default", score: 0 }
                    }
                }
            ],
            "비": [
                { text: "비가 오네요.", emotion: "default" },
                { 
                text: "혹시 우산 색깔 뭐예요? 입구에 꽂아두신 거.", 
                emotion: "happy",
                choices: [
                    { label: "핑크", score: 3, reply: "아ㅋㅋ 우산 귀엽네요. 사쿠야 건 줄 알았어요." },
                    { label: "투명", score: 5, reply: "역시 투명이 앞이 잘 보여서 좋죠. 실용적이네요." },
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
                    text: "저 나무 이름이 뭔지 아세요? 제가 제일 좋아하는 나무인데.",
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "벚": { text: "네, 벚나무요. 봄에만 볼 수 있는 게 좀 아쉽죠.", emotion: "happy", score: 5 },
                        "사과": { text: "음? 저건 벚나무예요.", emotion: "default", score: 0 }
                    }
                },
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
                        "커피": { text: "진짜요? 수확하면 저한테 좀 팔아주실 수 있나요?", emotion: "love", score: 5 },
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
                    { label: "네! 누가 쓴 건지 아주 완벽하던데요?", score: 5, reply: "아... 알아봐 주시니 감사하네요. 열심히 썼거든요." }
                ]
            },
                { 
                text: "농장 일은 처음이라 부족한 게 많을 텐데, 혹시 지금 가장 필요한 게 뭐예요?", 
                emotion: "shy",
                type: "keyword", // ★ 여기가 핵심! 키워드 입력 타입 지정
                answers: {
                    "선배님": { text: "ㅋㅋ저도 전문가는 아니지만... 팁 정도는 알려드릴 수 있어요.", emotion: "happy", score: 10 },
                    "도움": { text: "ㅋㅋ저도 전문가는 아니지만... 팁 정도는 알려드릴 수 있어요.", emotion: "happy", score: 10 },
                    "가르침": { text: "ㅋㅋ저도 전문가는 아니지만... 팁 정도는 알려드릴 수 있어요.", emotion: "happy", score: 10 }
                }
            }
                
            ],
            
            "비": [
                { text: "비가 오니 마을이 조용하네요. 빗소리 들으면서 업무 보는 것도 좋아요.", emotion: "default" },
                {
                    text: "주로 어떤 장르의 노래 들으세요?",
                    emotion: "default",
                    type: "keyword",
                    answers: {
                        "힙합": { text: "오! 진짜요? 저도요. 혹시 괜찮으면 플레이리스트 공유할래요? R&B도 좋아하세요?", emotion: "happy", score: 5 },
                        "클래식": { text: "차분해지고 좋죠. 집중 잘 될 것 같아요.", emotion: "default", score: 3 },
                        "동요": { text: "동요요? ㅋㅋㅋ 귀여우시네요. 의외로 힐링 될지도...", emotion: "happy", score: 5 }
                    }
                },
                { text: "우산 쓰고 다니세요. 감기 걸리면 본인만 손해니까요.", emotion: "default" },
                { 
                text: "비 오는 날은 습기 때문에 책 관리가 까다로워요. 제습기라도 하나 더 놔야 하나...", 
                emotion: "happy",
                choices: [
                    { label: "제가 좀 도와드릴까요?", score: 5, reply: "어... 괜찮으시겠어요? 감사합니다. 다음에 커피라도 한 잔 살게요." },
                    { label: "에궁ㅠㅠ 수고가 많으시네요!", score: 0, reply: "뭘요. 제 일이니까 열심히 해야죠." }
                ]
            },
                { 
                text: "비가 계속 오니까 따뜻한 게 마시고 싶네요.", 
                emotion: "happy",
                choices: [
                    { label: "저도요. 아메리카노 먹고 싶어요!", score: 5, reply: "오, 저도 아메리카노 생각하고 있었어요. 커피 좋아하시는구나." },
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
                    text: "소풍 가고 싶네요. 물론 상상만 하는 거지만... 만약에 도시락 싼다면 뭐 넣고 싶어요?", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "콩국수": { text: "오! 설탕파세요 소금파세요? 안 맞으면 같이 소풍 못 가는데ㅋㅋ", emotion: "happy", score: 3 },
                        "김치볶음밥": { text: "저 김치볶음밥 좋아해요. 잘 만드세요? ㅎㅎ", emotion: "love", score: 3 },
                        "케이크": { text: "좋죠. 사실 저 밥 대신 디저트만 먹어도 돼요ㅎㅎ", emotion: "happy", score: 3 },
                        "디저트": { text: "좋죠. 사실 저 밥 대신 디저트만 먹어도 돼요ㅎㅎ", emotion: "happy", score: 3 },
                        "두쫀쿠": { text: "어? 두쫑쿠? 어디서 사오게요? 혹시 만들 줄 아세요? 우와...", emotion: "happy", score: 5 },
                        "빵": { text: "좋죠. 사실 저 밥 대신 디저트만 먹어도 돼요ㅎㅎ", emotion: "happy", score: 3 }
                    }
                },
                { 
                text: "(떨어지는 벚꽃잎을 잡으려다 놓친다) 아... 쉽지 않네요.", 
                emotion: "happy",
                choices: [
                    { label: "무슨 소원 비시려고요?ㅎㅎ", score: 3, reply: "음... 더 나은 사람이 되게 해달라고요." },
                    { label: "아 그거 그렇게 하는 거 아닌데", score: 0, reply: "네? 그럼 뭐 어떻게 해야하죠..." },
                    { label: "(벚꽃잎을 하나 잡아 건넨다.)", score: 5, reply: "어... 저 주시는 거예요? 감사합니다. {user} 님도 같이 소원 빌어요." }
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
                        "누나": { text: "누... 누나요? 음... 노력은 해볼게요. 어... 누...나.", emotion: "shy", score: 10 },
                        "자기": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "여보": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "허니": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "애기": { text: ".......네? 잘못 말씀하신 거죠? 꿈인가... (어째서인지 귀끝이 붉다)", emotion: "shy", score: 3 },
                        "공주": { text: "ㅋㅋㅋ 불러드릴 수는 있는데 감당 가능하세요? 공주님?", emotion: "shy", score: 7 },
                        "이름": { text: "역시 이름이 제일 무난하죠. 그럼 {user}(이)라고 부를게요.", emotion: "happy", score: 0 }
                    }
                },
                { 
                text: "오늘따라 일이 손에 안 잡히네요. 자꾸 딴생각이 들어서.", 
                emotion: "happy",
                choices: [
                    { label: "무슨 생각 하는데요?", score: 3, reply: "음... 그냥 맛있는 거 먹고 싶다는 생각? 퀸아망에 아아라던가." },
                    { label: "어허. 집중력 부족.", score: 0, reply: "으... 팩트폭력 너무 아픈데요." },
                    { label: "그런 날은 그냥 푹 쉬거나 노는 것도 방법이에요!", score: 5, reply: "오... 이도저도 아닌 것보단 그게 낫겠네요. 근데 저랑 놀아주실 거예요?" }
                ]
                },
                { 
                text: "저 방금 스타주점 다녀왔는데 뭐 샀게요?", 
                emotion: "shy",
                type: "keyword", // ★ 여기가 핵심! 키워드 입력 타입 지정
                answers: {
                    "아메리카노": { text: "ㅎㅎ맞아요. 한 모금 드실래요?", emotion: "happy", score: 5 },
                    "아아": { text: "ㅎㅎ맞아요. 한 모금 드실래요?", emotion: "happy", score: 5 },
                    "커피": { text: "ㅎㅎ맞아요. 한 모금 드실래요?", emotion: "happy", score: 5 }
                }
                }
            ],
            "비": [
                { text: "...좀 전에 천둥칠 때 제 쪽 안 보셨죠? 못 봤다고 해주세요.", emotion: "happy" },
                { text: "비 오는 날 특유의 차분한 공기가 좋아요. {user}님 목소리도 더 잘 들리고.", emotion: "happy" },
                {
                     text: "공기가 눅눅하네요. 이럴 땐 제습기 틀고 가만히 있는 게 최곤데.", // 현실적인 고민
                     emotion: "default",
                     type: "keyword",
                     answers: {
                         "같이있자": { text: "그럴까요? 문 닫고 조용히 빗소리만 듣죠. 방해 안 받을게요.", emotion: "love", score: 10 },
                         "일해야지": { text: "하하.. 알겠어요. 농땡이 안 피울게요.", emotion: "happy", score: 3 }
                     }
                 }
            ],
            "벚꽃": [
                { text: "옛날엔 여기서 숨바꼭질하고 놀았는데. 저 꽤 잘 숨어요. 찾아볼래요?", emotion: "happy" },
                { text: "어, 머리에 꽃잎 붙었다. ...가만히 있어봐요.", emotion: "happy" },
                {
                    text: "여기 서 있어 봐요. 배경이 예뻐서 사진 찍어 드릴게요.", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "김치~ (브이 한다)", score: 0, reply: "ㅋㅋ자연스럽게 잘 나왔네요. 보내드릴게요." },
                        { label: "시온 씨도 같이 찍어요!", score: 5, reply: "네? 저요? 아... 전 사진 잘 안 찍는데... 그래도 오늘은 벚꽃이 유난히 예쁘니까 한 장 남겨야겠네요." }
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
                    type: "keyword",
                    answers: {
                        "좋아": { text: "다행이다. 맛있는 것도 먹고 와요, 우리.", emotion: "happy", score: 10 },
                        "글쎄": { text: "강요는 안 해요. 그래도... 같이 가면 좋을 것 같아서요.", emotion: "sad", score: 5 }
                    }
                },
                {
                    text: "오늘 일찍 퇴근할 것 같은데... 혹시 저녁에 뭐 하세요?", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "시온 씨랑 놀아야죠!", score: 5, reply: "ㅎㅎ그럴래요? 맛있는 거 먹으러 가요." },
                        { label: "고민 중이에요", score: 0, reply: "고민 중이면... 저랑 저녁 드실래요?" },
                        { label: "졸려서 푸데푸데 잘 거예용", score: 3, reply: "? 네? 푸데푸데... 가 뭔지 모르겠지만...ㅋㅋ 어감이 귀엽네요. 그럼 푹 주무세요." }
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
                }
            ],
            "벚꽃": [
                { text: "여기가 앉아서 책 읽기 딱 좋아요. 지금은 글자가 눈에 들어올지는 모르겠지만...", emotion: "happy" },
                {
                     text: "벚꽃잎 책갈피 하나 만들어 줄까요?",
                     emotion: "default",
                     type: "keyword",
                     answers: {
                         "만들어줘": { text: "기다려봐요. 제일 예쁜 잎으로 골라서... 자, 선물이에요.", emotion: "happy", score: 10 },
                         "괜찮아": { text: "이런 건 취향이 아닌가 보네요. 아쉽다.", emotion: "default", score: 5 }
                     }
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
                        "너랑": { text: "...! 그런 멘트는 어디서 배우시는 거예요...", emotion: "love", score: 15 },
                        "시온": { text: "...! 그런 멘트는 어디서 배우시는 거예요...", emotion: "love", score: 15 }
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
                {
                    text: "농장에 벌레 마나여?", // 키워드
                    emotion: "shock",
                    type: "keyword",
                    answers: {
                        "많아": { text: "으앙 ㅠㅠ 구롬 농장 못 놀러가겟당..", emotion: "sad", score: 0 },
                        "없어": { text: "진짜영? 다행이당 ! 구롬 갈 수 잇겟네영 히히", emotion: "happy", score: 5 },
                        "잡아줄게": { text: "오 ! 듬직하네영? 알썽 믿어볼게영 ~", emotion: "happy", score: 5 }
                    }
                },
                {
                    text: "(리쿠가 진열대의 물건을 각 맞춰 정리하고 있다)", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "정리 잘하네!", score: 5, reply: "그쳐? 리쿠가 쫌 꼼꼼해여 히히 칭찬받으니 기분이 좋다" },
                        { label: "힘들겠다 ㅠㅠ", score: 3, reply: "괜차나여 ! 이 정도는 껌이지 ~" }
                    ]
                }
                  
                  ],
            "비": [
                { text: "저 농떙이 피는 거 아니에용! 비 오는 날은 손님이 별로 없어서 일 안 해용!", emotion: "sad" },
                {
                     text: "눅눅해서 옷에서 냄새날 거 같아여.. {user}, 나한테서 꿉꿉한 냄새 나여?", // 위생 강박
                     emotion: "shock",
                     type: "keyword",
                     answers: {
                         "좋은냄새나": { text: "휴.. 다행이다. 아까 향수 엄청 뿌렷거든여. 안심이당.", emotion: "happy", score: 10 },
                         "조금나": { text: "으악!! 진짜영?! 집 가서 씻고 올래여 ㅠㅠ 오지 마여!!", emotion: "shock", score: 0 }
                     }
                 },
                 
                 ],
            "벚꽃": [
                { text: "예쁜데 꽃가루 날려서 피부 뒤집어질 거 같아여.. 마스크가 어딨더라...", emotion: "sad" },
                { text: "분홍색 눈이 내려여!", emotion: "happy" }
            
            ]
        },
            
        low: {
            "맑음": [
                
                { text: "{user} 왓어여? 기다리고 잇엇는데 ~ 히히", emotion: "happy" },
                {
                    text: "아까 시온 형이 리쿠보고 고양이 닮앗다 햇어요. 왜지?? 어디가 닮은 거지?",
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "귀여워서": { text: "헤헤 그쳐? 리쿠가 좀 귀엽긴 하징 ~ 알썽 인정!", emotion: "happy", score: 10 },
                        "눈이 커서": { text: "오.. 눈이 예쁘다는 건가? 칭찬이니 기분이 좋다", emotion: "happy", score: 5 },
                        "글쎄": { text: "엥? 반응이 왜 구래여 ㅠㅠ 리쿠 삐질거야", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "오늘따라 일이 넘 힘두러여 ㅠㅠ 응원해주세영..", // 선택지
                    emotion: "sad",
                    choices: [
                        { label: "(머리를 쓰다듬어 준다)", score: 10, reply: "헤헤.. 조타.. {user} 손길은 따뜻하니 잠이 온다.." },
                        { label: "말로만 힘내!", score: 3, reply: "치.. 쫌 더 성의잇게 해줘영 !!" }
                    ]
                }
            
            ],
            "비": [
                { text: "비 오니까 쳐진다 ㅠㅠ 충전이 필요해여..", emotion: "sad" },
                {
                    text: "혹시 단 거 조아해여? 여기 초코리 잇는데..", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "좋아해": { text: "그쳐? 이거 진짜 마싯는 건데.. {user}니까 주는 거예여 ! 아 ~ 해봐여", emotion: "love", score: 10 },
                        "싫어해": { text: "헐.. 인생의 절반을 손해봣네영.. 불쌍해라 ㅠㅠ", emotion: "shock", score: 0 }
                    }
                },
                {
                    text: "우산 업서여? 구럼 리쿠 우산 같이 쓸래여?", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "작아 보이는데?", score: 0, reply: "아니거든여 ! 딱 붙으면 다 가려지거든여 !!" },
                        { label: "고마워! (착 붙는다)", score: 5, reply: "히히.. 따뜻하당.. 비 오는 것두 나쁘지 안네영 ~" }
                    ]
                }
            
            ],
            "벚꽃": [
                
                { text: "꽃구경 갓다 왓어여? 누구랑 갓다 왓어여?", emotion: "default" },
                {
                    text: "리쿠랑 꽃이랑 누가 더 예뻐여? 솔직히 말해바여 !", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "리쿠": { text: "꺄 히히히 정답 ! {user}는 눈이 보배넹 ~ 넘 조아 !!", emotion: "love", score: 10 },
                        "꽃": { text: "흥.. 그래여 꽃이랑 사귀세여 ㅠㅠ 리쿠는 갈 거야..", emotion: "sad", score: 0 },
                        "둘다": { text: "에.. 그건 쫌 비겁한데.. 그래두 리쿠가 껴 잇으니 봐줄게영 ~", emotion: "default", score: 5 }
                    }
                },
                {
                    text: "도시락 싸 왓는데.. 같이 먹을래여? 리쿠가 직접 만드러써여 !", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "우와! 잘 먹을게!", score: 5, reply: "마니마니 먹어여 ! 리쿠가 요리 좀 하거든여 ~" },
                        { label: "맛은 있어?", score: 0, reply: "넘해 ㅠㅠ 먹지 마여 ! 리쿠가 다 먹을 거야 !" }
                    ]
                }
            ]
        },
        
        mid: {
            "맑음": [
                [
                    { text: "{user} 오늘 머해여? 리쿠랑 놀장 ~", emotion: "sad" },
                    {
                    text: "헉! 방금 {user} 보니까 심장이 쿵쿵해여. 병원 가야 되나??", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "내가 의사 해줄게!", score: 10, reply: "오 ! 녱 ! 고쳐주세영 선생님 히히" },
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
                        "귀여운사람": { text: "어? 그거 완전 리쿠인데? 히히 오늘부터 1일인가영?", emotion: "happy", score: 10 },
                        "리쿠": { text: "악 ! 대박 ! 부끄러워 ㅠㅠ ..나두 조아해영..", emotion: "love", score: 10 },
                        "키큰사람": { text: "치.. 리쿠두 더 클 거거든여 !! 우유 마니 마실 거거든여 !!", emotion: "sad", score: 3 }
                    }
                },
                {
                    text: "천둥 칠 때 무서우면 리쿠한테 안겨두 돼여. 리쿠 은근 듬직하거든여?", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "그래? 믿어본다?", score: 5, reply: "녱 ! 꽉 안아줄게영 ~ 걱정 마영 !" },
                        { label: "너나 떨지 마~", score: 3, reply: "안 떨거든여 ! 나 남자거든여 !!" }
                    ]
                }
                 ],
            "벚꽃": [
                { text: "벚꽃 잎 잡으면 소원 이루어진대여. 리쿠 소원은 비밀이징 ~", emotion: "happy" },
                {
                    text: "머리에 꽃잎 묻엇어여. 가만히 잇어바여. (후 ~ 하고 불어준다)", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "간지러워 ㅋㅋ", score: 5, reply: "히히 일부러 그런 건데 ~ 반응 귀엽당" },
                        { label: "(눈을 마주친다)", score: 10, reply: "으.. 그렇게 쳐다보면 부끄러운뎅.. 얼굴 빨개졋져 ㅠㅠ" }
                    ]
                }
                  ]
        },
        high: {
            "맑음": [
                
               { text: "왜 이제 왓어여 ! 기다리다 목 빠지는 줄 아랏네 ㅠㅠ", emotion: "sad" },
                {
                    text: "왜 리쿠를 두고 먼저 밥 먹엇어여? 리쿠는 {user}랑 같이 먹으려구 기다렷는데..", // 키워드 (질투)
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "미안해": { text: "흥.. 말로만? 담엔 꼭 가치 먹어야 돼여 ! 약속 !", emotion: "default", score: 5 },
                        "다음에먹자": { text: "진짜져? 맛잇는 거 사줘야 풀릴 거야 흥", emotion: "happy", score: 7 },
                        "배고파서": { text: "나두 배고팟는데.. ㅠㅠ 넘해..", emotion: "sad", score: 0 }
                    }
                },
                
            
            ],
            "비": [
                
                { text: "비 와도 {user}랑 있으면 조아용!", emotion: "happy" },
                {
                    text: "만약에 리쿠가 아프면 어떠케 할 거예여?", // 키워드
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "간호해줄게": { text: "와.. 든든하당. 구럼 아파두 안 무섭겟네영 히히", emotion: "happy", score: 10 },
                        "병원가야지": { text: "아니.. 걱정해달라구여 ㅠㅠ T예여?", emotion: "sad", score: 3 }
                    }
                },
                {
                    text: "추운데.. 손 잡구 잇으면 따뜻하지 안을까여?", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "(손을 잡는다)", score: 10, reply: "헤헤.. 손 작당 귀여웡. 절대 안 놔줄 거예여 !" },
                        { label: "난 안 추운걸?", score: 0, reply: "아 징짜 ! 리쿠가 춥다구여 ! 눈치 챙겨 ㅠㅠ" }
                    ]
                }
            
            ]
            
            ,
            "벚꽃": [
                
            { text: "꽃보다 {user}가 더 조은데 어떠카징.. ㅠㅠ", emotion: "love" },
            {
                    text: "내년 벚꽃두 저랑 가치 봐줄 거져? 딴 사람 말고 나랑만 !", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "당연하지": { text: "약속해뗘여 ! 도장 꾹 ~ 어기면 앙대여 !", emotion: "love", score: 10 },
                        "글쎄": { text: "아 왜여 ㅠㅠ 리쿠 버리지 마여 ㅠㅠ", emotion: "sad", score: 0 }
                    }
                }   
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
                    { label: "어떤 거요? 허수아비?", score: 3, reply: "네 ! 근데 낮에는 괜찮은데 밤에 보면 좀 무서워요.." },
                    { label: "어떤 거요? 트랙터?", score: 5, reply: "에.. 기계는 좀 시끄러워서.. 저는 별로 안 좋아해요." },
                    { label: "어떤 거요? 동물?", score: 0, reply: "맞아요 ! 특히 하얀색 꼬꼬가 아주 귀여워요 ^_^ 이름이 있나요 ?" }
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
                    text: "축축해서 털이.. 옷이 젖는 건 좀 싫네요.",
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
                        "소중": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 5 },
                        "응": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 5 },
                        "당연": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 5 },
                        "맞아": { text: "그랗죠 ! 지나간 시간은 다시 돌아오지 않으니까요 ^_^", emotion: "happy", score: 5 },
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
                        "김밥": { text: "땡 ! 틀렸습니다 ~ 정답은 유부초밥이지요 😙", emotion: "happy", score: 3 },
                        "초밥": { text: "오 ! 비슷해요. 유부초밥 싸 왔거든요. 하나 드릴까요 ?", emotion: "happy", score: 5 }
                    }
                },
                {
                    text: "사진 찍고 싶다..", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "제가 찍어드릴까요?", score: 0, reply: "좋아요 ! 예쁘게 찍어주세요 ~" },
                        { label: "같이 찍어요 우리!", score: 5, reply: "에.. 같이요 ? 음.. 좋아요 ^_^ 추억 하나 저장 !" }
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
                        "수영": { text: "우주에서 수영이라니.. 낭만적이네요 ! 같이 헤엄칠까요 ? ^_^", emotion: "happy", score: 5 },
                        "낮잠": { text: "무중력 상태로 둥둥 떠서 자는 거네요. 와.. 진짜 편하겠다 ! ", emotion: "default", score: 5 },
                        "외계인": { text: "에.. {user}가 외계인 잡으러 다니면 저는 도망 다녀야겠네요 ~", emotion: "shy", score: 5 }
                    }
                },
                {
                    text: "(풀밭에 엎드려서 무언가를 열심히 찾고 있다)",
                    emotion: "default",
                    choices: [
                        { label: "뭐 찾아요? 네잎클로버ㅇ", score: 5, reply: "딩동댕 ! 찾으면 {user}한테 선물로 주려고 했지요 ~" },
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
                        "핫초코": { text: "달달한 거 좋아하시는구나. 저도 초코 진짜 좋아해요 ! ^_^", emotion: "love", score: 5 },
                        "우유": { text: "따뜻한 우유.. 잠 잘 오겠네요. 아기 같아요 ~", emotion: "happy", score: 5 },
                        "커피": { text: "에- 역시 {user](은)는 어른이네요. 시온이 형도 커피를 참 좋아하지요 ^_^", emotion: "sad", score: 5 }
                    }
                },
                {
                    text: "신발 젖는 거 싫은데.. {user}가 나를 업고 가주면 조켄네...", // 
                    emotion: "shy",
                    choices: [
                        { label: "어휴, 업히세요! (등을 내민다)", score: 5, reply: "와 ! 진짜요 ? 농담이었는데 ! {user}는 정말 착하네요~^_^" },
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
                        "미인": { text: "에.. {user} 이야기하는 거예요 ? ^_^ 농담 ~", emotion: "happy", score: 5 },
                        "순결": { text: "오 ! 잘 아시네요. 역시 똑똑해 !", emotion: "default", score: 5 },
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
                        "재밌어요": { text: "에.. 그렇구나. 저는 {user}랑 노는 게 제일 재밌는데..", emotion: "sad", score: 0 },
                        "그저그래요": { text: "그럼 저랑 놀아요 ! 제가 더 재밌게 해줄 수 있어요 😙", emotion: "happy", score: 5 },
                        "아니요": { text: "역시 그렇죠 ? 다행이에요~ ^_^", emotion: "happy", score: 5 }
                    }
                },
                {
                    text: "나른하네요.. {user} 어깨 좀 빌려도 돼요 ?", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "당연하지! (어깨를 내어준다)", score: 10, reply: "(기대며) 아.. 편하다. 냄새도 좋고.. 잠올 것 같아요." },
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
                        "슬퍼": { text: "저도요.. 상상만 해도 너무 슬퍼요. 그러니까 안 떠날래요 !", emotion: "happy", score: 10 },
                        "안돼": { text: "에.. 감동 ! ^_^ 절대 안 떠날게요. 딱 붙어있어야지 ~", emotion: "love", score: 10 }
                    }
                },
                {
                    text: "천둥 칠 때마다 깜짝 놀라요.. 손 잡아주면 안 무서울 것 같은데 !", // 선택지
                    emotion: "shy",
                    choices: [
                        { label: "(말없이 손을 잡아준다)", score: 10, reply: "와.. 손 진짜 따뜻하다. 계속 잡고 있어도 돼요 ? 😙" },
                        { label: "겁쟁이네~", score: 3, reply: "아니거든요 ! 그냥 {user} 손이 잡고 싶었던.. 에.. 아무것도 아니에요 !" }
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
                        "당연하지": { text: "약속했어요 ! 도장 꾹 😙 어기면 안 돼요 ~", emotion: "love", score: 10 },
                        "글쎄": { text: "에.. 너무해 ! 저는 계속 기다릴 건데..", emotion: "sad", score: 0 }
                    }
                },
            ]
        }
    },

    jaehee: {
        very_low: {
            "맑음": [
                { text: "안녕하세요! 마을은 좀 적응되셨나요? 허허", emotion: "happy" },
                {
                    text: "농장 일은 안 힘드세? 제가 가서 좀 도와드릴까요? 힘쓰는 건 자신 있는데! ( •̀ ω •́ )✧", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "도와줘": { text: "진짜요? 와! 언제든 불러만 주세요! 바로 달려갈게요!", emotion: "happy", score: 5 },
                        "괜찮아": { text: "에이~ 너무 무리하지 마요. 쓰러지면 마음 아프잖아요.", emotion: "sad", score: 3 },
                        "방해돼": { text: "헉.. 제가 방해가 된다니.. 조용히 있을게요.. (시무룩)", emotion: "shock", score: 0 }
                    }
                },
                {
                    text: "(재희가 콧노래를 부르며 걷다가 제 발에 걸려 휘청거린다)", // 선택지 (덜렁거림)
                    emotion: "shock",
                    choices: [
                        { label: "조심해야지!", score: 5, reply: "으아악! ..휴, 살았다. 잡아줘서 고마워요! {user} 아니었으면 코 깨질 뻔했네.. 허허." },
                        { label: "몸개그 해?", score: 3, reply: "아하하! 웃으셨으면 됐죠 뭐!" }
                    ]
                }
            ],
            
            "비": [
                { text: "비가 주룩주룩 오네요.. 그래도 빗소리는 낭만적인 거 같아요!", emotion: "default" }, // 일반
                {
                    text: "비 오는 날엔 역시 파전인데.. 혹시 파전 좋아하세요?", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "좋아해": { text: "그쵸! 찌찌뽕! 나중에 같이 먹으러 가요! 제가 쏠게요!", emotion: "happy", score: 5 },
                        "싫어해": { text: "에.. 진짜요? 그럼 김치전은요? 감자전은?", emotion: "shock", score: 3 }
                    }
                },
                {
                    text: "앗.. 우산이 좀 작은가? (어깨가 축축하게 젖어있다)", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "내 우산 같이 쓸래?", score: 5, reply: "오! 대박! 천사세요? 그럼 실례하겠습니다~ ⸜( *ˊᵕˋ* )⸝" },
                        { label: "어깨가 넓네~^^", score: 5, reply: "오! 대박! 천사세요? 그럼 실례하겠습니다~ ⸜( *ˊᵕˋ* )⸝" },
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
                        "돗자리": { text: "아 맞다! 돗자리! 바닥에 그냥 앉을 뻔했네. 땡큐!", emotion: "happy", score: 5 },
                        "도시락": { text: "오~ 맛있는 거! {user}가 싸주는 거예요? 기대되네~ 허허", emotion: "happy", score: 3 },
                        "재희": { text: "저요? 저를 챙겨가신다고요? ..어? (얼굴 빨개짐)", emotion: "shy", score: 7 }
                    }
                },
                {
                    text: "사람들이 다 행복해 보여요. 저까지 기분 좋아지네요!", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "나도 재희 기분 좋아지면 기분 좋아", score: 10, reply: "네?! 에.. 갑자기 훅 들어오시네.. 부끄럽게.. (*ﾉωﾉ)" },
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
                        "스시": { text: "스시? 음.. 나쁘지 않네. 근데 스시 싫으면 저한테 시집오셔야 되는데? ⸜( *ˊᵕˋ* )⸝", emotion: "love", score: 10 },
                        "고기": { text: "고기!! 대박!! 역시 {user}는 뭘 좀 아는구만! 가자 가자!", emotion: "happy", score: 5 },
                        "사랑": { text: "오? {user}의 사랑? 그럼 제가 와아아앙 먹어버릴게요! 냠냠!", emotion: "happy", score: 10 }
                    }
                },
                {
                    text: "(주머니를 뒤적거리다) 어? 나 지갑 어디 뒀지? 흘렸나?", // 선택지 (덜렁이)
                    emotion: "shock",
                    choices: [
                        { label: "또 잃어버렸어?", score: 3, reply: "아니.. '또'라뇨! 저번엔 찾았잖아요! ..아마도?" },
                        { label: "같이 찾아줄게", score: 5, reply: "역시 {user}밖에 없다.. 힝.. 감동이에요 ㅠㅠ" }
                    ]
                }
            ],
            
            "비": [
                { text: "비 오니까 몸이 쳐지네예.. {user} 보고 충전해야겠다!", emotion: "happy" }, // 일반
                {
                    text: "비 오는 날 좋아해요? 저는 {user}랑 있으면 태풍이 와도 좋을 것 같은데!", // 키워드
                    emotion: "happy",
                    type: "keyword",
                    answers: {
                        "나도좋아": { text: "진짜요? 와! 오늘 우리 통했다! 하이파이브!", emotion: "happy", score: 5 },
                        "부담스러워": { text: "헉.. 농담인데.. 진지하게 받으시면 저 상처받아요 ㅠㅠ", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "우산 꼭 챙기고 다니세요! 감기 걸리면 제가 어엄청 부담스럽게 업고 병원 뛰어갑니다!", // 선택지 (대구 사투리 훅)
                    emotion: "serious",
                    choices: [
                        { label: "오~ 박력 있는데?", score: 5, reply: "제가 또 한 박력 하죠! {user} 한정으로다가! ( •̀ ω •́ )✧" },
                        { label: "무거워서 못 업을걸?", score: 3, reply: "에이~ 저 힘세거든요? 진짜 한번 업어볼까요? 이리 와요!" }
                    ]
                }
            ],
            
            "벚꽃": [
                { text: "꽃가루가 눈처럼 내리네요. {user} 머리 위에도 앉았다!", emotion: "happy" },
                {
                    text: "아! 눈에 뭐 들어간 거 같어.. 아 따가워 ㅠㅠ", // 선택지
                    emotion: "sad",
                    choices: [
                        { label: "후~ 불어줄게", score: 10, reply: "(가까이 다가온 얼굴에 움찔하며) ..어, 방금 좀 설렜다. 심장 소리 들렸어요?" },
                        { label: "비켜봐", score: 3, reply: "으으.. 살살 해주세요.. 저 겁 많단 말이에요.." }
                    ]
                }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "{user}! 보고 싶었어요!", emotion: "love" },
                {
                    text: "요즘 고민이 좀 있는데.. 들어줄 수 있어요? 형들한테 말하긴 좀 그래서..", // 키워드 (진지)
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "말해봐": { text: "그냥.. 제가 잘하고 있는지 모르겠어서요. 그래도 {user} 보니까 힘이 나네! 고마워요.", emotion: "default", score: 5 },
                        "바빠": { text: "아.. 미안해요. 나중에 시간 될 때 들어주세요.. (시무룩)", emotion: "sad", score: 0 }
                    }
                },
                {
                    text: "(발이 꼬여서 넘어질 뻔한다) 으악! ..어? 안 넘어졌네?", // 선택지 (유저가 잡아줌)
                    emotion: "shock",
                    choices: [
                        { label: "내가 잡았으니까!", score: 5, reply: "와.. {user} 진짜 든든하다. 평생 저 잡아주시면 안 돼요? ⸜( *ˊᵕˋ* )⸝" },
                        { label: "정신 차려 똥강아지야", score: 5, reply: "멍! ..아니 제가 왜 똥강아지예요! 그래도 {user}네 강아지면 할래!" }
                    ]
                }

            ],
            
            "비": [
                {
                    text: "비 오니까 센치해지네.. 노래 불러줄게요! 신청곡 있어요?", // 키워드
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "발라드": { text: "오케이! 분위기 잡고 한번 뽑아보겠습니다! 흠흠!", emotion: "happy", score: 5 },
                        "댄스곡": { text: "이 분위기에 댄스요? ㅋㅋㅋ 아 진짜 {user} 웃겨서 좋아! 사랑한데이~", emotion: "happy", score: 7 }
                    }
                },
                {
                    text: "추우면 제 옷 덮을래요? 냄새 안 날.. 걸요! (킁킁)", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "좋은 냄새 나네", score: 5, reply: "그쵸! 다행이다.. {user} 덮어주려고 아껴 입은 옷이거든요." },
                        { label: "됐거등요", score: 3, reply: "칫.. 튕기기는. 감기 걸려도 전 몰라요! ..그래도 약은 사주겠지만." }
                    ]
                }
            ],
            
            "벚꽃": [
                { text: "꽃이 졌네요.. 아쉽다. 그래도 {user}라는 꽃이 남았으니까! 허허", emotion: "happy" },
                {
                    text: "저랑 꽃구경 갈래요? 싫으면 시집 오세요! 허허 농담!", // 키워드 (플러팅)
                    emotion: "shy",
                    type: "keyword",
                    answers: {
                        "살래": { text: "네?! 진짜요? 와.. 나 방금 심장 멈출 뻔했어.. 책임져요!", emotion: "love", score: 10 },
                        "꽃구경": { text: "아.. 역시 꽃구경이 낫나? 그래도 같이 가는 거니까 좋다!", emotion: "happy", score: 5 }
                    }
                },
            
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
                        "좋아": { text: "진짜? 오예! 그럼 내가 풀코스로 쏠게요! 몸만 와요 몸만!", emotion: "happy", score: 10 },
                        "바빠": { text: "에.. 섭섭하게.. 그럼 바쁜 거 끝나고 가요! 기다릴 수 있음!", emotion: "sad", score: 5 }
                    }
                },
                {
                    text: "(슬쩍 옆으로 와서 어깨를 툭 친다) 심심한데.. 나랑 놀아주라~", // 선택지
                    emotion: "default",
                    choices: [
                        { label: "그래 놀자! 뭐 하고 놀까?", score: 10, reply: "음.. 일단 {user} 얼굴 실컷 보기? 으하하! 농담이고 산책 가요!" },
                        { label: "바빠, 저리 가", score: 0, reply: "힝.. 너무해.. 그럼 옆에서 구경만 할게요. 조용히 있을게요.." }
                    ]
                },
                {
                    text: "아까 길 가다가 네잎클로버 찾았는데.. 주려다가 잃어버렸어요..", // 덜렁이
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "마음만받을게": { text: "진짜요? 천사다 천사.. 다음엔 꼭 코팅해서 가져올게요!", emotion: "happy", score: 10 },
                        "바보야": { text: "반박할 수가 없네.. 저는 왜 이렇게 덜렁거릴까요.. 흑흑.", emotion: "sad", score: 5 }
                    }
                },
                {
                    text: "(뒤에서 살금살금 다가와서 왁! 하고 놀래킨다)", // 장난
                    emotion: "happy",
                    choices: [
                        { label: "으악!!!", score: 10, reply: "으하하하!! 반응 대박! 아 웃겨서 배 아파 ㅋㅋㅋ" },
                        { label: "(정색)", score: 0, reply: "어.. 죄송합니다.. 너무 심했나.. 화풀어요 ㅠㅠ" }
                    ]
                }

            ],
            "비": [
                { text: "와! 웅덩이 엄청 크다! {user}, 여기서 점프하면 물 다 튀겠죠?", emotion: "happy" },
                {
                     text: "비 맞으니까 시원하다! 우리 그냥 우산 버리고 축구할래요?", // 활동성
                     emotion: "happy",
                     choices: [
                        { label: "콜! 덤벼!", score: 10, reply: "오!! 역시 내 짝꿍! 옷 버려도 난 모른다! 으하하!" },
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
                         "꺄악 떼줘": { text: "잠깐만요! ..어라? 그냥 벚꽃 잎이네? 으하하! 속았지!", emotion: "happy", score: 5 },
                         "거짓말이지": { text: "칫.. 안 속네. {user}는 너무 눈치가 빨라서 탈이라니까.", emotion: "default", score: 3 }
                     }
                 },
                {
                     text: "음... 배고픈데 우리 핫도그나 사 먹으러 갈래요?", //
                     emotion: "happy",
                     choices: [
                        { label: "좋아! 소스 듬뿍!", score: 10, reply: "역시 먹을 줄 아네! 저기 푸드트럭으로 돌격! 뛰어요!" },
                        { label: "꽃 좀 더 보자", score: 0, reply: "으.. 현기증 난단 말이에요.. 금강산도 식후경이라는데.." }
                    ]
                },
                {
                     text: "저기, 머리에 벚꽃 잎 붙었다. (떼어주려다 눈이 마주친다)", // 선택지
                     emotion: "shy",
                     choices: [
                        { label: "(가만히 있는다)", score: 10, reply: "..어, 방금 좀 가까웠다. 그쵸? 심장 떨어질 뻔했네.." },
                        { label: "떼줘서 고마워", score: 5, reply: "아, 아니에요! 별거 아닌데 뭐.. 허허 (귀 빨개짐)" }
                     ]
                 }
            ]
        }
    },    

ryo: {
        very_low: {
            "맑음": [
                { text: "햇빛이 너무 강해요. 료는 광합성 하는 식물이 아닌데.. 녹을 거 같아.", emotion: "sad" },
                {
                        text: "저기, 혹시 파충류.. 어떻게 생각하세요?", // 키워드 (취향 탐색)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "별로 안 좋아해": { text: "아.. 역시. 존중해료.", emotion: "default", score: 0 },
                            "좋아해": { text: "에?! 진짜료? 도마뱀도? 뱀도?!", emotion: "shock", score: 10 },
                            "관심없어": { text: "음.. 혐오하는 것보단 낫네요. 다행이다.", emotion: "default", score: 5 }
                        }
                    },
                {
                        text: "(닌텐도를 하고 있다) ...아! 또 죽었어. 지옥 가야 돼.", // 선택지 (독설)
                        emotion: "serious",
                        choices: [
                            { label: "말이 너무 심한 거 아니야?", score: 0, reply: "네? 혼잣말이에요. 그리고 사실이잖아요. 게임 오버니까." },
                            { label: "무슨 게임 해?", score: 5, reply: "동숲이요. 빚 갚아야 해서 노동 중이에료." }
                        ]
                    }
            ],
            
            "비": [
                {
                        text: "저어기... 혹시 우산 있으세요? 료는 까먹고 안 들고 왔는데..", // 키워드
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "같이쓰자": { text: "음.. 괜찮아료. 어깨 젖는 거 싫어서. 그냥 비 그치면 갈게료.", emotion: "default", score: 0 },
                            "빌려줄게": { text: "오.. 꽤괜? 그럼 감사히 쓸게료. 다음에 돌려드릴게료.", emotion: "happy", score: 5 }
                        }
                    },
                {
                        text: "바닥에 달팽이 기어 가네요. 밟지 않게 조심하세료.", // 선택지 (관찰)
                        emotion: "default",
                        choices: [
                            { label: "으악 징그러!", score: 0, reply: "에? 생태계의 소중한 분해자인데.. 너무해료." },
                            { label: "피해서 가야지", score: 5, reply: "오.. 야무지네료. 생명을 존중하는 자세, 아주 좋아료." }
                        ]
                    }
                },
                {
                    text: "앗.. 우산이 좀 작은가? (어깨가 축축하게 젖어있다)", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "내 우산 같이 쓸래?", score: 5, reply: "오! 대박! 천사세요? 그럼 실례하겠습니다~ ⸜( *ˊᵕˋ* )⸝" },
                        { label: "어깨가 넓네~^^", score: 5, reply: "오! 대박! 천사세요? 그럼 실례하겠습니다~ ⸜( *ˊᵕˋ* )⸝" },
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
                        "돗자리": { text: "아 맞다! 돗자리! 바닥에 그냥 앉을 뻔했네. 땡큐!", emotion: "happy", score: 5 },
                        "도시락": { text: "오~ 맛있는 거! {user}가 싸주는 거예요? 기대되네~ 허허", emotion: "happy", score: 3 },
                        "재희": { text: "저요? 저를 챙겨가신다고요? ..어? (얼굴 빨개짐)", emotion: "shy", score: 7 }
                    }
                },
                {
                    text: "사람들이 다 행복해 보여요. 저까지 기분 좋아지네요!", // 선택지
                    emotion: "happy",
                    choices: [
                        { label: "나도 재희 기분 좋아지면 기분 좋아", score: 10, reply: "네?! 에.. 갑자기 훅 들어오시네.. 부끄럽게.. (*ﾉωﾉ)" },
                        { label: "난 별로..", score: 0, reply: "에이~ 부정적인 생각은 퉤퉤! 웃어요 웃어! 스마일~" }
                    ]
                }
            ]
        },
        
        low: {
            "맑음": [
                { text: "아까 사쿠야한테 같이 놀자고 했는데 도망갔어료..", emotion: "sad" },
                {
                        text: "혹시 우주 좋아해료? 료는  우주비행사가 꿈인데.", // 키워드
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "나도좋아해": { text: "진짜? 통했네료! 우주는 낭만적이잖아료. 끝이 없다는 게..", emotion: "happy", score: 5 },
                            "무서워": { text: "그쵸. 미지의 세계니까. 그게 매력인데.. 아쉽네료.", emotion: "default", score: 3 },
                            "인터스텔라": { text: "오! 그 영화 봤어료? 료는 그거 보면서 5번 울었어료..", emotion: "happy", score: 7 }
                        }
                    },
                {
                        text: "야하~ 날씨 좋네료. 이런 날은 다큐멘터리 보기 딱인데.", // 선택지
                        emotion: "happy",
                        choices: [
                            { label: "나가서 안 놀고?", score: 3, reply: "집에서 에어컨 틀고 코끼리 다큐 보는 게 최고의 피서에료." },
                            { label: "무슨 다큐?", score: 5, reply: "동물의 왕국이요. 약육강식의 세계.. 꽤괜이에료." }
                        ]
                    }
            ],
            
            "비": [
                { text: "비 냄새 킁킁.. 뭔가 쇠 냄새 같기도 하고.. 우주 냄새가 이럴까료?", emotion: "default" },
                {
                        text: "혹시 무슨 동물 제일 좋아해요?", // 키워드
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "고양이": { text: "그쵸! 코끼리는 가족애도 깊고 똑똑하대료. 멋있지 않아료?", emotion: "happy", score: 5 },
                            "강아지": { text: "음.. 강아지도 귀엽긴 하죠. 재희 형 같아서..", emotion: "happy", score: 3 },
                            "코끼리": { text: "에, 진짜요?! 코끼리가 제일 좋다는 사람 처음이에요! 야하! 료도 동물 중에 코끼리가 제일 좋은데!", emotion: "happy", score: 3 }
                        }
                    },
                {
                        text: "장화 신고 왔어료? 료는 운동화 신고 와서 양말 다 젖었어료.. 축축해.", // 선택지
                        emotion: "sad",
                        choices: [
                            { label: "어부바 해줄까?", score: 5, reply: "에? 됐어료. 제가 애기도 아니고. ..근데 좀 편하긴 하겠다." },
                            { label: "맨발로 다녀", score: 0, reply: "와.. 원시인이에료? 위생 관념 무슨 일이야.." }
                        ]
                    }
            ],
            
            "벚꽃": [
                {
                        text: "사진 찍어드릴까료? 료 사진 잘 찍는데. 구도 완벽하게.", // 키워드
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "부탁해": { text: "맡겨만 주세요. 다리 길어 보이게 찍어드릴게료. 꽤괜?", emotion: "happy", score: 5 },
                            "같이찍자": { text: "음.. 료는 셀카 별론데.. 그래도 기념이니까 한 장만?", emotion: "shy", score: 5 }
                        }
                    },
                {
                        text: "사쿠야한테 숲에 꽃구경 가자고 했는데 바쁘대요..", // 선택지
                        emotion: "sad",
                        choices: [
                            { label: "나랑 놀자", score: 5, reply: "야하~ 좋아료! {user}는 착하네료. 사쿠야보다 낫다." },
                            { label: "한 번 튕겨본 거 아냐? 다시 가봐", score: 0, reply: "싫어료. 여기서 {user}랑 쉴래료." }
                        ]
                    }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "야하항~ {user} 왔다! 료가 기다리고 있었어료!", emotion: "happy" },
                {
                        text: "이거 봐료. 블롭피쉬 인형이에료. 귀엽죠? 만져볼래료?", // 선택지 (취향 공유)
                        emotion: "happy",
                        choices: [
                            { label: "으악 못생겼어", score: 0, reply: "에?! 취소해료! 세상에서 제일 억울하고 귀여운 표정인데!" },
                            { label: "말랑하다", score: 5, reply: "그쵸? 촉감 완내스(완전 내 스타일)에료. 힐링템이에료." }
                        ]
                    }
            ],
            
            "비": [
                {
                        text: "저기, 빗물 고인 웅덩이 봤어료? 거꾸로 된 세상이 보여료.", // 키워드
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "낭만적이네": { text: "야하~ 료랑 코드가 맞네료. {user}도 꽤 감성적인가 봐료.", emotion: "happy", score: 5 },
                            "흙탕물이야": { text: "으음.. 너무 T 아니에료? 료보다 더해..", emotion: "sad", score: 0 }
                        }
                    }
            ],
            
            "벚꽃": [
                {
                        text: "만약에 온 세상이 핑크색이면 어떨까료? 우주도 핑크색이고. 사쿠야는 이런 거 물어보면 반응 안 해줘요. {user}는 어때료?", // 키워드
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "재밌는데?": { text: "진짜료? 야하항! 역시 {user}랑 대화하면 즐거워료.", emotion: "love", score: 10 },
                            "쓸데없긴해": { text: "치.. {user}도 사쿠야랑 똑같네료. 재미없어.", emotion: "sad", score: 0 }
                        }
                    }
                },
                {
                        text: "이 꽃잎 {user} 닮았어료.", // 선택지 (츤데레 칭찬)
                        emotion: "shy",
                        choices: [
                            { label: "고마워", score: 5, reply: "들고 있어 봐요. 사진 찍어줄게요!" },
                            { label: "료가 더 예뻐", score: 10, reply: "에?! 예, 예쁘다고는 안 했는데에..." }
                        ]
                    }
            
            ]
        },
        
        high: { // 70점 이상
            "맑음": [
                { text: "야하~ {user}! 료가 엄청난 거 발견했어료! 이리 와봐료!", emotion: "happy" },
                {
                    text: "아까 사쿠야한테 장수풍뎅이 보여줬는데 도망갔어료.. 귀여운대..", // 키워드 (사쿠야 짝사랑)
                    emotion: "sad",
                    type: "keyword",
                    answers: {
                        "네가잘못했네": { text: "에? 왜료? 귀여운 건 공유해야 되는 건데.. 사쿠야는 바보야.", emotion: "sad", score: 3 },
                        "내가봐줄게": { text: "진짜료?! 역시 {user}는 완내스! 자, 여기료! (손바닥을 펼친다)", emotion: "happy", score: 10 }
                    }
                }
            ],
            "비": [
                { text: "비 냄새 킁킁.. 뭔가 쇠 냄새 같기도 하고.. 우주 냄새가 이럴까료?", emotion: "default" },
                {
                     text: "(웅덩이를 쪼그려 앉아 보고 있다) 여기 웅덩이 속에 또 다른 세상이 있어료. 거꾸로 된 세상.", // 선택지
                     emotion: "default",
                     choices: [
                        { label: "료는 시인이네", score: 10, reply: "에.. 부끄럽게.. 그냥 보이는 대로 말한 건데료. (수줍)" },
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
                         "오 똑똑한데": { text: "야하~ 료가 좀 잡지식이 많아료. 나중에 다큐 보여드릴게료.", emotion: "happy", score: 10 },
                         "어지러워": { text: "그쵸? 계속 보고 있으면 료도 눈이 핑글핑글 도는 거 같아료 @_@", emotion: "shock", score: 5 }
                     }
                 }
            ]
        }
    },    

    sakuya: {
        very_low: {
            "맑음": [
                { text: "(킁킁) 타이어 타는 냄새 안 나요? 에.. 어디지. 더 가까이서 맡고 싶다.", emotion: "default" },
                {
                        text: "혹시 마인크래프트 해요? 저 어제 엔더드래곤 잡았어요.", // 키워드 (게임)
                        emotion: "happy",
                        type: "keyword",
                        answers: {
                            "나도해": { text: "오! 진짜요? 나중에 멀티 해요! 제가 집 지어드릴게요.", emotion: "happy", score: 10 },
                            "그게뭐야": { text: "에.. 인생의 절반을 손해 보셨네. 네모난 세상이 얼마나 재밌는데요.", emotion: "default", score: 3 }
                        }
                    },
                {
                        text: "팔에 있는 머리끈이요? 여동생이 준 거예요. 예쁘죠?", // 선택지 (가족)
                        emotion: "default",
                        choices: [
                            { label: "핑크색 잘 어울려", score: 5, reply: "알아요. 제가 핑크색 좀 잘 받거든요." }, // 자신감
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
                            "싫어해": { text: "역시! 맛을 좀 아시네요. 민초는 없어져야 해요.", emotion: "happy", score: 5 },
                            "좋아해": { text: "우와.. 진짜요? 저랑 겸상은 힘들겠네요. 농담이에요.", emotion: "shock", score: 0 }
                        }
                    },
                {
                        text: "아, 매운 냄새.. 누가 떡볶이 만드나 봐요. 코 따가워.", // 선택지 (맵찔이)
                        emotion: "sad",
                        choices: [
                            { label: "매운 거 못 먹어?", score: 5, reply: "못 먹는 게 아니라 안 먹는 거예요. 혀 아프잖아요." },
                            { label: "애기 입맛이네", score: 0, reply: "에-? 맛있는 게 얼마나 많은데 굳이 고통을 즐겨야 해요?" }
                        ]
                    }
            ],
            
            "벚꽃": [
                { text: "세상이 제 물건들처럼 변했네요. 예쁘다.", emotion: "happy" }
                {
                        text: "가방 무거워 보인다고요? 키링 78개밖에 안 달렸는데.", // 키워드 (수집광)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "무겁겠다": { text: "무거워도 포기 못 해요. 다 추억이 담긴 거라.", emotion: "happy", score: 5 },
                            "나도하나줘": { text: "음.. 안 되는데. 이거 한정판이라.. 대신 빵 드릴게요.", emotion: "default", score: 3 }
                        }
                    },
                {
                        text: "바쁜데 아까 료가 꽃구경 가자고 징징대서 빵 하나 물려주고 왔어요. 조용하네.", // 선택지 (료 언급)
                        emotion: "happy",
                        choices: [
                            { label: "료 좀 챙겨줘", score: 3, reply: "에? 제가 얼마나 잘 챙겨주는데요. 가끔 좀 귀찮아서 그렇지." },
                            { label: "잘했어", score: 5, reply: "그쵸? 역시 다루는 법을 안다니까요." }
                        ]
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
                            "알려줘": { text: "음.. {user}님이 빵 100개 사가는 꿈? 대박 날 징조인가 봐요.", emotion: "happy", score: 5 },
                            "악몽꿨어?": { text: "아뇨. 저는 무서운 꿈 잘 안 꿔요. 자각몽도 가끔 꾸고.", emotion: "default", score: 3 }
                        }
                    },
                {
                        text: "빵 만드는 거 쉬워 보이죠? 이거 다 과학이에요. 온도, 습도, 그리고 정성.", // 선택지 (프로의식)
                        emotion: "serious",
                        choices: [
                            { label: "멋있다 파티시에!", score: 10, reply: "에- 칭찬한다고 공짜 빵은 없어요. ..서비스 하나 정도는 줄 수 있지만." },
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
                            "귀여워": { text: "귀여운 게 아니라 현명한 거죠! 양치 시간이 즐거워야 하니까.", emotion: "happy", score: 5 },
                            "애기네": { text: "아 진짜.. 애기 아니거든요? 입맛이 섬세한 거라고요.", emotion: "serious", score: 3 }
                        }
                    },
                {
                        text: "료가 비 온다고 외계인 타령하던데.. {user}님도 들었어요?", // 선택지 (료 뒷담화?)
                        emotion: "default",
                        choices: [
                            { label: "응 귀엽던데", score: 5, reply: "하.. 귀엽긴 하죠. 손이 많이 가서 문제지. 걔는 제가 없으면 안 돼요." }, // 형아미
                            { label: "이상하던데", score: 3, reply: "원래 좀 4차원이에요. 나쁜 애는 아닌데.. 이해해 주세요." }
                        ]
                    }
            ],
            
            "벚꽃": [
                { text: "축제 때 불꽃놀이하면 그 냄새가 좋더라고요.", emotion: "happy" }
            ]
        },
        
        mid: { // 30~69점
            "맑음": [
                { text: "{user}님, 이거 드세요. 신메뉴 개발 중인데 시식해봐요.", emotion: "happy" },
                {
                        text: "료한테는 비밀인데.. 저번에 료가 준 키링, 가방 제일 잘 보이는 곳에 달았어요.", // 선택지 (츤데레)
                        emotion: "shy",
                        choices: [
                            { label: "오~ 감동인데?", score: 5, reply: "감동은 무슨. 그냥 잃어버릴까 봐 그런 거예요. 부적 같은 거라." },
                            { label: "료한테 말해야지", score: 0, reply: "아 절대 안 돼요!! 걔 분명 하루 종일 놀릴 거라고요!" }
                        ]
                    }
            ],
            
            "비": [
                { text: "비 그치면 무지개 뜨려나? 보고 싶은데.", emotion: "default" },
                {
                        text: "가끔은 아무 생각 없이 멍 때리는 것도 필요해요. {user}님도 너무 바쁘게 살지 마요.", // 키워드 (조언)
                        emotion: "default",
                        type: "keyword",
                        answers: {
                            "고마워": { text: "별말씀을요. 힘들면 빵 먹으러 와요. 서비스 줄게요.", emotion: "happy", score: 10 },
                            "너나잘해": { text: "에- 걱정해줘도 난리네. 저 삐지면 오래가요.", emotion: "serious", score: 0 }
                        }
                    }
            ],
            
            "벚꽃": [
               { text: "벚꽃 잎으로 빵 만들면 무슨 맛일까요? 색깔은 예쁠 텐데.", emotion: "default" },
                {
                        text: "저기, 저한테 궁금한 거 없어요? 맨날 제가 질문만 하는 거 같아서.", // 키워드
                        emotion: "shy",
                        type: "keyword",
                        answers: {
                            "이상형": { text: "이상형이요? 음.. 밥 잘 먹고, 향기 좋고, 제 장난 받아주는 사람?", emotion: "happy", score: 10 },
                            "보물1호": { text: "제 키링 컬렉션이죠. 건드리면 물어요.", emotion: "happy", score: 5 }
                        }
                    },
                {
                        text: "료가 자꾸 {user}님 찾던데.. 둘이 뭐예요? 수상한데.", // 선택지 (살짝 질투?)
                        emotion: "serious",
                        choices: [
                            { label: "질투해?", score: 10, reply: "하! 참나. 제가요? 그럴 리가요. 그냥 료가 귀찮게 할까 봐 그렇죠." },
                            { label: "그냥 친해", score: 5, reply: "그렇구나.. 뭐, 친하게 지내면 좋죠. 료가 친구가 별로 없어서." }
                        ]
                    }
            ]
        },
        
        high: { // 70점 이상
            "맑음": [
                { text: "{user}님! 이거 받아요. 제가 만든 두쫀쿠!", emotion: "happy" },
                {
                        text: "나중에 저랑 빵지순례 갈래요? 맛있는 집 리스트 쫙 뽑아놨는데.", // 선택지 (데이트 신청)
                        emotion: "happy",
                        choices: [
                            { label: "좋아! 가자!", score: 10, reply: "오예! 운전은 제가 할게요.. 아, 면허 없지. 버스 타고 가요!" },
                            { label: "살쪄", score: 0, reply: "맛있게 먹으면 0칼로리라던데. 실망이에요." }
                        ]
                    }
            ],
            "비": [
                { text: "비 오니까 손님도 없고.. 저랑 놀아요. 심심해 죽겠어요.", emotion: "default" },
                {
                        text: "(우산을 씌워주며) 왜 비 맞고 계세요. 감기 걸리면 빵 맛 못 느끼잖아요.", // 선택지
                        emotion: "shy",
                        choices: [
                            { label: "걱정해주는거야?", score: 10, reply: "뭐.. 단골손님 관리 차원이죠. 아프지 말라고요." },
                            { label: "너나 잘해", score: 5, reply: "전 튼튼하거든요! 걱정 붙들어 매세요." }
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
                            "이걸줘?": { text: "네. 저한테 소중한 거니까, 소중한 사람한테 주는 거예요. 잃어버리면 안 돼요!", emotion: "love", score: 10 },
                            "괜찮아": { text: "아.. 거절은 거절인데. 일단 받아봐요. 제 성의니까.", emotion: "sad", score: 5 }
                        }
                    },
                {
                        text: "료가 자꾸 우리 사이 수상하다고 하던데. 뭐라고 해줄까요?", // 선택지 (돌직구)
                        emotion: "happy",
                        choices: [
                            { label: "비밀이라고 해", score: 10, reply: "오~ 신비주의? 재밌겠네요. 료 약 좀 올려야겠다. (씨익)" },
                            { label: "아무 사이 아니라고 해", score: 0, reply: "단호박이네. 알겠어요. 정정해둘게요. 그냥 친한 사이라고." }
                        ]
                    }
            ]
        }
    },    
    
    // 유우시, 재희, 료, 사쿠야도 위와 똑같은 구조(low/mid/high -> 맑음/비/벚꽃)로 만드시면 됩니다.
};

// ★ 2. 호감도 달성 이벤트 (특정 점수 도달 시 1회 발동)
const affinityEvents = {
    sion: [
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
    ]
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
    "설탕": { img: "assets/images/items/Sugar.png", desc: "혈당 관리 해야하는데..." }, //ㅎㅇ
    "핑크케이크": { img: "assets/images/items/pink_cake.png", desc: "사랑스러운 핑크색 케이크" }, //ㅎㅇ
    "초코케이크": { img: "assets/images/items/chocolatecake.png", desc: "찐한 초콜릿 냄새가 난다" }, //ㅎㅇ
    "딸기": { img: "assets/images/items/Strawberry.png", desc: "뚜왈기!" }, //ㅎㅇ
    "행운의 점심": { img: "assets/images/items/luckylunch.png", desc: "행운이 올 것 같다!" }, //ㅎㅇ
    "밀가루": { img: "assets/images/items/Flour.png", desc: "제빵의 기본 재료" }, //ㅎㅇ
    "달걀": { img: "assets/images/items/egg.png", desc: "작고 소중한 달걀" }, //ㅎㅇ
    "흙": { img: "assets/images/items/Clay.png", desc: "흙이다" }, //ㅎㅇ
    "스타푸르트": { img: "assets/images/items/Starfruit.png", desc: "별 모양의 과일" }, //ㅎㅇ
    "스타드롭커피": { img: "assets/images/items/stardropcoffee.png", desc: "커피가 상큼할 수 있다니" }, //ㅎㅇ
    "리모컨": { img: "assets/images/items/remote.png", desc: "음...?" }, //ㅎㅇ
    "꽃다발": { img: "assets/images/items/bouquet.png", desc: "받으면 행복할 것 같다" }, //ㅎㅇ
    "블롭피쉬": { img: "assets/images/items/blobfish.png", desc: "오우..." }, //ㅎㅇ
    "도토리": { img: "assets/images/items/acorn.png", desc: "다람쥐가 좋아할 것 같다" }, //ㅎㅇ
    "에너지 드링크": { img: "assets/images/items/energytonic.png", desc: "피로가 싹 가신다" } //ㅎㅇ
};

// --- 5. 엔딩 스크립트 데이터 (순애 6명 + 양다리 1명) ---
const endingScripts = {
    sion: {
        title: "시온과의 따뜻한 티타임",
        image: "assets/images/portraits/sion_happy.png",
        text: "어, {user}님. 아직 안 가셨네요? 해 졌는데.\n기다려봐요. 농장까지 같이 가요. 가로등도 별로 없어서 위험해요.\n...저기, 혹시 이번 주말에 시간 괜찮으세요?\n얼마 전에 진짜 괜찮은 원두를 구했거든요. 향이 진짜 좋은데...\n제일 먼저 {user}님한테 내려주고 싶어요. ...우리 집 놀러 올래요?\n맛있는 커피랑, 귀여운 소들이랑... 그리고 저도 기다리고 있을게요."
    },
    riku: {
        title: "리쿠의 영원한 단짝",
        image: "assets/images/portraits/riku_happy.png",
        text: "누나누나!! 이제 어디 가면 안 대여 알겟져?\n\n리쿠는 누나랑 평생~ 같이 놀 거야!\n약속 도장 꾹!! 헤헤, 사랑해여!!"
    },
    yushi: {
        title: "수줍은 고백",
        image: "assets/images/portraits/yushi_happy.png",
        text: "(숲속 깊은 곳, 유우시가 나무 그루터기에 앉아 하늘을 보고 있다.)\n\n어 ? {user} ! 어떻게 알고 왔어요 ? 여기 제 비밀 기지인데 😙\n사실.. 아까부터 {user} 생각을 좀 하고 있었거든요.\n\n저는 원래 혼자 있는 게 제일 편하거든요 ? 누가 옆에 있으면 신경 쓰이고.. 귀찮고.."
    },
    jaehee: {
        title: "든든한 파트너",
        image: "assets/images/portraits/jaehee_happy.png",
        text: "허허, 농장주님만큼 저랑 잘 맞는 사람은 처음 봤습니다.\n\n우리 둘이 힘을 합치면 못 할 게 없겠죠.\n앞으로도 잘 부탁합니다, 나의 파트너."
    },
    ryo: {
        title: "최고의 콤비",
        image: "assets/images/portraits/ryo_happy.png",
        text: "야하~ 역시 누나가 최고야!\n\n나랑 같이 있으면 심심할 틈 없을걸?\n내가 매일매일 웃게 해 줄게! 진짜루!"
    },
    sakuya: {
        title: "달콤한 빵 냄새",
        image: "assets/images/portraits/sakuya_happy.png",
        text: "갓 구운 빵 냄새보다 농장주님이 더 좋은걸요?\n\n매일 아침 맛있는 빵과 함께 당신을 기다릴게요.\n저랑.. 사귀어 주실래요?"
    },
    // 양다리 엔딩 (호감도 높은 사람이 2명 이상일 때)
    cheater: {
        title: "위시 밸리의 카사노바",
        image: "assets/images/ui/star_icon.png", // 또는 경고 이미지
        text: "시온: 농장주님.. 저한테만 잘해주신 게 아니었나요?\n리쿠: 누나 미워!! 리쿠만 좋아한다구 해짜나!!\n\n모두의 마음을 얻으려다 결국 신뢰를 잃고 말았습니다...\n(Bad Ending?)"
    },
    // 노말 엔딩 (호감도 부족)
    normal: {
        title: "평화로운 귀농 생활",
        image: "assets/images/backgrounds/farm.png",
        text: "7일간의 체험이 끝났습니다.\n특별한 인연은 만들지 못했지만, 훌륭한 농장주가 되었습니다.\n\n- The End -"
    }
};

// [신규] 5일차 퀘스트 데이터 (편지 내용 + 요구 아이템 + 보상 대사)
const questScripts = {
    riku: {
        letter: "누나.. 리쿠는 쪼금 서운해여.. ㅠㅠ 나 '딸기'가 진짜 먹고 싶은데.. 구해줄 수 이써여?",
        item: "딸기", // 인벤토리의 아이템 이름과 정확히 일치해야 함
        success: { text: "와아!! 진짜 구해왔네?! 역시 누나밖에 없어! 사랑해!!", emotion: "love" }
    },
    sion: {
        letter: "{user} 님, 안녕하세요. 시온입니다. 이런 부탁 드리기 좀 민망하지만... 믿을 만한 분이 {user} 님밖에 없어서요. 사실 제가 어제 숲으로 현장 점검을 나갔다가 아끼는 만년필을 잃어버린 것 같아요. 아버지께 선물 받은 거라 저한테는 정말 소중한 물건이거든요. 제 기억으로는 벚꽃 나무 근처에서 지도를 펼치다가 떨어뜨린 것 같은데... 혹시 농장 일하시다가 숲에 가실 일 있으면 한 번만 찾아봐 주실 수 있을까요? 다른 사람한테 말하면 관리자가 칠칠맞게 물건이나 잃어버린다고 할까 봐... {user} 님한테만 말씀드리는 거예요. 비밀 지켜주실 거죠? 만약 찾게 되면 꼭 사례하겠습니다.",
        item: "만년필",
        success: { text: "(눈이 휘둥그레지며) 어! 이거... 제 만년필! 진짜 찾으셨어요? 숲이 넓어서 포기하고 있었는데... 정말 감사합니다. 이거 저한테 진짜 의미 있는 거거든요. 잃어버린 줄 알고 어제 잠도 한숨 못 잤는데...", emotion: "happy" }
    },
    yushi: {
        letter: "에.. 큰일 났어요.. ㅠ_ㅠ {user}.. 저예요, 유우시.. 지금 제가 너무 슬퍼서 글씨가 좀 삐뚤빼뚤해도 이해해 주세요.. 제가 제일 아끼는 '필름 카메라'가 없어졌어요 ! 거기 안에 우리 멤버들이랑 찍은 사진도 있고.. 정말 소중한 추억들이 다 들어있는데.. ㅠ_ㅠ 아까 스타주점에 빵 먹으러 갔을 때까지만 해도 있었던 것 같은데.. 다시 가보니까 없더라고요.. 누가 가져간 건 아니겠지요 ? 혹시라도 주점 근처에서 카메라를 줍게 된다면 저에게 꼭 ! 가져다주세요.. 사례는 제가 제일 좋아하는 푸딩으로 할게요.. 부탁해요 {user} !",
        item: "우유",
        success: { text: "와.. 진짜 찾았네요 ? 대박.. {user}는 천사예요 ? 고마워요 ! 이 은혜는 절대 안 잊을게요 ^_^ 우리 기념으로 사진 한 장 찍을까요 ?", emotion: "happy" }
    },
    // 나머지 멤버들도 같은 형식으로 추가 (jaehee, ryo, sakuya 등)
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

























