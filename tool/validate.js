export function email(value) {
    let tip = '请输入正确的邮箱地址';
    const reg =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(value)) return tip;
    return '';
}

export function pwd(value) {
    let tip = '请输入6-18位的密码';
    const reg = /^[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{6,18}$/;
    if (!reg.test(value)) return tip;
    return '';
}


export default {
    email,
    pwd,
}