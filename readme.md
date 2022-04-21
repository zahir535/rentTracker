
APPLICATION TO SAVE DATA REGARDING A HOUSE'S SPENDING
LOCAL STORAGE ONLY - ASYNC STORAGE

AUTOMATIC BEAUTIFY VISUAL CODE
Shift - Alt - F

SYNC TO GITHUB
// initialize repo in local desktop
1. git init
2. git add .
3. git commit -m "First Commit"

// syncing to github repo
4. create a new repo in github
//PUSH AN EXISTING REPO FROM THE COMMAND LINE
5. git remote add origin http://github.com... (github repo http address)
https://github.com/zahir535/dropship-POS
6. git push -u origin main

// TO UPDATE THE LOCAL REPO TO GITHUB REPO
1. git add .
2. git commit -m "second commit/any message"
3. git push

//TO CHECK WHETHER THE LOCAL REPO IS UP TO DATE WITH THE GITHUB REPO
git push --set-upstream origin main

//…or create a new repository on the command line
echo "# dropship-POS" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/zahir535/dropship-POS.git
git push -u origin main

//…or push an existing repository from the command line
git remote add origin https://github.com/zahir535/dropship-POS.git
git branch -M main
git push -u origin main


//GIT BUG
*"The tip of your current branch is behind its remote counterpart"*
SOLUTION: {
    cmd: git push -f origin <main branch name>/main/master
}