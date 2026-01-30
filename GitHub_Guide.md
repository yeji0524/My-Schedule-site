# GitHub 보안 가이드

GitHub에 코드를 올릴 때 민감한 정보가 실수로 공개되지 않도록 주의해야 합니다.

---

## 1. 절대 GitHub에 올리면 안 되는 것들

### 개인정보
- 실제 이메일 주소 (예: `myname@gmail.com`)
- 실제 전화번호
- 집 주소
- 주민등록번호

### 비밀 정보
- 비밀번호
- API 키 (예: `sk-xxxx...`, `AIzaSy...`)
- 토큰 (예: GitHub 토큰, Access Token)
- 신용카드 정보

### 파일 종류
- `.env` 파일 (환경변수 파일)
- `credentials.json` (인증 파일)
- `config.secret.js` (비밀 설정 파일)
- 개인 사진 파일

---

## 2. .gitignore 파일이란?

`.gitignore` 파일에 적힌 파일/폴더는 GitHub에 올라가지 않습니다.

### 현재 프로젝트의 .gitignore 설정

```
# 이미지 파일 - 프로젝트 전체(루트 + 모든 하위 폴더)에서 무시됨
*.png
*.jpg
*.jpeg
*.gif
*.webp

# 마크다운 파일 - 프로젝트 전체(루트 + 모든 하위 폴더)에서 무시됨
*.md

# 폴더 - 해당 폴더 전체가 무시됨
_backup/
_skills/
```

**중요:** `*.png`, `*.md` 같은 패턴은 **루트 폴더뿐 아니라 모든 하위 폴더**에도 적용됩니다.

예시:
- `my-project/image.png` - 무시됨
- `my-project/app/photo.png` - 무시됨
- `my-project/components/test/sample.md` - 무시됨

### .gitignore 작동 방식

| 패턴 | 의미 | 적용 범위 |
|------|------|----------|
| `*.png` | 모든 PNG 파일 | 프로젝트 전체 (루트 + 하위 폴더) |
| `/*.png` | 루트의 PNG 파일만 | 루트 폴더만 |
| `*.md` | 모든 마크다운 파일 | 프로젝트 전체 (루트 + 하위 폴더) |
| `folder/` | 특정 폴더 전체 | 해당 폴더와 그 안의 모든 파일 |
| `secret.txt` | 특정 파일 | 프로젝트 전체에서 해당 이름의 파일 |

### .gitignore에 파일 추가하는 방법

새로운 파일 유형을 무시하고 싶을 때:

**방법 1: Claude에게 요청 (권장)**
```
"Claude, .gitignore에 *.pdf 파일도 추가해줘"
"Claude, secret-config.js 파일이 GitHub에 안 올라가게 해줘"
```

**방법 2: 직접 수정**

1. 프로젝트 루트의 `.gitignore` 파일을 VS Code로 열기
2. 파일 맨 아래에 무시할 패턴 추가:
   ```
   # 내가 추가한 항목
   *.pdf
   secret-config.js
   my-private-folder/
   ```
3. 파일 저장
4. 변경사항 커밋 및 푸시:
   ```bash
   git add .gitignore
   git commit -m "Update .gitignore"
   git push
   ```

**주의:** 이미 GitHub에 올라간 파일은 .gitignore에 추가해도 자동 삭제되지 않습니다.
이 경우 Claude에게 "GitHub에서 xxx 파일 삭제해줘"라고 요청하세요.

---

## 3. 웹사이트 수정 후 업데이트 방법

### 안전한 업데이트 순서

```
1. 파일 수정 (VS Code 등에서)
     |
     v
2. 수정한 파일 확인 (git status)
     |
     v
3. 민감정보 없는지 확인  <-- 중요!
     |
     v
4. 파일 추가 (git add 파일명)
     |
     v
5. 커밋 (git commit)
     |
     v
6. 푸시 (git push)
```

### 수정 가능한 파일 (안전)

| 파일 | 용도 | 수정 내용 |
|------|------|----------|
| `app/page.tsx` | 메인 페이지 | 이름, 소개글, 이미지 URL |
| `app/globals.css` | 폰트 설정 | Google Fonts URL |
| `app/layout.tsx` | 레이아웃 | 폰트 이름 |
| `components/*.tsx` | 컴포넌트 | 스타일, 텍스트 |

