export const template =
  'div(class="user-card" id=idCard)\n' +
  '    img(class="card-ava" src=urlIm alt="аватар")\n' +
  '    div(class="inner-card-text")\n' +
  '        a(class="to-user") #{title}\n' +
  '        label(class="last-word") #{lastMessage}';
