import { Delta } from 'quill';

export type ImageUploadState = {
  url?: string;
  id?: number;
  status: 'pending' | 'ok' | 'error';
};

export type RichTextEditorHandle = {
  getContents: () => Delta;
  getUploadsByTempId(): Record<string, ImageUploadState>;
};

export interface WriteCooldownResponse {
  canWritePost: boolean;
  cooldownSeconds: number;
}

export interface CustomImageValue {
  url: string;
  id?: number;
  tempId?: string;
}
