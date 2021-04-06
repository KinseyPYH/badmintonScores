# Badminton Scores (BETA)

## https://www.badminton-scores.com


Badminton Scores (https://www.badminton-scores.com) is a website for live professional (Badminton World Federation [BWF]) badminton tournament scores. To use this website, simply navigate to the link and, if there are any BWF matches, live scores will show up. To get an update on new scores, simply refresh the website. 

Badminton Scores is a static website with a front-end hosted on AWS Amplify and a back-end hosted on AWS EC2. 

When a user loads the website, the front-end calls the back-end with an HTTPS POST request and returns with a JSON file which is then parsed. The information is shown as a grid of Cards, with each card representing one match between opponents. 

Written in JavaScript (NodeJS Express), the back-end calls an official Badminton tournament API through HTTPS GET calls, which will then be sent to the front end for display. 

(The https website is secured with an SSL certificate)
