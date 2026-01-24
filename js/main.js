let gameState = {
    day: 1, energy: 3, weather: '맑음', currentLocation: 'farm',
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
    if (gameState.energy <= 0 && gameState.day !== 4) {
        alert("에너지가 없어요! 잠을 자야 합니다."); 
        endDay(); // 밤 정산 화면을 보여줍니다.
        return;
    }

    playSfx('walk');
    gameState.currentLocation = locId;
    if (gameState.day !== 4) gameState.energy--;
    
    updateUI();
    renderLocation();

    // 에너지가 0이 된 직후 자동으로 endDay() 실행
    if (gameState.energy === 0 && gameState.day !== 4) {
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
    
    const emotionKey = dialogueObj.emotion || 'default';
    portraitImg.src = npc.portraits[emotionKey] || npc.portraits['default'];
    
    let finalText = dialogueObj.text;
    if (npcKey === 'riku') {
        finalText = finalText.replace(/있/g, '잇').replace(/했/g, '햇').replace(/요/g, '여').replace(/\./g, '');
    }
    textZone.innerText = `[${npc.name}]\n${finalText}`;
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

// --- 선물하기 로직 ---
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
    const npc = npcs[npcKey];
    let points = 5; // 기본 점수
    let response = { text: "에.. 고마워요 ! 잘 받을게요.", emotion: "default" };

    // 취향 체크
    if (npc.gifts.love.includes(item)) {
        points = 20;
        response = { text: "와아 ! 제가 정말 좋아하는 거예요 ! 너무 고마워요 ^_^", emotion: "happy" };
    } else if (npc.gifts.hate.includes(item)) {
        points = -10;
        response = { text: "에..? 이건 제가 조금.. 무서워하는 건데요..", emotion: "shock" };
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
    let dialogueObj = dailyScripts[gameState.day] && dailyScripts[gameState.day][npcKey];
    if (!dialogueObj) dialogueObj = npcKeywords[npcKey]?.["안녕"] || { text: "...", emotion: "default" };
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
    for(let i=0; i<gameState.energy; i++) hearts += "♥";
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
    gameState.energy = 3;
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




