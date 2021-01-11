# puppy-content

Imagine that you were a dog breeder and that you believed fervently that the world needed more dogs. They're our best friends, after all. The world is better with more of them. So you start breeding them as fast as you can. But instead of finding loving homes for them, you push them out the door to fend for themselves.

Chrome is so robust at creating new web platform features that we have exceeded our capacity to document it. With a little help from you, we can stop doing this.

If you're implementing a new spec, there's no one more qualified than you to provide an MVP reference sheet and there's no one who can do it faster. 

## Install

Before installing the puppy tool, install npm.

`sudo apt-get install npm`

Before contributing, you need to install the Puppy tool.

```git clone https://github.com/GoogleChromeLabs/puppy-content.git
cd puppy-content
git fetch --all
npm install
```

## I'm Preparing for a Developer Trial or Origin Trial

The documentation produced in this stage will be minimal, focusing on accuracy and prioritizing a code example over document depth. Follow the instructions behind the appropriate link below. 

* [I am implementing one or more interfaces or events](./api-instructions.md).

* [I am adding an interface member such as an event callback, a method, or a property](./api-instructions.md).

## I'm Preparing to Ship a Feature

Do this procedure while you are preparing your feature for beta.

1. If you did not create MVP documentation during an earlier stage, do so now by following the procedure above, but do not add them to your spec repo. 
2. Notify Chrome Developer Relations that you are shipping your feature in an upcoming release of Chrome. We will work with you to publish a fuller documentation set on [MDN](https://developer.mozilla.org/en-US/docs/Web/Reference).
3. Remove the MVP documentation from your spec repo. Duplicate documentation is hard to keep in sync and hence, and antipattern.
4. Your responsibilities are officially complete (though we wouldn't complain if you helped us keep an eye on MDN).
