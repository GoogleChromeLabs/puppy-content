# For Interfaces, Events, or Members of Either

Thank you for helping the web platform. 

## A Note about Code Examples

Code examples are not applications. Many practices of application building are not appropriate for code examples. Since the code example you create will eventually be on MDN, we use [their guidelines](https://www.google.com/url?q=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FMDN%2FGuidelines%2FCode_guidelines&sa=D&sntz=1&usg=AFQjCNFwTJp-gpK_R61jaxcHnsjQC9vx7g). Please read them, especially if you have never done code examples for documentation.

## Instructions

Here are the instructions for creating an interface page. 

1. From a command line change to the directory where you [installed the Puppy tool](./README.md#Install).

2. Checkout the content creation branch.

`git checkout puppy`

3. Update the repo to get the latest changes.

`git pull`

4. To create a working branch and boilerplate page, run: 

`npm run create -- -i `_`itemName`_

where _`itemName`_ is an interface, constructor, event, event callback, method, or property.

This creates a new branch named for the interface or event. Use the interface or event name exactly as it would appear in JavaScript. for example:

`npm run create -- -i ServiceWorker`

1. Follow the on-screen instructions. If you need to refer to them later, they are roughly like this:

  a. Open the newly created file. (The location should have been printed on screen. If you do not see it, type git status.)

  a. Replace square-bracketed `[[tokens]]` with the specified information.

  a. Answer the questions in the file's comments.

  a. If you are implementing a spec with multiple interfaces, repeat step 4 for each interface you are adding. To reuse the branch created in step 3, use the -r flag. For example:

  `npm run create -- -i `_`interfaceName -r`_

  If you do not use the -r flag, commit your current branch before repeating.

1. (Optional) If you want to help DevRel with the interfaces' subpages, rerun the script as many times as needed to create subpages for constructors, event callbacks, methods, and properties. We plan to make the sub pages for you; however we're not going to turn down any offer of help. 

Do not do this if you your feature is in a developer trial or an origin trial.

1. Ensure that all your new files are committed and push your branches to origin.

2. Open a browser and go to https://github.com/GoogleChromeLabs/puppy-content.git.

3. Open pull requests or each of your branches against the default branch. Developer Relations will review your submission within a week and request changes, if needed.

4. When your writing branch is merged, you may delete your local copy.

5. Please [record the time you spent](https://docs.google.com/forms/d/e/1FAIpQLSczSYW85-_zJT-4h0MkyJzLWCw12eHQhGKnaaNMovP2h554eg/viewform?vc=0&c=0&w=1&flr=0&gxids=7826&resourcekey=0-UtyC_NG-d14BcgEN9ba69A) working on your documents. This helps us understand the time commitment required by this project. It's not required, but it would really help us out.
