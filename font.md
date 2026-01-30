# 웹 폰트 변경 가이드

이 문서는 웹사이트의 폰트를 쉽게 변경하는 방법을 설명합니다.

---

## 1. 폰트는 어디서 찾나요?

### 한글 폰트 쇼케이스 (추천)

**https://googlefonts.github.io/korean/**

- 한글 폰트만 모아서 보여줌
- 시각적으로 미리보기 가능
- 인터랙티브한 타이포그래피 프리뷰
- 폰트 선택 후 Google Fonts로 이동

### Google Fonts (전체 폰트)

**https://fonts.google.com**

- 무료로 사용 가능
- 1,500개 이상의 폰트 (영문 포함)
- 코드 복사해서 바로 사용 가능

### 무료 한글 폰트 모음

**https://www.freekoreanfont.com**

- 134개 이상의 무료 한글 폰트
- 다운로드 가능
- Google Fonts 외 다양한 폰트

---

## 2. Google Fonts에서 폰트 선택하기

### 단계별 가이드

**1단계: Google Fonts 접속**
```
https://fonts.google.com
```

**2단계: 한글 폰트 필터링**
- 왼쪽 필터에서 **Language** 클릭
- **Korean** 선택

**3단계: 원하는 폰트 클릭**
- 미리보기에서 폰트 모양 확인
- 클릭하면 상세 페이지로 이동

**4단계: "Get font" 버튼 클릭**
- 오른쪽 상단 버튼

**5. "Get embed code" 클릭**
- 코드를 복사할 수 있는 화면이 나타남

**6단계: "@import" 선택**
- "Web" 탭에서 "@import" 라디오 버튼 클릭
- 아래와 같은 코드가 나타남:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
```

**7단계: 코드 복사**
- 이 코드를 복사해서 프로젝트에 붙여넣기

---

## 3. 인기 한글 폰트 목록

| 폰트 이름 | 특징 | 추천 용도 |
|----------|------|----------|
| **Noto Sans KR** | 가장 기본적, 가독성 좋음 | 본문, 전체 |
| **Pretendard** | 현대적, 깔끔함 | 전체 |
| **Spoqa Han Sans** | 둥글둥글, 친근함 | 전체 |
| **IBM Plex Sans KR** | 세련됨, 전문적 | 비즈니스 |
| **Nanum Gothic** | 부드러움 | 본문 |
| **Nanum Myeongjo** | 명조체, 고급스러움 | 제목, 강조 |
| **Gothic A1** | 심플함 | 전체 |
| **Jua** | 귀여움, 동글동글 | 캐주얼 |
| **Black Han Sans** | 굵고 강렬함 | 제목, 포스터 |
| **Do Hyeon** | 레트로 느낌 | 제목, 강조 |

---

## 4. 프로젝트에 폰트 적용하기

### 수정할 파일 2개

```
app/
├── globals.css     ← 1. 폰트 불러오기
└── layout.tsx      ← 2. 폰트 적용하기
```

---

### 4.1 globals.css 수정하기

**파일 위치:** `app/globals.css`

**현재 코드:**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
@import "tailwindcss";
```

**폰트 변경 방법:**

`@import url('...')` 부분을 Google Fonts에서 복사한 코드로 교체합니다.

**예시: Pretendard로 변경**
```css
@import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";
```

**예시: 여러 폰트 사용 (본문 + 제목)**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Black+Han+Sans&display=swap');
@import "tailwindcss";
```

> **주의:** `@import "tailwindcss";`는 항상 **마지막**에 있어야 합니다.

---

### 4.2 layout.tsx 수정하기

**파일 위치:** `app/layout.tsx`

**현재 코드:**
```tsx
<body
  className="bg-neutral-50 text-neutral-800"
  style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
