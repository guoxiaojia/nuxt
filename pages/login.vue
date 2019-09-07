<template>
  <div class="login">
      <router-link class="logo" to="/index">
        <img src="@/static/img/icon.svg"  title="Go Web Iris中文网" align="logo">
      </router-link>
      <div class="box">
          <div class="main">
            <div class="login">登录</div>
            <div class="form">
                <div class="inline">
                    <el-input
                    placeholder="请输入电子邮箱"
                    v-model="login.email"
                    clearable 
                    @input="removeTip(login.email,'email')"
                    @blur="blurVerify(login.email,'email')"
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
                    @input="removeTip(login.pwd,'pwd')"
                    @blur="blurVerify(login.pwd,'pwd')"
                    @keyup.enter.native="loginSub">
                    </el-input>
                    <span class="tips">{{ tip.pwd }}</span>
                </div>
                <div class="inline">
                    <el-input 
                    placeholder="请输入验证码" 
                    v-model="login.captchaCode"
                    class="input-with-select" 
                    @input="removeTip(login.captchaCode,'captchaCode')"
                    @blur="blurVerify(login.captchaCode,'captchaCode')"
                    @keyup.enter.native="loginSub">
                        <el-button 
                        slot="append" 
                        @click="getCaptcha" 
                        class="no_padding" 
                        icon="">
                            <img :src="captcha" height="35" title="Go Web Iris中文网" align="图形验证码">
                        </el-button>
                    </el-input>
                    <span class="tips">{{ tip.captchaCode }}</span>
                </div>
                <div class="inline inline-flex">
                    <el-button type="primary" @click="loginSub">立即登录</el-button>
                    <div class="other-login">
                        <span class="login-style" title="Github 登陆" @click="githubStyle">
                            <img src="@/static/img/social-github.png" alt="">
                        </span>
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
import { mapActions,mapState,mapMutations } from 'vuex'
import valid from '@/tool/validate.js'
export default{
    data() {
        return {
            login: {
                email:'',
                pwd:'',
                captchaCode:'',
            },
            tip: {
                email: '',
                pwd: '',
                captchaCode: '',
            },
            error:0,
            loading: false
        };
    },
    computed: {
      ...mapState({
          captcha: state => state.captcha,
          randStr: state => state.randStr,
        }),
    },
    methods: {
       ...mapActions({
            userLogin: 'modules/user/userLogin',
            getCaptcha: 'getCaptcha',  //  === this.$store.dispatch('config/getCaptcha');
        }),
        //验证数据格式是否正确
        blurVerify(value,type) {
            if (type === 'email') {
                this.tip.email = valid.email(value)
            }else if (type === 'pwd') {
                this.tip.pwd = valid.pwd(value)
            }else if (type === 'captchaCode') {
                this.tip.captchaCode = valid.verifyCode(value,type)
            }
            return this.tip
        },
        loginSub() {
            //提交时检查必填数据是否为空
            for(let i in this.login){
                if(!this.login[i]) return this.$message.error('请填写完整且格式正确的信息1');
            }
            //提交时检查必填数据是否存在错误
            for (let i in this.tip){
                if(this.tip[i] !== '') return this.$message.error('请填写完整且格式正确的信息2');
            }
            //登陆操作
            let loginMsg = {
                    email: this.login.email,
                    password: this.login.pwd,
                    captcha: this.login.captchaCode,
                    verifyString: this.randStr
            }
            this.userLogin(loginMsg).then(res => {
              if(res.data.status === 1){
                localStorage.setItem('user',JSON.stringify(res.data.result));
                this.$notify({
                  title: '登陆成功',
                  message: res.data.message,
                  type: 'success'
                });
                const redirect = this.$route.query.redirect
                if(redirect === undefined){
                  return this.$router.push({path: '/index'})
                }
                return this.$router.push({path: redirect})
              }
              this.$notify.error({
                title: '错误',
                message: res.data.message
              })
              this.login.code = ''
              return this.getCaptcha()
            }).catch(error => {
              return this.$notify.error({
                title: '服务器错误',
                message: error.toString()
              })
            })
        },
        removeTip(value,type) {  //清楚错误提示
          return this.blurVerify(value,type)
        },
        githubStyle() {
            this.loading = true
            loginGithub().then(res => {
                if(res.data.status === 301) {
                    this.loading= false
                    window.location.href=res.data.result.url
                }else if(res.data.status === 1) {
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
    }
}
</script>
