/*

Blank pubnub sketch
 */

// server variables

var dataServer;
var pubKey = 'pub-c-2aafee3c-55a2-4069-be1b-babd1a8407f4';
var subKey = 'sub-c-9f62ae9e-16be-11e9-b4a6-026d6924b094';

var colours = ['red', 'blue', 'green', 'yellow'];
var trade_red = false;
var trade_blue = false;
var trade_green = false;
var trade_yellow = false;

//size of the active area
var cSizeX = 900;
var cSizeY = 600;

//consider making a channel for each user?
var channelName = "messageChannel";

function setup() 
{
  // getAudioContext().resume();
  createCanvas(cSizeX, cSizeY);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  // dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName], withPresence: true});

  dataServer.addListener({
    status: function(statusEvent) {
      for(var i = 0; i <= 4; i++){
        if (statusEvent.category === "PNConnectedCategory") {
            var newState = {
                name: 'user_' + colours[i],
                timestamp: new Date()
            };
            dataServer.setState(
                {
                    channels: [channelName],
                    state: newState
                }
            );
        }
    }
  },
    message: readIncoming
    // presence: dataCollect
  });

  dataServer.hereNow(
    {
        channels: [channelName],
        includeState: true
    },
    function(status, response) {
        console.log(response);
    }
  );

  redButton = createButton('TRADE RED');
  redButton.position(width/5, height/2);
  redButton.mouseClicked(trade_red = true);

  blueButton = createButton('TRADE BLUE');
  blueButton.position((width/5) * 2, height/2);
  blueButton.mouseClicked(trade_blue = true);

  greenButton = createButton('TRADE GREEN');
  greenButton.position((width/5) * 3, height/2);
  greenButton.mouseClicked(trade_green = true);

  yellowButton = createButton('TRADE YELLOW');
  yellowButton.position((width/5) * 4, height/2);
  yellowButton.mouseClicked(trade_yellow = true);

}

function draw() 
{


}


// function sendData() {
 

//   // Send Data to the server to draw it in all other canvases
//   dataServer.publish(
//     {
//       channel: channelName,
//       message: 
//       {
//         user_red:
//           {
//             x_angle: , 
//             y_angle: ,
//             red_bird: , 
//             blue_bird: , 
//             green_bird: , 
//             yellow_bird: , 
//             trade: 
//           }
//         user_blue:
//           {
//             x_angle: , 
//             y_angle: ,
//             red_bird: , 
//             blue_bird: , 
//             green_bird: , 
//             yellow_bird: , 
//             trade: 
//           }
//         user_green:
//           {
//             x_angle: , 
//             y_angle: ,
//             red_bird: , 
//             blue_bird: , 
//             green_bird: , 
//             yellow_bird: , 
//             trade: 
//           }
//         user_yellow:
//           {
//             x_angle: , 
//             y_angle: ,
//             red_bird: , 
//             blue_bird: , 
//             green_bird: , 
//             yellow_bird: , 
//             trade: 
//           }
//       }
//     });

// };

function tradeRequest(){

  if(inMessage.message.user_red){

    if(trade_red === true){

      window.alert("You can't trade with yourself");

    }

    //trading with blue user
    if(trade_blue === true){

      if(inMessage.message.user_red.blue_bird > 0){

        //trading blue bird
        inMessage.message.user_red.blue_bird -= 1;
        inMessage.message.user_blue.blue_bird += 1;

      }else if(inMessage.message.user_red.green_bird > 0){

        //trading green bird
        inMessage.message.user_red.green_bird -= 1;
        inMessage.message.user_blue.green_bird += 1;

      }else if(inMessage.message.user_red.yellow_bird > 0){

        //trading yellow bird
        inMessage.message.user_red.yellow_bird -= 1;
        inMessage.message.user_blue.yellow_bird += 1;

      }else{

        window.alert("No birds available");

      }

    }

    //trading with green user
    if(trade_green === true){



    }

    //trasing with yellow user
    if(trade_yellow === true){



    }

  }

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works because we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {

    // console.log(inMessage.message.);
  }
}

