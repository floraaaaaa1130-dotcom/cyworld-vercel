/* ==========================================================================
   WISH VALLEY - Main Game Logic
   파일명: js/main.js
   설명: 게임의 핵심 로직(이동, UI, 상호작용, 아이템, 대화, 엔딩 등)을 담당합니다.
   ========================================================================== */

// --- 1. 게임 상태 데이터 (Game State) ---
let gameState = {
    day: 1, 
    energy: 4, 
    weather: '맑음', 
    currentLocation: 'farm',
    inventory: [], 
    affinities: { sion: 0, riku: 0, yushi: 0, jaehee: 0, ryo: 0, sakuya: 0 },
    hasGiftedToday: {}, // 오늘 선물 줬는지 체크 (NPC별)
    hasTalkedToday: {}, // 오늘 대화했는지 체크 (NPC별)
    playerName: "농장주", // 플레이어 이름
    isEnding: false, // 엔딩 진행 중인지 여부
   // ★ [추가] 퀘스트 상태 저장 (target: 누구, item: 뭘 원하는지)
   activeQuest: null
};

// ★ [추가] 입력창을 나중에 띄울지 판단하는 변수
let shouldShowInput = false;

// ★ [추가] 대화 끝난 후 멤버별 행동 묘사 (원하는 멘트로 수정하세요)
const npcActions = {
    sion: "(멍하니 하늘을 바라보고 있다...)",
    riku: "(무언가 골똘히 생각하는 듯하다.)",
    yushi: "(작게 콧노래를 흥얼거리고 있다.)",
    jaehee: "(가볍게 스트레칭을 하고 있다.)",
    ryo: "(먼 곳을 응시하고 있다.)",
    sakuya: "(주변을 두리번거리고 있다.)"
};

// --- 전역 변수 (Global Variables) ---
let dialogueQueue = []; // 대사 목록 큐
let currentDialogueIndex = 0; // 현재 대사 순서
let isTyping = false; // 타자 효과 진행 중?
let typingInterval = null; // 타자 효과 타이머
let currentFullText = ""; // 현재 출력 중인 전체 텍스트 (스킵용)
let lastInteractedNPC = null; // 마지막으로 대화한 NPC 키

let selectedSlotIndex = null; // 인벤토리에서 선택된 슬롯 번호
let selectedItems = []; // 조합을 위해 선택된 아이템들
let isDeleteMode = false; // 아이템 삭제 모드 여부
let currentPopupItem = null; // 현재 정보창에 띄운 아이템
let currentEndingData = null;


// --- 오디오 설정 (Audio) ---
const sfx = {
    click: new Audio('assets/sounds/sfx/click.mp3'),
    success: new Audio('assets/sounds/sfx/success.mp3'),
    walk: new Audio('assets/sounds/sfx/footstep.mp3')
};
let currentBgm = null;

function playSfx(type) {
    // 오디오 파일이 없어도 에러가 안 나도록 처리
    if(sfx[type]) {
        sfx[type].currentTime = 0;
        sfx[type].play().catch(e => console.log("오디오 파일 없음: " + type));
    }
}

function changeBgm(fileName) {
    if (currentBgm) currentBgm.pause();
    currentBgm = new Audio(`assets/sounds/bgm/${fileName}`);
    currentBgm.loop = true;
    currentBgm.play().catch(e => console.log("BGM 파일 없음"));
}


/* ==========================================================================
   2. 게임 시작 및 오프닝 (Start & Intro)
   ========================================================================== */

// 페이지 로드 시 실행
window.onload = () => {
    console.log("게임 로드 완료! 오프닝 대기 중...");
};

// '시작하기' 버튼 -> 이름 입력창 표시
function showNameInput() {
    document.getElementById('menu-area').classList.add('hidden');
    document.getElementById('name-input-area').classList.remove('hidden');
    playSfx('click');
}

// '취소' 버튼 -> 다시 메뉴로
function hideNameInput() {
    document.getElementById('name-input-area').classList.add('hidden');
    document.getElementById('menu-area').classList.remove('hidden');
    playSfx('click');
}

