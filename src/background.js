
(() => {
  "use strict";
  const a = chrome.storage.local;
  let e = [];
  const o =
      "https?://w*.?amazon.(ae|ca|cn|co.jp|co.uk|com.au|com.br|com.mx|com.sg|com.tr|com|de|eg|es|fr|ie|in|it|nl|pl|se|sg)/w*",
    n = new RegExp(o);

  chrome.webRequest.onBeforeRequest.addListener(
    function (a) {
      if (a && a.url) {
        const o = (function (a) {
          let o = decodeURIComponent(a);
          var n, t;
          !o.includes("?") &&
            o.includes("&") &&
            ((n = o),
            (t = o.lastIndexOf("/")),
            "?",
            (o = n.substr(0, t) + "?" + n.substr(t + "?".length)));
          const s = new URL(o);
          let r = !1;
          const c = s.searchParams,
            m = c.get("tag");
          return (
            m &&
              !s.pathname.includes("watchlistToggle") &&
              (e.push(m), (r = !0), c.delete("tag")),
            c.has("ascsubtag") &&
              (e.push(c.get("ascsubtag")), (r = !0), c.delete("ascsubtag")),
            { match: r, url: s.toString() }
          );
        })(a.url);
        if (o.match) return { redirectUrl: o.url };
      }
    },
    {
      urls: [
        "*://*.amazon.ae/*",
        "*://*.amazon.at/*",
        "*://*.amazon.ca/*",
        "*://*.amazon.cn/*",
        "*://*.amazon.co.jp/*",
        "*://*.amazon.co.uk/*",
        "*://*.amazon.com.au/*",
        "*://*.amazon.com.br/*",
        "*://*.amazon.com.mx/*",
        "*://*.amazon.com.sg/*",
        "*://*.amazon.com.tr/*",
        "*://*.amazon.com/*",
        "*://*.amazon.de/*",
        "*://*.amazon.eg/*",
        "*://*.amazon.es/*",
        "*://*.amazon.fr/*",
        "*://*.amazon.ie/*",
        "*://*.amazon.in/*",
        "*://*.amazon.it/*",
        "*://*.amazon.nl/*",
        "*://*.amazon.pl/*",
        "*://*.amazon.se/*",
        "*://*.amazon.sg/*",
      ],
    },
    ["blocking"]
  ),
    chrome.webNavigation.onCompleted.addListener(
      (o) => {
        n.test(o.url) 
              chrome.notifications
                  .create("", {
                    iconUrl: "icons/icon64.png",
                    message: `The following tags were found and have been removed: ${e}`,
                    title: "Deffiliated this link successfully!",
                    type: "basic",
                  })
                  e = [];
      },
      { url: [{ urlMatches: o }] }
    );
})();
