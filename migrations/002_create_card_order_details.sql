
-- Migration: Save business card order details in their own table,
-- linked to your existing orders table.

CREATE TABLE card_order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(40) NOT NULL,          -- Link to your existing orders.id (type: string/UUID)
    -- Personal & company info
    nama VARCHAR(120) NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    perusahaan VARCHAR(120) NOT NULL,
    telepon VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL,
    alamat VARCHAR(255),
    website VARCHAR(120),
    -- Card design info
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
    -- Payment ~useful for UI/history, main payment fields are in orders table
    payment_option VARCHAR(32),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
);

-- Stores the absolute position of each element in the card preview, referenced by card_order_details.id
CREATE TABLE card_element_positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_order_details_id INT NOT NULL,
    element_key VARCHAR(40) NOT NULL, -- e.g. "name", "logo"
    x INT NOT NULL,
    y INT NOT NULL,
    FOREIGN KEY (card_order_details_id) REFERENCES card_order_details(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_card_order_details_order_id ON card_order_details(order_id);
CREATE INDEX idx_card_element_positions_card_details_id ON card_element_positions(card_order_details_id);

-- 
-- Usage:
-- 1. Create the main order row in your existing "orders" table.
-- 2. Insert the card details in "card_order_details" with order_id from the main order.
-- 3. Insert the design element positions in "card_element_positions" (with card_order_details_id referencing the design row above).
