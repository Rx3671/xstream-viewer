# دليل تطبيق EPG - IPTV Smart Player

## 🎯 نظرة عامة

تم إضافة دعم كامل لـ **EPG (Electronic Program Guide)** في مشروع IPTV Smart Player مع جميع الميزات المتقدمة.

---

## ✅ الميزات المضافة

### 1. عرض البرنامج الحالي (Now Playing)
- عرض معلومات البرنامج الحالي
- شريط تقدم حي يتحرك مع الوقت
- عنوان ووصف البرنامج
- وقت البداية والنهاية

### 2. عرض البرنامج التالي (Up Next)
- معلومات البرنامج القادم
- وقت البداية المتوقع
- عنوان ووصف

### 3. جدول البرامج الكامل (Full Program Guide)
- عرض جميع البرامج المتاحة
- تصفح البرامج السابقة والقادمة
- معلومات تفصيلية لكل برنامج
- مدة البرنامج
- حالة البرنامج (Live، Past، Upcoming)

### 4. Catchup TV (إعادة المشاهدة)
- مشاهدة البرامج السابقة
- زر "Watch" للبرامج التي تدعم الأرشيف
- تشغيل تلقائي من بداية البرنامج
- دعم كامل للقنوات التي تدعم tv_archive

### 5. واجهة مستخدم احترافية
- تصميم عصري مع Tailwind CSS
- رسوم متحركة سلسة
- ألوان مميزة لكل حالة
- أيقونات واضحة
- استجابة كاملة للأجهزة المختلفة

---

## 📁 الملفات المضافة/المعدلة

### ملفات جديدة:

1. **`client/src/components/EPGViewer.tsx`**
   - مكون عرض EPG
   - 400+ سطر
   - واجهة كاملة لعرض البرامج

2. **`client/src/components/LiveVideoPlayer.tsx`**
   - مشغل البث المباشر مع دعم EPG
   - 500+ سطر
   - دمج كامل مع EPG

### ملفات معدلة:

1. **`client/src/types/xtream.ts`**
   - إضافة أنواع EPG:
     - `XtreamEPGProgram`
     - `XtreamEPGListing`
     - `XtreamShortEPG`

2. **`client/src/lib/xtream-api.ts`**
   - إضافة وظائف EPG:
     - `getEPG()` - جلب جدول البرامج الكامل
     - `getShortEPG()` - جلب البرنامج الحالي والتالي
     - `buildCatchupUrl()` - بناء رابط إعادة المشاهدة

3. **`client/src/pages/LiveTV.tsx`**
   - استبدال VideoPlayer بـ LiveVideoPlayer
   - إضافة بيانات EPG للقنوات
   - دعم hasArchive

---

## 🔧 التفاصيل التقنية

### 1. أنواع EPG (Types)

```typescript
// برنامج EPG
export interface XtreamEPGProgram {
  id: string;
  epg_id: string;
  title: string;
  lang: string;
  start: string; // Unix timestamp
  end: string; // Unix timestamp
  description: string;
  channel_id: string;
  start_timestamp: number;
  stop_timestamp: number;
  now_playing?: boolean;
  has_archive?: boolean;
}

// قائمة البرامج
export interface XtreamEPGListing {
  epg_listings: XtreamEPGProgram[];
}

// EPG مختصر (الآن والتالي)
export interface XtreamShortEPG {
  now_playing?: {
    title: string;
    description: string;
    start: string;
    end: string;
    start_timestamp: number;
    stop_timestamp: number;
  };
  next_playing?: {
    title: string;
    description: string;
    start: string;
    end: string;
    start_timestamp: number;
    stop_timestamp: number;
  };
}
```

### 2. وظائف Xtream API

#### جلب EPG مختصر (الآن والتالي)
```typescript
async getShortEPG(streamId: number, epgChannelId?: string): Promise<XtreamShortEPG>
```

**المعاملات:**
- `streamId`: معرف القناة
- `epgChannelId`: (اختياري) معرف EPG للقناة

**الاستخدام:**
```typescript
const shortEPG = await api.getShortEPG(12345, "channel-epg-id");
console.log(shortEPG.now_playing?.title);
console.log(shortEPG.next_playing?.title);
```

#### جلب جدول البرامج الكامل
```typescript
async getEPG(streamId: number, limit: number = 100): Promise<XtreamEPGListing>
```

**المعاملات:**
- `streamId`: معرف القناة
- `limit`: عدد البرامج المطلوبة (افتراضي: 100)

