import type { CustomImageValue, ImageUploadState } from '@/shared/types';
import type { Delta } from 'quill';

// Delta 순회 후 tempId를 S3 업로드 결과(id, url)로 치환하고
// 최종 Delta(newDelta)와 이미지 ID 배열(imageIds)을 반환
export default function processDelta(delta: Delta, uploads: Record<string, ImageUploadState>) {
  const imageIds: number[] = [];
  const newOps = delta.ops.map((op) => {
    // customImage인지 확인
    if (typeof op.insert === 'object' && op.insert.image !== null) {
      const insert = op.insert as { customImage: CustomImageValue };
      const tempId = insert.customImage.tempId;
      const dataId = insert.customImage.id;

      // tempId 기반으로 업로드 상태 찾기
      if (tempId && uploads[tempId]) {
        const { id, url, status } = uploads[tempId];

        // status가 ok일 때만 최종값으로 치환
        if (status === 'ok' && url && id) {
          insert.customImage = { url, id }; // tempId 제거
          imageIds.push(id);
        }
      }

      // 편집 모드: 기존 이미지인 경우(dataId가 있으면) 제출용 imageIds에 추가
      if (dataId) {
        imageIds.push(dataId);
      }
      return { ...op, insert };
    }

    return op;
  });

  return { newDelta: { ops: newOps }, imageIds };
}
