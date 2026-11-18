# Form — 로고 머티리얼 웹툴 (GitHub Pages 배포본)

로고(SVG·PNG)를 액체 금속, 히트맵, 프로스트 글래스로 바꿔 주는 브라우저 툴입니다. 이미지 처리는 전부 브라우저 안에서 로컬로 이뤄지고, 서버 업로드나 API 키가 필요 없습니다. PNG 또는 6초 무한 반복 루프(WebM, 2K/4K)로 내보낼 수 있습니다.

- **바로 쓰기:** https://yujin0049.github.io/form-logo-material/
- **원본 프로젝트:** https://github.com/youraipulse/Form (제작: youraipulse)

이 저장소는 위 오픈소스 프로젝트의 빌드 결과물(`dist/`)을 GitHub Pages로 호스팅한 것입니다. 소스를 고치거나 다시 빌드하려면 원본 저장소를 사용하세요.

## 사용법

- **Your logo**: 배경이 투명한 SVG·PNG·WebP를 올리거나 화면에 끌어다 놓습니다.
- **세 가지 머티리얼**: Liquid metal / Heatmap / Frosted glass.
- 프리셋은 미리 만든 조합, Colors는 머티리얼 자체의 색입니다. Glass는 frost·backlight·light size·atmosphere·thickness·direction이 서로 영향을 줍니다.
- **Quality**: 긴 변 기준 2K 또는 4K. 비율은 미리보기 아래에서 1:1 / 16:9 / 9:16.
- **Save PNG**: 현재 프레임 저장. 체크무늬 버튼은 투명 배경.
- **Loop · 6s**: 정확히 180프레임, 30fps, 6초 WebM. 닫힌 루프 모션이라 한 주기에 맞춰 속도가 살짝 조정됩니다. Motion 0이면 정지 루프.
- 영상은 브라우저의 WebCodecs와 VP9/VP8 지원이 필요합니다(Chromium 기준 테스트). 투명도가 중요하면 PNG를 쓰세요 — 영상 알파 지원은 브라우저·코덱에 따라 다릅니다.

## 배포 시 바꾼 것

원본 그대로는 하위 경로(`https://yujin0049.github.io/form-logo-material/`)에서 에셋이 깨지므로 두 가지만 수정했습니다.

- `vite.config.js`에 `base: './'` 추가 (절대 경로 `/assets/...` → 상대 경로 `./assets/...`)
- `index.html`의 브랜드 링크 `href="/"` → `href="./"`

그 외 UI·동작·라이선스 파일·출처 표기는 원본과 동일합니다.

## 출처와 라이선스

오픈소스 구성 요소의 라이선스는 이 저장소 루트에 그대로 들어 있습니다.

- **Paper Shaders**: Apache License 2.0 — [PAPER-LICENSE.txt](PAPER-LICENSE.txt), [PAPER-NOTICE.txt](PAPER-NOTICE.txt)
- **Mediabunny** (WebM 내보내기): Mozilla Public License 2.0 — [MEDIABUNNY-LICENSE.txt](MEDIABUNNY-LICENSE.txt), https://mediabunny.dev
- **Manrope** (폰트): SIL Open Font License 1.1 — [MANROPE-OFL.txt](MANROPE-OFL.txt)

원본 효과의 출처(Stephen Haney / Paper의 게시물)는 [ORIGINALS.md](ORIGINALS.md)에 정리되어 있습니다. 이 툴은 해당 효과를 로컬에서 쓰도록 각색·확장한 것으로, Paper의 공식 제품이 아닙니다.
