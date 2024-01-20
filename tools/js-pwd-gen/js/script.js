function generatePassword() {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const special = document.getElementById('special').checked;
    const genButton = document.getElementById('gen');

    const charset = generateCharset(uppercase, lowercase, special);
    const password = generateRandomPassword(length, charset);

    document.getElementById('output').value = password;

    if(genButton.textContent == "Generate Password") {
        genButton.textContent = "Regenerate Password";
    }
}

function generateCharset(uppercase, lowercase, special) {
    let charset = '';

    if (uppercase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (lowercase) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (special) {
        charset += '!@#$%^&*()_-+=<>?/{}[]';
    }

    return charset;
}

function generateRandomPassword(length, charset) {
    let password = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        password += charset.charAt(randomIndex);
    }

    return password;
}

function copyToClipboard() {
    const outputField = document.getElementById('output');
    outputField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

// Update the displayed length value when the slider changes
document.getElementById('length').addEventListener('input', function() {
    document.getElementById('lengthValue').textContent = this.value;
    const warning = document.getElementById('warning');

    if(this.value < 16) {
        warning.classList.remove('hide');
    } else {
        warning.classList.add('hide');
    }
});

document.getElementById('uppercase').addEventListener('change', generatePassword);
document.getElementById('lowercase').addEventListener('change', generatePassword);
document.getElementById('special').addEventListener('change', generatePassword);
document.getElementById('length').addEventListener('input', function () {
    document.getElementById('lengthValue').textContent = this.value;
    generatePassword(); // Call generatePassword() when the slider value changes
});