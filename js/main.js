let gameState = {
    day: 1, energy: 4, weather: '맑음', currentLocation: 'farm',
    inventory: [], affinities: { sion: 0, riku: 0, yushi: 0, jaehee: 0, ryo: 0, sakuya: 0 }
};

// --- 오디오 설정 ---
const sfx = {
    click: new Audio('assets/sounds/sfx/click.mp3'),
    success: new Audio('assets/sounds/sfx/success.mp3'),
    walk: new Audio('assets/sounds/sfx/footstep.mp3')
};
let currentBgm = null;

function playSfx(type) {
    sfx[type].currentTime = 0;
    sfx[type].play().catch(e => console.log("오디오 파일 없음"));
}

function changeBgm(fileName) {
    if (currentBgm) currentBgm.pause();
    currentBgm = new Audio(`assets/sounds/bgm/${fileName}`);
    currentBgm.loop = true;
    currentBgm.play().catch(e => console.log("BGM 파일 없음"));
}

// js/main.js 수정 제안
function move(locId) {
    if (gameState.energy <= 0 && gameState.day !== 5) {
        alert("에너지가 없어요! 잠을 자야 합니다."); 
        endDay(); // 밤 정산 화면을 보여줍니다.
        return;
    }

    playSfx('walk');
    gameState.currentLocation = locId;
    if (gameState.day !== 5) gameState.energy--;
    
    updateUI();
    renderLocation();

    // 에너지가 0이 된 직후 자동으로 endDay() 실행
    if (gameState.energy === 0 && gameState.day !== 5) {
        setTimeout(() => {
            endDay(); 
        }, 500); // 0.5초 뒤에 실행하여 부드럽게 전환
    }
}

function renderLocation() {
    const loc = locations[gameState.currentLocation];
    const view = document.getElementById('location-view');
    view.style.backgroundImage = `url(${loc.bg})`;

    // 아이템 렌더링
    const itemLayer = document.getElementById('item-layer');
    itemLayer.innerHTML = "";
    if (loc.items) {
        loc.items.forEach(itemName => {
            createItemElement(itemName);
        });
    }

    // NPC 렌더링
const npcLayer = document.getElementById('npc-layer');
    npcLayer.innerHTML = "";
    
    for (let key in npcs) {
        const npc = npcs[key];
        const targetLoc = gameState.weather === '비' ? npc.locations.rainy : npc.locations.sunny;
        
        if (targetLoc === gameState.currentLocation) {
            const npcSprite = document.createElement('div');
            npcSprite.className = "npc-sprite"; // 공통 클래스 (크기, 위치 등 담당)

            // ▼▼▼ [핵심] 여기가 빠져 있었습니다! 이 줄을 추가하세요 ▼▼▼
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
    item.onclick = () => { collectItem(itemName); item.remove(); };
    document.getElementById('item-layer').appendChild(item);
}

// --- 대화 및 호감도 ---
function displayDialogue(npcKey, dialogueObj) {
    const npc = npcs[npcKey];
    const textZone = document.getElementById('dialogue-text');
    const portraitImg = document.getElementById('current-portrait');
    const inputArea = document.getElementById('input-area');
    const choiceArea = document.getElementById('choice-area');

    // 1. 텍스트 & 표정 업데이트
    const emotionKey = dialogueObj.emotion || 'default';
    portraitImg.src = npc.portraits[emotionKey] || npc.portraits['default'];
    
    let finalText = dialogueObj.text;
    // 리쿠 말투 패치 등 기존 로직 유지
    if (npcKey === 'riku') {
        finalText = finalText.replace(/있/g, '잇').replace(/했/g, '햇'); 
    }
    textZone.innerText = `[${npc.name}]\n${finalText}`;

    // 2. 선택지(Choices)가 있는 경우 처리
    choiceArea.innerHTML = ""; // 기존 버튼 초기화

    if (dialogueObj.choices) {
        // 선택지 모드: 입력창 숨기고 선택지 영역 보여주기
        inputArea.classList.add('hidden');
        choiceArea.classList.remove('hidden');

        // 버튼 생성
        dialogueObj.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.innerText = choice.label;
            btn.className = "choice-btn"; // CSS 꾸미기용 클래스
            btn.style.marginRight = "10px"; // 간격
            btn.onclick = () => {
                // 선택 시 효과
                if (choice.score) gameState.affinities[npcKey] += choice.score;
                
                // 답변 대사로 갱신 (선택지는 사라지고 입력창 다시 뜸)
                displayDialogue(npcKey, { 
                    text: choice.reply, 
                    emotion: choice.score > 0 ? "happy" : "shock" 
                });
            };
            choiceArea.appendChild(btn);
        });
    } else {
        // 일반 대화 모드: 선택지 숨기고 입력창 보이기
        inputArea.classList.remove('hidden');
        choiceArea.classList.add('hidden');
    }
}
// js/main.js 추가 및 수정

