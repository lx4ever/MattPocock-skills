// Shared collapsible navigation sidebar for trenchless-technologies lessons/reference pages.
(function () {
  var MANIFEST = {
  "lessons": [
    {
      "n": 1,
      "file": "0001-four-trenchless-families.html",
      "title": "The Trenchless Families"
    },
    {
      "n": 2,
      "file": "0002-how-cipp-is-installed.html",
      "title": "How CIPP Is Installed"
    },
    {
      "n": 3,
      "file": "0003-how-sipp-is-sprayed-on.html",
      "title": "How SIPP Is Sprayed On"
    },
    {
      "n": 4,
      "file": "0004-how-fold-and-form-reshapes-a-pipe.html",
      "title": "How Fold-and-Form Reshapes a Pipe"
    },
    {
      "n": 5,
      "file": "0005-putting-it-together.html",
      "title": "Putting It Together"
    },
    {
      "n": 6,
      "file": "0006-cipp-materials-equipment-parameters.html",
      "title": "CIPP: Materials, Equipment, Parameters"
    },
    {
      "n": 7,
      "file": "0007-sipp-materials-equipment-parameters.html",
      "title": "SIPP: Materials, Equipment, Parameters"
    },
    {
      "n": 8,
      "file": "0008-fold-and-form-materials-equipment-parameters.html",
      "title": "Fold-and-Form: Materials, Equipment, Parameters"
    },
    {
      "n": 9,
      "file": "0009-cipp-quality-performance-cost-drivers.html",
      "title": "CIPP: What Actually Drives Quality, Performance, and Cost"
    },
    {
      "n": 10,
      "file": "0010-building-a-resin-value-proposition.html",
      "title": "Building a Resin Value Proposition"
    },
    {
      "n": 11,
      "file": "0011-three-resin-pitches-sino-polymer.html",
      "title": "Three Resin Pitches: Sino Polymer VE Line"
    },
    {
      "n": 12,
      "file": "0012-cipp-standards-regulations-incentives-us.html",
      "title": "CIPP Standards, Regulations & Incentives: United States"
    },
    {
      "n": 13,
      "file": "0013-cipp-standards-regulations-incentives-canada.html",
      "title": "CIPP Standards, Regulations & Incentives: Canada"
    },
    {
      "n": 14,
      "file": "0014-cipp-standards-regulations-incentives-europe.html",
      "title": "CIPP Standards, Regulations & Incentives: Europe"
    },
    {
      "n": 15,
      "file": "0015-what-drives-cipp-resin-cure-time.html",
      "title": "What Drives CIPP Resin Cure Time"
    },
    {
      "n": 16,
      "file": "0016-easy-to-thicken-explained.html",
      "title": "\"Easy to Thicken,\" Explained"
    },
    {
      "n": 17,
      "file": "0017-every-property-full-lifecycle-impact.html",
      "title": "Every Spec-Sheet Property, Full Lifecycle Impact"
    },
    {
      "n": 18,
      "file": "0018-ontario-opss-suite-csa-4012-detail.html",
      "title": "Ontario's OPSS Trenchless Suite & CSA PLUS 4012, In Detail"
    },
    {
      "n": 19,
      "file": "0019-tensile-flexural-properties-design-math.html",
      "title": "Tensile & Flexural Properties: The Real Design Math"
    },
    {
      "n": 20,
      "file": "0020-non-volatile-content-in-detail.html",
      "title": "Non-Volatile Content, In Detail"
    },
    {
      "n": 21,
      "file": "0021-inspection-to-installation-method-selection-deliverables.html",
      "title": "From Inspection to Installation: Method Selection & Deliverables"
    },
    {
      "n": 22,
      "file": "0022-opss-muni-443-design-materials.html",
      "title": "OPSS.MUNI 443: Design & Materials Requirements"
    },
    {
      "n": 23,
      "file": "0023-opss-muni-443-construction-qa.html",
      "title": "OPSS.MUNI 443: Construction & QA In Detail"
    },
    {
      "n": 24,
      "file": "0024-opss-muni-444-forcemain-rehabilitation.html",
      "title": "OPSS.MUNI 444: Forcemain Rehabilitation"
    },
    {
      "n": 25,
      "file": "0025-opss-muni-445-watermain-rehabilitation.html",
      "title": "OPSS.MUNI 445: Watermain Rehabilitation"
    },
    {
      "n": 26,
      "file": "0026-peel-region-bid-package-choosing-cipp-type.html",
      "title": "Dissecting a Real Bid Package: Choosing the CIPP Type"
    },
    {
      "n": 27,
      "file": "0027-peel-region-picking-the-resin.html",
      "title": "Picking the Resin: Peel Region's Real Minimums"
    },
    {
      "n": 28,
      "file": "0028-peel-region-performing-a-quote.html",
      "title": "Performing a Quote: Cost-Relevant Clauses & Worked Reconciliation"
    },
    {
      "n": 29,
      "file": "0029-the-commercial-layer-reading-the-tender-document.html",
      "title": "The Commercial Layer: Reading the Tender Document"
    },
    {
      "n": 30,
      "file": "0030-chemical-injection-grouting-the-fourth-method.html",
      "title": "Chemical Injection Grouting: The Fourth Method"
    },
    {
      "n": 31,
      "file": "0031-how-peel-actually-pays-a-contractor.html",
      "title": "How Peel Actually Pays a Contractor"
    },
    {
      "n": 32,
      "file": "0032-before-the-liner-goes-in-cctv-sonar-flushing.html",
      "title": "Before the Liner Goes In: CCTV, Sonar, and Flushing Standards"
    },
    {
      "n": 33,
      "file": "0033-cippsr-the-supplemental-fine-print.html",
      "title": "CIPPSR: The Supplemental Fine Print"
    },
    {
      "n": 34,
      "file": "0034-the-watercourse-layer-conservation-authority-permits.html",
      "title": "The Watercourse Layer: Conservation Authority Permits"
    },
    {
      "n": 35,
      "file": "0035-reading-a-real-repair-list.html",
      "title": "Reading a Real Repair List"
    },
    {
      "n": 36,
      "file": "0036-getting-to-the-manhole-property-impact-plan.html",
      "title": "Getting to the Manhole: The Property Impact Plan"
    },
    {
      "n": 37,
      "file": "0037-what-the-approved-product-list-doesnt-cover.html",
      "title": "What the Approved Product List Doesn't Cover"
    },
    {
      "n": 38,
      "file": "0038-astm-f1216-what-it-actually-covers.html",
      "title": "ASTM F1216, What It Actually Covers"
    },
    {
      "n": 39,
      "file": "0039-the-fully-deteriorated-design-calculation.html",
      "title": "The Fully-Deteriorated Design Calculation"
    },
    {
      "n": 40,
      "file": "0040-from-design-thickness-to-a-resin-order.html",
      "title": "From Design Thickness to a Resin Order"
    },
    {
      "n": 41,
      "file": "0041-from-a-resin-tds-to-a-liner-design.html",
      "title": "From a Resin TDS to a Liner Design"
    },
    {
      "n": 42,
      "file": "0042-the-missing-creep-data-found.html",
      "title": "The Missing Creep Data, Found"
    },
    {
      "n": 43,
      "file": "0043-real-composite-data-closes-the-reinforced-liner-gap.html",
      "title": "Real Composite Data Closes the Reinforced-Liner Gap"
    },
    {
      "n": 44,
      "file": "0044-the-expanded-product-line-and-new-certifications.html",
      "title": "The Expanded Product Line and New Certifications"
    },
    {
      "n": 45,
      "file": "0045-real-projects-and-company-track-record.html",
      "title": "Real Projects and Company Track Record"
    },
    {
      "n": 46,
      "file": "0046-competitor-matching-and-the-flash-point-math.html",
      "title": "Competitor Matching, UV Working Time, and the Flash-Point Math"
    },
    {
      "n": 47,
      "file": "0047-epoxy-vs-vinyl-ester-for-cipp.html",
      "title": "Epoxy vs. Vinyl Ester for CIPP"
    }
  ],
  "reference": [
    {
      "file": "opss-muni-cipp-family.html",
      "title": "OPSS.MUNI 443 / 444 / 445 Comparison"
    },
    {
      "file": "regulatory-landscape-cheatsheet.html",
      "title": "CIPP Regulatory Landscape by Region"
    },
    {
      "file": "sinopolymer-ontario-certification-checklist.html",
      "title": "Sino Polymer: Ontario CIPP Certification Checklist"
    },
    {
      "file": "sinopolymer-value-proposition.html",
      "title": "Sino Polymer: The Value Proposition, Synthesized"
    },
    {
      "file": "trenchless-methods-cheatsheet.html",
      "title": "Trenchless Methods Cheat Sheet"
    }
  ]
};

  var STORAGE_KEY = "trenchless-nav-collapsed";

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
    toggle.setAttribute("aria-label", "Toggle lesson navigation");
    toggle.innerHTML = "&#9776; Lessons";

    var aside = document.createElement("aside");
    aside.id = "site-nav";

    var header = document.createElement("div");
    header.className = "nav-header";
    header.innerHTML = "<span>Trenchless Technologies</span>";
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
