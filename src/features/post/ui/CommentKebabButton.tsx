import { Delete, Write } from '@/features/post/ui/icons';
import { Dropdownmenu, Kebab32 } from '@/shared/ui';

export default function CommentKebabButton() {
  return (
    <Dropdownmenu
      trigger={
        <span className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200">
          <Kebab32 />
        </span>
      }
      items={[
        {
          content: (
            <>
              <Write />
              <span>댓글 수정</span>
            </>
          ),
        },
        {
          content: (
            <>
              <Delete />
              <span className="text-negative">댓글 삭제</span>
            </>
          ),
        },
      ]}
    />
  );
}
