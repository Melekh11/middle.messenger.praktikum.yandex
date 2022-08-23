export const template = 'div\n' +
    '    != btnBack\n' +
    '    div(class="inner-profile")\n' +
    '        div(class="center")\n' +
    '            div(class="profile-value")\n' +
    '                p(class="header-to-value") логин\n' +
    '                p(class="value") #{login}\n' +
    '            div(class="profile-value")\n' +
    '                p(class="header-to-value") короткое имя\n' +
    '                p(class="value") #{shortName}\n' +
    '            div(class="profile-value")\n' +
    '                p(class="header-to-value") полное имя\n' +
    '                p(class="value") #{fullName}\n' +
    '            div(class="profile-value")\n' +
    '                p(class="header-to-value") почта\n' +
    '                p(class="value") #{email}\n' +
    '            div(class="profile-value")\n' +
    '                p(class="header-to-value") телефон\n' +
    '                p(class="value") #{phone}\n' +
    '        div(class="center")\n' +
    '            img(src=urlIm alt="аватар")\n' +
    '            div(class="margin")\n' +
    '                p #{shortName}, #{fullName}\n' +
    '                p #{login}\n' +
    '            != changeProfile\n' +
    '            != changePassword\n' +
    '            != out'
