# 💻 Trend-Now

<div align="center">
  <img width="216" height="52" alt="Frame 2" src="https://github.com/user-attachments/assets/141e52ad-df05-49a8-b984-8b68a1946d97" />
</div>
<br/>
실시간 검색어를 주제로 하는 커뮤니티
<br>

- 프로젝트 기간 : 2025.06 ~ 진행중
- 배포 주소 : https://www.trendnow.me

<br/>

## 🔥 Developers

|                                              Frontend                                              |                                                 Frontend                                                 |       
| :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/f73c9724-e011-46b8-8b91-9b0ddf89eb95" width="100"/> | <img src="https://github.com/user-attachments/assets/d95f560d-a25b-404b-b97b-c0e50066f295" width="100"/> |
|                                                  강수영                                                  |                                                  이동규                                                  | 
|                              [@kangsuyeong](https://github.com/kangsuyeong)                              |                                  [@yoo-nji](https://github.com/Astro7145)                                  |

<br/>

## 💻 Skill

![](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![](https://camo.githubusercontent.com/ef6db79c0bc0a18363ef8ccf33cefbe94639871919540c826c50ab7d32fd6fc6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5461696c77696e644353532d3036423644343f7374796c653d666f722d7468652d6261646765266c6f676f3d7461696c77696e64637373266c6f676f436f6c6f723d7768697465)
![](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white) &nbsp;
![](https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) &nbsp;

## 🚀 트러블 슈팅
### 편집 에디터(Quill 라이브러리)의 이미지 삽입 기능 커스터마이징
- 에디터 라이브러리를 커스터마이징해 이미지 업로드를 base64 → S3로 전환 [[링크]](https://velog.io/@ekdh16/Trend-Now-quill-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%95%B8%EB%93%A4%EB%9F%AC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- 에디터용 커스텀 이미지 노드(blot)를 구현해 ‘이미지에 URL만 삽입’ → ‘이미지에 URL·ID 저장’으로 변경, 최종 제출 시 현재 사용 중인 이미지 ID 추적 지원 [[링크]](https://velog.io/@ekdh16/Trend-Now-Quill-Custom-Blot%EC%9C%BC%EB%A1%9C-img%EC%97%90-id-%EC%86%8D%EC%84%B1-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0)
- 커스터마이징을 통해 Blob 형식을 지원하여 Blob URL 기반의 즉각적인 미리보기를 구현, 제출 시 Blob URL → S3 URL로 교체 [[링크]](https://velog.io/@ekdh16/Trend-Now-Quill-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-Blob-%ED%98%95%EC%8B%9D-%EC%B6%94%EA%B0%80-%EB%B0%8F-%EC%A0%9C%EC%B6%9C%EC%8B%9C-Blob-URL-S3-URL%EB%A1%9C-%EA%B5%90%EC%B2%B4)

### Next.js 미들웨어를 활용한 인증 로직 구현 [[링크]](https://velog.io/@ekdh16/Trend-Now-Next.js-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%ED%86%A0%ED%81%B0-%EC%9E%AC%EB%B0%9C%EA%B8%89-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- SSR 환경에서 페이지 렌더링 전 토큰 유효성을 검사하고, 만료 시 토큰 재발급 로직 구현
- 비인가 사용자의 접근을 렌더링 이전에 제어하여, 불필요한 화면 노출을 막고 사용자 경험 개선

### `hosts` 파일을 이용한 로컬 개발 환경 개선 [[링크]](https://velog.io/@ekdh16/Trend-Now-hosts-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%B4-localhost%EC%9D%98-%EC%BF%A0%ED%82%A4-%EA%B3%B5%EC%9C%A0-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)
- TanStack Query를 사용해 SSR 과정에서 데이터를 미리 가져올 때, Next.js의 rewrites 설정이 적용되지 않는 문제 발생
- `hosts` 파일을 이용해 로컬 환경에 커스텀 도메인을 적용하여, localhost와 API 서버 간 SameSite 쿠키 정책 문제 해결
