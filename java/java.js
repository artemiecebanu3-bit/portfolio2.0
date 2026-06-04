 // 1. Открытие модалок при клике на элементы галереи
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const link = item.closest('a') || item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.replace('#', '');
                    const dialog = document.getElementById(targetId);
                    
                    if (dialog && dialog.tagName === 'DIALOG') {
                        e.preventDefault(); 
                        dialog.showModal();
                    }
                }
            }
        });
    });

    // 2. Закрытие модалок при клике на крестик или фон
document.querySelectorAll('dialog.fullscreen-overlay').forEach(dialog => {
    
    // А) Ловим клик по прозрачному фону (пустому месту)
    const closeArea = dialog.querySelector('.overlay-close-area');
    if (closeArea) {
        closeArea.addEventListener('click', (e) => {
            e.preventDefault();
            dialog.close();
        });
    }

    // Б) Ловим клик НАПРЯМУЮ по крестику (железобетонный метод для мобилок)
    const closeBtn = dialog.querySelector('.close-overlay');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Запрещаем клику "лететь" дальше сквозь элементы
            dialog.close();
        });
    }
});

    // 3. НОВОЕ: Логика работы стрелок "Вперед" и "Назад"
    // Собираем все диалоги в массив, чтобы знать их порядок
    const allDialogs = Array.from(document.querySelectorAll('dialog.fullscreen-overlay'));

    allDialogs.forEach((dialog, index) => {
        // Находим стрелки внутри текущего диалога
        const prevBtn = dialog.querySelector('.prev-overlay');
        const nextBtn = dialog.querySelector('.next-overlay');

        // Клик на стрелку "Вправо" (Вперед)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                dialog.close(); // Закрываем текущий
                const nextIndex = (index + 1) % allDialogs.length; // Ищем следующий (если конец — вернет к первому)
                allDialogs[nextIndex].showModal(); // Открываем следующий
            });
        }

        // Клик на стрелку "Влево" (Назад)
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                dialog.close(); // Закрываем текущий
                const prevIndex = (index - 1 + allDialogs.length) % allDialogs.length; // Ищем предыдущий
                allDialogs[prevIndex].showModal(); // Открываем предыдущий
            });
        }
    });