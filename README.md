# 📦 StockMaster -- Inventory Management System (IMS)

StockMaster is a modern, modular, and scalable Inventory Management
System (IMS) built with React + Vite + TypeScript. It replaces manual
registers, spreadsheets, and disconnected workflows with a centralized,
real-time stock management platform that supports multi-warehouse
operations.

## 🚀 Features

### 🔐 Authentication

-   User sign-up & login
-   OTP-based password reset
-   Secure local session
-   Redirect to dashboard after login

## 📊 Dashboard Overview

The dashboard shows real-time operational KPIs:

-   Total products in stock
-   Low stock / out-of-stock alerts
-   Pending receipts
-   Pending deliveries
-   Scheduled internal transfers

### Dynamic filtering by:

-   Document type (Receipt / Delivery / Internal / Adjustments)
-   Status (Draft, Waiting, Ready, Done, Canceled)
-   Warehouse / Location
-   Product Category

## 🧩 Core Modules

### 1️⃣ Product Management

-   Add/edit products
-   Track availability across multiple locations
-   Product categories
-   Units of measure
-   SKU/Code support
-   Reorder rules
-   Initial stock option

### 2️⃣ Receipts (Incoming Stock)

Used for vendor goods arrival.

**Workflow:** 1. Create receipt 2. Add supplier & product lines 3. Enter
quantities 4. Validate → stock increases automatically

**Example:**\
Receiving 50 Steel Rods → stock +50

### 3️⃣ Delivery Orders (Outgoing Stock)

Used for customer shipments.

**Workflow:** 1. Pick items 2. Pack items 3. Validate → stock decreases
automatically

**Example:**\
Deliver 10 Chairs → stock −10

### 4️⃣ Internal Transfers

Move goods between: - Warehouses - Racks - Production zones

Stock quantity stays the same; location updates.\
All movements are logged in the stock ledger.

### 5️⃣ Stock Adjustments

Fix mismatches between physical and system stock.

**Steps:** 1. Select product + location 2. Enter counted quantity 3.
System adjusts stock 4. Adjustment is logged

## 🔁 Example Inventory Flow

-   Receive Goods -- +100 kg Steel\
-   Internal Transfer -- Main Store → Production Rack\
-   Delivery -- −20 kg Steel\
-   Damage Adjustment -- −3 kg Steel

Everything is recorded in the ledger.


## ⚙️ Tech Stack

### Frontend

-   React 18
-   TypeScript
-   Vite
-   Tailwind CSS
-   Radix UI
-   Lucide Icons
-   Recharts
-   React Hook Form
-   Embla Carousel
-   Sonner Notifications

### Dev Tools

-   @vitejs/plugin-react-swc
-   TypeScript
-   Node.js (18+)

## 📐 System Diagram

**Excalidraw Inventory Flow Diagram:**\
https://link.excalidraw.com/l/65VNwvy7c4X/3ENvQFu9o8R

## Running the Code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## 👥 Target Users

-   Inventory Managers\
-   Warehouse Staff\
-   Store Supervisors\
-   Admin Teams

## 🔮 Future Enhancements

-   Barcode & QR-code scanning\
-   Vendor & customer modules\
-   AI-based demand forecasting\
-   Mobile app support\
-   Exportable reports (PDF, Excel)





  
