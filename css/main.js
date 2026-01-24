// 1. 게임 상태 데이터 (유지)
let gameState = {
    day: 1,
    energy: 3,
    weather: '맑음',
    currentLocation: 'farm',
    inventory: [],
    affinities: { sion: 0, riku: 0, yushi: 0, jaehee: 0, ryo: 0, sakuya: 0 },
    hasGiftedToday: { sion: false, riku: false, yushi: false, jaehee: false, ryo: false, sakuya: false },
    metToday: []
};

// --- 오디오 관련 전역 변수 ---
const sfx = {
    click: new Audio('assets/sounds/sfx/click.mp3'),
    success: new Audio('assets/sounds/sfx/success.mp3'),
    walk: new Audio('assets/sounds/sfx/footstep.mp3')
};

let currentBgm = null;

// 공통 SFX 재생 함수
function playSfx(type) {
    sfx[type].currentTime = 0; // 재생 위치 초기화 (연속 클릭 대비)
    sfx[type].play();
}

// BGM 교체 함수
function changeBgm(fileName) {
    if (currentBgm) {
        currentBgm.pause();
    }
    currentBgm = new Audio(`assets/sounds/bgm/${fileName}`);
    currentBgm.loop = true; // 엔딩곡 무한 반복
    currentBgm.play();
}

// --- 기존 함수들에 소리 입히기 ---

// 1. 모든 버튼 클릭 시 '딸깍' 소리 (HTML에서 호출하거나 일괄 바인딩)
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => playSfx('click'));
});

// 2. 이동할 때 '발걸음' 소리
function move(locId) {
    if (gameState.energy <= 0 && gameState.day !== 4) {
        alert("에너지가 없어요! 농장으로 돌아가 잠을 자야 합니다.");
        return;
    }
    
    playSfx('walk'); // 발걸음 소리 추가
    
    gameState.currentLocation = locId;
    if (gameState.day !== 4) gameState.energy--;
    
    updateUI();
    renderLocation();
}

// 3. 조합 성공 시 '뾰로롱' 소리
function combineItems() {
    // ... 기존 로직 생략 ...
    if (recipe) {
        // 재료 제거 및 결과물 추가 로직
        playSfx('success'); // 성공 효과음!
        alert(`짠 ! [${recipe.result}]을(를) 만들었어요 !`);
        toggleInventory();
        updateUI();
    } else {
        alert("음.. 아무 일도 일어나지 않았습니다.");
    }
}

// 4. 핵심 함수: 이동하기 (중괄호 수정)
function move(locId) {
    if (gameState.energy <= 0 && gameState.day !== 4) {
        alert("에너지가 없어요! 농장으로 돌아가 잠을 자야 합니다.");
        return;
    }

    gameState.currentLocation = locId;
    if (gameState.day !== 4) gameState.energy--;
    
    updateUI();
    renderLocation();
} // <- 여기서 닫아줘야 합니다!

// 아침 이벤트 체크 (유지)
function processMorningEvent() {
    const sorted = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    const topNpc = sorted[0][0];
    const secondNpc = sorted[1][0];

    let letterContent = "";

    if (gameState.day === 2 || gameState.day === 3) {
        letterContent = `${npcs[topNpc].name}의 편지: "어제 정말 즐거웠어요 ! 오늘두 꼭 보러 와주기예요 ^_^"`;
    }

    if (gameState.day === 4) {
        alert("오늘은 위시 밸리 축제날입니다! 광장에 모든 멤버가 모여 있어요.");
        gameState.energy = 999;
    }

    if (gameState.day === 5) {
        letterContent = `[우편함] ${npcs[secondNpc].name}로부터 편지가 왔습니다: \n\n${questLetters[secondNpc]}`;
    }

    if (letterContent) {
        showLetterModal(letterContent); 
    }
}

// [수정 및 완성] 대사와 표정을 업데이트하는 함수
function displayDialogue(npcKey, dialogueObj) {
    const npc = npcs[npcKey];
    const textZone = document.getElementById('dialogue-text');
    const portraitImg = document.getElementById('current-portrait');
    
    // 1. 표정 이미지 업데이트
    const emotionKey = dialogueObj.emotion || 'default';
    const imagePath = npc.portraits[emotionKey] || npc.portraits['default'];
    portraitImg.src = imagePath;

    textZone.innerText = `[${npc.name}]\n${finalText}`;
}

// 5. 화면 업데이트 (유지)
function updateUI() {
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "♥";
    document.getElementById('energy-hearts').innerText = hearts;

    const slots = document.querySelectorAll('.slot');
    slots.forEach((slot, index) => {
        slot.innerHTML = gameState.inventory[index] ? `<span>${gameState.inventory[index]}</span>` : "";
    });
}

