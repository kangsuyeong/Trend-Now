import type { CustomImageValue } from '@/shared/types';
import Quill from 'quill';
import { BlockEmbed } from 'quill/blots/block';
import Image from 'quill/formats/image';
import { sanitize } from 'quill/formats/link.js';

// 커스텀 이미지 블롯 정의
class CustomImageBlot extends BlockEmbed {
  static blotName = 'customImage'; // 델타에서 사용할 블롯 이름
  static tagName = 'img'; // 실제 DOM에 삽입될 태그 (img 태그 사용)

  // 에디터에 이미지 삽입할 때 호출되는 메서드
  static create(value: CustomImageValue) {
    const node = super.create() as HTMLElement; // 기본 img 요소 생성
    node.setAttribute('src', value.url); // 이미지 URL 설정
    if (value.id) {
      node.setAttribute('data-id', String(value.id)); // 최종 id
    }
    if (value.tempId) {
      node.setAttribute('data-temp-id', String(value.tempId));
    }
    return node; // 최종 img 노드 반환
  }

  // 에디터로부터 델타(Delta)를 생성할 때 사용되는 메서드
  static value(node: HTMLElement) {
    return {
      url: node.getAttribute('src') ?? '', // src 값을 델타에 포함
      id: node.getAttribute('data-id') ?? undefined, // data-id 값을 델타에 포함
      tempId: node.getAttribute('data-temp-id') ?? undefined,
    };
  }
}

Quill.register(CustomImageBlot); // 커스텀 이미지 블롯을 Quill에 등록

// ------------------------------------------------------------------

class MyImage extends Image {
  static sanitize(url: string) {
    return sanitize(url, ['http', 'https', 'data', 'blob']) ? url : '//:0';
  }
}

Quill.register('formats/image', MyImage);
