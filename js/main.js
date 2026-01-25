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

// ★ [추가] 입력창(선물 버튼 등)을 현재 대사와 함께 띄울지 판단하는 변수
let shouldShowInput = false;

// ★ [추가] 대화 끝난 후 멤버별 행동 묘사
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

window.onload = () => {
    console.log("게임 로드 완료! 오프닝 대기 중...");
};

function showNameInput() {
    document.getElementById('menu-area').classList.add('hidden');
    document.getElementById('name-input-area').classList.remove('hidden');
    playSfx('click');
}

function hideNameInput() {
    document.getElementById('name-input-area').classList.add('hidden');
    document.getElementById('menu-area').classList.remove('hidden');
    playSfx('click');
}

function startGame() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();

    if (name.length === 0) {
        alert("이름을 입력해주세요!");
        return;
    }

    gameState.playerName = name;
    playSfx('success');
    
    document.getElementById('intro-screen').classList.add('hidden');
    updateUI(); 
    move('farm'); 
}

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
    if (gameState.energy <= 0) { 
        alert("에너지가 부족합니다! 잠을 자야 해요."); 
        showSleepAlert();
        return;
    }

    playSfx('walk');
    gameState.currentLocation = locId;
    gameState.energy--; 
    
    updateUI();
    renderLocation(); 

    if (gameState.energy === 0) {
        showSleepAlert();
    }
}

function renderLocation() {
    const loc = locations[gameState.currentLocation];
    const view = document.getElementById('location-view');
    view.style.backgroundImage = `url(${loc.bg})`;

    const itemLayer = document.getElementById('item-layer');
    itemLayer.innerHTML = "";
    if (loc.items) {
        loc.items.forEach(itemName => {
            createItemElement(itemName);
        });
    }

    const npcLayer = document.getElementById('npc-layer');
    npcLayer.innerHTML = "";
    
    for (let key in npcs) {
        const npc = npcs[key];
        const targetLoc = gameState.weather === '비' ? npc.locations.rainy : npc.locations.sunny;
        
        if (targetLoc === gameState.currentLocation) {
            const npcSprite = document.createElement('div');
            npcSprite.className = "npc-sprite"; 
            npcSprite.style.backgroundImage = `url(${npc.sprite})`; 
            npcSprite.onclick = () => openDialogue(key);
            npcLayer.appendChild(npcSprite);
        }
    }
}

function createItemElement(itemName) {
    const item = document.createElement('div');
    item.className = "collectible-item"; 
    item.style.left = Math.random() * 80 + 10 + "%";
    item.style.top = Math.random() * 50 + 30 + "%";

    if (itemData[itemName] && itemData[itemName].img) {
        item.style.backgroundImage = `url(${itemData[itemName].img})`;
        item.style.backgroundSize = "contain";
        item.style.backgroundRepeat = "no-repeat";
    } else {
        item.innerText = "?"; 
    }

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
    updateUI(); 
}

function toggleInventory() {
    const modal = document.getElementById('inventory-modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        isDeleteMode = false;
        document.getElementById('delete-toggle-btn').classList.remove('active');
        selectedItems = []; 
        renderInventorySlots(); 
    } else {
        modal.classList.add('hidden');
    }
}

function renderInventorySlots() {
    const grid = document.querySelector('.inventory-grid');
    grid.innerHTML = "";
    
    if (isDeleteMode) grid.classList.add('delete-mode');
    else grid.classList.remove('delete-mode');

    for (let i = 0; i < 8; i++) {
        const slot = document.createElement('div');
        slot.className = "item-slot";
        const itemName = gameState.inventory[i];
        
        if (itemName) {
            if (itemData[itemName] && itemData[itemName].img) {
                const img = document.createElement('img');
                img.src = itemData[itemName].img;
                img.style.width = "100%"; img.style.height = "100%";
                img.style.objectFit = "contain";
                slot.appendChild(img);
            } else {
                slot.innerText = itemName;
            }

            slot.onclick = () => {
                if (isDeleteMode) {
                    if (confirm(`정말 [${itemName}] 아이템을 버릴까요?`)) {
                        gameState.inventory.splice(i, 1);
                        playSfx('click');
                        renderInventorySlots();
                        updateUI();
                    }
                } else {
                    showItemInfo(itemName);
                    selectSlot(i); 
                }
            };

            if (!isDeleteMode && selectedItems.includes(itemName)) {
                slot.style.backgroundColor = "var(--pastel-pink)";
                slot.style.borderColor = "var(--deep-pink)";
            }

        } else {
            slot.style.cursor = "default";
        }
        grid.appendChild(slot);
    }
}

