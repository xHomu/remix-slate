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

export default function Index() {
  const editor = useSlateEditor();
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  return (
    <Slate editor={editor} initialValue={initialValue}>
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
