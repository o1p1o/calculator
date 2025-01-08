document.getElementById('time-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Получаем данные из формы
    const meetingTime = document.getElementById('meeting-time').value;
    const travelTime = document.getElementById('travel-time').value;
    const collectionTime = document.getElementById('collection-time').value;

    if (!meetingTime || !travelTime || !collectionTime) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Добавляем текущую дату к времени встречи
    const today = new Date();
    const [meetingHours, meetingMinutes] = meetingTime.split(':');
    const meetingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), meetingHours, meetingMinutes);

    // Преобразуем время в пути и время на сборы в минуты
    const [travelHours, travelMinutes] = travelTime.split(':').map(Number);
    const [collectionHours, collectionMinutes] = collectionTime.split(':').map(Number);

    const totalTravelTime = travelHours * 60 + travelMinutes;
    const totalCollectionTime = collectionHours * 60 + collectionMinutes;

    // Рассчитываем время выхода и начала сборов
    const departureTime = new Date(meetingDate.getTime() - totalTravelTime * 60 * 1000);
    const collectionStartTime = new Date(departureTime.getTime() - totalCollectionTime * 60 * 1000);

    // Формируем результат
    const result = `
        Время, когда нужно выйти из дома: ${departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>
        Время, когда нужно начать собираться: ${collectionStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    `;

    document.getElementById('result').innerHTML = result;
});
