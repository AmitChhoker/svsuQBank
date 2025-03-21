const button = document.querySelector('button');
const lengthSlider = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');

// Update length value display when slider moves
lengthSlider.addEventListener('input', () => {
    lengthValue.innerText = lengthSlider.value;
});

button.addEventListener('click', () => {
    const length = parseInt(lengthSlider.value);
    const type = document.querySelector('input[name="type"]:checked').value;

    let characters = '';
    if (type === 'numbers') {
        characters = '0123456789';
    } else if (type === 'letters') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    const result = document.getElementById('result');
    result.innerText =  password;
});

copyBtn.addEventListener('click', () => {
    const passwordText = result.innerText.replace('Password: ', '').trim();
    if (passwordText.length > 0) {
        navigator.clipboard.writeText(passwordText).then(() => {
            alert('Password copied to clipboard!');
        });
    } else {
        alert('Generate a password first!');
    }
});
