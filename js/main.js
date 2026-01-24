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

// js/main.js 수정
function move(locId) {
    // 이미 에너지가 0이라면 이동 불가 경고
    if (gameState.energy <= 0 && gameState.day !== 4) {
        alert("에너지가 없어요! 잠을 자야 합니다."); 
        return;
    }

    playSfx('walk');
    gameState.currentLocation = locId;
    
    // 축제일이 아니면 에너지 소모
    if (gameState.day !== 4) gameState.energy--;
    
    updateUI();
    renderLocation();

    // 핵심: 에너지가 0이 된 직후 하루를 종료하는 창을 띄움
    if (gameState.energy === 0 && gameState.day !== 4) {
        setTimeout(() => {
            endDay(); // 밤 정산 화면(잠자기 버튼)을 보여주는 함수 호출
        }, 500); // 0.5초 뒤에 실행 (이동 연출이 끝난 후)
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
            npcSprite.className = "npc-sprite";
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

function openDialogue(npcKey) {
    document.getElementById('dialogue-overlay').classList.remove('hidden');
    let dialogueObj = dailyScripts[gameState.day] && dailyScripts[gameState.day][npcKey];
    if (!dialogueObj) dialogueObj = npcKeywords[npcKey]?.["안녕"] || { text: "...", emotion: "default" };
    displayDialogue(npcKey, dialogueObj);

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

// --- 시스템 루프 ---
function updateUI() {
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "♥";
    document.getElementById('energy-hearts').innerText = hearts;
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

