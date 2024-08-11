<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

array_push($_SESSION['cart'], $data['productId']);

echo json_encode(['message' => 'Produkt dodany do koszyka']);
?>