import webpackSrc from '../image.jpg';
import style from '../css/index.less';

function createAvatar () {
  console.log(style)
  var img = new Image();
  img.src = webpackSrc;
  img.classList.add(style.avatar); // 添加类名

  var dom = document.getElementById('root');
  console.log(dom);
  dom.append(img);
  dom.append('哈哈');

}

export default createAvatar;