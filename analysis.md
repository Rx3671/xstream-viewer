# تحليل مشكلة الاتصال في Xstream

## المشكلة الحالية
خطأ "Cannot connect to server" يظهر في السطر 115 من ملف `xtream-api.ts`

## السبب المحتمل
المشكلة تحدث في دالة `authenticate()` عند محاولة الاتصال بالسيرفر. الكود الحالي يستخدم:
- `mode: 'cors'` في fetch request
- timeout مدته 15 ثانية
- معالجة أخطاء شبكة أساسية

## المشاكل المحتملة:
1. **CORS Issues**: قد يكون السيرفر لا يسمح بطلبات CORS من المتصفح
2. **URL Format**: قد يكون تنسيق URL غير صحيح
3. **Network Timeout**: قد يكون الوقت المحدد غير كافٍ
4. **Protocol Issues**: قد تكون هناك مشكلة في البروتوكول (http vs https)

## الحل المقترح:
1. إضافة معالجة أفضل للأخطاء مع رسائل أكثر وضوحاً
2. إضافة retry mechanism للمحاولة مرة أخرى
3. إضافة validation أفضل لـ URL قبل المحاولة
4. إضافة خيار لتجاوز CORS في حالة التطوير

## ميزة اسم Playlist المطلوبة:
1. إضافة حقل `playlistName` في `XtreamCredentials`
2. إضافة input field في صفحة Settings
3. حفظ اسم Playlist مع البيانات في Firestore
4. عرض اسم Playlist في واجهة المستخدم
