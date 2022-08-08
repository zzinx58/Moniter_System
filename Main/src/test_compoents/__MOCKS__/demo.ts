export const fetchData = () => {
  return new Promise((resolve) => {
    resolve("(function(){return '123'})()")
  })
}
export const axiosData = () => {
  return new Promise((resolve) => {
    resolve({
      code: 200,
      data: {
        item: {
          "msg": "lalala"
        }
      },
      msg: "success"
    })
  }
  )
}
export const axios404 = () => {
  return new Promise((_, reject) => {
    reject({
      code: 404,
      msg: "error"
    })
  }
  )
}
