(function () {
  "use strict";

  function init(root) {
    var base = root.getAttribute("data-base") || "";
    var body = root.querySelector(".terminal-body");
    var input = root.querySelector(".term-input");
    if (!body || !input) return;

    var history = [];
    var hIdx = -1;

    function path(p) { return base.replace(/\/$/, "") + p; }

    function write(text, cls) {
      var line = document.createElement("div");
      line.className = "term-line " + (cls || "out");
      line.innerHTML = text;
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
    }

    function echoCmd(cmd) {
      write('<span class="prompt">visitor@jpl11:~$</span>' + escapeHtml(cmd), "cmd");
    }

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
      });
    }

    var commands = {
      help: function () {
        write("Available commands:", "hdr");
        write("  <span class='ok'>about</span>      — short bio");
        write("  <span class='ok'>skills</span>     — technical skills");
        write("  <span class='ok'>projects</span>   — selected projects");
        write("  <span class='ok'>experience</span> — work history");
        write("  <span class='ok'>resume</span>     — open resume PDF");
        write("  <span class='ok'>contact</span>    — email & links");
        write("  <span class='ok'>social</span>     — github / linkedin");
        write("  <span class='ok'>clear</span>      — clear the screen");
        write("  <span class='ok'>help</span>       — this menu");
        write("");
        write("Tip: every command also has a clickable page in the nav above.", "warn");
      },
      about: function () {
        write("Jacky Li", "hdr");
        write("Edge AI · Embedded Systems · Software Engineer");
        write("Adjunct Lecturer at Cal Poly Pomona; M.S. Electrical Engineering (in progress).");
        write("Research focus: neuromorphic vision, SNN/GNN, edge-efficient inference.");
      },
      skills: function () {
        write("Languages   : Python, C/C++, Swift, Objective-C, JS/TS, Kotlin, SQL", "out");
        write("ML / AI     : PyTorch, NumPy, CNNs, SNNs, RAG, LangChain, VLM/LLM", "out");
        write("Embedded    : STM32, ARM Cortex-M, Raspberry Pi 5, Jetson Nano, Zephyr RTOS", "out");
        write("Software    : React, Node.js, Firebase, REST APIs, OpenCV, UNIX/Linux, CI/CD", "out");
      },
      projects: function () {
        write("Selected projects:", "hdr");
        write("  1. SNN-GNN Predictive Coding for MRI Representation Learning");
        write("  2. Self-Supervised Event-Camera Denoising with SNN-GNNs");
        write("  3. Content-Adaptive Neuromorphic Semantic Communication (SpikeAdapt-SC)");
        write("  4. PokeAgent Speedrun (open source)");
        write("  5. Omi Smart Glasses (open source)");
        write("");
        write("Full list: <a href='" + path("/projects/") + "'>" + path("/projects/") + "</a>", "warn");
      },
      experience: function () {
        write("Recent roles:", "hdr");
        write("  Adjunct Lecturer — Cal Poly Pomona            (2026 – Present)");
        write("  Course Support — Break Through Tech / Cornell  (2026, Summer)");
        write("  Software Engineer — Stay Positive              (2024 – 2026)");
        write("  Tech Fellow — CodePath                          (2024 – 2026)");
        write("  Developer Intern — SimFit.app                   (2022 – 2023)");
        write("  Mobile Engineer Intern — PlayPart Inc.          (2022)");
        write("");
        write("Full timeline: <a href='" + path("/experience/") + "'>" + path("/experience/") + "</a>", "warn");
      },
      resume: function () {
        write("Opening resume PDF…", "ok");
        var url = path("/assets/resume.pdf");
        write("<a href='" + url + "' target='_blank' rel='noopener'>" + url + "</a>");
        window.open(url, "_blank", "noopener");
      },
      contact: function () {
        write("Email   : <a href='mailto:jackydli95@gmail.com'>jackydli95@gmail.com</a>");
        write("Phone   : (424) 367-8040");
        write("Location: Pomona, CA");
      },
      social: function () {
        write("GitHub  : <a href='https://github.com/JPL11' target='_blank' rel='noopener'>github.com/JPL11</a>");
        write("LinkedIn: <a href='https://www.linkedin.com/' target='_blank' rel='noopener'>linkedin.com</a>");
      },
      clear: function () { body.innerHTML = ""; },
      ls: function () { commands.help(); },
      whoami: function () { commands.about(); },
      cat: function (args) {
        var f = (args[0] || "").toLowerCase();
        if (commands[f]) return commands[f]();
        write("cat: " + (f || "(no file)") + ": No such file. Try 'help'.", "err");
      },
      "": function () {}
    };

    function run(raw) {
      var line = raw.trim();
      echoCmd(raw);
      if (!line) return;
      history.unshift(line);
      hIdx = -1;
      var parts = line.split(/\s+/);
      var name = parts[0].toLowerCase();
      var args = parts.slice(1);
      if (commands[name]) {
        try { commands[name](args); } catch (e) { write("error: " + e.message, "err"); }
      } else {
        write("command not found: " + name + ". Type 'help' for options.", "err");
      }
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var v = input.value;
        input.value = "";
        run(v);
      } else if (e.key === "ArrowUp") {
        if (history.length && hIdx < history.length - 1) {
          hIdx++;
          input.value = history[hIdx];
          setTimeout(function () { input.setSelectionRange(input.value.length, input.value.length); }, 0);
        }
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (hIdx > 0) { hIdx--; input.value = history[hIdx]; }
        else { hIdx = -1; input.value = ""; }
        e.preventDefault();
      } else if (e.key === "l" && e.ctrlKey) {
        commands.clear(); e.preventDefault();
      }
    });

    root.addEventListener("click", function (e) {
      if (e.target.tagName === "A") return;
      input.focus();
    });

    // boot
    write("jpl-portfolio shell v1.0  —  type <span class='ok'>help</span> to see commands", "hdr");
    write("(or just use the navigation menu above — both work)", "warn");
    write("");
    setTimeout(function () { input.focus({ preventScroll: true }); }, 200);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-terminal]").forEach(init);
  });
})();
