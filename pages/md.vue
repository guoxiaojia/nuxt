<template>
  <div class="mavonEditor" >
    <no-ssr>
      <mavon-editor
       :codeStyle = "codeStyle"
       :fontSize = "fontSize"
       :toolbars="markdownOption" 
       :placeholder = "placeholder"
       :v-model="handBook"/>
    </no-ssr>
    <button v-on:click="greet">Greet</button>
  </div>
</template>
<script>
import { mapActions,mapState,mapMutations } from 'vuex'
import * as config from "@/api/config"
  export default {
    data() {
      console.log(this.$store.state.login);
      //拿到MarkdownIt对象
      return {
        handBook: this.$store.state.login,
      };
    },
    computed: {
      ...mapState('modules/config',{
          markdownOption: state => state.mdConf.markdownOption,
          placeholder: state => state.mdConf.placeholder,
          subfield: state => state.mdConf.subfield,
          codeStyle: state => state.mdConf.codeStyle,
          fontSize: state => state.mdConf.fontSize,
        }),
    },
    methods: {
      greet: function (event){
        //使用 mapActions mapMutations 映射方法
        // this.setMdConfA();
        // this.setMdConfM();
        // 直接触发不需要 mapActions 触发 
        // let a = this.$store.dispatch('modules/config/setMdConf');
        //直接触发不需要  mapMutations 触发
        // let a = this.$store.commit('modules/config/setMdConf',config.mdConf);
        this.$store.dispatch('modules/config/setMdConf',config.mdConf);
      },
      ...mapActions({
        setMdConfA: 'modules/config/setMdConf',  //  === this.$store.dispatch('config/setMdConf');
      }),
      ...mapMutations({
        setMdConfM: 'modules/config/setMdConf'  //  == this.$store.commit('config/setMdConf',config.mdConf);
     }), 
   }
  }
</script>

<style scoped>
  .mavonEditor {
    width: 100%;
    height: 100%;
  }
</style>