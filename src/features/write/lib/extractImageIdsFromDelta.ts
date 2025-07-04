import type { Delta } from 'quill';

/**
 * Quill Delta 객체에서 customImage 블롯의 이미지 ID만 추출하여 배열로 반환합니다.
 */
export function extractImageIdsFromDelta(delta: Delta): number[] {
  const ids: number[] = [];
  delta.ops.forEach((op) => {
    if (typeof op.insert === 'object' && op.insert !== null) {
      const insert = op.insert as { customImage?: { id: string | number } };
      if (insert.customImage?.id) {
        ids.push(Number(insert.customImage.id));
      }
    }
  });
  return ids;
}
