let inputCode = "";

// 1. ฟังก์ชันสร้างรหัสผ่านจากวันที่ปัจจุบัน (รูปแบบ วันเดือนปี ค.ศ. 4 หลัก เช่น 10062026)
function getCurrentDateCode() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    
    // ดึงปีเต็ม 4 หลักมาใช้เลย
    const year = String(today.getFullYear()); 
    return `${day}${month}${year}`; 
}

// สร้างและเก็บรหัสผ่านของวันนี้ไว้ในตัวแปร
const todayPassword = getCurrentDateCode();

// 2. ฐานข้อมูลผู้ใช้งาน
const userDatabase = {
    // 💡 ลบเครื่องหมายคอมมา (,) ตัวสุดท้ายที่เกินอยู่ออกแล้ว เพื่อป้องกัน Syntax Error ในเบราว์เซอร์เก่าๆ
    [todayPassword]: { 
        name: "เจ้าของวันเกิด 🎉", 
        message: "สุขสันต์วันเกิดปีนี้ 20 แล้วนะ ขอให้มีแต่สิ่งดีๆ เข้ามาในชีวิต ขอให้ปีนี้มีแต่รอยยิ้มนะ หวังว่าสิ่งนี้จะทำให้เธอยิ้มได้นะ :3" 
    }
};

let candlesCount = 0;
const maxCandles = 5;

const candlePositions = [
    { left: 50, top: 38 },
    { left: 32, top: 40 },
    { left: 67, top: 40 },
    { left: 40, top: 35 },
    { left: 60, top: 35 }
];

function pressKey(num) {
    // ปรับข้อจำกัดการพิมพ์เป็น 8 หลัก
    if (inputCode.length < 8) {
        inputCode += num;
        document.getElementById('pass-display').innerText = inputCode;
    }
    
    // ตรวจสอบเมื่อพิมพ์ครบ 8 ตัว
    if (inputCode.length === 8) {
        if (userDatabase[inputCode]) {
            const currentUser = userDatabase[inputCode];
            
            alert("ยินดีต้อนรับคุณ " + currentUser.name);
            
            const msgElement = document.getElementById('message-text');
            if (msgElement) {
                msgElement.innerText = currentUser.message;
            }

            document.getElementById('password-page').classList.remove('active');
            document.getElementById('candle-page').classList.add('active');
        } else {
            alert("รหัสไม่ถูกต้อง!");
            inputCode = "";
            document.getElementById('pass-display').innerText = "********"; 
        }
    }
}

function deleteKey() {
    inputCode = inputCode.slice(0, -1);
    document.getElementById('pass-display').innerText = inputCode || "********";
}

function addCandle(event) {
    if (candlesCount < maxCandles) {
        const pos = candlePositions[candlesCount];
        candlesCount++;
        
        const candle = document.createElement('img');
        candle.src = "images/เทียน.png"; 
        candle.className = "candle-img";
        candle.style.left = pos.left + "%";
        candle.style.top = pos.top + "%";
        
        document.getElementById('candle-area').appendChild(candle);

        const bottomHint = document.getElementById('bottom-hint');
        const hints = ["ปักอีกเล่มซิ", "ปักอีกนิด", "ใกล้แล้วๆ", "อันสุดท้ายเเย้ว"];
        if (candlesCount < maxCandles) bottomHint.innerText = hints[candlesCount - 1];

        if (candlesCount === maxCandles) {
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