// 진짜 게임 시작 (이름 저장 후 농장으로 이동)
function startGame() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();

    if (name.length === 0) {
        alert("이름을 입력해주세요!");
        return;
    }

    gameState.playerName = name;
    playSfx('success');
    
    // 오프닝 화면 숨기고 게임 시작
    document.getElementById('intro-screen').classList.add('hidden');
    updateUI(); 
    move('farm'); // 첫 장소로 이동
}

// 설명서, 크레딧 팝업 열기/닫기
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    playSfx('click');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    playSfx('click');
}


/* ==========================================================================
   3. 이동 시스템 (Movement)
   ========================================================================== */

function move(locId) {
    // 에너지가 없으면 이동 불가 (잠자기 유도)
    if (gameState.energy <= 0) { 
        alert("에너지가 부족합니다! 잠을 자야 해요."); 
        // 3번째 이동(에너지0) 직후라면 바로 알림바를 띄워줌
        showSleepAlert();
        return;
    }

    playSfx('walk');
    gameState.currentLocation = locId;
    
    // 에너지 차감
    gameState.energy--; 
    
    updateUI();
    renderLocation(); // 화면 갱신

    // 이동 횟수를 다 쓰면(에너지 0) 잠자기 알림바 표시
    if (gameState.energy === 0) {
        showSleepAlert();
    }
}

function renderLocation() {
    const loc = locations[gameState.currentLocation];
    const view = document.getElementById('location-view');
    view.style.backgroundImage = `url(${loc.bg})`;

    // 1. 아이템(채집물) 그리기
    const itemLayer = document.getElementById('item-layer');
    itemLayer.innerHTML = "";
    if (loc.items) {
        loc.items.forEach(itemName => {
            createItemElement(itemName);
        });
    }

    // 2. NPC 그리기
    const npcLayer = document.getElementById('npc-layer');
    npcLayer.innerHTML = "";
    
    for (let key in npcs) {
        const npc = npcs[key];
        // 날씨에 따라 NPC 위치 결정 (비 오면 rainy, 맑으면 sunny)
        const targetLoc = gameState.weather === '비' ? npc.locations.rainy : npc.locations.sunny;
        
        if (targetLoc === gameState.currentLocation) {
            const npcSprite = document.createElement('div');
            npcSprite.className = "npc-sprite"; 
            npcSprite.style.backgroundImage = `url(${npc.sprite})`; // 스프라이트 이미지
            
            // NPC 클릭 시 대화 시작
            npcSprite.onclick = () => openDialogue(key);
            npcLayer.appendChild(npcSprite);
        }
    }
}

// 채집물 생성 함수
function createItemElement(itemName) {
    const item = document.createElement('div');
    item.className = "collectible-item"; 

    // 화면 내 랜덤 위치 (10% ~ 90% 범위)
    item.style.left = Math.random() * 80 + 10 + "%";
    item.style.top = Math.random() * 50 + 30 + "%";

    // 아이템 이미지 적용
    if (itemData[itemName] && itemData[itemName].img) {
        item.style.backgroundImage = `url(${itemData[itemName].img})`;
        item.style.backgroundSize = "contain";
        item.style.backgroundRepeat = "no-repeat";
    } else {
        item.innerText = "?"; // 이미지 없으면 물음표
    }

    // 아이템 클릭 시 획득
    item.onclick = () => { 
        collectItem(itemName); 
        item.remove(); 
    };
    
    document.getElementById('item-layer').appendChild(item);
}


/* ==========================================================================
   4. 인벤토리 및 아이템 시스템 (Inventory & Items)
   ========================================================================== */

function collectItem(name) {
    if (gameState.inventory.length >= 8) { 
        alert("가방이 꽉 찼어요!"); 
        return; 
    }
    gameState.inventory.push(name);
    playSfx('success');
    updateUI(); // 하단 미니 인벤토리 갱신
}

// 인벤토리 팝업 열기/닫기
function toggleInventory() {
    const modal = document.getElementById('inventory-modal');
    
    // hidden 클래스 토글 (보였다 안 보였다)
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        // 열릴 때 초기화
        isDeleteMode = false;
        document.getElementById('delete-toggle-btn').classList.remove('active');
        selectedItems = []; 
        renderInventorySlots(); // 팝업 내부 슬롯 그리기
    } else {
        modal.classList.add('hidden');
    }
}

