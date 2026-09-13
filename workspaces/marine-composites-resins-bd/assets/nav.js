// Universal jump-to-page menu, shared by every lesson and reference page.
// Update WORKSPACE_PAGES whenever a lesson or reference page is added — this list isn't auto-discovered.
(function () {
  var WORKSPACE_PAGES = {
    lessons: [
      { file: "0001-resin-families-overview.html", title: "0001 — The Three Resin Families" },
      { file: "0002-boat-manufacturing-processes.html", title: "0002 — How a Hull Gets Built" },
      { file: "0003-boat-resin-buying-drivers.html", title: "0003 — What Drives a Boat Builder's Resin Choice" },
      { file: "0004-canadian-boat-building-standards.html", title: "0004 — Canadian Boat Building Standards" },
      { file: "0005-osmotic-blistering-deep-dive.html", title: "0005 — Osmotic Blistering Deep Dive" }
    ],
    reference: [
      { file: "resin-comparison-cheatsheet.html", title: "Resin Comparison Cheat Sheet" },
      { file: "boat-manufacturing-cheatsheet.html", title: "Boat Manufacturing Cheat Sheet" },
      { file: "canada-boat-standards-cheatsheet.html", title: "Canadian Standards Cheat Sheet" },
      { file: "blistering-cheatsheet.html", title: "Blistering Cheat Sheet" }
    ]
  };

  function buildSection(label, folder, pages) {
    var heading = document.createElement("h4");
    heading.textContent = label;

    var list = document.createElement("ul");
    var currentFile = window.location.pathname.split("/").pop();

    pages.forEach(function (page) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "../" + folder + "/" + page.file;
      a.textContent = page.title;
      if (page.file === currentFile) {
        a.classList.add("wsnav-current");
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      list.appendChild(li);
    });

    var wrapper = document.createDocumentFragment();
    wrapper.appendChild(heading);
    wrapper.appendChild(list);
    return wrapper;
  }

  function init() {
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "wsnav-toggle";
    toggle.textContent = "☰ Jump to…";
    toggle.setAttribute("aria-expanded", "false");

    var panel = document.createElement("nav");
    panel.className = "wsnav-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Workspace pages");
    panel.appendChild(buildSection("Lessons", "lessons", WORKSPACE_PAGES.lessons));
    panel.appendChild(buildSection("Reference", "reference", WORKSPACE_PAGES.reference));

    toggle.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      toggle.setAttribute("aria-expanded", String(!panel.hidden));
    });

    document.addEventListener("click", function (event) {
      if (!panel.hidden && !panel.contains(event.target) && event.target !== toggle) {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.body.appendChild(toggle);
    document.body.appendChild(panel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
