# ironsheep-web
IRON SHEEP helps pastors to find the best route, the route with the best meadows and the best climatology

## Install
```zsh
npm install
bower install
```

## Precompile files
```zsh
gulp compile
```

## Run
```zsh
node index.js
# or
forever index.js
```

## Screen shot
<img src="http://nas.jorgechato.com/static/git/iron-sheep/1.png" height="400px"/>
<img src="http://nas.jorgechato.com/static/git/iron-sheep/2.png" height="400px"/>
<img src="http://nas.jorgechato.com/static/git/iron-sheep/3.png" height="400px"/>
<img src="http://nas.jorgechato.com/static/git/iron-sheep/4.png" height="400px"/>

## How it works
to provide to the shepherd the most useful information about routes he could do from one point to another we manage tree different resources.
+ real time weather services
+ map routes
+ NASA image gallery to provide the average percent of grass in the chosen route

To calculate the percent of grass, first we request an image from one point (location) of the route. then we process the image to get the number of pixels that tend to the green color. Finally the script respond the average on green pixels in that image and the percent of possible error (clouds hiding some areas), if the error is almost none instead of 0 we send error = NULL ... we repeat this process for each point of the route to generate the average percent.

You can see in this example the green area is almost 100% and there are almost none clouds, so the response is the 99% of grass(0.99) and an error of null

<img src="http://nas.jorgechato.com/static/git/iron-sheep/5.png" height="400px"/>
