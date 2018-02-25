##step 1:
download data from http://media.mongodb.org/zips.json 

##step 2:
. Download the zip file http://www.mongodb.org/downloads
II. Extract it and copy the files into your desired location.
III. Start the DB engine.
IV. Test the installation and use it.

for further details follow this thread
https://stackoverflow.com/questions/2404742/how-to-install-mongodb-on-windows

##step 3:
For Windows users: Please follow the following steps to import from the json fi
le if you are using windows 7:

Download the above mentioned JSON file and place it inside a folder (say d:\sample)

Open a command prompt, start the mongo server by going in to the bin directory and typing in mongoD

Now take another command prompt and go to the bin directory again and write the following command

C:\mongodb\bin>mongoimport --db test --collection zips --file d:\sample\zips.json

##step 4:
run this command in REST&firebase directory

node bin/www

##step 5:
In order to setup the firebase follow the official docs. This is left as an exercise to you!
Best of luck!

