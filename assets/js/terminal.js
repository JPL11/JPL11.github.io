(function () {
  "use strict";

  function init(root) {
    var base = root.getAttribute("data-base") || "";
    var body = root.querySelector(".terminal-body");
    var input = root.querySelector(".term-input");
    if (!body || !input) return;

    var history = [];
    var hIdx = -1;
    var loadedModules = [];

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

    var MODULES = {
      "pytorch/2.13":           "deep learning workhorse",
      "snn/spikingjelly":       "spiking neural nets (3 PRs merged upstream)",
      "snn/snntorch":           "more spikes (2 PRs in review)",
      "event-cameras/evlab":    "pip install evlab — inspect, corrupt, benchmark",
      "quantization/quantcard": "pip install quantcard — int8/int4 report cards",
      "wasm/binaryen":          "WebAssembly optimizer (3 PRs merged)",
      "mlir/iree":              "ML compiler stack (1 PR in review)",
      "executorch/exir":        "PyTorch on-device runtime (1 PR in review)",
      "cuda/h100":              "borrowed from SDSC Expanse, please do not tell",
      "latex/rebuttal":         "loads automatically near every deadline"
    };

    var MODULE_QUIPS = {
      "cuda/h100":        "module loaded. squeue wait time: 6-14 hours. worth it.",
      "latex/rebuttal":   "module loaded. \\textbf{We thank the reviewer for this insightful comment.}",
      "snn/spikingjelly": "module loaded. memory leak already fixed upstream (PRs #703, #705).",
      "wasm/binaryen":    "module loaded. remember: measure before machinery."
    };

    var commands = {
      help: function () {
        write("Available commands:", "hdr");
        write("  <span class='ok'>about</span>        — who runs this node");
        write("  <span class='ok'>projects</span>     — research projects");
        write("  <span class='ok'>opensource</span>   — packages + merged PRs");
        write("  <span class='ok'>experience</span>   — work history");
        write("  <span class='ok'>skills</span>       — technical skills");
        write("  <span class='ok'>resume</span>       — open resume PDF");
        write("  <span class='ok'>contact</span> / <span class='ok'>social</span> — reach me");
        write("");
        write("Cluster commands:", "hdr");
        write("  <span class='ok'>module avail</span>      — show research/skill modules");
        write("  <span class='ok'>module add &lt;m&gt;</span>    — load one (Tab completes)");
        write("  <span class='ok'>squeue</span>            — what's running right now");
        write("  <span class='ok'>git log</span>           — merged upstream contributions");
        write("  <span class='ok'>pip install evlab</span> — try my packages");
        write("  <span class='ok'>nvidia-smi</span> · <span class='ok'>neofetch</span> · <span class='ok'>sbatch</span> · <span class='ok'>clear</span>");
        write("");
        write("Tip: Tab completes, ↑ recalls history, and the nav above works too.", "warn");
      },

      about: function () {
        write("Jacky Li — jpl11 node operator", "hdr");
        write("Edge AI · Neuromorphic Vision · Compilers/Runtimes for ML");
        write("M.S. Electrical Engineering (in progress) · Adjunct Lecturer, Cal Poly Pomona.");
        write("I work on making event cameras trustworthy (EvCorrupt-Bench, SpikeGuard-RC)");
        write("and ML deployable at the edge — down to the optimizer passes (Binaryen, IREE,");
        write("ExecuTorch) and the memory leaks in SNN frameworks (SpikingJelly).");
      },

      projects: function () {
        write("Research projects:", "hdr");
        write("  0. MemoryQC-Edge — on-device QC agent for MRI segmentation (MICCAI'26 MedAgent, accepted)");
        write("  1. EvCorrupt-Bench — runtime corruption detection for event cameras (in submission)");
        write("  2. SpikeGuard-RC — spiking reservoir safety monitor (in progress)");
        write("  3. evlab + quantcard — open-source tooling (pip installable)");
        write("  4. SNN-GNN Predictive Coding for MRI Representation Learning");
        write("  5. SpikeAdapt-SC — neuromorphic semantic communication");
        write("  6. Cosmic-Ray Edge AI on CosmicWatch / CREDO networks");
        write("");
        write("Full cards: <a href='" + path("/projects/") + "'>" + path("/projects/") + "</a>", "warn");
      },

      opensource: function () {
        write("Packages (pip installable):", "hdr");
        write("  <span class='ok'>evlab</span>     — inspect, clean, corrupt & benchmark event-camera data");
        write("  <span class='ok'>quantcard</span> — quantization report cards for edge-bound PyTorch models");
        write("");
        write("Merged upstream:", "hdr");
        write("  WebAssembly/binaryen — 3 PRs (MemoryPacking optimizations, fuzzer fix)");
        write("  SpikingJelly         — 3 PRs (STDP autograd memory leaks, ~70 MB/run)");
        write("");
        write("In review: ExecuTorch.");
        write("Details: <a href='" + path("/opensource/") + "'>" + path("/opensource/") + "</a>  ·  try <span class='ok'>git log</span>", "warn");
      },

      experience: function () {
        write("Recent roles:", "hdr");
        write("  Adjunct Lecturer — Cal Poly Pomona (ECE 3301/L)       2026 – Present");
        write("  Course Support — Break Through Tech @ Cornell Tech    2026 – Present");
        write("  Tech Fellow — CodePath (AI201, AI301, TIP, Cyber)     2024 – Present");
        write("  Software Engineer — Stay Positive                     2024 – 2026");
        write("");
        write("Full timeline: <a href='" + path("/experience/") + "'>" + path("/experience/") + "</a>", "warn");
      },

      skills: function () {
        write("Languages   : Python, C/C++, Swift, Objective-C, JS/TS, Kotlin, SQL");
        write("ML / AI     : PyTorch, SNNs (SpikingJelly/snnTorch), torchao, RAG, LLM agents");
        write("Compilers   : Binaryen/WebAssembly, MLIR/IREE, ExecuTorch exir passes");
        write("Event vision: evlab, corruption modeling, denoising, voxel/time-surface reps");
        write("Embedded    : STM32, ARM Cortex-M, Raspberry Pi 5, Jetson, Zephyr RTOS");
        write("Infra       : Git/GitHub, CI/CD, SLURM (SDSC Expanse), Linux, Docker");
      },

      resume: function () {
        write("Opening resume PDF…", "ok");
        var url = path("/assets/resume.pdf");
        write("<a href='" + url + "' target='_blank' rel='noopener'>" + url + "</a>");
        window.open(url, "_blank", "noopener");
      },

      contact: function () {
        write("Email   : <a href='mailto:jackydli95@gmail.com'>jackydli95@gmail.com</a>");
        write("Location: Los Angeles, CA");
      },

      social: function () {
        write("GitHub  : <a href='https://github.com/JPL11' target='_blank' rel='noopener'>github.com/JPL11</a>");
        write("LinkedIn: <a href='https://www.linkedin.com/jackypli' target='_blank' rel='noopener'>linkedin.com/jackypli</a>");
        write("PyPI    : evlab · quantcard (pip install either)");
      },

      module: function (args) {
        var sub = (args[0] || "").toLowerCase();
        if (sub === "avail" || sub === "av" || sub === "") {
          write("-------------------- /opt/jpl11/modulefiles --------------------", "hdr");
          Object.keys(MODULES).forEach(function (m) {
            var pad = Array(Math.max(26 - m.length, 2)).join(" ");
            write("  <span class='ok'>" + m + "</span>" + pad + MODULES[m]);
          });
          write("");
          write("'module add <name>' loads one for this session.", "warn");
        } else if (sub === "add" || sub === "load") {
          var name = args[1] || "";
          var match = Object.keys(MODULES).filter(function (m) {
            return m === name || m.indexOf(name) === 0 || m.split("/")[1] === name;
          })[0];
          if (!name || !match) { write("module: '" + escapeHtml(name) + "' not found. Try 'module avail'.", "err"); return; }
          if (loadedModules.indexOf(match) < 0) loadedModules.push(match);
          write(MODULE_QUIPS[match] || "module '" + match + "' loaded.", "ok");
        } else if (sub === "list") {
          if (!loadedModules.length) { write("No modules loaded. An empty environment — how peaceful."); return; }
          write("Currently loaded modules:", "hdr");
          loadedModules.forEach(function (m, i) { write("  " + (i + 1) + ") " + m); });
        } else if (sub === "initadd") {
          write("module: persistence across sessions would require cookies.", "err");
          write("This site politely declines to track you. Module not persisted.", "warn");
        } else {
          write("Usage: module avail | add <name> | list", "err");
        }
      },

      squeue: function () {
        write("JOBID  PARTITION  NAME                    ST  TIME      NODELIST(REASON)", "hdr");
        write("2601   gpu-h100   spikeguard-rc           R   3-07:12   exp-h100-[03]");
        write("2602   research   evcorrupt-camera-ready  PD  0:00      (ReviewerTwo)");
        write("2603   upstream   executorch-pr-20744     PD  0:00      (AwaitingMaintainer)");
        write("2604   upstream   iree-pr-24687           PD  0:00      (AwaitingMaintainer)");
        write("2605   upstream   snntorch-pr-432-433     PD  0:00      (AwaitingMaintainer)");
        write("2606   life       phd-applications        PD  0:00      (BeginTime=Fall-2027)");
        write("");
        write("6 jobs; 1 running, 5 pending. Such is research.", "warn");
      },

      sbatch: function (args) {
        var job = args[0] || "job.sbatch";
        if (job.indexOf("phd") >= 0) {
          write("Submitted batch job 2027 (" + escapeHtml(job) + ")", "ok");
          write("Estimated queue time: one full admissions cycle. Check squeue nervously.");
        } else {
          write("Submitted batch job " + Math.floor(2700 + Math.random() * 300) + " (" + escapeHtml(job) + ")", "ok");
          write("sbatch: warning: this cluster bills in curiosity, not service units.");
        }
      },

      "nvidia-smi": function () {
        write("+------------------------------------------------------------------+", "hdr");
        write("| NVIDIA-SMI 550.xx    Driver: enthusiasm     CUDA Version: 12.x    |", "hdr");
        write("|------------------------------------------------------------------|");
        write("| GPU  Name          Memory-Usage        GPU-Util  Process         |");
        write("|  0   H100 (wish)   61440MiB/81920MiB   97%       spikeguard_train|");
        write("+------------------------------------------------------------------+");
        write("(rendered client-side; your browser has been spared the training run)", "warn");
      },

      git: function (args) {
        if ((args[0] || "") !== "log") { write("git: try 'git log'", "err"); return; }
        write("commit  #433   (snnTorch)              fix: NaN gradients in sigmoid", "out");
        write("                                       surrogate backward pass");
        write("commit  #432   (snnTorch)              fix: preserve input dtype in neuron");
        write("                                       modules and surrogate gradients");
        write("commit db30c15 (WebAssembly/binaryen)  MemoryPacking: optimize overlapping");
        write("                                       segments on imported memories");
        write("commit 99f6fc6 (WebAssembly/binaryen)  Report a host limit for memories too");
        write("                                       large for the shell to allocate");
        write("commit d0b9c03 (WebAssembly/binaryen)  MemoryPacking: optimize trampled data");
        write("commit  #705   (SpikingJelly)          fix: detach reward passed to MSTDP");
        write("commit  #703   (SpikingJelly)          fix: detach spikes recorded by STDP");
        write("commit  #701   (SpikingJelly)          test: skip profiler tests w/o CUDA");
        write("");
        write("All authored by a human. Assisted by careful measurement.", "warn");
      },

      pip: function (args) {
        var pkg = (args[1] || "").toLowerCase();
        if ((args[0] || "") !== "install") { write("pip: try 'pip install evlab'", "err"); return; }
        if (pkg === "evlab") {
          write("Collecting evlab …", "ok");
          write("  inspect · convert · denoise · corrupt · benchmark event-camera data");
          write("  six physically modeled corruptions, reproducible recipes, 12 monitor features");
          write("Successfully installed evlab  →  <a href='https://github.com/JPL11/evlab' target='_blank' rel='noopener'>github.com/JPL11/evlab</a>", "ok");
        } else if (pkg === "quantcard") {
          write("Collecting quantcard …", "ok");
          write("  quantization report cards: accuracy delta × size × latency per config");
          write("  plus per-layer sensitivity and a CI gate (quantcard check)");
          write("Successfully installed quantcard  →  <a href='https://github.com/JPL11/quantcard' target='_blank' rel='noopener'>github.com/JPL11/quantcard</a>", "ok");
        } else {
          write("ERROR: No matching distribution found for '" + escapeHtml(pkg || "") + "'", "err");
          write("This node only serves evlab and quantcard. Everything else is on real PyPI.", "warn");
        }
      },

      neofetch: function () {
        write("        <span class='ok'>visitor</span>@<span class='ok'>jpl11</span>", "hdr");
        write("        ------------------");
        write("        OS      : jpl11 2026.07 (Neuromorphic remix)");
        write("        Host    : GitHub Pages, free tier, proudly");
        write("        Kernel  : vanilla JS, no build step");
        write("        Uptime  : teaching since 2024, researching since 2023");
        write("        Packages: 2 (pip) + 8 merged PRs (upstream)");
        write("        Shell   : this one");
        write("        GPU     : whatever SLURM grants today");
      },

      sudo: function () {
        write("visitor is not in the sudoers file.", "err");
        write("This incident will be reported (to no one; analytics are not installed).", "warn");
      },

      exit: function () {
        write("logout", "out");
        write("Connection to jpl11 intentionally kept open. Try the nav above instead.", "warn");
      },

      ls: function () {
        write("about.txt    projects/    opensource/    experience/    skills.txt");
        write("resume.pdf   contact.txt  <span class='warn'>phd_dreams.sbatch</span>");
      },

      cat: function (args) {
        var f = (args[0] || "").toLowerCase().replace(/\.(txt|pdf|md)$/, "").replace(/\/$/, "");
        if (f === "phd_dreams") { commands.sbatch(["phd_dreams.sbatch"]); return; }
        if (commands[f]) return commands[f]([]);
        write("cat: " + escapeHtml(args[0] || "(no file)") + ": No such file. Try 'ls'.", "err");
      },

      whoami: function () { write("visitor — but the interesting question is 'cat about.txt'"); },
      clear: function () { body.innerHTML = ""; },
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

    function tabComplete() {
      var v = input.value;
      var mAdd = v.match(/^(module\s+(?:add|load)\s+)(\S*)$/i);
      if (mAdd) {
        var hits = Object.keys(MODULES).filter(function (k) {
          return k.indexOf(mAdd[2]) === 0 || k.split("/")[1].indexOf(mAdd[2]) === 0;
        });
        if (hits.length === 1) input.value = mAdd[1] + hits[0];
        else if (hits.length > 1) write(hits.join("   "), "warn");
        return;
      }
      var names = Object.keys(commands).filter(function (k) { return k && k.indexOf(v.toLowerCase()) === 0; });
      if (names.length === 1) input.value = names[0] + " ";
      else if (names.length > 1) write(names.join("   "), "warn");
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var v = input.value;
        input.value = "";
        run(v);
      } else if (e.key === "Tab") {
        tabComplete();
        e.preventDefault();
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

    // Boot banner — an affectionate parody of an HPC login-node MOTD.
    var now = new Date();
    var stamp = now.toDateString() + " " + now.toTimeString().slice(0, 8);
    write("Welcome to jpl11 release 2026.07", "hdr");
    write("                                      Based on Edge AI (Neuromorphic remix)");
    write("                                                               ID: #000001");
    write("---------------------------------------------------------------------------");
    write("");
    write("                                WELCOME TO");
    write("                          _ ____  _     _ _", "ok");
    write("                         | |  _ \\| |   / | |", "ok");
    write("                      _  | | |_) | |   | | |", "ok");
    write("                     | |_| |  __/| |__ | | |", "ok");
    write("                      \\___/|_|   |____||_|_|", "ok");
    write("");
    write("---------------------------------------------------------------------------");
    write("Use the following commands to explore this node:");
    write("");
    write("  '<span class='ok'>module avail</span>'   — show available research modules");
    write("  '<span class='ok'>squeue</span>'         — what's running (and what reviewers are holding)");
    write("  '<span class='ok'>help</span>'           — everything else");
    write("");
    write("---------------------------------------------------------------------------");
    write("Last login: " + stamp + " from your.browser", "warn");
    write("");
    setTimeout(function () { input.focus({ preventScroll: true }); }, 200);
  }

  function autoScrollToConsole() {
    if (window.location.hash) return;
    var target = document.querySelector("[data-autoscroll]");
    if (!target) return;
    var nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
    if (nav.type && nav.type !== "navigate") return;
    if (window.scrollY > 4) return; // user already scrolled — don't fight them

    var userInterrupted = false;
    var onIntr = function () { userInterrupted = true; };
    window.addEventListener("wheel", onIntr, { passive: true, once: true });
    window.addEventListener("touchstart", onIntr, { passive: true, once: true });
    window.addEventListener("keydown", onIntr, { once: true });

    setTimeout(function () {
      if (userInterrupted) return;
      var header = document.querySelector(".site-header");
      var offset = (header ? header.offsetHeight : 0) + 8;
      var y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, left: 0, behavior: "smooth" });
    }, 350);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-terminal]").forEach(init);
    if (document.querySelector("[data-autoscroll]")) {
      window.addEventListener("load", autoScrollToConsole);
    }
  });
})();
