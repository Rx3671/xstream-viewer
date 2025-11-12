# IPTV Smart Player v3.0 - Enhanced Edition

<div align="center">

![IPTV Smart Player](https://img.shields.io/badge/IPTV-Smart%20Player-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-3.0.0-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript)
![HLS.js](https://img.shields.io/badge/HLS.js-1.6.14-FF6B6B?style=for-the-badge)

مشغل IPTV ذكي ومتقدم مع دعم كامل للبث المباشر والأفلام والمسلسلات

[الميزات](#الميزات) • [التثبيت](#التثبيت) • [الاستخدام](#الاستخدام) • [التوثيق](#التوثيق)

</div>

---

## 🌟 الميزات الرئيسية

### 📺 البث المباشر (Live TV)
- ✅ تأخير منخفض (Low Latency Mode)
- ✅ جودة تكيفية (Adaptive Bitrate)
- ✅ كشف جودة الشبكة
- ✅ تسريع GPU
- ✅ دعم Cast/AirPlay
- ✅ **إخفاء العلامات المرئية** (جديد في v3.0)

### 🎬 مشغل الأفلام المتقدم
- ✅ **تحكمات متقدمة** (Play/Pause، Skip ±10s)
- ✅ **اختيار الجودة يدوياً** (Auto، 1080p، 720p، إلخ)
- ✅ **دعم الترجمات** (SRT، VTT)
- ✅ **اختيار المسار الصوتي**
- ✅ **استئناف تلقائي** من آخر نقطة
- ✅ **سجل المشاهدة**
- ✅ شريط تقدم تفاعلي
- ✅ وضع ملء الشاشة

### 📺 مشغل المسلسلات المتقدم
- ✅ **التنقل بين الحلقات** (السابق/التالي)
- ✅ **قائمة الحلقات الجانبية** مع معاينة
- ✅ **تشغيل تلقائي للحلقة التالية**
- ✅ **زر Skip Intro** (تخطي المقدمة)
- ✅ **إشعار الحلقة التالية** قبل النهاية
- ✅ **تتبع تقدم المشاهدة** لكل حلقة
- ✅ **دعم المواسم المتعددة**
- ✅ **وضع Binge Mode** (المشاهدة المتواصلة)

### 🔧 ميزات تقنية
- ✅ Xtream Codes API Support
- ✅ Firebase Authentication
- ✅ Network Quality Detection
- ✅ Buffer Health Monitoring
- ✅ Enhanced Error Handling
- ✅ GPU Acceleration
- ✅ Remote Playback API
- ✅ Subtitle Parser (SRT/VTT)
- ✅ Watch History Management
- ✅ Video Progress Tracking

---

## 📦 التثبيت

### المتطلبات
- Node.js 22.13.0+
- pnpm 10.4.1+

### خطوات التثبيت

```bash
# Clone the repository
git clone <repository-url>
cd iptv-smart-player

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 🚀 الاستخدام

### 1. مشغل الأفلام

```tsx
import MoviePlayer from '@/components/MoviePlayer';

<MoviePlayer
  movieId="movie_123"
  title="The Matrix"
  src="https://example.com/movie.m3u8"
  poster="https://example.com/poster.jpg"
  subtitles={[
    {
      id: 'en',
      label: 'English',
      language: 'en',
      url: 'https://example.com/subtitles_en.vtt',
      format: 'vtt'
    }
  ]}
  onClose={() => console.log('Closed')}
/>
```

### 2. مشغل المسلسلات

```tsx
import SeriesPlayer from '@/components/SeriesPlayer';

<SeriesPlayer
  seriesId="series_456"
  seriesTitle="Breaking Bad"
  seasons={[
    {
      seasonNumber: 1,
      episodes: [
        {
          id: 'ep1',
          episodeNumber: 1,
          title: 'Pilot',
          src: 'https://example.com/s1e1.m3u8',
          thumbnail: 'https://example.com/thumb.jpg',
          duration: '58:00'
        }
      ]
    }
  ]}
  autoPlayNext={true}
  skipIntroTime={90}
  onClose={() => console.log('Closed')}
/>
```

### 3. سجل المشاهدة

```tsx
import { useWatchHistory } from '@/hooks/useWatchHistory';

function ContinueWatching() {
  const { getContinueWatching } = useWatchHistory();
  const items = getContinueWatching();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <progress value={item.progress} max={100} />
        </div>
      ))}
    </div>
  );
}
```

---

## 📚 التوثيق

### الملفات الرئيسية

- **`NEW_ENHANCEMENTS_V3.md`** - توثيق شامل للتحسينات الجديدة
- **`ENHANCEMENTS_DOCUMENTATION.md`** - توثيق التحسينات السابقة
- **`RESEARCH_FINDINGS.md`** - نتائج البحث والتوصيات
- **`XTREAM_SETUP_GUIDE.md`** - دليل إعداد Xtream Codes

### المكونات الرئيسية

#### VideoPlayer
مشغل البث المباشر مع تأخير منخفض وعلامات مخفية.

```tsx
<VideoPlayer
  src="https://example.com/stream.m3u8"
  poster="poster.jpg"
  onReady={() => console.log('Ready')}
  onError={(error) => console.error(error)}
