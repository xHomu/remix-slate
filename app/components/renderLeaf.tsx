import { useCallback } from "react";

export function useRenderLeaf() {
  return useCallback((props) => <Leaf {...props} />, []);
}

function Leaf(props) {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
}
