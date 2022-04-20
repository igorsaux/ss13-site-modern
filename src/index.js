function renderLink(link) {
  let icon = "";

  switch (link.what) {
    case "discord":
      icon = '<i class="fa-brands fa-discord"></i>';
      break;
    case "github":
      icon = '<i class="fa-brands fa-github"></i>';
      break;
    case "wikipedia-w":
      icon = '<i class="fa-brands fa-wikipedia-w"></i>';
      break;
    default:
      icon = '<i class="fa-solid fa-link"></i>';
      break;
  }

  return `
<a target="_blank" class="ServerLink" href="${link.href}">
  ${icon}
  ${link.text}
</a>
`;
}

function renderServers(servers) {
  const serversBlock = document.getElementById("Servers");

  for (const server of servers) {
    const el = document.createElement("div");
    const links = server.links.map(renderLink).join("");

    el.className = "Server Block";
    el.innerHTML = `
<div class="ServerTitle">
    <span class="Title">
      <img class="ServerIcon" src="${server.icon}">${server.name}
    </span>
    <span class="Population">${
      server.online
        ? '<span class="StatusOnline">online</span>'
        : '<span class="StatusOffline">offline</span>'
    } ${server.players}</span>
</div>
<details class="ServerDescription">
    <summary>Описание</summary>
    <p>${server.description}</p>
    <div class="ServerLinks">
        ${links}
    </div>
</details>
<a class="PlayButton" href="${server.address}">
► Join
</a>`;

    serversBlock.appendChild(el);
  }
}

function renderNews(newsArray) {
  const newsBlock = document.getElementById("News");

  for (const news of newsArray) {
    const el = document.createElement("artice");

    el.className = "NewsItem Block";

    const date = new Date(news.date);

    el.innerHTML = `
<h2 class="NewsTitle">
    ${news.name}
</h2>
<div class="Data">
    <b>${date.toLocaleDateString()}</b>
</div>
<p>
    ${news.content}
</p>`;

    newsBlock.appendChild(el);
  }
}

async function main() {
  const response = await fetch("./data.json");
  const data = await response.json();
  // const data = JSON.parse(document.body.getAttribute("data-json"));

  renderServers(data.servers);
  renderNews(data.news);
}

main();
