// ===============================
// DOM Manipulation Playground
// ===============================

// ---------- Counter ----------

let count = 0;

const counterValue = document.getElementById("counterValue");
const progressBar = document.getElementById("progressBar");

document.getElementById("increaseBtn").addEventListener("click", () => {
    count++;
    updateCounter();
});

document.getElementById("decreaseBtn").addEventListener("click", () => {
    count--;
    updateCounter();
});

document.getElementById("resetBtn").addEventListener("click", () => {
    count = 0;
    updateCounter();
});

function updateCounter() {

    counterValue.textContent = count;

    counterValue.style.transform = "scale(1.2)";

    setTimeout(() => {
        counterValue.style.transform = "scale(1)";
    }, 150);

    let progress = Math.min(Math.abs(count) * 5, 100);
    progressBar.style.width = progress + "%";
}

// ===============================
// Gradient Generator
// ===============================

const colors = [
"#FF512F",
"#F09819",
"#00C9FF",
"#92FE9D",
"#8E2DE2",
"#4A00E0",
"#FC466B",
"#3F5EFB",
"#43CEA2",
"#185A9D",
"#F953C6",
"#B91D73",
"#00DBDE",
"#FC00FF",
"#F7971E",
"#FFD200"
];

const preview = document.getElementById("colorPreview");
const colorCode = document.getElementById("colorCode");

document.getElementById("generateColor").addEventListener("click", () => {

    const c1 = colors[Math.floor(Math.random() * colors.length)];
    const c2 = colors[Math.floor(Math.random() * colors.length)];

    const gradient = `linear-gradient(135deg, ${c1}, ${c2})`;

    preview.style.background = gradient;
    document.body.style.background = gradient;

    colorCode.textContent = `${c1} → ${c2}`;

});

document.getElementById("copyColor").addEventListener("click", () => {

    navigator.clipboard.writeText(preview.style.background);

    showToast("Gradient CSS Copied!");

});

// ===============================
// Password Generator
// ===============================

const passwordBox = document.getElementById("password");

const slider = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const strengthBar = document.getElementById("strengthBar");

const strengthText = document.getElementById("strengthText");

slider.addEventListener("input", () => {
    lengthValue.textContent = slider.value;
});

document.getElementById("generatePassword").addEventListener("click", generatePassword);

function generatePassword() {

    let chars = "";

    if(document.getElementById("uppercase").checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(document.getElementById("lowercase").checked)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if(document.getElementById("numbers").checked)
        chars += "0123456789";

    if(document.getElementById("symbols").checked)
        chars += "!@#$%^&*()_+-={}[]<>?/";

    if(chars.length === 0){

        alert("Please select at least one option.");

        return;
    }

    let password = "";

    for(let i=0;i<slider.value;i++){

        password += chars.charAt(Math.floor(Math.random()*chars.length));

    }

    passwordBox.value = password;

    updateStrength(password);

}

function updateStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[!@#$%^&*()]/.test(password)) score++;

    let width = score * 20;

    strengthBar.style.width = width + "%";

    if(score <=2){

        strengthBar.style.background = "#ff4d4d";

        strengthText.textContent = "Weak Password";

    }

    else if(score <=4){

        strengthBar.style.background = "#ffb400";

        strengthText.textContent = "Medium Password";

    }

    else{

        strengthBar.style.background = "#00e676";

        strengthText.textContent = "Strong Password";

    }

}

document.getElementById("copyPassword").addEventListener("click",()=>{

    if(passwordBox.value===""){

        showToast("Generate Password First");

        return;

    }

    navigator.clipboard.writeText(passwordBox.value);

    showToast("Password Copied!");

});

// ===============================
// Toast Notification
// ===============================

const toast = document.getElementById("toast");

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// Generate one password on page load
generatePassword();