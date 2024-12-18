// Function to handle login form submission
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Read users from text file
        const response = await fetch('users.txt');
        const data = await response.text();
        const users = data.split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line));

        // Check if user exists
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Save login session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            // Log login activity
            await logActivity('login', email);
            // Redirect to products page
            window.location.href = 'products.html';
            return true;
        } else {
            alert('Invalid email or password');
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
        return false;
    }
}

// Function to log user activity
async function logActivity(action, email) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${action}: ${email}\n`;
    
    try {
        await fetch('log_activity.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ log: logEntry })
        });
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}
