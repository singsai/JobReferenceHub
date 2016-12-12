# Referencely

> [Referencely](http://hr50.site:3000) brings the manual task of writing job references to the online world. 
Job applicants invite a friend or colleague to be their job reference, and that person writes it for them.

## Team

  - __Product Owner__: Nick
  - __Scrum Master__: Jarob
  - __Development Team Members__: Kai, Michael, Jarob, Nick

## Table of Contents

1. [Usage](#Usage)

Profile page contains a link to add a reference for that profile.
In the future, there will be a special link created that emails a reference request for the user.

2. [Requirements](#requirements)

- Node 6.5.x
- jQuery 3.1.1,
- React 15.3.2,
- MongoDB
- Mongoose 

## [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    npm install    

## Usage (Run each command from a different command line tab)

>npm run build  
>mongod  
>npm start  

## GIT Rebasing: Steps:
Assuming you have changes to commit from your own local, do Steps 1 and 2 first. Otherwise, skip straight to Step 3:
`1. git add .`  
`2. git commit`  
`3. git checkout -b randomBranchName`  
`4. git pull --rebase upstream master`  
### After fixing conflicts
`5. git add .` *(DO NOT git commit!!)*  
`6. git rebase --continue`  
Now, you can merge w/ your local master branch  
`7. git checkout master`  
`8. git merge randomBranchName`  
`9. git push origin master`  
Now you can do a pull request