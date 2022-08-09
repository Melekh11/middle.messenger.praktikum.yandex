export default function isValidPhone(val: string) {
  if (val === "") {
    return { error: true, errorText: "поле не должно быть пустое" };
  } else if (val.length > 15 || val.length < 10) {
    return {
      error: true,
      errorText: "длинна должна быть от 10 до 15 символом",
    };
  } else if (/[a-zA-Zа-яА-Я]/.test(val)) {
    return { error: true, errorText: "недопустимые значения" };
  } else if (/\+[\d]{1}|[\d]{1}\([\d]{3}\)[\d]{3}-[\d]{2}-[\d]{2}/.test(val)) {
    return { error: false, errorText: "" };
  }
  return { error: true, errorText: "неправильный номер" };
}
