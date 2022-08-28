export const template =
  "if dialogChosen === true\n" +
  '    div(class="chat")\n' +
  "        div\n" +
  '            header(class="header-chat-field")\n' +
  '                h1(class="name-chat") #{userName}\n' +
  '                button(class="index-menu-btn" type="button")\n' +
  "            hr\n" +
  '        div(class="body-chat")\n' +
  "            for message in messageFlow\n" +
  "                if message.user_id === userId\n" +
  '                    p(class="send-message") #{message.content}\n' +
  "                else\n" +
  '                    p(class="get-message") #{message.content}\n' +
  "        div\n" +
  "            hr\n" +
  '            footer(class="footer-chat-field")\n' +
  '                button(class="index-attach-btn" type="button")\n' +
  "                != inputMessage\n" +
  "                != btnSendMessage\n" +
  "else\n" +
  '    p(class="start-talk") выберите чат и начните переписку!\n' +
  '    div(class="chat" style="display: none")\n' +
  '        div(class="body-chat")\n' +
  "            != inputMessage\n" +
  "            != btnSendMessage";
