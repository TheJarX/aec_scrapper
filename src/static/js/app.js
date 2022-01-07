const AECRegex = /https?:\/\/aprendoencasa\.pe\/#\/experiencias\/modalidad\/[a-z]+\/[a-z]+\/(\w+-?\.\w+-?\w+)*\/\w+\//;
const loadingMessage = "<div id=\"loading-message\"><h2 >Obteniendo datos...</h2><p>Esto puede tomar un tiempo, chill</p></div>";
const resultsMessage = `
  <div id="results">
    <h3>Se van a descargar estos recursos (:count: en total)</h3>  
    <p>Categorías: :categories:</p>
    <ul>
     :result-items: 
    </ul>
  </div>
`;

window.addEventListener('load', () => {
  // set year in footer
  const yearSpan = document.getElementById('year');
  yearSpan.innerHTML = new Date().getFullYear();

  const downloadBtn = document.getElementById('download-resources-btn');
  const contentContainer = document.getElementById('content');

  // Check url and send request
  downloadBtn.addEventListener('click', (e) => {
    const urlInput = document.getElementById('resources-url');
    const isValidInput = AECRegex.test(urlInput.value);

    if (!isValidInput) {
      alert('Parece que la url no es válida');
      return;
    }

    getData(urlInput.value.trim()).then(data => {
      const items = data.resources.map(resource => `<li><a href="${resource.link}" target="_blank">${resource.title}</a></li>`);
      const listToRender = resultsMessage.replace(':count:', data.resources.length)
                            .replace(':categories:', data.categoriesString)
                            .replace(':result-items:', items.join('\n'));

      contentContainer.innerHTML = listToRender;
    });
  });


  async function getData(AECLink) {
    try {
      contentContainer.innerHTML = loadingMessage;
      downloadBtn.setAttribute('disabled', 'true');

      const req = await fetch('/get-data', {
        method: 'POST',
        body: JSON.stringify({ AECLink }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      downloadBtn.removeAttribute('disabled');

      return req.json();
    } catch (e) {
      console.error(e)
      //location.href = '/error';
    }
  }

  async function download(AECLink) {
    const req = await fetch('/download', {
      method: 'POST',
      body: JSON.stringify({ AECLink }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return req.json();
  }

});
