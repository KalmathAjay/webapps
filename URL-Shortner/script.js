// Select the buttons from the DOM
const shortBtn = document.getElementById("short-btn");
const reloadBtn = document.getElementById("reload-btn");

// Add event listener to the "Shorten URL" button
shortBtn.addEventListener("click", shortenUrl);

// Function to shorten the URL
function shortenUrl() {
  var originalUrl = document.getElementById("originalUrl").value;
  var apiUrl =
    "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(originalUrl);
  shortenedUrlTextarea = document.getElementById("shortenedUrl");

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      shortenedUrlTextarea.value = data;
    })
    .catch((error) => {
      shortenedUrlTextarea.value = "Error : Unable to shorten URL!";
    });
}

// Add event listener to the "Reload" button
reloadBtn.addEventListener("click", () => {
  location.reload();
});
