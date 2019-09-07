export function email(email) {
  if (!email) return '邮箱不能为空';
  let tip = '请输入正确的邮箱地址';
  const reg =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!reg.test(email)) return tip;
  return '';
}

export function pwd(pwd,rePwd = false) {
  if (!pwd) return '密码不能为空';
  let tip = '请输入6-18位的密码';
  const reg = /^[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{6,18}$/;
  if (!reg.test(pwd)) return tip;
  if (rePwd !== false && rePwd !=='' && pwd !== rePwd) return '密码不能为空';
  return '';
}

export function rePwd(pwd,rePwd) {
  if (!rePwd) {
    return '密码确认不能为空';
  }else if (pwd && pwd !== rePwd) {
    return '两次输入密码不一致';
  }
  return '';
}

export function verifyCode (code,type) { //验证码
  let tip = {
    captchaCode: '图形',
    emailCode : '邮箱',
  };
  if (!code) return tip[type]+'验证码不能为空';
  if (code.length !== 6) return tip[type]+'验证码长度为6';
  return '';
}

export function username(username) {
  if (!username) return '用户名不能为空';
  return '';
}

export default {
    email,
    pwd,
    rePwd,
    verifyCode,
    username,
}