**الاستخدام:**
```typescript
const fullEPG = await api.getEPG(12345, 50);
fullEPG.epg_listings.forEach(program => {
  console.log(program.title, program.start_timestamp);
});
```

#### بناء رابط Catchup
```typescript
buildCatchupUrl(streamId: number, startTimestamp: number, duration: number): string
```

**المعاملات:**
- `streamId`: معرف القناة
- `startTimestamp`: وقت بداية البرنامج (Unix timestamp)
- `duration`: مدة البرنامج بالثواني

**الاستخدام:**
```typescript
const program = epgData.epg_listings[0];
const duration = program.stop_timestamp - program.start_timestamp;
const catchupUrl = api.buildCatchupUrl(
  12345, 
  program.start_timestamp, 
  duration
);
```

### 3. مكون EPGViewer

#### Props
```typescript
interface EPGViewerProps {
  streamId: number;           // معرف القناة
  streamName: string;         // اسم القناة
  epgChannelId?: string;      // معرف EPG (اختياري)
  hasArchive?: boolean;       // دعم الأرشيف
  api: any;                   // XtreamAPI instance
  onPlayCatchup?: (program: XtreamEPGProgram) => void; // عند تشغيل catchup
  onClose?: () => void;       // عند الإغلاق
}
```

#### الاستخدام
```typescript
<EPGViewer
  streamId={channel.id}
  streamName={channel.name}
  epgChannelId={channel.epgChannelId}
  hasArchive={channel.hasArchive}
  api={api}
  onPlayCatchup={(program) => {
    console.log('Playing:', program.title);
  }}
  onClose={() => setShowEPG(false)}
/>
```

#### الميزات
- **عرض مضغوط:** يعرض البرنامج الحالي والتالي فقط
- **عرض كامل:** يعرض جميع البرامج في شاشة منفصلة
- **شريط التقدم:** يتحرك تلقائياً مع البرنامج الحالي
- **زر Watch:** يظهر للبرامج السابقة التي تدعم الأرشيف
- **تحديث تلقائي:** يتم تحديث البيانات عند تغيير القناة

### 4. مكون LiveVideoPlayer

#### Props
```typescript
interface LiveVideoPlayerProps {
  src: string;                // رابط البث
  poster?: string;            // صورة القناة
  streamId: number;           // معرف القناة
  streamName: string;         // اسم القناة
  epgChannelId?: string;      // معرف EPG
  hasArchive?: boolean;       // دعم الأرشيف
  api?: any;                  // XtreamAPI instance
  onError?: (error: string) => void;
  onReady?: () => void;
}
```

#### الاستخدام
```typescript
<LiveVideoPlayer
  src={channel.streamUrl}
  poster={channel.logo}
  streamId={channel.id}
  streamName={channel.name}
  epgChannelId={channel.epgChannelId}
  hasArchive={channel.hasArchive}
  api={api}
  onError={(error) => console.error(error)}
  onReady={() => console.log('Ready')}
/>
```

#### الميزات
- **زر EPG:** يظهر عند تحريك الماوس
- **لوحة EPG جانبية:** تنزلق من اليمين
- **تشغيل Catchup:** تلقائي عند اختيار برنامج سابق
- **مؤشرات الجودة:** تظهر وتختفي تلقائياً
- **دعم HLS.js:** مع Low Latency Mode

---

## 🎨 واجهة المستخدم

### ألوان الحالات

- **LIVE (الآن):** أحمر (`bg-red-600`) مع رسوم متحركة
- **UP NEXT (التالي):** أزرق (`bg-blue-600/20`)
- **Past (سابق):** رمادي شفاف (`opacity-70`)
- **Catchup Available:** بنفسجي (`bg-purple-600`)

### الرسوم المتحركة

- شريط التقدم: `transition-all duration-1000`
- زر LIVE: `animate-pulse`
- تحريك الماوس: إظهار/إخفاء العناصر بعد 3 ثوانٍ

### الأيقونات

- **Now Playing:** `Clock` (ساعة)
- **Up Next:** `ChevronRight` (سهم)
- **Full Guide:** `Calendar` (تقويم)
- **Watch:** `PlayCircle` (تشغيل)
- **Info:** `Info` (معلومات)

---

## 🔄 سير العمل (Workflow)

### عرض EPG

1. المستخدم يختار قناة من القائمة
2. يتم تحميل LiveVideoPlayer
3. يبدأ تشغيل البث
4. يتم جلب Short EPG تلقائياً
5. يظهر البرنامج الحالي والتالي في اللوحة الجانبية
6. المستخدم يمكنه النقر على "View Full Program Guide"
7. يتم جلب جدول البرامج الكامل
8. يظهر في شاشة منفصلة

