import iMG from '../image.jpg';
import '../css/index.less';

function Content() {
	var dom = document.getElementById('root');
	var content = document.createElement('div');
	content.className = 'side';
	content.innerText = '底部内容';
	dom.append(content);

	var img = document.createElement('img');
	img.src = iMG;
	dom.append(img);
}

export default Content;