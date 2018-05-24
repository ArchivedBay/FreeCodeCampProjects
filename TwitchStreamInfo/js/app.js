/* 
 instead of kraken use this:
 https://wind-bow.glitch.me/twitch-api/channels/'username'
 use 'channels' json as it contains the most info
 
*/
let users = [ // store our users in an array for ease later.
	"xekedeath",
	"relaxbeats",
	"animeshon_music",
	"lilypichu",
	"takarita",
	"kate"
];

/*
	create a document fragment for performance. 
	Instead of creating elements and appending them to the DOM directly for every user,
	what this does is create one document fragment that gets stored in memory, append all the items to that, and then append the fragment to the DOM in the end.
	This reduces the number of reflows made to 1, which is VERY useful if you are dealing with a data structure. 
	Is it needed here? Probably not, but I wanted to test the concept. 
	note I also did not use jQuery for a majority of this project as it is slower.
*/

let f = document.createDocumentFragment();

function callAPI(user, location){ //instead of making multiple of the same ajax call, just make a function.
	$.getJSON(`https://wind-bow.glitch.me/twitch-api/channels/${user}`, function(data){
		document.querySelectorAll('.logo')[location].innerHTML = `<img src="${data.logo}" />`;
		document.querySelectorAll('.url')[location].innerHTML = `<a href="${data.url}">${data.url}</a>`;
		document.querySelectorAll('.nowPlaying')[location].innerHTML = `<h3>Now playing:</h3> ${data.game}`;	
	});
}

function updateUI(){
	let streamer = document.createElement('div');
	let logo = document.createElement('div');
	let right = document.createElement('div');
	let url = document.createElement('div')
	let nowPlaying = document.createElement('div')
	
	streamer.classList.add('streamer');
	logo.classList.add('logo');
	right.classList.add('right');
	url.classList.add('url');
	nowPlaying.classList.add('nowPlaying');
	
	right.appendChild(url);
	right.appendChild(nowPlaying);
	streamer.appendChild(logo);
	streamer.appendChild(right);
	
	f.appendChild(streamer);
}

users.forEach(updateUI); //create a new streamer block for each user and add it to the doc fragment
document.getElementById('loc').appendChild(f); //then append the fragment to the content div
users.forEach((undefined,i)=>{ 
	callAPI(users[i], i); //now populate each streamer div with the relevant data for that user
})





