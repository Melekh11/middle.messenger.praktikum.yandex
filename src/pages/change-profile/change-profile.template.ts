export const template = 'div\n' +
    '    != btnBack\n' +
    '    div(class="container")\n' +
    '        form(class="max-height-form-data")\n' +
    '            != inputFirstName\n' +
    '            != inputSecondName\n' +
    '            != inputLogin\n' +
    '            != inputEmail\n' +
    '            != inputPhone\n' +
    '            div(class="column-group")\n' +
    '                != sbmButtonData\n' +
    '        form(class="max-height-form-ava")\n' +
    '            img(src=urlAva alt="аватар")\n' +
    '            input(type="file" name="avatar" id="ava" accept=".png, .jpg, .jpeg")\n' +
    '            div(class="column-group")\n' +
    '                != sbmButtonImage'
