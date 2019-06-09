<template>
  <div class="login">
      <router-link class="logo" to="/index"><img src="@/static/img/icon.svg"  title="Go Web Iris中文网" align="logo"></router-link>
      <div class="box">
          <div class="main">
            <div class="login">登录</div>
            <div class="form">
                <div class="inline">
                    <el-input
                    placeholder="请输入电子邮箱"
                    v-model="login.email"
                    clearable 
                    @input="loginRemove(login.email,'email')"
                    @blur="blurLogin(login.email,'email')"
                    @keyup.enter.native="loginSub">
                    </el-input>
                    <span class="tips">{{ tip.email }}</span>
                </div>
                <div class="inline">
                    <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="login.pwd"
                    clearable 
                    @input="loginRemove(login.pwd,'pwd')"
                    @blur="blurLogin(login.pwd,'pwd')"
                    @keyup.enter.native="loginSub">
                    </el-input>
                    <span class="tips">{{ tip.pwd }}</span>
                </div>
                <div class="inline">
                    <el-input 
                    placeholder="请输入验证码" 
                    v-model="login.code" 
                    class="input-with-select" 
                    @input="loginRemove(login.code,'code')"
                    @blur="blurLogin(login.code,'code')"
                    @keyup.enter.native="loginSub">
                        <el-button 
                        slot="append" 
                        @click="getCaptcha" 
                        class="no_padding" 
                        icon="">
                            <img :src="captcha" height="35" title="Go Web Iris中文网" align="图形验证码">
                        </el-button>
                    </el-input>
                    <span class="tips">{{ tip.captcha }}</span>
                </div>
                <div class="inline inline-flex">
                    <el-button type="primary" @click="loginSub">立即登录</el-button>
                    <div class="other-login">
                        <span class="login-style" title="Github 登陆" @click="githubStyle"><img src="@/static/img/social-github.png" alt=""></span>
                    </div>
                </div>
                <div class="inline align-right">
                    <p>
                        <router-link to="/forget" >忘记密码</router-link>
                    </p>
                    <p>还没有账号?立即<router-link class="register" to="/reg">注册</router-link></p>
                </div>
                <div class="inline">
                    <div class="loginBefore">登录后</div>
                    <ul>
                        <li>1.分享您的教程，扩展，源码</li>
                        <li>2.参与问题和帖子的讨论，回复和评分</li>
                        <li>3.收藏具有价值的教程和帖子</li>
                        <li>4.发布招聘信息、找工作</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<style src="@/assets/css/login.scss" lang="scss"></style>
<script>
import valid from '@/tool/validate.js'
// import qs from 'qs';
// import { Login, Captcha, loginGithub } from 'utils/api'
export default{
    data() {
        return{
            login: {
                email:'',
                pwd:'',
                code:'',
            },
            tip: {
                email: '',
                pwd: '',
                captcha: '',
            },
            captcha: '',
            codeV:'',
            error:0,
            loading: false
        }
    },
    // inject: ['reload'],
    methods: {
        blurLogin(vaule,type) {
            if (type == 'email') {
                this.tip.email = valid.email(vaule)
            }else if (type == 'pwd') {
                this.tip.pwd = valid.pwd(vaule)
            }else if (type == 'code') {
                this.tip.captcha = ''
                if ( vaule.length != 6) this.tip.captcha = '验证码只能是六位'
            }
        },
        loginSub() {
            for(let i in this.login){
                if(!this.login[i]){
                    this.$message.error('请填写完整且格式正确的信息');
                    return
                }
                if(this.tip[i] != ''){
                    this.$message.error('请填写完整且格式正确的信息');
                    return;
                }

            }
            // let data = {
            //     email: this.login.email,
            //     password: this.login.pwd,
            //     captcha: this.login.code,
            //     verifyString: this.login.codeV,
            // }
            // Login(data).then(res =>{
            //     if(res.data.status == 1){
            //         localStorage.setItem('user',JSON.stringify(res.data.result));
            //         this.$notify({
            //             title: '登陆成功',
            //             message: res.data.message,
            //             type: 'success'
            //         });
            //         if(localStorage.getItem('user')){
            //             const redirect = this.$route.query.redirect
            //             if(redirect === undefined) {
            //                 this.$router.push({path: '/index'})
            //             }else{
            //                 this.$router.push({path: redirect})
            //             }
            //         }
            //         // window.location.href="/index"
            //     }else{
            //         this.$notify.error({
            //             title: '错误',
            //             message: res.data.message
            //         })
            //         this.login.code = ''
            //         this.getCaptcha()
            //     }
            // })
        },
        getCaptcha() {
            // var data = lg.getCaptcha();
            // this.login.codeV = data;
            // Captcha(data).then((res) => {
            //     this.codeImg = 'data:image/png;base64,'+res.data.result;
            // })
        },
        loginRemove(value,type) {
            if (type == 'email' && valid.email(value) == '') {
                this.tip.email = ''
            }else if (type == 'pwd' && valid.pwd(value) == '') {
                this.tip.pwd = ''
            }else if (type == 'code' && value.length == 6) {
                this.tip.captcha = ''
            }
        },
        githubStyle() {
            this.loading = true
            loginGithub().then(res => {
                if(res.data.status == 301) {
                    this.loading= false
                    window.location.href=res.data.result.url
                }else if(res.data.status == 1) {
                    window.location.href=""
                }
            })
        },
        hasProfile(data) {
            let profile = decodeURIComponent(data.substr(1)).replace('profile=','');    
            profile=JSON.parse(profile)
            localStorage.setItem('user',JSON.stringify(profile.result));
            this.$notify({
                title: '登陆成功',
                message: profile.message,
                type: 'success'
            });
            if(localStorage.getItem('user')){
                this.$router.push({path: '/index'})
            }
        }
    },
    mounted() {
        this.getCaptcha()
    },
    created() {
        // lg.checkTologin(this)
        // const url = location.search   
        // if(url.indexOf('profile') > -1) {
        //     this.hasProfile(url)
        // }
    }
}
</script>
