const form = document.getElementById("formData");
let userName;
let userPost;
let userDate;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  userName = form.userName.value;
  userPost = form.title.value;
  userDate = form.date.value;

  uploadData(userName, userPost, userDate);
  form.reset();
});

async function uploadData(userName, userPost, userDate) {
  const data = { userName, userPost, userDate };

  try {
    const response = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.json();
    console.log(responseText);

    if (responseText.error === true) {
      throw responseText.message;
    } else {
      alert(responseText.message);
    }
  } catch (error) {
    alert(error || "Error desconocido");
    console.log(error);
  }
}
