import { Event } from '../entities/Event';

export const display = (events: Event[]) => `<!doctype html>

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
  <div class='column'>
  ${events.map(evt => `<div class='list-elem'>
    <div>${evt.title}</div>
    <div>${evt.price}</div>
    <div>${evt.description}</div>
    <div>${evt.date}</div>
    <div>${evt.organizer}</div>
    <div><button>Add to schedule</button></div>
  </div>`)}
  </div>
  <script src="../frontend/index.js" type='module'></script>
</body>
</html>`;
