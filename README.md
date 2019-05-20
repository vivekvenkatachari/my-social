# MySocial

I generated this project using [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## How to see it working
1. git clone this repository
2. Get Node and npm if not available in your current environment
3. go to the repo folder and run npm install
4. run `ng serve`
5. open `localhost:4200` on your browser
6. This app is AOT build ready. You need to run `ng build --prod`
7. Copy files from dist folder and you put it in a webserver

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

run `ng test --code-coverage` and navigate to `coverage/my-social/index.html` to check the coverage.
At present coverage is as follows:
------------------------------------
Statements   : 95.45% ( 147/154 ) <br>
Branches     : 83.87% ( 26/31 )<br>
Functions    : 95.65% ( 44/46 )<br>
Lines        : 94.78% ( 127/134 )
------------------------------------
 TOTAL: 19 SUCCESS
------------------------------------

## What was in mind while designing this
1. I used Angular 7, since it covers all the features from 6
2. With the provided value, i was to see a graph relation between user and friends
3. Used ngx-graph since it has easy interface implementation for Angular
4. Friendship has to 2 directional, if i say Person A is my friend, so it with him
5. So you can see that i update the friendship in user service
6. Though Dashboard shows all the details, the best use of angular is to use its component model to put up a brand new screen with no change


## What did i try but did not workout, would spend more time to achieve this

1. Material data table did not give a default option to filter by each column
  a. Will possibly filter by age less than or weight less than to see the relation
  b. Might spend more time with Material to understand the eco-sysyem
2. Stored the data in memory, I would move it to a mock serve to eliminate complexity in my service
3. I am not much familiar wil the Angular element, tried to read but could not do it with the time



