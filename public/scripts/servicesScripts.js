 // JavaScript (фрагмент)
 const addToCartButtons = document.querySelectorAll('.button-aboniment');
 addToCartButtons.forEach(button => {
     button.addEventListener('click', () => {
         const serviceName = button.dataset.service;
         const price = parseInt(button.dataset.price);

         $.ajax({
             url: '/cart/add',
             method: 'POST',
            data: { serviceName: serviceName, price: price }, // Правильный синтаксис data
             success: function(response) {
                 alert(response);
                 updateCartDisplay();
             },
             error: function(error) {
                 alert('Ошибка при добавлении в корзину');
             }
         });
     });
 });

 function updateCartDisplay() {
     $.ajax({
         url: '/cart',
         method: 'GET',
         success: function(cartItems) {
             const cartItemsList = document.getElementById('cartItemsList'); // Получаем элемент
             const cartTotalElement = document.getElementById('cartTotalElement'); // Получаем элемент
             cartItemsList.innerHTML = '';
             let total = 0;

             cartItems.forEach(item => {
                 const listItem = document.createElement('li');
                 listItem.textContent = `${item.serviceName} - ${item.price}₽`;
                 total += item.price;
                 cartItemsList.appendChild(listItem);
             });

             cartTotalElement.textContent = total;
         },
         error: function() {
             alert('Ошибка при получении данных корзины');
         }
     });
 }