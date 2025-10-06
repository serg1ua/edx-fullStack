async function runSentimentAnalysis() {
  const el = document.getElementById("alert");
  if (el) {
    el.remove();
  }
  textToAnalyze = document.getElementById("text-to-analyze").value;

  const response = await fetch("sentimentAnalyzer?textToAnalyze" + "=" + textToAnalyze, {
    method: "GET",
  });

  let data = await response.json();
  if (response.status === 200) {
    data = document.getElementById("system-response").innerHTML = `<h5>${data.message}</h5>`;
    return;
  }
  document.getElementById("message").innerHTML = buildAlert(data.message);
}

function buildAlert(message = "Unexpected error happened.") {
  return `
    <div class="alert alert-danger" role="alert" id="alert">
      <strong>Error!</strong> ${message}
    </div>
  `;
}
