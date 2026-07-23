// Shared retrieval-practice quiz component for trenchless-technologies lessons.
// Markup contract: .quiz-item wraps .quiz-options, each <button data-correct="true|false"
// data-feedback="...">, and a sibling .quiz-feedback element to fill in on click.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-item").forEach((item) => {
    const feedback = item.querySelector(".quiz-feedback");
    const buttons = item.querySelectorAll(".quiz-options button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.correct === "true";
        buttons.forEach((b) => b.classList.remove("correct", "incorrect"));
        btn.classList.add(isCorrect ? "correct" : "incorrect");
        if (feedback) feedback.textContent = btn.dataset.feedback || "";
      });
    });
  });
});
