# Drake Developers Club

This is the repository for the Drake Developers Club website.  We are a club at Drake High School that focuses on spreading knowledge and passion for software development and coding.  Contact us at [drakedevelopersclub@gmail.com](mailto:drakedevelopersclub@gmail.com), or come to a meeting during lunch on Wednesdays in room 107.

## New Member Instructions

All new members should follow these steps to create their own unique homepage on the website.  If, as you go through this guide you encounter any problems, ask for help from a fellow club member or from Google.  Both are happy to help and can probably get you sorted out.  If any part of the instructions are out of date, confusing, or incomplete, it is also the task of the new member to edit this file and fix any issues with the instructions, once you have solved the issue for yourself. If this seems like a lot to do (it kinda is) just remember you only have to do most of it once.

### Step 1: Get the Software

Development requires software to edit and test your code.  Make sure you have all of the tools listed below.

- **Code Editor.** You will need a text editor to edit your code.  Try one of the ones listed below, or use your own favorite editor if you have one.
  - [Brackets](http://brackets.io/)
  - [Atom](https://atom.io/)
- **Git.** You will need git to upload your code to this online repository.  If you get the Windows or Mac version, make sure you click yes when it asks you if you want to install the command line tools.
  - Linux: Open a terminal and type in `sudo apt-get install git` to get the command line tools.
  - Mac: Download [GitHub for Mac](https://mac.github.com/).
  - Windows: Download [GitHub for Windows](https://windows.github.com/).
- **Node.js and NPM.** You will need these to preview the website and to get the rest of the resources to load the page. You'll learn what this means later on.
  - Windows: Download [Node.js](https://nodejs.org/en/) Node comes with NPM so don't worry about that yet.
  - Linux: Run `sudo apt-get install npm`
  - Mac : Run `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` to get [Homebrew](http://brew.sh/) if you don't already have it, then run `brew install npm`.

### Step 2: Download the Repository

For those who are using the git gui, check out [this resource](https://help.github.com/desktop/guides/contributing/) on how to navigate it's features and do everything you need to get started in the Developers Club.

Open up a terminal or command prompt and type in `mkdir github` (you are making a folder called "github") press enter, then type `cd github` (you are opening that folder).  If you already have a folder where you keep your projects, `cd` to that folder instead.

Type in `git clone https://github.com/DHSDevelopersClub/club-website.git` and press enter.  (you can use SSH too, if you like, it doesn't matter)

If you type in `ls` you should see a folder called `club-website`.  If so, you can close your terminal, you are done with step #2!

### Step 3: Make Your Very Own Folder

Open a file browser and find the project folder (remember it should be called `dhsdevelopersclub.github.io`).  Open it, then open the folder called `app` then the folder called `roster`.  Inside, make a new folder with your first and last name.  No spaces allowed, use `_` instead, but keep the normal capitalization of your name.

For example, someone named "Bobby Smith-Rogers" would make a folder titled `Bobby_Smith-Rogers`.  Someone called "Joe McCandless" would make a folder called `Joe_McCandless`.

### Step 4: Make Your Home Page

Now open the folder with your name on it and make a new file inside it called `index.html`.  Open `index.html` with your favorite code editor, and use your HTML skills to make whatever kind of home page you want for yourself.[*](#restrictions)  If you have no HTML skills, copy and paste this example code into the file.  We will teach you to use HTML later so you can make something more original.

```html
  <!DOCTYPE html>
  
  <html>
    <head>
      <title>--Your Name Here--</title>
    </head>
    <body>
      Hi I'm --Your Name Here-- and I am a member of the Drake Developer's Club.
    </body>
  </html>
```

When you're done, save the file.

### Step 5: Testing Your Home Page

Open up a terminal/comand line and navigate to the `dhsdevelopersclub.github.io` directory. once there run `npm install --global gulp` or of you're on Mac or Linux add `sudo` to the start of the command. This will install a build tool called gulp which helps in the development process.

Next you need to load the rest of the resorces for the page, run `npm install bower` let it do its thing and then run `bower install`. This might take a bit so be patient. What it's doing is grabbing all of the code that we include in out page to make it run so we don't have to write everything. 

Once you have all that downloaded, run `gulp (thing)`. This should open a new tab in your default browser with our club website loaded.

### Step 6: Experiment

Mess around with your code.  If you are new to HTML, ask a fellow club member for help, or check out [http://www.w3schools.com/](http://www.w3schools.com/) for reference or some tutorials.  Feel free to check out other people's pages to see how their code works and manifests into a webpage.  Just don't mess with their files, please.  You can, however copy bits of their code (with their permission) and experiment with it on your own page. For some more in depth tutorials and advanced techniques, check out [http://www.codecademy.com/](http://www.codecademy.com/). You'll notice when you save a change, the page automatically reloads to display your changes. That's thanks to gulp which you installed earlier.

### Step 7: Add your profile Info

Once you're satisfied with your homepage, it's time to let the club know who you are. 
In the top level of your folder add an image called `profile.jpg` this is what will show up above your name so keep it clean!
Next add a `blurb.txt` with a little info about yourself, again, school appropriate.

When you're done, you'll be ready to upload your changes to GitHub.

### Step 8: Upload Your Changes to GitHub
First you need to fork the repository
#### Using the CMD/Terminal

When you are finished, it is time to commit.  "Commit" is an action you can do with Git, it is a way to wrap up your changes into one tidy package with a message to describe what the changes are.  To commit, open a terminal/command line and type in `git add --all` (this flags all of your changes so the commit can scoop them up) then type in `git commit`.

You will be prompted to enter a commit message.  A commit message should be one sentence.  Keep it short, less than sixty letters, and use the imperative form for verbs.  Eg. `Add some images to my home page.` or `Update my index.html.` or `Completely redesign my home page.`  Make it descriptive.  **Do NOT do anything like this:** `Changed stuff` or `i added a title bar and then i added an image of a cat and then i added another image of a cat`.  If you need to add extra description, you can add it below the message.  For example:

```
  Completely redesign my home page.
  
  I added a header bar, replaced the logo, and changed up the color 
  scheme.  I also added a link to another page with a list of 
  projects I have completed.
```

Once you are done with your commit message, save and close the text editor you were using to edit the message.

Now that you have made your commit, it is time to upload your changes.  In the terminal/command line type `git push`.  That should synchronize your changes with this repository.

#### Using the GUI




### Step 9: Edit the README.md File

Make sure to improve this file if you run into any problems.  You can edit this file in much the same way that you edit your index.html.  You can also edit it from the GitHub website.

Happy coding, and welcome to the club!

------

<a name="restrictions"></a>
\* Certain restrictions apply: keep it PG and PC, no viruses or ads.  Club leadership reserves the right to make any changes we deem necessary to keep your page appropriate.


