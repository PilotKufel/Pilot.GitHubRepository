<?php
session_start();

if (isset($_SESSION['cart']) && count($_SESSION['cart']) > 0) {
    // Tutaj można dodać logikę zapisania zamówienia w bazie danych

    // Po zakończeniu, wyczyść koszyk
    unset($_SESSION['cart']);
    echo json_encode(['message' => 'Zamówienie zostało złożone']);
} else {
    echo json_encode(['message' => 'Twój koszyk jest pusty']);
}
?>