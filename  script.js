document.addEventListener('DOMContentLoaded', function() {
    // --- Элементы страницы ---
    const surpriseBtn = document.getElementById('surpriseBtn');
    const messageBox = document.getElementById('messageBox');
    const mainGif = document.getElementById('mainGif');
    
    // --- Элементы игры ---
    const flowerGarden = document.getElementById('flowerGarden');
    const bouquetFlowers = document.getElementById('bouquetFlowers');
    const bouquetCountSpan = document.getElementById('bouquetCount');
    const resetGameBtn = document.getElementById('resetGame');
    const gameWinMessage = document.getElementById('gameWinMessage');

    // Массив с цветами (эмодзи)
    const flowersArray = ['🌷', '🌹', '🌸', '🌼', '🌻', '🌺', '🪷', '💐', '🌷', '🌼', '🌸', '🌻'];
    
    let collectedFlowers = 0; // Счетчик собранных цветов
    const maxFlowers = 7; // Нужно собрать 7

    // --- Функция для создания сада с цветами ---
    function createGarden() {
        flowerGarden.innerHTML = ''; // Очищаем сад
        // Перемешиваем массив и берем первые 12 цветов для разнообразия
        const shuffled = [...flowersArray].sort(() => 0.5 - Math.random());
        
        for (let i = 0; i < 12; i++) {
            const flower = document.createElement('span');
            flower.className = 'garden-flower';
            flower.textContent = shuffled[i % shuffled.length]; // Цветок эмодзи
            flower.dataset.flowerType = shuffled[i % shuffled.length]; // Сохраняем тип
            flower.addEventListener('click', pickFlower);
            flowerGarden.appendChild(flower);
        }
    }

    // --- Функция сбора цветка ---
    function pickFlower(event) {
        const flower = event.currentTarget;
        
        // Проверяем, не сорван ли уже цветок и не завершена ли игра
        if (flower.classList.contains('picked') || collectedFlowers >= maxFlowers) {
            if (collectedFlowers >= maxFlowers) {
                // Если букет полный, показываем подсказку
                gameWinMessage.classList.add('show');
                setTimeout(() => {
                    gameWinMessage.classList.remove('show');
                }, 2000);
            }
            return;
        }

        // Добавляем цветок в букет
        flower.classList.add('picked');
        
        const flowerType = flower.dataset.flowerType;
        
        // Создаем элемент для букета
        const bouquetItem = document.createElement('span');
        bouquetItem.className = 'bouquet-flower';
        bouquetItem.textContent = flowerType;
        bouquetFlowers.appendChild(bouquetItem);
        
        // Увеличиваем счетчик
        collectedFlowers++;
        bouquetCountSpan.textContent = `${collectedFlowers}/${maxFlowers}`;
        
        // Эффект покачивания гифки при клике (интерактив)
        mainGif.style.transform = 'scale(1.1) rotate(2deg)';
        setTimeout(() => {
            mainGif.style.transform = 'scale(1) rotate(0deg)';
        }, 200);

        // Проверка победы
        if (collectedFlowers === maxFlowers) {
            gameWinMessage.classList.add('show');
            // Добавляем конфетти эффект (имитация)
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    mainGif.style.transform = 'scale(1.2)';
                    mainGif.style.opacity = '0.8';
                    setTimeout(() => {
                        mainGif.style.transform = 'scale(1)';
                        mainGif.style.opacity = '1';
                    }, 200);
                }, i * 150);
            }
        }
    }

    // --- Сброс игры ---
    function resetGame() {
        // Сбрасываем счетчик
        collectedFlowers = 0;
        bouquetCountSpan.textContent = `0/${maxFlowers}`;
        
        // Очищаем букет
        bouquetFlowers.innerHTML = '';
        
        // Убираем класс picked у всех цветов в саду
        const allGardenFlowers = document.querySelectorAll('.garden-flower');
        allGardenFlowers.forEach(flower => {
            flower.classList.remove('picked');
        });
        
        // Прячем сообщение о победе
        gameWinMessage.classList.remove('show');
        
        // Создаем сад заново для нового набора цветов
        createGarden();
    }

    // --- Обработчик кнопки сюрприза ---
    surpriseBtn.addEventListener('click', function() {
        // Показываем сообщение
        messageBox.classList.toggle('show');
        
        // Меняем гифку? (эффект смены кадра, хотя гифка одна)
        mainGif.src = '2.gif'; // Перезагружаем гифку (она начнет сначала, если это возможно)
        // Для принудительной перезагрузки
        const tempSrc = mainGif.src;
        mainGif.src = '';
        mainGif.src = tempSrc;
        
        // Создаем эффект "весеннего ветра" - трясем цветы в саду
        const gardenFlowers = document.querySelectorAll('.garden-flower');
        gardenFlowers.forEach((flower, index) => {
            setTimeout(() => {
                flower.style.transform = 'translateX(5px) rotate(5deg)';
                setTimeout(() => {
                    flower.style.transform = 'translateX(-5px) rotate(-5deg)';
                    setTimeout(() => {
                        flower.style.transform = 'translateX(0) rotate(0deg)';
                    }, 100);
                }, 100);
            }, index * 30); // Волна
        });

        // Показываем всплывающее сердечко (имитация)
        alert('🌷💖 С праздником, мама! 💖🌷'); // Можно заменить на красивое модальное окно, но оставим так для простоты
    });

    // --- Инициализация сада при загрузке ---
    createGarden();

    // --- Обработчик кнопки сброса ---
    resetGameBtn.addEventListener('click', resetGame);

    // --- Дополнительная интерактивность: клик по гифке ---
    mainGif.addEventListener('click', function() {
        this.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
            this.style.filter = 'hue-rotate(0deg)';
        }, 500);
    });

    // --- Эффект "падения лепестков" при движении мыши (просто для красоты) ---
    document.addEventListener('mousemove', function(e) {
        // Создаем маленький лепесток
        if (Math.random() > 0.95) { // 5% шанс при движении
            const petal = document.createElement('div');
            petal.textContent = ['🌸','🌼','🌷'][Math.floor(Math.random()*3)];
            petal.style.position = 'fixed';
            petal.style.left = e.clientX + 'px';
            petal.style.top = e.clientY + 'px';
            petal.style.fontSize = '1.5rem';
            petal.style.pointerEvents = 'none';
            petal.style.zIndex = '9999';
            petal.style.animation = 'float 2s linear forwards';
            document.body.appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, 2000);
        }
    });
});