// 팝업 내부 슬롯 그리기 (핵심 기능)
function renderInventorySlots() {
    const grid = document.querySelector('.inventory-grid');
    grid.innerHTML = "";
    
    // 삭제 모드 스타일 적용
    if (isDeleteMode) grid.classList.add('delete-mode');
    else grid.classList.remove('delete-mode');

    // 슬롯 8개 생성 (큰 가방)
    for (let i = 0; i < 8; i++) {
        const slot = document.createElement('div');
        slot.className = "item-slot";
        
        const itemName = gameState.inventory[i];
        
        if (itemName) {
            // 이미지 표시
            if (itemData[itemName] && itemData[itemName].img) {
                const img = document.createElement('img');
                img.src = itemData[itemName].img;
                img.style.width = "100%"; 
                img.style.height = "100%";
                img.style.objectFit = "contain";
                slot.appendChild(img);
            } else {
                slot.innerText = itemName;
            }

            // 클릭 이벤트
            slot.onclick = () => {
                if (isDeleteMode) {
                    // 삭제 모드: 아이템 버리기
                    if (confirm(`정말 [${itemName}] 아이템을 버릴까요?`)) {
                        gameState.inventory.splice(i, 1);
                        playSfx('click');
                        renderInventorySlots();
                        updateUI();
                    }
                } else {
                    // 일반 모드: 정보창 보기 & 선택
                    showItemInfo(itemName);
                    // 하단바에서도 선택된 걸로 처리 (선물하기 연동)
                    selectSlot(i); 
                }
            };

            // 조합을 위해 선택된 아이템 표시
            if (!isDeleteMode && selectedItems.includes(itemName)) {
                slot.style.backgroundColor = "var(--pastel-pink)";
                slot.style.borderColor = "var(--deep-pink)";
            }

        } else {
            slot.style.cursor = "default"; // 빈 슬롯
        }
        
        grid.appendChild(slot);
    }
}

// 하단 미니 인벤토리 슬롯 선택
function selectSlot(index) {
    selectedSlotIndex = index;
    // 모든 슬롯 테두리 초기화
    document.querySelectorAll('.slot').forEach(s => s.style.borderColor = "var(--deep-green)");
    
    // 선택된 슬롯 노란색 강조
    const targetSlot = document.querySelectorAll('.slot')[index];
    if (targetSlot && gameState.inventory[index]) {
        targetSlot.style.borderColor = "yellow";
        playSfx('click');
    }
}

// 조합 기능
function combineItems() {
    if (selectedItems.length < 2) { 
        alert("재료를 2개 이상 선택해 주세요!"); 
        return; 
    }
    // 레시피 찾기
    const recipe = recipes.find(r => 
        r.ingredients.length === selectedItems.length &&
        r.ingredients.every(ing => selectedItems.includes(ing))
    );

    if (recipe) {
        playSfx('success');
        // 재료 삭제
        selectedItems.forEach(ing => {
            const idx = gameState.inventory.indexOf(ing);
            if (idx > -1) gameState.inventory.splice(idx, 1);
        });
        // 결과물 추가
        gameState.inventory.push(recipe.result);
        alert(`짠! [${recipe.result}]을(를) 만들었어요!`);
        
        // 초기화 및 UI 갱신
        selectedItems = [];
        renderInventorySlots();
        updateUI();
    } else { 
        alert("음.. 아무 일도 일어나지 않았습니다."); 
        selectedItems = [];
        renderInventorySlots();
    }
}

// 아이템 정보 팝업
function showItemInfo(itemName) {
    currentPopupItem = itemName;
    const data = itemData[itemName];
    
    document.getElementById('info-name').innerText = itemName;
    document.getElementById('info-desc').innerText = data ? data.desc : "정보 없음";
    
    const img = document.getElementById('info-image');
    if (data && data.img) {
        img.src = data.img;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }

    document.getElementById('item-info-modal').classList.remove('hidden');
}

function closeItemInfo() {
    document.getElementById('item-info-modal').classList.add('hidden');
    currentPopupItem = null;
}

