import type { MetaFunction } from "@remix-run/node";
import { Editable, Slate } from "slate-react";
import { useSlateEditor } from "~/components/slateEditor";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const editor = useSlateEditor();
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable readOnly={true} />
    </Slate>
  );
}