export const display = () => `<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Kindergarten</title>
  <meta name="description" content="Architecture lab 2">
  <meta name="author" content="Kostya Gazin">
  
</head>

<body>
  <div class='header'>
    <div class='header-elem'><a href='http://localhost:3000'>Home</a></div>
    <div class='header-elem'><a href='http://localhost:3000/schedule'>Watch Schedule</a></div>
    <div class='header-elem'><a href='http://localhost:3000/suppliers'>Rate suppliers</a></div>    
    <div class='header-elem'><a href='http://localhost:3000/find'>Find events</a></div>
  </div>
  <h1>Filter by properties</h1>
  <input type='text' id='text-prop'><input type='text' id='text-prop-value'>
  <input type='text' id='text-prop-2'><input type='text' id='text-prop-value-2'>
  <button type='button' id='button-filter'>Submit</button>
  <div class='column' id='filtered'>
  </div>
  
  <h1>Find Movie</h1>
  <input type='text' id='movie-title'><button type='button'>Submit</button>
  <div id='movie-placeholder'></div>
  
  <h1>Free events</h1>
  <input type='text' id='freeEvents'><button type='button'>Submit</button>
  <div id='free-placeholder'></div>
  
  <h1>Find excursion to city</h1>
  <input type='text' id='city-title'><button type='button'>Submit</button>
  <div id='city-placeholder'></div>
  
  <script src="../frontend/index.js" type='module'></script>
</body>
</html>`;


