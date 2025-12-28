
/*
200
{
 success: Boolean, // 거짓이라면
 data : Value // 에러 메세지
}
*/

import { Notify, Loading } from "quasar";

const res = (name) => {
  return function (response) {
    let { data, status, config } = response;
    if (!data) {
      data = {
        success: true,
        data: response
      }
    }

    if (process.env.NODE_ENV == 'development') {
      console.log("API", name, config.method, config.url, status);
      if (typeof (window) == 'object') {
        console.log(data)
      }
    }

    if (status && status != 200) {
      console.log(name, 'API Error Status :', status);
      console.error(config.url)
      try {
        Notify.create({
          type: 'negative',
          message: `${name} : ${status} : ${config.url}`
        })
        Loading.hide();
      } catch (e) { }

      return false;
    }

    if (data) {
      if (data.success == false) {
        try {
          Notify.create({
            type: 'negative',
            message: data.data
          })
          Loading.hide();
        } catch (e) {
          console.warn(e.message)
        }
        return false;
      } else {
        return data.data
      }
    } else {
      console.log(`${name} : NO DATA : ${config.url}`);
      return false;
    }
  }
}

export default { res };
