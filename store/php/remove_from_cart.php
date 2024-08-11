<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['cart'])) {
    $key = array_search($data['productId'], $_SESSION['cart']);
    if ($key !== false) {
        unset($_SESSION['cart'][$key]);
    }
}

echo json_encode(['message' => 'Produkt usunięty z koszyka']);
?>