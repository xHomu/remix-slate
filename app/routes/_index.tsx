import type { MetaFunction } from "@remix-run/node";
import { Editor, Transforms, Element } from "slate";
import { Editable, Slate } from "slate-react";
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
              // Determine whether any of the currently selected blocks are code blocks.
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "code",
              });
              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                { type: match ? "paragraph" : "code" },
                {
                  match: (n) =>
                    Element.isElement(n) && Editor.isBlock(editor, n),
                }
              );

              break;
            }
            case "b": {
              event.preventDefault();
              Editor.addMark(editor, "bold", true);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
