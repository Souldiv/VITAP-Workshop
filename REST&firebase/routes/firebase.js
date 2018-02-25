var admin = require('firebase-admin');
var serviceaccount = require('../config/test-a9609-firebase-adminsdk-mcm49-b161a06b59');

admin.initializeApp ({
  credential: admin.credential.cert(serviceaccount),
  databaseURL: "<>"
});

var db = admin.firestore();

var test = db.collection('image').doc("bVY5ddNTlMYT7eda03ow");
var list = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5_r-UC6QRksXcXaGup_rDmR5f0NxW9_yW9I_4xd7gLPIQate5w',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OrlOf0H3CcF8mSmZ-p0ImmyJI-datifbW66ZlLqRAJsIPNg13A',
'https://hedgehogaspets.com/wp-content/uploads/2016/11/Gendo_the_Hedgehog_6111053153-1.jpg',
'https://fthmb.tqn.com/s_5vwcuJVKC2RdqT2nsi8VDxPo8=/960x0/filters:no_upscale()/fennec-fox-85120553-57ffe0d85f9b5805c2b03554.jpg',
'https://img.buzzfeed.com/buzzfeed-static/static/2014-11/6/13/enhanced/webdr12/enhanced-15302-1415297979-20.jpg?downsize=715:*&output-format=auto&output-quality=auto',
'https://i.redditmedia.com/jPRq_fFBnx0p4QbfUXBuqMdFdesuTzG_yJ8yZOhNimQ.png?w=696&s=d392b71fe3f57a729b5919ef851ec2a3',
'http://cashkaro.com/blog/wp-content/uploads/2016/11/Donald-Trump-Meme-10.jpg',
'http://data1.ibtimes.co.in/photo/en/full/38416/1455433140_valentines-day-2016-memes-funny-photos-best-jokes-images.jpg',
'https://i.imgur.com/471ozqV.jpg'];

var one = function Set() {
  var rand = list[Math.floor(Math.random() * list.length)];
    test.set({image: rand});
    console.log(rand);
};
setInterval(one, 5000);
