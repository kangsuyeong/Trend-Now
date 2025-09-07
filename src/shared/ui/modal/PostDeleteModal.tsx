'use client';

import { Modal, PrimaryButton } from '@/shared/ui';
import React from 'react';

interface PostDeleteModalProps {
  /**@param {boolean} open 모달 여닫음 여부 */
  open: boolean;
  /**@param {() => void} onClose 모달을 닫을 시 실행하는 함수 */
  onClose: () => void;
  /**@param {() => void} onDelete 삭제 버튼 클릭 시 실행하는 함수 */
  onDelete: () => void;
  /**@param {string} title 상단 볼드체 문구*/
  title: string;
  /**@param {string} message 하단 설명 문구*/
  message: string;
}

export default function PostDeleteModal({
  open,
  onClose,
  onDelete,
  title,
  message,
}: PostDeleteModalProps) {
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <span className="flex h-fit w-[420px] flex-col gap-y-6 rounded-3xl bg-white p-6">
        <span className="flex w-full flex-col gap-y-3 py-4">
          <span className="text-center text-xl font-bold text-gray-900">{title}</span>
          <span className="text-center text-sm font-regular text-gray-500">{message}</span>
        </span>
        <span className="flex w-full justify-center gap-x-3">
          <PrimaryButton variant="gray" size="l" className="w-full" onClick={onClose}>
            닫기
          </PrimaryButton>
          <PrimaryButton variant="error" size="l" className="w-full" onClick={onDelete}>
            삭제
          </PrimaryButton>
        </span>
      </span>
    </Modal>
  );
}
