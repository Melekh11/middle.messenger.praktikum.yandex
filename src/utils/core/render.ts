export function render(query: string, block: any) {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }
  clearPage(root);
  if (root) {
    root.appendChild(block.element);
  }
  return root;
}

function clearPage(element: Element) {
  if (element.firstChild) {
    element!.removeChild(element!.firstChild);
    clearPage(element);
  } else {
    return;
  }
}
