export function isValidLogin(val: string) {
  console.log("isValidLogin");
  if (val === "") {
    return { error: true, errorText: "поле не должно быть пустым" };
  } else if (val.length < 3 || val.length > 20) {
    return { error: true, errorText: "от 3 до 20 символов" };
  } else if (/[^a-zA-Z0-9\-\_]/.test(val)) {
    return {
      error: true,
      errorText: "только латиница, цифры, дефис и нижн подчёркивание",
    };
  } else if (!/[a-zA-Z\-\_]/.test(val)) {
    return { error: true, errorText: "обязательно должны быть буквы" };
  } else {
    return { error: false, errorText: "" };
  }
}
