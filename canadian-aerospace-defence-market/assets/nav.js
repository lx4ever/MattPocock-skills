// Shared collapsible page-navigator sidebar for the Canadian Aerospace,
// Space and Defence Market workspace's lessons/reference pages.
(function () {
  var MANIFEST = {
  "lessons": [
    { "n": 1, "file": "0001-who-buys-and-whats-live.html", "title": "Who Buys, and What's Live" },
    { "n": 2, "file": "0002-cmma-p8a-poseidon.html", "title": "CMMA: The P-8A Poseidon Buy" },
    { "n": 3, "file": "0003-river-class-destroyer.html", "title": "River-class Destroyer" },
    { "n": 4, "file": "0004-patrol-submarine-cpsp.html", "title": "Canadian Patrol Submarine Project (CPSP)" },
    { "n": 5, "file": "0005-space-domain-mda-hub.html", "title": "The Space Domain: MDA as the Hub" },
    { "n": 6, "file": "0006-canadarm3.html", "title": "Canadarm3" },
    { "n": 7, "file": "0007-aops.html", "title": "AOPS: A Program That's Mostly Already Built" },
    { "n": 8, "file": "0008-rpas.html", "title": "RPAS: The Program Missing From Kanata's Own List" },
    { "n": 9, "file": "0009-land-and-training-domains.html", "title": "Land and Training: Testing the Patterns" },
    { "n": 10, "file": "0010-is-land-a-fit.html", "title": "Is Land Actually a Fit for Kanata?" },
    { "n": 11, "file": "0011-joint-support-ship.html", "title": "Joint Support Ship" },
    { "n": 12, "file": "0012-f-35.html", "title": "F-35: The Program With No ITB, By Design" },
    { "n": 13, "file": "0013-cc-330-husky.html", "title": "CC-330 Husky" },
    { "n": 14, "file": "0014-global-backdrop-deloitte-outlook.html", "title": "The Global Backdrop: Why Primes Need Kanata Right Now" },
    { "n": 15, "file": "0015-mda-49north.html", "title": "49North: MDA's Second Hub" },
    { "n": 16, "file": "0016-ddi-marketplace-mosa.html", "title": "DDI / DDIM, MOSA & Interoperability" },
    { "n": 17, "file": "0017-caf-uas-landscape.html", "title": "CAF UAS Initiatives and Capabilities" },
    { "n": 18, "file": "0018-dia-strix-feddev.html", "title": "DIA, Strix/INSAT & FedDev" },
    { "n": 19, "file": "0019-caf-uxs-enterprise-model.html", "title": "The CAF UxS Enterprise Model" },
    { "n": 20, "file": "0020-uxs-dish-nexus.html", "title": "UxS DISH / NEXUS" },
    { "n": 21, "file": "0021-c4isr.html", "title": "C4ISR" },
    { "n": 22, "file": "0022-borealis.html", "title": "BOREALIS" },
    { "n": 23, "file": "0023-cdir-cdde-nadcap.html", "title": "CDIR, CDDE & NADCAP" },
    { "n": 24, "file": "0024-team-skyguardian.html", "title": "Team SkyGuardian Canada" }
  ],
  "reference": [
    { "file": "buyers-and-programs-cheatsheet.html", "title": "Buyers & Programs Cheat Sheet" }
  ]
};

  var STORAGE_KEY = "kanata-defence-nav-collapsed";

  function currentDir() {
    var path = window.location.pathname;
    if (path.indexOf("/lessons/") !== -1) return "lessons";
    if (path.indexOf("/reference/") !== -1) return "reference";
    return "root";
  }

  function currentFile() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1];
  }

  function linkTo(targetDir, file) {
    var here = currentDir();
    if (here === targetDir) return file;
    if (here === "root") return targetDir + "/" + file;
    return "../" + targetDir + "/" + file;
  }

  function build() {
    var here = currentDir();
    var hereFile = currentFile();

    var toggle = document.createElement("button");
    toggle.id = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Toggle page navigator");
    toggle.innerHTML = "&#9776; Pages";

    var aside = document.createElement("aside");
    aside.id = "site-nav";

    var header = document.createElement("div");
    header.className = "nav-header";
    header.innerHTML = "<span>Canadian A&amp;D Market</span>";
    var closeBtn = document.createElement("button");
    closeBtn.id = "nav-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Collapse navigation");
    closeBtn.innerHTML = "&times;";
    header.appendChild(closeBtn);
    aside.appendChild(header);

    var homeLink = document.createElement("a");
    homeLink.className = "nav-home-link";
    homeLink.href = linkTo("root", "MISSION.md");
    homeLink.textContent = "Mission & Resources";
    aside.appendChild(homeLink);

    var lessonsGroup = document.createElement("div");
    lessonsGroup.className = "nav-group";
    var lessonsTitle = document.createElement("h4");
    lessonsTitle.textContent = "Lessons";
    lessonsGroup.appendChild(lessonsTitle);
    var lessonsList = document.createElement("ol");
    lessonsList.className = "nav-list";
    MANIFEST.lessons.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = linkTo("lessons", item.file);
      a.textContent = item.n + ". " + item.title;
      if (here === "lessons" && item.file === hereFile) {
        a.setAttribute("aria-current", "page");
        a.className = "nav-current";
      }
      li.appendChild(a);
      lessonsList.appendChild(li);
    });
    lessonsGroup.appendChild(lessonsList);
    aside.appendChild(lessonsGroup);

    var refGroup = document.createElement("div");
    refGroup.className = "nav-group";
    var refTitle = document.createElement("h4");
    refTitle.textContent = "Reference";
    refGroup.appendChild(refTitle);
    var refList = document.createElement("ul");
    refList.className = "nav-list";
    MANIFEST.reference.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = linkTo("reference", item.file);
      a.textContent = item.title;
      if (here === "reference" && item.file === hereFile) {
        a.setAttribute("aria-current", "page");
        a.className = "nav-current";
      }
      li.appendChild(a);
      refList.appendChild(li);
    });
    refGroup.appendChild(refList);
    aside.appendChild(refGroup);

    var backdrop = document.createElement("div");
    backdrop.id = "nav-backdrop";

    document.body.appendChild(toggle);
    document.body.appendChild(backdrop);
    document.body.appendChild(aside);

    function setCollapsed(collapsed) {
      document.body.classList.toggle("nav-open", !collapsed);
      try { localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0"); } catch (e) {}
    }

    toggle.addEventListener("click", function () { setCollapsed(false); });
    closeBtn.addEventListener("click", function () { setCollapsed(true); });
    backdrop.addEventListener("click", function () { setCollapsed(true); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setCollapsed(true);
    });

    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    setCollapsed(stored !== "0");

    var current = aside.querySelector(".nav-current");
    if (current && current.scrollIntoView) {
      current.scrollIntoView({ block: "center" });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
