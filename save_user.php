<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for JSON response
header('Content-Type: application/json');

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['fullName']) || !isset($data['email']) || !isset($data['password'])) {
        throw new Exception('Missing required fields');
    }

    // Create users file if it doesn't exist
    $usersFile = 'users.txt';
    if (!file_exists($usersFile)) {
        file_put_contents($usersFile, '');
    }

    // Read existing users
    $users = file_get_contents($usersFile);
    $usersList = $users ? explode("\n", trim($users)) : [];

    // Check if email already exists
    foreach ($usersList as $user) {
        $userData = json_decode($user, true);
        if ($userData && $userData['email'] === $data['email']) {
            throw new Exception('Email already registered');
        }
    }

    // Prepare user data
    $newUser = [
        'fullName' => $data['fullName'],
        'email' => $data['email'],
        'password' => password_hash($data['password'], PASSWORD_DEFAULT),
        'created' => date('Y-m-d H:i:s')
    ];

    // Append new user to file
    file_put_contents(
        $usersFile, 
        json_encode($newUser) . "\n", 
        FILE_APPEND | LOCK_EX
    );

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful'
    ]);

} catch (Exception $e) {
    // Return error response
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
