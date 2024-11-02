document.getElementById('invoiceForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const cityVillage = document.getElementById('cityVillage').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const year = currentDate.getFullYear();
    const randomNumber = Math.floor(10 + Math.random() * 90);
    const invoiceNumber = `SVEE/CI/${year}/${mobileNumber.slice(-4)}/${randomNumber}`;

    let receiptDetails = `
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Invoice No:</strong> ${invoiceNumber}</p>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
        <p><strong>City / Village:</strong> ${cityVillage}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
    `;

    document.getElementById('receiptDetails').innerHTML = receiptDetails;

    const itemList = document.querySelectorAll('.item-entry');
    let receiptContent = '<table><tr><th>Item</th><th>Quantity</th><th>Rate</th><th>Total</th></tr>';
    let grandTotal = 0;

    itemList.forEach((item) => {
        const itemName = item.querySelector('.item-name').value;
        const itemQuantity = parseInt(item.querySelector('.item-quantity').value);
        const itemRate = parseFloat(item.querySelector('.item-rate').value);
        const itemTotal = itemQuantity * itemRate;
        grandTotal += itemTotal;

        receiptContent += `
            <tr>
                <td>${itemName}</td>
                <td>${itemQuantity}</td>
                <td>${itemRate.toFixed(2)}</td>
                <td>${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    receiptContent += `
        <tr>
            <td colspan="3"><strong>Grand Total</strong></td>
            <td><strong>${grandTotal.toFixed(2)}</strong></td>
        </tr>
    </table>`;

    document.getElementById('receiptContent').innerHTML = receiptContent;
    document.getElementById('receiptContainer').style.display = 'block';
});

document.getElementById('addItemBtn').addEventListener('click', function () {
    const newItem = document.createElement('div');
    newItem.classList.add('item-entry');
    newItem.innerHTML = `
        <input type="text" placeholder="Name of Item / Service" class="item-name" required>
        <input type="number" placeholder="Quantity" class="item-quantity" required>
        <input type="number" placeholder="Rate" class="item-rate" required>
    `;
    document.getElementById('itemList').appendChild(newItem);
});

document.getElementById('printReceiptBtn').addEventListener('click', function () {
    window.print();
});
