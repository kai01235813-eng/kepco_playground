# Vercel 배포 오류 해결

## 문제 상황
Vercel 배포 시 다음 오류 발생:
```
Could not resolve "./config/api" from "src/components/ActivityFeed.tsx"
```

## 원인
`src/components/` 폴더의 파일들이 잘못된 상대 경로(`./config/api`)를 사용했습니다.
실제로 `config` 폴더는 `src/config/`에 있으므로 `../config/api`를 사용해야 합니다.

## 해결 방법

### 1. 로컬 파일 수정 완료
다음 파일들이 이미 수정되었습니다:
- ✅ `src/components/ActivityFeed.tsx`
- ✅ `src/components/HotIdeasSection.tsx`
- ✅ `src/components/SimpleLogin.tsx`

### 2. GitHub에 푸시 확인
다음 명령어로 확인:
```bash
# 현재 변경사항 확인
git status

# 모든 변경사항 커밋
git add -A
git commit -m "Fix: Correct import paths for config/api"

# GitHub에 푸시
git push origin main
```

### 3. Vercel에서 재배포
- Vercel 대시보드 접속
- 프로젝트 선택
- "Deployments" 탭에서 최신 배포 확인
- 자동 재배포가 시작되지 않으면 "Redeploy" 클릭

## 수정된 파일 목록

### src/components/ActivityFeed.tsx
```typescript
// 변경 전
import { API_BASE } from './config/api';

// 변경 후
import { API_BASE } from '../config/api';
```

### src/components/HotIdeasSection.tsx
```typescript
// 변경 전
import { API_BASE } from './config/api';

// 변경 후
import { API_BASE } from '../config/api';
```

### src/components/SimpleLogin.tsx
```typescript
// 변경 전
import { API_BASE } from './config/api';

// 변경 후
import { API_BASE } from '../config/api';
```

## 확인 방법

1. GitHub 저장소 확인:
   - https://github.com/kai01235813-eng/kepco_playground
   - `src/components/ActivityFeed.tsx` 파일 열기
   - 3번째 줄이 `import { API_BASE } from '../config/api';`인지 확인

2. 로컬 빌드 테스트:
   ```bash
   npm run build
   ```
   빌드가 성공하면 정상입니다.

3. Vercel 로그 확인:
   - Vercel 대시보드 → Deployments → 최신 배포 → Logs
   - 에러 메시지가 사라졌는지 확인

## 추가 문제 해결

만약 여전히 같은 에러가 발생한다면:

1. **GitHub에 변경사항이 반영되었는지 확인**
   ```bash
   git log --oneline -5
   git show HEAD:src/components/ActivityFeed.tsx | head -5
   ```

2. **Vercel 캐시 문제일 수 있음**
   - Vercel 대시보드 → Settings → General
   - "Clear Build Cache" 클릭
   - 다시 배포

3. **강제 재배포**
   - Deployments 탭에서 "Redeploy" 클릭
   - 또는 빈 커밋으로 트리거:
     ```bash
     git commit --allow-empty -m "Trigger redeploy"
     git push
     ```