// 정보창에서 '조합 담기' 버튼 클릭 시
function selectForCombine() {
    if (!currentPopupItem) return;
    if (selectedItems.includes(currentPopupItem)) {
        alert("이미 담은 아이템입니다!");
    } else {
        selectedItems.push(currentPopupItem);
        renderInventorySlots(); // 선택 표시 갱신
    }
    closeItemInfo();
}

// 삭제 모드 토글
function toggleDeleteMode() {
    isDeleteMode = !isDeleteMode;
    const btn = document.getElementById('delete-toggle-btn');
    const grid = document.querySelector('.inventory-grid');
    
    if (isDeleteMode) {
        btn.classList.add('active'); // 버튼 스타일 변경 (CSS 필요)
        grid.classList.add('delete-mode');
        alert("버릴 아이템을 클릭하세요.");
    } else {
        btn.classList.remove('active');
        grid.classList.remove('delete-mode');
    }
}


/* ==========================================================================
   5. 대화 시스템 (Dialogue System)
   ========================================================================== */

// [교체] 대화창 열기 함수
function openDialogue(npcKey) {
    lastInteractedNPC = npcKey; 
    const overlay = document.getElementById('dialogue-overlay');
    overlay.classList.remove('hidden');

   // ★ [수정] 대화 시작 시 변수 초기화 (이전 상태 잔상 방지)
    shouldShowInput = false;
    
    // ★ 1. 일단 모든 입력창과 버튼을 숨기고 시작합니다. (텍스트가 먼저 나오게!)
    const inputArea = document.getElementById('input-area');
    inputArea.classList.add('hidden'); 
    
    // 일반 대화에서는 입력창 숨기고 시작 (타자 끝난 후 표시)
    document.getElementById('input-area').classList.add('hidden'); 
    document.getElementById('choice-area').classList.add('hidden');
    
    // 버튼 기능 연결
    const giftBtn = document.getElementById('gift-btn');
    const sendBtn = document.getElementById('send-btn');
    const keywordInput = document.getElementById('keyword-input');
    
    if(giftBtn) giftBtn.onclick = () => giveGift(npcKey);
    if(sendBtn) sendBtn.onclick = () => sendKeyword(npcKey);

    // --- [대화 로직 분기] ---
    
    // CASE 1: 오늘 이미 대화를 한 경우 (행동 묘사)
    if (gameState.hasTalkedToday[npcKey]) {
        const actionText = npcActions[npcKey] || "(멍을 때리고 있다...)";
        dialogueQueue = [{ text: actionText, emotion: 'default' }];
        currentDialogueIndex = 0;

// ★ [수정] 선물 안 줬을 때만 '선물 버튼' 표시
        if (!gameState.hasGiftedToday[npcKey]) {
            keywordInput.classList.add('hidden'); // 키워드 입력 숨김 (확실하게!)
            sendBtn.classList.add('hidden');      // 말하기 버튼 숨김 (확실하게!)
            giftBtn.classList.remove('hidden');   // 선물 버튼만 보임
            shouldShowInput = true; 
        } else {
            // 이미 선물도 줬으면 아무 버튼도 안 보여줌
            shouldShowInput = false;
        }

        showNextLine(npcKey);
    } 
    // CASE 2: 오늘 첫 대화인 경우
    else {
        gameState.hasTalkedToday[npcKey] = true; // 대화함 체크

        // ★ 입력창 설정: 모든 기능 활성화 (하지만 아직은 숨겨둠)
        keywordInput.classList.remove('hidden');
        sendBtn.classList.remove('hidden');
        giftBtn.classList.remove('hidden');
        shouldShowInput = true; // 타자 끝나면 보여줘!

        // 대사 데이터 가져오기 (날짜별 -> 랜덤)
        let scriptData = null;
        if (dailyScripts[gameState.day] && dailyScripts[gameState.day][npcKey]) {
            scriptData = dailyScripts[gameState.day][npcKey];
        } else if (randomDialogues[npcKey]) {
            const weather = gameState.weather;
            const list = randomDialogues[npcKey][weather];
            if(list) scriptData = list[Math.floor(Math.random() * list.length)];
        }

        if (!scriptData) scriptData = [{ text: "안녕하세요.", emotion: "default" }];
        if (!Array.isArray(scriptData)) scriptData = [scriptData];

        dialogueQueue = scriptData;
        currentDialogueIndex = 0;
        showNextLine(npcKey);
    }
}

