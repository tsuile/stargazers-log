const list = document.querySelector("#repository-list");
const status = document.querySelector("#status");
const count = document.querySelector("#repository-count");

function formatStars(stars) {
  return `${new Intl.NumberFormat("en-US").format(stars)} stars`;
}

function renderRepositories(repositories) {
  list.replaceChildren();
  count.textContent = `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"}`;

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository-card";

    const link = document.createElement("a");
    link.className = "repository-name";
    link.href = repository.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = repository.name;

    const description = document.createElement("p");
    description.className = "repository-description";
    description.textContent = repository.description;

    const metadata = document.createElement("p");
    metadata.className = "repository-meta";

    [repository.language, formatStars(repository.stars)].forEach((value) => {
      const detail = document.createElement("span");
      detail.textContent = value;
      metadata.append(detail);
    });

    item.append(link, description, metadata);
    list.append(item);
  });

  status.textContent = "";
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    status.textContent = "The repository log could not be loaded. Please try again later.";
    count.textContent = "";
    console.error(error);
  }
}

loadRepositories();