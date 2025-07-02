import { Delta } from 'quill';

export type RichTextEditorHandle = {
  getContents: () => Delta;
  setContents: (delta: Delta) => void;
};
