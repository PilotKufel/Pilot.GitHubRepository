<?php
session_start();

$cartItems = [];

if (isset($_SESSION['cart']) && count($_SESSION['cart']) > 0) {
    $conn = new mysqli("localhost", "root", "", "shop");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $ids = implode(',', $_SESSION['cart']);
    $sql = "SELECT id, name, price FROM products WHERE id IN ($ids)";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $cartItems[] = $row;
        }
    }

    $conn->close();
}

echo json_encode($cartItems);
?>