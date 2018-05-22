let query = document.getElementById('toSearch');
query.addEventListener("keypress", (e)=>{
	e.which === 13 ? callAPI(query.value) : null;
});

function callAPI(query){
	let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&callback=?`;
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		dataType: 'json',
		success: function(data){
			updateUI(data[1][0],data[2][0],data[3][0]); //title, content, and link to page.
		},
		error: function(errorMessage){
			alert('error, something went wrong!');
		}
	});	
}

function updateUI(title,content,link){
	//first, reset the UI on a new search
	let main = document.getElementById('contentLocation');
	main.innerHTML = "";
	
	$('.contentContainer').css('top','20%');
	
	let div = document.createElement('div');
	let h3 = document.createElement('h3');
	let para = document.createElement('p');
	let paralink = document.createElement('p');
	
	h3.textContent = title;
	para.textContent = content;
	paralink.innerHTML = `<a href="${link}">Learn more here</a>`;
	
	div.classList.add('contentArticle');
	div.appendChild(h3);
	div.appendChild(para);
	div.appendChild(paralink);
	
	
	
	
	main.appendChild(div);
}
