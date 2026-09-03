(function () {
  "use strict";

  const hostedSiteRoot = "/manual/";
  const fallbackVersions = [{ version: "2.7.3", label: "2.7.3" }];

  function siteRoot() {
    return window.location.hostname.endsWith("github.io") ? hostedSiteRoot : "./";
  }

  function currentVersion(versions) {
    const match = window.location.pathname.match(/\/versions\/([^/]+)\//);
    return match ? decodeURIComponent(match[1]) : versions[0].version;
  }

  function addLink(menu, label, href, isCurrent) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "dropdown-item";
    link.textContent = label;
    link.href = href;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    }
    item.appendChild(link);
    menu.appendChild(item);
  }

  function buildSelector(versions, placement) {
    const selected = currentVersion(versions);
    const item = document.createElement("div");
    item.className = `dropdown manual-version-menu manual-version-${placement}`;

    const toggle = document.createElement("a");
    toggle.className = "btn dropdown-toggle manual-version-toggle";
    toggle.href = "#";
    toggle.setAttribute("role", "button");
    toggle.setAttribute("data-bs-toggle", "dropdown");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", `Documentation version ${selected}`);
    toggle.textContent = `v${selected}`;

    const menu = document.createElement("ul");
    menu.className = "dropdown-menu";
    addLink(menu, `Latest (${versions[0].label})`, siteRoot(), !window.location.pathname.includes("/versions/"));
    versions.forEach((entry) => {
      addLink(
        menu,
        entry.label,
        `${siteRoot()}versions/${encodeURIComponent(entry.version)}/`,
        window.location.pathname.includes(`/versions/${entry.version}/`)
      );
    });

    item.append(toggle, menu);
    return item;
  }

  function addSelectors(versions) {
    if (versions.length === 0) {
      return;
    }

    const controls = document.querySelector("#quarto-header .quarto-secondary-nav .container-fluid");
    const searchButton = controls?.querySelector(".quarto-search-button");
    if (controls) {
      controls.insertBefore(buildSelector(versions, "header"), searchButton || null);
    }

    const sidebarSearch = document.querySelector("#quarto-sidebar .sidebar-search");
    if (sidebarSearch?.parentElement) {
      sidebarSearch.parentElement.appendChild(buildSelector(versions, "sidebar"));
    }
  }

  document.addEventListener("DOMContentLoaded", async function () {
    let versions = fallbackVersions;
    try {
      const response = await fetch(`${siteRoot()}versions.json`, { cache: "no-store" });
      if (response.ok) {
        versions = await response.json();
      }
    } catch (_) {
      // Local file previews cannot fetch JSON; use the embedded current version.
    }
    addSelectors(versions);
  });
})();