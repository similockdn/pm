# THCS Trưng Vương Đà Nẵng - Quản lý đánh giá năng lực

Dự án React + TypeScript + Vite + Firebase, có thể upload GitHub và chạy GitHub Pages/Firebase Hosting.

## Chạy local

```bash
npm install
cp .env.example .env
npm run dev
```

Dán cấu hình Firebase vào `.env` hoặc `src/firebase/config.ts`.

## Build kiểm tra

```bash
npm run build
```

## Deploy GitHub Pages

Cách 1: dùng GitHub Actions sẵn trong `.github/workflows/deploy.yml`.

Cách 2:

```bash
npm run deploy:gh
```

## Deploy Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy
```

## Firebase cần bật

1. Authentication: Email/Password.
2. Firestore Database.
3. Storage.
4. Publish `firestore.rules`, `storage.rules`, `firestore.indexes.json`.

## Cấu trúc chính

- `src/pages`: màn hình chính.
- `src/layouts`: layout.
- `src/data/seed.ts`: dữ liệu mẫu.
- `src/firebase/config.ts`: cấu hình Firebase.
- `src/services/firestoreService.ts`: service đọc/ghi Firestore.
- `src/utils/evaluation.ts`: kiểm tra thang điểm 30/70, +6, xếp loại.

## Ghi chú

Đây là nền project thật để đưa lên GitHub. Các module nghiệp vụ có thể phát triển tiếp trên nền này: Auth thật, upload minh chứng, Excel/PDF, workflow nhiều cấp, audit log đầy đủ.
