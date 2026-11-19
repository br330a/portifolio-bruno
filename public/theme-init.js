// Aplica o tema escolhido antes da inicialização do React, sem piscar na tela.
try {
  document.documentElement.dataset.theme = localStorage.getItem('bm-theme') === 'dark' ? 'dark' : 'light'
} catch {
  document.documentElement.dataset.theme = 'light'
}
