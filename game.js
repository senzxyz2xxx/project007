/* =============================================
   BOSS FIGHT QUIZ v3.0 — game.js
   ============================================= */

'use strict';

// ─────────────────────────────────────────────
// STARS INIT
// ─────────────────────────────────────────────
(function initStars() {
  const c = document.getElementById('stars');
  if (!c) return;
  for (let i = 0; i < 90; i++) {
    const d = document.createElement('div');
    d.className = 'star';
    const s = Math.random() * 2 + .4; 
    d.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${2+Math.random()*5}s;--delay:${Math.random()*5}s;--op:${.3+Math.random()*.7}`;
    c.appendChild(d);
  }
})();

// ─────────────────────────────────────────────
// DATA — BOSSES
// ─────────────────────────────────────────────
const BOSSES = {
  bio: {
    name:'ไวรัสโควิด', emoji:'🦠', subject:'ชีววิทยา', diff:'ง่าย', diffClass:'diff-easy',
    hp:80, xp:60, gold:30,
    taunt:'ข้าจะทำลายภูมิคุ้มกันของเจ้า!',
    qs:[
      {q:'ไวรัสโควิด-19 จัดอยู่ในตระกูลใด?',c:'โคโรนาไวรัส',w:['อินฟลูเอนซา','เฮอร์พีส','รีโทรไวรัส'],exp:'SARS-CoV-2 อยู่ในตระกูล Coronaviridae ซึ่งมีลักษณะเป็นมงกุฎ (Corona)'},
      {q:'โปรตีนที่ไวรัสใช้เกาะเซลล์มนุษย์คืออะไร?',c:'Spike Protein',w:['Capsid','Nucleocapsid','Membrane Protein'],exp:'Spike Protein จับกับ ACE2 receptor บนผิวเซลล์มนุษย์เพื่อเข้าสู่เซลล์'},
      {q:'วัคซีน mRNA ทำงานอย่างไร?',c:'กระตุ้นให้เซลล์สร้าง Spike Protein จำลอง',w:['ฉีดไวรัสที่ตายแล้ว','ฉีดแอนติบอดีสำเร็จรูป','กระตุ้นด้วยโปรตีนจากยีสต์'],exp:'mRNA ทำให้ร่างกายสร้าง Spike Protein ขึ้นมาเอง เพื่อฝึกระบบภูมิคุ้มกัน'},
      {q:'ระยะฟักตัวเฉลี่ยของโควิด-19 คือ?',c:'2-14 วัน',w:['1-3 วัน','15-30 วัน','12-24 ชั่วโมง'],exp:'WHO ระบุระยะฟักตัวเฉลี่ย 5-6 วัน แต่อาจนานถึง 14 วัน'},
      {q:'การแพร่กระจายหลักของโควิดผ่านทางใด?',c:'ละอองฝอยในอากาศ',w:['สัมผัสผิวหนัง','น้ำดื่ม','อาหาร'],exp:'ไวรัสแพร่ผ่าน droplet และ aerosol จากการหายใจ ไอ จาม'},
    ],
  },
  math: {
    name:'มังกรสมการ', emoji:'🐉', subject:'คณิตศาสตร์', diff:'ปานกลาง', diffClass:'diff-med',
    hp:100, xp:80, gold:40,
    taunt:'แก้สมการข้าได้ก็ค่อยคุย!',
    qs:[
      {q:'ค่าของ x ใน 2x + 6 = 14 คือ?',c:'4',w:['3','7','8'],exp:'2x = 14-6 = 8 → x = 4'},
      {q:'พื้นที่วงกลมรัศมี 5 ซม. (π≈3.14) คือ?',c:'78.5 ตร.ซม.',w:['31.4 ตร.ซม.','25 ตร.ซม.','157 ตร.ซม.'],exp:'A = πr² = 3.14 × 25 = 78.5 ตร.ซม.'},
      {q:'ถ้า a=3, b=4 แล้ว a²+b² = ?',c:'25',w:['7','12','49'],exp:'9 + 16 = 25 (Pythagorean triple: 3-4-5)'},
      {q:'log₁₀(1000) มีค่าเท่าใด?',c:'3',w:['10','100','30'],exp:'10³ = 1000 ดังนั้น log₁₀(1000) = 3'},
      {q:'โยนเหรียญ 2 ครั้ง ออกหัวทั้งคู่ความน่าจะเป็น?',c:'1/4',w:['1/2','1/3','1/8'],exp:'P(หัว)×P(หัว) = 1/2 × 1/2 = 1/4'},
      {q:'ผลบวกของเลขคี่ 10 จำนวนแรก (1+3+5+...+19) เท่ากับ?',c:'100',w:['50','90','110'],exp:'ผลบวก n เลขคี่แรก = n² = 10² = 100'},
    ],
  },
  history: {
    name:'จอมทัพโบราณ', emoji:'⚔️', subject:'ประวัติศาสตร์', diff:'ปานกลาง', diffClass:'diff-med',
    hp:90, xp:70, gold:35,
    taunt:'ประวัติศาสตร์ของเจ้ามีแค่ไหน?',
    qs:[
      {q:'กรุงสุโขทัยก่อตั้งขึ้นในปี พ.ศ. ใด?',c:'พ.ศ. 1781',w:['พ.ศ. 1893','พ.ศ. 1700','พ.ศ. 2000'],exp:'กรุงสุโขทัยก่อตั้งราว พ.ศ. 1781 โดยพ่อขุนศรีอินทราทิตย์'},
      {q:'พ่อขุนรามคำแหงประดิษฐ์อักษรไทยในปีใด?',c:'พ.ศ. 1826',w:['พ.ศ. 1900','พ.ศ. 1800','พ.ศ. 1750'],exp:'ศิลาจารึกหลักที่ 1 กล่าวถึงการประดิษฐ์อักษรไทย พ.ศ. 1826'},
      {q:'สงครามโลกครั้งที่ 2 สิ้นสุดปี ค.ศ. ใด?',c:'1945',w:['1944','1946','1943'],exp:'สงครามโลกครั้งที่ 2 สิ้นสุดปี 1945 หลังญี่ปุ่นยอมแพ้วันที่ 15 สิงหาคม'},
      {q:'กรุงเทพฯ สถาปนาเป็นราชธานีในปี พ.ศ. ใด?',c:'พ.ศ. 2325',w:['พ.ศ. 2300','พ.ศ. 2350','พ.ศ. 2400'],exp:'รัชกาลที่ 1 ทรงสถาปนากรุงรัตนโกสินทร์เมื่อ พ.ศ. 2325'},
      {q:'การปฏิวัติฝรั่งเศสเกิดขึ้นในปี ค.ศ. ใด?',c:'1789',w:['1776','1800','1815'],exp:'การปฏิวัติฝรั่งเศสเริ่มต้นปี 1789 นำไปสู่การล้มล้างระบอบกษัตริย์'},
    ],
  },
  science: {
    name:'จอมพลังงาน', emoji:'⚗️', subject:'วิทยาศาสตร์', diff:'ยาก', diffClass:'diff-hard',
    hp:120, xp:100, gold:50,
    taunt:'วิทยาศาสตร์เจ้าแข็งแค่ไหน?',
    qs:[
      {q:'กฎการอนุรักษ์พลังงานกล่าวว่าอย่างไร?',c:'พลังงานไม่สร้างหรือทำลาย เปลี่ยนรูปได้เท่านั้น',w:['พลังงานสร้างได้จากความร้อน','มวลเปลี่ยนเป็นพลังงานได้','พลังงานศักย์เท่ากับพลังงานจลน์เสมอ'],exp:'กฎการอนุรักษ์พลังงาน: พลังงานรวมในระบบปิดคงที่ตลอดเวลา'},
      {q:'น้ำมีสูตรเคมีว่าอะไร?',c:'H₂O',w:['HO₂','H₂O₂','H₃O'],exp:'น้ำประกอบด้วยไฮโดรเจน 2 อะตอมและออกซิเจน 1 อะตอม'},
      {q:'ความเร็วแสงในสุญญากาศประมาณเท่าไร?',c:'300,000 กม./วินาที',w:['150,000 กม./วินาที','3,000 กม./วินาที','30,000 กม./วินาที'],exp:'ค่า c ≈ 299,792,458 ม./วินาที หรือประมาณ 300,000 กม./วินาที'},
      {q:'เซลล์พืชมีส่วนใดที่เซลล์สัตว์ไม่มี?',c:'ผนังเซลล์และคลอโรพลาสต์',w:['ไมโตคอนเดรีย','นิวเคลียส','ไรโบโซม'],exp:'เซลล์พืชมีผนังเซลล์ (cell wall) และคลอโรพลาสต์ (chloroplast) ซึ่งเซลล์สัตว์ไม่มี'},
      {q:'ธาตุใดมีเลขอะตอม 1?',c:'ไฮโดรเจน (H)',w:['ฮีเลียม (He)','ออกซิเจน (O)','คาร์บอน (C)'],exp:'ไฮโดรเจนเป็นธาตุที่เบาที่สุดและมีเลขอะตอม 1'},
    ],
  },
  programming: {
    name:'บั๊กยักษ์', emoji:'🐛', subject:'วิทยาการคอมพิวเตอร์', diff:'ยาก', diffClass:'diff-hard',
    hp:110, xp:95, gold:48,
    taunt:'โค้ดเจ้ามี bug เต็มไปหมด!',
    qs:[
      {q:'Array ใน Python เริ่ม index ที่เท่าไร?',c:'0',w:['1','−1','ขึ้นอยู่กับการประกาศ'],exp:'Python (และภาษาส่วนใหญ่) เริ่ม index ที่ 0'},
      {q:'Big O notation O(n²) คืออะไร?',c:'Quadratic time complexity',w:['Linear','Constant','Logarithmic'],exp:'O(n²) = Quadratic ความซับซ้อนเพิ่มตามกำลังสองของ input'},
      {q:'HTTP status code 404 หมายความว่าอะไร?',c:'Not Found',w:['Server Error','Unauthorized','Forbidden'],exp:'404 Not Found = ไม่พบทรัพยากรที่ร้องขอ'},
      {q:'SQL คำสั่งใดใช้ดึงข้อมูลจากตาราง?',c:'SELECT',w:['INSERT','UPDATE','FETCH'],exp:'SELECT ใช้สำหรับดึงข้อมูล (query) จากฐานข้อมูล'},
      {q:'Git คำสั่งใดใช้ commit ไฟล์?',c:'git commit -m',w:['git push','git add','git save'],exp:'git commit -m "message" ใช้บันทึก snapshot ของโค้ดลงใน local repo'},
      {q:'ภาษาโปรแกรมใดที่ใช้ใน Machine Learning มากที่สุด?',c:'Python',w:['Java','C++','Ruby'],exp:'Python ได้รับความนิยมสูงสุดในงาน ML/AI เพราะมี library ครบครัน'},
    ],
  },
  geography: {
    name:'มังกรแผนที่', emoji:'🌍', subject:'ภูมิศาสตร์', diff:'ปานกลาง', diffClass:'diff-med',
    hp:95, xp:75, gold:38,
    taunt:'เจ้ารู้จักโลกมากแค่ไหน?',
    qs:[
      {q:'ทวีปที่ใหญ่ที่สุดในโลกคือ?',c:'เอเชีย',w:['แอฟริกา','อเมริกาเหนือ','ยุโรป'],exp:'เอเชียมีพื้นที่ประมาณ 44.6 ล้านตารางกิโลเมตร'},
      {q:'แม่น้ำที่ยาวที่สุดในโลกคือ?',c:'แม่น้ำไนล์',w:['แม่น้ำอเมซอน','แม่น้ำมิสซิสซิปปี','แม่น้ำแยงซี'],exp:'แม่น้ำไนล์ยาว 6,650 กม. ถือเป็นแม่น้ำยาวที่สุดในโลก'},
      {q:'ภูเขาที่สูงที่สุดในโลกคือ?',c:'เอเวอเรสต์',w:['K2','คังเชนจุงกา','โลตเซ'],exp:'ยอดเขาเอเวอเรสต์สูง 8,848.86 เมตร เหนือระดับน้ำทะเล'},
      {q:'ประเทศใดมีพื้นที่ใหญ่ที่สุดในโลก?',c:'รัสเซีย',w:['แคนาดา','จีน','สหรัฐอเมริกา'],exp:'รัสเซียมีพื้นที่ 17.1 ล้านตารางกิโลเมตร'},
      {q:'มหาสมุทรที่ใหญ่ที่สุดในโลกคือ?',c:'มหาสมุทรแปซิฟิก',w:['มหาสมุทรแอตแลนติก','มหาสมุทรอินเดีย','มหาสมุทรอาร์กติก'],exp:'มหาสมุทรแปซิฟิกมีพื้นที่ประมาณ 165.2 ล้านตารางกิโลเมตร'},
    ],
  },
  physics: {
    name:'ราชาแรงโน้มถ่วง', emoji:'🌌', subject:'ฟิสิกส์', diff:'ยากมาก', diffClass:'diff-epic',
    hp:140, xp:130, gold:65,
    taunt:'กฎฟิสิกส์ไม่เคยผิดพลาด แต่เจ้าจะผิดแน่!',
    qs:[
      {q:"กฎข้อที่ 2 ของนิวตัน F = ma หน่วยของ F คืออะไร?",c:'นิวตัน (N)',w:['จูล (J)','วัตต์ (W)','พาสคัล (Pa)'],exp:'หน่วยของแรงคือ นิวตัน (N) = kg⋅m/s²'},
      {q:'พลังงานจลน์คำนวณจากสูตรใด?',c:'½mv²',w:['mgh','mv','F×d'],exp:'KE = ½mv² โดย m คือมวล v คือความเร็ว'},
      {q:'คลื่นแสงเป็นคลื่นชนิดใด?',c:'คลื่นแม่เหล็กไฟฟ้า (ตามขวาง)',w:['คลื่นเสียง','คลื่นกล','คลื่นน้ำ'],exp:'แสงเป็นคลื่นแม่เหล็กไฟฟ้าชนิดตามขวาง ไม่ต้องการตัวกลาง'},
      {q:'อัตราเร็วเสียงในอากาศ (20°C) ประมาณ?',c:'343 ม./วินาที',w:['300 ม./วินาที','1500 ม./วินาที','100 ม./วินาที'],exp:'ที่อุณหภูมิ 20°C อัตราเร็วเสียงในอากาศ ≈ 343 ม./วินาที'},
      {q:'สูตรมวล-พลังงานของ Einstein คืออะไร?',c:'E = mc²',w:['E = mv²','E = mgh','E = ½mc²'],exp:'E = mc² แสดงความเทียบเท่าของมวลและพลังงาน โดย c คือความเร็วแสง'},
      {q:'ปรากฏการณ์ Doppler เกี่ยวข้องกับอะไร?',c:'การเปลี่ยนความถี่เมื่อแหล่งกำเนิดเคลื่อนที่',w:['การหักเหของแสง','การสะท้อนของเสียง','การรบกวนของคลื่น'],exp:'Doppler effect คือการเปลี่ยนความถี่ที่รับรู้เมื่อแหล่งกำเนิดหรือผู้รับเคลื่อนที่'},
    ],
  },
  english: {
    name:'Grammar Dragon', emoji:'📚', subject:'ภาษาอังกฤษ', diff:'ง่าย', diffClass:'diff-easy',
    hp:75, xp:55, gold:28,
    taunt:'Your English is terrible! Fight me!',
    qs:[
      {q:'"She ___ to school every day." ควรเติมคำใด?',c:'goes',w:['go','going','gone'],exp:'"She" เป็น 3rd person singular ดังนั้นใช้ "goes"'},
      {q:'Past tense ของ "run" คือ?',c:'ran',w:['runned','runs','ranned'],exp:'Irregular verb: run → ran → run'},
      {q:'ประโยคใดใช้ Present Perfect ถูกต้อง?',c:'I have finished my homework.',w:['I finished yesterday.','I am finishing homework.','I will have finished.'],exp:'Present Perfect: have/has + V3 ใช้แสดงการกระทำที่เพิ่งสำเร็จ'},
      {q:'"Beautiful" เป็น part of speech ใด?',c:'Adjective',w:['Adverb','Noun','Verb'],exp:'"Beautiful" เป็น adjective (คำคุณศัพท์) ใช้ขยายนาม'},
      {q:'ข้อใดสะกดถูกต้อง?',c:'Necessary',w:['Neccesary','Necesary','Necessery'],exp:'Necessary: N-E-C-E-S-S-A-R-Y จำง่ายๆ: "one collar, two sleeves"'},
    ],
  },
  astronomy: {
    name:'ราชาดาว', emoji:'⭐', subject:'ดาราศาสตร์', diff:'ยากมาก', diffClass:'diff-epic',
    hp:150, xp:150, gold:75,
    taunt:'จักรวาลกว้างใหญ่เกินกว่าเจ้าจะเข้าใจ!',
    qs:[
      {q:'ดาวฤกษ์ที่ใกล้โลกที่สุด (นอกจากดวงอาทิตย์) คือ?',c:'พร็อกซิมา เซนทอรี',w:['ซีเรียส','เวกา','อัลฟา เซนทอรี A'],exp:'พร็อกซิมา เซนทอรี อยู่ห่างโลก 4.24 ปีแสง'},
      {q:'แสงใช้เวลาจากดวงอาทิตย์ถึงโลกกี่นาที?',c:'ประมาณ 8 นาที',w:['1 นาที','30 นาที','1 ชั่วโมง'],exp:'150 ล้านกม. ÷ 300,000 กม./วินาที ≈ 500 วินาที ≈ 8.3 นาที'},
      {q:'กาแล็กซีทางช้างเผือกมีรูปร่างอย่างไร?',c:'Spiral Galaxy (กาแล็กซีก้นหอย)',w:['Elliptical Galaxy','Irregular Galaxy','Lenticular Galaxy'],exp:'Milky Way เป็น Barred Spiral Galaxy มีแขนก้นหอยและแท่งกลาง'},
      {q:'หลุมดำ (Black Hole) คืออะไร?',c:'บริเวณในอวกาศที่แรงโน้มถ่วงสูงมากจนแสงหนีไม่ได้',w:['ดาวที่ดับสูญไปแล้ว','บริเวณที่ไม่มีสสาร','ดาวนิวตรอนขนาดใหญ่'],exp:'หลุมดำเกิดจากดาวมวลมากยุบตัว แรงโน้มถ่วงสูงมากจน Escape velocity > c'},
      {q:'ดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะคือ?',c:'ดาวพฤหัสบดี',w:['ดาวเสาร์','ดาวยูเรนัส','ดาวเนปจูน'],exp:'ดาวพฤหัสบดีมีมวลมากกว่าโลก 318 เท่า และมีรัศมีมากกว่า 11 เท่า'},
    ],
  },
  thailand: {
    name:'สยามผู้พิทักษ์', emoji:'🏯', subject:'ความรู้ทั่วไปเกี่ยวกับไทย', diff:'ง่าย', diffClass:'diff-easy',
    hp:80, xp:60, gold:32,
    taunt:'เจ้ารู้จักดินแดนไทยมากแค่ไหน?',
    qs:[
      {q:'กรุงเทพมหานครมีชื่อเต็มยาวที่สุดในโลกกี่คำ?',c:'21 คำ',w:['15 คำ','30 คำ','10 คำ'],exp:'ชื่อเต็มของกรุงเทพฯ มี 21 คำ ได้รับการบันทึกใน Guinness World Records'},
      {q:'สัตว์ประจำชาติของไทยคือ?',c:'ช้างไทย',w:['เสือโคร่ง','นกยูง','กระทิง'],exp:'ช้างไทย (Asian Elephant) เป็นสัตว์ประจำชาติและสัญลักษณ์ของประเทศไทย'},
      {q:'วัดพระแก้วตั้งอยู่ในจังหวัดใด?',c:'กรุงเทพมหานคร',w:['เชียงใหม่','นครปฐม','พระนครศรีอยุธยา'],exp:'วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว) ตั้งอยู่ในพระบรมมหาราชวัง กรุงเทพฯ'},
      {q:'ไทยเป็นผู้ส่งออกข้าวอันดับที่เท่าไรของโลก?',c:'อันดับ 1-2',w:['อันดับ 5','อันดับ 10','อันดับ 3-4'],exp:'ไทยเป็นผู้ส่งออกข้าวรายใหญ่ที่สุดของโลกหลายทศวรรษ สลับกับอินเดียและเวียดนาม'},
      {q:'ภาษาไทยมีพยัญชนะต้นกี่ตัว?',c:'44 ตัว',w:['32 ตัว','21 ตัว','56 ตัว'],exp:'อักษรไทยมีพยัญชนะ 44 ตัว แม้ปัจจุบันใช้จริง 42 ตัว'},
    ],
  },
};

// ─────────────────────────────────────────────
// DATA — ENDLESS QUESTIONS POOL
// ─────────────────────────────────────────────
const ENDLESS_POOL = [
  {q:'DNA ย่อมาจากอะไร?',c:'Deoxyribonucleic Acid',w:['Diphosphate Nucleic Acid','Dimethyl Nucleotide Array','Dipeptide Nucleic Acid'],exp:'DNA = Deoxyribonucleic Acid สารพันธุกรรมในเซลล์'},
  {q:'เลขฟีโบนักชีลำดับที่ 7 คือ?',c:'13',w:['8','21','5'],exp:'1,1,2,3,5,8,13 — ลำดับที่ 7 คือ 13'},
  {q:'สารใดเป็นตัวนำไฟฟ้าที่ดีที่สุด?',c:'เงิน (Silver)',w:['ทองแดง','ทอง','อลูมิเนียม'],exp:'เงินมีค่าการนำไฟฟ้าสูงที่สุดในบรรดาโลหะ'},
  {q:'กระดูกที่เล็กที่สุดในร่างกายมนุษย์อยู่ที่?',c:'หู (กระดูกโกลน)',w:['นิ้วมือ','จมูก','ข้อมือ'],exp:'กระดูกโกลน (stapes) ในหูชั้นกลาง ขนาด ~3 มม.'},
  {q:'Python สร้างโดยใคร?',c:'Guido van Rossum',w:['Linus Torvalds','Dennis Ritchie','Bjarne Stroustrup'],exp:'Guido van Rossum สร้าง Python ในปี 1991'},
  {q:'ร่างกายมนุษย์มีกระดูกทั้งหมดกี่ชิ้น?',c:'206 ชิ้น',w:['196 ชิ้น','216 ชิ้น','300 ชิ้น'],exp:'ผู้ใหญ่มีกระดูก 206 ชิ้น (เด็กแรกเกิดมีมากกว่า ~300 ชิ้น)'},
  {q:'โลกอยู่ห่างจากดวงอาทิตย์เฉลี่ยกี่ล้านกิโลเมตร?',c:'150 ล้าน กม.',w:['93 ล้าน กม.','300 ล้าน กม.','1,000 ล้าน กม.'],exp:'1 AU (Astronomical Unit) = 149.6 ล้านกิโลเมตร'},
  {q:'น้ำแข็งแห้ง (Dry Ice) คือ?',c:'CO₂ แข็ง',w:['H₂O แข็ง','N₂ แข็ง','O₂ แข็ง'],exp:'Dry Ice คือคาร์บอนไดออกไซด์ในสถานะของแข็ง อุณหภูมิ −78.5°C'},
  {q:'การ์ตูน Mickey Mouse สร้างโดยใคร?',c:'Walt Disney',w:['Chuck Jones','Warner Bros','Hanna-Barbera'],exp:'Walt Disney สร้าง Mickey Mouse ปี 1928'},
  {q:'ประเทศใดเล็กที่สุดในโลก?',c:'วาติกัน',w:['โมนาโก','ซานมารีโน','ลิกเตนสไตน์'],exp:'นครรัฐวาติกันมีพื้นที่เพียง 0.44 ตารางกิโลเมตร'},
];

// ─────────────────────────────────────────────
// DATA — SKILLS
// ─────────────────────────────────────────────
const SKILL_DEFS = [
  {id:'hint',     name:'คำใบ้',          icon:'💡', desc:'ตัดตัวเลือกผิด 2 ตัวออก',                      type:'active',  unlockLv:1,  maxCd:3},
  {id:'shield',   name:'โล่เหล็ก',       icon:'🛡️', desc:'ป้องกันดาเมจครั้งถัดไป 1 ครั้ง',               type:'active',  unlockLv:2,  maxCd:4},
  {id:'double',   name:'ดาบสองคม',       icon:'⚡',  desc:'ดาเมจคำถามถัดไป x2',                          type:'active',  unlockLv:3,  maxCd:5},
  {id:'regen',    name:'ฟื้นฟูพลัง',    icon:'💚', desc:'ตอบถูก Streak ≥3 ฟื้น HP +20 ทุก 3 streak',   type:'passive', unlockLv:4,  maxCd:0},
  {id:'crit',     name:'โจมตีคริ',       icon:'🗡️', desc:'10% โอกาสดาเมจ x3',                            type:'passive', unlockLv:5,  maxCd:0},
  {id:'time_stop',name:'หยุดเวลา',       icon:'⏳', desc:'ข้ามคำถาม 1 ข้อโดยไม่โดนตีและไม่นับ wrong',   type:'active',  unlockLv:6,  maxCd:6},
  {id:'leech',    name:'ดูดชีพ',         icon:'🩸', desc:'ดีลดาเมจบอส ฟื้น HP 50% ของดาเมจ',             type:'passive', unlockLv:7,  maxCd:0},
  {id:'bomb_skill',name:'ระเบิดความรู้', icon:'💥', desc:'ดีลดาเมจบอสทันที 40 HP (สูงสุด 1 ครั้ง/ด่าน)',type:'ultimate',unlockLv:8,  maxCd:99},
  {id:'reflect',  name:'สะท้อนดาเมจ',   icon:'🪞', desc:'ตอบผิดแต่สะท้อนดาเมจ 50% กลับบอส (1 ครั้ง)',  type:'active',  unlockLv:9,  maxCd:7},
  {id:'lucky',    name:'โชคลาภ',        icon:'🍀', desc:'ตอบผิดแต่ลุ้น 30% ว่าบอสจะ miss',               type:'passive', unlockLv:10, maxCd:0},
];

// ─────────────────────────────────────────────
// DATA — ITEMS
// ─────────────────────────────────────────────
const ITEMS = [
  {id:'potion',    name:'ยาฟื้น HP',       icon:'🧪', desc:'ฟื้น HP 30 ทันที',                      rarity:'common', effect:'heal30'},
  {id:'mega_pot',  name:'ยาฟื้น HP Max',   icon:'💉', desc:'ฟื้น HP เต็ม 100%',                     rarity:'epic',   effect:'fullheal'},
  {id:'bomb',      name:'ระเบิดดาเมจ',     icon:'💣', desc:'ดีลบอส 25 HP ทันที',                    rarity:'rare',   effect:'dmg25'},
  {id:'mega_bomb', name:'ระเบิดนิวเคลียร์',icon:'☢️', desc:'ดีลบอส 60 HP ทันที',                    rarity:'epic',   effect:'dmg60'},
  {id:'scroll',    name:'คัมภีร์ข้ามด่าน', icon:'📜', desc:'ข้ามคำถาม 1 ข้อไม่เสีย HP',             rarity:'rare',   effect:'skip'},
  {id:'crystal',   name:'คริสตัลพลัง',     icon:'💎', desc:'XP x2 สำหรับด่านนี้',                  rarity:'epic',   effect:'xp2'},
  {id:'elixir',    name:'ยาอมฤต',          icon:'✨', desc:'ฟื้น HP เต็ม + บอสเสีย 15 HP',          rarity:'legend', effect:'elixir'},
  {id:'magnet',    name:'แม่เหล็กทอง',     icon:'🧲', desc:'Gold ที่ได้จากด่านนี้ x2',              rarity:'rare',   effect:'gold2'},
  {id:'shield_item',name:'โล่เพชร',        icon:'🔷', desc:'ป้องกันดาเมจ 3 ครั้งถัดไป',             rarity:'epic',   effect:'shield3'},
  {id:'revive',    name:'หินคืนชีพ',       icon:'💫', desc:'ฟื้นคืนชีพ 1 ครั้งเมื่อ HP = 0',        rarity:'legend', effect:'revive'},
];

// ─────────────────────────────────────────────
// USERS / AUTH SYSTEM
// ─────────────────────────────────────────────
const USERS_KEY = 'bfq_users_v3';
const SESSION_KEY = 'bfq_session_v3';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); }
  catch { return {}; }
}
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}
function saveSession(s) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
function clearSession()  { sessionStorage.removeItem(SESSION_KEY); }

function doLogin() {
  const username    = document.getElementById('login-username').value.trim() || 'Guest';
  const displayName = document.getElementById('login-displayname')?.value.trim() || username;

  const session = { username, displayName, role: 'user' };
  saveSession(session);

  // สร้าง save data ถ้ายังไม่มี
  const users = getUsers();
  if (!users[username]) {
    users[username] = defaultSave(displayName);
    saveUsers(users);
  }

  closeLoginModal();
  onLoginSuccess(session);
}

// Default player save
function defaultSave(name) {
  return {
    name, level:1, xp:0, gold:100, highFloor:0,
    wins:0, losses:0, totalScore:0, dailyDone:false, dailyDate:'',
    inventory:{ potion:3, bomb:0, scroll:0, crystal:0, elixir:0, magnet:0, shield_item:0, mega_pot:0, mega_bomb:0, revive:0 },
    skillCDs:{ hint:0, shield:0, double:0, time_stop:0, bomb_skill:0, reflect:0 },
  };
}

// ─────────────────────────────────────────────
// GLOBAL STATE
// ─────────────────────────────────────────────
const XP_TABLE = [0,100,220,380,580,820,1100,1430,1810,2240,2720];
const RARITY_CLASS = {common:'rarity-common',rare:'rarity-rare',epic:'rarity-epic',legend:'rarity-legend'};
const RARITY_LABEL = {common:'Common',rare:'Rare',epic:'Epic',legend:'Legendary'};

let currentUser = null;  // username string
let P = {};              // player save data (sync with localStorage)

// Battle state
let B = {};

// Active battle buffs (runtime only, not saved)
let BUFF = { shieldActive:0, doubleActive:false, goldX2:false, xp2:false, reviveReady:false, bombSkillUsed:false, reflectActive:false };

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
  const sess = getSession();
  if (sess && sess.user) {
    const users = getUsers();
    if (users[sess.user]) {
      currentUser = sess.user;
      P = users[sess.user];
      startApp();
    } else {
      showLoginScreen();
    }
  } else {
    showLoginScreen();
  }
});

// ─────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────
let loginMode = 'login'; // 'login' | 'register'

function showLoginScreen() {
  document.getElementById('login-screen').style.display = '';
  document.getElementById('app').style.display = 'none';
  renderLoginForm();
}

function renderLoginForm() {
  document.getElementById('login-tab-login').classList.toggle('active', loginMode === 'login');
  document.getElementById('login-tab-register').classList.toggle('active', loginMode === 'register');
  const extra = document.getElementById('register-extra');
  if (extra) extra.style.display = loginMode === 'register' ? '' : 'none';
  document.getElementById('login-btn-text').textContent = loginMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก';
  document.getElementById('login-error').textContent = '';
}

function switchLoginTab(mode) { loginMode = mode; renderLoginForm(); }

function doLogin() {
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value;
  if (!u || !p) { document.getElementById('login-error').textContent = 'กรุณากรอกข้อมูลให้ครบ'; return; }
  const users = getUsers();
  if (loginMode === 'login') {
    if (!users[u]) { document.getElementById('login-error').textContent = 'ไม่พบชื่อผู้ใช้นี้'; return; }
    if (users[u].password !== p) { document.getElementById('login-error').textContent = 'รหัสผ่านไม่ถูกต้อง'; return; }
    currentUser = u;
    P = users[u];
    saveSession({ user: u });
    startApp();
  } else {
    if (users[u]) { document.getElementById('login-error').textContent = 'ชื่อผู้ใช้นี้มีแล้ว'; return; }
    if (p.length < 4) { document.getElementById('login-error').textContent = 'รหัสผ่านต้องมีอย่างน้อย 4 ตัว'; return; }
    const save = defaultSave(u);
    save.password = p;
    users[u] = save;
    saveUsers(users);
    currentUser = u;
    P = save;
    saveSession({ user: u });
    startApp();
  }
}

function doLogout() {
  savePlayerData();
  clearSession();
  currentUser = null;
  P = {};
  showLoginScreen();
}

// ─────────────────────────────────────────────
// APP START
// ─────────────────────────────────────────────
function startApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = '';
  checkDailyReset();
  updateStatusBar();
  renderSkillsTab();
  renderInventoryTab();
  showTab('home');
  document.getElementById('player-name-display').textContent = 'สวัสดี, ' + P.name + '! ⚔️';
}

function savePlayerData() {
  if (!currentUser) return;
  const users = getUsers();
  users[currentUser] = P;
  saveUsers(users);
}

// ─────────────────────────────────────────────
// DAILY CHALLENGE
// ─────────────────────────────────────────────
function checkDailyReset() {
  const today = new Date().toDateString();
  if (P.dailyDate !== today) { P.dailyDone = false; P.dailyDate = today; savePlayerData(); }
}

function startDaily() {
  if (P.dailyDone) { toast('✅ ทำ Daily Challenge วันนี้แล้ว! กลับมาพรุ่งนี้', 'green-toast'); return; }
  // สุ่มคำถาม 7 ข้อจาก pool ทั้งหมด
  const all = [...ENDLESS_POOL, ...Object.values(BOSSES).flatMap(b => b.qs)];
  const pool = shuffle(all).slice(0, 7);
  B = {
    isEndless:false, isDaily:true, bossKey:null, floor:1,
    qIndex:0, qPool:pool,
    playerHp:100, playerMaxHp:100,
    bossHp:150, bossMaxHp:150,
    streak:0, maxStreak:0,
    score:0, correct:0, wrong:0, answered:false,
  };
  resetBattleBuffs();
  openBattleScreen({ name:'Daily Challenge', emoji:'🌟', taunt:'ทำให้ได้ทุกข้อเลย!' });
  renderQuestion();
}

// ─────────────────────────────────────────────
// TAB NAVIGATION
// ─────────────────────────────────────────────
function showTab(name) {
  const tabs = ['home','skills','inventory','shop','board'];
  tabs.forEach(t => {
    const s = document.getElementById('screen-' + t);
    const b = document.getElementById('tab-' + t);
    if (s) s.style.display = t === name ? '' : 'none';
    if (b) b.classList.toggle('active', t === name);
  });
  document.getElementById('screen-battle').style.display = 'none';
  document.getElementById('screen-result').style.display = 'none';
  if (name === 'inventory') renderInventoryTab();
  if (name === 'skills')    renderSkillsTab();
  if (name === 'shop')      renderShop();
  if (name === 'board')     renderLeaderboard();
}

// ─────────────────────────────────────────────
// STATUS BAR
// ─────────────────────────────────────────────
function updateStatusBar() {
  document.getElementById('stat-level').textContent = P.level;
  document.getElementById('stat-gold').textContent  = P.gold;
  document.getElementById('stat-wins').textContent  = P.wins || 0;
  document.getElementById('stat-floor').textContent = P.highFloor || 0;
  const base  = XP_TABLE[P.level - 1] || 0;
  const next  = XP_TABLE[P.level]     || base + 1000;
  const cur   = Math.max(0, P.xp - base);
  const range = Math.max(1, next - base);
  const pct   = Math.min(100, Math.round(cur / range * 100));
  document.getElementById('xp-fill').style.width    = pct + '%';
  document.getElementById('xp-label-left').textContent  = cur + ' / ' + range + ' XP';
  document.getElementById('xp-label-right').textContent = 'Lv.' + P.level;
}
function xpForLevel(l) { return XP_TABLE[Math.min(l, XP_TABLE.length-1)] || 0; }

// ─────────────────────────────────────────────
// START BATTLE
// ─────────────────────────────────────────────
function startBattle(key) {
  const boss = BOSSES[key];
  B = {
    isEndless:false, isDaily:false, bossKey:key, floor:1,
    qIndex:0, qPool:shuffle([...boss.qs]),
    playerHp:100, playerMaxHp:100,
    bossHp:boss.hp, bossMaxHp:boss.hp,
    streak:0, maxStreak:0,
    score:0, correct:0, wrong:0, answered:false,
  };
  resetBattleBuffs();
  openBattleScreen(boss);
  renderQuestion();
}

function startEndless() {
  const floor = 1;
  B = {
    isEndless:true, isDaily:false, bossKey:null, floor,
    qIndex:0, qPool:buildEndlessPool(floor),
    playerHp:100, playerMaxHp:100,
    bossHp:bossHpFloor(floor), bossMaxHp:bossHpFloor(floor),
    streak:0, maxStreak:0,
    score:0, correct:0, wrong:0, answered:false,
  };
  resetBattleBuffs();
  openBattleScreen(bossForFloor(floor));
  renderQuestion();
}

function bossHpFloor(f) { return 70 + f * 18; }
function bossForFloor(f) { const keys=Object.keys(BOSSES); return BOSSES[keys[f % keys.length]]; }
function buildEndlessPool(f) {
  const all = [...ENDLESS_POOL, ...Object.values(BOSSES).flatMap(b=>b.qs)];
  return shuffle(all).slice(0, Math.min(5 + Math.floor(f/2), 15));
}

function resetBattleBuffs() {
  BUFF = { shieldActive:0, doubleActive:false, goldX2:false, xp2:false, reviveReady:!!P.inventory.revive && P.inventory.revive > 0, bombSkillUsed:false, reflectActive:false };
  // Tick down skill CDs by 0 (just reset active buffs, CDs persist across battles)
}

function openBattleScreen(boss) {
  const tabs = ['home','skills','inventory','shop','board','result'];
  tabs.forEach(s => { const el=document.getElementById('screen-'+s); if(el) el.style.display='none'; });
  document.getElementById('screen-battle').style.display = '';

  const fb = document.getElementById('floor-banner');
  fb.style.display = B.isEndless ? '' : 'none';
  if (B.isEndless) {
    document.getElementById('floor-display').textContent = 'ชั้น ' + B.floor;
    document.getElementById('floor-record').textContent  = 'สถิติ: ' + (P.highFloor || 0);
  }
  document.getElementById('boss-name-display').textContent = boss.emoji + ' ' + boss.name;
  document.getElementById('boss-face').textContent          = boss.emoji;
  document.getElementById('boss-taunt').textContent         = boss.taunt || '';
}

// ─────────────────────────────────────────────
// RENDER QUESTION
// ─────────────────────────────────────────────
function renderQuestion() {
  const q = B.qPool[B.qIndex];
  if (!q) { endBattle(true); return; }
  B.answered = false;
  updateHPBars(); updateComboBar();
  document.getElementById('q-counter').textContent    = 'ข้อ '+(B.qIndex+1)+'/'+B.qPool.length;
  document.getElementById('battle-score').textContent = 'คะแนน: '+B.score;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('battle-log').style.display  = 'none';
  document.getElementById('action-row').style.display  = 'none';
  renderSkillBtns();

  const el = document.getElementById('choices');
  el.innerHTML = '';
  shuffle([q.c, ...q.w]).forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = ch;
    btn.addEventListener('click', () => answer(ch === q.c, btn, q));
    el.appendChild(btn);
  });
}

// ─────────────────────────────────────────────
// ANSWER LOGIC (FULLY FIXED)
// ─────────────────────────────────────────────
function answer(isCorrect, btn, q) {
  if (B.answered) return;
  B.answered = true;

  // lock all buttons & highlight correct
  document.querySelectorAll('.choice').forEach(b => {
    b.disabled = true;
    if (b.textContent === q.c) b.classList.add('correct');
  });

  const log = document.getElementById('battle-log');
  let logHTML = '';

  if (isCorrect) {
    // ── CORRECT ──
    let dmg = Math.floor(Math.random() * 12) + 15;

    // Double skill buff
    if (BUFF.doubleActive) {
      dmg *= 2;
      BUFF.doubleActive = false;
      toast('⚡ ดาเมจสองเท่า!', 'gold-toast');
    }
    // Crit passive (Lv5+)
    if (P.level >= 5 && Math.random() < 0.1) {
      dmg = Math.round(dmg * 3);
      toast('🗡️ คริติคอล! x3', 'gold-toast');
    }
    // Streak multiplier
    dmg = Math.round(dmg * (1 + B.streak * 0.05));

    B.bossHp = Math.max(0, B.bossHp - dmg);
    B.streak++;
    B.correct++;
    B.score += 10 + B.streak * 2;
    if (B.streak > B.maxStreak) B.maxStreak = B.streak;

    // Leech passive (Lv7+)
    let leechHeal = 0;
    if (P.level >= 7) {
      leechHeal = Math.round(dmg * 0.5);
      B.playerHp = Math.min(B.playerMaxHp, B.playerHp + leechHeal);
    }
    // Regen passive (Lv4+, every 3 streak)
    if (P.level >= 4 && B.streak >= 3 && B.streak % 3 === 0) {
      B.playerHp = Math.min(B.playerMaxHp, B.playerHp + 20);
      toast('💚 Regen! +20 HP', 'green-toast');
    }

    logHTML = `<span class="log-good">✅ ถูก! ดีลดาเมจบอส -${dmg} HP${B.streak > 1 ? ' | 🔥 Streak ×'+B.streak : ''}${leechHeal ? ' | 💚 Leech +'+leechHeal : ''}</span>`
            + `<span class="log-exp">📖 ${q.exp}</span>`;
    showDmgPop('-'+dmg+' HP', 'boss');

    if (B.bossHp <= 0) {
      log.innerHTML = logHTML; log.style.display = '';
      updateHPBars(); updateComboBar();
      setTimeout(() => endBattle(true), 700);
      return;
    }

  } else {
    // ── WRONG ──
    btn.classList.add('wrong');

    // Lucky passive (Lv10+)
    if (P.level >= 10 && Math.random() < 0.3) {
      logHTML = `<span class="log-shield">🍀 โชคช่วย! บอส miss!</span><span class="log-exp">📖 ${q.exp}</span>`;
      toast('🍀 Lucky! บอส Miss!', 'gold-toast');
    }
    // Shield skill buff
    else if (BUFF.shieldActive > 0) {
      BUFF.shieldActive--;
      logHTML = `<span class="log-shield">🛡️ โล่กั้นดาเมจ! (เหลือ ${BUFF.shieldActive} ครั้ง)</span><span class="log-exp">📖 ${q.exp}</span>`;
      toast('🛡️ โล่กั้น! เหลือ '+BUFF.shieldActive+' ครั้ง');
    }
    // Reflect skill buff
    else if (BUFF.reflectActive) {
      BUFF.reflectActive = false;
      const rdmg = Math.floor(Math.random() * 10) + 10;
      const pdmg = Math.round(rdmg * 0.5);
      B.bossHp   = Math.max(0, B.bossHp - rdmg);
      B.playerHp = Math.max(0, B.playerHp - pdmg);
      logHTML = `<span class="log-shield">🪞 สะท้อนดาเมจ! บอสเสีย ${rdmg} เจ้าเสีย ${pdmg}</span><span class="log-exp">📖 ${q.exp}</span>`;
      toast('🪞 สะท้อนดาเมจ!', 'purple-toast');
      showDmgPop('-'+rdmg+' HP', 'boss');
      showDmgPop('-'+pdmg+' HP', 'player');
    }
    // Normal damage
    else {
      const dmg = Math.floor(Math.random() * 12) + 10;
      B.playerHp = Math.max(0, B.playerHp - dmg);
      logHTML = `<span class="log-bad">❌ ผิด! โดนตี -${dmg} HP</span><span class="log-exp">📖 ${q.exp}</span>`;
      document.getElementById('question-card').classList.add('shake');
      setTimeout(() => document.getElementById('question-card').classList.remove('shake'), 400);
      showDmgPop('-'+dmg+' HP', 'player');
    }

    B.streak = 0;
    B.wrong++;

    // Revive item check
    if (B.playerHp <= 0 && BUFF.reviveReady) {
      BUFF.reviveReady = false;
      P.inventory.revive = Math.max(0, (P.inventory.revive||0) - 1);
      B.playerHp = 50;
      toast('💫 คืนชีพ! HP = 50', 'purple-toast');
      log.innerHTML = logHTML; log.style.display = '';
      updateHPBars(); updateComboBar();
      document.getElementById('action-row').style.display = 'flex';
      return;
    }

    if (B.playerHp <= 0) {
      log.innerHTML = logHTML; log.style.display = '';
      updateHPBars(); updateComboBar();
      setTimeout(() => endBattle(false), 700);
      return;
    }
  }

  log.innerHTML = logHTML; log.style.display = '';
  updateHPBars(); updateComboBar();
  document.getElementById('action-row').style.display = 'flex';
}

// ─────────────────────────────────────────────
// NEXT QUESTION / FLOOR
// ─────────────────────────────────────────────
function nextQuestion() {
  // Tick skill CDs
  Object.keys(P.skillCDs).forEach(k => { if (P.skillCDs[k] > 0) P.skillCDs[k]--; });
  B.qIndex++;
  if (B.qIndex >= B.qPool.length) {
    if (B.isEndless) nextFloor();
    else endBattle(B.bossHp <= 0 || B.correct > B.wrong);
    return;
  }
  renderQuestion();
}

function nextFloor() {
  B.floor++;
  if (B.floor > (P.highFloor||0)) { P.highFloor = B.floor; savePlayerData(); }
  B.bossHp    = bossHpFloor(B.floor);
  B.bossMaxHp = B.bossHp;
  B.qPool     = buildEndlessPool(B.floor);
  B.qIndex    = 0;
  const boss = bossForFloor(B.floor);
  document.getElementById('boss-name-display').textContent = boss.emoji + ' ' + boss.name;
  document.getElementById('boss-face').textContent         = boss.emoji;
  document.getElementById('boss-taunt').textContent        = boss.taunt;
  document.getElementById('floor-display').textContent     = 'ชั้น ' + B.floor;
  document.getElementById('floor-record').textContent      = 'สถิติ: ' + (P.highFloor||0);
  updateStatusBar();
  toast('🗼 ชั้น '+B.floor+'! ศัตรูแข็งขึ้น!', 'gold-toast');
  renderQuestion();
}

function surrenderBattle() { endBattle(false); }

// ─────────────────────────────────────────────
// END BATTLE
// ─────────────────────────────────────────────
function endBattle(win) {
  // Calculate rewards
  let baseXP = win
    ? (B.isDaily ? 200 : B.isEndless ? B.floor * 45 : (BOSSES[B.bossKey]?.xp || 60))
    : Math.floor(B.correct * 8);
  const bonusXP  = BUFF.xp2 ? baseXP : 0;
  BUFF.xp2 = false;
  const totalXP  = baseXP + bonusXP + (B.maxStreak >= 5 ? 30 : B.maxStreak >= 3 ? 15 : 0);

  let baseGold = win
    ? (B.isDaily ? 100 : B.isEndless ? B.floor * 22 : (BOSSES[B.bossKey]?.gold || 30))
    : Math.floor(B.correct * 5);
  if (BUFF.goldX2) { baseGold *= 2; BUFF.goldX2 = false; }
  const totalGold = baseGold;

  if (win) { P.wins = (P.wins||0) + 1; }
  else     { P.losses = (P.losses||0) + 1; }
  P.totalScore = (P.totalScore||0) + B.score;
  P.gold += totalGold;
  addXP(totalXP);

  // Daily done
  if (B.isDaily && win) { P.dailyDone = true; }

  // Grade
  const acc = B.correct + B.wrong > 0 ? B.correct / (B.correct + B.wrong) : 0;
  const grade = acc >= 1 ? 'S' : acc >= 0.8 ? 'A' : acc >= 0.6 ? 'B' : acc >= 0.4 ? 'C' : 'D';

  // Item drop
  let dropItem = null;
  if (win && Math.random() < 0.45) {
    const pool = (B.isEndless && B.floor >= 5) ? ITEMS.slice(3) : ITEMS.slice(0, 5);
    dropItem = pool[Math.floor(Math.random() * pool.length)];
    P.inventory[dropItem.id] = (P.inventory[dropItem.id] || 0) + 1;
  }

  savePlayerData();

  // Show result screen
  ['home','skills','inventory','shop','board','battle'].forEach(s => {
    const el = document.getElementById('screen-'+s);
    if (el) el.style.display = 'none';
  });
  document.getElementById('screen-result').style.display = '';

  document.getElementById('result-icon').textContent  = win ? (grade==='S'?'🏆':grade==='A'?'🥇':'🎖️') : '💀';
  document.getElementById('result-title').textContent =
    win ? (B.isDaily?'Daily Clear!':B.isEndless?'ถึงชั้น '+B.floor+'!':'ชนะแล้ว!') : 'แพ้แล้ว...';
  document.getElementById('result-sub').textContent   =
    win ? 'ยอดเยี่ยม! เจ้าเก่งขึ้นทุกวัน' : 'อย่าท้อ ทบทวนแล้วสู้ใหม่';
  document.getElementById('result-grade').textContent  = grade;
  document.getElementById('result-grade').className    = 'grade-badge grade-'+grade;

  document.getElementById('r-correct').textContent  = B.correct;
  document.getElementById('r-wrong').textContent    = B.wrong;
  document.getElementById('r-maxcombo').textContent = B.maxStreak;
  document.getElementById('r-score').textContent    = B.score;

  let rHTML = `
    <div class="reward-row"><span class="reward-icon">⭐</span><span class="reward-name">XP</span><span class="reward-val">+${totalXP}${bonusXP?' (x2)':''}</span></div>
    <div class="reward-row"><span class="reward-icon">💰</span><span class="reward-name">Gold</span><span class="reward-val">+${totalGold}${BUFF.goldX2?' (x2)':''}</span></div>`;
  if (B.maxStreak >= 3)
    rHTML += `<div class="reward-row"><span class="reward-icon">🔥</span><span class="reward-name">Streak Bonus</span><span class="reward-val">+${B.maxStreak>=5?30:15} XP</span></div>`;
  if (dropItem)
    rHTML += `<div class="reward-row"><span class="reward-icon">${dropItem.icon}</span><span class="reward-name">${dropItem.name} (ดรอป!)</span><span class="reward-val">+1</span></div>`;
  document.getElementById('rewards-list').innerHTML = rHTML;
  updateStatusBar();
}

// ─────────────────────────────────────────────
// SKILLS — BATTLE QUICK BAR
// ─────────────────────────────────────────────
function renderSkillBtns() {
  const row = document.getElementById('skills-row');
  row.innerHTML = '';

  // Active skills unlocked
  SKILL_DEFS.filter(s => s.type !== 'passive' && P.level >= s.unlockLv).forEach(s => {
    const cd    = P.skillCDs[s.id] || 0;
    const isActive = (s.id==='shield' && BUFF.shieldActive>0) || (s.id==='double' && BUFF.doubleActive) || (s.id==='reflect' && BUFF.reflectActive);
    const used  = s.id === 'bomb_skill' && BUFF.bombSkillUsed;
    const ready = cd === 0 && !used;
    const btn   = document.createElement('button');
    btn.className = 'skill-btn' + (isActive ? ' active-buff' : ready ? ' ready' : ' disabled');
    btn.innerHTML = `${s.icon} ${s.name}${cd > 0 ? `<span class="skill-cd">(${cd})</span>` : ''}`;
    if (ready && !isActive) btn.addEventListener('click', () => useSkill(s.id));
    row.appendChild(btn);
  });

  // Items in inventory
  ITEMS.forEach(item => {
    const qty = P.inventory[item.id] || 0;
    if (qty <= 0) return;
    if (item.id === 'revive') return; // auto-use only
    const btn = document.createElement('button');
    btn.className = 'skill-btn item-btn ready';
    btn.innerHTML = `${item.icon} ${item.name}(${qty})`;
    btn.addEventListener('click', () => useItemInBattle(item.id));
    row.appendChild(btn);
  });
}

function useSkill(id) {
  if (!B.answered && id !== 'hint' && id !== 'time_stop' && id !== 'bomb_skill') {
    // shield / double / reflect activate before answering = OK
  }
  if (id === 'hint' && B.answered) { toast('ใช้ก่อนตอบเท่านั้น!'); return; }
  if ((P.skillCDs[id]||0) > 0)    { toast('Skill ยังคูลดาวน์อยู่!'); return; }
  if (id === 'bomb_skill' && BUFF.bombSkillUsed) { toast('ใช้ไปแล้วด่านนี้!'); return; }

  const sk = SKILL_DEFS.find(s => s.id === id);

  switch(id) {
    case 'hint': {
      if (B.answered) { toast('ใช้ก่อนตอบ!'); return; }
      const q = B.qPool[B.qIndex];
      let removed = 0;
      document.querySelectorAll('.choice').forEach(b => {
        if (b.textContent !== q.c && removed < 2) {
          b.classList.add('hint-removed'); b.disabled = true; removed++;
        }
      });
      P.skillCDs[id] = sk.maxCd;
      toast('💡 ตัดตัวเลือกผิด 2 ตัว!');
      break;
    }
    case 'shield':
      BUFF.shieldActive = 1;
      P.skillCDs[id] = sk.maxCd;
      toast('🛡️ โล่กั้นดาเมจ พร้อม!');
      break;
    case 'double':
      BUFF.doubleActive = true;
      P.skillCDs[id] = sk.maxCd;
      toast('⚡ ดาเมจ x2 พร้อม!', 'gold-toast');
      break;
    case 'time_stop': {
      if (B.qIndex >= B.qPool.length - 1) { toast('ข้ามไม่ได้แล้ว!'); return; }
      P.skillCDs[id] = sk.maxCd;
      B.qIndex++;
      toast('⏳ ข้ามคำถาม!', 'purple-toast');
      renderQuestion();
      return;
    }
    case 'bomb_skill':
      B.bossHp = Math.max(0, B.bossHp - 40);
      BUFF.bombSkillUsed = true;
      P.skillCDs[id] = sk.maxCd;
      toast('💥 ระเบิดความรู้! บอสเสีย 40 HP', 'gold-toast');
      showDmgPop('-40 HP', 'boss');
      updateHPBars();
      if (B.bossHp <= 0) { setTimeout(() => endBattle(true), 500); return; }
      break;
    case 'reflect':
      BUFF.reflectActive = true;
      P.skillCDs[id] = sk.maxCd;
      toast('🪞 สะท้อนดาเมจ พร้อม!', 'purple-toast');
      break;
  }
  savePlayerData();
  renderSkillBtns();
}

// ─────────────────────────────────────────────
// ITEMS — BATTLE USE (FULLY FIXED)
// ─────────────────────────────────────────────
function useItemInBattle(id) {
  const qty = P.inventory[id] || 0;
  if (qty <= 0) { toast('ไม่มีไอเทมนี้แล้ว!', 'red-toast'); return; }
  const item = ITEMS.find(i => i.id === id);
  if (!item) return;

  P.inventory[id]--;

  switch(item.effect) {
    case 'heal30':
      B.playerHp = Math.min(B.playerMaxHp, B.playerHp + 30);
      toast('🧪 ฟื้น HP +30!', 'green-toast');
      updateHPBars();
      break;
    case 'fullheal':
      B.playerHp = B.playerMaxHp;
      toast('💉 HP เต็ม 100%!', 'green-toast');
      updateHPBars();
      break;
    case 'dmg25':
      B.bossHp = Math.max(0, B.bossHp - 25);
      toast('💣 ดีลบอส -25 HP!', 'gold-toast');
      showDmgPop('-25 HP', 'boss');
      updateHPBars();
      if (B.bossHp <= 0) { setTimeout(() => endBattle(true), 500); }
      break;
    case 'dmg60':
      B.bossHp = Math.max(0, B.bossHp - 60);
      toast('☢️ ดีลบอส -60 HP!', 'gold-toast');
      showDmgPop('-60 HP', 'boss');
      updateHPBars();
      if (B.bossHp <= 0) { setTimeout(() => endBattle(true), 500); }
      break;
    case 'skip':
      if (B.answered) { toast('ใช้ก่อนตอบ!'); P.inventory[id]++; return; }
      toast('📜 ข้ามคำถาม!', 'purple-toast');
      B.qIndex++;
      if (B.qIndex >= B.qPool.length) { endBattle(true); return; }
      renderQuestion();
      savePlayerData();
      return;
    case 'xp2':
      BUFF.xp2 = true;
      toast('💎 XP x2 ด่านนี้!', 'purple-toast');
      break;
    case 'elixir':
      B.playerHp = B.playerMaxHp;
      B.bossHp   = Math.max(0, B.bossHp - 15);
      toast('✨ HP เต็ม + บอสเสีย 15!', 'gold-toast');
      showDmgPop('-15 HP', 'boss');
      updateHPBars();
      if (B.bossHp <= 0) { setTimeout(() => endBattle(true), 500); }
      break;
    case 'gold2':
      BUFF.goldX2 = true;
      toast('🧲 Gold x2 ด่านนี้!', 'gold-toast');
      break;
    case 'shield3':
      BUFF.shieldActive = 3;
      toast('🔷 โล่เพชร! ป้องกัน 3 ครั้ง!', 'purple-toast');
      break;
    case 'revive':
      // Already handled in answer() — just restore
      P.inventory[id]++;  // put back, auto-use
      BUFF.reviveReady = true;
      toast('💫 หินคืนชีพ พร้อมแล้ว!', 'purple-toast');
      savePlayerData();
      renderSkillBtns();
      return;
  }
  savePlayerData();
  renderSkillBtns();
}


// ─────────────────────────────────────────────
// XP & LEVEL UP
// ─────────────────────────────────────────────
function addXP(amount) {
  P.xp += amount;
  let leveled = false;
  while (P.level < 10 && P.xp >= (XP_TABLE[P.level] || 99999)) {
    P.level++;
    leveled = true;
  }
  if (leveled) showLevelUpOverlay();
  savePlayerData();
  updateStatusBar();
}

function showLevelUpOverlay() {
  const news = SKILL_DEFS.filter(s => s.unlockLv === P.level);
  let html = news.length
    ? news.map(s => `<div class="new-skill-item"><span style="font-size:18px">${s.icon}</span> ${s.name} — ${s.desc}</div>`).join('')
    : '<div class="new-skill-item">💪 สถานะพื้นฐานเพิ่มขึ้น!</div>';
  document.getElementById('levelup-skills').innerHTML = html;
  document.getElementById('levelup-level').textContent = 'Level ' + P.level;
  document.getElementById('levelup-overlay').classList.add('show');
}

function closeLevelUp() {
  document.getElementById('levelup-overlay').classList.remove('show');
}

// ─────────────────────────────────────────────
// HP / COMBO UI
// ─────────────────────────────────────────────
function updateHPBars() {
  const pp = Math.round(Math.max(0, B.playerHp / B.playerMaxHp * 100));
  const bp = Math.round(Math.max(0, B.bossHp   / B.bossMaxHp   * 100));
  document.getElementById('player-hp-bar').style.width   = pp + '%';
  document.getElementById('boss-hp-bar').style.width     = bp + '%';
  document.getElementById('player-hp-val').textContent   = Math.max(0, Math.round(B.playerHp));
  document.getElementById('boss-hp-val').textContent     = Math.max(0, Math.round(B.bossHp));
  document.getElementById('player-hp-max').textContent   = '/'+B.playerMaxHp;
  document.getElementById('boss-hp-max').textContent     = '/'+B.bossMaxHp;
}
function updateComboBar() {
  for (let i=1; i<=5; i++) document.getElementById('f'+i).classList.toggle('active', B.streak >= i);
  document.getElementById('combo-count').textContent = B.streak;
  document.getElementById('combo-bonus').textContent = 'x'+(1 + B.streak*.1).toFixed(1);
}

// ─────────────────────────────────────────────
// DAMAGE POP
// ─────────────────────────────────────────────
function showDmgPop(text, target) {
  const el = document.createElement('div');
  el.className   = 'dmg-pop';
  el.textContent = text;
  el.style.color = target === 'boss' ? '#ff6060' : '#60ff90';
  const rect = document.getElementById(target==='boss'?'boss-hp-bar':'player-hp-bar').getBoundingClientRect();
  el.style.left  = (rect.left + rect.width/2) + 'px';
  el.style.top   = (rect.top - 8) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
let toastTimer;
function toast(msg, cls='') {
  clearTimeout(toastTimer);
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'toast show ' + cls;
  toastTimer    = setTimeout(() => { t.className = 'toast'; }, 2400);
}

// ─────────────────────────────────────────────
// RENDER — INVENTORY TAB
// ─────────────────────────────────────────────
function renderInventoryTab() {
  document.getElementById('inv-gold-display').textContent = P.gold;
  const grid = document.getElementById('inv-grid');
  grid.innerHTML = '';
  ITEMS.forEach(item => {
    const qty  = P.inventory[item.id] || 0;
    const slot = document.createElement('div');
    slot.className = 'inv-slot ' + (qty===0 ? 'empty' : RARITY_CLASS[item.rarity]||'');
    slot.innerHTML =
      `<div class="item-icon">${item.icon}</div>` +
      `<div class="item-name">${item.name}</div>` +
      (qty > 0 ? `<div class="item-qty">${qty}</div>` : '');
    if (qty > 0) slot.addEventListener('click', () => showItemDetail(item));
    grid.appendChild(slot);
  });
}

function showItemDetail(item) {
  const d = document.getElementById('item-detail');
  d.style.display = '';
  document.getElementById('item-detail-icon').textContent   = item.icon;
  document.getElementById('item-detail-name').textContent   = item.name;
  document.getElementById('item-detail-desc').textContent   = item.desc;
  const rar = document.getElementById('item-detail-rarity');
  rar.className   = 'item-rarity ' + (RARITY_CLASS[item.rarity]||'rarity-common');
  rar.textContent = RARITY_LABEL[item.rarity] || 'Common';
}

// ─────────────────────────────────────────────
// RENDER — SKILLS TAB
// ─────────────────────────────────────────────
function renderSkillsTab() {
  const list = document.getElementById('skill-list');
  if (!list) return;
  list.innerHTML = '';
  SKILL_DEFS.forEach(s => {
    const unlocked = P.level >= s.unlockLv;
    const cd       = P.skillCDs[s.id] || 0;
    const card     = document.createElement('div');
    card.className = 'skill-card' + (unlocked ? ' unlocked' : '');
    card.innerHTML =
      `<div class="skill-header">
         <div class="skill-icon-lg" style="opacity:${unlocked?1:.25}">${s.icon}</div>
         <div class="skill-info">
           <div class="skill-title" style="color:${unlocked?'var(--text)':'var(--muted)'}">${s.name}</div>
           <div class="skill-desc">${s.desc}</div>
         </div>
       </div>
       <div class="skill-meta">
         <span class="skill-tag tag-${s.type}">${s.type==='active'?'Active':s.type==='passive'?'Passive':'Ultimate'}</span>
         ${s.maxCd > 0 ? `<span class="skill-tag tag-cd">CD: ${s.maxCd} ตา</span>` : ''}
         ${cd > 0 ? `<span class="skill-tag tag-cd">เหลือ ${cd} ตา</span>` : ''}
         <span class="skill-tag ${unlocked?'tag-unlock':'tag-locked'}">${unlocked?'✅ ปลดล็อคแล้ว':'🔒 Lv.'+s.unlockLv}</span>
       </div>`;
    list.appendChild(card);
  });
}

// ─────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────
function shuffle(arr) { return arr.slice().sort(() => Math.random() - .5); }