// [수정] 다음 대사 출력 (NPC가 없을 때 안전장치 추가)
function showNextLine(npcKey) {
    const data = dialogueQueue[currentDialogueIndex];
    const portraitDiv = document.getElementById('dialogue-portrait');
    const portraitImg = document.getElementById('current-portrait');
   
    // ★★★ [수정] if 문 추가됨 ★★★
    if (npcs[npcKey]) { 
        // NPC가 있을 때
        portraitDiv.style.display = 'block'; 
        const npc = npcs[npcKey];
        const emotion = data.emotion || 'default';
        portraitImg.src = npc.portraits[emotion] || npc.portraits['default'];
    } else {
        // NPC가 없을 때 (엔딩 등)
        portraitDiv.style.display = 'none'; 
    }
   
    // 텍스트 출력
    const textZone = document.getElementById('dialogue-text');
    let textContent = data.text.replace(/{user}/g, gameState.playerName);
    typeWriter(textContent, textZone);
}

// 타자 효과
function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.innerHTML = "";
    isTyping = true;
    currentFullText = text;
    document.getElementById('next-cursor').classList.add('hidden'); 

    if (typingInterval) clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) finishTyping();
    }, speed);
}

// [수정] 타자 효과 종료 후 처리 (대사 타입 분기)
function finishTyping() {
    clearInterval(typingInterval);
    isTyping = false;
    document.getElementById('dialogue-text').innerHTML = currentFullText;
    
    const currentData = dialogueQueue[currentDialogueIndex];
    const inputArea = document.getElementById('input-area');
    const choiceArea = document.getElementById('choice-area');
    const nextCursor = document.getElementById('next-cursor');

    // 초기화: 모든 입력 UI 일단 숨김
    inputArea.classList.add('hidden');
    choiceArea.classList.add('hidden');
    nextCursor.classList.add('hidden');

    // --- [1] 선택지형 대사 ---
    if (currentData.choices) {
        renderChoices(currentData.choices);
    } 
    // --- [2] 키워드 입력형 대사 ---
    else if (currentData.type === "keyword") {
        inputArea.classList.remove('hidden'); // 입력창 표시
        document.getElementById('keyword-input').value = ""; // 입력란 비우기
        document.getElementById('keyword-input').placeholder = "답변을 입력하세요...";
        
        // 전송 버튼에 현재 대사 데이터(정답지)를 연결
        const sendBtn = document.getElementById('send-btn');
        sendBtn.onclick = () => checkKeywordAnswer(currentData);
    }
    // --- [3] 일반 대사 (그냥 읽고 넘기기) ---
    else {
        nextCursor.classList.remove('hidden'); // 다음 화살표 표시
    }
}

// 선택지 표시
function renderChoices(choices) {
    const choiceArea = document.getElementById('choice-area');
    choiceArea.innerHTML = "";
    choiceArea.classList.remove('hidden');

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = choice.label;
        
        btn.onclick = (e) => {
            e.stopPropagation();
            // 호감도 반영
            if (choice.score) gameState.affinities[lastInteractedNPC] += choice.score;
            
            // 답변 대사로 이어가기
            dialogueQueue = [{ 
                text: choice.reply, 
                emotion: choice.score > 0 ? "happy" : "shock" 
            }]; 
            currentDialogueIndex = 0;
            choiceArea.classList.add('hidden');
            showNextLine(lastInteractedNPC);
        };
        choiceArea.appendChild(btn);
    });
}

// 키워드 대화 기능
// [신규] 키워드 정답 체크 함수
function checkKeywordAnswer(currentData) {
    const inputVal = document.getElementById('keyword-input').value.trim();
    if (!inputVal) return; // 빈칸이면 무시

    let reaction = currentData.answers.default; // 기본 반응 설정

    // 정답 키워드 찾기 (포함 여부 확인)
    // 예: "노란"이 키워드라면 "노란색"이라고 입력해도 정답 처리
    for (let key in currentData.answers) {
        if (key !== "default" && inputVal.includes(key)) {
            reaction = currentData.answers[key];
            break;
        }
    }

    // 호감도 반영
    if (reaction.score) {
        gameState.affinities[lastInteractedNPC] += reaction.score;
    }

    // 반응 대사 출력
    // 배열로 만들어서 대사 큐에 넣음 (반응 후 대화가 이어지거나 끝남)
    dialogueQueue = [reaction];
    currentDialogueIndex = 0;

    // 입력창 숨기고 대사 출력
    document.getElementById('input-area').classList.add('hidden');
    showNextLine(lastInteractedNPC);
}

