window.addEventListener('DOMContentLoaded', function () {
  bindDeleteTweetButton();
});

function bindDeleteTweetButton() {
  const elements = document.querySelectorAll('.btn-danger');

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const tweetsContainer = document.querySelector('#tweet-list-container');

    element.addEventListener('click', function (event) {
      const tweetId = event.target.getAttribute('tweetid');

      axios
        .delete('/tweets/' + tweetId)
        .then(function (response) {
          tweetsContainer.innerHTML = response.data;
          bindDeleteTweetButton();
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
}
