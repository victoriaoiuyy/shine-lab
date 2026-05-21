/* =======================================================
   ЛАБОРАТОРНА РОБОТА №3: ДИНАМІЧНИЙ HTML ТА JAVASCRIPT
   ======================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // БЛОК 1. ЗАВДАННЯ 4: Текстовий годинник в футері
    // ==========================================
    const footer = document.querySelector("footer");
    if (footer) {
        // Створюємо елемент для годинника
        const clockContainer = document.createElement("div");
        clockContainer.id = "boutique-clock";
        clockContainer.style.fontSize = "0.9rem";
        clockContainer.style.marginTop = "5px";
        clockContainer.style.color = "#ffb5a7";
        footer.appendChild(clockContainer);

        // Функція оновлення часу
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString("uk-UA");
            clockContainer.innerHTML = `Час у бутику Shine: <strong>${timeString}</strong>`;
        }
        // Запускаємо інтервал щосекунди через BOM-метод setInterval
        setInterval(updateClock, 1000);
        updateClock();
    }

    // ==========================================
    // БЛОК 2. ЗАВДАННЯ 4: Координати миші та коди клавіш
    // (Стильна інтерактивна панель відлагодження для інженерів)
    // ==========================================
    const debugPanel = document.createElement("div");
    debugPanel.className = "debug-panel";
    debugPanel.innerHTML = `
        <span>X: <strong id="mouseX">0</strong>, Y: <strong id="mouseY">0</strong></span>
        <span style="margin-left: 15px;">Клавіша: <strong id="keyKey">-</strong> (Код: <strong id="keyCode">-</strong>)</span>
    `;
    document.body.appendChild(debugPanel);

    // Відстеження руху миші
    document.addEventListener("mousemove", (e) => {
        document.getElementById("mouseX").textContent = e.clientX;
        document.getElementById("mouseY").textContent = e.clientY;
    });

    // Відстеження натискання клавіш
    document.addEventListener("keydown", (e) => {
        document.getElementById("keyKey").textContent = e.key === " " ? "Space" : e.key;
        document.getElementById("keyCode").textContent = e.code;
    });

    // ==========================================
    // БЛОК 3. ЗАВДАННЯ 1: Рекламний блок із приховуванням на 1 день
    // Інтегруємо прямо в нашу плаваючу плашку зі знижкою (promo-blob)
    // ==========================================
    const promoBlob = document.querySelector(".promo-blob");
    if (promoBlob) {
        // Перевіряємо, чи є в Cookies запис про приховування реклами
        if (getCookie("hidePromo") === "true") {
            promoBlob.style.display = "none";
        } else {
            // Якщо запису немає, додаємо кнопку "прибрати" (хрестик) на плашку
            const closeBtn = document.createElement("button");
            closeBtn.innerHTML = "&times;";
            closeBtn.className = "promo-blob__close";
            promoBlob.appendChild(closeBtn);

            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Щоб клік по хрестику не спрацював як клік по плашці
                promoBlob.style.transform = "scale(0)";
                setTimeout(() => promoBlob.style.display = "none", 400);

                // Встановлюємо Cookie рівно на 1 день (24 години)
                setCookie("hidePromo", "true", 1);
                alert("Рекламу приховано на 1 день за допомогою Cookies!");
            });
        }
    }

    // ==========================================
    // БЛОК 1. ЗАВДАННЯ 1 та 3: Функція зміни шрифту
    // Кнопка динамічного керування розміром тексту параграфів (Тумблер)
    // ==========================================
    const mainElement = document.querySelector("main");
    if (mainElement) {
        const resizeBtn = document.createElement("button");
        resizeBtn.textContent = "⚙️ Оптимізувати шрифт (15px)";
        resizeBtn.className = "action-btn";
        resizeBtn.style.margin = "15px 0";
        mainElement.insertBefore(resizeBtn, mainElement.firstChild);

        // Змінна для запам'ятовування стану (ввімкнено/вимкнено)
        let isOptimized = false;

        // Функція, що виводить текст із різним розміром (Блок 1, Завдання 1)
        function changeFontSize(element, size) {
            element.style.fontSize = size; // Використовуємо style.fontSize
        }

        resizeBtn.addEventListener("click", () => {
            // Знаходимо всі параграфи на сторінці (Блок 1, Завдання 3)
            const paragraphs = document.getElementsByTagName("p");
            
            if (!isOptimized) {
                // Якщо не оптимізовано -> Вмикаємо 15px та виділяємо текст
                for (let p of paragraphs) {
                    changeFontSize(p, "15px");
                    p.style.fontWeight = "600"; // Робимо трохи жирнішим для наочності
                    p.style.color = "#1d3557"; 
                    p.setAttribute("data-custom-style", "optimized");
                }
                resizeBtn.textContent = "↩️ Повернути стандартний шрифт";
                isOptimized = true; // Змінюємо стан
            } else {
                // Якщо вже оптимізовано -> Повертаємо все як було
                for (let p of paragraphs) {
                    changeFontSize(p, ""); // Порожній рядок скидає inline-стиль
                    p.style.fontWeight = "";
                    p.style.color = "";
                    p.removeAttribute("data-custom-style");
                }
                resizeBtn.textContent = "⚙️ Оптимізувати шрифт (15px)";
                isOptimized = false; // Змінюємо стан
            }
        });
    }
});

// --- Допоміжні функції для роботи з Cookies (Теорія з Таблиці 1 та опису лаби) ---
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}