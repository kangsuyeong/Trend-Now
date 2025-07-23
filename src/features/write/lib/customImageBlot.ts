import Quill from 'quill';
import { BlockEmbed } from 'quill/blots/block';

// 커스텀 이미지 블롯 정의
class CustomImageBlot extends BlockEmbed {
  static blotName = 'customImage'; // 델타에서 사용할 블롯 이름
  static tagName = 'img'; // 실제 DOM에 삽입될 태그 (img 태그 사용)

  // 에디터에 이미지 삽입할 때 호출되는 메서드
  static create(value: { id: string; url: string }) {
    const node = super.create() as HTMLElement; // 기본 img 요소 생성
    node.setAttribute('src', value.url); // 이미지 URL 설정
    node.setAttribute('data-id', value.id); // 추가 식별자(data-id) 설정
    return node; // 최종 img 노드 반환
  }

  // 에디터로부터 델타(Delta)를 생성할 때 사용되는 메서드
  static value(node: HTMLElement) {
    return {
      id: node.getAttribute('data-id'), // data-id 값을 델타에 포함
      url: node.getAttribute('src'), // src 값을 델타에 포함
    };
  }
}

// 이미 같은 이름의 포맷이 등록되어 있는지 확인하고, 없다면 등록
if (!Quill.imports['formats/customImage']) {
  Quill.register(CustomImageBlot); // 커스텀 이미지 블롯을 Quill에 등록
}
