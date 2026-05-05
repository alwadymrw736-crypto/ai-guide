function toggleGoogleTranslate() {
    const btnText = document.getElementById('current-lang-text');
    const selectField = document.querySelector(".goog-te-combo");

    if (!selectField) {
        alert("المحرك جاري التحميل.. جرب بعد ثانيتين");
        return;
    }

    if (btnText.innerText === "EN") {
        selectField.value = "en";
        selectField.dispatchEvent(new Event('change'));
        document.documentElement.dir = "ltr"; 
        btnText.innerText = "AR";
    } else {
        selectField.value = "ar";
        selectField.dispatchEvent(new Event('change'));
        document.documentElement.dir = "rtl";
        btnText.innerText = "EN";
    }
}
