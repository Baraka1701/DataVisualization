# Barchart starting with d3js

Really, I am not enought time for start and create for the beginning. So, in place try to make you know I did from the beginning or reuse the jacket and trousers eg..., I took some examples and comment the modifications. On the way, I am learning more JavaScript with some examples than with other kind of methods... 


# Steps

- First let's SEPARETE the basic HTML, from a MAIN.JS (More readable and professional). 

_./index.html_

```html
<!DOCTYPE html>
<meta charset="utf-8">

<head>
	<style>

	.axis {
	  font: 10px sans-serif;
	}
	.axis path,
	.axis line {
	  fill: none;
	  stroke: #000;
	  shape-rendering: crispEdges;
	}
	</style>
</head>

<body>
	
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src= "./maintest.js"></script>

</body>
```

- The data for Mandatory task are taken from a barchart example different from (http://bl.ocks.org/d3noob/8952219) but addapted to 2014 births in 5 USA States. According that I will create a legend for a better explanation:

- 2 Create a Legen. I will use a replication of legend fuction:

'''
function AppendLegend() {
    // building a legend is as simple as binding
    // more elements to the same data. in this case,
    // <text> tags
    svg.append('g')
      .attr('class', 'legend')
        .selectAll('text')  // TENGO QUE AÑADIR TIP. 
        .data(bardata)
          .enter()
            .append('text')
              .text(function(d) { return '• ' + d.state; })
              .attr('fill', function(d) { return color(d.state); })
              .attr('y', function(d, i) { return 20 * (i + 1); }) 
              .attr('width', "200")
}
'''

Problem!: All data for state is grouped in same TEXT when you use Indextest. Despite I read toolkit, I don´t know exactly how to separate databar indexes in legend... So, thanks to Braulio, we depure some important notes:

1) Change indextest for index.html.
2) With a dedicated process... Create a virtual server, (using ZOOM) according to instructions throught slack:


  Primero ejecuta desde ms-dos
  npm init -y
  Despues ejecuta
  npm install lite-server –d
  Despues habre el fichero package.json y añade la linea de start
    "scripts": {
      "start": "lite-server",
      "test": "echo \"Error: no test specified\" && exit 1"
    },

  Ahora desde ms-dos haz un
  npm start

3) Acces to a http://localhost:3000 o 3001...

4) mk package.json

After all it, we add some transformations just for change the letter and colour attributions in maintest:

  .attr("transform", `translate(150, 50)`)

  .attr("transform", `translate(${width}, ${height})`)

    const color = d3.scale.category10();

.style("fill", function(d) {

        return color(d.state);

     })

So finally, project is end!! 
