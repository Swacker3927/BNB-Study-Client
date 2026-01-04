export default (data) => {
  const formData = new FormData();
  for (const key in data) { // 객체 반복문 이고
    const value = data[key];
    if (value instanceof File) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, value);
    }
  }
  return formData;
}
