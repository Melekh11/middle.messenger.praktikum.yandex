export const template =
  'div(class="modal")\n' +
  '    div(class="modal-content")\n' +
  '        p(class="modal-text") создайте новый чат!\n' +
  '        input(class="modal-input" id="title-chat" placeholder="тайтл чата")\n' +
  '        input(class="modal-input" id="login-to-invite" placeholder="логин участника чата")\n' +
  '        label(class="modal-label" for="ava-chat") аватар чата\n' +
  '        input(id="ava-chat" type="file")\n' +
  "        != btnCreateChat";
