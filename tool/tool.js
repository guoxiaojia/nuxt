
//获取图形验证码
export function getCaptcha(code) {
    const url = '/api/captcha'
    console.log(code)
    const data = {
        verifyString: code
    }
    return ''
    // return axios.$get(url,{params:data})
}