const form = document.getElementById("formData");
let userName
let title
let date
let like = document.querySelector(".heart");

/* like.addEventListener("click", function() {
    like.classList.toggle("is-active");
});
 */

form.addEventListener("submit", function(event) {
    event.preventDefault();

    userName = form.userName.value
    title = form.title.value
    date = form.date.value
    
    uploadData(userName, title, date)

    console.log(date);
    form.reset()
})

      
async function uploadData(userName, title, date) {
    const data = { userName, title, date };
  
    try {
      const response = await fetch("/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
  
      const responseText = await response.json();
  
      console.log(responseText);
      
    } catch (error) {
      alert(error);
      console.log(error);
    }
}