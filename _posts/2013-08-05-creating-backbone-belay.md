---
layout: blog_post
image: /blog/img/half-dome.jpg
title: Creating Backbone Belay 
---
I recently made the last commit for the initial version of my first open source project, a simple Backbone plugin called Backbone Belay. I find it fitting that along with my first open source project, I publish my first blog post about my experience making the plugin.

## Inception

The idea for Backbone Belay came from a common problem in many Backbone applications. When a user triggers a route change, common application behavior is to create a new model or collection, fetch that entity, and then do something such as display or render a view when that entity is returned by the server. 

Because AJAX is asynchronous and requests inherently have latency, it isn’t uncommon that by the time the server responds to a request the user has moved on to a different part of the application. The application has discarded the views, layouts, and modules that were expected to be present when the request returned. 

If you have added an extra callback to the entities success method that references missing views, layouts, or modules then, at the very least, errors will be thrown. Depending on how your application is structured your callback might even create a new view in an application level region even after the user no longer desires said view.

## What is Backbone Belay?

To solve this problem I created a simple plugin called Backbone Belay. Belay manages your pending HTTP requests and either forgets about them when they return complete or aborts them when the response is no longer needed in the application.

## How it works

The functionality of Backbone Belay is simple. When the application makes a new request with model.fetch() or collection.fetch(), it returns the XHR request object. Using the Backbone.Belay.spot() method, this request is now associated with the current route that the application is on and added to the list of pending requests. 

When a route change is triggered, all pending requests that are associated with that route are aborted. If requests finish before a route change as they are expected to, they will be automatically cleaned up and cleared out of Belay.

## Tools

Backbone Belay is my first stab at an open source project. Needless to say, there was a lot of learning along the way. 

### Watch Me Code
A big help for me while I was conceptualizing the project was Derik Bailey’s Watch Me Code series. The plugin architecture is modeled after the patterns he uses in his Refactoring Javascript tutorial.

### Jasmine
Working on Belay finally gave me the perfect opportunity to explore JavaScript test suites. Even though I read almost every day about the importance of automated testing in web development, I still have never taken the plunge until now. 

The suite that I have written so far for Belay is simple and still has a long way to go before it is complete, but each time I save a change to backbone-belay.js, it’s a great feeling to know that at least the basics are not broken.

### Grunt
While working on Belay, I got my first exposure to Grunt.js and instantly fell in love. Grunt is a javascript based task runner that automates every step of the deployment process and can handle everything from CoffeeScript compiling to automated testing. 

For this project, I configured grunt to compile CoffeeScript and run the Jasmine test suite. The best part is that it runs automatically and unobtrusively every time the codebase changes.

## Challenges

### Architecture - Grouping requests
By far the biggest challenge that I face while working on Belay was making a decision on how to architect the plugin. 

One of the requirements of the plugin was that it needed to be able to manage multiple pending requests associated with a single layout if that layout was to change. Using Backbone Marionette, I had a few options for objects that could be responsible for maintaining the status of multiple requests. Those objects were a Marionette Layout, a Marionette Module, or simply the history fragment that represented the current view. 

To avoid having a dependency on Marionette, I opted to use history fragments as the lookup key for managing requests. I believe that using fragments will cover the majority of use cases for Belay.

For the times when history fragments will not work, it is possible to set custom keys when calling Backbone.Belay.spot() and call a custom clean up method on that same key with Backbone.Belay.release(). See the docs for more info.

### Jasmine
When I set out to write my test suite I found it difficult to figure out where to start. Even after spending some time on it and getting a couple of basic tests out there, I think there is still a long way to go before the Belay test suite is up to par.

## Next steps
As a next step for the project, I plan on spending more time adding tests that fully cover all of the components in the plugin. Using only Jasmine, I was unable to find a good way to spoof requests in a way that was sufficient enough to completely test all of the use cases. 

Since writing the initial version of the Jasmine spec, I came across Sinon.js. Sinon is a library that brings added functionality, including fake XHR requests, to any unit testing framework. I have yet to start writing test with Sinon, but I think that it will be the answer to many of my problems with standalone Jasmine.

## Check it out
Creating a Backbone Belay was a fantastic experience for me. I was able to experiment with some really cool technologies, get more hands on with common JavaScript patterns, and most importantly, contribute to the open source world.

As I mentioned before, Belay is my first open source plugin ever. I am sure that there are many aspects of the project that can be improved on. If you see any bugs or room for improvement feel free to shoot me an email, create an issue, or submit a pull request. Let me know what you think!

## Repo
[https://github.com/hitchcockwill/backbone.belay](https://github.com/hitchcockwill/backbone.belay)

