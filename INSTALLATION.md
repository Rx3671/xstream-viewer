# 🚀 دليل التثبيت والتشغيل - IPTV Smart Player

## المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:
- **Node.js** (الإصدار 18 أو أحدث)
- **pnpm** (مدير الحزم المفضل)

### تثبيت pnpm
```bash
npm install -g pnpm
```

---

## التثبيت

### 1. فك ضغط المشروع
```bash
tar -xzf iptv-smart-player-enhanced.tar.gz
cd iptv-smart-player
```

### 2. تثبيت المكتبات
```bash
pnpm install
```

**ملاحظة:** قد تظهر تحذيرات حول build scripts، يمكن تجاهلها بأمان.

---

## التشغيل

### وضع التطوير (Development)
```bash
pnpm dev
```
- سيتم فتح المتصفح تلقائياً على `http://localhost:5173`
- التحديث التلقائي عند تعديل الملفات (Hot Reload)

### بناء للإنتاج (Production Build)
```bash
pnpm build
```
- سيتم إنشاء ملفات الإنتاج في مجلد `dist/`

### تشغيل الإنتاج
```bash
pnpm start
```
- سيعمل الخادم على المنفذ `5000`

---

## التكوين

### إعداد Xtream Codes API

1. افتح المتصفح على `http://localhost:5173`
2. انتقل إلى صفحة Login
3. أدخل بيانات Xtream Codes:
   - **Server URL**: عنوان الخادم (مثل: `http://example.com:8080`)
   - **Username**: اسم المستخدم
   - **Password**: كلمة المرور

### إعداد Custom Headers (اختياري)

لإضافة Custom Headers لقناة معينة، عدّل ملف `VideoPlayerEnhanced.tsx`:

```typescript
<VideoPlayerEnhanced
  src="https://example.com/stream.m3u8"
  userAgent="Mozilla/5.0 Custom Agent"
  referer="https://example.com"
  origin="https://example.com"
/>
```

---

## البنية الأساسية للمشروع

```
iptv-smart-player/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/    # المكونات
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── VideoPlayerEnhanced.tsx
│   │   │   └── ...
│   │   ├── pages/         # الصفحات
│   │   │   ├── Home.tsx
│   │   │   ├── LiveTV.tsx
│   │   │   └── ...
│   │   ├── contexts/      # Context API
│   │   ├── utils/         # الأدوات المساعدة
│   │   └── App.tsx
│   └── index.html
├── server/                # Backend (Express)
│   └── index.ts
├── package.json
├── FEATURES_GUIDE.md      # دليل المميزات
├── ADVANCED_FEATURES.md   # المميزات المتقدمة
└── INSTALLATION.md        # هذا الملف
```

---

## المميزات الرئيسية

### ✅ موجودة ومفعّلة
- دعم HLS/M3U8 الكامل
- Low Latency Mode (تقليل التأخير)
- Adaptive Bitrate Streaming (جودة تكيفية)
- AirPlay Support (دعم كامل)
- Network Quality Detection (كشف جودة الشبكة)
- Buffer Health Monitoring (مراقبة البافر)
- Custom Headers Support (User-Agent, Referer, Origin)
- Volume Persistence (حفظ مستوى الصوت)
- Xtream Codes API Integration

### ⭐ جاهزة للإضافة (في الكود)
- Manual Quality Selection (اختيار الجودة يدوياً)
- Playback Speed Control (التحكم في السرعة)
- Keyboard Shortcuts (اختصارات لوحة المفاتيح)
- Statistics Overlay (عرض الإحصائيات)
- Picture-in-Picture (PiP)
- Screenshot Capture (لقطات الشاشة)
- Audio/Subtitle Track Selection (اختيار مسارات الصوت والترجمة)

---

## استخدام المشغل المحسّن

### VideoPlayer (الأساسي)
```tsx
import VideoPlayer from '@/components/VideoPlayer';

<VideoPlayer
  src="https://example.com/stream.m3u8"
  poster="https://example.com/poster.jpg"
  onReady={() => console.log('Ready')}
  onError={(error) => console.error(error)}
/>
```

### VideoPlayerEnhanced (المتقدم)
```tsx
import VideoPlayerEnhanced from '@/components/VideoPlayerEnhanced';

<VideoPlayerEnhanced
  src="https://example.com/stream.m3u8"
  poster="https://example.com/poster.jpg"
  userAgent="Custom User Agent"
  referer="https://example.com"
  origin="https://example.com"
  onReady={() => console.log('Ready')}
  onError={(error) => console.error(error)}
/>
```

---

## اختصارات لوحة المفاتيح

| المفتاح | الوظيفة |
|---------|---------|
| `Space` أو `K` | تشغيل/إيقاف |
| `F` | ملء الشاشة |
| `M` | كتم الصوت |
| `↑` / `↓` | رفع/خفض الصوت |
| `←` / `→` | التقديم/التأخير 5 ثوان |
| `J` / `L` | التقديم/التأخير 10 ثوان |
| `I` | عرض الإحصائيات |
| `P` | Picture-in-Picture |
| `S` | لقطة شاشة |
| `,` / `.` | إطار سابق/تالي |
| `<` / `>` | تقليل/زيادة السرعة |
| `0` أو `Home` | العودة للبداية |
| `End` | الانتقال للنهاية |

---

## حل المشاكل الشائعة

### 1. خطأ في التثبيت
```bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules
pnpm install
```

### 2. المنفذ مستخدم بالفعل
```bash
# غيّر المنفذ في vite.config.ts
server: {
  port: 3000  // بدلاً من 5173
}
```

### 3. البث لا يعمل
- تحقق من صحة رابط البث
- تحقق من Console للأخطاء
- جرب تعطيل مانع الإعلانات
- تحقق من CORS headers

### 4. أخطاء TypeScript
```bash
# تجاهل أخطاء TypeScript مؤقتاً
pnpm dev --no-check
```

---

## التطوير

### إضافة مميزات جديدة

1. **إضافة مكون جديد:**
```bash
# في مجلد client/src/components/
touch MyComponent.tsx
```

2. **إضافة صفحة جديدة:**
```bash
# في مجلد client/src/pages/
touch MyPage.tsx
```

3. **تعديل المشغل:**
```bash
# عدّل client/src/components/VideoPlayerEnhanced.tsx
```

### تشغيل الاختبارات
```bash
pnpm test
```

### فحص الأخطاء
```bash
pnpm run check
```

---

## النشر (Deployment)

### Vercel
```bash
# ثبّت Vercel CLI
npm i -g vercel

# انشر المشروع
vercel
```

### Netlify
```bash
# ثبّت Netlify CLI
npm i -g netlify-cli

# انشر المشروع
netlify deploy --prod
```

### Docker
```bash
# بناء الصورة
docker build -t iptv-smart-player .

# تشغيل الحاوية
docker run -p 5000:5000 iptv-smart-player
```

---

## الدعم

للحصول على المساعدة:
1. اقرأ [دليل المميزات](FEATURES_GUIDE.md)
2. اقرأ [المميزات المتقدمة](ADVANCED_FEATURES.md)
3. افتح Issue على GitHub
4. راسلنا عبر البريد الإلكتروني

---

## الترخيص

MIT License - استخدم المشروع بحرية!

---

**نصيحة:** للحصول على أفضل أداء، استخدم متصفح Chrome أو Safari على Mac/iOS للاستفادة من AirPlay.

**تم التحديث:** نوفمبر 2025
