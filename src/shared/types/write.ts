import { Delta } from 'quill';

export type RichTextEditorHandle = {
  getContents: () => Delta;
};

export interface WriteCooldownResponse {
  canWritePost: boolean;
  cooldownSeconds: number;
}
