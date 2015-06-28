/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var index = 0;
var Vibe = require('ui/vibe');

// var main = new UI.Card({
//   title: 'Pebble.js',
//   icon: 'images/menu_icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.'
// });

// main.show();

// main.on('click', 'up', function(e) {
//   if (index != 0) index--;

// //   main.subtitle = "hello NOT";
// //   main.show();

//   showMenu([{}, {}]);
// });


showMainMenu();

function showMainMenu() {

  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Text Color'
      }, {
        title: 'Background Color'
      }, {
        title: 'Brightness',
      },{
        title: 'Temperature',
      }]
    }]
  });

  menu.on('select', function(e) {
    var index = e.itemIndex;

    if (index == 0 || index == 1) {
      showTextColorMenu();
    } else if (index == 2) {
      showBrightnessMenu();
    } else if (index == 3) {
//       showTweetMenu();
      getTemperature();
    }
  });
  menu.show();
}

function showTextColorMenu() {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Blue',
      }, {
        title: 'Red',
      }, {
        title: 'White',
      }]
    }]
  });
  menu.on('select', function(e) {
    var str = e.item.title;
    putColor(str, function(){
      menu.hide();
    });
  });
  menu.show();
}

function showTweetMenu() {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Good Morning',
      }, {
        title: 'Today is a good day',
      }, {
        title: 'Keep it up',
      }, {
        title: "If plan 'A' doesn't work, the alphabet has 25 more letters",
      }]
    }]
  });

  menu.on('select', function(e) {
    var str = e.item.title;
    putTweet(str, function(){
      menu.hide();
    });
  });
  menu.show();
}

function showBrightnessMenu() {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: '20%',
      }, {
        title: '40%'
      }, {
        title: '40%'
      },  {
        title: '80%'
      },  {
        title: '100%'
      }]
    }]
  });
  menu.on('select', function(e) {
  });
  menu.show();
}



function colors() {
  return ['green', 'blue'];
}

function colorName() {
  return "name";
}

function putColor(colorName, callback) {
  var data = colorName;

  ajax({url: 'https://pebblecontrolsea.firebaseio.com/feed/color.json',
      type: 'json',
      method:'put',
      data: data,
      headers:{"Content-Type":'application/json'}
    },
    function(data, status, request) {
      showMessage("success");
    },
    function(error, status, request) {
      showMessage("failure");
    }
  );
}

function getTemperature() {

  ajax({url: 'https://pebblecontrolsea.firebaseio.com/feed.json',
      type: 'json',
    },
    function(data, status, request) {
      var temperature = data.temperature;
      if(temperature) {
        showTemperature(temperature);
      } else {
        showMessage("failure");
      }
    },
    function(error, status, request) {
      showMessage("failure");
    }
  );
}

function showTemperature(temperature) {
  Vibe.vibrate('long');
  var card = new UI.Card({
    title:temperature,
    subtitle:"temperature"
  });

  card.show();
}

function putTweet(tweet, callback) {
  var data = tweet;

  ajax({url: 'https://pebblecontrolsea.firebaseio.com/feed/tweet.json',
      type: 'json',
      method:'put',
      data: data,
      headers:{"Content-Type":'application/json'}
    },
    function(data, status, request) {
      showMessage("success");
    },
    function(error, status, request) {
      showMessage("failure");
    }
  );
}

function showMessage(title, subtitle) {
  var card;
  if (subtitle) {
    card = new UI.Card({
      title:title,
      subtitle:subtitle
    });
  } else {
    card = new UI.Card({
      title:title
    });
  }


  card.show();
}




// function showMenu(options, callback) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//     callback(index);
//   });
//   menu.show();
// }



// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     fullscreen: true,
//   });
//   var textfield = new UI.Text({
//     position: new Vector2(0, 65),
//     size: new Vector2(144, 30),
//     font: 'gothic-24-bold',
//     text: 'Text Anywhere!',
//     textAlign: 'center'
//   });
//   wind.add(textfield);
//   wind.show();

//   ajax({ url: 'http://google.com', type: 'html'}, function(data) {
//       main.body(data);
//   });

//   var req = new XMLHttpRequest();
// 	req.open('GET', 'http://api.openweathermap.org/data/2.1/find/city?lat=37.830310&lon=-122.270831&cnt=1', true);
// 	req.onload = function(e) {
// 	  if (req.readyState == 4 && req.status == 200) {
// 	    if(req.status == 200) {
// 			console.log("http is 200");
// 	      // var response = JSON.parse(req.responseText);
// 	      // var temperature = response.list[0].main.temp;
// 	      // var icon = response.list[0].main.icon;
// 	      // if (!temperature) {
// 	      // 	temperature = "";
// 	      // }
// 	      // // Pebble.sendAppMessage({ 'icon':icon, 'temperature':temperature + '\u00B0C'});
// 	      // Pebble.sendAppMessage({ 'icon':"icon", 'temperature':"temperature" + '\u00B0C'});
// 	    } else { console.log('Error'); }
// 	  }
// 	}
// 	req.send(null);
// });




// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });

