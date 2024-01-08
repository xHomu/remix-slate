import { Editor } from "slate";
import { CustomEditor } from "./CustomEditor";

export function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code Block
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Bold
      </button>
    </div>
  );
}
