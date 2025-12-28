export default (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      resolve(target.result)
    }
    reader.readAsDataURL(file)
  })
}
