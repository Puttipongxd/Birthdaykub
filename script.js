let inputCode = "";
const secretCode = "1704";
const secretCode = "1111";
let candlesCount = 0;
const maxCandles = 5;

const candlePositions = [
    { left: 50, top: 38 }, // เล่มที่ 1: ตรงกลางเป๊ะ (เยื้องไปทางด้านหลังนิดหน่อย)
    { left: 32, top: 40 }, // เล่มที่ 2: ฝั่งซ้าย (ขยับมาด้านหน้า)
    { left: 67, top: 40 }, // เล่มที่ 3: ฝั่งขวา (ขยับมาด้านหน้า)
    { left: 40, top: 35 }, // เล่มที่ 4: ฝั่งซ้าย (ขยับไปด้านหลัง)
    { left: 60, top: 35 }  // เล่มที่ 5: ฝั่งขวา (ขยับไปด้านหลัง)
];

function pressKey(num) {
    if (inputCode.length < 4) {
        inputCode += num;
        document.getElementById('pass-display').innerText = inputCode;
    }
    if (inputCode.length === 4) {
        if (inputCode === secretCode) {
            document.getElementById('password-page').classList.remove('active');
            document.getElementById('candle-page').classList.add('active');
        } else {
            alert("รหัสไม่ถูกต้อง!");
            inputCode = "";
            document.getElementById('pass-display').innerText = "****";
        }
    }
}

function deleteKey() {
    inputCode = inputCode.slice(0, -1);
    document.getElementById('pass-display').innerText = inputCode || "****";
}

function addCandle(event) {
    if (candlesCount < maxCandles) {
        const pos = candlePositions[candlesCount];
        candlesCount++;
        
        const candle = document.createElement('img');
        candle.src = "images/เทียน.png"; // เช็คชื่อไฟล์รูปเทียนให้ตรง
        candle.className = "candle-img";
        candle.style.left = pos.left + "%";
        candle.style.top = pos.top + "%";
        
        document.getElementById('candle-area').appendChild(candle);

        const bottomHint = document.getElementById('bottom-hint');
        const hints = ["ปักอีกเล่มซิ", "ปักอีกนิด", "ใกล้แล้วๆ", "อันสุดท้ายเเย้ว"];
        if(candlesCount < maxCandles) bottomHint.innerText = hints[candlesCount-1];

        if(candlesCount === maxCandles) {
            bottomHint.innerText = "ปักครบแล้ว! อธิษฐานแล้วเปิดซองจดหมายนะ";
            setTimeout(() => {
                const env = document.getElementById('envelope-wrapper');
                env.classList.remove('hidden');
                setTimeout(() => env.classList.add('show'), 100);
            }, 800);
        }
    }
}

function openLetter(event) {
    if (event) event.stopPropagation();
    document.getElementById('candle-page').classList.remove('active');
    document.getElementById('message-page').classList.add('active');
}