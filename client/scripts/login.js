document.querySelector("#submit").addEventListener("click", () => {

    let password = document.querySelector("#password").value;
    document.cookie = `babeltv_auth=${password};max-age=86400;`;

    location.href = "/admin";

});