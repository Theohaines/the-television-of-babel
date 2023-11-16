document.querySelector("#submit").addEventListener("click", () => {

    let password = document.querySelector("#password").value;
    document.cookie = "babeltv_auth=" + password;

    location.href = "/admin";

});