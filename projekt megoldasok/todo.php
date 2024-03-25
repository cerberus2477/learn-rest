<?php

// Adatbázis kapcsolódás
$servername = "localhost";
$username = "felhasznalo";
$password = "jelszo";
$database = "todo_app";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
die("Nem sikerült kapcsolódni az adatbázishoz: " . $conn->connect_error);
}

// API végpontok definiálása

// GET /todos
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
$id = $_GET['id'];
$sql = "SELECT * FROM todos WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Todo nem található"));
}
}

// POST /todos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
$description = $data['description'];
$due_date = $data['due_date'];

$sql = "INSERT INTO todos (title, description, due_date) VALUES ('$title', '$description', '$due_date')";
if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    $sql = "SELECT * FROM todos WHERE id = $last_id";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Sikertelen létrehozás"));
}
}

// PUT /todos/{id}
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
$id = $_GET['id'];
$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
$description = $data['description'];
$due_date = $data['due_date'];

$sql = "UPDATE todos SET title='$title', description='$description', due_date='$due_date' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    $sql = "SELECT * FROM todos WHERE id = $id";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Sikertelen frissítés"));
}
}

// DELETE /todos/{id}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
$id = $_GET['id'];
$sql = "DELETE FROM todos WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    http_response_code(204);
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Sikertelen törlés"));
}
}

$conn->close();