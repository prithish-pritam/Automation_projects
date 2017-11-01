var express= require('express'),
	app= express(),
	server=require('http').Server(app),
	io=require('socket.io')(server);

server.listen(3000);

//access public folder
app.use(express.static(__dirname+'/public/'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});


var gpio= require('onoff').Gpio;

   var pinlist=[4,17,27,22,10,9,11,5,6,13,19,26,21,20,16,12,7,8,25,24,23,18,15,14,2,3];
   var nlist=['sw1','sw2','sw3','sw4','sw5','sw6','sw7','sw8','sw9','sw10','sw11','sw12','sw13','sw14','sw15','sw16','sw17','sw18','sw19','sw20','sw21','sw22','sw23','sw24','sw25','sw26'];
   var nplist=['sw1','sw2','sw3','sw4','sw5','sw6','sw7','sw8','sw9','sw10','sw11','sw12','sw13','sw14','sw15','sw16','sw17','sw18','sw19','sw20','sw21','sw22','sw23','sw24','sw25','sw26'];

   for (var i = 0; i < nlist.length; i++) {
     nlist[i]= new gpio(pinlist[i],'out');
   }

  //Initial LED stop

  for (var i = 0; i < nlist.length; i++) {
     nlist[i].writeSync(1);
   }

   var iv= null;
   var east= false;
   var west= false;
   io.on('connection',function(socket){
     socket.on('neeta',function(data){
        console.log(data);
              //new dataset
     var getdata= data;
     var setarr= new Array();
     setarr= getdata.split(" ");
     console.log(setarr[0]);
     console.log(setarr[1]);
      //for all connection
     if (setarr[0]== 'all') {
        if (setarr[1]=='on') {
          for (var i = 0; i < nlist.length; i++) {
          nlist[i].writeSync(0); //all lights on
          }
          console.log('All lights On');
        }
        else{
          for (var i = 0; i < nlist.length; i++) {
          nlist[i].writeSync(1);
          }
          console.log("All lights off");
        }
      }
     //single collection single function

     /*if (setarr[0]!= 'all') {
     	var pdata=setarr[0];
     	var point= null;
     	for (var i = 0; i < nplist.length; i++) {
     		if (pdata==nplist[i]) {
     			if (setarr[1]=='on') {
     				nlist[i].writeSync(0); //light on
     				console.log(nplist[i]+" On");
     				point=i;
     				for (var j = 0; j < point; j++) {
     					nlist[j].writeSync(1);//lights off as ascending order
     				}
     				for (var j = nplist.length - 1; j > point; j--) {
     					nlist[j].writeSync(1); //lights off as decending order
     				}
     			}
     			else{
     				nlist[i].writeSync(1);
     				console.log(nplist[i]+" Off");
     			} 			
     		}
     		
     	}
     }*/
     //for subdiv 

     if (getdata == 'row3') {
       for (var k = 4; k <=8; k++) {
         nlist[k].writeSync(0);
       }
     }

     if (getdata == 'row4') {
      east= true;
      west= false;
       
       nlist[9].writeSync(0);
       nlist[10].writeSync(0);
       nlist[19].writeSync(0);
       nlist[20].writeSync(0);
       nlist[24].writeSync(0);
       nlist[25].writeSync(1);
     }

     if (getdata == 'row5') {
       nlist[11].writeSync(0);
       nlist[12].writeSync(0);
       nlist[21].writeSync(0);
       nlist[22].writeSync(0);
     }

     if (getdata == 'row6') {
       nlist[13].writeSync(0);
       nlist[14].writeSync(0);
       nlist[15].writeSync(0);
       nlist[16].writeSync(0);
       nlist[17].writeSync(0);
       nlist[18].writeSync(0);
       nlist[23].writeSync(0);
       nlist[3].writeSync(0);
     }

     if (getdata == 'row7') {
      east=false;
      west=true;
       
       nlist[9].writeSync(0);
       nlist[10].writeSync(0);
       nlist[19].writeSync(0);
       nlist[20].writeSync(0);
       nlist[24].writeSync(1);
       nlist[25].writeSync(0);
     }

     //for single connection
     var point=null;
      if (setarr[0]== 'sw1') {
        if (setarr[1]=='on') {
          nlist[0].writeSync(0); //all lights on
          point=0;
          console.log('sw1 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[0].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw2') {
        if (setarr[1]=='on') {
          nlist[1].writeSync(0); //all lights on
          point=1;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[1].writeSync(1);
          console.log("sw2 lights off");
        }
      }

      if (setarr[0]== 'sw3') {
        if (setarr[1]=='on') {
          nlist[2].writeSync(0); //all lights on
          point=2;
          console.log('sw3 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[2].writeSync(1);
          console.log("sw3 lights off");
        }
      }

      if (setarr[0]== 'sw4') {
        if (setarr[1]=='on') {
          nlist[3].writeSync(0); //all lights on
          point=3;
          console.log('sw3 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[3].writeSync(1);
          console.log("sw2 lights off");
        }
      }
       ////////////////////////////
     if (setarr[0]== 'sw5') {
        if (setarr[1]=='on') {
          nlist[4].writeSync(0); //all lights on
          point=4;
          console.log('sw5 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[4].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw6') {
        if (setarr[1]=='on') {
          nlist[5].writeSync(0); //all lights on
          point=5;
          console.log('sw6 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[5].writeSync(1);
          console.log("sw6 lights off");
        }
      }

      if (setarr[0]== 'sw7') {
        if (setarr[1]=='on') {
          nlist[6].writeSync(0); //all lights on
          point=6;
          console.log('sw7 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[6].writeSync(1);
          console.log("sw7 lights off");
        }
      }

      if (setarr[0]== 'sw8') {
        if (setarr[1]=='on') {
          nlist[7].writeSync(0); //all lights on
          point=7;
          console.log('sw8 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[7].writeSync(1);
          console.log("sw2 lights off");
        }
      }
      //////////////////////////////////////  
    if (setarr[0]== 'sw9') {
        if (setarr[1]=='on') {
          nlist[8].writeSync(0); //all lights on
          point=8;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[8].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw10' && east == true) {
        if (setarr[1]=='on') {
          nlist[9].writeSync(0); //all lights on
          point=9;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 3; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[9].writeSync(1);
          console.log("sw2 lights off");
        }
      }

      if (setarr[0]== 'sw11' && east == true) {
        if (setarr[1]=='on') {
          nlist[10].writeSync(0); //all lights on
          point=10;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[10].writeSync(1);
          console.log("sw1 lights off");
        }
      }
      ////////////////nova west/////////////////////////
      if (setarr[0]== 'sw10' && west == true) {
        if (setarr[1]=='on') {
          nlist[9].writeSync(0); //all lights on
          point=9;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 3; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[9].writeSync(1);
          console.log("sw2 lights off");
        }
      }

      if (setarr[0]== 'sw11' && west == true) {
        if (setarr[1]=='on') {
          nlist[10].writeSync(0); //all lights on
          point=10;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[10].writeSync(1);
          console.log("sw1 lights off");
        }
      }
      if (setarr[0]== 'sw12') {
        if (setarr[1]=='on') {
          nlist[11].writeSync(0); //all lights on
          point=11;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[11].writeSync(1);
          console.log("sw2 lights off");
        }
      }
       ////////////////////////////
     if (setarr[0]== 'sw13') {
        if (setarr[1]=='on') {
          nlist[12].writeSync(0); //all lights on
          point=12;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[12].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw14') {
        if (setarr[1]=='on') {
          nlist[13].writeSync(0); //all lights on
          point=13;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[13].writeSync(1);
          console.log("sw2 lights off");
        }
      }

      if (setarr[0]== 'sw15') {
        if (setarr[1]=='on') {
          nlist[14].writeSync(0); //all lights on
          point=14;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[14].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw16') {
        if (setarr[1]=='on') {
          nlist[15].writeSync(0); //all lights on
          point=15;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[15].writeSync(1);
          console.log("sw2 lights off");
        }
      }
      //////////////////////////////////////
        if (setarr[0]== 'sw17') {
        if (setarr[1]=='on') {
          nlist[16].writeSync(0); //all lights on
          point=16;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[16].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw18') {
        if (setarr[1]=='on') {
          nlist[17].writeSync(0); //all lights on
          point=17;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[17].writeSync(1);
          console.log("sw2 lights off");
        }
      }

      if (setarr[0]== 'sw19') {
        if (setarr[1]=='on') {
          nlist[18].writeSync(0); //all lights on
          point=18;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[18].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw20' && east == true) {
        if (setarr[1]=='on') {
          nlist[19].writeSync(0); //all lights on
          point=19;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 3; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[19].writeSync(1);
          console.log("sw2 lights off");
        }
      }
       ////////////////////////////
     if (setarr[0]== 'sw21' && east == true) {
        if (setarr[1]=='on') {
          nlist[20].writeSync(0); //all lights on
          point=20;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 3; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[20].writeSync(1);
          console.log("sw1 lights off");
        }
      }
   
   /////////////nova west///////////////
         if (setarr[0]== 'sw20' && west == true) {
        if (setarr[1]=='on') {
          nlist[19].writeSync(0); //all lights on
          point=19;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 3; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[19].writeSync(1);
          console.log("sw2 lights off");
        }
      }
       ////////////////////////////
     if (setarr[0]== 'sw21' && west == true) {
        if (setarr[1]=='on') {
          nlist[20].writeSync(0); //all lights on
          point=20;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 3; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[20].writeSync(1);
          console.log("sw1 lights off");
        }
      }
      if (setarr[0]== 'sw22') {
        if (setarr[1]=='on') {
          nlist[21].writeSync(0); //all lights on
         point=21;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[21].writeSync(1);
          console.log("sw2 lights off");
        }
      }

      if (setarr[0]== 'sw23') {
        if (setarr[1]=='on') {
          nlist[22].writeSync(0); //all lights on
          point=22;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
        else{
          nlist[22].writeSync(1);
          console.log("sw1 lights off");
        }
      }

      if (setarr[0]== 'sw24') {
        if (setarr[1]=='on') {
          nlist[23].writeSync(0); //all lights on
          console.log('sw2 lights On');
        }
        else{
          nlist[23].writeSync(1);
          point=23;
          console.log('sw2 lights On');
          for (var j = 0; j < point; j++) {
              nlist[j].writeSync(1);//lights off as ascending order
            }
            for (var j = nplist.length - 1; j > point; j--) {
              nlist[j].writeSync(1); //lights off as decending order
            }
        }
      }
      //////////////////////////////////////  
    /*if (setarr[0]== 'sw25') {
        if (setarr[1]=='on') {
          nlist[24].writeSync(0); //all lights on
          console.log('sw1 lights On');
        }
        else{
          nlist[24].writeSync(1);
          console.log("sw1 lights off");
        }
      } */ 
    
          
     });
  });  

