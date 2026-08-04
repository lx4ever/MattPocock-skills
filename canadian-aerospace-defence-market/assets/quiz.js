// Shared recall-quiz widget for the Canadian Aerospace, Space and Defence Market workspace.
// Usage: <div class="quiz" data-answer="exact same length answer">
//          <p class="quiz-q">Question text</p>
//          <input class="quiz-input" type="text" placeholder="Type your answer">
//          <button class="quiz-check">Check</button>
//          <p class="quiz-feedback"></p>
//        </div>
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz").forEach((quiz) => {
    const answer = (quiz.dataset.answer || "").trim().toLowerCase();
    const input = quiz.querySelector(".quiz-input");
    const button = quiz.querySelector(".quiz-check");
    const feedback = quiz.querySelector(".quiz-feedback");

    const check = () => {
      const given = (input.value || "").trim().toLowerCase();
      if (!given) return;
      if (given === answer) {
        feedback.textContent = "Correct.";
        feedback.style.color = "#2e6b3e";
      } else {
        feedback.textContent = `Not quite — the answer was "${quiz.dataset.answer}".`;
        feedback.style.color = "#8a2e2e";
      }
    };

    button.addEventListener("click", check);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") check();
    });
  });
});
