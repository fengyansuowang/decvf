'use strict'
// ES Moudule 模块引入方式
import Header from './Header.js';
import Sidebar from './Siderbar';
import Content from './Content.js';
import Es6Test from './es6Text'; //已经引进来了
import ReactTest from './reactTest';
import '../css/main.css';
import '../css/header.scss';
import createAvatar from './createAvatar';
import {add} from './MathFold/math';

createAvatar();
new Header();
new Sidebar();
new Content();

var dom = document.getElementById('root');
var doc = document.createElement('div');
doc.className = 'iconfont icon-channgchenshan_-01';
dom.append(doc);

let divB = document.createElement('div');
divB.className = 'button';
divB.innerHTML = "点我啊";
divB.onclick = function(){
  let p = document.createElement('p');
  p.innerHTML = "我是憨憨";
  dom.append(p)
}
dom.append(divB);

console.log(process.env.NODE_ENV);//当设置了mode参数,webpack会默认形成全局变量process.env.NODE_ENV

add(1,2);