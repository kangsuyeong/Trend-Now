import { Delete, Write } from './icons';
import { Dropdownmenu, Kebab32 } from '@/shared/ui';

export default function PostKebabButton() {
  return (
    <Dropdownmenu
      trigger={
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200">
          <Kebab32 className="text-gray-500" />
        </span>
      }
      items={[
        {
          content: (
            <>
              <Write />
              <span>게시글 수정</span>
            </>
          ),
        },
        {
          content: (
            <>
              <Delete />
              <span className="text-negative">게시글 삭제</span>
            </>
          ),
        },
      ]}
    />
  );
}
