# WebFile Scrape to ASUS Downloader

이 프로젝트는 웹 페이지에서 파일 링크를 스크랩하여 ASUS Download Master로 다운로드를 자동화하는 도구입니다.

## 기능

- 설정된 웹 페이지에서 특정 패턴의 파일 링크를 주기적으로 스크랩
- 일반 파일 링크는 ASUS Download Master로 직접 다운로드 요청
- 토렌트 파일은 자동으로 감지하여 토렌트 다운로드 방식으로 처리
- 이미 처리된 링크는 중복 다운로드 방지

## 설치 방법

1. 프로젝트 클론 또는 다운로드
2. 의존성 패키지 설치

```bash
npm install
```

## 설정 방법

`config.json` 파일을 수정하여 설정합니다:

```json
{
  "webpageUrls": [
    {
      "url": "스크랩할_웹페이지_URL",
      "pattern": "찾을_파일_패턴"
    }
  ],
  "asusDownloadMaster": {
    "url": "http://router.asus.com:8081",
    "user": "admin",
    "pwd": "admin",
    "requestTimeout": 30000,
    "dmTimeout": 10000
  },
  "interval": 3600,
  "runCount": 0,
  "dbPath": "./scrap.db"
}
```

### 설정 항목 설명

- `webpageUrls`: 스크랩할 웹 페이지 URL과 파일 패턴 목록
  - `url`: 스크랩할 웹 페이지 URL
  - `pattern`: 찾을 파일 링크 패턴 (정규식)
- `asusDownloadMaster`: ASUS Download Master 설정
  - `url`: ASUS Download Master URL (기본값: http://router.asus.com:8081)
  - `user`: 라우터 관리자 사용자 이름
  - `pwd`: 라우터 관리자 비밀번호
  - `requestTimeout`: 요청 타임아웃 (밀리초)
  - `dmTimeout`: Download Master 타임아웃 (밀리초)
- `interval`: 스크랩 주기 (초)
- `runCount`: 실행 횟수 (0은 무제한)
- `dbPath`: 처리된 URL 데이터베이스 파일 경로

## 실행 방법

```bash
npm start
```

또는 특정 설정 파일을 지정하여 실행:

```bash
node src/index.js /path/to/config.json
```

## 작동 방식

1. 설정된 웹 페이지에서 파일 링크를 스크랩
2. 링크가 토렌트 파일인지 확인
   - 토렌트 파일이면: 토렌트 파일을 다운로드하여 ASUS Download Master에 토렌트 다운로드 요청
   - 일반 파일이면: ASUS Download Master에 직접 다운로드 요청
3. 성공적으로 처리된 링크는 데이터베이스에 저장하여 중복 다운로드 방지
4. 설정된 주기마다 반복 실행

## 요구 사항

- Node.js 14.0 이상
- ASUS 라우터와 Download Master 설치 및 실행
