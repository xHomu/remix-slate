import { Editor, Transforms, Element } from "slate";

export const CustomEditor = {
  // Determine whether any of the currently selected blocks are code blocks.
  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });
    return !!match;
  },
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    // Toggle the block type depending on whether there's already a match.
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      }
    );
  },
  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },
};