>
```

**폰트 변경 방법:**

`fontFamily` 부분의 폰트 이름을 변경합니다.

**예시: Pretendard로 변경**
```tsx
style={{ fontFamily: "'Pretendard', sans-serif" }}
```

**예시: Gothic A1으로 변경**
```tsx
style={{ fontFamily: "'Gothic A1', sans-serif" }}
```

---

### 4.3 제목 폰트 변경하기 (선택사항)

제목에 다른 폰트를 사용하고 싶다면, 각 컴포넌트의 `style` 속성을 수정합니다.

**파일 위치:** `components/HeroSection.tsx`, `components/AboutSection.tsx` 등

**현재 코드:**
```tsx
<h1 style={{ fontFamily: "'Playfair Display', serif" }}>
```

**변경 예시: Black Han Sans로 변경**
```tsx
<h1 style={{ fontFamily: "'Black Han Sans', sans-serif" }}>
```

---

## 5. 폰트 굵기(weight) 이해하기

폰트마다 지원하는 굵기가 다릅니다.

| 숫자 | 이름 | 사용 예 |
|------|------|--------|
| 100 | Thin | - |
| 200 | Extra Light | - |
| 300 | Light | 부가 설명 |
| 400 | Regular (기본) | 본문 |
| 500 | Medium | 약간 강조 |
| 600 | Semi Bold | 소제목 |
| 700 | Bold | 제목, 강조 |
| 800 | Extra Bold | 큰 제목 |
| 900 | Black | 포스터 |

### Google Fonts에서 굵기 선택하기

```css
/* 400, 700만 사용 */
family=Noto+Sans+KR:wght@400;700

/* 300, 400, 500, 600, 700 사용 */
family=Noto+Sans+KR:wght@300;400;500;600;700
```

> **팁:** 필요한 굵기만 선택하면 로딩 속도가 빨라집니다.

---

## 6. 실전 예제: 폰트 변경 따라하기

### 목표: 본문을 "Gothic A1", 제목을 "Black Han Sans"로 변경

**Step 1: Google Fonts에서 코드 복사**

두 폰트를 모두 선택하고 코드를 복사합니다:
```css
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Gothic+A1:wght@400;500;700&display=swap');
```

**Step 2: globals.css 수정**

```css
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Gothic+A1:wght@400;500;700&display=swap');
@import "tailwindcss";
```

**Step 3: layout.tsx 수정**

```tsx
style={{ fontFamily: "'Gothic A1', sans-serif" }}
```

**Step 4: 제목 컴포넌트 수정 (HeroSection.tsx 등)**

```tsx
<h1 style={{ fontFamily: "'Black Han Sans', sans-serif" }}>
```

**Step 5: 저장 후 확인**

브라우저에서 변경된 폰트를 확인합니다.

---

## 7. Vercel 배포 시 폰트 적용

로컬에서 폰트 변경 후 배포하려면:

```bash
git add .
git commit -m "Change font to Gothic A1"
git push
```

Vercel이 자동으로 재배포합니다.

---

## 8. 자주 묻는 질문

### Q: 폰트가 적용되지 않아요

**확인사항:**
1. `globals.css`의 `@import` URL이 정확한가?
2. `layout.tsx`의 폰트 이름이 정확한가? (띄어쓰기, 대소문자 주의)
3. 폰트 이름에 띄어쓰기가 있으면 따옴표로 감싸야 함: `'Noto Sans KR'`

### Q: 한글이 깨져요

**해결:**
- Google Fonts에서 **Korean** 지원 폰트인지 확인
- 영문 전용 폰트는 한글이 기본 폰트로 표시됨

### Q: 폰트가 느리게 로딩돼요

**해결:**
- 필요한 굵기(weight)만 선택
- `display=swap` 옵션 사용 (기본 포함됨)

### Q: 특정 부분만 다른 폰트를 쓰고 싶어요

**방법:**
해당 요소에 직접 `style` 속성 추가:
```tsx
<p style={{ fontFamily: "'Jua', sans-serif" }}>
  이 부분만 다른 폰트
</p>
```

---

## 9. 추천 폰트 조합

| 본문 폰트 | 제목 폰트 | 느낌 |
|----------|----------|------|
| Noto Sans KR | Playfair Display | 클래식, 고급스러움 |
| Gothic A1 | Black Han Sans | 모던, 강렬함 |
| Pretendard | Nanum Myeongjo | 세련됨, 전문적 |
| Noto Sans KR | Do Hyeon | 캐주얼, 재미있음 |
| IBM Plex Sans KR | IBM Plex Sans KR | 일관성, 비즈니스 |

---

## 10. 빠른 참조 카드

```
1. Google Fonts 접속
   https://fonts.google.com/?subset=korean

2. 폰트 선택 → Get font → Get embed code → @import 복사

3. globals.css 수정
   @import url('복사한URL');
   @import "tailwindcss";

4. layout.tsx 수정
   style={{ fontFamily: "'폰트이름', sans-serif" }}

5. 저장 → git add . → git commit → git push
```
