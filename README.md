# Drake Developers Club

This is the repository for the Drake Developers Club website.  We are a club at Drake High School that focuses on spreading knowledge and passion for software development and coding.  Contact us at <leadership@dhsdevelopers.org>, or come to a meeting during lunch on Wednesdays in room 107.

## New Member Instructions

All new members should follow these steps to create their own unique homepage on the website.  If, as you go through this guide you encounter any problems, ask for help from a fellow club member (either in person, or by posting in #general in [slack](https://dhsdevelopers.slack.com/)) or from Google.  Both are happy to help and can probably get you sorted out.  If any part of the instructions are out of date, confusing, or incomplete, it is also the task of the new member to edit this file and fix any issues with the instructions, once you have solved the issue for yourself. If this seems like a lot to do (it kinda is) just remember you only have to do most of it once.

**Note: running a command in terminal** just means opening up either terminal (Mac and Linux) or command prompt (Windows) and copy-pasting in the given command.  A command might look something like this: `ls -al ~`.  Once you have entered in the command, press enter.  That's it, terminal's not so complicated after all.

### Step 1: Get the Software

Development requires software to edit and test your code.  Make sure you have all of the tools listed below.

- **Code Editor.** You will need a text editor to edit your code.  Try one of the ones listed below, or use your own favorite editor if you have one.
  - [Brackets](http://brackets.io/)
  - [Atom](https://atom.io/)
- **Git.** You will need git to upload your code to this online repository.  If you get the Windows or Mac version, make sure you click yes when it asks you if you want to install the command line tools.
  - Linux: Open a terminal and copy-paste in `sudo apt-get install git`, then press enter to get the command line tools.
  - Mac: Download [GitHub for Mac](https://mac.github.com/).
  - Windows: Download [GitHub for Windows](https://windows.github.com/).
- **Node.js and NPM.** You will need these to preview the website and to get the rest of the resources to load the page. You'll learn what this means later on.
  - Windows: Download [Node.js](https://nodejs.org/en/) Node comes with NPM so don't worry about that yet.
  - Linux: Run `sudo apt-get install npm` in a terminal.
  - Mac : Run `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` in a terminal to get [Homebrew](http://brew.sh/) if you don't already have it, then run `brew install npm`.
  - **Bower and Gulp.** These can both be installed with NPM.  Once you have NPM (see above), open up a terminal and run `npm install -g gulp && npm install -g bower`.  If you are on Linux or Mac, you may need to run `sudo npm install -g gulp && sudo npm install -g bower`.
- **Graphics Magick.** This is used to resize images for multiple screen resolutions, so the site loads faster on small screens.
  - Windows: Download [Graphics Magick](http://www.graphicsmagick.org/download.html).
  - Linux: Run `sudo apt-get install graphicsmagick` in a terminal.
  - Mac: Assuming you did the steps above and have [Homebrew](http://brew.sh/), run `brew install graphicsmagick`.

### Step 2: Fork the Repository

Go to [the repository homepage](https://github.com/DHSDevelopersClub/dhsdevelopersclub.github.io) (if you are reading this, you're probably already there).  In the topright, click the "Fork" button.  When it's done, you will have a copy of the repository in your own account that you can edit.  If you don't yet have an account on GitHub, go ahead and [sign up](https://github.com/join), then email <leadership@dhsdevelopers.org> with the name of your github account so we can add you as a member of the club.

### Step 3: Download Your Fork

#### Using GitHub for Desktop
Check out [this resource](https://help.github.com/desktop/guides/contributing/) on how to navigate it's features and do everything you need to get started in the Developers Club.  For this step, look at the sidebar on the right and find the "Clone in Desktop" button.

#### Using Terminal/CMD
For those who are using terminal, open up a terminal or command prompt and type in `mkdir github` (you are making a folder called "github") press enter, then type `cd github` (you are opening that folder).  If you already have a folder where you keep your projects, `cd` to that folder instead.

Go back to the github page of your fork and find the textbox that says "HTTP Clone URL".  Copy the text in there, then go back to your terminal.  Type in `git clone ` and then paster in that URL you just copied, then press enter.  (Advanced users: you can use [SSH](https://help.github.com/articles/generating-ssh-keys/) too, if you like, it doesn't matter).

If you type in `ls` you should see a folder called `dhsdevelopersclub.github.io`.  If so, you can close your terminal, you are done with step #3!

### Step 4: Split Off a New Branch

A branch is a place where you can make changes.  Changes you make in a branch will only exist in that branch until you merge it or [create a pull request](#step-11-submit-a-pull-request).

#### Using GitHub for Desktop
See [this article](https://help.github.com/desktop/guides/contributing/creating-a-branch-for-your-work/) on how to make a branch.  Name your branch `my-webpage-start`.

#### Using Terminal/CMD
Run `cd dhsdevelopersclub.github.io` to open the folder where your fork lives.  Then, run `git checkout -b my-webpage-start`.  This will create a new branch called `my-webpage-start` and "checkout" that branch.  When you have a branch checked out, changes you make will be saved to that branch.

If you are confused about what a branch is, feel free to ask in #general in slack, someone will probably notice and explain it.  To be extra sure your question gets noticed, you can mention @zander.  He knows a lot about git and would be happy to help you understand it.  He is also the coolest README.md file writer in the whole world ;D.

### Step 5: Make Your Very Own Folder

Open a file browser (such as Finder or Windows explorer) and find the project folder (remember it should be called `dhsdevelopersclub.github.io`).  Open it, then open the folder called `app` then the folder called `roster`.  Inside, make a new folder with your first and last name.  No spaces allowed, use `_` instead, but keep the normal capitalization of your name.

For example, someone named "Bobby Smith-Rogers" would make a folder titled `Bobby_Smith-Rogers`.  Someone called "Joe McCandless" would make a folder called `Joe_McCandless`.

### Step 6: Make Your Home Page

Now open the folder with your name on it and make a new file inside it called `index.html`.  Open `index.html` with your favorite code editor, and use your HTML skills to make whatever kind of home page you want for yourself.[*](#restrictions)  If you have no HTML skills yet, copy and paste this example code into the file (replace "Your Name Here" with your name).  We will teach you to use HTML later so you can make something more fancy and original.

```html
  <!doctype html>

  <!--
  This is a comment.  The computer ignores it, so it is meant only for the
  people who are reading your code (including you).
  -->

  <html>
    <head>
      <title>Your Name Here</title>
    </head>
    <body>
      <!--
      Keep this <span> element.  It magically reloads the page when you change
      your code. (but you have to be using gulp serve)
      -->
      <span id="browser-sync-binding"></span>

      Hi I'm Your Name Here and I am a member of the Drake Developer's Club.
    </body>
  </html>
```

When you're done, save the file.

**Note:** if you already have a website that you want to use as your homepage, you can [setup a `config.json`](#setting-up-a-configjson).

### Step 7: Add Your Profile Info

There are two more files you should add.  Find a picture you would like to use as your profile photo, and put it in your folder.  Rename it to profile.jpg.  If it isn't a JPEG, you will have to convert it.  Also, make a new text file called blurb.txt.  Inside it, write a few sentences about yourself and save it.  When you're done, your folder should have three files in it: `index.html`, `profile.jpg`, and `blurb.txt`.

### Step 8: Testing Your Home Page

Open up a terminal/comand line and navigate to the `dhsdevelopersclub.github.io` directory using `cd`.  Once you're, there run

Next you need to load the rest of the resorces for the page, run  let it do its thing and then run `npm install && bower install`. This might take a bit so be patient. What it's doing is grabbing all of the code that we include in out page to make it run so we don't have to write everything.

Once you have all that downloaded, run `gulp serve`. This should open a new tab in your default browser with the club website loaded.  Scroll down, and find the club roster.  Your name should show up with the picture and text you added in [step #7](#step-7-add-your-profile-info).  Click it to go to your page.

### Step 9: Experiment

Mess around with your code.  If you are new to HTML, ask a fellow club member for help, or check out <http://www.w3schools.com> for reference or some tutorials.  Feel free to check out other people's pages to see how their code works and manifests into a webpage.  Just don't mess with their files, please.  You can, however copy bits of their code (with their permission) and experiment with it on your own page. For some more in depth tutorials and advanced techniques, check out <http://www.codecademy.com>. You'll notice when you save a change, the page automatically reloads to display your changes. That's thanks to gulp which you installed earlier.

### Step 10: Commit Your Changes

A commit is a way to bundle changes made to multiple files together, sort of like saving.  See [this article](https://help.github.com/desktop/guides/contributing/about-commits/) for more about what a commit is.

#### Using GitHub for Desktop
See [this article](https://help.github.com/desktop/guides/contributing/committing-and-reviewing-changes-to-your-project/) for instructions on how to make a commit.  When you are done with your commit, [sync](https://help.github.com/desktop/guides/contributing/syncing-your-branch/) your changes with your fork.

#### Using the CMD/Terminal
Open a terminal/command line and type in `git add --all` (this flags all of your changes so the commit can scoop them up) then type in `git commit`.

You will be prompted to enter a commit message.  A commit message should be one sentence.  Keep it short, less than sixty letters, and use the imperative form for verbs.  Eg. `Add some images to my home page.` or `Update my index.html.` or `Completely redesign my home page.`  Make it descriptive.  **Do NOT do anything like this:** `Changed stuff` or `i added a title bar and then i added an image of a cat and then i added another image of a cat`.  If you need to add extra description, you can add it below the message, but make sure to leave a blank line.  For example:

```
  Completely redesign my home page.

  I added a header bar, replaced the logo, and changed up the color
  scheme.  I also added a link to another page with a list of
  projects I have completed.
```

Once you are done with your commit message, save and close the text editor you were using to edit the message.  For nano (the default text editor on linux and mac), hit `CTRL` + `X`, then press `Y` to save and close.

Now that you have made your commit, it is time to upload your changes.  In the terminal/command line type `git push -u origin my-webpage-start`.

### Step 11: Submit a Pull Request

At this point, your changes should be in the cloud, but they are still on your own fork.  If you go to <http://dhsdevelopers.org>, you won't see them.  That is because your changes still haven't been pulled into the main repository.

Go back to your fork on <http://github.com>.  You should see a banner that says you recently pushed to `my-webpage-start` and that you can make a pull request.  Click the button to make a pull request.  Add a meaningful description of your changes, and click the big green button to open the PR.

It may take a while for one of the admins to get to your PR, but when it's merged, you should get an email.  After it gets merged, you can go to <http://dhsdevelopers.org> and see your changes live on the internet.

### Step 12: Syncing Changes Back to Your Fork

Other people will be making changes to the main repository and if you want to keep your fork up to date, you will need to sync changes back to your fork.  To do this, you will need to use the terminal/command line, since there is no way to connect to two remote repositories in GitHub Desktop.

Open up a terminal and `cd github/dhsdevelopersclub.github.io`.  Then, checkout your dev branch: `git checkout dev`.  Next, add the main repository as a remote called "upstream" (you only have to do this once): `git remote add upstream https://github.com/DHSDevelopersClub/dhsdevelopersclub.github.io.git`.  Finally, pull the changes from the dev branch on upstream: `git pull upstream dev`.  You should also `git push` so your own fork stays up to date.  Nice job, you are now ready to [make more changes](#step-13-making-more-changes) to the website.

### Step 13: Making More Changes

If you've gotten this far, you've done most of the hard work already.  Making more changes in the future requires just 6 steps.

1. [Sync your fork with the main repository.](#step-12-syncing-changes-back-to-your-fork)  This time, you don't need to add the remote; you just checkout dev, pull, then push.
2. [Make a new branch.](#step-4-split-off-a-new-branch)  Name the branch something that makes sense (eg. if you plan to update the header of your site, call it `my-site-header` or something).  Make sure you are on the dev branch before branching.  If you just synced your fork with the main repository, you will probably be there already.
3. Make your changes using your favorite text editor.
4. [Test your changes.](#step-8-testing-your-home-page)  Even the best programmers rarely get it right the first time.  Everytime you make a change, test it out to see if it worked.  With the magic of gulp, you can just leave the browser tab open and look at it will show your latest changes when you save your files.
5. [Commit your changes.](#step-10-commit-your-changes)  You can make more than one commit before making a pull request.  If you are making a lot of changes, you should split them up into smaller commits.
6. [Make a pull request.](#step-11-submit-a-pull-request)  Once you have opened the pull request, you can still make commits in that branch.  If you `git push` them, they will become part of the pull request as well.

Try to not make too many pull requests; the website admins (Zander, Sebastian, and Max) have to manually test and deploy them.  It's much easier for them if you make a lot of changes on your fork, then bundle them up into one big pull request.  Thanks in advance.

### Step 14: Edit the README.md File

Make sure to improve this file if you run into any problems.  You can edit this file in much the same way that you edit your index.html.  You can also edit it from the GitHub website.  The readme is written in markdown (hence the .md).  It is a very simplified version of HTML, see [this article](http://daringfireball.net/projects/markdown/syntax) for an overview of how to write markdown.  [Dillinger](http://dillinger.io/) is a good tool for editing markdown.  You can copy-paste the readme into it, make your edits, then copy-paste back into the file.

Happy coding, and welcome to the club!

------

## Setting Up a config.json

You can add a `config.json` to your folder in roster to redirect to a custom homepage.  Your `config.json` should look something like this:

```
{
    "uri": "http://your-home-page.com"
}
```

------

## Adding Resource Cards to the Learn Page

The Learn page is loaded from `app/pages/learn.html`.  If you know of any online tutorials, reference materials or other helpful resources for a specific language, you are more than welcome to add them.  If the language in question isn't listed, feel free to add a section for it before adding your resource.  The code in learn.html is pretty self-explanatory, but if you're confused, don't hesitate to message @zander on slack in #help.

You can also add yourself as a resource, using a `<member-card>` element.  Again, there is example code in learn.html, but you can just insert `<member-card name="Your_Name"></member-card>` into the `<card-carousel>`.

Your help in giving our newer members resources to start them on their way is much appreciated.

------

## Using a Custom Set of Browsers For Testing

Create a file in the project root called `testing-browsers.json`.  In it, put an array of strings of the desired browsers.  For example:

```
[
  "default",
  "firefox",
  "google chrome",
  "safari",
  "opera",
  "iexplore"
]
```

Please note, `"default"` corresponds to your currently selected default browser.  Also, Microsoft Edge is not supported because it is weird.  Sorry, I tried to make it work, but it just doesn't.  You will have to open in manually and paste in the URL.

That's it.  Only the browser(s) you put in `testing-browsers.json` should now open up when you run `gulp serve`.

------

<a name="restrictions"></a>
\* Certain restrictions apply: keep it PG and PC, no viruses or ads.  Club leadership reserves the right to make any changes we deem necessary to keep your page appropriate.