let selectedSlotIndex = null; // 현재 선택된 인벤토리 슬롯 번호

// --- 9. 하루 종료 (누락되었던 함수) ---
function endDay() {
    document.getElementById('night-overlay').classList.remove('hidden');
}

// --- 인벤토리 아이템 선택 ---
function selectSlot(index) {
    selectedSlotIndex = index;
    // 모든 슬롯의 강조 표시 제거
    document.querySelectorAll('.slot').forEach(s => s.style.borderColor = "var(--deep-pink)");
    // 선택된 슬롯 강조
    if (gameState.inventory[index]) {
        document.querySelectorAll('.slot')[index].style.borderColor = "yellow";
        playSfx('click');
    }
}

// js/main.js - giveGift 함수 수정

function giveGift(npcKey) {
    if (selectedSlotIndex === null || !gameState.inventory[selectedSlotIndex]) {
        alert("먼저 인벤토리에서 선물을 선택해주세요 !");
        return;
    }

    if (gameState.hasGiftedToday[npcKey]) {
        alert("오늘은 이미 선물을 줬어요 !");
        return;
    }

    const item = gameState.inventory[selectedSlotIndex];
    const npc = npcs[npcKey]; // 이제 여기서 npc 데이터를 가져오면 반응 대사도 같이 딸려옵니다.
    
    let points = 5;
    // 1. 일단 '보통' 반응으로 초기화 (데이터가 없을 경우를 대비해 안전장치 || 뒤에 기본값 둠)
    let response = npc.giftReactions?.default || { text: "고마워요.", emotion: "default" };

    // 2. 취향 체크 및 반응 교체
    if (npc.gifts.love.includes(item)) {
        points = 20;
        // 'love' 반응으로 교체
        if(npc.giftReactions?.love) response = npc.giftReactions.love;
    } 
    else if (npc.gifts.hate.includes(item)) {
        points = -10;
        // 'hate' 반응으로 교체
        if(npc.giftReactions?.hate) response = npc.giftReactions.hate;
    }

    // 호감도 반영
    gameState.affinities[npcKey] += points;
    gameState.hasGiftedToday[npcKey] = true;
    
    // 아이템 제거
    gameState.inventory.splice(selectedSlotIndex, 1);
    selectedSlotIndex = null;

    // 대화창 업데이트 및 UI 갱신
    displayDialogue(npcKey, response);
    updateUI();
    playSfx('success');
}

