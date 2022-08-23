export const template = 'div\n' +
    '    != buttonBack\n' +
    '    div(class="inside-error")\n' +
    '        p(class="line-error-oops") упс\n' +
    '        h1(class="line-error-number")  #{errorName}\n' +
    '        p(class="line-error-sorry") мы уже работаем над этим!\n' +
    '        a(class="line-error-back" href="/") назад к чатам'
