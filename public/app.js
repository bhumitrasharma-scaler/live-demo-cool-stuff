const ideaForm = document.getElementById('idea-form');
const ideaInput = document.getElementById('idea-input');
const resultText = document.getElementById('result-text');
const resultGrid = document.getElementById('score-grid');
const feasibilityEl = document.getElementById('score-feasibility');
const interestEl = document.getElementById('score-interest');
const toneEl = document.getElementById('score-tone');

async function submitIdea(event) {
  event.preventDefault();
  const idea = ideaInput.value.trim();

  if (!idea) {
    resultText.textContent = 'Please write a real idea before running the analysis.';
    resultGrid.classList.add('hidden');
    return;
  }

  try {
    const response = await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultText.textContent = data?.error?.message ?? 'Something went wrong.';
      resultGrid.classList.add('hidden');
      return;
    }

    resultText.textContent = data.feedback;
    resultGrid.classList.remove('hidden');
    feasibilityEl.textContent = String(data.feasibility);
    interestEl.textContent = String(data.interest);
    toneEl.textContent = data.tone;
  } catch (error) {
    resultText.textContent = 'The analyser is temporarily unavailable.';
    resultGrid.classList.add('hidden');
    console.error(error);
  }
}

ideaForm.addEventListener('submit', submitIdea);
