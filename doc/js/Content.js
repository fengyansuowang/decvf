import style from '../css/index.less';

function Content() {
	var dom = document.getElementById('root');
	var content = document.createElement('div');
	content.classList.add(style.content);
	content.innerText = '文章内容';
	dom.append(content);
}

export default Content;