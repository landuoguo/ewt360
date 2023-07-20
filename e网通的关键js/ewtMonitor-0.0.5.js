! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.EwtLog = e()
}(this, function () {
    "use strict";
    var n = function (e) {
            function n(t) {
                if (r) {
                    var e = r.timing;
                    return {
                        name: t,
                        pervPage: n(e.fetchStart, e.navigationStart),
                        redirect: n(e.redirectEnd, e.redirectStart),
                        dns: n(e.domainLookupEnd, e.domainLookupStart),
                        connect: n(e.connectEnd, e.connectStart),
                        network: n(e.connectEnd, e.navigationStart),
                        send: n(e.responseStart, e.requestStart),
                        receive: n(e.responseEnd, e.responseStart),
                        request: n(e.responseEnd, e.requestStart),
                        dom: n(e.domComplete, e.domLoading),
                        loadEvent: n(e.loadEventEnd, e.loadEventStart),
                        frontend: n(e.loadEventEnd, e.domLoading),
                        load: n(e.loadEventEnd, e.navigationStart),
                        domReady: n(e.domContentLoadedEventStart, e.navigationStart),
                        interactive: n(e.domInteractive, e.navigationStart),
                        ttfb: n(e.responseStart, e.navigationStart)
                    }
                }

                function n(t, e) {
                    if (0 < t && 90 < e && 0 < t - e) return t - e
                }
            }
            var o = !1,
                r = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance,
                a = {
                    addEventListener: function (t, e, n) {
                        return window.addEventListener ? window.addEventListener(t, e, n) : window.attachEvent ? window.attachEvent("on" + t, e) : void 0
                    },
                    domready: function (t) {
                        var e;

                        function n() {
                            r.timing.domInteractive ? (clearTimeout(e), t()) : e = setTimeout(n, 100)
                        }!0 !== o && (e = null, "interactive" === document.readyState ? n() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function () {
                            n()
                        }, !1) : document.attachEvent && document.attachEvent("onreadystatechange", function () {
                            n()
                        }))
                    },
                    onload: function (t) {
                        var e = null;

                        function n() {
                            r.timing.loadEventEnd ? (clearTimeout(e), t(), o = !0) : e = setTimeout(n, 100)
                        }
                        "complete" === document.readyState ? n() : a.addEventListener("load", function () {
                            n()
                        }, !1)
                    }
                };
            a.domready(function () {
                var t = n("domready");
                t.type = "domready", e(t)
            }), a.onload(function () {
                var t = n("onload");
                t.type = "onload", e(t)
            })
        },
        u = function (t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function (t, e) {
                var n = [],
                    o = !0,
                    r = !1,
                    a = void 0;
                try {
                    for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
                } catch (t) {
                    r = !0, a = t
                } finally {
                    try {
                        !o && s.return && s.return()
                    } finally {
                        if (r) throw a
                    }
                }
                return n
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        o = function (c) {
            var u = window.onerror;
            window.onerror = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                var o = e[0],
                    r = e[1],
                    a = e[2],
                    i = e[3],
                    s = e[4],
                    s = l(s);
                s._errorMessage = o, s._scriptURI = r, s._lineNumber = a, s._columnNumber = i, s.type = "onerror", c(s), u && u.apply(window, e)
            };
            var a = window.onunhandledrejection;
            window.onunhandledrejection = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                var o = e[0],
                    r = o.reason;
                c({
                    type: o.type || "unhandledrejection",
                    reason: r
                }), a && a.apply(window, e)
            }
        },
        l = function (t) {
            var e = t.column || t.columnNumber,
                n = t.line || t.lineNumber,
                o = t.message,
                r = t.name,
                a = t.stack;
            if (a) {
                var i = a.match(/https?:\/\/[^\n]+/),
                    s = i ? i[0] : "",
                    c = /https:\/\/(\S)*\.js/,
                    t = "";
                c.test(s) && (t = s.match(c)[0]);
                i = null, c = null, s = s.match(/:(\d+):(\d+)/);
                return s && 3 <= s.length && (i = (s = u(s, 3))[1], c = s[2]), {
                    content: a,
                    col: Number(e || i),
                    row: Number(n || c),
                    message: o,
                    name: r,
                    resourceUrl: t
                }
            }
        },
        r = function (i, s) {
            var c, t, u, e = window.XMLHttpRequest;
            !0 !== e._flag && (e._flag = !0, c = e.prototype.open, e.prototype.open = function (t, e, n, o, r) {
                return this._xhr_info = {
                    url: e,
                    method: t,
                    status: null
                }, c.apply(this, arguments)
            }, t = e.prototype.send, e.prototype.send = function (n) {
                var o = this,
                    r = this;
                this._start_time = Date.now();

                function e(e) {
                    return function () {
                        if (r.response) {
                            var t = null;
                            switch (r.responseType) {
                                case "json":
                                    t = JSON && JSON.stringify(r.response).length;
                                    break;
                                case "blob":
                                case "moz-blob":
                                    t = r.response.size;
                                    break;
                                case "arraybuffer":
                                    t = r.response.byteLength;
                                case "document":
                                    t = r.response.documentElement && r.response.documentElement.innerHTML && r.response.documentElement.innerHTML.length + 28;
                                    break;
                                default:
                                    t = r.response.length
                            }
                            r._xhr_info.event = e, r._xhr_info.status = r.status, r._xhr_info.duration = Date.now() - r._start_time, r._xhr_info.responseSize = t, r._xhr_info.requestSiz = n ? n.length : 0, r._xhr_info.type = "xhr", s ? s.forEach(function (t) {
                                !r.responseURL == t && i(o._xhr_info)
                            }) : i(o._xhr_info)
                        }
                    }
                }
                var a;
                return this.addEventListener ? (this.addEventListener("load", e("load"), !1), this.addEventListener("error", e("error"), !1), this.addEventListener("abort", e("abort"), !1)) : (a = this.onreadystatechange, this.onreadystatechange = function (t) {
                    a && c.apply(this, arguments), 4 === this.readyState && e("end")()
                }), t.apply(this, arguments)
            }, window.fetch && (u = window.fetch, window.fetch = function () {
                var e = Date.now(),
                    t = [].slice.call(arguments),
                    n = t[0],
                    o = "GET",
                    r = null;
                "string" == typeof n ? r = n : "Request" in window && n instanceof window.Requset ? (r = n.url, n.method && (o = n.method)) : r = "" + n, t[1] && t[1].method && (o = t[1].method);
                var a = {
                    method: o,
                    url: r,
                    status: null
                };
                return u.apply(this, t).then(function (t) {
                    return a.status = t.status, a.type = "fetch", a.duration = Date.now() - e, i(a), t
                })
            }))
        };

    function a(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }
    var t = (function (t, e, n) {
        return e && a(t.prototype, e), n && a(t, n), t
    }(i, [{
        key: "init",
        value: function (e, t) {
            try {
                console.log("ErrorTrap init done~"), n(function (t) {
                    e(t, "performance")
                }), o(function (t) {
                    e(t, "error")
                }), r(function (t) {
                    e(t, "xhr")
                }, t)
            } catch (t) {
                console.log(t, "监控报错QAQ")
            }
        }
    }]), i);

    function i(t, e) {
        ! function (t) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
        }(this), this.init(t, e)
    }

    function s(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }
    var e = (function (t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t
    }(c, [{
        key: "init",
        value: function () {
            this.envData = {}, this.envData.platform = "Web", this.envData.project = "web", this.envData.level = "ERROR", this.envData.appVersion = "", this.envData.channel = "", this.envData.osVersion = navigator.userAgent, this.envData.brand = "", this.envData.networkInfo = void 0 !== navigator.connection ? navigator.connection.effectiveType : "", this.envData.page = window.location.href, this.envData.userId = "", this.envData.deviceId = "", this.code = 3e4
        }
    }, {
        key: "push",
        value: function (t) {
            this.logData = t, this.analysis(), this.package(), this.dispatchEvent("completed")
        }
    }, {
        key: "analysis",
        value: function () {
            this.logData = this.logData
        }
    }, {
        key: "package",
        value: function () {
            var t = this.envData;
            t.type = this.logData.errTypeStr, t.data = JSON.stringify(this.logData), this.logData = t
        }
    }, {
        key: "onCompleted",
        value: function (t) {
            this.completedEventCallbacks.push(t)
        }
    }, {
        key: "dispatchEvent",
        value: function (t) {
            var n = this;
            "completed" === t && this.completedEventCallbacks.forEach(function (t, e) {
                t([n.logData])
            })
        }
    }]), c);

    function c() {
        ! function (t) {
            if (!(t instanceof c)) throw new TypeError("Cannot call a class as a function")
        }(this), this.logData = null, this.completedEventCallbacks = [];
        try {
            this.init()
        } catch (t) {}
    }
    var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };

    function f(t, e, n, o) {
        t = 0 < arguments.length && void 0 !== t ? t : {}, e = 1 < arguments.length && void 0 !== e ? e : "POST", o = !(3 < arguments.length && void 0 !== o) || o;
        if ("POST" === (e = e.toUpperCase())) {
            var r = void 0,
                a = "",
                r = new(window.XMLHttpRequest ? XMLHttpRequest : ActiveXObject);
            "POST" == e && (a = JSON.stringify(t)), r.open(e, n, o), r.setRequestHeader("Content-type", "application/json");
            try {
                r.send(a)
            } catch (t) {}
            r.onreadystatechange = function () {
                var t;
                4 == r.readyState && (200 != r.status || "object" !== (void 0 === (t = r.response) ? "undefined" : d(t)) && (t = JSON.parse(t)))
            }
        }
    }

    function h(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function p(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    var v = (function (t, e, n) {
        return e && h(t.prototype, e), n && h(t, n), t
    }(y, [{
        key: "push",
        value: function (t) {
            this.logData = [].concat(p(this.logData), p(t)), this.watch()
        }
    }, {
        key: "watch",
        value: function () {
            var t = this.logData,
                e = t.length,
                n = [];
            20 <= e && (t.forEach(function (t, e) {
                e <= 19 && n.push(t)
            }), t.splice(0, 20), this.report(n), 20 <= t.length && this.watch())
        }
    }, {
        key: "report",
        value: function (t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            f({
                bu: 1,
                type: 3,
                logs: t
            }, "post", this.domain + this.url, e)
        }
    }, {
        key: "sendMessage",
        value: function (t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
                n = location.protocol + "//mobile.ewt360.com/app/logs/upload/v1/",
                o = [],
                r = {
                    platform: "web",
                    project: "ewt",
                    level: "",
                    appVersion: "",
                    channel: "",
                    osVersion: navigator.userAgent,
                    brand: "",
                    networkInfo: void 0 !== navigator.connection ? navigator.connection.effectiveType : "",
                    page: window.location.href,
                    code: 3e4
                };
            t && o.push(Object.assign(r, t)), f({
                bu: 1,
                type: 3,
                logs: o
            }, "post", n, e)
        }
    }]), y);

    function y() {
        var t = this;
        ! function (t) {
            if (!(t instanceof y)) throw new TypeError("Cannot call a class as a function")
        }(this), this.logData = [];
        var e = window.location;
        this.domain = e.protocol + "//mobile.ewt360.com", this.url = "/app/logs/upload/v1/", window.addEventListener("unload", function () {
            t.report(t.logData, !1)
        }, !1)
    }

    function m(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }
    var w = ["http://ksearchapi.dev.kaikela.cn/app/logs/upload/v1"];

    function g() {
        var n = this;
        ! function (t) {
            if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function")
        }(this), this.reporter = new v, this.processor = new e, this.processor.onCompleted(this.toReport.bind(this)), this.errorTrap = new t(function (t, e) {
            t.errTypeStr = e, n.processor.push(t)
        }, w)
    }
    return {
        sendMessage: (new(function (t, e, n) {
            return e && m(t.prototype, e), n && m(t, n), t
        }(g, [{
            key: "toReport",
            value: function (t) {
                this.reporter.push(t)
            }
        }]), g)).reporter.sendMessage
    }
});