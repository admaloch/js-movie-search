Basic movie search app created using Api data to generate results for tv/movie searches. This is a work in progress and currently has a number of issues that are being worked out.

Issues:

The requests are split into two primary separate sections in the JS code– the first one generates requests as you type and displays a hover menu with some results. If you click a specific result it grabs the movie id and uses that to generate another request for that specific movie with more details in a popup modal.  This all appears to work fine..

The second section is basically the same but submits the request only when you submit the input form and then it generates a slider with the results. This is where I ran into problems. When you hover over each result it should show some basic info for that movie(but that only works about half the time.. If it doesn’t work refresh and try again until it works) Hovering over these results also give you the option to see more details which should generate a request with the id and open a popup modal. 

This is where the primary issue came about– The function loadSliderDetails- line 294- should run in displaySliderItems line 279- but it doesn’t work.  I tried running it in the 1st half of the code in the displayMovieList function at line 151, and it kind of works when it's there but is buggy.

Other than that– the actual code for the results slider isn’t finished so it runs endlessly..
