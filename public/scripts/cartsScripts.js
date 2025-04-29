$(document).ready(function() {
   
   

    function loadCart() {
        
       $.ajax({
         url: '/cart',
         method: 'GET',
         success: function(cartItems) {
          
           const cartItemsList = $('#cartItemsList tbody');
           const cartTotalElement = $('#cartTotalElement');
           cartItemsList.empty();
   
           let total = 0;
   
           cartItems.forEach(item => {
             const listItem = $('<tr>');
             const nameCell = $('<td>').text(item.serviceName);
             const priceCell = $('<td>').text(`${item.price}₽`);
             const deleteCell = $('<td>');
             const deleteButton = $('<button>').text('Удалить').attr('data-cart-item-id', item.id).addClass('delete-button');
             deleteCell.append(deleteButton);
             listItem.append(nameCell, priceCell, deleteCell);
             cartItemsList.append(listItem);
             total += item.price;
           });
   
           cartTotalElement.text(total);
         },
         error: function() {
           alert('Ошибка при загрузке корзины');
         }
       });
     }
   
     loadCart();
   
     $('#cartItemsList').on('click', 'button', function() {
       const cartItemId = $(this).data('cart-item-id');
       $.ajax({
         url: '/cart/remove',
         method: 'POST',
         data: { cartItemId: cartItemId },
         success: function(response) {
           alert(response);
           loadCart();
         },
         error: function() {
           alert('Ошибка при удалении элемента');
         }
       });
     });
   
     $('#clearCartButton').on('click', function() {
       $.ajax({
         url: '/cart/clear',
         method: 'POST',
         success: function(response) {
           alert(response);
           loadCart();
         },
         error: function() {
           alert('Ошибка при очистке корзины');
         }
       });
     });
   
     $('#addToTrainingButton').on('click', function() {
       // Получаем данные корзины непосредственно перед отправкой запроса
       $.ajax({
         url: '/cart',  // Сначала делаем GET запрос для получения данных корзины
         method: 'GET',
         success: function(cartItems) {
           // После успешного получения данных корзины, отправляем POST запрос
           $.ajax({
             url: '/cart/addToTraining',
             method: 'POST',
             contentType: 'application/json',
             data: JSON.stringify({ cart: cartItems }), // Отправляем cartItems
             success: function(response) {
               alert(response);
               location.reload(); // <--- Добавили сюда
             },
             error: function() {
               alert('Ошибка при добавлении в Мои тренировки');
             }
           });
         },
         error: function() {
           alert('Ошибка при загрузке корзины');
         }
       });
     });
   });