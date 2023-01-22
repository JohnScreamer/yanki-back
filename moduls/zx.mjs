// import axios from "axios";
const input = document.querySelector(".input");
const btn = document.querySelector(".go");
const i = document.querySelector(".img");
const load = document.querySelector(".load");
let userIMG = null;
input.addEventListener("change", async function (e) {
    load.style.display = "block";
    e.preventDefault();
    const img = this.files[0];
    const formData = new FormData();
    formData.append("image", img);

    userIMG = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
    })
        .then((data) => data.json())
        .then((data) => data);
    setTimeout(() => (load.style.display = "none"), 2000);
    i.setAttribute("src", `http://localhost:4000${userIMG.uploads}`);
});

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:4000/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: userIMG?.uploads,
            name: "jennie",
            pass: "123",
        }),
    }).then((data) => data.json());
    // .then((data) => data);
    console.log(data);
});
