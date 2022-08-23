export const template = 'label(for=idInput class="input-label") #{textLabel}\n' +
    '    if isDisabled === true\n' +
    '        input(class=inputClass type=inputType name=inputName placeholder=inputPlaceholder id=idInput value=inputValue disabled)\n' +
    '    else\n' +
    '        input(class=inputClass type=inputType name=inputName placeholder=inputPlaceholder id=idInput value=inputValue)\n' +
    '    p(class="input-error" style="display: none" id=idInput) #{errorText}'
