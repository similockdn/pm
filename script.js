// Data Storage
let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let receipts = JSON.parse(localStorage.getItem('receipts')) || [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDate();
    renderPermissionsTable();
    renderPricingTable();
    renderOrdersHistory();
    renderReceiptsHistory();
    renderInventoryTable();
    updateDashboard();

    // Add event listeners
    document.getElementById('addUserForm').addEventListener('submit', addUser);
    document.getElementById('addProductForm').addEventListener('submit', addProduct);
    document.getElementById('createOrderForm').addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('warehouseReceiptForm').addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('warehouseExportForm').addEventListener('submit', (e) => e.preventDefault());
});

// Set default dates
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('orderDate').value = today;
    document.getElementById('receiptDate').value = today;
    document.getElementById('exportDate').value = today;
}

// ==================== TAB NAVIGATION ====================
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Activate corresponding button
    event.target.classList.add('active');
}

function showWarehouseTab(tabName) {
    // Hide all warehouse content
    document.querySelectorAll('.warehouse-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Deactivate all warehouse buttons
    document.querySelectorAll('.warehouse-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected content
    document.getElementById(tabName).classList.add('active');
    
    // Activate corresponding button
    event.target.classList.add('active');
}

// ==================== PERMISSIONS MANAGEMENT ====================
function addUser(e) {
    e.preventDefault();

    const user = {
        id: Date.now(),
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        permissions: {
            view: true,
            add: document.getElementById('userRole').value !== 'viewer',
            edit: document.getElementById('userRole').value === 'admin' || document.getElementById('userRole').value === 'manager',
            delete: document.getElementById('userRole').value === 'admin'
        }
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('addUserForm').reset();
    renderPermissionsTable();
    updateDashboard();
    alert('Thêm người dùng thành công!');
}

function renderPermissionsTable() {
    const tbody = document.getElementById('permissionsTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${getRoleLabel(user.role)}</td>
            <td><input type="checkbox" ${user.permissions.view ? 'checked' : ''} onchange="updatePermission(${user.id}, 'view', this.checked)"></td>
            <td><input type="checkbox" ${user.permissions.add ? 'checked' : ''} onchange="updatePermission(${user.id}, 'add', this.checked)"></td>
            <td><input type="checkbox" ${user.permissions.edit ? 'checked' : ''} onchange="updatePermission(${user.id}, 'edit', this.checked)"></td>
            <td><input type="checkbox" ${user.permissions.delete ? 'checked' : ''} onchange="updatePermission(${user.id}, 'delete', this.checked)"></td>
            <td>
                <button class="btn-edit" onclick="editUser(${user.id})">Sửa</button>
                <button class="btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updatePermission(userId, permission, value) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.permissions[permission] = value;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function deleteUser(userId) {
    if (confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
        users = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        renderPermissionsTable();
        updateDashboard();
    }
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        deleteUser(userId);
    }
}

function getRoleLabel(role) {
    const labels = {
        'admin': '👑 Admin',
        'manager': '👔 Quản Lý',
        'staff': '👨 Nhân Viên',
        'viewer': '👁️ Xem Dữ Liệu'
    };
    return labels[role] || role;
}

// ==================== PRICING MANAGEMENT ====================
function addProduct(e) {
    e.preventDefault();

    const product = {
        id: Date.now(),
        code: document.getElementById('productCode').value,
        name: document.getElementById('productName').value,
        unit: document.getElementById('productUnit').value,
        prices: {
            import: parseFloat(document.getElementById('importPrice').value),
            distributor: parseFloat(document.getElementById('distributorPrice').value),
            collaborator: parseFloat(document.getElementById('collaboratorPrice').value),
            retail: parseFloat(document.getElementById('retailPrice').value)
        }
    };

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Add to inventory
    inventory.push({
        productId: product.id,
        quantity: 0,
        lastUpdate: new Date().toISOString()
    });
    localStorage.setItem('inventory', JSON.stringify(inventory));

    document.getElementById('addProductForm').reset();
    renderPricingTable();
    renderInventoryTable();
    updateDashboard();
    alert('Thêm sản phẩm thành công!');
}

function renderPricingTable() {
    const tbody = document.getElementById('pricingTableBody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const profit = ((product.prices.retail - product.prices.import) / product.prices.import * 100).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.unit}</td>
            <td>${formatPrice(product.prices.import)}</td>
            <td>${formatPrice(product.prices.distributor)}</td>
            <td>${formatPrice(product.prices.collaborator)}</td>
            <td>${formatPrice(product.prices.retail)}</td>
            <td class="text-success">${profit}%</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${product.id})">Sửa</button>
                <button class="btn-danger" onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteProduct(productId) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
        products = products.filter(p => p.id !== productId);
        inventory = inventory.filter(i => i.productId !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('inventory', JSON.stringify(inventory));
        renderPricingTable();
        renderInventoryTable();
        updateDashboard();
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productCode').value = product.code;
        document.getElementById('productName').value = product.name;
        document.getElementById('productUnit').value = product.unit;
        document.getElementById('importPrice').value = product.prices.import;
        document.getElementById('distributorPrice').value = product.prices.distributor;
        document.getElementById('collaboratorPrice').value = product.prices.collaborator;
        document.getElementById('retailPrice').value = product.prices.retail;
        deleteProduct(productId);
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// ==================== ORDER MANAGEMENT ====================
function addOrderItem() {
    const tbody = document.getElementById('orderItemsBody');
    const rowCount = tbody.querySelectorAll('tr').length;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td>
            <select class="product-select" onchange="updateOrderItem(this)">
                <option value="">-- Chọn sản phẩm --</option>
                ${products.map(p => `<option value="${p.id}" data-price="${p.prices.retail}">${p.name}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" class="quantity" min="1" value="1" onchange="updateOrderItem(this)"></td>
        <td class="unit-price">0</td>
        <td class="total">0</td>
        <td><button class="btn-danger" onclick="this.parentElement.parentElement.remove(); updateOrderTotal()">Xóa</button></td>
    `;
    
    // Remove the add button row
    const addRow = tbody.querySelector('.add-item-row');
    if (addRow) addRow.remove();
    
    tbody.appendChild(row);
    tbody.appendChild(document.createElement('tr')).classList.add('add-item-row');
    tbody.lastChild.innerHTML = `
        <td colspan="6">
            <button type="button" class="btn-secondary" onclick="addOrderItem()">+ Thêm Sản Phẩm</button>
        </td>
    `;
}

function updateOrderItem(element) {
    const row = element.closest('tr');
    const select = row.querySelector('.product-select');
    const quantity = row.querySelector('.quantity');
    const unitPriceCell = row.querySelector('.unit-price');
    const totalCell = row.querySelector('.total');
    
    const product = products.find(p => p.id == select.value);
    if (product) {
        const unitPrice = product.prices.retail;
        const total = unitPrice * quantity.value;
        
        unitPriceCell.textContent = formatPrice(unitPrice);
        totalCell.textContent = formatPrice(total);
    }
    
    updateOrderTotal();
}

function updateOrderTotal() {
    const rows = document.querySelectorAll('#orderItemsBody tr:not(.add-item-row)');
    let total = 0;
    
    rows.forEach(row => {
        const totalCell = row.querySelector('.total');
        const text = totalCell.textContent;
        const price = parseFloat(text.replace(/[^\d.-]/g, ''));
        if (!isNaN(price)) total += price;
    });
    
    document.getElementById('totalAmount').textContent = formatPrice(total);
    document.getElementById('finalAmount').textContent = formatPrice(total);
}

function saveOrder() {
    const orderCode = 'ĐH' + Date.now();
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const orderDate = document.getElementById('orderDate').value;
    
    if (!customerName || !customerEmail) {
        alert('Vui lòng điền đầy đủ thông tin khách hàng!');
        return;
    }
    
    const rows = document.querySelectorAll('#orderItemsBody tr:not(.add-item-row)');
    if (rows.length === 0) {
        alert('Vui lòng thêm sản phẩm vào đơn!');
        return;
    }
    
    const items = [];
    rows.forEach(row => {
        const select = row.querySelector('.product-select');
        const product = products.find(p => p.id == select.value);
        if (product) {
            items.push({
                productId: product.id,
                productName: product.name,
                quantity: parseInt(row.querySelector('.quantity').value),
                price: product.prices.retail,
                total: parseFloat(row.querySelector('.total').textContent.replace(/[^\d.-]/g, ''))
            });
        }
    });
    
    const totalAmount = parseFloat(document.getElementById('totalAmount').textContent.replace(/[^\d.-]/g, ''));
    
    const order = {
        id: Date.now(),
        code: orderCode,
        date: orderDate,
        customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: customerAddress
        },
        items: items,
        total: totalAmount,
        status: 'pending'
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    alert('Lưu đơn hàng thành công! Mã đơn: ' + orderCode);
    resetOrder();
    renderOrdersHistory();
    updateDashboard();
}

function resetOrder() {
    document.getElementById('createOrderForm').reset();
    document.getElementById('orderItemsBody').innerHTML = `
        <tr class="add-item-row">
            <td colspan="6">
                <button type="button" class="btn-secondary" onclick="addOrderItem()">+ Thêm Sản Phẩm</button>
            </td>
        </tr>
    `;
    updateOrderTotal();
    setDefaultDate();
}

function renderOrdersHistory() {
    const tbody = document.getElementById('ordersHistoryBody');
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.code}</td>
            <td>${order.date}</td>
            <td>${order.customer.name}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="text-info">${order.status}</span></td>
            <td>
                <button class="btn-edit" onclick="printOrder(${order.id})">In</button>
                <button class="btn-danger" onclick="deleteOrder(${order.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteOrder(orderId) {
    if (confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        renderOrdersHistory();
        updateDashboard();
    }
}

function printOrderA5() {
    const rows = document.querySelectorAll('#orderItemsBody tr:not(.add-item-row)');
    if (rows.length === 0) {
        alert('Vui lòng thêm sản phẩm vào đơn!');
        return;
    }
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const totalAmount = document.getElementById('totalAmount').textContent;
    
    let itemsHTML = '';
    rows.forEach((row, index) => {
        const select = row.querySelector('.product-select');
        const product = products.find(p => p.id == select.value);
        if (product) {
            const quantity = row.querySelector('.quantity').value;
            const total = row.querySelector('.total').textContent;
            itemsHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td style="text-align: right;">${quantity}</td>
                    <td style="text-align: right;">${row.querySelector('.unit-price').textContent}</td>
                    <td style="text-align: right;">${total}</td>
                </tr>
            `;
        }
    });
    
    const printContent = `
        <div class="a5-paper">
            <div style="text-align: center; margin-bottom: 10px;">
                <h2 style="margin: 0; font-size: 14pt;">HÓA ĐƠN BÁN HÀNG</h2>
                <p style="margin: 0; font-size: 10pt;">Ngày: ${new Date().toLocaleDateString('vi-VN')}</p>
            </div>
            
            <div style="font-size: 10pt; margin-bottom: 10px;">
                <p style="margin: 3px 0;"><strong>KH:</strong> ${customerName}</p>
                <p style="margin: 3px 0;"><strong>ĐT:</strong> ${customerPhone}</p>
                <p style="margin: 3px 0;"><strong>ĐC:</strong> ${customerAddress}</p>
            </div>
            
            <table style="width: 100%; font-size: 9pt; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px solid black;">
                        <th style="text-align: left; padding: 3px;">STT</th>
                        <th style="text-align: left; padding: 3px;">Sản Phẩm</th>
                        <th style="text-align: right; padding: 3px;">SL</th>
                        <th style="text-align: right; padding: 3px;">Giá</th>
                        <th style="text-align: right; padding: 3px;">T.Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
            
            <div style="margin-top: 10px; border-top: 1px solid black; padding-top: 5px; font-size: 11pt;">
                <p style="margin: 0; text-align: right;"><strong>Tổng: ${totalAmount}</strong></p>
            </div>
            
            <div style="text-align: center; margin-top: 10px; font-size: 9pt;">
                <p style="margin: 3px 0;">Cảm ơn quý khách!</p>
            </div>
        </div>
    `;
    
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .a5-paper { width: 148mm; height: 210mm; padding: 10mm; margin: 0 auto; }
                @media print {
                    body { margin: 0; }
                    .a5-paper { margin: 0; box-shadow: none; }
                }
            </style>
        </head>
        <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function printOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    let itemsHTML = '';
    order.items.forEach((item, index) => {
        itemsHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productName}</td>
                <td style="text-align: right;">${item.quantity}</td>
                <td style="text-align: right;">${formatPrice(item.price)}</td>
                <td style="text-align: right;">${formatPrice(item.total)}</td>
            </tr>
        `;
    });
    
    const printContent = `
        <div class="a5-paper">
            <div style="text-align: center; margin-bottom: 10px;">
                <h2 style="margin: 0; font-size: 14pt;">HÓA ĐƠN BÁN HÀNG</h2>
                <p style="margin: 0; font-size: 10pt;">Mã: ${order.code}</p>
                <p style="margin: 0; font-size: 10pt;">Ngày: ${order.date}</p>
            </div>
            
            <div style="font-size: 10pt; margin-bottom: 10px;">
                <p style="margin: 3px 0;"><strong>KH:</strong> ${order.customer.name}</p>
                <p style="margin: 3px 0;"><strong>ĐT:</strong> ${order.customer.phone}</p>
                <p style="margin: 3px 0;"><strong>ĐC:</strong> ${order.customer.address}</p>
            </div>
            
            <table style="width: 100%; font-size: 9pt; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px solid black;">
                        <th style="text-align: left; padding: 3px;">STT</th>
                        <th style="text-align: left; padding: 3px;">Sản Phẩm</th>
                        <th style="text-align: right; padding: 3px;">SL</th>
                        <th style="text-align: right; padding: 3px;">Giá</th>
                        <th style="text-align: right; padding: 3px;">T.Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
            
            <div style="margin-top: 10px; border-top: 1px solid black; padding-top: 5px; font-size: 11pt;">
                <p style="margin: 0; text-align: right;"><strong>Tổng: ${formatPrice(order.total)}</strong></p>
            </div>
            
            <div style="text-align: center; margin-top: 10px; font-size: 9pt;">
                <p style="margin: 3px 0;">Cảm ơn quý khách!</p>
            </div>
        </div>
    `;
    
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .a5-paper { width: 148mm; height: 210mm; padding: 10mm; margin: 0 auto; }
                @media print {
                    body { margin: 0; }
                    .a5-paper { margin: 0; box-shadow: none; }
                }
            </style>
        </head>
        <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ==================== WAREHOUSE MANAGEMENT ====================
function addReceiptItem() {
    const tbody = document.getElementById('receiptItemsBody');
    const rowCount = tbody.querySelectorAll('tr').length;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td>
            <select class="product-select" onchange="updateReceiptItem(this)">
                <option value="">-- Chọn sản phẩm --</option>
                ${products.map(p => `<option value="${p.id}" data-code="${p.code}" data-price="${p.prices.import}">${p.name}</option>`).join('')}
            </select>
        </td>
        <td class="product-code">-</td>
        <td><input type="number" class="quantity" min="1" value="1" onchange="updateReceiptItem(this)"></td>
        <td class="import-price">0</td>
        <td class="total">0</td>
        <td><button class="btn-danger" onclick="this.parentElement.parentElement.remove(); updateReceiptTotal()">Xóa</button></td>
    `;
    
    // Remove the add button row
    const addRow = tbody.querySelector('.add-item-row');
    if (addRow) addRow.remove();
    
    tbody.appendChild(row);
    tbody.appendChild(document.createElement('tr')).classList.add('add-item-row');
    tbody.lastChild.innerHTML = `
        <td colspan="7">
            <button type="button" class="btn-secondary" onclick="addReceiptItem()">+ Thêm Sản Phẩm</button>
        </td>
    `;
}

function updateReceiptItem(element) {
    const row = element.closest('tr');
    const select = row.querySelector('.product-select');
    const quantity = row.querySelector('.quantity');
    const productCode = row.querySelector('.product-code');
    const importPriceCell = row.querySelector('.import-price');
    const totalCell = row.querySelector('.total');
    
    const product = products.find(p => p.id == select.value);
    if (product) {
        const importPrice = product.prices.import;
        const total = importPrice * quantity.value;
        
        productCode.textContent = product.code;
        importPriceCell.textContent = formatPrice(importPrice);
        totalCell.textContent = formatPrice(total);
    }
    
    updateReceiptTotal();
}

function updateReceiptTotal() {
    const rows = document.querySelectorAll('#receiptItemsBody tr:not(.add-item-row)');
    let total = 0;
    
    rows.forEach(row => {
        const totalCell = row.querySelector('.total');
        const text = totalCell.textContent;
        const price = parseFloat(text.replace(/[^\d.-]/g, ''));
        if (!isNaN(price)) total += price;
    });
    
    document.getElementById('receiptTotal').textContent = formatPrice(total);
}

function saveReceipt() {
    const receiptCode = 'PN' + Date.now();
    const supplierName = document.getElementById('supplierName').value;
    const receiptDate = document.getElementById('receiptDate').value;
    
    if (!supplierName) {
        alert('Vui lòng điền tên nhà cung cấp!');
        return;
    }
    
    const rows = document.querySelectorAll('#receiptItemsBody tr:not(.add-item-row)');
    if (rows.length === 0) {
        alert('Vui lòng thêm sản phẩm vào phiếu!');
        return;
    }
    
    const items = [];
    rows.forEach(row => {
        const select = row.querySelector('.product-select');
        const product = products.find(p => p.id == select.value);
        if (product) {
            const qty = parseInt(row.querySelector('.quantity').value);
            items.push({
                productId: product.id,
                productCode: product.code,
                productName: product.name,
                quantity: qty,
                price: product.prices.import,
                total: parseFloat(row.querySelector('.total').textContent.replace(/[^\d.-]/g, ''))
            });
            
            // Update inventory
            const inv = inventory.find(i => i.productId == product.id);
            if (inv) {
                inv.quantity += qty;
            } else {
                inventory.push({
                    productId: product.id,
                    quantity: qty,
                    lastUpdate: new Date().toISOString()
                });
            }
        }
    });
    
    const totalAmount = parseFloat(document.getElementById('receiptTotal').textContent.replace(/[^\d.-]/g, ''));
    
    const receipt = {
        id: Date.now(),
        code: receiptCode,
        date: receiptDate,
        supplier: supplierName,
        items: items,
        total: totalAmount
    };
    
    receipts.push(receipt);
    localStorage.setItem('receipts', JSON.stringify(receipts));
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    alert('Lưu phiếu nhập kho thành công! Mã phiếu: ' + receiptCode);
    resetReceipt();
    renderReceiptsHistory();
    renderInventoryTable();
    updateDashboard();
}

function resetReceipt() {
    document.getElementById('warehouseReceiptForm').reset();
    document.getElementById('receiptItemsBody').innerHTML = `
        <tr class="add-item-row">
            <td colspan="7">
                <button type="button" class="btn-secondary" onclick="addReceiptItem()">+ Thêm Sản Phẩm</button>
            </td>
        </tr>
    `;
    updateReceiptTotal();
    setDefaultDate();
}

function renderReceiptsHistory() {
    const tbody = document.getElementById('receiptsHistoryBody');
    tbody.innerHTML = '';
    
    receipts.forEach(receipt => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${receipt.code}</td>
            <td>${receipt.date}</td>
            <td>${receipt.supplier}</td>
            <td>${formatPrice(receipt.total)}</td>
            <td>
                <button class="btn-edit" onclick="printReceipt(${receipt.id})">In</button>
                <button class="btn-danger" onclick="deleteReceipt(${receipt.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteReceipt(receiptId) {
    if (confirm('Bạn chắc chắn muốn xóa phiếu nhập kho này?')) {
        receipts = receipts.filter(r => r.id !== receiptId);
        localStorage.setItem('receipts', JSON.stringify(receipts));
        renderReceiptsHistory();
        updateDashboard();
    }
}

function printReceipt(receiptId) {
    let receipt;
    if (receiptId) {
        receipt = receipts.find(r => r.id === receiptId);
    } else {
        receipt = {
            code: 'PN' + Date.now(),
            date: document.getElementById('receiptDate').value,
            supplier: document.getElementById('supplierName').value,
            items: [],
            total: document.getElementById('receiptTotal').textContent
        };
        
        const rows = document.querySelectorAll('#receiptItemsBody tr:not(.add-item-row)');
        rows.forEach(row => {
            const select = row.querySelector('.product-select');
            const product = products.find(p => p.id == select.value);
            if (product) {
                receipt.items.push({
                    productCode: product.code,
                    productName: product.name,
                    quantity: parseInt(row.querySelector('.quantity').value),
                    price: product.prices.import,
                    total: row.querySelector('.total').textContent
                });
            }
        });
    }
    
    if (!receipt) return;
    
    let itemsHTML = '';
    receipt.items.forEach((item, index) => {
        itemsHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productCode}</td>
                <td>${item.productName}</td>
                <td style="text-align: right;">${item.quantity}</td>
                <td style="text-align: right;">${typeof item.price === 'string' ? item.price : formatPrice(item.price)}</td>
                <td style="text-align: right;">${item.total}</td>
            </tr>
        `;
    });
    
    const printContent = `
        <div class="receipt-form">
            <div style="text-align: center; margin-bottom: 5mm;">
                <h3 style="margin: 0; font-size: 12pt;">PHIẾU NHẬP KHO</h3>
                <p style="margin: 0; font-size: 9pt;">Mã: ${receipt.code}</p>
                <p style="margin: 0; font-size: 9pt;">Ngày: ${receipt.date}</p>
            </div>
            
            <div style="font-size: 9pt; margin-bottom: 5mm;">
                <p style="margin: 1mm 0;"><strong>NCC:</strong> ${receipt.supplier}</p>
            </div>
            
            <table style="width: 100%; font-size: 8pt; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px solid black;">
                        <th style="text-align: left; padding: 1mm;">STT</th>
                        <th style="text-align: left; padding: 1mm;">Mã</th>
                        <th style="text-align: left; padding: 1mm;">Sản Phẩm</th>
                        <th style="text-align: right; padding: 1mm;">SL</th>
                        <th style="text-align: right; padding: 1mm;">Giá</th>
                        <th style="text-align: right; padding: 1mm;">T.Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
            
            <div style="margin-top: 3mm; border-top: 1px solid black; padding-top: 2mm; font-size: 10pt;">
                <p style="margin: 0; text-align: right;"><strong>Tổng: ${receipt.total}</strong></p>
            </div>
        </div>
    `;
    
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .receipt-form { width: 105mm; height: 148mm; padding: 5mm; margin: 0 auto; }
                @media print {
                    body { margin: 0; }
                    .receipt-form { margin: 0; box-shadow: none; page-break-after: always; }
                }
            </style>
        </head>
        <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Export Items
function addExportItem() {
    const tbody = document.getElementById('exportItemsBody');
    const rowCount = tbody.querySelectorAll('tr').length;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td>
            <select class="product-select" onchange="updateExportItem(this)">
                <option value="">-- Chọn sản phẩm --</option>
                ${products.map(p => `<option value="${p.id}" data-price="${p.prices.retail}">${p.name}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" class="quantity" min="1" value="1" onchange="updateExportItem(this)"></td>
        <td class="unit-price">0</td>
        <td class="total">0</td>
        <td><button class="btn-danger" onclick="this.parentElement.parentElement.remove(); updateExportTotal()">Xóa</button></td>
    `;
    
    const addRow = tbody.querySelector('.add-item-row');
    if (addRow) addRow.remove();
    
    tbody.appendChild(row);
    tbody.appendChild(document.createElement('tr')).classList.add('add-item-row');
    tbody.lastChild.innerHTML = `
        <td colspan="6">
            <button type="button" class="btn-secondary" onclick="addExportItem()">+ Thêm Sản Phẩm</button>
        </td>
    `;
}

function updateExportItem(element) {
    const row = element.closest('tr');
    const select = row.querySelector('.product-select');
    const quantity = row.querySelector('.quantity');
    const unitPriceCell = row.querySelector('.unit-price');
    const totalCell = row.querySelector('.total');
    
    const product = products.find(p => p.id == select.value);
    if (product) {
        const unitPrice = product.prices.retail;
        const total = unitPrice * quantity.value;
        
        unitPriceCell.textContent = formatPrice(unitPrice);
        totalCell.textContent = formatPrice(total);
    }
    
    updateExportTotal();
}

function updateExportTotal() {
    const rows = document.querySelectorAll('#exportItemsBody tr:not(.add-item-row)');
    let total = 0;
    
    rows.forEach(row => {
        const totalCell = row.querySelector('.total');
        const text = totalCell.textContent;
        const price = parseFloat(text.replace(/[^\d.-]/g, ''));
        if (!isNaN(price)) total += price;
    });
    
    document.getElementById('exportTotal').textContent = formatPrice(total);
}

function saveExport() {
    const exportCode = 'XK' + Date.now();
    const exportDate = document.getElementById('exportDate').value;
    const exportReason = document.getElementById('exportReason').value;
    
    const rows = document.querySelectorAll('#exportItemsBody tr:not(.add-item-row)');
    if (rows.length === 0) {
        alert('Vui lòng thêm sản phẩm vào phiếu!');
        return;
    }
    
    const items = [];
    rows.forEach(row => {
        const select = row.querySelector('.product-select');
        const product = products.find(p => p.id == select.value);
        if (product) {
            const qty = parseInt(row.querySelector('.quantity').value);
            items.push({
                productId: product.id,
                productName: product.name,
                quantity: qty,
                price: product.prices.retail,
                total: parseFloat(row.querySelector('.total').textContent.replace(/[^\d.-]/g, ''))
            });
            
            // Update inventory
            const inv = inventory.find(i => i.productId == product.id);
            if (inv) {
                inv.quantity -= qty;
                if (inv.quantity < 0) inv.quantity = 0;
            }
        }
    });
    
    const totalAmount = parseFloat(document.getElementById('exportTotal').textContent.replace(/[^\d.-]/g, ''));
    
    const exp = {
        id: Date.now(),
        code: exportCode,
        date: exportDate,
        reason: exportReason,
        items: items,
        total: totalAmount
    };
    
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    alert('Lưu phiếu xuất kho thành công! Mã phiếu: ' + exportCode);
    resetExport();
    renderInventoryTable();
    updateDashboard();
}

function resetExport() {
    document.getElementById('warehouseExportForm').reset();
    document.getElementById('exportItemsBody').innerHTML = `
        <tr class="add-item-row">
            <td colspan="6">
                <button type="button" class="btn-secondary" onclick="addExportItem()">+ Thêm Sản Phẩm</button>
            </td>
        </tr>
    `;
    updateExportTotal();
    setDefaultDate();
}

function printExport() {
    const rows = document.querySelectorAll('#exportItemsBody tr:not(.add-item-row)');
    if (rows.length === 0) {
        alert('Vui lòng thêm sản phẩm vào phiếu!');
        return;
    }
    
    const exportDate = document.getElementById('exportDate').value;
    const exportReason = document.getElementById('exportReason').value;
    
    let itemsHTML = '';
    rows.forEach((row, index) => {
        const select = row.querySelector('.product-select');
        const product = products.find(p => p.id == select.value);
        if (product) {
            const quantity = row.querySelector('.quantity').value;
            const total = row.querySelector('.total').textContent;
            itemsHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td style="text-align: right;">${quantity}</td>
                    <td style="text-align: right;">${row.querySelector('.unit-price').textContent}</td>
                    <td style="text-align: right;">${total}</td>
                </tr>
            `;
        }
    });
    
    const printContent = `
        <div class="a5-paper">
            <div style="text-align: center; margin-bottom: 10px;">
                <h2 style="margin: 0; font-size: 14pt;">PHIẾU XUẤT KHO</h2>
                <p style="margin: 0; font-size: 10pt;">Ngày: ${exportDate}</p>
                <p style="margin: 0; font-size: 10pt;">Lý do: ${exportReason || 'Bán hàng'}</p>
            </div>
            
            <table style="width: 100%; font-size: 9pt; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px solid black;">
                        <th style="text-align: left; padding: 3px;">STT</th>
                        <th style="text-align: left; padding: 3px;">Sản Phẩm</th>
                        <th style="text-align: right; padding: 3px;">SL</th>
                        <th style="text-align: right; padding: 3px;">Giá</th>
                        <th style="text-align: right; padding: 3px;">T.Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
            
            <div style="margin-top: 10px; border-top: 1px solid black; padding-top: 5px; font-size: 11pt;">
                <p style="margin: 0; text-align: right;"><strong>Tổng: ${document.getElementById('exportTotal').textContent}</strong></p>
            </div>
        </div>
    `;
    
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .a5-paper { width: 148mm; height: 210mm; padding: 10mm; margin: 0 auto; }
                @media print {
                    body { margin: 0; }
                    .a5-paper { margin: 0; box-shadow: none; }
                }
            </style>
        </head>
        <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const inv = inventory.find(i => i.productId === product.id);
        const quantity = inv ? inv.quantity : 0;
        const status = quantity <= 5 ? 'status-low' : 'status-normal';
        const statusText = quantity <= 5 ? '⚠️ Thấp' : '✅ Bình Thường';
        const totalValue = quantity * product.prices.import;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td style="text-align: right; font-weight: bold;">${quantity}</td>
            <td style="text-align: right;">${formatPrice(product.prices.import)}</td>
            <td style="text-align: right;">${formatPrice(product.prices.retail)}</td>
            <td style="text-align: right; font-weight: bold;">${formatPrice(totalValue)}</td>
            <td><span class="${status}">${statusText}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function updateDashboard() {
    document.getElementById('userCount').textContent = users.length;
    document.getElementById('productCount').textContent = products.length;
    document.getElementById('orderCount').textContent = orders.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('revenue').textContent = formatPrice(totalRevenue);
}