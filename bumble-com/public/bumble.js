/* 封装 CORS方法跨域 */
function ajax(method, url){
  return new Promise((resolve,reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response)
        }else{
          reject(request)
        }
      }
    }
    request.send()
  })
}

ajax("get", "http://localhost:8888/friends.json").then(response => {
  console.log("这是ajax");
  console.log(response);
})


// Promise封装 JSONP
function jsonp(url){
  return new Promise((resolve,reject) => {
    const random = Math.random()
    console.log(random);
    window[random] = (data) => {
      resolve(data)
    }

    const script = document.createElement("script")
    script.src =`${url}?callback=${random}`
    script.onload = () => {
      script.remove()
    }
    script.onerror = () => {
      reject()
    }
    document.body.appendChild(script)
  })
}
jsonp("http://localhost:8888/friends.js").then(data => {
  console.log("jsonp");
  console.log(data);
})


/* CORS方法跨域，使用ajax访问friends.json */
// const request = new XMLHttpRequest()
// request.open('GET', 'http://localhost:8888/friends.json')
// request.onreadystatechange = () => {
//   if (request.readyState === 4 && request.status === 200) {
//     console.log(request.response);
//   }
// }
// request.send()


/* JSONP方法跨域 */
// const random = Math.random()
// console.log(random);
// window[random] = (data) => {
//   console.log(data);
// }

// const script = document.createElement("script")
// script.src =`http://localhost:8888/friends.js?callback=${random}`
// document.body.appendChild(script)