// --- 대화창 열기 함수 수정 (선물 버튼 이벤트 연결) ---
function openDialogue(npcKey) {
    document.getElementById('dialogue-overlay').classList.remove('hidden');
    
    // 1순위: 오늘 날짜의 고정 이벤트가 있는지 확인
    let dialogueObj = dailyScripts[gameState.day] && dailyScripts[gameState.day][npcKey];

    // 2순위: 없으면 날씨에 맞는 랜덤 대사 뽑기
    if (!dialogueObj) {
        const currentWeather = gameState.weather; // '맑음', '비', '벚꽃'
        const npcRandomData = randomDialogues[npcKey];

        if (npcRandomData && npcRandomData[currentWeather]) {
            const list = npcRandomData[currentWeather];
            // 배열에서 랜덤으로 하나 뽑기
            dialogueObj = list[Math.floor(Math.random() * list.length)];
        }
    }

    // 3순위: 데이터가 아예 없으면 기본 인사 (안전장치)
    if (!dialogueObj) {
        dialogueObj = { text: "안녕하세요.", emotion: "default" };
    }

    displayDialogue(npcKey, dialogueObj);
    // 선물하기 버튼에 함수 연결
    document.getElementById('gift-btn').onclick = () => giveGift(npcKey);

    document.getElementById('send-btn').onclick = () => {
        const input = document.getElementById('keyword-input').value;
        if (npcKeywords[npcKey]?.[input]) {
            gameState.affinities[npcKey] += 10;
            displayDialogue(npcKey, npcKeywords[npcKey][input]);
        }
        document.getElementById('keyword-input').value = "";
    };
}

// --- 인벤토리 및 조합 ---
let selectedItems = [];
function collectItem(name) {
    if (gameState.inventory.length >= 12) { alert("가방이 꽉 찼어요!"); return; }
    gameState.inventory.push(name);
    updateUI();
}

function toggleInventory() {
    const modal = document.getElementById('inventory-modal');
    modal.classList.toggle('hidden');
    selectedItems = [];
    renderInventorySlots();
}

function renderInventorySlots() {
    const grid = document.querySelector('.inventory-grid');
    grid.innerHTML = "";
    gameState.inventory.forEach((item, index) => {
        const slot = document.createElement('div');
        slot.className = "item-slot";
        slot.innerText = item;
        slot.onclick = () => {
            slot.classList.toggle('selected');
            if (slot.classList.contains('selected')) selectedItems.push(item);
            else selectedItems = selectedItems.filter(i => i !== item);
        };
        grid.appendChild(slot);
    });
}

function combineItems() {
    if (selectedItems.length < 2) { alert("재료를 2개 이상 선택해 주세요!"); return; }
    const recipe = recipes.find(r => r.ingredients.every(ing => selectedItems.includes(ing)) && r.ingredients.length === selectedItems.length);
    if (recipe) {
        playSfx('success');
        selectedItems.forEach(ing => {
            const idx = gameState.inventory.indexOf(ing);
            if (idx > -1) gameState.inventory.splice(idx, 1);
        });
        gameState.inventory.push(recipe.result);
        alert(`짠! [${recipe.result}]을(를) 만들었어요!`);
        toggleInventory(); updateUI();
    } else { alert("음.. 아무 일도 일어나지 않았습니다."); }
}

// --- 기존 updateUI 수정 (슬롯 렌더링 시 이미지/텍스트 표시) ---
function updateUI() {
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "★";
    document.getElementById('energy-hearts').innerText = hearts;
    
    const slots = document.querySelectorAll('.slot');
    slots.forEach((slot, index) => {
        slot.innerText = gameState.inventory[index] || "";
        // 선택 해제 상태로 초기화
        slot.style.borderColor = "var(--deep-pink)";
    });
}

function startNextDay() {
    if (gameState.day >= 7) { checkEnding(); return; }
    gameState.day++;
    gameState.energy = 5;
    const weathers = ['맑음', '맑음', '비', '벚꽃'];
    gameState.weather = weathers[Math.floor(Math.random() * weathers.length)];
    document.getElementById('night-overlay').classList.add('hidden');
    updateUI(); move('farm');
}

function checkEnding() {
    const sorted = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] >= 90) alert(`${npcs[sorted[0][0]].name} 엔딩!`);
    else alert("우정 엔딩!");
}

window.onload = () => { move('farm'); };