// 선물하기 기능
function giveGift(npcKey) {
    if (selectedSlotIndex === null || !gameState.inventory[selectedSlotIndex]) {
        alert("먼저 인벤토리(가방)에서 줄 선물을 선택해주세요!");
        return;
    }
    if (gameState.hasGiftedToday[npcKey]) {
        alert("오늘은 이미 선물을 줬어요!");
        return;
    }

    const item = gameState.inventory[selectedSlotIndex];
    const npc = npcs[npcKey];

   // ★★★ [추가] 퀘스트 아이템 체크 로직 시작 ★★★
    if (gameState.activeQuest && 
        gameState.activeQuest.target === npcKey && 
        gameState.activeQuest.item === item) {
        
        // 1. 퀘스트 성공 처리 (호감도 대폭 상승)
        gameState.affinities[npcKey] += 50; // 50점 보너스!
        gameState.hasGiftedToday[npcKey] = true;
        
        // 2. 아이템 소모
        gameState.inventory.splice(selectedSlotIndex, 1);
        selectedSlotIndex = null;
        shouldShowInput = false;

        // 3. 퀘스트 성공 대사 출력
        const successDialogue = questScripts[npcKey].success;
        displayDialogue(npcKey, successDialogue);
        
        // 4. 퀘스트 종료 (초기화)
        gameState.activeQuest = null;
        
        updateUI();
        playSfx('success');
        return; // 여기서 함수 종료 (일반 선물 로직 실행 안 함)
    }
    // ★★★ [추가] 퀘스트 아이템 체크 로직 끝 ★★★
    
    let points = 5;
    let response = npc.giftReactions?.default || { text: "고마워요.", emotion: "default" };

    if (npc.gifts.love.includes(item)) {
        points = 20;
        if(npc.giftReactions?.love) response = npc.giftReactions.love;
    } else if (npc.gifts.hate.includes(item)) {
        points = -10;
        if(npc.giftReactions?.hate) response = npc.giftReactions.hate;
    }

    gameState.affinities[npcKey] += points;
    gameState.hasGiftedToday[npcKey] = true;
    
    // 아이템 제거
    gameState.inventory.splice(selectedSlotIndex, 1);
    selectedSlotIndex = null;

   // ★ [수정] 선물 준 직후에는 입력창이 다시 뜨지 않도록 설정
    shouldShowInput = false;

    displayDialogue(npcKey, response); // 반응 대사 출력
    updateUI();
    playSfx('success');
}

// [수정] 대화창 클릭 처리
document.getElementById('dialogue-overlay').onclick = (e) => {
    // 버튼, 입력창 클릭은 무시
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

    // 타자 치는 중이면 스킵
    if (isTyping) {
        finishTyping(); 
        return;
    }

    const currentData = dialogueQueue[currentDialogueIndex];

    // ★ 중요: 선택지나 키워드 입력 상태면 클릭으로 넘어가지 않음
    if (currentData.choices || currentData.type === "keyword") return;

    // 다음 대사가 있으면 진행
    if (currentDialogueIndex < dialogueQueue.length - 1) {
        currentDialogueIndex++;
        showNextLine(lastInteractedNPC);
        return;
    }

// 대사가 끝났으면 창 닫
    if (gameState.isEnding) {
        showFinalPopup();
    } else {
        document.getElementById('dialogue-overlay').classList.add('hidden');
    }

    // 5. [핵심 수정] 일반 대화 종료 처리
    const inputArea = document.getElementById('input-area');

    // 이미 입력창이 떠 있는 상태에서 배경을 누르면 -> 창 닫기
    if (!inputArea.classList.contains('hidden')) {
        document.getElementById('dialogue-overlay').classList.add('hidden');
        return;
    }

    // 대사가 끝났을 때: 입력창을 띄울지, 그냥 닫을지 결정
    if (shouldShowInput) {
        // 더 할 말이 있으면 (선물 안 줬거나 첫 대화 등) -> 입력창 표시
        document.getElementById('next-cursor').classList.add('hidden');
        inputArea.classList.remove('hidden');
        document.getElementById('dialogue-text').innerText = ""; 
    } else {
        // 더 할 말이 없으면 (선물 준 직후 등) -> 대화창 닫기
        document.getElementById('dialogue-overlay').classList.add('hidden');
    }
};

function displayDialogue(npcKey, dialogueObj) {
    dialogueQueue = [dialogueObj];
    currentDialogueIndex = 0;
    document.getElementById('input-area').classList.add('hidden');
    showNextLine(npcKey);
}


/* ==========================================================================
   6. 시간 및 UI 관리 (Time & UI)
   ========================================================================== */

function updateUI() {
    // 1. 날짜, 날씨, 에너지 업데이트
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "♥";
    for(let i=gameState.energy; i<3; i++) hearts += "♡"; // 최대 에너지 3 기준
    document.getElementById('energy-hearts').innerText = hearts;
    
    // 2. 하단 미니 인벤토리 슬롯 업데이트
    const slots = document.querySelectorAll('#inventory-slots .slot');
    slots.forEach((slot, index) => {
        slot.innerHTML = "";
        const itemName = gameState.inventory[index];
        
        if (itemName) {
            if (itemData[itemName] && itemData[itemName].img) {
                const img = document.createElement('img');
                img.src = itemData[itemName].img;
                img.style.width = "30px"; img.style.height = "30px";
                slot.appendChild(img);
            } else {
                slot.innerText = itemName;
            }
        }
        slot.style.borderColor = "var(--deep-green)"; // 초기화
    });

    // 선택된 슬롯 강조
    if (selectedSlotIndex !== null && slots[selectedSlotIndex]) {
        slots[selectedSlotIndex].style.borderColor = "yellow";
    }
}

// 잠자기 알림바 표시
function showSleepAlert() {
    document.getElementById('sleep-alert').classList.remove('hidden');
}

// 잠자기 버튼 -> 밤 화면(정산)으로
function goToSleep() {
    document.getElementById('sleep-alert').classList.add('hidden');
    
    const nightOverlay = document.getElementById('night-overlay');
    nightOverlay.classList.remove('hidden');
    
    // 정산 내용 표시 (예: 획득한 아이템 등)
    // const summary = document.getElementById('daily-summary');
    // summary.innerText = `오늘의 성과: ...`; 
}

// 다음 날 시작
function startNextDay() {
    // 7일차면 엔딩 체크
    if (gameState.day >= 7) { 
        checkEnding(); 
        return; 
    }
    
    gameState.day++;
    gameState.energy = 4; // 에너지 충전
   // ★ [추가] 하루가 지났으니 기록 초기화
    gameState.hasGiftedToday = {}; 
    gameState.hasTalkedToday = {};
    
    // 날씨 랜덤 변경
    const weathers = ['맑음', '맑음', '비', '벚꽃'];
    gameState.weather = weathers[Math.floor(Math.random() * weathers.length)];
    
    document.getElementById('night-overlay').classList.add('hidden');
    updateUI(); 
    move('farm'); // 집(농장)에서 시작

   // ★★★ [추가] 5일차 아침 퀘스트 발생 로직 ★★★
    if (gameState.day === 5) {
        triggerDay5Quest();
    }
}

// [신규] 5일차 퀘스트 트리거 함수
function triggerDay5Quest() {
    // 1. 호감도 내림차순 정렬
    const sorted = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    
    // 2. 2위 찾기 (없으면 1위라도 선택, 그것도 없으면 패스)
    let targetEntry = sorted[1] ? sorted[1] : sorted[0];
    
    if (!targetEntry) return; // 혹시라도 데이터가 없으면 종료

    const targetNpcKey = targetEntry[0];
    const questData = questScripts[targetNpcKey];

    if (questData) {
        // 3. 퀘스트 상태 저장
        gameState.activeQuest = {
            target: targetNpcKey,
            item: questData.item
        };

        // 4. 편지 팝업 띄우기
        const modal = document.getElementById('letter-modal');
        const text = document.getElementById('letter-text');
        
        text.innerText = questData.letter;
        modal.classList.remove('hidden');
        playSfx('success'); // 알림음 (있으면)
    }
}

