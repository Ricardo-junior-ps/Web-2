document.getElementById("botaoProcurar").addEventListener("click", () => {
  const cidade = document.getElementById("inputCidade").value;
  const divResultado = document.getElementById("resultado");
  divResultado.innerHTML = "Buscando...";

  if (!cidade.trim()) { // Verifica se o campo está vazio ou contém apenas espaços em branco.
    divResultado.innerHTML = "<p>Por favor, digite o nome de uma cidade.</p>";
    return;
  }

  // Obter coordenadas (latitude e longitude), usando a API de geocodificação do Open-Meteo
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`)
    .then(response => response.json())
    .then(data => { // Verifica se a resposta contém resultados
      if (!data.results || data.results.length === 0) {
        throw new Error("Cidade não encontrada.");
      }

      const location = data.results[0];
      const { latitude, longitude, name, country } = location;

      // Buscar previsão do tempo usando latitude e longitude
      return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(res => res.json())
        .then(weather => {
          const { daily } = weather; // Extrai os dados diários da previsão
          let html = `<h2>Previsão para os próximos 7 dias - ${name}, ${country}</h2>`;

          for (let i = 0; i < daily.time.length; i++) { //Retorna os valores dos proxímos 7 dias e imprime no html
            html += `
              <div class="weather-card">
                <strong>${daily.time[i]}</strong><br>
                Máx: ${daily.temperature_2m_max[i]}°C<br>
                Mín: ${daily.temperature_2m_min[i]}°C
              </div>
            `;
          }

          divResultado.innerHTML = html;
        });
    })
    .catch(err => {
      console.error(err);
      divResultado.innerHTML = `<p>Erro ao buscar dados. Verifique o nome da cidade e tente novamente.</p>`;
    });
});
