import Block from "./Block";

export default function render(query: string, block: Block) {
  const root = document.querySelector(query);
  clearPage(root);
  if (root) {
    root.appendChild(block.element);
  }
  return root;
}

function clearPage(element: Element | null) {
  // @ts-ignore
  if (element.firstChild) {
    element!.removeChild(element!.firstChild);
    clearPage(element);
  } else {
    return;
  }
}
