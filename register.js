// Handle form submission
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('errorMessage').textContent = '';

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
    };

    try {
        // Send registration request
        const response = await fetch('save_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // Registration successful
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            // Show error message
            document.getElementById('errorMessage').textContent =
                data.message || 'Registration failed. Please try again.';
        }
    } catch (error) {
        // Handle network or other errors
        document.getElementById('errorMessage').textContent =
            'Connection error. Please check your internet and try again.';
        console.error('Registration error:', error);
    }
});