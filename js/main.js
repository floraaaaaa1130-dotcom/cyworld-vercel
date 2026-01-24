let gameState = {
    day: 1, 
    energy: 4, 
    weather: '맑음', 
    currentLocation: 'farm',
    inventory: [], 
    affinities: { sion: 0, riku: 0, yushi: 0, jaehee: 0, ryo: 0, sakuya: 0 },
    hasGiftedToday: {}, // ★ 이 부분이 꼭 있어야 선물하기가 작동합니다!
    playerName: "농장주" // (이름 입력 기능을 넣으셨다면 이것도 유지하세요)
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

// js/main.js - createItemElement 함수 수정

function createItemElement(itemName) {
    const item = document.createElement('div');
    item.className = "collectible-item"; // css/style.css에 추가했던 클래스 사용

    // 랜덤 위치 설정
    item.style.left = Math.random() * 80 + 10 + "%";
    item.style.top = Math.random() * 50 + 30 + "%";

    // ▼▼▼ 이미지 적용 코드 추가 ▼▼▼
    if (itemData[itemName] && itemData[itemName].img) {
        // 배경 이미지로 아이콘을 넣습니다.
        item.style.backgroundImage = `url(${itemData[itemName].img})`;
        item.style.backgroundSize = "contain";
        item.style.backgroundRepeat = "no-repeat";
        item.style.backgroundColor = "transparent"; // 노란색 배경 제거
        item.style.border = "none"; // 테두리 제거 (원하시면 남겨둬도 됨)
    } else {
        // 이미지가 없으면 텍스트라도 작게 표시
        item.innerText = "?"; 
    }

    item.onclick = () => { 
        collectItem(itemName); 
        item.remove(); 
    };
    
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
    finalText = finalText.replace(/{user}/g, gameState.playerName);
textZone.innerText = finalText;

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

// js/main.js - openDialogue 함수 전체 교체

function openDialogue(npcKey) {
    const overlay = document.getElementById('dialogue-overlay');
    overlay.classList.remove('hidden');
    
    // UI 초기화: 입력창 보이기, 닫기 버튼 숨기기 (필요하다면 HTML에 닫기 버튼 추가 필요)
    document.getElementById('input-area').classList.remove('hidden');

    let dialogueObj = null;

    // 1순위: 오늘 날짜의 고정 이벤트 확인
    if (dailyScripts[gameState.day] && dailyScripts[gameState.day][npcKey]) {
        dialogueObj = dailyScripts[gameState.day][npcKey];
    }

    // 2순위: 호감도 이벤트 (예: 50점 이상)
    if (!dialogueObj && gameState.affinities[npcKey] >= 50 && dailyScripts["highAffinity"] && dailyScripts["highAffinity"][npcKey]) {
        dialogueObj = dailyScripts["highAffinity"][npcKey];
    }

    // 3순위: 날씨별 랜덤 대사 (가장 중요! 평소엔 이게 뜹니다)
    if (!dialogueObj) {
        const currentWeather = gameState.weather; // '맑음', '비', '벚꽃'
        
        // randomDialogues가 정의되어 있는지 확인 (script.js에 있어야 함)
        if (typeof randomDialogues !== 'undefined' && randomDialogues[npcKey] && randomDialogues[npcKey][currentWeather]) {
            const list = randomDialogues[npcKey][currentWeather];
            dialogueObj = list[Math.floor(Math.random() * list.length)];
        }
    }

    // 4순위: 그래도 없으면 기본 인사 (안전장치)
    if (!dialogueObj) {
        dialogueObj = { text: "안녕하세요. (할 말이 없는 것 같다)", emotion: "default" };
    }

    // 화면에 대사 표시
    displayDialogue(npcKey, dialogueObj);

    // --- 버튼 이벤트 연결 ---

    // 1. 선물하기
    const giftBtn = document.getElementById('gift-btn');
    // 선물 버튼이 없을 경우를 대비해 체크
    if(giftBtn) giftBtn.onclick = () => giveGift(npcKey);

    // 2. 키워드 보내기 (수정됨: 전송 -> 답변 확인 -> 닫기)
    const sendBtn = document.getElementById('send-btn');
    sendBtn.onclick = () => {
        const input = document.getElementById('keyword-input').value;
        const keywordData = npcKeywords[npcKey];

        if (keywordData && keywordData[input]) {
            // 키워드 정답! -> 호감도 오르고 답변 출력
            gameState.affinities[npcKey] += 10;
            displayDialogue(npcKey, keywordData[input]);
        } else {
            // 키워드 모름 -> 모른다는 반응 출력
            displayDialogue(npcKey, { text: "음.. 그게 무슨 말인지 잘 모르겠어요.", emotion: "shock" });
        }
        
        // ★ 대화 종료 처리 ★
        // 답변을 보여준 뒤, 입력창을 비우고 1.5초 뒤에 대화창을 자동으로 닫거나
        // 사용자가 화면을 클릭하면 닫히게 유도
        document.getElementById('keyword-input').value = "";
        
        // 팁: 답변을 읽어야 하므로 바로 닫지 않고, '보내기' 버튼을 '닫기'로 바꾸거나
        // 여기서는 간단하게 alert 대신 1초 뒤 자동 닫힘 혹은 화면 클릭 유도를 추천
        // 지금은 "답변이 출력되었습니다. 클릭해서 닫으세요" 상태로 둠.
    };
}

// (중요) 대화창 바깥이나 대화창을 클릭하면 닫히게 하는 기능 추가
document.getElementById('dialogue-overlay').onclick = (e) => {
    // 입력창(input)이나 버튼을 클릭했을 때는 닫히면 안 됨
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    
    // 그 외 영역 클릭 시 대화창 닫기
    document.getElementById('dialogue-overlay').classList.add('hidden');
};
// --- 인벤토리 및 조합 ---
let selectedItems = [];
function collectItem(name) {
    // ▼▼▼ 숫자를 12에서 8로 변경해주세요! ▼▼▼
    if (gameState.inventory.length >= 8) { 
        alert("가방이 꽉 찼어요!"); 
        return; 
    }
    gameState.inventory.push(name);
    updateUI();
}

function toggleInventory() {
    const modal = document.getElementById('inventory-modal');
    modal.classList.toggle('hidden');
    
    if (modal.classList.contains('hidden')) {
        isDeleteMode = false;
        document.getElementById('delete-toggle-btn').classList.remove('active');
        document.querySelector('.inventory-grid').classList.remove('delete-mode');
    }
    
    selectedItems = [];
    renderInventorySlots();
}


function renderInventorySlots() {
    const grid = document.querySelector('.inventory-grid');
    grid.innerHTML = "";
    
    // 삭제 모드인지 확인해서 클래스 유지 (다시 그려질 때도 흔들림 유지)
    if (isDeleteMode) grid.classList.add('delete-mode');
    else grid.classList.remove('delete-mode');

    for (let i = 0; i < 8; i++) {
        const slot = document.createElement('div');
        slot.className = "item-slot";
        
        const itemName = gameState.inventory[i]; // 인벤토리 배열에서 아이템 가져오기
        
        if (itemName) {
            // [이미지 표시]
            if (itemData[itemName] && itemData[itemName].img) {
                const img = document.createElement('img');
                img.src = itemData[itemName].img;
                img.style.width = "100%"; 
                img.style.height = "100%";
                slot.appendChild(img);
            } else {
                slot.innerText = itemName;
                slot.style.fontSize = "10px";
            }

            // [클릭 이벤트 분기] ★ 여기가 핵심! ★
            slot.onclick = () => {
                if (isDeleteMode) {
                    // 1. 삭제 모드일 때: 정말 버릴지 물어보기
                    if (confirm(`정말 [${itemName}] 아이템을 버릴까요?`)) {
                        gameState.inventory.splice(i, 1); // 배열에서 삭제
                        playSfx('click'); // 효과음 (있다면)
                        
                        // 아이템을 버렸으면 삭제 모드를 끌까요, 유지할까요?
                        // 연속으로 버리기 좋게 유지하겠습니다. 끄고 싶으면 아래 주석 해제하세요.
                        // toggleDeleteMode(); 
                        
                        renderInventorySlots(); // 화면 갱신
                        updateUI();
                    }
                } else {
                    // 1. 정보 팝업 띄우기 (아이템 설명 보기)
                    showItemInfo(itemName);

                    // 2. 동시에 '선택' 상태로 만들기 (선물하기/조합하기 위해)
                    selectSlot(i); 

                    // 3. (선택사항) "손에 들었다"는 알림을 띄우거나, 바로 창을 닫을 수도 있습니다.
                    //    하지만 정보창을 보고 싶다면, 바로 창을 닫으면 안 되겠죠?
                    //    그래서 toggleInventory(); 는 빼는 게 더 자연스럽습니다.
                    
                    // 대신, 선택된 슬롯을 시각적으로 강조해주면 좋습니다.
                    renderInventorySlots(); // 화면을 다시 그려서 선택 표시(분홍색 배경) 업데이트
                }
            };

            // [조합 선택 표시] (일반 모드일 때만 보이게 해도 됨)
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

function updateUI() {
    // 1. 날짜 및 에너지 표시
    document.getElementById('date-display').innerText = `Day ${gameState.day} - ${gameState.weather}`;
    let hearts = "";
    for(let i=0; i<gameState.energy; i++) hearts += "★"; // ♥ 대신 별로 변경
    document.getElementById('energy-hearts').innerText = hearts;
    
    // 2. 인벤토리 슬롯 표시 (이미지 적용)
    const slots = document.querySelectorAll('.slot');
    
    slots.forEach((slot, index) => {
        // 기존 내용(글자나 이미지) 싹 비우기
        slot.innerHTML = "";
        
        const itemName = gameState.inventory[index];
        
        if (itemName) {
            // 아이템 데이터에 이미지가 있는지 확인
            if (itemData[itemName] && itemData[itemName].img) {
                const img = document.createElement('img');
                img.src = itemData[itemName].img;
                img.alt = itemName; // 이미지가 깨지면 이름이라도 나오게
                // 이미 style.css에 .slot img 스타일(40px)이 있으므로 크기는 자동 적용됨
                slot.appendChild(img);
            } else {
                // 이미지가 없으면 그냥 글자로 표시
                slot.innerText = itemName;
            }
        }
        
        // 선택 해제 상태로 초기화
        slot.style.borderColor = "var(--deep-pink)";
    });

    // 선택된 슬롯이 있다면 다시 강조 표시
    if (selectedSlotIndex !== null && slots[selectedSlotIndex]) {
        slots[selectedSlotIndex].style.borderColor = "yellow";
    }
}

function startNextDay() {
    if (gameState.day >= 7) { checkEnding(); return; }
    gameState.day++;
    gameState.energy = 5;

    // ★ 다음 날이 되면 선물 기록 초기화 (이 줄을 추가하세요!)
    gameState.hasGiftedToday = {};
    
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


// --- [추가] 아이템 정보 팝업 기능 ---
let currentPopupItem = null; // 현재 팝업에 띄운 아이템 이름 저장

function showItemInfo(itemName) {
    currentPopupItem = itemName;
    const data = itemData[itemName]; // script.js에 있는 데이터 가져오기

    // 1. 내용 채우기
    document.getElementById('info-name').innerText = itemName;
    document.getElementById('info-desc').innerText = data ? data.desc : "정보가 없습니다.";
    
    const img = document.getElementById('info-image');
    if (data && data.img) {
        img.src = data.img;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }

    // 2. 팝업 열기
    document.getElementById('item-info-modal').classList.remove('hidden');
}

function closeItemInfo() {
    document.getElementById('item-info-modal').classList.add('hidden');
    currentPopupItem = null;
}

function selectForCombine() {
    if (!currentPopupItem) return;

    // 이미 선택된 아이템인지 확인
    if (selectedItems.includes(currentPopupItem)) {
        alert("이미 담은 아이템입니다!");
    } else {
        // 선택 리스트에 추가
        selectedItems.push(currentPopupItem);
        // 슬롯 디자인 업데이트 (선택된 표시)
        updateInventorySlotStyles();
    }
    closeItemInfo();
}

function updateInventorySlotStyles() {
    // 인벤토리 모달 다시 그리기 (선택 상태 반영을 위해)
    renderInventorySlots();
}

// [추가] 아이템 삭제 모드 변수
let isDeleteMode = false;

function toggleDeleteMode() {
    isDeleteMode = !isDeleteMode; // 켜기/끄기 토글
    
    const btn = document.getElementById('delete-toggle-btn');
    const grid = document.querySelector('.inventory-grid');
    
    if (isDeleteMode) {
        btn.classList.add('active'); // 버튼 빨갛게
        grid.classList.add('delete-mode'); // 슬롯 흔들리게
        alert("버릴 아이템을 선택하세요. (다시 누르면 취소)");
    } else {
        btn.classList.remove('active');
        grid.classList.remove('delete-mode');
    }
}

/* --- 오프닝 & 메뉴 기능 --- */

// '시작하기' 버튼 누르면 이름 입력창 보여주기
function showNameInput() {
    document.getElementById('menu-area').classList.add('hidden');
    document.getElementById('name-input-area').classList.remove('hidden');
    playSfx('click');
}

// '취소' 버튼 누르면 다시 메뉴로
function hideNameInput() {
    document.getElementById('name-input-area').classList.add('hidden');
    document.getElementById('menu-area').classList.remove('hidden');
    playSfx('click');
}

// 진짜 게임 시작! (이름 저장)
function startGame() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();

    if (name.length === 0) {
        alert("이름을 입력해주세요!");
        return;
    }

    gameState.playerName = name; // 이름 저장
    playSfx('success');
    
    document.body.classList.add('game-running');
    // 오프닝 화면 숨기고 농장으로 이동
    document.getElementById('intro-screen').classList.add('hidden');
    move('farm');
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

window.onload = () => {
    // 게임을 바로 시작하지 않고, 오프닝 화면만 보여줍니다.
    // 기존의 updateUI(); move('farm'); 코드는 지우거나 주석 처리하세요.
    
    console.log("게임 로드 완료! 오프닝 대기 중...");
};



