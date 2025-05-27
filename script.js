document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = this.querySelector('[name="nome"]').value;
    const mensagem = this.querySelector('[name="mensagem"]').value;
    const phoneNumber = "5586994822841";

    const whatsappMessage = `Olá, meu nome é ${nome} e gostaria de falar sobre: ${mensagem}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  });

async function fetchGithubProjects() {
  const username = "brunomoraesr";
  const portfolioContainer = document.getElementById("portfolio-repositorios");

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );
    const repos = await response.json();

    portfolioContainer.innerHTML = "";

    if (repos.length === 0) {
      portfolioContainer.innerHTML =
        "<p>Nenhum projeto encontrado no GitHub.</p>";
      return;
    }

    repos.forEach((repo) => {
      if (repo.fork) {
        return;
      }

      const card = document.createElement("a");
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.classList.add("portfolio-card");

      // Lógica para selecionar a imagem baseada na linguagem
      let projectImage = "./img/icons/default-icon.png"; // Imagem padrão (fallback)

      if (repo.language) {
        switch (repo.language.toLowerCase()) {
          case "javascript":
            projectImage = "./img/icons/js.png";
            break;
          case "python":
            projectImage = "./img/icons/python.png";
            break;
          case "java":
            projectImage = "./img/icons/java.png";
            break;
          case "html":
          case "css":
            projectImage = "./img/icons/html.png";
            break;
        }
      }

      card.innerHTML = `
                <img src="${projectImage}" alt="Imagem do projeto ${
        repo.name
      }" class="portfolio-imagem">
                <div class="caixa-textos-projeto">
                    <h3 class="info-portfolio">${repo.name.replace(
                      /-/g,
                      " "
                    )}</h3>
                    <p class="paragrafo-portfolio">${
                      repo.description || "Sem descrição disponível."
                    }</p>
                </div>
            `;
      portfolioContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar projetos do GitHub:", error);
    portfolioContainer.innerHTML =
      "<p>Erro ao carregar projetos. Tente novamente mais tarde.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchGithubProjects);
