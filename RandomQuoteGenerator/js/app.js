let twitterQuote; //create globally so twitter can use it
function changeQuote(){
    let quoteList = [
        "What we think, we become.",
        "And still I rise.",
        "Change the world by being yourself",
        "Aspire to inspire before we expire.",
        "There are times like that music can convey more than words."
    ];
    
    let num = Math.floor(Math.random() * 5); //pick a number 0-5 which represents the index of quoteList
    let quote = document.querySelector("#quote"); //grab our h2
    updateUi(quote,quoteList[num]); //update the h2 with the new quote
		twitterQuote = quoteList[num]; //update global var
}

function updateUi(element, stringQuote){
    element.classList.remove("visible");
    element.classList.toggle("hide"); //set the state to hide @ start
    //hide quote

    setTimeout(()=>{
        element.textContent = stringQuote;
    }, 300);
    // change quote

    setTimeout(()=>{
        element.classList.add("visible");
        element.classList.toggle("hide"); //turns off hide
    }, 500);
    //show the quote 
}

document.querySelector("#newQuote").addEventListener('click',changeQuote);

//open a new window so the user can tweet the current quote

$('#tweet').on('click',function(){
	//open a window that will display something
	window.open(`https://twitter.com/intent/tweet?text=${twitterQuote}`);
});
