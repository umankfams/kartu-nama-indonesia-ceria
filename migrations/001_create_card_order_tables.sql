
-- Migration: Create tables for Card Orders

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nama VARCHAR(120) NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    perusahaan VARCHAR(120) NOT NULL,
    telepon VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL,
    alamat VARCHAR(255),
    website VARCHAR(120),
    -- Design fields
    background VARCHAR(50),
    custom_background VARCHAR(255),
    logo VARCHAR(255),
    font_nama VARCHAR(32) DEFAULT 'font-sans',
    font_nama_color VARCHAR(16) DEFAULT '#18181b',
    font_jabatan VARCHAR(32) DEFAULT 'font-sans',
    font_jabatan_color VARCHAR(16) DEFAULT '#2563eb',
    font_perusahaan VARCHAR(32) DEFAULT 'font-sans',
    font_perusahaan_color VARCHAR(16) DEFAULT '#374151',
    font_kontak VARCHAR(32) DEFAULT 'font-sans',
    font_kontak_color VARCHAR(16) DEFAULT '#111111',
    -- Card specification
    bahan VARCHAR(32) NOT NULL,
    finishing VARCHAR(32),
    jumlah VARCHAR(16) NOT NULL,
    -- Shipping info
    shipping_name VARCHAR(120) NOT NULL,
    shipping_phone VARCHAR(50) NOT NULL,
    shipping_address VARCHAR(255) NOT NULL,
    shipping_note VARCHAR(255),
    -- Payment
    payment_option VARCHAR(32),
    -- Add extra fields as needed
    notes TEXT
);

-- Stores the absolute position of each element in the card preview, referenced by order_id
CREATE TABLE element_positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    element_key VARCHAR(40) NOT NULL, -- e.g. "name", "logo"
    x INT NOT NULL,
    y INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Optionally, index for faster lookup
CREATE INDEX idx_element_positions_order_id ON element_positions(order_id);

/* 
To store an order: insert into `orders`; then insert all JSON `elementPositions` as separate rows in `element_positions` for that order_id, with fields element_key, x, y.
*/

