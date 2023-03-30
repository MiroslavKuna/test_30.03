const generateButton = document.getElementById("generateButton");
const likedButton = document.getElementById("likedButton");
const dislikedButton = document.getElementById("dislikedButton");

let likedJokes = [];
let dislikedJokes = [];

function generateFirstJoke() {
  $.ajax({
    url: "https://v2.jokeapi.dev/joke/Any",
    method: "GET",
    success: function (data) {
      let textField = document.getElementById("textField");
      let container = document.createElement("div");

      textField.setAttribute("id", "textField");
      container.classList.add("container");
      if (data.setup == undefined || data.delivery == undefined) {
        textField.innerHTML = data.joke;
        document.body.appendChild(container);
        container.appendChild(textField);
        generateLikeDislike();
        generateNewJokeButton();
      } else if (data.setup != undefined && data.delivery != undefined) {
        textField.innerHTML = data.setup + "<br> " + data.delivery;
        document.body.appendChild(container);
        container.appendChild(textField);
        generateLikeDislike();
        generateNewJokeButton();
      }
    },
    error: function (error) {
      let textField = document.createElement("p");
      textField.innerHTML = error;
      document.body.appendChild(textField);
    },
  });
}

function generateLikeDislike() {
  let likeButton = document.createElement("button");
  let dislikeButton = document.createElement("button");
  let container = document.createElement("div");

  container.classList.add("container");
  likeButton.innerHTML = "Like";
  dislikeButton.innerHTML = "Dislike";

  likeButton.setAttribute("id", "likeButton");
  dislikeButton.setAttribute("id", "dislikeButton");
  likeButton.classList.add("btn");
  likeButton.classList.add("btn-success");
  dislikeButton.classList.add("btn");
  dislikeButton.classList.add("btn-danger");

  document.body.appendChild(container);
  container.appendChild(likeButton);
  container.appendChild(dislikeButton);

  likeButton.addEventListener("click", function () {
    likedJokes.push(textField.innerHTML);
    localStorage.setItem("like", likedJokes);
  });

  dislikeButton.addEventListener("click", function () {
    dislikedJokes.push(textField.innerHTML);
    localStorage.setItem("dislike", dislikedJokes);
  });
}

function generateNewJokeButton() {
  let newJokeButton = document.createElement("button");
  let container = document.createElement("div");

  container.classList.add("container");
  newJokeButton.innerHTML = "Generate new joke";
  newJokeButton.setAttribute("id", "newJokeButton");
  newJokeButton.classList.add("btn");
  newJokeButton.classList.add("btn-primary");

  document.body.appendChild(container);
  container.appendChild(newJokeButton);

  newJokeButton.addEventListener("click", function () {
    generateNewJoke();
  });
}

generateButton.addEventListener("click", function () {
  generateFirstJoke();
  generateButton.remove();
});

function generateNewJoke() {
  let textField = document.getElementById("textField");

  $.ajax({
    url: "https://v2.jokeapi.dev/joke/Any",
    method: "GET",
    success: function (data) {
      likedJokes.forEach((element) => {
        if (element == data.joke) {
          generateNewJoke();
        }
        if (element == data.setup || element == data.delivery) {
          generateNewJoke();
        }
      });

      dislikedJokes.forEach((element) => {
        if (element == data.joke) {
          generateNewJoke();
        }
        if (element == data.setup || element == data.delivery) {
          generateNewJoke();
        }
      });

      if (data.setup == undefined || data.delivery == undefined) {
        textField.innerHTML = data.joke;
      } else if (data.setup != undefined && data.delivery != undefined) {
        textField.innerHTML = data.setup + "<br> " + data.delivery;
      }
    },
    error: function (error) {
      let textField = document.getElementById("textField");
      textField.innerHTML = error;
    },
  });
}

likedButton.addEventListener("click", function () {
  let textField = document.getElementById("textField");

  textField.innerHTML = localStorage.getItem("like");

});

dislikedButton.addEventListener("click", function () {
  let textField = document.getElementById("textField");

  textField.innerHTML = localStorage.getItem("dislike");
});