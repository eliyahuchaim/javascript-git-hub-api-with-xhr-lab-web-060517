// let username;


$(document).ready(function() {

formInput();
displayCommits();
});



function formInput(){
  $('.username').submit(function(input){
    // debugger
    getRepositories()
    event.preventDefault()
  })
};

function getRepositories(){
  let username = document.getElementById('username').value
  // $('#username').val()
  // debugger
  const req = new XMLHttpRequest()
  // debugger
  req.addEventListener('load', displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText)
  // let branchesLink = `- <a href=# data-repo="${repo.name}" onclick="getBranches(this)">Show Branches</a>`
  const repoNames =
   `<ul>${repos.map(repo =>'<li><a href='+repo.html_url+'>'+repo.name+'</a> - <a href="#" data-repo="'+repo.name+'" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo= "'+ repo.name +'" onclick="getBranches(this)">Show Branches</a>' + '</li>').join("")}</ul>`



  document.getElementById('repositories').innerHTML = repoNames
}

// https://github.com/octocat/hello-worId/commits/master

function getCommits(el){
  // let username = $('#username').val()
  let username = document.getElementById('username').value
  var repoName = el.dataset.repo
  // debugger
  let request = new XMLHttpRequest()
  request.addEventListener('load', displayCommits)
  request.open("GET", `https://api.github.com/repos/${username}/${repoName}/commits`)
  request.send()
}

function displayCommits(){
  // debugger
  let commits = JSON.parse(this.responseText)
  const commitItems = `${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' ' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}`
  let detailsHTML = `<ul>${commitItems}</ul>`
  document.getElementById("details").innerHTML = detailsHTML
  // debugger
}

function getBranches(el){
  // let username = $('#username').val()
  let username = document.getElementById('username').value
  let repo = el.dataset.repo
  let request = new XMLHttpRequest()
  request.addEventListener('load', displayBranches)
  request.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
  request.send()
}

function displayBranches(){
  let branches = JSON.parse(this.responseText)
  const repoBranches = `${branches.map(branch => '<li>' + branch.name + '</li>').join(" ")}`
  let branchesHTML = `<ul>${repoBranches}</ul>`
  document.getElementById('details').innerHTML = branchesHTML
}