function selectSlot(index) {
    selectedSlotIndex = index;
    document.querySelectorAll('.slot').forEach(s => s.style.borderColor = "var(--deep-green)");
    const targetSlot = document.querySelectorAll('.slot')[index];
    if (targetSlot && gameState.inventory[index]) {
        targetSlot.style.borderColor = "yellow";
        playSfx('click');
    }
}

function combineItems() {
    if (selectedItems.length < 2) { 
        alert("재료를 2개 이상 선택해 주세요!"); 
        return; 
    }
    const recipe = recipes.find(r => 
        r.ingredients.length === selectedItems.length &&
        r.ingredients.every(ing => selectedItems.includes(ing))
    );

    if (recipe) {
        playSfx('success');
        selectedItems.forEach(ing => {
            const idx = gameState.inventory.indexOf(ing);
            if (idx > -1) gameState.inventory.splice(idx, 1);
        });
        gameState.inventory.push(recipe.result);
        alert(`짠! [${recipe.result}]을(를) 만들었어요!`);
        selectedItems = [];
        renderInventorySlots();
        updateUI();
    } else { 
        alert("음.. 아무 일도 일어나지 않았습니다."); 
        selectedItems = [];
        renderInventorySlots();
    }
}

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

function selectForCombine() {
    if (!currentPopupItem) return;
    if (selectedItems.includes(currentPopupItem)) {
        alert("이미 담은 아이템입니다!");
    } else {
        selectedItems.push(currentPopupItem);
        renderInventorySlots(); 
    }
    closeItemInfo();
}

