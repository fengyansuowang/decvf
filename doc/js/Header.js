  
function Content() {
	var dom = document.getElementById('root');
	var content = document.createElement('div');
	content.className = 'header';
	content.innerText = '头部内容';
	dom.append(content);

	[1,2,3,5,44].map(item =>{
		console.log(item);
	})
}

export default Content;