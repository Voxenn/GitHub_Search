'use strict';

const url = 'https://api.github.com/users';
const options = {
  headers: new Headers({
    "Accept" : "application/vnd.github.v3+json"})
};

function getRepoInfo(search){

  fetch(`${url}/${search}/repos`, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#error-message').text(`An error has occurred: ${err.message}`);
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length ; i++) {
    $('#results-list').append(
      `<li><h3>${i + 1}. <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].name}</p>
      </li>
      `
    )};
    $('#results').removeClass('hidden');
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#user-search').val();
    getRepoInfo(searchTerm);
  });
}

$(document).ready(watchForm);
