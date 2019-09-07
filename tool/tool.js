export function countDown($this,dom){
  let count = 60;
  $this.isDisable= true;
  let time = setInterval(() => {
    if(count <= 1) {
      $this.isDisable = false;
      clearInterval(time);
      dom.target.innerText = '发送'
      return;
    }
    count--;
    dom.target.innerText = count + 's'
  },1000)
}
