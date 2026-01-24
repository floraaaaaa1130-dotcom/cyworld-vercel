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
    
    // 2. 텍스트 처리 (리쿠 말투 필터 적용)
    let finalText = dialogueObj.text;
    if (npcKey === 'riku') {
        finalText = finalText
            .replace(/있/g, '잇').replace(/했/g, '햇')
            .replace(/요/g, '여').replace(/\./g, '');
    }

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

// 10. 엔딩 로직 (유지)
function checkEnding() {
    const sortedAffinities = Object.entries(gameState.affinities).sort((a, b) => b[1] - a[1]);
    const topScore = sortedAffinities[0][1];
    const winners = sortedAffinities.filter(a => a[1] === topScore && a[1] >= 90);

    if (winners.length >= 2) {
        alert("수라장 엔딩: 멤버들이 모두 당신의 농장 앞으로 찾아왔습니다! '다들 여기서 뭐 하시는 거예요...?'");
    } else if (winners.length === 1) {
        alert(`${npcs[winners[0][0]].name} 엔딩: "누나가 제 제일 소중한 사람이에요!"`);
    } else {
        alert("우정 엔딩: 모두와 즐거운 일주일을 보냈습니다.");
    }
}