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
    },
    {
      "n": 48,
      "file": "0048-real-innovations-in-cipp-technology.html",
      "title": "Real Innovations in CIPP Technology"
    },
    {
      "n": 49,
      "file": "0049-astm-f1216-07a-vs-22-the-real-standard.html",
      "title": "ASTM F1216: 07a vs. 22, From the Actual Standard"
    },
    {
      "n": 50,
      "file": "0050-astm-d5813-the-cipp-materials-spec.html",
      "title": "ASTM D5813: The CIPP Materials Spec"
    },
    {
      "n": 51,
      "file": "0051-toronto-tender-bid-package-structure.html",
      "title": "The Toronto Tender: How a Real Bid Package Comes Together"
    },
    {
      "n": 52,
      "file": "0052-contractor-pricing-payment-risk.html",
      "title": "Building a Contractor's Bid: Pricing, Payment, and Risk"
    },
    {
      "n": 53,
      "file": "0053-resin-supplier-form-e-submission.html",
      "title": "Building a Resin Supplier's Submission: Form E and the Design Data Trail"
    },
    {
      "n": 54,
      "file": "0054-styrene-free-trigger-real-contract.html",
      "title": "The Styrene-Free Trigger, in a Real Contract"
    },
    {
      "n": 55,
      "file": "0055-innovations-meet-a-real-tender.html",
      "title": "What a Live Tender Confirms About Where the Industry Is Headed"
    },
    {
      "n": 56,
      "file": "0056-how-cure-method-actually-gets-decided.html",
      "title": "How Cure Method Actually Gets Decided"
    },
    {
      "n": 57,
      "file": "0057-jiangsu-cost-norm-real-unit-prices.html",
      "title": "The Jiangsu Cost Norm: Real Unit Prices, and What They Don't Tell You"
    },
    {
      "n": 58,
      "file": "0058-five-real-sdss-styrene-free-chemistry-confirmed.html",
      "title": "Five Real SDSs: The Styrene-Free Chemistry, Confirmed"
    },
    {
      "n": 59,
      "file": "0059-resin-catalyst-hardener-who-mixes-what-when.html",
      "title": "Resin, Catalyst, and Hardener: Who Mixes What, and When"
    },
    {
      "n": 60,
      "file": "0060-packaging-and-logistics-manufacturer-to-jobsite.html",
      "title": "Packaging and Logistics: Manufacturer to Job Site"
    },
    {
      "n": 61,
      "file": "0061-capital-sewer-services-real-contractor-and-rollup.html",
      "title": "Capital Sewer Services: A Second Real Contractor, and the Roll-Up Behind It"
    },
    {
      "n": 62,
      "file": "0062-second-toronto-tender-at-a-glance.html",
      "title": "The Second Toronto Tender at a Glance: 27TW-CPI-05CWD"
    },
    {
      "n": 63,
      "file": "0063-who-may-bid-canadian-suppliers-only.html",
      "title": "Who May Bid: Canadian Suppliers Only, and Where a Resin Maker Sits"
    },
    {
      "n": 64,
      "file": "0064-domestic-supply-chain-plan-resin-origin-score.html",
      "title": "The Domestic Supply Chain Plan: How Resin Origin Enters the Score"
    },
    {
      "n": 65,
      "file": "0065-egg-shaped-brick-sewers-design-problem.html",
      "title": "Egg-Shaped Brick Sewers: A Different Design Problem"
    },
    {
      "n": 66,
      "file": "0066-what-the-resin-maker-must-hand-over.html",
      "title": "What the Resin Maker Must Hand Over: Form E, the Resin Submittal, and the Styrene Rule"
    },
    {
      "n": 67,
      "file": "0067-reading-this-repair-list-and-contract-terms.html",
      "title": "Reading This Repair List and Contract: Blind Shots, a Rail Crossing, and the Payment Terms"
    },
    {
      "n": 68,
      "file": "0068-lower-cooksville-peel-tender-at-a-glance.html",
      "title": "Peel Region’s Lower Cooksville Tender at a Glance: 2026-323T"
    },
    {
      "n": 69,
      "file": "0069-peel-buy-ontario-pass-fail-and-tariff-clauses.html",
      "title": "Peel’s Buy Ontario Rule Is Pass/Fail — and Its Tariff Clauses"
    },
    {
      "n": 70,
      "file": "0070-peel-drawings-allow-hot-water-or-uv.html",
      "title": "The Drawings Say “Hot Water or UV”: Cure Method and Material Minimums"
    },
    {
      "n": 71,
      "file": "0071-peel-styrene-rules-near-schools-and-creeks.html",
      "title": "Styrene Rules Near Schools and a Creek"
    },
    {
      "n": 72,
      "file": "0072-peel-repair-summary-flows-and-pay-items.html",
      "title": "Reading the Repair Summary: Access, Flow Data, and What Gets Paid"
    },
    {
      "n": 73,
      "file": "0073-peel-time-liquidated-damages-and-warranty-holdback.html",
      "title": "Time, Liquidated Damages, and the Warranty Holdback"
    },
    {
      "n": 74,
      "file": "0074-sino-polymer-scale-and-capacity-versus-a-tender.html",
      "title": "Sino Polymer’s Scale and Capacity, Set Against a Real Tender"
    },
    {
      "n": 75,
      "file": "0075-where-its-made-plants-origin-and-tender-forms.html",
      "title": "Where It’s Made: Plants, Country of Origin, and the Tender Forms"
    },
    {
      "n": 76,
      "file": "0076-what-the-profile-and-catalogue-cannot-prove.html",
      "title": "What the Profile and Catalogue Can’t Prove, and What Only the Manufacturer Can Hand Over"
    },
    {
      "n": 77,
      "file": "0077-two-sept-30-decks-what-changed-between-them.html",
      "title": "Two September 30 Decks: What Changed Between Them"
    },
    {
      "n": 78,
      "file": "0078-claims-discipline-what-a-certificate-covers.html",
      "title": "Claims Discipline: What Each Certificate Actually Covers"
    }
  ],
  "reference": [
    {
      "file": "sino-polymer-profile-catalogue-cheatsheet.html",
      "title": "Sino Polymer Profile and Catalogue vs the Tenders"
    },
    {
      "file": "peel-2026-323t-cheatsheet.html",
      "title": "Peel Tender 2026-323T"
    },
    {
      "file": "toronto-27tw-cpi-05cwd-cheatsheet.html",
      "title": "Toronto Tender 27TW-CPI-05CWD"
    },
    {
      "file": "company-setup-sino-polymer-partnership.html",
      "title": "Setting Up a Company for a Sino Polymer Partnership"
    },
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
