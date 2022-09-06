"use strict";
var _typeof =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function (e) {
        return typeof e;
      }
    : function (e) {
        return e &&
          "function" == typeof Symbol &&
          e.constructor === Symbol &&
          e !== Symbol.prototype
          ? "symbol"
          : typeof e;
      };
!(function e(t, n, a) {
  function r(o, l) {
    if (!n[o]) {
      if (!t[o]) {
        var s = "function" == typeof require && require;
        if (!l && s) return s(o, !0);
        if (i) return i(o, !0);
        var u = new Error("Cannot find module '" + o + "'");
        throw ((u.code = "MODULE_NOT_FOUND"), u);
      }
      var c = (n[o] = { exports: {} });
      t[o][0].call(
        c.exports,
        function (e) {
          var n = t[o][1][e];
          return r(n || e);
        },
        c,
        c.exports,
        e,
        t,
        n,
        a
      );
    }
    return n[o].exports;
  }
  for (
    var i = "function" == typeof require && require, o = 0;
    o < a.length;
    o++
  )
    r(a[o]);
  return r;
})(
  {
    1: [
      function (e, t, n) {
        (function (e) {
          var n =
              "undefined" != typeof window
                ? window
                : "undefined" != typeof WorkerGlobalScope &&
                  self instanceof WorkerGlobalScope
                ? self
                : {},
            a = (function () {
              var e = /\blang(?:uage)?-(\w+)\b/i,
                t = 0,
                a = (n.Prism = {
                  manual: n.Prism && n.Prism.manual,
                  disableWorkerMessageHandler:
                    n.Prism && n.Prism.disableWorkerMessageHandler,
                  util: {
                    encode: function (e) {
                      return e instanceof r
                        ? new r(e.type, a.util.encode(e.content), e.alias)
                        : "Array" === a.util.type(e)
                        ? e.map(a.util.encode)
                        : e
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/\u00a0/g, " ");
                    },
                    type: function (e) {
                      return Object.prototype.toString
                        .call(e)
                        .match(/\[object (\w+)\]/)[1];
                    },
                    objId: function (e) {
                      return (
                        e.__id ||
                          Object.defineProperty(e, "__id", { value: ++t }),
                        e.__id
                      );
                    },
                    clone: function (e) {
                      switch (a.util.type(e)) {
                        case "Object":
                          var t = {};
                          for (var n in e)
                            e.hasOwnProperty(n) && (t[n] = a.util.clone(e[n]));
                          return t;
                        case "Array":
                          return e.map(function (e) {
                            return a.util.clone(e);
                          });
                      }
                      return e;
                    }
                  },
                  languages: {
                    extend: function (e, t) {
                      var n = a.util.clone(a.languages[e]);
                      for (var r in t) n[r] = t[r];
                      return n;
                    },
                    insertBefore: function (e, t, n, r) {
                      var i = (r = r || a.languages)[e];
                      if (2 == arguments.length) {
                        n = arguments[1];
                        for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                        return i;
                      }
                      var l = {};
                      for (var s in i)
                        if (i.hasOwnProperty(s)) {
                          if (s == t)
                            for (var o in n)
                              n.hasOwnProperty(o) && (l[o] = n[o]);
                          l[s] = i[s];
                        }
                      return (
                        a.languages.DFS(a.languages, function (t, n) {
                          n === r[e] && t != e && (this[t] = l);
                        }),
                        (r[e] = l)
                      );
                    },
                    DFS: function (e, t, n, r) {
                      r = r || {};
                      for (var i in e)
                        e.hasOwnProperty(i) &&
                          (t.call(e, i, e[i], n || i),
                          "Object" !== a.util.type(e[i]) ||
                          r[a.util.objId(e[i])]
                            ? "Array" !== a.util.type(e[i]) ||
                              r[a.util.objId(e[i])] ||
                              ((r[a.util.objId(e[i])] = !0),
                              a.languages.DFS(e[i], t, i, r))
                            : ((r[a.util.objId(e[i])] = !0),
                              a.languages.DFS(e[i], t, null, r)));
                    }
                  },
                  plugins: {},
                  highlightAll: function (e, t) {
                    var n = {
                      callback: t,
                      selector:
                        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    a.hooks.run("before-highlightall", n);
                    for (
                      var r,
                        i = n.elements || document.querySelectorAll(n.selector),
                        o = 0;
                      (r = i[o++]);

                    )
                      a.highlightElement(r, !0 === e, n.callback);
                  },
                  highlightElement: function (t, r, i) {
                    for (var o, l, s = t; s && !e.test(s.className); )
                      s = s.parentNode;
                    s &&
                      ((o = (s.className.match(e) || [, ""])[1].toLowerCase()),
                      (l = a.languages[o])),
                      (t.className =
                        t.className.replace(e, "").replace(/\s+/g, " ") +
                        " language-" +
                        o),
                      t.parentNode &&
                        ((s = t.parentNode),
                        /pre/i.test(s.nodeName) &&
                          (s.className =
                            s.className.replace(e, "").replace(/\s+/g, " ") +
                            " language-" +
                            o));
                    var u = {
                      element: t,
                      language: o,
                      grammar: l,
                      code: t.textContent
                    };
                    if (
                      (a.hooks.run("before-sanity-check", u),
                      !u.code || !u.grammar)
                    )
                      return (
                        u.code &&
                          (a.hooks.run("before-highlight", u),
                          (u.element.textContent = u.code),
                          a.hooks.run("after-highlight", u)),
                        void a.hooks.run("complete", u)
                      );
                    if ((a.hooks.run("before-highlight", u), r && n.Worker)) {
                      var c = new Worker(a.filename);
                      (c.onmessage = function (e) {
                        (u.highlightedCode = e.data),
                          a.hooks.run("before-insert", u),
                          (u.element.innerHTML = u.highlightedCode),
                          i && i.call(u.element),
                          a.hooks.run("after-highlight", u),
                          a.hooks.run("complete", u);
                      }),
                        c.postMessage(
                          JSON.stringify({
                            language: u.language,
                            code: u.code,
                            immediateClose: !0
                          })
                        );
                    } else
                      (u.highlightedCode = a.highlight(
                        u.code,
                        u.grammar,
                        u.language
                      )),
                        a.hooks.run("before-insert", u),
                        (u.element.innerHTML = u.highlightedCode),
                        i && i.call(t),
                        a.hooks.run("after-highlight", u),
                        a.hooks.run("complete", u);
                  },
                  highlight: function (e, t, n) {
                    var i = a.tokenize(e, t);
                    return r.stringify(a.util.encode(i), n);
                  },
                  matchGrammar: function (e, t, n, r, i, o, l) {
                    var s = a.Token;
                    for (var u in n)
                      if (n.hasOwnProperty(u) && n[u]) {
                        if (u == l) return;
                        var c = n[u];
                        c = "Array" === a.util.type(c) ? c : [c];
                        for (var d = 0; d < c.length; ++d) {
                          var p = c[d],
                            g = p.inside,
                            f = !!p.lookbehind,
                            m = !!p.greedy,
                            h = 0,
                            v = p.alias;
                          if (m && !p.pattern.global) {
                            var y = p.pattern.toString().match(/[imuy]*$/)[0];
                            p.pattern = RegExp(p.pattern.source, y + "g");
                          }
                          p = p.pattern || p;
                          for (
                            var b = r, w = i;
                            b < t.length;
                            w += t[b].length, ++b
                          ) {
                            var k = t[b];
                            if (t.length > e.length) return;
                            if (!(k instanceof s)) {
                              p.lastIndex = 0;
                              var A = 1;
                              if (!(N = p.exec(k)) && m && b != t.length - 1) {
                                if (((p.lastIndex = w), !(N = p.exec(e))))
                                  break;
                                for (
                                  var S = N.index + (f ? N[1].length : 0),
                                    x = N.index + N[0].length,
                                    E = b,
                                    L = w,
                                    F = t.length;
                                  E < F &&
                                  (L < x || (!t[E].type && !t[E - 1].greedy));
                                  ++E
                                )
                                  S >= (L += t[E].length) && (++b, (w = L));
                                if (t[b] instanceof s || t[E - 1].greedy)
                                  continue;
                                (A = E - b),
                                  (k = e.slice(w, L)),
                                  (N.index -= w);
                              }
                              if (N) {
                                f && (h = N[1].length);
                                x =
                                  (S = N.index + h) +
                                  (N = N[0].slice(h)).length;
                                var N,
                                  j = k.slice(0, S),
                                  q = k.slice(x),
                                  C = [b, A];
                                j && (++b, (w += j.length), C.push(j));
                                var P = new s(
                                  u,
                                  g ? a.tokenize(N, g) : N,
                                  v,
                                  N,
                                  m
                                );
                                if (
                                  (C.push(P),
                                  q && C.push(q),
                                  Array.prototype.splice.apply(t, C),
                                  1 != A &&
                                    a.matchGrammar(e, t, n, b, w, !0, u),
                                  o)
                                )
                                  break;
                              } else if (o) break;
                            }
                          }
                        }
                      }
                  },
                  tokenize: function (e, t, n) {
                    var r = [e],
                      i = t.rest;
                    if (i) {
                      for (var o in i) t[o] = i[o];
                      delete t.rest;
                    }
                    return a.matchGrammar(e, r, t, 0, 0, !1), r;
                  },
                  hooks: {
                    all: {},
                    add: function (e, t) {
                      var n = a.hooks.all;
                      (n[e] = n[e] || []), n[e].push(t);
                    },
                    run: function (e, t) {
                      var n = a.hooks.all[e];
                      if (n && n.length)
                        for (var r, i = 0; (r = n[i++]); ) r(t);
                    }
                  }
                }),
                r = (a.Token = function (e, t, n, a, r) {
                  (this.type = e),
                    (this.content = t),
                    (this.alias = n),
                    (this.length = 0 | (a || "").length),
                    (this.greedy = !!r);
                });
              if (
                ((r.stringify = function (e, t, n) {
                  if ("string" == typeof e) return e;
                  if ("Array" === a.util.type(e))
                    return e
                      .map(function (n) {
                        return r.stringify(n, t, e);
                      })
                      .join("");
                  var i = {
                    type: e.type,
                    content: r.stringify(e.content, t, n),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: n
                  };
                  if (e.alias) {
                    var o =
                      "Array" === a.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(i.classes, o);
                  }
                  a.hooks.run("wrap", i);
                  var l = Object.keys(i.attributes)
                    .map(function (e) {
                      return (
                        e +
                        '="' +
                        (i.attributes[e] || "").replace(/"/g, "&quot;") +
                        '"'
                      );
                    })
                    .join(" ");
                  return (
                    "<" +
                    i.tag +
                    ' class="' +
                    i.classes.join(" ") +
                    '"' +
                    (l ? " " + l : "") +
                    ">" +
                    i.content +
                    "</" +
                    i.tag +
                    ">"
                  );
                }),
                !n.document)
              )
                return n.addEventListener
                  ? (a.disableWorkerMessageHandler ||
                      n.addEventListener(
                        "message",
                        function (e) {
                          var t = JSON.parse(e.data),
                            r = t.language,
                            i = t.code,
                            o = t.immediateClose;
                          n.postMessage(a.highlight(i, a.languages[r], r)),
                            o && n.close();
                        },
                        !1
                      ),
                    n.Prism)
                  : n.Prism;
              var i =
                document.currentScript ||
                [].slice.call(document.getElementsByTagName("script")).pop();
              return (
                i &&
                  ((a.filename = i.src),
                  a.manual ||
                    i.hasAttribute("data-manual") ||
                    ("loading" !== document.readyState
                      ? window.requestAnimationFrame
                        ? window.requestAnimationFrame(a.highlightAll)
                        : window.setTimeout(a.highlightAll, 16)
                      : document.addEventListener(
                          "DOMContentLoaded",
                          a.highlightAll
                        ))),
                n.Prism
              );
            })();
          void 0 !== t && t.exports && (t.exports = a),
            void 0 !== e && (e.Prism = a),
            (a.languages.markup = {
              comment: /<!--[\s\S]*?-->/,
              prolog: /<\?[\s\S]+?\?>/,
              doctype: /<!DOCTYPE[\s\S]+?>/i,
              cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
              tag: {
                pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                inside: {
                  tag: {
                    pattern: /^<\/?[^\s>\/]+/i,
                    inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
                  },
                  "attr-value": {
                    pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                    inside: {
                      punctuation: [
                        /^=/,
                        { pattern: /(^|[^\\])["']/, lookbehind: !0 }
                      ]
                    }
                  },
                  punctuation: /\/?>/,
                  "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: { namespace: /^[^\s>\/:]+:/ }
                  }
                }
              },
              entity: /&#?[\da-z]{1,8};/i
            }),
            (a.languages.markup.tag.inside["attr-value"].inside.entity =
              a.languages.markup.entity),
            a.hooks.add("wrap", function (e) {
              "entity" === e.type &&
                (e.attributes.title = e.content.replace(/&amp;/, "&"));
            }),
            (a.languages.xml = a.languages.markup),
            (a.languages.html = a.languages.markup),
            (a.languages.mathml = a.languages.markup),
            (a.languages.svg = a.languages.markup),
            (a.languages.css = {
              comment: /\/\*[\s\S]*?\*\//,
              atrule: {
                pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
                inside: { rule: /@[\w-]+/ }
              },
              url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
              selector: /[^{}\s][^{};]*?(?=\s*\{)/,
              string: {
                pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
              },
              property: /[\w-]+(?=\s*:)/i,
              important: /\B!important\b/i,
              function: /[-a-z0-9]+(?=\()/i,
              punctuation: /[(){};:]/
            }),
            (a.languages.css.atrule.inside.rest = a.util.clone(
              a.languages.css
            )),
            a.languages.markup &&
              (a.languages.insertBefore("markup", "tag", {
                style: {
                  pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
                  lookbehind: !0,
                  inside: a.languages.css,
                  alias: "language-css"
                }
              }),
              a.languages.insertBefore(
                "inside",
                "attr-value",
                {
                  "style-attr": {
                    pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                    inside: {
                      "attr-name": {
                        pattern: /^\s*style/i,
                        inside: a.languages.markup.tag.inside
                      },
                      punctuation: /^\s*=\s*['"]|['"]\s*$/,
                      "attr-value": { pattern: /.+/i, inside: a.languages.css }
                    },
                    alias: "language-css"
                  }
                },
                a.languages.markup.tag
              )),
            (a.languages.clike = {
              comment: [
                { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
                { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }
              ],
              string: {
                pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
              },
              "class-name": {
                pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
                lookbehind: !0,
                inside: { punctuation: /[.\\]/ }
              },
              keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
              boolean: /\b(?:true|false)\b/,
              function: /[a-z0-9_]+(?=\()/i,
              number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
              operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
              punctuation: /[{}[\];(),.:]/
            }),
            (a.languages.javascript = a.languages.extend("clike", {
              keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
              number: /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
              function: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*\()/i,
              operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
            })),
            a.languages.insertBefore("javascript", "keyword", {
              regex: {
                pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
                lookbehind: !0,
                greedy: !0
              },
              "function-variable": {
                pattern: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)\s*=>))/i,
                alias: "function"
              }
            }),
            a.languages.insertBefore("javascript", "string", {
              "template-string": {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                greedy: !0,
                inside: {
                  interpolation: {
                    pattern: /\$\{[^}]+\}/,
                    inside: {
                      "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                      },
                      rest: a.languages.javascript
                    }
                  },
                  string: /[\s\S]+/
                }
              }
            }),
            a.languages.markup &&
              a.languages.insertBefore("markup", "tag", {
                script: {
                  pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                  lookbehind: !0,
                  inside: a.languages.javascript,
                  alias: "language-javascript"
                }
              }),
            (a.languages.js = a.languages.javascript),
            "undefined" != typeof self &&
              self.Prism &&
              self.document &&
              document.querySelector &&
              ((self.Prism.fileHighlight = function () {
                var e = {
                  js: "javascript",
                  py: "python",
                  rb: "ruby",
                  ps1: "powershell",
                  psm1: "powershell",
                  sh: "bash",
                  bat: "batch",
                  h: "c",
                  tex: "latex"
                };
                Array.prototype.slice
                  .call(document.querySelectorAll("pre[data-src]"))
                  .forEach(function (t) {
                    for (
                      var n,
                        r = t.getAttribute("data-src"),
                        i = t,
                        o = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
                      i && !o.test(i.className);

                    )
                      i = i.parentNode;
                    if ((i && (n = (t.className.match(o) || [, ""])[1]), !n)) {
                      var l = (r.match(/\.(\w+)$/) || [, ""])[1];
                      n = e[l] || l;
                    }
                    var s = document.createElement("code");
                    (s.className = "language-" + n),
                      (t.textContent = ""),
                      (s.textContent = "Loadingâ€¦"),
                      t.appendChild(s);
                    var u = new XMLHttpRequest();
                    u.open("GET", r, !0),
                      (u.onreadystatechange = function () {
                        4 == u.readyState &&
                          (u.status < 400 && u.responseText
                            ? ((s.textContent = u.responseText),
                              a.highlightElement(s))
                            : u.status >= 400
                            ? (s.textContent =
                                "âœ– Error " +
                                u.status +
                                " while fetching file: " +
                                u.statusText)
                            : (s.textContent =
                                "âœ– Error: File does not exist or is empty"));
                      }),
                      u.send(null);
                  });
              }),
              document.addEventListener(
                "DOMContentLoaded",
                self.Prism.fileHighlight
              ));
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        ));
      },
      {}
    ],
    2: [
      function (e, t, n) {
        (function (e) {
          !(function (e, a) {
            "function" == typeof define && define.amd
              ? define([], a(e))
              : "object" === (void 0 === n ? "undefined" : _typeof(n))
              ? (t.exports = a(e))
              : (e.trulyResponsiveTable = a(e));
          })(void 0 !== e ? e : window || this.global, function (e) {
            return function (t, n) {
              n = (function (e, t) {
                var n;
                for (n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e;
              })({ breakpoint: 768 }, (n = n || {}));
              var a = !!document.querySelector && !!e.addEventListener,
                r = this;
              r.params = n;
              var i,
                o = function () {
                  for (
                    var t = r.element.querySelectorAll("[data-product]"), n = 0;
                    n < t.length;
                    n++
                  ) {
                    var a = t[n];
                    e.innerWidth >= r.params.breakpoint
                      ? ("TH" == a.nodeName ||
                          a.hasAttribute("data-mobile-expand")) &&
                        a.setAttribute("colspan", 1)
                      : ("TH" == a.nodeName ||
                          a.hasAttribute("data-mobile-expand")) &&
                        a.setAttribute("colspan", 2);
                  }
                },
                l = function (e) {
                  e.addEventListener("click", d, !1);
                },
                s = function (e) {
                  u(),
                    r.wrapper
                      .querySelector('a[data-product="' + e + '" ]')
                      .classList.add("active"),
                    (r.selectedProduct = e);
                  for (
                    var t = r.wrapper.querySelectorAll(
                        '[data-product="' + e + '"]'
                      ),
                      n = 0;
                    n < t.length;
                    n++
                  )
                    t[n].classList.add("active");
                },
                u = function () {
                  for (
                    var e = r.wrapper.querySelectorAll(".active[data-product]"),
                      t = 0;
                    t < e.length;
                    t++
                  )
                    e[t].classList.remove("active");
                },
                c = function (e) {
                  clearTimeout(i),
                    (i = setTimeout(function () {
                      o();
                    }, 50));
                },
                d = function (e) {
                  e.preventDefault(), s(e.target.getAttribute("data-product"));
                },
                p = function (e) {
                  var t = e.target.getAttribute("data-tooltip"),
                    n = document.createElement("div");
                  (n.className = "tr-tooltip"),
                    (n.innerHTML = t),
                    r.wrapper.appendChild(n);
                },
                g = function (e) {
                  var t = r.wrapper.querySelector(".tr-tooltip");
                  t.parentNode.removeChild(t);
                },
                f = function (e) {
                  var t = r.wrapper.querySelector(".tr-tooltip"),
                    n = e.pageX + 20,
                    a = e.pageY + 10;
                  (t.style.top = a + "px"), (t.style.left = n + "px");
                };
              return (
                (r.destroy = function () {
                  r.params &&
                    r.wrapper &&
                    (e.removeEventListener("resize", c, !1),
                    r.element.removeAttribute("data-tr-table"),
                    (function () {
                      for (
                        var e = r.wrapper.querySelectorAll("[data-tooltip]"),
                          t = 0;
                        t < e.length;
                        t++
                      ) {
                        var n = e[t];
                        n.removeEventListener("mouseover", p, !1),
                          n.removeEventListener("mouseout", g, !1),
                          n.removeEventListener("mousemove", f, !1);
                      }
                    })(),
                    u(),
                    (function () {
                      var e = r.wrapper.querySelector(".product-selector");
                      e && e.parentNode.removeChild(e);
                    })(),
                    (function () {
                      for (
                        var e = r.element.querySelectorAll("[data-product]"),
                          t = 0;
                        t < e.length;
                        t++
                      ) {
                        var n = e[t];
                        ("TH" == n.nodeName ||
                          n.hasAttribute("data-mobile-expand")) &&
                          n.setAttribute("colspan", 1);
                      }
                    })(),
                    (function () {
                      for (
                        var e = r.element.querySelectorAll("[data-product]"),
                          t = 0;
                        t < e.length;
                        t++
                      ) {
                        var n = e[t];
                        n.classList.contains("tr-featured") &&
                          n.classList.remove("tr-featured");
                      }
                    })(),
                    (function () {
                      for (
                        var e = r.element.querySelectorAll("[data-product]"),
                          t = 0;
                        t < e.length;
                        t++
                      )
                        e[t].removeAttribute("data-product");
                    })(),
                    (r.wrapper.outerHTML = r.wrapper.innerHTML),
                    (r.wrapper = void 0));
                }),
                (r.init = function () {
                  a &&
                    (t
                      ? (r.destroy(),
                        (r.element = (function (e) {
                          return (
                            "object" ===
                              (void 0 === e ? "undefined" : _typeof(e)) &&
                            (!!e.nodeName || void 0)
                          );
                        })(t)
                          ? t
                          : document.getElementById(t)),
                        r.element.setAttribute("data-tr-table", ""),
                        (r.wrapper = document.createElement("div")),
                        (r.selectedProduct = "product-1"),
                        (function () {
                          var e = r.element.parentNode;
                          r.wrapper.classList.add("tr-wrapper-" + r.element.id),
                            e.replaceChild(r.wrapper, r.element),
                            r.wrapper.appendChild(r.element);
                        })(),
                        (function () {
                          for (
                            var e = r.element.querySelectorAll(
                                "td, thead th:not([data-mobile-collapse])"
                              ),
                              t = 0;
                            t < e.length;
                            t++
                          ) {
                            var n = e[t];
                            n.setAttribute(
                              "data-product",
                              "product-" + n.cellIndex
                            ),
                              n.hasAttribute("data-selected") &&
                                (r.selectedProduct = n.getAttribute(
                                  "data-product"
                                ));
                          }
                        })(),
                        (function () {
                          for (
                            var e = r.element.querySelectorAll(
                                "thead th[data-product]"
                              ),
                              t = 0;
                            t < e.length;
                            t++
                          ) {
                            var n = e[t];
                            if (n.hasAttribute("data-featured")) {
                              var a = r.element.querySelectorAll(
                                '[data-product="' +
                                  n.getAttribute("data-product") +
                                  '"]'
                              );
                              for (t = 0; t < a.length; t++)
                                a[t].classList.add("tr-featured");
                              r.wrapper.classList.add("has-featured-column");
                            }
                          }
                        })(),
                        o(),
                        (function () {
                          var e = document.createElement("div");
                          (e.className = "product-selector clearfix"),
                            r.element.parentNode.insertBefore(e, r.element);
                          for (
                            var t = r.element.querySelectorAll(
                                "thead th[data-product]"
                              ),
                              n = 0;
                            n < t.length;
                            n++
                          ) {
                            var a = t[n],
                              i = document.createElement("a");
                            i.setAttribute(
                              "data-product",
                              a.getAttribute("data-product")
                            ),
                              i.setAttribute("href", "#"),
                              (i.innerHTML =
                                a.getAttribute("data-mobile-content") ||
                                a.innerHTML),
                              e.appendChild(i),
                              l(i);
                          }
                        })(),
                        s(r.selectedProduct),
                        (function () {
                          for (
                            var e = r.wrapper.querySelectorAll(
                                "[data-tooltip]"
                              ),
                              t = 0;
                            t < e.length;
                            t++
                          ) {
                            var n = e[t];
                            n.addEventListener("mouseover", p, !1),
                              n.addEventListener("mouseout", g, !1),
                              n.addEventListener("mousemove", f, !1);
                          }
                        })(),
                        e.addEventListener("resize", c, !1))
                      : console.error("You must provide an valid id"));
                }),
                r.init(),
                r
              );
            };
          });
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        ));
      },
      {}
    ],
    3: [
      function (e, t, n) {
        var a = e("./components/truly-responsive-table");
        e("prismjs");
        if (document.getElementById("pricing-table"))
          new a("pricing-table", { breakpoint: 1023 });
        if (document.getElementById("pricing-table"))
          new a("comparison-table", { breakpoint: 1023 });
      },
      { "./components/truly-responsive-table": 2, prismjs: 1 }
    ]
  },
  {},
  [3]
);
