# 📱 วิธีตั้งค่ารูปภาพลิงค์สำหรับ Social Media

## 🎯 **สิ่งที่ต้องทำ:**

### **1. สร้างรูปภาพ og-image.jpg**
- เปิดไฟล์ `og-image.html` ในเบราว์เซอร์
- กดปุ่ม `F12` เพื่อเปิด Developer Tools
- กดปุ่ม `Ctrl+Shift+P` (Windows) หรือ `Cmd+Shift+P` (Mac)
- พิมพ์ "screenshot" และเลือก "Capture full size screenshot"
- บันทึกเป็น `og-image.jpg` ขนาด 1200x630 pixels

### **2. อัปโหลดรูปภาพไปยัง GitHub**
```bash
# เพิ่มไฟล์ og-image.jpg ลงใน repository
git add og-image.jpg
git commit -m "Add social media preview image"
git push origin main
```

### **3. แก้ไข URL ในไฟล์ index.html**
เปลี่ยน `YOUR_USERNAME` เป็นชื่อ GitHub username ของคุณ:

```html
<!-- เปลี่ยนบรรทัดเหล่านี้ -->
<meta property="og:url" content="https://YOUR_USERNAME.github.io/loveletterhbd/">
<meta property="og:image" content="https://YOUR_USERNAME.github.io/loveletterhbd/og-image.jpg">
<meta name="twitter:image" content="https://YOUR_USERNAME.github.io/loveletterhbd/og-image.jpg">
```

### **4. ทดสอบการแชร์**
- ใช้ [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- ใช้ [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- ใส่ URL ของเว็บไซต์เพื่อทดสอบ

## 🎨 **ตัวอย่างรูปภาพที่จะแสดง:**

รูปภาพจะแสดง:
- **หัวข้อ:** "จดหมายรัก"
- **คำบรรยาย:** "วันเกิดเธอตรงกับวันไหว้พระจันทร์"
- **รายละเอียด:** "จดหมายรักพิเศษในคืนพระจันทร์เต็มดวง สำหรับอิมผู้เป็นที่รัก"
- **พื้นหลัง:** ธีมพระจันทร์เต็มดวงกับดวงดาว
- **ไอคอน:** หัวใจและพระจันทร์

## 📱 **แพลตฟอร์มที่รองรับ:**
- ✅ Facebook
- ✅ Twitter
- ✅ Line
- ✅ WhatsApp
- ✅ Telegram
- ✅ Discord
- ✅ Slack

## 🔧 **วิธีแก้ไขปัญหา:**

### **ถ้ารูปภาพไม่แสดง:**
1. ตรวจสอบ URL ว่าถูกต้อง
2. รอ 5-10 นาทีให้ cache หมดอายุ
3. ใช้ Facebook Sharing Debugger เพื่อ force refresh

### **ถ้าข้อความไม่แสดง:**
1. ตรวจสอบ meta tags ในไฟล์ index.html
2. ใช้ HTML validator เพื่อตรวจสอบ syntax

## 🎉 **ผลลัพธ์:**
เมื่อส่งลิงค์ไปให้อิม จะเห็น:
- รูปภาพสวยงามธีมพระจันทร์
- ข้อความ "จดหมายรัก - วันเกิดเธอตรงกับวันไหว้พระจันทร์"
- คำบรรยายที่น่ารัก
- ดูเป็นจดหมายรักที่พิเศษมาก! 💕🌙
