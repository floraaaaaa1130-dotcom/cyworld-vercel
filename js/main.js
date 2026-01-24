let gameState = {
    day: 1, energy: 3, weather: '맑음', currentLocation: 'farm',
    inventory: [], affinities: { sion: 0, riku: 0, yushi: 0, jaehee: 0, ryo: 0, sakuya: 0 }
};

const sfx = {
    click: new Audio('assets/sounds/sfx/click.mp3'),
    success: new Audio('assets/sounds/sfx/success.mp3'),
    walk: new Audio('assets/sounds/sfx/footstep.mp3')
};

function playSfx(type) {
    sfx[type].currentTime = 0;
    sfx[type].play().catch(e => console.log("오디오 파일 없음"));
}

function move(locId) {
    if (gameState.energy <= 0 && gameState.day !== 4) {
        alert("에너지가 없어요! 잠을 자야 합니다."); return;
    }
    playSfx('walk');
    gameState.currentLocation = locId;
    if (gameState.day !== 4) gameState.energy--;
    updateUI();
    renderLocation();
}

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
            item.style.left = Math.random() * 80 + 10 + "%";
            item.style.top = Math.random() * 50 + 30 + "%";
            item.onclick = () => { collectItem(itemName); item.remove(); };
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

function collectItem(name) {
    if (gameState.inventory.length >= 5) { alert("가방이 꽉 찼어요!"); return; }
    gameState.inventory.push(name);
    updateUI();
}

function updateUI() {
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "♥";
    document.getElementById('energy-hearts').innerText = hearts;
    
    const slots = document.querySelectorAll('.slot');
    slots.forEach((slot, index) => {
        slot.innerText = gameState.inventory[index] || "";
    });
}

// 초기화
window.onload = () => { move('farm'); };
