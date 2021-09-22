// add Netflix Style Movie browsing w/ custom categories called moods
// simple POC

class Slider {
  constructor(name) {
    this.name = name;
    this.id = `glider-${name}`;
    this.items = [];
  }

  info(){
    console.log(`Slider - name: {this.name}`);
    console.log(`Slider - size: {this.items.length}`);
    console.log(`Slider - div ID: {this.id}`);
  }

  addItem(diplayItem){
    this.items.push(diplayItem);
  }

  //buildHTML_start_slider(container, settings){
  buildHTML_start_slider(){
    //console.log(settings);
    let container = document.getElementById("glider-supercontainer");

    let gliderHeading = document.createElement('h2');
    gliderHeading.classList.add('glid-div-heading');
    gliderHeading.id = `${this.id}-heading`;
    gliderHeading.textContent = this.name;
    container.appendChild(gliderHeading);

    let gliderDiv = document.createElement('div');
    gliderDiv.id = this.id;
    container.appendChild(gliderDiv);

    console.log(this.id);
    gliderDiv = document.getElementById(this.id);

    for (var i in this.items) {
      gliderDiv.appendChild(this.createSliderElement(this.items[i]));
    }
  }

  //<div class='poster'>
  //  <image class='img-poster'
  //    src="{{ url_for('static', filename='covers/') }}{{movies[0]['hires_image']}}">
  //  </image>
  //</div>
  createSliderElement(i){
    // create basic container w/ image for (now
    let sDiv = document.createElement('div');
    sDiv.classList.add('glid-div-box');
    sDiv.textContent = `${i.id} - ${i.hires_image}`;
    console.log(`createSliderElement ${i}`);

    //let image = document.createElement('picture');
    let image = document.createElement('img');
    let src = `/static/covers/${i.hires_image}`;
    //image.src = '/static/covers/Brightburn_film_poster.png';//`/static/covers/${i.hires_image}`;
    image.src = src

    sDiv.appendChild(image);

    //i.hires_image
    //let img = document.createElement('image');
    return sDiv;
  }

}



var slider_info='Slider Info v0.0';
console.log(`RUNNING: ${slider_info}`);

// assign movie info to local parameter
console.log(`JS slider_tests.js movies[0]`);
console.log(movies[0]);

var slider_names = [];
var sliders = {};

// iterate movies, add new categories to slider names
// add movie id / index to sliders slider list
console.log(typeof(movies));
console.log(movies);

for (var m of movies) {
  console.log(`* * * * * * ${slider_names.join(' - ')}`);
  console.log(`${m.id} - ${m.genres}`);

  for (var g in m.genres) {
    const genre = m.genres[g];

    if (slider_names.includes(genre)) {
      console.log(`${genre} in slider_names`);
      // add id to slider
      sliders[genre].addItem(m);       // add movie to relevant slider
    } else {
      slider_names.push(genre);       // create a new genre slider then add movie
      sliders[genre] = new Slider(genre);
      sliders[genre].addItem(m);
    }

  }
}

console.log(sliders);

//ts = new Slider('test-gen');
//ts.addItem(movies[0]);
//ts.addItem(movies[1]);
//ts.addItem(movies[3]);
//console.log(ts);
//
//var superCont = document.getElementById("glider-supercontainer");
//console.log(superCont);
console.log(sliders[0]);
sliders['Drama'].buildHTML_start_slider();
//ts.buildHTML_start_slider();



















// <div class='poster'><image class='img-poster' src="{{ url_for('static', filename='covers/') }}{{movie_info['hires_image']}}"></image></div>

