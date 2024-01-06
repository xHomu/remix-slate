import { useState } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
// TypeScript users only add this code
import type { BaseEditor, Descendant } from "slate";
import type { ReactEditor } from "slate-react";

export type CustomElement = { type: string; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
export function useSlateEditor() {
  const [editor] = useState(() => withReact(createEditor()));
  return editor;
}
