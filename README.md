# fetch-APIs (Appliction Programming Interface)
The Fetch API provides an interface for receiving/sending resources.
It uses Request and Response objects. (request and response)
The fetch() method is used to fetch a resource (data).
API are endpoint / url / 
During fetching api page did not reload, data comes during run time.
json() method: returns a second promise and its async method.

let promise = fetch(url, [options]);


#projects
1. Currency Exchanger
2. News website

# notes
in notes folder there are some images for reference

# Quick Review 
https://jsonplaceholder.typicode.com/guide/
fetch api mdn

<!-- -------------------------------------------------------------------- -->

# Important functions / Syntax

# simple syntax

// text() function
fetcht("content/readme.txt")
.then((response) => response.text())
.then((data) => document.write(data));

// json() function


# use of async await

const URL = "";
const getFacts = asyn () => {
	let response = await fetch(URL)
	let data = await response.json()
	factPara.innerText = data[0].text;
} 


# Check browser support fetch method or not
fetch() method was introuduce in ES6 in 2015, those browser who are not updated after ES6 was not supprot fetch() method

if(window.fetch){
	// fetch() code here
} else{
      
      // XMLHttpsResquirst code here

}


# tools and resources 
1. courrency converter 
	For Flags: https://flagsapi.com/
	https://github.com/fawazahmed0/exchange-api
