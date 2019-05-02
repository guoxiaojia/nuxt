<template>
  <div class="welcome">
    <div class="wel-content">
      <!-- <h1>欢迎使用 GO WEB IRIS</h1> -->
      <img src="@/static/img/icon.svg"  title="Go Web Iris中文网" align="logo">
      <!-- <h4>开始学习旅程</h4> -->
      <div class="btn-group">
        <router-link to="/index">开始学习</router-link>
        <router-link to="/new">最新动态</router-link>
        <li><a target="_blank" href="/doc/index.html">文档手册</a></li>
        <router-link to="/index">社区</router-link>
      </div>
      <el-row type="flex" class="trait clearfix" justify="space-between">
        <el-col :span="6" v-for="(item,i) in siteIntro" :key="i">
          <div class="intro">
            <h5>{{ item.intitle }}</h5>
            <p>{{ item.intcont }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/footer/index'
// import {mapActions,mapState,mapMutations } from 'vuex'
export default {
  name: 'welcome',
  data () {
    // console.log(this.$store);
    return {
      siteIntro: [],
    };
  },
  components: {
    Foot
  },
}
</script>

<style src="@/assets/css/welcome.scss" lang="scss"></style>
<style scoped>
h1, h2 {
  font-weight: normal;
}
.welcome .wel-content .btn-group {
  width: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.welcome .wel-content .btn-group a {
  margin: 15px 17px;
  width: 140px;
  font-size: 1.2rem;
}
a {
  color: #42b983;
}
</style>
