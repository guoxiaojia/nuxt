export const mdConf=  {
    codeStyle: 'github-gist',    //代码高方案
    placeholder: '说点什么吧？',  //提示信息
    defaultOpen: 'edit',  //edit： 默认展示编辑区域 ， preview： 默认展示预览区域 , 其他 = edit
    fontSize: 'fontSize',  //编辑区域文字大小
    tabSize: '\t',   //tab转化为几个空格，默认为\t
    editable: true,   //是否允许编辑
    toolbarsFlag: true,  //工具栏是否显示
    navigation: true,  //默认展示目录
    shortCut: true,  //是否启用快捷键
    autofocus: true,  //自动聚焦到文本框
    ishljs: true,  //代码高亮
    scrollStyle: true,   //开启滚动条样式(暂时仅支持chrome)
    boxShadow: true,    //开启边框阴影
    subfield: true,  //	true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
    markdownOption: {
      bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      /* 1.3.5 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件）
      /* 1.4.2 */
      navigation: true, // 导航目录
      /* 2.1.8 */
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true, // 预览
    },
    imageFilter: null,  //图片过滤函数，参数为一个File Object，要求返回一个Boolean, true表示文件合法，false表示文件不合法
    imageClick: null, //图片点击事件，默认为预览，可覆盖
}

export const url = {
  captcha: '/api/captcha',
  userLogin: '/api/login',
  userReg: '/api/reg',
  sendEmailCode: '/api/send/email/code',
}
