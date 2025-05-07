$(document).ready(function() {
    function loadTrainingSessions() {
      // Функция для загрузки списка тренировок
      $.ajax({
        url: '/api/training-sessions', // URL для получения списка тренировок
        method: 'GET', // Используем метод GET для получения данных
        dataType: 'json', // Ожидаем данные в формате JSON
        success: function(trainingSessions) {
          // В случае успешного получения данных:
          const container = $('#trainingSessionsList'); // Находим контейнер для списка тренировок
          container.empty(); // Очищаем контейнер от предыдущих данных
  
          trainingSessions.forEach(session => {
            // Для каждой тренировки формируем HTML
            const sessionHTML = `
              <div class="session-container">
                <div class="name">
                  <div class="name-bloc" data-service="${session.name}">${session.name}</div>
                </div>
                <div class="description">
                  <div class="description-bloc">${session.description}</div>
                  <div class="session-date">Дата: ${session.date} Время: ${session.time}</div>
                </div>
                <div class="price">
                  <div class="price-bloc" data-price="500">500₽</div> <!-- Фиксированная цена -->
                </div>
                <div class="button">
                  <button class="button-aboniment addToCartButton" data-service="${session.name}" data-price="500">Добавить в корзину</button>
                  <div class="error-message" style="color: red;"></div>
                </div>
              </div>
            `;
            container.append(sessionHTML); // Добавляем HTML тренировки в контейнер
          });
        },
        error: function() {
          // В случае ошибки при получении данных:
          $('#trainingSessionsList').html('<p style="color: red;">Ошибка при загрузке занятий</p>');
        }
      });
    }
  
    // Добавление абонемента в корзину
    $('#trainingSessionsList').on('click', '.addToCartButton', function() {
      // Обработчик клика на кнопку "Добавить в корзину"
      const serviceName = $(this).data('service'); // Получаем название тренировки
      const price = parseInt($(this).data('price')); // Получаем цену тренировки и преобразуем в число
  
      $.ajax({
        url: '/cart/add', // URL для добавления в корзину (необходимо создать на сервере)
        method: 'POST', // Используем метод POST для отправки данных
        data: { serviceName: serviceName, price: price }, // Отправляем данные в формате URL-encoded
        success: function(response) {
          // В случае успешного добавления в корзину:
          alert(response); // Выводим сообщение от сервера (можно заменить на более красивое уведомление)
          updateCartDisplay(); // Обновляем отображение корзины
        },
        error: function(error) {
          // В случае ошибки при добавлении в корзину:
          alert('Ошибка при добавлении в корзину'); // Выводим сообщение об ошибке
        }
      });
    });
  
    function updateCartDisplay() {
      // Функция для обновления отображения корзины
      $.ajax({
        url: '/cart', // URL для получения данных корзины
        method: 'GET', // Используем метод GET для получения данных
        success: function(cartItems) {
          // В случае успешного получения данных корзины:
          const cartItemsList = $('#cartItemsList'); // Находим элемент списка товаров в корзине
          const cartTotalElement = $('#cartTotalElement'); // Находим элемент для отображения общей суммы
  
          cartItemsList.empty(); // Очищаем список товаров в корзине
          let total = 0; // Обнуляем общую сумму
  
          cartItems.forEach(item => {
            // Для каждого товара в корзине:
            const listItem = $('<li>'); // Создаем элемент списка
            listItem.text(`${item.serviceName} - ${item.price}₽`); // Формируем текст элемента
            total += item.price; // Добавляем цену товара к общей сумме
            cartItemsList.append(listItem); // Добавляем элемент в список
          });
  
          cartTotalElement.text(total); // Обновляем отображение общей суммы
        },
        error: function() {
          // В случае ошибки при получении данных корзины:
          alert('Ошибка при получении данных корзины'); // Выводим сообщение об ошибке
        }
      });
    }
  
    loadTrainingSessions(); // Загружаем список тренировок при загрузке страницы
    updateCartDisplay(); // Обновляем отображение корзины при загрузке страницы
  });