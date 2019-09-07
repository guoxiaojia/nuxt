<template>
   <div class="login">
      <router-link class="logo" to="/index"><img src="@/static/img/icon.svg"  title="Go Web Iris中文网" align="logo"></router-link>
      <div class="box register">
          <div class="main">
            <h4>注册</h4>
            <div class="form">
                <div class="inline">
                    <el-input
                    placeholder="请输入用户名"
                    v-model="register.username"
                    clearable
                    @input="removeTip(register.username,'username')"
                    @blur="blurVerify(register.username,'username')"
                    @keyup.enter.native="regForm">
                    </el-input>
                    <span class="tips">{{tip.username}}</span>
                </div>
                <div class="inline">
                    <el-input
                    placeholder="请输入电子邮箱"
                    v-model="register.email"
                    clearable
                    class="input-with-select"
                    @input="removeTip(register.email,'email')"
                    @blur="blurVerify(register.email,'email')"
                    @keyup.enter.native="regForm">
                    <el-button slot="append" @click="sendCode($event)" :disabled="isDisable">发送</el-button>
                    </el-input>
                    <span class="tips">{{tip.email}}</span>
                </div>
                <div class="inline">
                    <el-input 
                    placeholder="邮箱验证码" 
                    v-model="register.emailCode"
                    @input="removeTip(register.emailCode,'emailCode')"
                    @blur="blurVerify(register.emailCode,'emailCode')"
                    @keyup.enter.native="regForm">
                    </el-input>
                    <span class="tips">{{tip.emailCode}}</span>
                </div>
                <div class="inline">
                    <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="register.pwd"
                    clearable
                    @input="removeTip(register.pwd,'pwd',register.rePwd)"
                    @blur="blurVerify(register.pwd,'pwd',register.rePwd)"
                    @keyup.enter.native="regForm">
                    </el-input>
                    <span class="tips">{{tip.pwd}}</span>
                </div>
                <div class="inline">
                    <el-input
                    type="password"
                    placeholder="请再次输入密码"
                    v-model="register.rePwd"
                    clearable
                    @input="removeTip(register.rePwd,'rePwd',register.pwd)"
                    @blur="blurVerify(register.rePwd,'rePwd',register.pwd)"
                    @keyup.enter.native="regForm">
                    </el-input>
                    <span class="tips">{{tip.rePwd}}</span>
                </div>
                <div class="inline">
                    <el-input 
                        placeholder="请输入验证码" 
                        v-model="register.captchaCode"
                        @input="removeTip(register.captchaCode,'captchaCode')"
                        @blur="blurVerify(register.captchaCode,'captchaCode')"
                        class="input-with-select" 
                        @keyup.enter.native="regForm">
                        <el-button 
                            slot="append" 
                            icon="" 
                            @click="getCaptcha"
                            class="no_padding">
                                <img 
                                    :src="captcha"
                                    height="35" 
                                    title="Go Web Iris中文网" 
                                    align="图形验证码">
                        </el-button>
                    </el-input>
                    <span class="tips">{{tip.captchaCode}}</span>
                </div>
                <div class="inline">
                    <el-button type="primary" @click="regForm">立即注册</el-button>
                </div>
                <div class="inline align-right">
                    <p>已有账号?<router-link class="register" to="/login">点击登录</router-link></p>
                </div>
                <div class="inline">
                    <h2>登录后</h2>
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
import { countDown } from '@/tool/tool.js';
import valid from '@/tool/validate.js'
import qs from 'qs'
export default{
    data() {
        return {
            register: {
                username: '',
                email: '',
                pwd: '',
                rePwd: '',
                emailCode: '',
                captchaCode: '',
            },
            tip:{
              username: '',
              email: '',
              pwd: '',
              rePwd: '',
              emailCode: '',
              captchaCode: '',
            },
            isDisable: false
        }
    },
    computed: {
      ...mapState({
        captcha: state => state.captcha,
        randStr: state => state.randStr,
      }),
    },
    methods: {
        ...mapActions({
            userReg: 'modules/user/userReg',
            sendEmailCode: 'sendEmailCode',  //this.$store.dispatch('config/sendEmailCode');
            getCaptcha: 'getCaptcha',  //this.$store.dispatch('config/getCaptcha');
        }),
        sendCode(e) { //发送验证码
          let tipEmail = valid.email(this.register.email)
          if(tipEmail){ //验证邮箱是否有效
            return this.$message({
              message: tipEmail,
              type: 'warning'
            });
          }
          this.sendEmailCode(this.register.email).then(res => {
            if (res.status === 1) {
              countDown(this,e)
              return this.$message({
                message: res.message,
                type: 'success'
              });
            }
            return this.$message.error(res.message);
          }).catch(error => {
            console.log(error.toString())
          })
        },
        blurVerify(value,type,opt = false) {
          if (type === 'email') {
            this.tip.email = valid.email(value)
          }else if (type === 'username') {
            this.tip.username = valid.username(value)
          } else if (type === 'pwd') {
            this.tip.pwd = valid.pwd(value,opt)
          }else if (type === 'rePwd') {
            this.tip.rePwd = valid.rePwd(value,opt)
          } else if (type === 'captchaCode') {
            this.tip.captchaCode = valid.verifyCode(value,type)
          } else if (type === 'emailCode') {
            this.tip.emailCode = valid.verifyCode(value,type)
          }
          return this.tip
        },
        removeTip(value,type,opt = false) {  //清楚错误提示
          return this.blurVerify(value,type,opt)
        },
        regForm() {
          const register = this.register
          for (let info in register) {
            if(register[info] === ''){
              return this.$message.error('请填写完整且格式正确的信息');
            }
          }
          const form = this.form
          for (let tip in form){
            if(form[tip]!==''){
              return this.$message.error(form[tip]);
            }
          }
          var data = qs.stringify({
            nick_name: register.username,
            email: register.email,
            password: register.pwd,
            confirmed: register.rePwd,
            verifyString: this.randStr,
            captcha: register.captchaCode,
            code: register.emailCode
          })
          let res = this.userReg(data)
          if(res.data.status !== 1){
            return this.$message.error(res.data.message);
          }
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          setTimeout(() =>{
            this.$router.push({path: '/login'})
          },1000)
          return true;
      },
    },
    mounted() {
      this.getCaptcha()
    },
    created() {
        // lg.checkoutLogin(this)
    }
}
</script>
