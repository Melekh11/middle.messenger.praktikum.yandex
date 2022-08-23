export const template = 'div.main_page\n' +
    '    != modalAddChat\n' +
    '    div(class="user-nav")\n' +
    '        div(class="user-bar")\n' +
    '            != linkProfile\n' +
    '            //a(class="tools") Настройки пользователя\n' +
    '            div.flex\n' +
    '                input(class="search_contact" placeholder="поиск чата🔍")\n' +
    '                != btnAddChat\n' +
    '        for chat in chatList\n' +
    '            != chat\n' +
    '    != dialogField'
