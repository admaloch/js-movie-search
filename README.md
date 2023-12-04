# JS-movie-search

<b>About this project:</b><br/> 
This is a movie search app built with vanilla JS that allows you to search for movies, tv shows or both. The movie data is from OMDB API. The intent of this project was to get some practice with asynchronous Javascript and working with APIs.

<b>Technologies used:</b><br/> 
--JavaScript<br/>
--OMDB API: https://www.omdbapi.com/<br/>

<b>Takeaways:</b><br/> 
The biggest takeaway of this project was learning about working with async javascript. This was particularly tricky as I ended up getting stuck trying to access data that didn't exist yet. Dealing with some of these issues helped me develop a better understanding for how async functions work and how to use them without getting lost. In addition, I was able to strengthen my understanding of async concepts like working with promises, the call stack and understanding what the browser does behind the scenese to handle asynchronous operations.

<b>Current status:</b><br/> 
The project is currently finished, but was rebuilt with react. Check that out here https://github.com/admaloch/react-movie-search

<b>Note:</b><br/> 
This app has a search input that runs api calls on key press, but OMDB prevents that if the request returns too many results so it only works with 3 letters or more. 
