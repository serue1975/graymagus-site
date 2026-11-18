# Gray.Magus — graymagus.com

## 게시물 올리는 법 (Archive)

1. `posts` 폴더로 들어가서 **Add file → Upload files**
2. 이미지와 `info.yaml`을 끌어다 놓기
3. 업로드 화면 상단 경로칸에 폴더 이름 입력 — 예: `2026-11-불편한-사람/`
4. **Commit changes** → 1~2분 뒤 사이트에 반영

### 폴더 하나 = 게시물 하나

```
posts/2026-11-불편한-사람/
  01.jpg   ← 첫 장이 썸네일
  02.jpg
  03.jpg
  info.yaml
```

### info.yaml

```yaml
title: 불편한 사람으로 사는 법
date: 2026-11-19
tag: BOOK        # BOOK / NOTE / GRAPHIC / LAB
```

- 이미지는 파일 이름 순서대로 넘어갑니다 (01, 02, 03 …)
- 이미지가 2장 이상이면 캐러셀, 1장이면 크게 한 장
- 권장: 4:5 비율, 가로 1600px 안팎 JPG
- `info.yaml`이 없으면 폴더 이름이 제목, 태그는 NOTE
- `_`로 시작하는 폴더(`_example`)는 사이트에 안 나옵니다
- 게시물이 하나도 없으면 Archive 섹션은 자동으로 숨겨집니다

## 게시물 지우기
해당 폴더 안 파일들을 삭제하고 Commit.

## 작업 리스트 / 문구 수정
`index.html`에서 `const WORK=[`(Selected Works), `const MORE=[`(Other projects) 부분을 수정.
