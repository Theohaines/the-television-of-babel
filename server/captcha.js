async function verifyCaptcha(token) {
    try {
        let verificationRequest = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "body": `secret=${process.env.RECAPTCHA}&response=${token}`
        });
        let verificationResult = await verificationRequest.json();

        return verificationResult.success;
    } catch (err) {
        console.log(err.toString());
        return false;
    }
}

module.exports = verifyCaptcha;