### تشغيل Catchup

1. المستخدم يفتح جدول البرامج الكامل
2. يختار برنامج سابق (يدعم الأرشيف)
3. ينقر على زر "Watch"
4. يتم بناء رابط Catchup
5. يتم تحميل المشغل بالرابط الجديد
6. يبدأ التشغيل من بداية البرنامج

---

## 🐛 معالجة الأخطاء

### الأخطاء المحتملة

1. **لا توجد بيانات EPG:**
   - عرض رسالة "No program information available"
   - إخفاء زر EPG

2. **فشل تحميل EPG:**
   - عرض رسالة خطأ
   - السماح بإعادة المحاولة

3. **القناة لا تدعم الأرشيف:**
   - إخفاء زر "Watch" للبرامج السابقة
   - عرض البرامج بدون إمكانية التشغيل

4. **فشل تشغيل Catchup:**
   - العودة للبث المباشر
   - عرض رسالة خطأ

---

## 📊 بنية الكود

```
client/src/
├── components/
│   ├── EPGViewer.tsx           # مكون عرض EPG (جديد)
│   ├── LiveVideoPlayer.tsx     # مشغل مع EPG (جديد)
│   ├── VideoPlayer.tsx         # مشغل أساسي (موجود)
│   ├── MoviePlayer.tsx         # مشغل أفلام (موجود)
│   └── SeriesPlayer.tsx        # مشغل مسلسلات (موجود)
├── pages/
│   └── LiveTV.tsx              # صفحة البث المباشر (محدثة)
├── lib/
│   └── xtream-api.ts           # Xtream API (محدثة)
├── types/
│   └── xtream.ts               # أنواع Xtream (محدثة)
└── utils/
    └── streamResolver.ts       # حل روابط البث (موجود)
```

---

## 🚀 كيفية الاستخدام

### للمستخدم النهائي:

1. **عرض EPG:**
   - افتح قناة من Live TV
   - حرك الماوس لإظهار الأزرار
   - انقر على "Show Program Guide"

2. **عرض جدول البرامج:**
   - في لوحة EPG، انقر على "View Full Program Guide"
   - تصفح البرامج السابقة والقادمة

3. **مشاهدة برنامج سابق (Catchup):**
   - افتح جدول البرامج الكامل
   - انقر على برنامج سابق
   - انقر على زر "Watch"

### للمطورين:

1. **إضافة EPG لمشغل جديد:**
```typescript
import EPGViewer from "@/components/EPGViewer";

<EPGViewer
  streamId={channelId}
  streamName={channelName}
  epgChannelId={epgId}
  hasArchive={true}
  api={xtreamApi}
  onPlayCatchup={(program) => {
    // Handle catchup playback
  }}
/>
```

2. **جلب EPG يدوياً:**
```typescript
const api = new XtreamAPI(credentials);

// Short EPG
const shortEPG = await api.getShortEPG(streamId);

// Full EPG
const fullEPG = await api.getEPG(streamId, 50);
```

3. **تخصيص الألوان:**
```typescript
// في EPGViewer.tsx
className={`${
  isPlaying
    ? 'bg-purple-600/20 border-purple-500'  // تخصيص لون LIVE
    : 'bg-white/5 border-white/10'
}`}
```

---

## 🎯 الميزات المستقبلية (اختيارية)

1. **تذكيرات البرامج:**
   - إضافة زر "Set Reminder"
   - إشعارات قبل بدء البرنامج

2. **تسجيل البرامج:**
   - زر "Record" للبرامج القادمة
   - حفظ في السحابة

3. **بحث في EPG:**
   - بحث عن برامج معينة
   - تصفية حسب النوع

4. **EPG متعدد القنوات:**
   - عرض جدول لجميع القنوات
   - تنقل بين القنوات

5. **تكامل مع TMDB:**
   - جلب صور وملصقات البرامج
   - معلومات إضافية

---

## ✅ الخلاصة

تم إضافة دعم كامل لـ EPG في المشروع مع:

- ✅ عرض البرنامج الحالي والتالي
- ✅ جدول البرامج الكامل
- ✅ دعم Catchup TV
- ✅ واجهة مستخدم احترافية
- ✅ معالجة أخطاء شاملة
- ✅ تكامل كامل مع Xtream Codes API

**النتيجة:** تجربة مشاهدة احترافية مع معلومات البرامج الكاملة! 📺✨