// 6. 장소 렌더링 (유지)
function renderLocation() {
    const loc = locations[gameState.currentLocation];
    const view = document.getElementById('location-view');
    view.style.backgroundImage = `url(${loc.bg})`;

    const itemLayer = document.getElementById('item-layer');
    itemLayer.innerHTML = "";
    if(loc.items) {
        loc.items.forEach(itemName => {
            const item = document.createElement('div');
            item.className = "collectible-item";
            item.onclick = () => collectItem(itemName);
            itemLayer.appendChild(item);
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
            npcSprite.onclick = () => openDialogue(key);
            npcLayer.appendChild(npcSprite);
        }
    }
}

// 대화창 열기 (유지)
function openDialogue(npcKey) {
    const overlay = document.getElementById('dialogue-overlay');
    overlay.classList.remove('hidden');
    
    let dialogueObj = dailyScripts[gameState.day] && dailyScripts[gameState.day][npcKey];

    if (!dialogueObj) {
        dialogueObj = npcKeywords[npcKey]["안녕"] || { text: "...", emotion: "default" };
    }

    displayDialogue(npcKey, dialogueObj);

    document.getElementById('send-btn').onclick = () => {
        const input = document.getElementById('keyword-input').value;
        handleKeyword(npcKey, input);
    };
}

// 키워드 처리 (유지)
function handleKeyword(npcKey, input) {
    const keywordData = npcKeywords[npcKey];
    
    if (keywordData && keywordData[input]) {
        gameState.affinities[npcKey] += 10;
        displayDialogue(npcKey, keywordData[input]);
    } else {
        displayDialogue(npcKey, { 
            text: "(무슨 말인지 잘 모르는 것 같다...)", 
            emotion: "shock" 
        });
    }
    document.getElementById('keyword-input').value = "";
}

// 9. 하루 종료 및 엔딩 체크 (유지)
function endDay() {
    if (gameState.day === 7) {
        checkEnding();
    } else {
        document.getElementById('night-overlay').classList.remove('hidden');
    }
}

function startNextDay() {
    gameState.day++;
    gameState.energy = 3;
    gameState.hasGiftedToday = { sion: false, riku: false, yushi: false, jaehee: false, ryo: false, sakuya: false };
    
    const weathers = ['맑음', '맑음', '비', '벚꽃'];
    gameState.weather = weathers[Math.floor(Math.random() * weathers.length)];
    
    document.getElementById('night-overlay').classList.add('hidden');
    updateUI();
    move('farm');
    processMorningEvent(); // 다음날 아침 이벤트 실행
}

// 1. 아이템 랜덤 생성 (renderLocation 함수 내부에 추가/수정)
function renderLocation() {
    const loc = locations[gameState.currentLocation];
    const view = document.getElementById('location-view');
    view.style.backgroundImage = `url(${loc.bg})`;

    const itemLayer = document.getElementById('item-layer');
    itemLayer.innerHTML = "";

    // 장소에 설정된 아이템 중 랜덤하게 1~2개만 생성
    if (loc.items && loc.items.length > 0) {
        const spawnCount = Math.floor(Math.random() * 2) + 1; // 1개 혹은 2개
        for (let i = 0; i < spawnCount; i++) {
            const randomItem = loc.items[Math.floor(Math.random() * loc.items.length)];
            createItemElement(randomItem);
        }
    }
    // ... NPC 렌더링 로직 생략
}

function createItemElement(itemName) {
    const item = document.createElement('div');
    item.className = "collectible-item";
    // 랜덤 좌표 배치 (배경 안에서 자유롭게)
    item.style.left = Math.random() * 80 + 10 + "%";
    item.style.top = Math.random() * 50 + 30 + "%";
    
    item.onclick = (e) => {
        e.stopPropagation();
        collectItem(itemName);
        item.remove(); // 클릭 시 화면에서 제거
    };
    document.getElementById('item-layer').appendChild(item);
}

// 2. 아이템 수집 함수
function collectItem(name) {
    if (gameState.inventory.length >= 12) {
        alert("가방이 꽉 찼어요 !");
        return;
    }
    gameState.inventory.push(name);
    updateUI();
}

// 3. 인벤토리 열기/닫기 및 조합 로직
let selectedItems = [];

function toggleInventory() {
    const modal = document.getElementById('inventory-modal');
    modal.classList.toggle('hidden');
    selectedItems = []; // 열 때마다 선택 초기화
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
            if(slot.classList.contains('selected')) selectedItems.push(item);
            else selectedItems = selectedItems.filter(i => i !== item);
        };
        grid.appendChild(slot);
    });
}

function combineItems() {
    if (selectedItems.length < 2) {
        alert("재료를 2개 이상 선택해 주세요 !");
        return;
    }

    // 레시피 확인
    const recipe = recipes.find(r => 
        r.ingredients.every(ing => selectedItems.includes(ing)) &&
        r.ingredients.length === selectedItems.length
    );

    if (recipe) {
        // 재료 제거
        selectedItems.forEach(ing => {
            const idx = gameState.inventory.indexOf(ing);
            if (idx > -1) gameState.inventory.splice(idx, 1);
        });
        // 결과물 추가
        gameState.inventory.push(recipe.result);
        alert(`짠 ! [${recipe.result}]을(를) 만들었어요 !`);
        toggleInventory();
        updateUI();
    } else {
        alert("음.. 아무 일도 일어나지 않았습니다.");
    }
}

// 10. 엔딩 로직 (유지)
function checkEnding() {
    const sortedAffinities = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    const topScore = sortedAffinities[0][1];
    const winners = sortedAffinities.filter(a => a[1] === topScore && a[1] >= 90);

    // 1. 문어발 엔딩 (2명 이상)
    if (winners.length >= 2) {
        changeBgm('octopus_end.mp3');
        alert("수라장 엔딩: '다들 여기서 뭐 하시는 거예요...?'");
    } 
    // 2. 개별 멤버 순애 엔딩 (1명)
    else if (winners.length === 1) {
        const winnerKey = winners[0][0]; // 'sion', 'riku' 등
        changeBgm(`${winnerKey}_end.mp3`);
        alert(`${npcs[winnerKey].name} 엔딩: "누나가 제 제일 소중한 사람이에요!"`);
    } 
    // 3. 우정 엔딩 (호감도 미달)
    else {
        changeBgm('default_friendship.mp3');
        alert("우정 엔딩: 모두와 즐거운 일주일을 보냈습니다.");
    }
}