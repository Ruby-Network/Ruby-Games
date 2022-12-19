window.google || (window.google = {});
(function () {
  google.doodle || (google.doodle = {}); - 1 < window.location.hash.indexOf("bg=black") && (document.body.style.background = "#000");
  var d = -1 < window.location.hash.indexOf("autoplay");
  if (d) {
    var f = document.getElementById("hplogo-f");
    f && f.parentNode && f.parentNode.removeChild(f)
  }

  function g(a) {
    google.doodle.pmlInstalled || (google.doodle.pmlInstalled = !0, a || (document.getElementById("hplogo").style.background = "black", window.setTimeout(function () {
      var c = document.getElementById("hplogo-l");
      c && (c.style.display = "block")
    }, 0)), a = document.createElement("script"), a.type = "text/javascript", a.src = "./logos/js/pacman10-hp.12.js", (document.getElementById("xjsc") || document.body).appendChild(a))
  }

  function h() {
    for (var a = document.forms, c = ["f", "gs", "tsf", "gbqf"], b = 0, e; e = c[b++];)
      if (e = a[e]) return e;
    return null
  }

  function k() {
    var a = h();
    a && a.btnI && (a.btnI.onclick = function () {
      "undefined" != typeof google.pacman ? google.pacman.insertCoin() : (google.doodle.pacManSound = !0, g(!1));
      return !1
    })
  }
  google.doodle.pmlLoaded || (google.doodle.pmlLoaded = !0, window.setTimeout(function () {
    var a = h();
    a && a.q && "" == a.q.value && g(!0)
  }, 0), d ? (google.doodle.pacManSound = !0, g(!1)) : (window.setTimeout(k, 0), google.g && google.g.push(k)), google.dstr && google.dstr.push(function () {
    google.pacman && google.pacman.destroy();
    if (google.doodle.pmlInstalled) {
      for (var a = (document.getElementById("xjsc") || document.body).getElementsByTagName("script"), c = 0, b; b = a[c++];) - 1 != b.src.indexOf("./logos/js/pacman10-hp.12.js") && b && b.parentNode && b.parentNode.removeChild(b);
      google.doodle.pmlInstalled = !1
    }
  }));
  google.doodle.pacManQuery = function () {
    location.reload();
  };
}).call(this);