// 편지 닫기 함수
function closeLetter() {
    document.getElementById('letter-modal').classList.add('hidden');
}

/* ==========================================================================
   7. 엔딩 시스템 (Ending)
   ========================================================================== */

// [수정] 엔딩 체크 함수
function checkEnding() {
    gameState.isEnding = true; // 엔딩 모드 ON
    document.getElementById('night-overlay').classList.add('hidden'); // 밤 화면 끄기
    document.getElementById('dialogue-overlay').classList.add('hidden'); // 대화창 일단 끄기 (리셋용)

    // 호감도 정렬
    const sorted = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    const topNpcKey = sorted[0][0];
    const topScore = sorted[0][1];
    
    // 양다리 체크 (80점 이상이 2명 이상)
    const highAffinityCount = sorted.filter(item => item[1] >= 80).length;

    let endingData = null;
    let targetNpc = null; // 엔딩 주인공 키

    if (highAffinityCount >= 2 && endingScripts.cheater) {
        endingData = endingScripts.cheater;
        targetNpc = null; // 특수 엔딩은 NPC 없음
    } else if (topScore >= 80 && endingScripts[topNpcKey]) {
        endingData = endingScripts[topNpcKey];
        targetNpc = topNpcKey; // 해당 NPC 지정
    } else {
        endingData = endingScripts.normal;
        targetNpc = null;
    }

    // 엔딩 연출 시작 (데이터와 NPC키 전달)
    playEndingSequence(endingData, targetNpc);
}

// [수정] 엔딩 연출 시작 (대화창 모드)
function playEndingSequence(data, npcKey) {
    if (!data) return;
    
    currentEndingData = data; // 나중에 팝업 띄울 때 쓰려고 저장
    gameState.isEnding = true;
   lastInteractedNPC = npcKey; // 엔딩 주인공 설정

    // 1. UI 및 방해 요소 제거 (인벤토리, 상태바, 아이템 등)
    document.getElementById('status-bar').style.display = 'none';
    document.getElementById('control-panel').style.display = 'none'; 
    document.getElementById('inventory-icon').classList.add('hidden');
    document.getElementById('delete-toggle-btn').classList.add('hidden');

    // 2. 화면에 떠있는 아이템과 NPC 지우기
    document.getElementById('item-layer').innerHTML = "";
    document.getElementById('npc-layer').innerHTML = "";

    // 3. 엔딩 전용 배경 적용 (data.bg가 있으면)
    if (data.bg) {
        document.getElementById('location-view').style.backgroundImage = `url(${data.bg})`;
    }

    // 4. 대화창 띄우기
    const overlay = document.getElementById('dialogue-overlay');
    overlay.classList.remove('hidden');
    
    document.getElementById('input-area').classList.add('hidden');
    document.getElementById('choice-area').classList.add('hidden');
    
    const lines = data.text.split('\n').filter(line => line.trim() !== "");
    
    dialogueQueue = lines.map(line => {
        return { text: line, emotion: 'happy' }; 
    });

    currentDialogueIndex = 0;
    showNextLine(lastInteractedNPC);
}

// 최종 팝업 (엔딩 결과 화면)
function showFinalPopup() {
    const overlay = document.getElementById('ending-overlay');
    const title = document.getElementById('ending-title');
    const img = document.getElementById('ending-image');
    const text = document.getElementById('ending-text'); 
    const btn = document.getElementById('restart-btn');

    title.innerText = currentEndingData.title; 
    if (currentEndingData.image) img.src = currentEndingData.image; 
    text.innerText = ""; 

    // 대화창 끄고 팝업 열기
    document.getElementById('dialogue-overlay').classList.add('hidden');
    overlay.classList.remove('hidden');
    
    setTimeout(() => {
        overlay.classList.add('visible');
    }, 50);
    
    btn.classList.remove('hidden');
}