### 주의가 필요한 수정

**app/page.tsx 수정 시:**
```tsx
// 안전한 예시
const myInfo = {
  name: "홍길동",                      // OK - 공개해도 되는 이름
  email: "contact@example.com",        // OK - 예시 이메일
  socialLinks: {
    instagram: "https://instagram.com/mypage",  // OK - 공개 계정
  },
};

// 위험한 예시
const myInfo = {
  email: "real-email@gmail.com",       // 위험! - 실제 이메일
  password: "mypassword123",           // 절대 금지!
  apiKey: "sk-abc123...",              // 절대 금지!
};
```

---

## 4. 파일 관리 규칙

### 루트 폴더에 두지 말아야 할 것

프로젝트 루트 폴더(최상위 폴더)에는 다음을 두지 마세요:

```
my-project/
  |
  |-- app/           (OK)
  |-- components/    (OK)
  |-- public/        (OK - 공개 이미지만)
  |
  |-- 내사진.jpg     (금지! - 실수로 올라갈 수 있음)
  |-- 메모.txt       (금지! - 민감정보 포함 가능)
  |-- .env           (금지! - 비밀정보)
```

### 개인 파일 보관 위치

개인 파일은 프로젝트 폴더 **밖에** 보관하세요:

```
D:/
  |-- claude-projects/
  |     |-- my-website/      <-- 프로젝트 폴더
  |           |-- app/
  |           |-- components/
  |
  |-- personal-files/        <-- 개인 파일은 여기에
        |-- 내사진.jpg
        |-- 메모.txt
```

---

## 5. 실수로 올렸을 때 대처법

### 아직 push 안 했을 때

```bash
# 스테이징 취소
git reset HEAD 파일명

# 예시
git reset HEAD secret.txt
```

### 이미 push 했을 때

**즉시 조치가 필요합니다:**

1. 비밀번호/토큰이 노출된 경우 -> 즉시 비밀번호 변경
2. API 키가 노출된 경우 -> 해당 서비스에서 키 재발급

```bash
# GitHub에서 파일 삭제
git rm --cached 파일명
git commit -m "Remove sensitive file"
git push
```

**주의:** GitHub 기록에는 남아있을 수 있으므로, 노출된 비밀정보는 반드시 변경하세요.

---

## 6. 업데이트 전 체크리스트

파일을 GitHub에 올리기 전에 확인하세요:

- [ ] 실제 이메일 주소가 포함되어 있지 않은가?
- [ ] 비밀번호나 API 키가 코드에 없는가?
- [ ] 개인 사진이나 문서가 포함되어 있지 않은가?
- [ ] .env 파일이 스테이징되어 있지 않은가?
- [ ] 루트 폴더에 불필요한 파일이 없는가?

### 확인 명령어

```bash
# 현재 올라갈 파일 목록 확인
git status

# 변경된 내용 확인
git diff
```

---

## 7. 안전한 이미지 사용법

### public 폴더 사용 시 주의

`public/` 폴더의 파일은 **누구나 접근 가능**합니다:
- `https://your-site.vercel.app/image.jpg`

따라서 공개해도 되는 이미지만 넣으세요.

---

## 8. 요약

| 해야 할 것 | 하지 말아야 할 것 |
|-----------|-----------------|
| 예시 이메일 사용 | 실제 이메일 사용 |
| Unsplash 이미지 사용 | 개인 사진 직접 업로드 |
| git status로 확인 후 push | 확인 없이 바로 push |
| 프로젝트 폴더 외부에 개인파일 보관 | 루트에 아무 파일이나 두기 |
| .gitignore 활용 | .gitignore 무시 |

---

## 9. 도움이 필요할 때

잘 모르겠거나 실수한 것 같으면:
1. **push하지 마세요** (일단 멈추기)
2. **담당자에게 문의**하세요
3. 함께 해결합니다

**기억하세요:** 실수는 누구나 합니다. 중요한 건 push 전에 확인하는 습관입니다.
