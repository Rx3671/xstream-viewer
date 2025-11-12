# Firebase Setup Guide - دليل إعداد Firebase

## الخطوات المطلوبة

### 1. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "Add project" أو "إضافة مشروع"
3. أدخل اسم المشروع (مثلاً: "IPTV Smart Player")
4. اتبع الخطوات حتى يتم إنشاء المشروع

### 2. تفعيل Authentication

1. من القائمة الجانبية، اختر **Build** > **Authentication**
2. انقر على "Get Started"
3. اختر **Email/Password** من قائمة Sign-in providers
4. فعّل "Email/Password" واحفظ التغييرات

### 3. إنشاء Firestore Database

1. من القائمة الجانبية، اختر **Build** > **Firestore Database**
2. انقر على "Create database"
3. اختر **Start in production mode** (سنضبط القواعد لاحقاً)
4. اختر موقع السيرفر الأقرب لك (مثلاً: europe-west)

### 4. ضبط قواعد Firestore

في صفحة Firestore Database، اذهب إلى تبويب **Rules** والصق هذه القواعد:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - كل مستخدم يمكنه قراءة وكتابة بياناته فقط
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

انقر على **Publish** لحفظ القواعد.

### 5. الحصول على بيانات التكوين

1. في صفحة Project Overview، انقر على أيقونة **Web** (</>) لإضافة تطبيق ويب
2. أدخل اسم التطبيق (مثلاً: "IPTV Web App")
3. لا تحتاج لتفعيل Firebase Hosting
4. انقر على "Register app"
5. ستظهر لك بيانات `firebaseConfig` - احتفظ بها

### 6. إضافة البيانات للموقع

الآن تحتاج لإضافة 6 متغيرات بيئية في إعدادات الموقع:

#### الطريقة:
1. في واجهة Manus، اذهب إلى **Management UI** > **Settings** > **Secrets**
2. أضف المتغيرات التالية (استبدل القيم من `firebaseConfig` الذي حصلت عليه):

| Variable Name | Value (من firebaseConfig) |
|--------------|---------------------------|
| `VITE_FIREBASE_API_KEY` | قيمة `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | قيمة `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | قيمة `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | قيمة `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | قيمة `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | قيمة `appId` |

### 7. إعادة تشغيل الموقع

بعد إضافة جميع المتغيرات، أعد تشغيل الموقع من Management UI.

---

## مثال على firebaseConfig

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## التحقق من التشغيل

1. افتح الموقع واذهب إلى صفحة Login
2. أنشئ حساب جديد
3. تحقق من Firebase Console > Authentication أن المستخدم تم إنشاؤه
4. اذهب إلى Settings وأدخل بيانات Xtream Codes
5. تحقق من Firestore Database أن البيانات تم حفظها

---

## ملاحظات مهمة

- ✅ البيانات تُحفظ بشكل آمن في Firestore
- ✅ كل مستخدم يرى بياناته فقط
- ✅ عند تسجيل الدخول، تُحمّل بيانات Xtream تلقائياً
- ✅ يمكنك إدارة المستخدمين من Firebase Console

---

## الدعم

إذا واجهت أي مشكلة:
1. تأكد من أن جميع المتغيرات البيئية مضافة بشكل صحيح
2. تأكد من تفعيل Email/Password في Authentication
3. تأكد من نشر قواعد Firestore
4. افتح Console في المتصفح (F12) لرؤية أي أخطاء
