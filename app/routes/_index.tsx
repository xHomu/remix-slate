import type { MetaFunction } from "@remix-run/node";
import { Editor, Transforms, Element } from "slate";
import { Editable, Slate } from "slate-react";
import { CustomEditor } from "~/components/CustomEditor";
import { Toolbar } from "~/components/SlateToolbar";
import { useRenderElement } from "~/components/renderElement";
import { useRenderLeaf } from "~/components/renderLeaf";
import { useSlateEditor, type CustomElement } from "~/components/slateEditor";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

let initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function Index() {
  const editor = useSlateEditor();
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // console.log(value));
          // Save the value to Local Storage.
          initialValue = JSON.parse(JSON.stringify(value));
          console.log(initialValue);
          // console.log(initialValue);
        }
      }}
    >
      <Toolbar editor={editor} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }
            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
