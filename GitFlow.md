Goal: code collaboratively, working together to build software.

**Display Branch Name In The Terminal**
- Download Ohmyzsh, change themes

**Pull From Upstream Master Daily**
Before you begin coding for the day, pull from the upstream main branch with git pull upstream master.
<git pull origin main> pulling down the latest version of master from GitHub


**Git Commands**
- git log
- git checkout -b branchName(We don’t want to add new code to master directly)
- git diff (show what has been changed or you can see a blue line in VSCode that also indicate changes)
- git diff branchName (compare difference between 2 branches)

**To Resolve a Conflict**
STEP BY STEP
To fix this, we’ll need to do some syncing up of these different code versions:
<git checkout main>
<git pull origin main> pulling down the latest version of master from GitHub
<git checkout featureBranchInConflict> swap to the conflicting branch
<git merge main> merge conflict now happening/visible and fixable on our device, on the feature branch specifically

Note: Be careful with the VSCode buttons — “Keep both changes” can sometimes break things, similarly if there are multiple conflicts in one file I’ve also seen “Accept all incoming changes” or “Accept all current changes”.  These may have unintended side effects

**Add, Commit, and Push**
1. git add . (. -> everything here/in this directory)
2. git commit (standalone, this will open vim or your code editor to write a message — you can also use the -m tag and then add the message in the same command, e.g. git commit -m "this is a commit message")
3. git push <remoteName> <branchName> (Most commonly, we’ve written git push origin master -> origin being the remote for the source we cloned from, and master is the branch name)



**Opening a Pull Request**



**Some takeaways to focus on**
- Use Pull Requests and Reviewers for your git workflow
- Navigating to different branches, and creating new branches, within your project work
- Resolve conflicts between different versions of code
(Note: You won’t always be able to fix merge conflicts on your own — often you’ll have to reach out to the person whose code yours is conflicting with.  So always <git blame> and hunt down the culprit)

**git workflow LINK**

https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow