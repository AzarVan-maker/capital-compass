const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
  const income = Number(document.getElementById("income").value);
  const expenses = Number(document.getElementById("expenses").value);
  const savings = Number(document.getElementById("savings").value);
  const goal = Number(document.getElementById("goal").value);

  if (!income || !expenses || !goal) {
    result.innerHTML = `
      <h3>Заполни основные поля</h3>
      <p>Нужно указать доход, расходы и финансовую цель.</p>
    `;
    return;
  }

  const monthlySave = income - expenses;
  const remaining = goal - savings;

  if (monthlySave <= 0) {
    result.innerHTML = `
      <h3>Сейчас цель не двигается</h3>
      <p>Твои расходы равны доходам или выше доходов.</p>
      <p>Чтобы начать путь к цели, нужно либо снизить расходы, либо увеличить доход.</p>
    `;
    return;
  }

  if (remaining <= 0) {
    result.innerHTML = `
      <h3>Цель уже достигнута</h3>
      <p>Текущие накопления уже равны цели или выше неё.</p>
      <p class="highlight">${formatMoney(savings)}</p>
    `;
    return;
  }

  const months = Math.ceil(remaining / monthlySave);
  const years = Math.floor(months / 12);
  const extraMonths = months % 12;

  let timeText = "";

  if (years > 0) {
    timeText = `${years} г. ${extraMonths} мес.`;
  } else {
    timeText = `${months} мес.`;
  }

  let status = "";

  const saveRate = Math.round((monthlySave / income) * 100);

  if (saveRate < 10) {
    status = "Норма накоплений низкая. Попробуй выйти хотя бы на 10–20%.";
  } else if (saveRate <= 30) {
    status = "Хороший уровень. Ты уже двигаешься к финансовой устойчивости.";
  } else {
    status = "Сильный уровень. При такой дисциплине капитал будет расти быстрее.";
  }

  result.innerHTML = `
    <h3>Твой расчёт</h3>
    <p>Ты можешь откладывать в месяц:</p>
    <p class="highlight">${formatMoney(monthlySave)}</p>
    <p>До цели осталось:</p>
    <p class="highlight">${timeText}</p>
    <p>Процент накоплений от дохода: <strong>${saveRate}%</strong></p>
    <p>${status}</p>
  `;
});

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}
