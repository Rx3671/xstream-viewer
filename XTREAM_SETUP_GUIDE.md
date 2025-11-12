# دليل إدخال بيانات Xtream Codes

## المشكلة الشائعة: "Login Failed"

إذا ظهرت لك رسالة "login failed" عند إدخال بيانات Xtream، السبب عادة يكون:

### 1. **تنسيق URL خاطئ**

❌ **خطأ:**
```
http://example.com:8080/player_api.php
http://example.com:8080/
```

✅ **صحيح:**
```
http://example.com:8080
```

**القاعدة:** أدخل فقط العنوان والمنفذ، بدون `/player_api.php` أو `/` في النهاية.

---

### 2. **بيانات الاتصال**

تحتاج إلى 3 معلومات من مزود الخدمة:

| الحقل | مثال | ملاحظة |
|------|------|--------|
| **Server URL** | `http://server.com:8080` | بدون مسار إضافي |
| **Username** | `user123` | اسم المستخدم الخاص بك |
| **Password** | `pass456` | كلمة المرور الخاصة بك |

---

### 3. **أمثلة صحيحة**

#### مثال 1:
```
URL: http://iptv-server.com:8080
Username: john_doe
Password: mypassword123
```

#### مثال 2:
```
URL: http://192.168.1.100:25461
Username: test_user
Password: test_pass
```

#### مثال 3:
```
URL: https://stream.example.com
Username: customer001
Password: secure_pass
```

---

### 4. **كيفية الحصول على البيانات**

عادة يرسل لك مزود الخدمة رسالة تحتوي على:

```
Server: http://example.com:8080
Username: your_username
Password: your_password
```

أو يعطيك رابط M3U مثل:
```
http://example.com:8080/get.php?username=your_username&password=your_password&type=m3u_plus
```

في هذه الحالة:
- **URL** = `http://example.com:8080`
- **Username** = `your_username`
- **Password** = `your_password`

---

### 5. **التحقق من الاتصال**

بعد إدخال البيانات:

1. ✅ **نجح الاتصال:** سترى رسالة "Connected successfully! Loading your content..."
2. ❌ **فشل الاتصال:** تحقق من:
   - هل URL صحيح؟
   - هل Username و Password صحيحان؟
   - هل لديك اتصال بالإنترنت؟
   - هل الخدمة نشطة؟

---

### 6. **رسائل الأخطاء الشائعة**

| الرسالة | السبب | الحل |
|---------|-------|------|
| "Invalid username or password" | بيانات خاطئة | تحقق من Username و Password |
| "Cannot connect to server" | URL خاطئ أو السيرفر متوقف | تحقق من URL والاتصال |
| "Server error: 404" | URL خاطئ | أزل `/player_api.php` من URL |
| "Server error: 500" | مشكلة في السيرفر | اتصل بمزود الخدمة |

---

### 7. **نصائح مهمة**

⚠️ **لا تضع مسافات** في بداية أو نهاية البيانات
⚠️ **انسخ والصق** البيانات لتجنب الأخطاء الإملائية
⚠️ **تأكد من صلاحية الاشتراك** - قد يكون منتهياً
⚠️ **جرب في متصفح** أولاً: افتح `http://your-server:port/player_api.php?username=xxx&password=xxx` في المتصفح

---

## اختبار سريع

إذا كان لديك هذه البيانات من مزود الخدمة:
```
http://myserver.com:8080/player_api.php?username=test&password=1234
```

أدخلها في الموقع هكذا:
- **Server URL:** `http://myserver.com:8080`
- **Username:** `test`
- **Password:** `1234`

---

## الدعم

إذا استمرت المشكلة:
1. افتح Console في المتصفح (F12)
2. حاول الاتصال مرة أخرى
3. انسخ رسائل الأخطاء
4. اتصل بمزود خدمة IPTV للتحقق من البيانات