/>
```

#### MoviePlayer
مشغل الأفلام المتقدم مع جميع الميزات.

```tsx
<MoviePlayer
  movieId="movie_123"
  title="Movie Title"
  src="movie.m3u8"
  subtitles={[...]}
/>
```

#### SeriesPlayer
مشغل المسلسلات مع تنقل بين الحلقات.

```tsx
<SeriesPlayer
  seriesId="series_456"
  seriesTitle="Series Title"
  seasons={[...]}
  autoPlayNext={true}
/>
```

### Hooks

#### useWatchHistory
إدارة سجل المشاهدة.

```tsx
const {
  history,
  updateWatchHistory,
  getWatchHistory,
  getContinueWatching,
  removeFromHistory,
  clearHistory
} = useWatchHistory();
```

#### useVideoProgress
تتبع تقدم الفيديو.

```tsx
useVideoProgress(videoElement, {
  videoId: 'video_123',
  type: 'movie',
  title: 'Movie Title',
  poster: 'poster.jpg'
});
```

### Utilities

#### subtitleParser
معالجة الترجمات.

```tsx
import {
  parseSRT,
  parseVTT,
  loadSubtitle,
  convertSRTtoVTT,
  getCurrentSubtitle,
  addSubtitleTrack
} from '@/utils/subtitleParser';
```

---

## 🎨 البنية

```
iptv-smart-player/
├── client/
│   └── src/
│       ├── components/
│       │   ├── VideoPlayer.tsx       # مشغل البث المباشر
│       │   ├── MoviePlayer.tsx       # مشغل الأفلام (جديد)
│       │   ├── SeriesPlayer.tsx      # مشغل المسلسلات (جديد)
│       │   └── ui/                   # مكونات UI
│       ├── hooks/
│       │   ├── useWatchHistory.ts    # سجل المشاهدة (جديد)
│       │   └── useVideoProgress.ts   # تتبع التقدم (جديد)
│       ├── utils/
│       │   ├── subtitleParser.ts     # معالج الترجمات (جديد)
│       │   └── streamResolver.ts     # حل عناوين البث
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── LiveTV.tsx
│       │   ├── Movies.tsx
│       │   └── Series.tsx
│       └── contexts/
│           └── XtreamContext.tsx
├── server/
│   └── index.ts
└── shared/
    └── const.ts
```

---

## 🔧 التكوين

### HLS.js Configuration

```typescript
const hlsConfig = {
  lowLatencyMode: true,
  maxBufferLength: 30,
  maxBufferSize: 60 * 1000 * 1000,
  enableWorker: true,
  backBufferLength: 90
};
```

### Watch History Settings

```typescript
const STORAGE_KEY = 'iptv_watch_history';
const MAX_HISTORY_ITEMS = 100;
const SAVE_INTERVAL = 5000; // 5 seconds
```

---

## 🧪 الاختبار

```bash
# Run tests
pnpm test

# Run type check
pnpm check

# Format code
pnpm format
```

### اختبارات يدوية

#### MoviePlayer
- [ ] تشغيل/إيقاف مؤقت
- [ ] تقديم/تأخير 10 ثوانٍ
- [ ] اختيار الجودة
- [ ] تبديل الترجمات
- [ ] استئناف المشاهدة
- [ ] وضع ملء الشاشة

#### SeriesPlayer
- [ ] التنقل بين الحلقات
- [ ] قائمة الحلقات
- [ ] تشغيل تلقائي
- [ ] تخطي المقدمة
- [ ] إشعار الحلقة التالية

---

## 🌐 التوافق

### المتصفحات
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Safari iOS 14+

### الأجهزة
- ✅ Desktop
- ✅ Mobile
- ✅ Tablet
- ✅ Smart TV

---

## 📝 التغييرات

### v3.0.0 (2025-11-07)
- ✨ إضافة MoviePlayer المتقدم
- ✨ إضافة SeriesPlayer المتقدم
- ✨ إضافة نظام سجل المشاهدة
- ✨ إضافة نظام تتبع التقدم
- ✨ إضافة معالج الترجمات
- 🎨 إخفاء العلامات المرئية في VideoPlayer
- 🐛 إصلاحات وتحسينات عامة

### v2.0.0 (2025-11-06)
- ✨ تحسينات HLS.js المتقدمة
- ✨ كشف جودة الشبكة
- ✨ مراقبة صحة البافر
- ✨ تسريع GPU
- ✨ دعم Remote Playback

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 📄 الترخيص

MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 👨‍💻 المطور

تم التطوير بناءً على أفضل الممارسات والمعايير الحديثة لتطوير تطبيقات الويب.

---

## 🙏 شكر وتقدير

- [HLS.js](https://github.com/video-dev/hls.js/) - مكتبة HLS رائعة
- [React](https://react.dev/) - مكتبة UI قوية
- [Tailwind CSS](https://tailwindcss.com/) - إطار CSS رائع
- [Radix UI](https://www.radix-ui.com/) - مكونات UI متقدمة

---

<div align="center">

**صنع بـ ❤️ للمجتمع**

[⬆ العودة للأعلى](#iptv-smart-player-v30---enhanced-edition)

</div>