//// map button id to functions
//var idToFunc = {
//  'rcbt-start':   buttonStart,
//  'rcbt-bak30s':  buttonBak30s,
//  'rcbt-play':    buttonPlay,
//  'rcbt-fwd30s':  buttonFwd30s,
//  'rcbt-end':     buttonEnd,
//
//  'rcbt-bak2x':   buttonBak2x,
//  'rcbt-vol':     buttonVol,
//  'rcslid-vol':   sliderVol,
//  'rcbt-fwd2x':   buttonFwd2x,
//
//  'rcbt-s1':      buttonS1,
//  'rcbt-s2':      buttonS2
//}
//// ROW 1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//function buttonStart(){
//  console.log('func: button Back to START');
//  sendCommand('start');
//}
//function buttonBak30s(){
//  console.log('func: button REWIND 30 secs');
//  sendCommand('bak30s');
//}
//
//function buttonPlay(){
//  if ((Remote.state === ST_PAUSED) ||
//      (Remote.state === ST_FF2X)   ||
//      (Remote.state === ST_RR2X))  {
//    Remote.state = ST_PLAYING ;
//    console.log(`func: button PLAY - state:${Remote.state}`);
//    document.getElementById("rcbt-play").innerText = 'PAUSE';
//    sendCommand('play');
//
//  } else if (Remote.state === ST_PLAYING) {
//    Remote.state = ST_PAUSED ;
//    console.log(`func: button PAUSED - state:${Remote.state}`);
//    document.getElementById("rcbt-play").innerText = 'PLAY';
//    sendCommand('pause');
//  }
//  console.log('buttonPlay: movie');
//  console.log(movie);
//  // PLAY / PAUSE based on state
//  // update state & button ICON
//
//}
//function buttonFwd30s(){
//  console.log('func: button FORWARD 30 secs');
//  sendCommand('fwd30s');
//}
//function buttonEnd(){
//  console.log('func: button Goto END');
//  sendCommand('end');
//}
//
//// ROW 2 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//function buttonBak2x(){
//  Remote.state = ST_RR2X;
//  console.log('func: button REWIND 2x');
//  sendCommand('bak2x');
//}
//function buttonVol(){
//  Remote.vol = document.getElementById("rcslid-vol").value;
//  console.log(`func: button VOL -  ${Remote.vol}`);
//  sendCommand('vol'); // TODO add slider move event listener
//}
//function sliderVol(){
//  Remote.vol = document.getElementById("rcslid-vol").value;
//  console.log(`func: button VOL slider ${Remote.vol}`);
//  sendCommand('vol'); // TODO add slider move event listener
//}
//function buttonFwd2x(){
//  Remote.state = ST_FF2X;
//  console.log('func: button FORWARD 2x');
//  sendCommand('fwd2x');
//}
//
//// ROW 3 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//function buttonS1(){
//  console.log('func: button S1');
//  sendCommand('s1');
//}
//function buttonS2(){
//  console.log('func: button S2');
//  sendCommand('s2');
//}
//
//function consoleButton(e){
//  console.log('> - - - - - - - - - - - - - - - - - - - - - - - - - - - S');
//  console.log(`remote: ${e.srcElement.innerText} - ID ${e.srcElement.id}`);
//  console.log(e);
//  console.log(e.srcElement);
//  console.log(e.srcElement.classList);
//  console.log('> - - - - - - - - - - - - - - - - - - - - - - - - - - - E');
//
//  idToFunc[e.srcElement.id]();
//}
//
//// register button click events
//document.addEventListener("DOMContentLoaded", function(event) {
//  document.querySelector('.rc-item.rc-start').addEventListener('click', consoleButton);
//  document.querySelector('.rc-item.rc-back30s').addEventListener('click', consoleButton);
//  document.querySelector('.rc-item.rc-play').addEventListener('click', consoleButton);
//  document.querySelector('.rc-item.rc-forward30s').addEventListener('click', consoleButton);;
//  document.querySelector('.rc-item.rc-end').addEventListener('click', consoleButton);
//
//  document.querySelector('.rc-item.rc-back2x').addEventListener('click', consoleButton);
//  document.querySelector('.rc-item.rc-volume').addEventListener('click', consoleButton);
//  document.querySelector('.rc-item.rc-forward2x').addEventListener('click', consoleButton);
//  Remote.vol = document.getElementById("rcslid-vol").value;
//
//  document.querySelector('.rc-item.rc-s1').addEventListener('click', consoleButton);
//  document.querySelector('.rc-item.rc-s2').addEventListener('click', consoleButton);
//});
//
//// S1
//function sendCommand (cmd) {
//  json_cmd = {
//    id: movie.id,
//    path: movie.file_path,
//    vol: Remote.vol,
//    cmd: cmd
//  };
//  console.log(`sendCommand: ${cmd}`);
//
//  fetch(`${window.origin}/play_movie/${movie.id}`, {
//  //fetch(`/play_movie/${movie.id}`, {
//      method: "POST",
//      credentials: "include",
//      body: JSON.stringify(json_cmd),
//      cache: "no-cache",
//      headers: new Headers({
//        "content-type": "application/json"
//      })
//    })
//    .then(function(response) {
//      if (response.status !== 200) {
//        console.log(`Looks like there was a problem. Status code: ${response.status}`);
//        return;
//      }
//      response.json().then(function(data) {
//        console.log(`sendCommand RX: ${data}`);
//      });
//    })
//    .catch(function(error) {
//      console.log("Fetch error: " + error);
//  });
//
//}
//
//// S2
//function getStatus ( route=`/play_movie/${movie.id}` ) {
//
//}
