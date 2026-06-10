let inputCode = "";

// 1. ฟังก์ชันสร้างรหัสผ่านจากวันที่ปัจจุบัน (รูปแบบ วันเดือนปี เช่น 100626)
function getCurrentDateCode() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // เดือนใน JS เริ่มจาก 0-11 เลยต้อง +1
    const year = String(today.getFullYear()).slice(-2); // เอาแค่ 2 หลักท้ายของปี ค.ศ.
    return `${day}${month}${year}`; 
}

// สร้างและเก็บรหัสผ่านของวันนี้ไว้ในตัวแปร
const todayPassword = getCurrentDateCode();

// 2. ฐานข้อมูลผู้ใช้งาน (ใช้คำอวยพรแยกตามรหัสผ่าน)
const userDatabase = {
    // 💡 รหัส Realtime: ถ้าพิมพ์วันที่ปัจจุบัน (เช่น วันนี้คือรหัสอะไรระบบจะคำนวณให้เอง) จะดึงข้อความนี้ไปแสดง
    [todayPassword]: { 
        name: "เจ้าของวันเกิด 🎉", 
        message: "สุขสันต์วันเกิดปีนี้ 20 แล้วนะ ขอให้มีแต่สิ่งดีๆ เข้ามาในชีวิต ขอให้ปีนี้มีแต่รอยยิ้มนะ หวังว่าสิ่งนี้จะทำให้เธอยิ้มได้นะ :3" 
    },
    
    // คุณยังสามารถใส่รหัสคงที่สำหรับเพื่อนคนอื่นๆ ให้เข้ามาดูคำอวยพรของตัวเองได้เหมือนเดิมครับ
    "111111": { name: "Eve", message: "มีความสุขมากๆ นะเจ้านกน้อย ขอให้ปีนี้เป็นปีที่ดี มีรอยยิ้มในทุกๆ วันเลย!" },
    "222222": { name: "Fay", message: "แฮปปี้เบิร์ดเดย์นะบี ขอให้สมหวังทุกเรื่อง เรียนเก่งๆ งานปังๆ จ้า!" },
    "333333": { name: "Boom", message: "HBD เว้ยเพื่อน! ร่ำรวยๆ ขอให้ได้แฟนหล่อๆ สวยๆ ตามที่หวังไว้" },
    "444444": { name: "Toon", message: "สุขสันต์วันเกิดนะ! ขอให้สุขภาพแข็งแรง ไม่เจ็บไม่ไข้ มีเงินใช้ไม่ขาดมือ" },
    "555555": { name: "Win", message: "แฮปปี้เบิร์ดเดย์! ขอให้โลกนี้ใจดีกับแกเยอะๆ คิดสิ่งใดก็ขอให้สมปรารถนา" }
};

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
    // ปรับข้อจำกัดการพิมพ์เป็น 6 หลัก
    if (inputCode.length < 6) {
        inputCode += num;
        document.getElementById('pass-display').innerText = inputCode;
    }
    
    // ตรวจสอบเมื่อพิมพ์ครบ 6 ตัว
    if (inputCode.length === 6) {
        if (userDatabase[inputCode]) {
            const currentUser = userDatabase[inputCode];
            
            // แสดงหน้าต่างต้อนรับตามชื่อที่ตั้งไว้
            alert("ยินดีต้อนรับคุณ " + currentUser.name);
            
            // นำข้อความอวยพรเฉพาะของรหัสนั้น ไปใส่ในหน้าแสดงข้อความ
            const msgElement = document.getElementById('message-text');
            if (msgElement) {
                msgElement.innerText = currentUser.message;
            }

            // ย้ายหน้าไปหน้าปักเทียน
            document.getElementById('password-page').classList.remove('active');
            document.getElementById('candle-page').classList.add('active');
        } else {
            alert("รหัสไม่ถูกต้อง!");
            inputCode = "";
            document.getElementById('pass-display').innerText = "******";
        }
    }
}

function deleteKey() {
    inputCode = inputCode.slice(0, -1);
    document.getElementById('pass-display').innerText = inputCode || "******";
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