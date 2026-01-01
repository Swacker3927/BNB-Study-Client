export default {
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  phone: (v) => {
    const val = v.replace(/[^\d]/g, "");
    let pattern = /^[\d]{3}-[\d]{4}-[\d]{4}$/;
    if (val[0] != "0") {
      pattern = /^[\d]{4}-[\d]{4}$/; //"####-####";
    } else if (val[1] == "2") {
      pattern = val.length < 10 ? /^[\d]{2}-[\d]{3}-[\d]{4}$/ : /^[\d]{2}-[\d]{4}-[\d]{4}$/;
    } else {
      if (val.startsWith("050")) {
        // 0504 이런거(안심번호) 0504-3333-3333
        pattern = /^[\d]{4}-[\d]{4}-[\d]{4}$/;
      } else {
        pattern = val.length < 11 ? /^[\d]{3}-[\d]{3}-[\d]{4}$/ : /^[\d]{3}-[\d]{4}-[\d]{4}$/;
      }
    }
    return pattern;
  },
  date: /^[\d]{4}-[\d]{2}-[\d]{2}$/,
}
