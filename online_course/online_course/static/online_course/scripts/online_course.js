$(document).ready(() => {
  $("#submit-exam").on("click", (e) => {
    const questions = $("[id]").filter((_, el) => el.id.startsWith("question__"));
    Array.from(questions).forEach((q) => {
      const el = $(`#${q.id}`);
      el.css("border", "none");
      $(`#answer-warning-${q.id}`).remove();
      const selectedOption = $(`input[class="form-check-input ${q.id}"]:checked`).val();
      if (!selectedOption) {
        e.preventDefault();
        el.css("border", "2px solid red");
        el.prepend(
          `<p id='answer-warning-${q.id}' style='color: red; margin: 10px 0 0 20px'>Please select an answer(s)!</p>`
        );
      }
    });
  });
});
