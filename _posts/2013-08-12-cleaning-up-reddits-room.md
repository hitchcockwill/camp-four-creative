---
layout: blog_post
image: /blog/img/flatit-1400.jpg
title: Flatit, cleaning up reddit's room
---

Last week, having found myself recently unemployed with nothing to do, I tried to make it a point to learn about something new every day. My favorite experiment of the week and the one that I’m writing about today is flatit. flatit is a Chrome extension that adds extra styling to reddit giving it a flatter, cleaner look and feel.

##Screenshots
[![flatit working on the reddit front page.](/blog/img/flatit-screen1.jpg)](/blog/img/flatit-screen1.jpg)
[![flatit working on a reddit comment page.](/blog/img/flatit-screen2.jpg)](/blog/img/flatit-screen2.jpg)

##Goals
The main focus of my project was to create a Chrome extension and explore some of the tools available to developers working with Chrome. 

When I started to think about exactly what I wanted to build, the idea of cleaning up reddit’s interface was something that I found quite appealing; I could experiment with the building blocks of Chrome extensions and something involving mostly CSS could be accomplished in a single day.

It’s no secret that reddit looks like shit. That being said, there is something appealing about the simple and stripped down styling of certain elements in the interface. Part of me has grown to love the look and feel of reddit and by creating this plugin I didn’t want to subtract from the feeling that I get when clicking through links. With that in mind, I made it a point to not be too disruptive with reddit’s traditional design and instead just remove noise, tidy up clutter, and add space. I guess you could say that my goal was to clean up reddit’s messy room. 

##Building flatit
Getting the extension set up was actually incredibly simple. To create a Chrome extension, all you need to do is save a new file called manifest.json in to the directory in which you want your plugin. manifest.json works as the configuration file for the entire extension. In this file you define the assets that you want to include, the Chrome API actions that you will use, and all of the general settings for the extension.

Once my manifest file was created and configured, I added a new file called style.css where I would write all of the new styling for the pages. Now it was just a matter of clicking through each page element with the inspector and overwriting offending styles.

I purposely will not go into more detail about how I created the extension just because there are already great resources out there to help out first time extension developers. Here are two resources that got me up and running quickly:

[http://developer.chrome.com/extensions/getstarted.html](http://developer.chrome.com/extensions/getstarted.html)
[http://lifehacker.com/5857721/how-to-build-a-chrome-extension](http://lifehacker.com/5857721/how-to-build-a-chrome-extension)

##Challenges
###CSS Specificity
Because Chrome extension assets are injected after the rest of the page elements have been defined, it would stand to reason that CSS files with matching specificity would actually take precedence over the default page includes. Unfortunately, this is not the case with Chrome extensions. In order to overwrite styles that have previously been defined on the page the css selectors in the extension must be more specific than those that currently exist. 

There are two easy ways to increase specificity without accidentally becoming so specific that you exclude elements that you intend to target: prefixing selectors with a common parent element or suffixing style attributes with an ```!important``` tag. There are pros and cons to both methods.

####Common parents, universal selectors
The most simple solution to this problem would be to give each selector a parent prefix that is a common element to all elements on the page.

For example:
{% highlight css %}
body {
  background: red;
}
{% endhighlight %}

would be written as:

{% highlight css %}
html body {
  background: red;
}
{% endhighlight %}

The main advantage to this solution is simplicity. Using a universal selector is far less verbose than the alternative solution which, as you will see below, involves added text after each style attribute.

The major disadvantage is that although this will almost always be more specific than the styles that are included on the page, it will not ever be more specific than inline styles or anything with an ```!important``` tag. As I learned when dealing with the Reddit Enhancement Suite styling and have seen in many JavaScript plugins, many extensions and plugins use CSS’s ```!important``` tag very liberally and would thus be more specific than flatit’s styling.

Another major disadvantage is the performance of using universal selectors like ```html``` or ```body``` as prefixes. The browser reads CSS styles from right to left and travels up through the DOM tree to check for the existence of the next selector. This means that prefixing a selector with something that exists at the top level of the DOM will create a pretty large performance hit.

####```!important``` tags
Anyone that has worked on a web development project of almost any size has probably learned that you should almost never use the CSS ```!important``` tag. For those who are unfamiliar, any css attribute that has been suffixed with ```!important``` becomes more specific than even inline styles. The problem with using ```!important``` in most cases is that the codebase quickly becomes very hard to debug and maintain when there is a confusing web of conflicting ```!important``` attributes.

For this extension and probably most Chrome extensions, using the ```!important``` tag to overwrite existing default page styles is a necessity. Even though in many projects using ```!important``` can cause confusion with specificity down the road, I wanted my extension to have the final say in what the page looked like. As I mentioned above, many other extensions and plugins use the ```!important``` tag liberally. Because of this, the only way to be sure that flatit’s styles took precedence over other extensions or plugins was to also use ```!important```.

###Subreddit styling
One of the features of reddit is that subreddit moderators are able to author and upload custom styling to their community’s page. The styling of many of the subreddits actually looks pretty good, but each moderator has their own style and workflow which causes every subreddit to be completely unique. 

At first, I tried to go through some of the most popular subreddits to see if there was a way that I could gracefully maintain some of the custom styling that the moderators had added. After looking over half a dozen subreddits I concluded that the simplest solution would be to use JavaScript to just remove the stylesheet for the subreddit altogether.

##Wrapping it up
Building this extension was a great opportunity for me to learn more about Chrome extensions and what can be done with them. I was very impressed with how simple it was to author a new extension and publish it in to the web store.

I definitely plan to continue making updates to flatit when I see things that I think need some improvement. Flatit is an open source project and can be found on Github (link below). If you have ideas or want to contribute, please send an email or a pull request and I would be happy to try to fit it in!

##Links
[https://chrome.google.com/webstore/detail/flatit/blkfjcojlgcgillkmcaahalnnibhkpdl](https://chrome.google.com/webstore/detail/flatit/blkfjcojlgcgillkmcaahalnnibhkpdl)
[https://github.com/hitchcockwill/flat-reddit](https://github.com/hitchcockwill/flat-reddit)
