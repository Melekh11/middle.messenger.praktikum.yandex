export default function isValidEmail(val: string) {
  if (val === "") {
    return { error: true, errorText: "поле не должно быть пустым" };
  } else if (/[а-яА-Я]/.test(val)) {
    return { error: true, errorText: "только латиница" };
  } else if (!/\w+@\w+\.\w+/.test(val)) {
    return { error: true, errorText: "плохая почта :/" };
  } else {
    return { error: false, errorText: "" };
  }
}