function toggleDeleteMode() {
    isDeleteMode = !isDeleteMode;
    const btn = document.getElementById('delete-toggle-btn');
    const grid = document.querySelector('.inventory-grid');
    if (isDeleteMode) {
        btn.classList.add('active');
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

// [교체] 대화창 열기 함수 (로직 단순화)
function openDialogue(npcKey) {
    lastInteractedNPC = npcKey; 
    const overlay = document.getElementById('dialogue-overlay');
    overlay.classList.remove('hidden');

    // ★ 대화 시작 시 기본값: 입력창 띄우지 않음
    shouldShowInput = false;
    
    // UI 초기화: 일단 모두 숨김
    const inputArea = document.getElementById('input-area');
    inputArea.classList.add('hidden'); 
    document.getElementById('choice-area').classList.add('hidden');
    
    // 버튼 기능 연결
    const giftBtn = document.getElementById('gift-btn');
    const sendBtn = document.getElementById('send-btn');
    
    if(giftBtn) giftBtn.onclick = () => giveGift(npcKey);
    if(sendBtn) sendBtn.onclick = () => sendKeyword(npcKey);

    // --- [대화 로직 분기] ---
    
    // CASE 1: 오늘 이미 대화를 한 경우 (행동 묘사 + 선물하기 버튼)
    if (gameState.hasTalkedToday[npcKey]) {
        const actionText = npcActions[npcKey] || "(멍을 때리고 있다...)";
        dialogueQueue = [{ text: actionText, emotion: 'default' }];
        currentDialogueIndex = 0;

        // ★ 이미 대화했으니, 아직 선물 안 줬으면 '타자 끝나고 버튼 보여줘' 설정
        if (!gameState.hasGiftedToday[npcKey]) {
            shouldShowInput = true; 
        } else {
            shouldShowInput = false;
        }

        showNextLine(npcKey);
    } 
    // CASE 2: 오늘 첫 대화인 경우 (스토리 진행)
    else {
        gameState.hasTalkedToday[npcKey] = true;

        // ★ 첫 대화가 끝나고 나서는 선물 버튼 등이 안 떠야 하므로 false
        // (단, 대사 중간에 '키워드 입력' 타입이 있다면 그건 finishTyping에서 처리됨)
        shouldShowInput = false; 

        // 대사 데이터 가져오기
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

function showNextLine(npcKey) {
    const data = dialogueQueue[currentDialogueIndex];
    const portraitDiv = document.getElementById('dialogue-portrait');
    const portraitImg = document.getElementById('current-portrait');
   
    if (npcs[npcKey]) { 
        portraitDiv.style.display = 'block'; 
        const npc = npcs[npcKey];
        const emotion = data.emotion || 'default';
        portraitImg.src = npc.portraits[emotion] || npc.portraits['default'];
    } else {
        portraitDiv.style.display = 'none'; 
    }
   
    const textZone = document.getElementById('dialogue-text');
    let textContent = data.text.replace(/{user}/g, gameState.playerName);
    typeWriter(textContent, textZone);
}

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

// [수정] 타자 효과 종료 후 처리 (화면 구성 결정)
function finishTyping() {
    clearInterval(typingInterval);
    isTyping = false;
    document.getElementById('dialogue-text').innerHTML = currentFullText;
    
    const currentData = dialogueQueue[currentDialogueIndex];
    const inputArea = document.getElementById('input-area');
    const choiceArea = document.getElementById('choice-area');
    const nextCursor = document.getElementById('next-cursor');
    
    const keywordInput = document.getElementById('keyword-input');
    const sendBtn = document.getElementById('send-btn');
    const giftBtn = document.getElementById('gift-btn');

    // UI 초기화
    inputArea.classList.add('hidden');
    choiceArea.classList.add('hidden');
    nextCursor.classList.add('hidden');

    // --- [1] 선택지형 대사 ---
    if (currentData.choices) {
        renderChoices(currentData.choices);
    } 
    // --- [2] 키워드 입력형 대사 ---
    else if (currentData.type === "keyword") {
        inputArea.classList.remove('hidden'); 
        
        // ★ [문제 해결 4] 키워드 입력 때는 선물 버튼 숨기기
        keywordInput.classList.remove('hidden');
        sendBtn.classList.remove('hidden');
        giftBtn.classList.add('hidden'); // 선물 버튼 숨김
        
        keywordInput.value = ""; 
        keywordInput.placeholder = "답변을 입력하세요...";
        
        sendBtn.onclick = () => checkKeywordAnswer(currentData);
    }
    // --- [3] 일반 대사 / 행동 묘사 ---
    else {
        // 다음 화살표 표시
        nextCursor.classList.remove('hidden');

        // ★ [문제 해결 2] 행동 묘사(이미 대화함) 상황이면 바로 선물 버튼 띄우기
        if (shouldShowInput) {
            inputArea.classList.remove('hidden');
            
            // 선물 버튼만 보이고 나머지는 숨김
            keywordInput.classList.add('hidden');
            sendBtn.classList.add('hidden');
            giftBtn.classList.remove('hidden');
        }
    }
}

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
            if (choice.score) gameState.affinities[lastInteractedNPC] += choice.score;
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

function checkKeywordAnswer(currentData) {
    const inputVal = document.getElementById('keyword-input').value.trim();
    if (!inputVal) return; 

    let reaction = currentData.answers.default; 
    for (let key in currentData.answers) {
        if (key !== "default" && inputVal.includes(key)) {
            reaction = currentData.answers[key];
            break;
        }
    }

    if (reaction.score) {
        gameState.affinities[lastInteractedNPC] += reaction.score;
    }

    dialogueQueue = [reaction];
    currentDialogueIndex = 0;

    document.getElementById('input-area').classList.add('hidden');
    showNextLine(lastInteractedNPC);
}

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

    if (gameState.activeQuest && 
        gameState.activeQuest.target === npcKey && 
        gameState.activeQuest.item === item) {
        
        gameState.affinities[npcKey] += 50; 
        gameState.hasGiftedToday[npcKey] = true;
        gameState.inventory.splice(selectedSlotIndex, 1);
        selectedSlotIndex = null;
        
        // 선물 줬으니 버튼 숨김 모드로 전환
        shouldShowInput = false;

        const successDialogue = questScripts[npcKey].success;
        displayDialogue(npcKey, successDialogue);
        gameState.activeQuest = null;
        updateUI();
        playSfx('success');
        return; 
    }
    
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
    gameState.inventory.splice(selectedSlotIndex, 1);
    selectedSlotIndex = null;

    // 선물 줬으니 버튼 숨김 모드로 전환
    shouldShowInput = false;

    displayDialogue(npcKey, response); 
    updateUI();
    playSfx('success');
}

// [수정] 대화창 클릭 처리 (로직 완전 단순화: 빈 화면 생성 방지)
document.getElementById('dialogue-overlay').onclick = (e) => {
    // 버튼, 입력창 클릭은 무시
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

    // 타자 치는 중이면 바로 완성
    if (isTyping) {
        finishTyping(); 
        return;
    }

    const currentData = dialogueQueue[currentDialogueIndex];

    // 선택지나 키워드 입력 상태면 클릭으로 넘어가지 않음
    if (currentData.choices || currentData.type === "keyword") return;

    // 다음 대사가 있으면 진행
    if (currentDialogueIndex < dialogueQueue.length - 1) {
        currentDialogueIndex++;
        showNextLine(lastInteractedNPC);
        return;
    }

    // 엔딩이면 팝업
    if (gameState.isEnding) {
        showFinalPopup();
        return;
    }

    // ★ [문제 해결 1 & 3] 대사가 끝났으면 무조건 창 닫기!
    // 이전 코드처럼 '입력창 띄우기'를 여기서 하지 않음.
    // (입력창은 finishTyping에서 이미 떠 있어야 함)
    document.getElementById('dialogue-overlay').classList.add('hidden');
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
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "♥";
    for(let i=gameState.energy; i<3; i++) hearts += "♡"; 
    document.getElementById('energy-hearts').innerText = hearts;
    
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
        slot.style.borderColor = "var(--deep-green)"; 
    });

    if (selectedSlotIndex !== null && slots[selectedSlotIndex]) {
        slots[selectedSlotIndex].style.borderColor = "yellow";
    }
}

function showSleepAlert() {
    document.getElementById('sleep-alert').classList.remove('hidden');
}

function goToSleep() {
    document.getElementById('sleep-alert').classList.add('hidden');
    const nightOverlay = document.getElementById('night-overlay');
    nightOverlay.classList.remove('hidden');
}

function startNextDay() {
    if (gameState.day >= 7) { 
        checkEnding(); 
        return; 
    }
    
    gameState.day++;
    gameState.energy = 4; 
    gameState.hasGiftedToday = {}; 
    gameState.hasTalkedToday = {};
    
    const weathers = ['맑음', '맑음', '비', '벚꽃'];
    gameState.weather = weathers[Math.floor(Math.random() * weathers.length)];
    
    document.getElementById('night-overlay').classList.add('hidden');
    updateUI(); 
    move('farm'); 

    if (gameState.day === 5) {
        triggerDay5Quest();
    }
}

function triggerDay5Quest() {
    const sorted = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    let targetEntry = sorted[1] ? sorted[1] : sorted[0];
    if (!targetEntry) return; 

    const targetNpcKey = targetEntry[0];
    const questData = questScripts[targetNpcKey];

    if (questData) {
        gameState.activeQuest = {
            target: targetNpcKey,
            item: questData.item
        };
        const modal = document.getElementById('letter-modal');
        const text = document.getElementById('letter-text');
        
        text.innerText = questData.letter;
        modal.classList.remove('hidden');
        playSfx('success'); 
    }
}

function closeLetter() {
    document.getElementById('letter-modal').classList.add('hidden');
}

/* ==========================================================================
   7. 엔딩 시스템 (Ending)
   ========================================================================== */

function checkEnding() {
    gameState.isEnding = true; 
    document.getElementById('night-overlay').classList.add('hidden'); 
    document.getElementById('dialogue-overlay').classList.add('hidden'); 

    const sorted = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    const topNpcKey = sorted[0][0];
    const topScore = sorted[0][1];
    
    const highAffinityCount = sorted.filter(item => item[1] >= 80).length;

    let endingData = null;
    let targetNpc = null; 

    if (highAffinityCount >= 2 && endingScripts.cheater) {
        endingData = endingScripts.cheater;
        targetNpc = null; 
    } else if (topScore >= 80 && endingScripts[topNpcKey]) {
        endingData = endingScripts[topNpcKey];
        targetNpc = topNpcKey; 
    } else {
        endingData = endingScripts.normal;
        targetNpc = null;
    }

    playEndingSequence(endingData, targetNpc);
}

function playEndingSequence(data, npcKey) {
    if (!data) return;
    
    currentEndingData = data; 
    gameState.isEnding = true;
    lastInteractedNPC = npcKey; 

    document.getElementById('status-bar').style.display = 'none';
    document.getElementById('control-panel').style.display = 'none'; 
    document.getElementById('inventory-icon').classList.add('hidden');
    document.getElementById('delete-toggle-btn').classList.add('hidden');

    document.getElementById('item-layer').innerHTML = "";
    document.getElementById('npc-layer').innerHTML = "";

    if (data.bg) {
        document.getElementById('location-view').style.backgroundImage = `url(${data.bg})`;
    }

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

function showFinalPopup() {
    const overlay = document.getElementById('ending-overlay');
    const title = document.getElementById('ending-title');
    const img = document.getElementById('ending-image');
    const text = document.getElementById('ending-text'); 
    const btn = document.getElementById('restart-btn');

    title.innerText = currentEndingData.title; 
    if (currentEndingData.image) img.src = currentEndingData.image; 
    text.innerText = ""; 

    document.getElementById('dialogue-overlay').classList.add('hidden');
    overlay.classList.remove('hidden');
    
    setTimeout(() => {
        overlay.classList.add('visible');
    }, 50);
    
    btn.classList.remove('hidden');
}
