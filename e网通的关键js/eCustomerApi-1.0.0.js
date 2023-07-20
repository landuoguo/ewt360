! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("eCustomerApi", [], e) : "object" == typeof exports ? exports.eCustomerApi = e() : t.eCustomerApi = e()
}(this, function () {
    return function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "/", e(0)
    }([function (t, e, n) {
        t.exports = n(74)
    }, function (t, e) {
        var n = t.exports = {
            version: "2.6.12"
        };
        "number" == typeof __e && (__e = n)
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return "[object Array]" === j.call(t)
        }

        function o(t) {
            return "undefined" == typeof t
        }

        function i(t) {
            return null !== t && !o(t) && null !== t.constructor && !o(t.constructor) && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
        }

        function u(t) {
            return "[object ArrayBuffer]" === j.call(t)
        }

        function a(t) {
            return "undefined" != typeof FormData && t instanceof FormData
        }

        function c(t) {
            var e;
            return e = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer
        }

        function s(t) {
            return "string" == typeof t
        }

        function f(t) {
            return "number" == typeof t
        }

        function l(t) {
            return null !== t && "object" == typeof t
        }

        function p(t) {
            return "[object Date]" === j.call(t)
        }

        function d(t) {
            return "[object File]" === j.call(t)
        }

        function h(t) {
            return "[object Blob]" === j.call(t)
        }

        function v(t) {
            return "[object Function]" === j.call(t)
        }

        function m(t) {
            return l(t) && v(t.pipe)
        }

        function g(t) {
            return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams
        }

        function y(t) {
            return t.replace(/^\s*/, "").replace(/\s*$/, "")
        }

        function w() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
        }

        function x(t, e) {
            if (null !== t && "undefined" != typeof t)
                if ("object" != typeof t && (t = [t]), r(t))
                    for (var n = 0, o = t.length; n < o; n++) e.call(null, t[n], n, t);
                else
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i], i, t)
        }

        function b() {
            function t(t, n) {
                "object" == typeof e[n] && "object" == typeof t ? e[n] = b(e[n], t) : e[n] = t
            }
            for (var e = {}, n = 0, r = arguments.length; n < r; n++) x(arguments[n], t);
            return e
        }

        function _() {
            function t(t, n) {
                "object" == typeof e[n] && "object" == typeof t ? e[n] = _(e[n], t) : "object" == typeof t ? e[n] = _({}, t) : e[n] = t
            }
            for (var e = {}, n = 0, r = arguments.length; n < r; n++) x(arguments[n], t);
            return e
        }

        function k(t, e, n) {
            return x(e, function (e, r) {
                n && "function" == typeof e ? t[r] = O(e, n) : t[r] = e
            }), t
        }
        var O = n(38),
            j = Object.prototype.toString;
        t.exports = {
            isArray: r,
            isArrayBuffer: u,
            isBuffer: i,
            isFormData: a,
            isArrayBufferView: c,
            isString: s,
            isNumber: f,
            isObject: l,
            isUndefined: o,
            isDate: p,
            isFile: d,
            isBlob: h,
            isFunction: v,
            isStream: m,
            isURLSearchParams: g,
            isStandardBrowserEnv: w,
            forEach: x,
            merge: b,
            deepMerge: _,
            extend: k,
            trim: y
        }
    }, function (t, e) {
        var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function (t, e, n) {
        var r = n(51)("wks"),
            o = n(55),
            i = n(3).Symbol,
            u = "function" == typeof i,
            a = t.exports = function (t) {
                return r[t] || (r[t] = u && i[t] || (u ? i : o)("Symbol." + t))
            };
        a.store = r
    }, function (t, e, n) {
        var r = n(10);
        t.exports = function (t) {
            if (!r(t)) throw TypeError(t + " is not an object!");
            return t
        }
    }, function (t, e, n) {
        t.exports = !n(15)(function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    }, function (t, e, n) {
        var r = n(3),
            o = n(1),
            i = n(14),
            u = n(8),
            a = n(16),
            c = "prototype",
            s = function (t, e, n) {
                var f, l, p, d = t & s.F,
                    h = t & s.G,
                    v = t & s.S,
                    m = t & s.P,
                    g = t & s.B,
                    y = t & s.W,
                    w = h ? o : o[e] || (o[e] = {}),
                    x = w[c],
                    b = h ? r : v ? r[e] : (r[e] || {})[c];
                h && (n = e);
                for (f in n) l = !d && b && void 0 !== b[f], l && a(w, f) || (p = l ? b[f] : n[f], w[f] = h && "function" != typeof b[f] ? n[f] : g && l ? i(p, r) : y && b[f] == p ? function (t) {
                    var e = function (e, n, r) {
                        if (this instanceof t) {
                            switch (arguments.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e);
                                case 2:
                                    return new t(e, n)
                            }
                            return new t(e, n, r)
                        }
                        return t.apply(this, arguments)
                    };
                    return e[c] = t[c], e
                }(p) : m && "function" == typeof p ? i(Function.call, p) : p, m && ((w.virtual || (w.virtual = {}))[f] = p, t & s.R && x && !x[f] && u(x, f, p)))
            };
        s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s
    }, function (t, e, n) {
        var r = n(11),
            o = n(50);
        t.exports = n(6) ? function (t, e, n) {
            return r.f(t, e, o(1, n))
        } : function (t, e, n) {
            return t[e] = n, t
        }
    }, function (t, e) {
        t.exports = {}
    }, function (t, e) {
        t.exports = function (t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }
    }, function (t, e, n) {
        var r = n(5),
            o = n(101),
            i = n(122),
            u = Object.defineProperty;
        e.f = n(6) ? Object.defineProperty : function (t, e, n) {
            if (r(t), e = i(e, !0), r(n), o) try {
                return u(t, e, n)
            } catch (t) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (t[e] = n.value), t
        }
    }, function (t, e) {
        t.exports = function (t) {
            if ("function" != typeof t) throw TypeError(t + " is not a function!");
            return t
        }
    }, function (t, e) {
        var n = {}.toString;
        t.exports = function (t) {
            return n.call(t).slice(8, -1)
        }
    }, function (t, e, n) {
        var r = n(12);
        t.exports = function (t, e, n) {
            if (r(t), void 0 === e) return t;
            switch (n) {
                case 1:
                    return function (n) {
                        return t.call(e, n)
                    };
                case 2:
                    return function (n, r) {
                        return t.call(e, n, r)
                    };
                case 3:
                    return function (n, r, o) {
                        return t.call(e, n, r, o)
                    }
            }
            return function () {
                return t.apply(e, arguments)
            }
        }
    }, function (t, e) {
        t.exports = function (t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        }
    }, function (t, e) {
        var n = {}.hasOwnProperty;
        t.exports = function (t, e) {
            return n.call(t, e)
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function o(t) {
            var e = document.cookie || [],
                n = e.split(";"),
                r = {};
            return n.forEach(function (t) {
                var e = t.split("="),
                    n = (0, l.default)(e, 2),
                    o = n[0],
                    i = n[1],
                    u = o.replace(/(^\s)|(\s$)/, "");
                r[u] = i
            }), r[t] || ""
        }

        function i() {
            return window.location.host.indexOf("ewt360.com") !== -1
        }

        function u() {
            return null !== location.host.match(/staging-./i)
        }

        function a() {
            var t = window.navigator.userAgent,
                e = t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
                n = !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                r = "";
            return r = e ? "Android" : n ? "IOS" : "Others"
        }

        function c() {
            var t = "web.ewt360.com";
            u() ? t = "staging-web.ewt360.com" : window.location.host.indexOf("ewt360.com") === -1 && (t = "web.test.mistong.com"), h("token");
            var e = "//" + t + "/register/#/login?sid=3&fromurl=" + encodeURIComponent(window.location.href);
            window.location.href = e
        }

        function s(t, e) {
            var n = new RegExp("(^|&)".concat(t).concat("=([^&]*)(&|$)"), "i");
            e = e ? e.toString() : window.location.href;
            var r = e.indexOf("?"),
                o = e.substr(r + 1),
                i = o.match(n);
            return null != i ? decodeURIComponent(i[2]) : ""
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var f = n(87),
            l = r(f);
        e.getCookie = o, e.isProd = i, e.isPre = u, e.getAgentName = a, e.toLogin = c, e.getUrlParam = s;
        var p = n(134),
            d = r(p),
            h = function (t, e) {
                d.default.remove.call(null, t, e)
            };
        e.default = {
            getCookie: o,
            isProd: i,
            toLogin: c,
            getAgentName: a,
            getUrlParam: s
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(96),
            __esModule: !0
        }
    }, function (t, e, n) {
        var r = n(13),
            o = n(4)("toStringTag"),
            i = "Arguments" == r(function () {
                return arguments
            }()),
            u = function (t, e) {
                try {
                    return t[e]
                } catch (t) {}
            };
        t.exports = function (t) {
            var e, n, a;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = u(e = Object(t), o)) ? n : i ? r(e) : "Object" == (a = r(e)) && "function" == typeof e.callee ? "Arguments" : a
        }
    }, function (t, e) {
        t.exports = function (t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t
        }
    }, function (t, e, n) {
        var r = n(10),
            o = n(3).document,
            i = r(o) && r(o.createElement);
        t.exports = function (t) {
            return i ? o.createElement(t) : {}
        }
    }, function (t, e) {
        t.exports = !0
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            var e, n;
            this.promise = new t(function (t, r) {
                if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");
                e = t, n = r
            }), this.resolve = o(e), this.reject = o(n)
        }
        var o = n(12);
        t.exports.f = function (t) {
            return new r(t)
        }
    }, function (t, e, n) {
        var r = n(114),
            o = n(44);
        t.exports = Object.keys || function (t) {
            return r(t, o)
        }
    }, function (t, e, n) {
        var r = n(11).f,
            o = n(16),
            i = n(4)("toStringTag");
        t.exports = function (t, e, n) {
            t && !o(t = n ? t : t.prototype, i) && r(t, i, {
                configurable: !0,
                value: e
            })
        }
    }, function (t, e, n) {
        var r = n(51)("keys"),
            o = n(55);
        t.exports = function (t) {
            return r[t] || (r[t] = o(t))
        }
    }, function (t, e) {
        var n = Math.ceil,
            r = Math.floor;
        t.exports = function (t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t)
        }
    }, function (t, e, n) {
        var r = n(46),
            o = n(20);
        t.exports = function (t) {
            return r(o(t))
        }
    }, function (t, e, n) {
        var r = n(20);
        t.exports = function (t) {
            return Object(r(t))
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(120)(!0);
        n(47)(String, "String", function (t) {
            this._t = String(t), this._i = 0
        }, function () {
            var t, e = this._t,
                n = this._i;
            return n >= e.length ? {
                value: void 0,
                done: !0
            } : (t = r(e, n), this._i += t.length, {
                value: t,
                done: !1
            })
        })
    }, function (t, e, n) {
        n(126);
        for (var r = n(3), o = n(8), i = n(9), u = n(4)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < a.length; c++) {
            var s = a[c],
                f = r[s],
                l = f && f.prototype;
            l && !l[u] && o(l, u, s), i[s] = i.Array
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(2),
            o = n(65),
            i = n(39),
            u = n(62),
            a = n(72),
            c = n(70),
            s = n(35);
        t.exports = function (t) {
            return new Promise(function (e, f) {
                var l = t.data,
                    p = t.headers;
                r.isFormData(l) && delete p["Content-Type"];
                var d = new XMLHttpRequest;
                if (t.auth) {
                    var h = t.auth.username || "",
                        v = t.auth.password || "";
                    p.Authorization = "Basic " + btoa(h + ":" + v)
                }
                var m = u(t.baseURL, t.url);
                if (d.open(t.method.toUpperCase(), i(m, t.params, t.paramsSerializer), !0), d.timeout = t.timeout, d.onreadystatechange = function () {
                        if (d && 4 === d.readyState && (0 !== d.status || d.responseURL && 0 === d.responseURL.indexOf("file:"))) {
                            var n = "getAllResponseHeaders" in d ? a(d.getAllResponseHeaders()) : null,
                                r = t.responseType && "text" !== t.responseType ? d.response : d.responseText,
                                i = {
                                    data: r,
                                    status: d.status,
                                    statusText: d.statusText,
                                    headers: n,
                                    config: t,
                                    request: d
                                };
                            o(e, f, i), d = null
                        }
                    }, d.onabort = function () {
                        d && (f(s("Request aborted", t, "ECONNABORTED", d)), d = null)
                    }, d.onerror = function () {
                        f(s("Network Error", t, null, d)), d = null
                    }, d.ontimeout = function () {
                        var e = "timeout of " + t.timeout + "ms exceeded";
                        t.timeoutErrorMessage && (e = t.timeoutErrorMessage), f(s(e, t, "ECONNABORTED", d)), d = null
                    }, r.isStandardBrowserEnv()) {
                    var g = n(68),
                        y = (t.withCredentials || c(m)) && t.xsrfCookieName ? g.read(t.xsrfCookieName) : void 0;
                    y && (p[t.xsrfHeaderName] = y)
                }
                if ("setRequestHeader" in d && r.forEach(p, function (t, e) {
                        "undefined" == typeof l && "content-type" === e.toLowerCase() ? delete p[e] : d.setRequestHeader(e, t)
                    }), r.isUndefined(t.withCredentials) || (d.withCredentials = !!t.withCredentials), t.responseType) try {
                    d.responseType = t.responseType
                } catch (e) {
                    if ("json" !== t.responseType) throw e
                }
                "function" == typeof t.onDownloadProgress && d.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && d.upload && d.upload.addEventListener("progress", t.onUploadProgress), t.cancelToken && t.cancelToken.promise.then(function (t) {
                    d && (d.abort(), f(t), d = null)
                }), void 0 === l && (l = null), d.send(l)
            })
        }
    }, function (t, e) {
        "use strict";

        function n(t) {
            this.message = t
        }
        n.prototype.toString = function () {
            return "Cancel" + (this.message ? ": " + this.message : "")
        }, n.prototype.__CANCEL__ = !0, t.exports = n
    }, function (t, e) {
        "use strict";
        t.exports = function (t) {
            return !(!t || !t.__CANCEL__)
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(64);
        t.exports = function (t, e, n, o, i) {
            var u = new Error(t);
            return r(u, e, n, o, i)
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(2);
        t.exports = function (t, e) {
            e = e || {};
            var n = {},
                o = ["url", "method", "params", "data"],
                i = ["headers", "auth", "proxy"],
                u = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];
            r.forEach(o, function (t) {
                "undefined" != typeof e[t] && (n[t] = e[t])
            }), r.forEach(i, function (o) {
                r.isObject(e[o]) ? n[o] = r.deepMerge(t[o], e[o]) : "undefined" != typeof e[o] ? n[o] = e[o] : r.isObject(t[o]) ? n[o] = r.deepMerge(t[o]) : "undefined" != typeof t[o] && (n[o] = t[o])
            }), r.forEach(u, function (r) {
                "undefined" != typeof e[r] ? n[r] = e[r] : "undefined" != typeof t[r] && (n[r] = t[r])
            });
            var a = o.concat(i).concat(u),
                c = Object.keys(e).filter(function (t) {
                    return a.indexOf(t) === -1
                });
            return r.forEach(c, function (r) {
                "undefined" != typeof e[r] ? n[r] = e[r] : "undefined" != typeof t[r] && (n[r] = t[r])
            }), n
        }
    }, function (t, e, n) {
        (function (e) {
            "use strict";

            function r(t, e) {
                !i.isUndefined(t) && i.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e)
            }

            function o() {
                var t;
                return "undefined" != typeof XMLHttpRequest ? t = n(32) : "undefined" != typeof e && "[object process]" === Object.prototype.toString.call(e) && (t = n(32)), t
            }
            var i = n(2),
                u = n(71),
                a = {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                c = {
                    adapter: o(),
                    transformRequest: [function (t, e) {
                        return u(e, "Accept"), u(e, "Content-Type"), i.isFormData(t) || i.isArrayBuffer(t) || i.isBuffer(t) || i.isStream(t) || i.isFile(t) || i.isBlob(t) ? t : i.isArrayBufferView(t) ? t.buffer : i.isURLSearchParams(t) ? (r(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : i.isObject(t) ? (r(e, "application/json;charset=utf-8"), JSON.stringify(t)) : t
                    }],
                    transformResponse: [function (t) {
                        if ("string" == typeof t) try {
                            t = JSON.parse(t)
                        } catch (t) {}
                        return t
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    validateStatus: function (t) {
                        return t >= 200 && t < 300
                    }
                };
            c.headers = {
                common: {
                    Accept: "application/json, text/plain, */*"
                }
            }, i.forEach(["delete", "get", "head"], function (t) {
                c.headers[t] = {}
            }), i.forEach(["post", "put", "patch"], function (t) {
                c.headers[t] = i.merge(a)
            }), t.exports = c
        }).call(e, n(135))
    }, function (t, e) {
        "use strict";
        t.exports = function (t, e) {
            return function () {
                for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                return t.apply(e, n)
            }
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
        }
        var o = n(2);
        t.exports = function (t, e, n) {
            if (!e) return t;
            var i;
            if (n) i = n(e);
            else if (o.isURLSearchParams(e)) i = e.toString();
            else {
                var u = [];
                o.forEach(e, function (t, e) {
                    null !== t && "undefined" != typeof t && (o.isArray(t) ? e += "[]" : t = [t], o.forEach(t, function (t) {
                        o.isDate(t) ? t = t.toISOString() : o.isObject(t) && (t = JSON.stringify(t)), u.push(r(e) + "=" + r(t))
                    }))
                }), i = u.join("&")
            }
            if (i) {
                var a = t.indexOf("#");
                a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i
            }
            return t
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.del = e.get = e.put = e.post = void 0;
        var o = n(42),
            i = r(o),
            u = n(18),
            a = r(u),
            c = n(57),
            s = r(c),
            f = n(17),
            l = s.default.create({
                withCredentials: !0,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json"
                }
            });
        l.interceptors.response.use(function (t) {
            var e = t.data,
                n = t.data,
                r = n.code,
                o = n.data;
            return 200 === Number(r) ? o : a.default.reject(e)
        }, function (t) {
            return a.default.reject(t)
        }), l.interceptors.request.use(function (t) {
            var e = t.headers,
                n = void 0 === e ? {} : e,
                r = t.params,
                o = void 0 === r ? {} : r,
                u = Date.now(),
                a = (0, f.getCookie)("token"),
                c = 1;
            return "others" !== (0, f.getAgentName)().toLocaleLowerCase() && (a = (0, f.getUrlParam)("token") || (0, f.getCookie)("token"), c = 4), t.headers = (0, i.default)({}, n, {
                platform: c,
                token: a
            }), t.params = (0, i.default)({
                _: u
            }, o), t
        }, function (t) {
            return a.default.reject(t)
        }), e.default = l;
        var p = l.post,
            d = l.put;
        e.post = p, e.put = d;
        var h = l.get;
        e.get = h;
        e.del = function (t, e) {
            return l.delete(t, {
                params: e
            })
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = n(18),
            i = r(o);
        e.default = function (t) {
            return function () {
                var e = t.apply(this, arguments);
                return new i.default(function (t, n) {
                    function r(o, u) {
                        try {
                            var a = e[o](u),
                                c = a.value
                        } catch (t) {
                            return void n(t)
                        }
                        return a.done ? void t(c) : i.default.resolve(c).then(function (t) {
                            r("next", t)
                        }, function (t) {
                            r("throw", t)
                        })
                    }
                    return r("next")
                })
            }
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = n(82),
            i = r(o);
        e.default = i.default || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
    }, function (t, e, n) {
        t.exports = n(88)
    }, function (t, e) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function (t, e, n) {
        var r = n(3).document;
        t.exports = r && r.documentElement
    }, function (t, e, n) {
        var r = n(13);
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
            return "String" == r(t) ? t.split("") : Object(t)
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(22),
            o = n(7),
            i = n(118),
            u = n(8),
            a = n(9),
            c = n(105),
            s = n(25),
            f = n(113),
            l = n(4)("iterator"),
            p = !([].keys && "next" in [].keys()),
            d = "@@iterator",
            h = "keys",
            v = "values",
            m = function () {
                return this
            };
        t.exports = function (t, e, n, g, y, w, x) {
            c(n, e, g);
            var b, _, k, O = function (t) {
                    if (!p && t in S) return S[t];
                    switch (t) {
                        case h:
                            return function () {
                                return new n(this, t)
                            };
                        case v:
                            return function () {
                                return new n(this, t)
                            }
                    }
                    return function () {
                        return new n(this, t)
                    }
                },
                j = e + " Iterator",
                E = y == v,
                P = !1,
                S = t.prototype,
                T = S[l] || S[d] || y && S[y],
                L = T || O(y),
                A = y ? E ? O("entries") : L : void 0,
                C = "Array" == e ? S.entries || T : T;
            if (C && (k = f(C.call(new t)), k !== Object.prototype && k.next && (s(k, j, !0), r || "function" == typeof k[l] || u(k, l, m))), E && T && T.name !== v && (P = !0, L = function () {
                    return T.call(this)
                }), r && !x || !p && !P && S[l] || u(S, l, L), a[e] = L, a[j] = m, y)
                if (b = {
                        values: E ? L : O(v),
                        keys: w ? L : O(h),
                        entries: A
                    }, x)
                    for (_ in b) _ in S || i(S, _, b[_]);
                else o(o.P + o.F * (p || P), e, b);
            return b
        }
    }, function (t, e) {
        t.exports = function (t) {
            try {
                return {
                    e: !1,
                    v: t()
                }
            } catch (t) {
                return {
                    e: !0,
                    v: t
                }
            }
        }
    }, function (t, e, n) {
        var r = n(5),
            o = n(10),
            i = n(23);
        t.exports = function (t, e) {
            if (r(t), o(e) && e.constructor === t) return e;
            var n = i.f(t),
                u = n.resolve;
            return u(e), n.promise
        }
    }, function (t, e) {
        t.exports = function (t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        }
    }, function (t, e, n) {
        var r = n(1),
            o = n(3),
            i = "__core-js_shared__",
            u = o[i] || (o[i] = {});
        (t.exports = function (t, e) {
            return u[t] || (u[t] = void 0 !== e ? e : {})
        })("versions", []).push({
            version: r.version,
            mode: n(22) ? "pure" : "global",
            copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
        })
    }, function (t, e, n) {
        var r = n(5),
            o = n(12),
            i = n(4)("species");
        t.exports = function (t, e) {
            var n, u = r(t).constructor;
            return void 0 === u || void 0 == (n = r(u)[i]) ? e : o(n)
        }
    }, function (t, e, n) {
        var r, o, i, u = n(14),
            a = n(102),
            c = n(45),
            s = n(21),
            f = n(3),
            l = f.process,
            p = f.setImmediate,
            d = f.clearImmediate,
            h = f.MessageChannel,
            v = f.Dispatch,
            m = 0,
            g = {},
            y = "onreadystatechange",
            w = function () {
                var t = +this;
                if (g.hasOwnProperty(t)) {
                    var e = g[t];
                    delete g[t], e()
                }
            },
            x = function (t) {
                w.call(t.data)
            };
        p && d || (p = function (t) {
            for (var e = [], n = 1; arguments.length > n;) e.push(arguments[n++]);
            return g[++m] = function () {
                a("function" == typeof t ? t : Function(t), e)
            }, r(m), m
        }, d = function (t) {
            delete g[t]
        }, "process" == n(13)(l) ? r = function (t) {
            l.nextTick(u(w, t, 1))
        } : v && v.now ? r = function (t) {
            v.now(u(w, t, 1))
        } : h ? (o = new h, i = o.port2, o.port1.onmessage = x, r = u(i.postMessage, i, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (r = function (t) {
            f.postMessage(t + "", "*")
        }, f.addEventListener("message", x, !1)) : r = y in s("script") ? function (t) {
            c.appendChild(s("script"))[y] = function () {
                c.removeChild(this), w.call(t)
            }
        } : function (t) {
            setTimeout(u(w, t, 1), 0)
        }), t.exports = {
            set: p,
            clear: d
        }
    }, function (t, e, n) {
        var r = n(27),
            o = Math.min;
        t.exports = function (t) {
            return t > 0 ? o(r(t), 9007199254740991) : 0
        }
    }, function (t, e) {
        var n = 0,
            r = Math.random();
        t.exports = function (t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36))
        }
    }, function (t, e, n) {
        var r = n(19),
            o = n(4)("iterator"),
            i = n(9);
        t.exports = n(1).getIteratorMethod = function (t) {
            if (void 0 != t) return t[o] || t["@@iterator"] || i[r(t)]
        }
    }, function (t, e, n) {
        t.exports = n(58)
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            var e = new u(t),
                n = i(u.prototype.request, e);
            return o.extend(n, u.prototype, e), o.extend(n, e), n
        }
        var o = n(2),
            i = n(38),
            u = n(60),
            a = n(36),
            c = n(37),
            s = r(c);
        s.Axios = u, s.create = function (t) {
            return r(a(s.defaults, t))
        }, s.Cancel = n(33), s.CancelToken = n(59), s.isCancel = n(34), s.all = function (t) {
            return Promise.all(t)
        }, s.spread = n(73), t.exports = s, t.exports.default = s
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            if ("function" != typeof t) throw new TypeError("executor must be a function.");
            var e;
            this.promise = new Promise(function (t) {
                e = t
            });
            var n = this;
            t(function (t) {
                n.reason || (n.reason = new o(t), e(n.reason))
            })
        }
        var o = n(33);
        r.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason
        }, r.source = function () {
            var t, e = new r(function (e) {
                t = e
            });
            return {
                token: e,
                cancel: t
            }
        }, t.exports = r
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            this.defaults = t, this.interceptors = {
                request: new u,
                response: new u
            }
        }
        var o = n(2),
            i = n(39),
            u = n(61),
            a = n(63),
            c = n(36);
        r.prototype.request = function (t) {
            "string" == typeof t ? (t = arguments[1] || {}, t.url = arguments[0]) : t = t || {}, t = c(this.defaults, t), t.method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
            var e = [a, void 0],
                n = Promise.resolve(t);
            for (this.interceptors.request.forEach(function (t) {
                    e.unshift(t.fulfilled, t.rejected)
                }), this.interceptors.response.forEach(function (t) {
                    e.push(t.fulfilled, t.rejected)
                }); e.length;) n = n.then(e.shift(), e.shift());
            return n
        }, r.prototype.getUri = function (t) {
            return t = c(this.defaults, t), i(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
        }, o.forEach(["delete", "get", "head", "options"], function (t) {
            r.prototype[t] = function (e, n) {
                return this.request(o.merge(n || {}, {
                    method: t,
                    url: e
                }))
            }
        }), o.forEach(["post", "put", "patch"], function (t) {
            r.prototype[t] = function (e, n, r) {
                return this.request(o.merge(r || {}, {
                    method: t,
                    url: e,
                    data: n
                }))
            }
        }), t.exports = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            this.handlers = []
        }
        var o = n(2);
        r.prototype.use = function (t, e) {
            return this.handlers.push({
                fulfilled: t,
                rejected: e
            }), this.handlers.length - 1
        }, r.prototype.eject = function (t) {
            this.handlers[t] && (this.handlers[t] = null)
        }, r.prototype.forEach = function (t) {
            o.forEach(this.handlers, function (e) {
                null !== e && t(e)
            })
        }, t.exports = r
    }, function (t, e, n) {
        "use strict";
        var r = n(69),
            o = n(67);
        t.exports = function (t, e) {
            return t && !r(e) ? o(t, e) : e
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            t.cancelToken && t.cancelToken.throwIfRequested()
        }
        var o = n(2),
            i = n(66),
            u = n(34),
            a = n(37);
        t.exports = function (t) {
            r(t), t.headers = t.headers || {}, t.data = i(t.data, t.headers, t.transformRequest), t.headers = o.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (e) {
                delete t.headers[e]
            });
            var e = t.adapter || a.adapter;
            return e(t).then(function (e) {
                return r(t), e.data = i(e.data, e.headers, t.transformResponse), e
            }, function (e) {
                return u(e) || (r(t), e && e.response && (e.response.data = i(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
            })
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t, e, n, r, o) {
            return t.config = e, n && (t.code = n), t.request = r, t.response = o, t.isAxiosError = !0, t.toJSON = function () {
                return {
                    message: this.message,
                    name: this.name,
                    description: this.description,
                    number: this.number,
                    fileName: this.fileName,
                    lineNumber: this.lineNumber,
                    columnNumber: this.columnNumber,
                    stack: this.stack,
                    config: this.config,
                    code: this.code
                }
            }, t
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(35);
        t.exports = function (t, e, n) {
            var o = n.config.validateStatus;
            !o || o(n.status) ? t(n) : e(r("Request failed with status code " + n.status, n.config, null, n.request, n))
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(2);
        t.exports = function (t, e, n) {
            return r.forEach(n, function (n) {
                t = n(t, e)
            }), t
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t, e) {
            return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(2);
        t.exports = r.isStandardBrowserEnv() ? function () {
            return {
                write: function (t, e, n, o, i, u) {
                    var a = [];
                    a.push(t + "=" + encodeURIComponent(e)), r.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), r.isString(o) && a.push("path=" + o), r.isString(i) && a.push("domain=" + i), u === !0 && a.push("secure"), document.cookie = a.join("; ")
                },
                read: function (t) {
                    var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                    return e ? decodeURIComponent(e[3]) : null
                },
                remove: function (t) {
                    this.write(t, "", Date.now() - 864e5)
                }
            }
        }() : function () {
            return {
                write: function () {},
                read: function () {
                    return null
                },
                remove: function () {}
            }
        }()
    }, function (t, e) {
        "use strict";
        t.exports = function (t) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(2);
        t.exports = r.isStandardBrowserEnv() ? function () {
            function t(t) {
                var e = t;
                return n && (o.setAttribute("href", e), e = o.href), o.setAttribute("href", e), {
                    href: o.href,
                    protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
                    host: o.host,
                    search: o.search ? o.search.replace(/^\?/, "") : "",
                    hash: o.hash ? o.hash.replace(/^#/, "") : "",
                    hostname: o.hostname,
                    port: o.port,
                    pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname
                }
            }
            var e, n = /(msie|trident)/i.test(navigator.userAgent),
                o = document.createElement("a");
            return e = t(window.location.href),
                function (n) {
                    var o = r.isString(n) ? t(n) : n;
                    return o.protocol === e.protocol && o.host === e.host
                }
        }() : function () {
            return function () {
                return !0
            }
        }()
    }, function (t, e, n) {
        "use strict";
        var r = n(2);
        t.exports = function (t, e) {
            r.forEach(t, function (n, r) {
                r !== e && r.toUpperCase() === e.toUpperCase() && (t[e] = n, delete t[r])
            })
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(2),
            o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        t.exports = function (t) {
            var e, n, i, u = {};
            return t ? (r.forEach(t.split("\n"), function (t) {
                if (i = t.indexOf(":"), e = r.trim(t.substr(0, i)).toLowerCase(), n = r.trim(t.substr(i + 1)), e) {
                    if (u[e] && o.indexOf(e) >= 0) return;
                    "set-cookie" === e ? u[e] = (u[e] ? u[e] : []).concat([n]) : u[e] = u[e] ? u[e] + ", " + n : n
                }
            }), u) : u
        }
    }, function (t, e) {
        "use strict";
        t.exports = function (t) {
            return function (e) {
                return t.apply(null, e)
            }
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var o = n(81),
            i = r(o),
            u = n(42),
            a = r(u),
            c = n(43),
            s = r(c),
            f = n(18),
            l = r(f),
            p = n(41),
            d = r(p),
            h = n(85),
            v = r(h),
            m = n(86),
            g = r(m),
            y = n(75),
            w = r(y),
            x = n(78),
            b = r(x),
            _ = n(17),
            k = n(76),
            O = r(k),
            j = [9091401, 9091402, 9091403],
            E = function () {
                function t() {
                    var e = this;
                    (0, v.default)(this, t), this.transformCate2QuestionRequired = function (t) {
                        if (!t || "number" != typeof t) return console.log("题目类型有误！", t), !1;
                        var e = void 0;
                        switch (t) {
                            case 1:
                                e = 1;
                                break;
                            case 2:
                                e = 3;
                                break;
                            case 3:
                                e = 4;
                                break;
                            case 4:
                            case 30:
                                e = 2;
                                break;
                            case 5:
                                e = 9;
                                break;
                            case 20:
                                e = 6;
                                break;
                            case 21:
                                e = 5;
                                break;
                            case 31:
                                e = 31;
                                break;
                            case 99:
                                e = 10
                        }
                        return e
                    }, this.getRefreshToken = function () {
                        w.default.getUserInfo().then(function () {})
                    }, this.createNoPermissionModalDom = function (t, n) {
                        var r = "";
                        switch (t) {
                            case 9091401:
                                r = "我要当会员";
                                break;
                            case 9091402:
                                r = "升级会员";
                                break;
                            case 9091403:
                                r = "我知道了"
                        }
                        var o = "others" === (0, _.getAgentName)().toLocaleLowerCase() ? "10%" : "18%",
                            i = '<div style="\n      background: rgba(0,0,0,.5);\n      position: absolute;\n      top: 0;\n      width: 100vw;\n      height: 100vh;\n      z-index: 9001;\n    ">\n      <div style="\n        width: 320px;\n        background: #fff;\n        border-radius: 8px;\n        padding-bottom: 60px;\n        margin: ' + o + ' auto 0;\n        padding:20px;\n      ">\n        <div\n          style="\n            margin-bottom: 15px;\n            margin-top: -50px;\n            width: 320px;\n            height:170px;\n            background-size: contain;\n            background-image: url(' + window.location.protocol + '//web.ewt360.com/common/customer/www/img/app_no_auth.png)"></div>\n        <div style="text-align: center;">\n          <p\n            style="\n              font-size: 24px;\n              color: #373A44;\n              margin-bottom: 16px;\n              text-align:center;">\n              温馨提示</p>\n          <p\n            style="color: #96A2BE;\n              font-size: 14px;\n              margin-bottom: 24px;\n              text-align:center">\n            ' + n + '\n          </p>\n          <button\n            id="mst_unify_authtication_no_auth_button"\n            data-auto-code="' + t + '"\n            style="\n              height: 40px;\n              line-height: 40px;\n              color: #fff;\n              font-size: 14px;\n              text-align: center;\n              border-radius:20px;\n              background:#2E86FF;\n              width:80%;\n              margin: 20px auto;\n              cursor: pointer;\n              border:0;">\n              ' + r + '</button>\n        </div>\n      </div>\n      <p style="text-align:center;">\n        <span\n          style="text-align: center;font-size: 20px;color: #fff;padding: 10px 30px;font-weight: bold;display: inline-block;"\n          id="mst_unify_authtication_close_modal_button">X</span>\n      </p>\n    </div>',
                            u = document.createElement("div");
                        u.setAttribute("id", "mst_unify_authtication_no_auth_modal");
                        var a = document.createElement("div");
                        a.style = "\n      background: rgba(0,0,0,.5);\n      position: fixed;\n      top: 0;\n      width: 100%;\n      height: 100%;\n      z-index: 9000\n    ", a.innerHTML = i, u.appendChild(a), document.body.appendChild(u), e.bindNoAuthButtonEvent(t)
                    }
                }
                return (0, g.default)(t, [{
                    key: "generateHostByHostName",
                    value: function (t) {
                        var e = window,
                            n = e.location.hostname,
                            r = function (t, e, n) {
                                return n = !n || n < 0 ? 0 : +n, t.substring(n, n + e.length) === e
                            },
                            o = n.match(/\w+\./gi),
                            i = o ? o[0].replace(/[^0-9]/gi, "") : "",
                            u = r(n, "local", 0) ? t : "" + t + i;
                        return u
                    }
                }, {
                    key: "convertSubjectNameToId",
                    value: function (t) {
                        var e = {
                            "语文": 1,
                            "数学": 2,
                            "英语": 3,
                            "物理": 4,
                            "化学": 5,
                            "生物": 6,
                            "政治": 7,
                            "历史": 8,
                            "地理": 9,
                            "通用技术": 11,
                            "信息技术": 12
                        };
                        return e[t] || ""
                    }
                }, {
                    key: "downloadPdfByQuestions",
                    value: function () {
                        function t(t) {
                            return e.apply(this, arguments)
                        }
                        var e = (0, d.default)(s.default.mark(function t(e) {
                            var n, r, o, i, u, a, c, f, p, d, h, v, m, g, y, x, b;
                            return s.default.wrap(function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (n = e.role, r = e.schoolId, o = e.params, i = e.isTest, u = void 0 !== i && i, a = e.isAuto, c = void 0 === a || a, o && n && r) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return", !1);
                                    case 3:
                                        if (!this.loading) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return", !1);
                                    case 5:
                                        return this.loading = !0, t.prev = 6, t.next = 9, w.default.createPaperByQuestions(o);
                                    case 9:
                                        return f = t.sent, t.next = 12, w.default.publishPaperById({
                                            paperId: f,
                                            paperStatus: 2,
                                            schoolId: r
                                        });
                                    case 12:
                                        return p = t.sent, d = o.paperName, h = (0, _.getCookie)("token"), v = window.location.protocol, m = u ? "teacher.test1.mistong.com" : "teacher.ewt360.com", g = v + "//" + m + "/ewtbend/bend/index/index.html#/homework/print-test-paper?type=" + n + "&paperId=" + p + "&token=" + h, t.next = 20, w.default.generatePDFByTestpaper({
                                            type: "pdf",
                                            modal: "active",
                                            waitUntil: "networkidle0",
                                            name: d,
                                            url: g
                                        });
                                    case 20:
                                        if (y = t.sent, x = y.filePath, this.loading = !1, "undefined" == typeof c || c) {
                                            t.next = 25;
                                            break
                                        }
                                        return t.abrupt("return", l.default.resolve(x));
                                    case 25:
                                        b = window.open("", "_blank"), b.location.href = x, t.next = 34;
                                        break;
                                    case 29:
                                        return t.prev = 29, t.t0 = t.catch(6), this.loading = !1, console.log("下载错误，信息为：", t.t0), t.abrupt("return", l.default.reject(t.t0));
                                    case 34:
                                        return t.abrupt("return", !0);
                                    case 35:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this, [
                                [6, 29]
                            ])
                        }));
                        return t
                    }()
                }, {
                    key: "startHeartBeatLink",
                    value: function () {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6e5;
                        return console.log("心跳启动，间隔10分钟"), this.getRefreshToken(), window.refreshTokeningFlag ? (console.log("已有心跳在运行中，不再开启新的心跳"), !1) : (window.refreshTokeningFlag = !0, this.heartTimer = window.setInterval(function () {
                            t.getRefreshToken()
                        }, e), !0)
                    }
                }, {
                    key: "makeJumpAddress",
                    value: function (t, e) {
                        var n = (0, _.isPre)() ? "staging-web.ewt360.com" : (0, _.isProd)() ? "web.ewt360.com" : "web.test.mistong.com",
                            r = window.location.protocol,
                            o = (0, _.getAgentName)().toLocaleLowerCase(),
                            i = "others" === o ? "webNoAuth" : "nativeNoAuth",
                            u = r + "//" + n + "/single-point-page/#/unifyAuthentication/" + i + "?authCode=" + t + "&authMessage=" + encodeURIComponent(e);
                        return {
                            platform: o,
                            targetUrl: u
                        }
                    }
                }, {
                    key: "unifyAuthentication",
                    value: function () {
                        function t() {
                            return e.apply(this, arguments)
                        }
                        var e = (0, d.default)(s.default.mark(function t() {
                            var e, n, r, o, u, c, f, p, d, h, v, m, g, y, w, x, k, E, P, S, T, L, A, C, N, R, M = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return s.default.wrap(function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (e = M.systemFlag, n = void 0 === e ? "" : e, r = M.params, o = void 0 === r ? {} : r, u = M.autoJump, c = void 0 === u || u, f = M.resolve, p = void 0 === f ? function () {} : f, d = M.reject, h = void 0 === d ? function () {} : d, n && b.default[n]) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return", l.default.reject(new Error("系统标识参数缺失或该标识未配置")));
                                    case 3:
                                        return v = b.default[n], m = v.method, g = v.url, y = v.gateway, w = v.testGateway, x = v.preGateway, k = "undefined" != typeof y ? window.location.protocol + "//" + ((0, _.isPre)() ? x : (0, _.isProd)() ? y : w) + g : g, t.prev = 6, t.next = 9, (0, O.default)({
                                            method: m,
                                            params: o,
                                            url: k
                                        });
                                    case 9:
                                        E = t.sent, p((0,
                                            a.default)({}, E)), l.default.resolve((0, a.default)({}, E)), t.next = 22;
                                        break;
                                    case 14:
                                        return t.prev = 14, t.t0 = t.catch(6), P = t.t0.code, S = t.t0.msg, T = Number(P), L = j.indexOf(T) !== -1, L ? (A = this.makeJumpAddress(T, S), C = A.targetUrl, N = A.platform, c ? window.location.replace(C) : (R = {
                                            codeNum: T,
                                            jumpUrl: C,
                                            platform: N,
                                            isProd: (0, _.isProd)(),
                                            msg: S
                                        }, h(R), l.default.reject(new Error((0, i.default)(R))))) : (h((0, a.default)({}, t.t0)), 702 !== T && 704 !== T && 2001106 !== Number(T) || (0, _.toLogin)(), l.default.reject(new Error((0, i.default)(t.t0)))), console.log("鉴权接口错误", t.t0), t.abrupt("return", "鉴权接口错误，参考控制台");
                                    case 22:
                                        return t.abrupt("return", !0);
                                    case 23:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this, [
                                [6, 14]
                            ])
                        }));
                        return t
                    }()
                }, {
                    key: "toNoPermissionPage",
                    value: function (t, e) {
                        var n = Number(t);
                        if (j.indexOf(n) !== -1) {
                            var r = this.makeJumpAddress(n, decodeURIComponent(e)),
                                o = r.targetUrl;
                            window.location.replace(o)
                        }
                    }
                }, {
                    key: "bindNoAuthButtonEvent",
                    value: function (t) {
                        var e = document.getElementById("mst_unify_authtication_no_auth_button"),
                            n = document.getElementById("mst_unify_authtication_close_modal_button"),
                            r = function () {
                                var e = (0, _.getAgentName)().toLocaleLowerCase();
                                if (9091403 === t) document.body.removeChild(document.getElementById("mst_unify_authtication_no_auth_modal"));
                                else if ("others" === e) {
                                    var n = 9091402 === t ? "?isUpgrade=1" : "",
                                        r = (0, _.isPre)() ? "staging-web.ewt360.com" : (0, _.isProd)() ? "web.ewt360.com" : "web.test.mistong.com",
                                        o = window.location.protocol + "//" + r + "/memberCenter/#/productDetail" + n;
                                    window.location.replace(o)
                                } else if ("others" !== e && 9091401 === t) try {
                                    window.mstJsBridge.openNative({
                                        domain: "user",
                                        action: "open_permission",
                                        params: {
                                            type: 1
                                        }
                                    })
                                } catch (t) {
                                    console.log("app购买会员路由错误：", t)
                                }
                            };
                        e.onclick = function () {
                            return r()
                        }, n.onclick = function () {
                            document.body.removeChild(document.getElementById("mst_unify_authtication_no_auth_modal"))
                        }
                    }
                }, {
                    key: "noAuthModal",
                    value: function (t, e) {
                        var n = Number(t);
                        if (j.indexOf(n) === -1) return "非权限code码,需相关业务场景进行信息提示";
                        var r = document.getElementById("mst_unify_authtication_no_auth_modal");
                        return r && 0 !== r.length && document.removeChild(r), this.createNoPermissionModalDom(n, e), !0
                    }
                }]), t
            }(),
            P = new E;
        window.ECustomerApi = P, t.exports = P
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(77),
            o = n(17),
            i = window.location.protocol,
            u = {
                createPaperByQuestions: {
                    method: "POST",
                    url: "/customerApi/api/paperservice/client/paper/info/addpublishedpaperreturnstring"
                },
                publishPaperById: {
                    method: "POST",
                    url: "/customerApi/api/paperservice/client/paper/info/changepaperstatusreturnstring"
                },
                generatePDFByTestpaper: {
                    method: "get",
                    url: i + "//" + ((0, o.isPre)() ? "staging-pst.ewt360.com" : "pst.ewt360.com") + "/api/print"
                },
                getUserInfo: {
                    method: "get",
                    url: i + "//" + ((0, o.isPre)() ? "staging-web.ewt360.com" : "web.ewt360.com") + "/api/usercenter/user/info"
                },
                getUnifyAuthtication: {
                    method: "get",
                    url: "http://yapi.235.mistong.com/mock/884/api/weekend/module/auth/check"
                }
            };
        e.default = (0, r.generator)(u)
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(43),
            i = r(o),
            u = n(41),
            a = r(u),
            c = n(40),
            s = r(c),
            f = function () {
                var t = (0, a.default)(i.default.mark(function t(e) {
                    var n = e.method,
                        r = e.params,
                        o = e.url;
                    return i.default.wrap(function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.abrupt("return", (0, s.default)({
                                    method: n,
                                    params: r,
                                    url: o
                                }));
                            case 1:
                            case "end":
                                return t.stop()
                        }
                    }, t, void 0)
                }));
                return function (e) {
                    return t.apply(this, arguments)
                }
            }();
        e.default = f
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.generator = void 0;
        var o = n(84),
            i = r(o),
            u = n(40),
            a = {};
        e.generator = function (t) {
            var e = function (e) {
                var n = t[e],
                    r = n.method,
                    o = n.url;
                return {
                    method: r,
                    url: o
                }
            };
            return a.getUrl = function (t) {
                return e(t).url
            }, (0, i.default)(t).forEach(function (n) {
                switch (t[n].method.toUpperCase()) {
                    case "POST":
                        a[n] = function (t) {
                            return (0, u.post)(e(n).url, t)
                        };
                        break;
                    case "GET":
                        a[n] = function (t) {
                            return (0, u.get)(e(n).url, {
                                params: t
                            })
                        };
                        break;
                    case "DELETE":
                        a[n] = function (t) {
                            return (0, u.del)(e(n).url, {
                                params: t
                            })
                        };
                        break;
                    case "PUT":
                        a[n] = function (t) {
                            return (0, u.put)(e(n).url, t)
                        };
                        break;
                    default:
                        a[n] = function (t) {
                            return (0, u.post)(e(n).url, t)
                        }
                }
            }), a
        };
        e.default = a
    }, function (t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = {
            xinli: {
                url: "/api/xinli/auth/functional/authenticate",
                method: "get",
                host: "xinli.ewt360.com",
                testHost: "xinli.test.mistong.com",
                gateway: "xinli.ewt360.com",
                preGateway: "staging-xinli.ewt360.com",
                testGateway: "xinli.test.mistong.com"
            },
            live: {
                url: "/Auth/FunctionalAuthenticate",
                method: "get",
                host: "live.ewt360.com",
                testHost: "live.test.mistong.com",
                gateway: "live.ewt360.com",
                preGateway: "staging-live.ewt360.com",
                testGateway: "live.test.mistong.com"
            },
            mind: {
                url: "/api/psychology/eval/question/add",
                method: "get",
                host: "web.ewt360.com",
                testHost: "web.test.mistong.com",
                gateway: "gateway.ewt360.com",
                preGateway: "staging-gateway.ewt360.com",
                testGateway: "gateway.test.mistong.com"
            },
            career: {
                url: "/api/careerprod/common/pageAuth",
                method: "get",
                host: "web.ewt360.com",
                testHost: "web.test.mistong.com",
                gateway: "gateway.ewt360.com",
                preGateway: "staging-gateway.ewt360.com",
                testGateway: "gateway.test.mistong.com"
            },
            question: {
                url: "/customerApi/api/studyprod/auth/function/check",
                method: "get",
                host: "web.ewt360.com",
                testHost: "web.test.mistong.com"
            },
            study: {
                url: "/customerApi/api/studyprod/auth/function/check",
                method: "get",
                host: "web.ewt360.com",
                testHost: "web.test.mistong.com"
            }
        };
        e.default = n
    }, function (t, e, n) {
        t.exports = {
            default: n(90),
            __esModule: !0
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(91),
            __esModule: !0
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(92),
            __esModule: !0
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(93),
            __esModule: !0
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(94),
            __esModule: !0
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(95),
            __esModule: !0
        }
    }, function (t, e) {
        "use strict";
        e.__esModule = !0, e.default = function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = n(83),
            i = r(o);
        e.default = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, i.default)(t, r.key, r)
                }
            }
            return function (e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }()
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var o = n(80),
            i = r(o),
            u = n(79),
            a = r(u);
        e.default = function () {
            function t(t, e) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var u, c = (0, a.default)(t); !(r = (u = c.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    o = !0, i = t
                } finally {
                    try {
                        !r && c.return && c.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }
            return function (e, n) {
                if (Array.isArray(e)) return e;
                if ((0, i.default)(Object(e))) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
    }, function (t, e, n) {
        var r = function () {
                return this
            }() || Function("return this")(),
            o = r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime") >= 0,
            i = o && r.regeneratorRuntime;
        if (r.regeneratorRuntime = void 0, t.exports = n(89), o) r.regeneratorRuntime = i;
        else try {
            delete r.regeneratorRuntime
        } catch (t) {
            r.regeneratorRuntime = void 0
        }
    }, function (t, e) {
        ! function (e) {
            "use strict";

            function n(t, e, n, r) {
                var i = e && e.prototype instanceof o ? e : o,
                    u = Object.create(i.prototype),
                    a = new d(r || []);
                return u._invoke = s(t, n, a), u
            }

            function r(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }

            function o() {}

            function i() {}

            function u() {}

            function a(t) {
                ["next", "throw", "return"].forEach(function (e) {
                    t[e] = function (t) {
                        return this._invoke(e, t)
                    }
                })
            }

            function c(t) {
                function e(n, o, i, u) {
                    var a = r(t[n], t, o);
                    if ("throw" !== a.type) {
                        var c = a.arg,
                            s = c.value;
                        return s && "object" == typeof s && y.call(s, "__await") ? Promise.resolve(s.__await).then(function (t) {
                            e("next", t, i, u)
                        }, function (t) {
                            e("throw", t, i, u)
                        }) : Promise.resolve(s).then(function (t) {
                            c.value = t, i(c)
                        }, u)
                    }
                    u(a.arg)
                }

                function n(t, n) {
                    function r() {
                        return new Promise(function (r, o) {
                            e(t, n, r, o)
                        })
                    }
                    return o = o ? o.then(r, r) : r()
                }
                var o;
                this._invoke = n
            }

            function s(t, e, n) {
                var o = j;
                return function (i, u) {
                    if (o === P) throw new Error("Generator is already running");
                    if (o === S) {
                        if ("throw" === i) throw u;
                        return v()
                    }
                    for (n.method = i, n.arg = u;;) {
                        var a = n.delegate;
                        if (a) {
                            var c = f(a, n);
                            if (c) {
                                if (c === T) continue;
                                return c
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if (o === j) throw o = S, n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        o = P;
                        var s = r(t, e, n);
                        if ("normal" === s.type) {
                            if (o = n.done ? S : E, s.arg === T) continue;
                            return {
                                value: s.arg,
                                done: n.done
                            }
                        }
                        "throw" === s.type && (o = S, n.method = "throw", n.arg = s.arg)
                    }
                }
            }

            function f(t, e) {
                var n = t.iterator[e.method];
                if (n === m) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (e.method = "return", e.arg = m, f(t, e), "throw" === e.method)) return T;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return T
                }
                var o = r(n, t.iterator, e.arg);
                if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, T;
                var i = o.arg;
                return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = m), e.delegate = null, T) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, T)
            }

            function l(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function p(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function d(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(l, this), this.reset(!0)
            }

            function h(t) {
                if (t) {
                    var e = t[x];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var n = -1,
                            r = function e() {
                                for (; ++n < t.length;)
                                    if (y.call(t, n)) return e.value = t[n], e.done = !1, e;
                                return e.value = m, e.done = !0, e
                            };
                        return r.next = r
                    }
                }
                return {
                    next: v
                }
            }

            function v() {
                return {
                    value: m,
                    done: !0
                }
            }
            var m, g = Object.prototype,
                y = g.hasOwnProperty,
                w = "function" == typeof Symbol ? Symbol : {},
                x = w.iterator || "@@iterator",
                b = w.asyncIterator || "@@asyncIterator",
                _ = w.toStringTag || "@@toStringTag",
                k = "object" == typeof t,
                O = e.regeneratorRuntime;
            if (O) return void(k && (t.exports = O));
            O = e.regeneratorRuntime = k ? t.exports : {}, O.wrap = n;
            var j = "suspendedStart",
                E = "suspendedYield",
                P = "executing",
                S = "completed",
                T = {},
                L = {};
            L[x] = function () {
                return this
            };
            var A = Object.getPrototypeOf,
                C = A && A(A(h([])));
            C && C !== g && y.call(C, x) && (L = C);
            var N = u.prototype = o.prototype = Object.create(L);
            i.prototype = N.constructor = u, u.constructor = i, u[_] = i.displayName = "GeneratorFunction", O.isGeneratorFunction = function (t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === i || "GeneratorFunction" === (e.displayName || e.name))
            }, O.mark = function (t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, u) : (t.__proto__ = u, _ in t || (t[_] = "GeneratorFunction")), t.prototype = Object.create(N), t
            }, O.awrap = function (t) {
                return {
                    __await: t
                }
            }, a(c.prototype), c.prototype[b] = function () {
                return this
            }, O.AsyncIterator = c, O.async = function (t, e, r, o) {
                var i = new c(n(t, e, r, o));
                return O.isGeneratorFunction(e) ? i : i.next().then(function (t) {
                    return t.done ? t.value : i.next()
                })
            }, a(N), N[_] = "Generator", N[x] = function () {
                return this
            }, N.toString = function () {
                return "[object Generator]"
            }, O.keys = function (t) {
                var e = [];
                for (var n in t) e.push(n);
                return e.reverse(),
                    function n() {
                        for (; e.length;) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n
                        }
                        return n.done = !0, n
                    }
            }, O.values = h, d.prototype = {
                constructor: d,
                reset: function (t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = m, this.done = !1, this.delegate = null, this.method = "next", this.arg = m, this.tryEntries.forEach(p), !t)
                        for (var e in this) "t" === e.charAt(0) && y.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = m)
                },
                stop: function () {
                    this.done = !0;
                    var t = this.tryEntries[0],
                        e = t.completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval
                },
                dispatchException: function (t) {
                    function e(e, r) {
                        return i.type = "throw", i.arg = t, n.next = e, r && (n.method = "next", n.arg = m), !!r
                    }
                    if (this.done) throw t;
                    for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r],
                            i = o.completion;
                        if ("root" === o.tryLoc) return e("end");
                        if (o.tryLoc <= this.prev) {
                            var u = y.call(o, "catchLoc"),
                                a = y.call(o, "finallyLoc");
                            if (u && a) {
                                if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
                                if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                            } else if (u) {
                                if (this.prev < o.catchLoc) return e(o.catchLoc, !0)
                            } else {
                                if (!a) throw new Error("try statement without catch or finally");
                                if (this.prev < o.finallyLoc) return e(o.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (t, e) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var r = this.tryEntries[n];
                        if (r.tryLoc <= this.prev && y.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                            var o = r;
                            break
                        }
                    }
                    o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                    var i = o ? o.completion : {};
                    return i.type = t, i.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, T) : this.complete(i)
                },
                complete: function (t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), T
                },
                finish: function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), p(n), T
                    }
                },
                catch: function (t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                p(n)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function (t, e, n) {
                    return this.delegate = {
                        iterator: h(t),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = m), T
                }
            }
        }(function () {
            return this
        }() || Function("return this")())
    }, function (t, e, n) {
        n(31), n(30), t.exports = n(124)
    }, function (t, e, n) {
        n(31), n(30), t.exports = n(125)
    }, function (t, e, n) {
        var r = n(1),
            o = r.JSON || (r.JSON = {
                stringify: JSON.stringify
            });
        t.exports = function (t) {
            return o.stringify.apply(o, arguments)
        }
    }, function (t, e, n) {
        n(127), t.exports = n(1).Object.assign
    }, function (t, e, n) {
        n(128);
        var r = n(1).Object;
        t.exports = function (t, e, n) {
            return r.defineProperty(t, e, n)
        }
    }, function (t, e, n) {
        n(129), t.exports = n(1).Object.keys
    }, function (t, e, n) {
        n(130), n(30), n(31), n(131), n(132), n(133), t.exports = n(1).Promise
    }, function (t, e) {
        t.exports = function () {}
    }, function (t, e) {
        t.exports = function (t, e, n, r) {
            if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");
            return t
        }
    }, function (t, e, n) {
        var r = n(28),
            o = n(54),
            i = n(121);
        t.exports = function (t) {
            return function (e, n, u) {
                var a, c = r(e),
                    s = o(c.length),
                    f = i(u, s);
                if (t && n != n) {
                    for (; s > f;)
                        if (a = c[f++], a != a) return !0
                } else
                    for (; s > f; f++)
                        if ((t || f in c) && c[f] === n) return t || f || 0;
                return !t && -1
            }
        }
    }, function (t, e, n) {
        var r = n(14),
            o = n(104),
            i = n(103),
            u = n(5),
            a = n(54),
            c = n(56),
            s = {},
            f = {},
            e = t.exports = function (t, e, n, l, p) {
                var d, h, v, m, g = p ? function () {
                        return t
                    } : c(t),
                    y = r(n, l, e ? 2 : 1),
                    w = 0;
                if ("function" != typeof g) throw TypeError(t + " is not iterable!");
                if (i(g)) {
                    for (d = a(t.length); d > w; w++)
                        if (m = e ? y(u(h = t[w])[0], h[1]) : y(t[w]), m === s || m === f) return m
                } else
                    for (v = g.call(t); !(h = v.next()).done;)
                        if (m = o(v, y, h.value, e), m === s || m === f) return m
            };
        e.BREAK = s, e.RETURN = f
    }, function (t, e, n) {
        t.exports = !n(6) && !n(15)(function () {
            return 7 != Object.defineProperty(n(21)("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    }, function (t, e) {
        t.exports = function (t, e, n) {
            var r = void 0 === n;
            switch (e.length) {
                case 0:
                    return r ? t() : t.call(n);
                case 1:
                    return r ? t(e[0]) : t.call(n, e[0]);
                case 2:
                    return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
                case 3:
                    return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
                case 4:
                    return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
            }
            return t.apply(n, e)
        }
    }, function (t, e, n) {
        var r = n(9),
            o = n(4)("iterator"),
            i = Array.prototype;
        t.exports = function (t) {
            return void 0 !== t && (r.Array === t || i[o] === t)
        }
    }, function (t, e, n) {
        var r = n(5);
        t.exports = function (t, e, n, o) {
            try {
                return o ? e(r(n)[0], n[1]) : e(n)
            } catch (e) {
                var i = t.return;
                throw void 0 !== i && r(i.call(t)), e
            }
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(110),
            o = n(50),
            i = n(25),
            u = {};
        n(8)(u, n(4)("iterator"), function () {
            return this
        }), t.exports = function (t, e, n) {
            t.prototype = r(u, {
                next: o(1, n)
            }), i(t, e + " Iterator")
        }
    }, function (t, e, n) {
        var r = n(4)("iterator"),
            o = !1;
        try {
            var i = [7][r]();
            i.return = function () {
                o = !0
            }, Array.from(i, function () {
                throw 2
            })
        } catch (t) {}
        t.exports = function (t, e) {
            if (!e && !o) return !1;
            var n = !1;
            try {
                var i = [7],
                    u = i[r]();
                u.next = function () {
                    return {
                        done: n = !0
                    }
                }, i[r] = function () {
                    return u
                }, t(i)
            } catch (t) {}
            return n
        }
    }, function (t, e) {
        t.exports = function (t, e) {
            return {
                value: e,
                done: !!t
            }
        }
    }, function (t, e, n) {
        var r = n(3),
            o = n(53).set,
            i = r.MutationObserver || r.WebKitMutationObserver,
            u = r.process,
            a = r.Promise,
            c = "process" == n(13)(u);
        t.exports = function () {
            var t, e, n, s = function () {
                var r, o;
                for (c && (r = u.domain) && r.exit(); t;) {
                    o = t.fn, t = t.next;
                    try {
                        o()
                    } catch (r) {
                        throw t ? n() : e = void 0, r
                    }
                }
                e = void 0, r && r.enter()
            };
            if (c) n = function () {
                u.nextTick(s)
            };
            else if (!i || r.navigator && r.navigator.standalone)
                if (a && a.resolve) {
                    var f = a.resolve(void 0);
                    n = function () {
                        f.then(s)
                    }
                } else n = function () {
                    o.call(r, s)
                };
            else {
                var l = !0,
                    p = document.createTextNode("");
                new i(s).observe(p, {
                    characterData: !0
                }), n = function () {
                    p.data = l = !l
                }
            }
            return function (r) {
                var o = {
                    fn: r,
                    next: void 0
                };
                e && (e.next = o), t || (t = o, n()), e = o
            }
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(6),
            o = n(24),
            i = n(112),
            u = n(115),
            a = n(29),
            c = n(46),
            s = Object.assign;
        t.exports = !s || n(15)(function () {
            var t = {},
                e = {},
                n = Symbol(),
                r = "abcdefghijklmnopqrst";
            return t[n] = 7, r.split("").forEach(function (t) {
                e[t] = t
            }), 7 != s({}, t)[n] || Object.keys(s({}, e)).join("") != r
        }) ? function (t, e) {
            for (var n = a(t), s = arguments.length, f = 1, l = i.f, p = u.f; s > f;)
                for (var d, h = c(arguments[f++]), v = l ? o(h).concat(l(h)) : o(h), m = v.length, g = 0; m > g;) d = v[g++], r && !p.call(h, d) || (n[d] = h[d]);
            return n
        } : s
    }, function (t, e, n) {
        var r = n(5),
            o = n(111),
            i = n(44),
            u = n(26)("IE_PROTO"),
            a = function () {},
            c = "prototype",
            s = function () {
                var t, e = n(21)("iframe"),
                    r = i.length,
                    o = "<",
                    u = ">";
                for (e.style.display = "none", n(45).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(o + "script" + u + "document.F=Object" + o + "/script" + u), t.close(), s = t.F; r--;) delete s[c][i[r]];
                return s()
            };
        t.exports = Object.create || function (t, e) {
            var n;
            return null !== t ? (a[c] = r(t), n = new a, a[c] = null, n[u] = t) : n = s(), void 0 === e ? n : o(n, e)
        }
    }, function (t, e, n) {
        var r = n(11),
            o = n(5),
            i = n(24);
        t.exports = n(6) ? Object.defineProperties : function (t, e) {
            o(t);
            for (var n, u = i(e), a = u.length, c = 0; a > c;) r.f(t, n = u[c++], e[n]);
            return t
        }
    }, function (t, e) {
        e.f = Object.getOwnPropertySymbols
    }, function (t, e, n) {
        var r = n(16),
            o = n(29),
            i = n(26)("IE_PROTO"),
            u = Object.prototype;
        t.exports = Object.getPrototypeOf || function (t) {
            return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null
        }
    }, function (t, e, n) {
        var r = n(16),
            o = n(28),
            i = n(99)(!1),
            u = n(26)("IE_PROTO");
        t.exports = function (t, e) {
            var n, a = o(t),
                c = 0,
                s = [];
            for (n in a) n != u && r(a, n) && s.push(n);
            for (; e.length > c;) r(a, n = e[c++]) && (~i(s, n) || s.push(n));
            return s
        }
    }, function (t, e) {
        e.f = {}.propertyIsEnumerable
    }, function (t, e, n) {
        var r = n(7),
            o = n(1),
            i = n(15);
        t.exports = function (t, e) {
            var n = (o.Object || {})[t] || Object[t],
                u = {};
            u[t] = e(n), r(r.S + r.F * i(function () {
                n(1)
            }), "Object", u)
        }
    }, function (t, e, n) {
        var r = n(8);
        t.exports = function (t, e, n) {
            for (var o in e) n && t[o] ? t[o] = e[o] : r(t, o, e[o]);
            return t
        }
    }, function (t, e, n) {
        t.exports = n(8)
    }, function (t, e, n) {
        "use strict";
        var r = n(3),
            o = n(1),
            i = n(11),
            u = n(6),
            a = n(4)("species");
        t.exports = function (t) {
            var e = "function" == typeof o[t] ? o[t] : r[t];
            u && e && !e[a] && i.f(e, a, {
                configurable: !0,
                get: function () {
                    return this
                }
            })
        }
    }, function (t, e, n) {
        var r = n(27),
            o = n(20);
        t.exports = function (t) {
            return function (e, n) {
                var i, u, a = String(o(e)),
                    c = r(n),
                    s = a.length;
                return c < 0 || c >= s ? t ? "" : void 0 : (i = a.charCodeAt(c), i < 55296 || i > 56319 || c + 1 === s || (u = a.charCodeAt(c + 1)) < 56320 || u > 57343 ? t ? a.charAt(c) : i : t ? a.slice(c, c + 2) : (i - 55296 << 10) + (u - 56320) + 65536)
            }
        }
    }, function (t, e, n) {
        var r = n(27),
            o = Math.max,
            i = Math.min;
        t.exports = function (t, e) {
            return t = r(t), t < 0 ? o(t + e, 0) : i(t, e)
        }
    }, function (t, e, n) {
        var r = n(10);
        t.exports = function (t, e) {
            if (!r(t)) return t;
            var n, o;
            if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;
            if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;
            if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function (t, e, n) {
        var r = n(3),
            o = r.navigator;
        t.exports = o && o.userAgent || ""
    }, function (t, e, n) {
        var r = n(5),
            o = n(56);
        t.exports = n(1).getIterator = function (t) {
            var e = o(t);
            if ("function" != typeof e) throw TypeError(t + " is not iterable!");
            return r(e.call(t))
        }
    }, function (t, e, n) {
        var r = n(19),
            o = n(4)("iterator"),
            i = n(9);
        t.exports = n(1).isIterable = function (t) {
            var e = Object(t);
            return void 0 !== e[o] || "@@iterator" in e || i.hasOwnProperty(r(e))
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(97),
            o = n(107),
            i = n(9),
            u = n(28);
        t.exports = n(47)(Array, "Array", function (t, e) {
            this._t = u(t), this._i = 0, this._k = e
        }, function () {
            var t = this._t,
                e = this._k,
                n = this._i++;
            return !t || n >= t.length ? (this._t = void 0, o(1)) : "keys" == e ? o(0, n) : "values" == e ? o(0, t[n]) : o(0, [n, t[n]])
        }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
    }, function (t, e, n) {
        var r = n(7);
        r(r.S + r.F, "Object", {
            assign: n(109)
        })
    }, function (t, e, n) {
        var r = n(7);
        r(r.S + r.F * !n(6), "Object", {
            defineProperty: n(11).f
        })
    }, function (t, e, n) {
        var r = n(29),
            o = n(24);
        n(116)("keys", function () {
            return function (t) {
                return o(r(t))
            }
        })
    }, function (t, e) {}, function (t, e, n) {
        "use strict";
        var r, o, i, u, a = n(22),
            c = n(3),
            s = n(14),
            f = n(19),
            l = n(7),
            p = n(10),
            d = n(12),
            h = n(98),
            v = n(100),
            m = n(52),
            g = n(53).set,
            y = n(108)(),
            w = n(23),
            x = n(48),
            b = n(123),
            _ = n(49),
            k = "Promise",
            O = c.TypeError,
            j = c.process,
            E = j && j.versions,
            P = E && E.v8 || "",
            S = c[k],
            T = "process" == f(j),
            L = function () {},
            A = o = w.f,
            C = !! function () {
                try {
                    var t = S.resolve(1),
                        e = (t.constructor = {})[n(4)("species")] = function (t) {
                            t(L, L)
                        };
                    return (T || "function" == typeof PromiseRejectionEvent) && t.then(L) instanceof e && 0 !== P.indexOf("6.6") && b.indexOf("Chrome/66") === -1
                } catch (t) {}
            }(),
            N = function (t) {
                var e;
                return !(!p(t) || "function" != typeof (e = t.then)) && e
            },
            R = function (t, e) {
                if (!t._n) {
                    t._n = !0;
                    var n = t._c;
                    y(function () {
                        for (var r = t._v, o = 1 == t._s, i = 0, u = function (e) {
                                var n, i, u, a = o ? e.ok : e.fail,
                                    c = e.resolve,
                                    s = e.reject,
                                    f = e.domain;
                                try {
                                    a ? (o || (2 == t._h && B(t), t._h = 1), a === !0 ? n = r : (f && f.enter(), n = a(r), f && (f.exit(), u = !0)), n === e.promise ? s(O("Promise-chain cycle")) : (i = N(n)) ? i.call(n, c, s) : c(n)) : s(r)
                                } catch (t) {
                                    f && !u && f.exit(), s(t)
                                }
                            }; n.length > i;) u(n[i++]);
                        t._c = [], t._n = !1, e && !t._h && M(t)
                    })
                }
            },
            M = function (t) {
                g.call(c, function () {
                    var e, n, r, o = t._v,
                        i = U(t);
                    if (i && (e = x(function () {
                            T ? j.emit("unhandledRejection", o, t) : (n = c.onunhandledrejection) ? n({
                                promise: t,
                                reason: o
                            }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", o)
                        }), t._h = T || U(t) ? 2 : 1), t._a = void 0, i && e.e) throw e.v
                })
            },
            U = function (t) {
                return 1 !== t._h && 0 === (t._a || t._c).length
            },
            B = function (t) {
                g.call(c, function () {
                    var e;
                    T ? j.emit("rejectionHandled", t) : (e = c.onrejectionhandled) && e({
                        promise: t,
                        reason: t._v
                    })
                })
            },
            I = function (t) {
                var e = this;
                e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), R(e, !0))
            },
            F = function (t) {
                var e, n = this;
                if (!n._d) {
                    n._d = !0, n = n._w || n;
                    try {
                        if (n === t) throw O("Promise can't be resolved itself");
                        (e = N(t)) ? y(function () {
                            var r = {
                                _w: n,
                                _d: !1
                            };
                            try {
                                e.call(t, s(F, r, 1), s(I, r, 1))
                            } catch (t) {
                                I.call(r, t)
                            }
                        }): (n._v = t, n._s = 1, R(n, !1))
                    } catch (t) {
                        I.call({
                            _w: n,
                            _d: !1
                        }, t)
                    }
                }
            };
        C || (S = function (t) {
            h(this, S, k, "_h"), d(t), r.call(this);
            try {
                t(s(F, this, 1), s(I, this, 1))
            } catch (t) {
                I.call(this, t)
            }
        }, r = function (t) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
        }, r.prototype = n(117)(S.prototype, {
            then: function (t, e) {
                var n = A(m(this, S));
                return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = T ? j.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && R(this, !1), n.promise
            },
            catch: function (t) {
                return this.then(void 0, t)
            }
        }), i = function () {
            var t = new r;
            this.promise = t, this.resolve = s(F, t, 1), this.reject = s(I, t, 1)
        }, w.f = A = function (t) {
            return t === S || t === u ? new i(t) : o(t)
        }), l(l.G + l.W + l.F * !C, {
            Promise: S
        }), n(25)(S, k), n(119)(k), u = n(1)[k], l(l.S + l.F * !C, k, {
            reject: function (t) {
                var e = A(this),
                    n = e.reject;
                return n(t), e.promise
            }
        }), l(l.S + l.F * (a || !C), k, {
            resolve: function (t) {
                return _(a && this === u ? S : this, t)
            }
        }), l(l.S + l.F * !(C && n(106)(function (t) {
            S.all(t).catch(L)
        })), k, {
            all: function (t) {
                var e = this,
                    n = A(e),
                    r = n.resolve,
                    o = n.reject,
                    i = x(function () {
                        var n = [],
                            i = 0,
                            u = 1;
                        v(t, !1, function (t) {
                            var a = i++,
                                c = !1;
                            n.push(void 0), u++, e.resolve(t).then(function (t) {
                                c || (c = !0, n[a] = t, --u || r(n))
                            }, o)
                        }), --u || r(n)
                    });
                return i.e && o(i.v), n.promise
            },
            race: function (t) {
                var e = this,
                    n = A(e),
                    r = n.reject,
                    o = x(function () {
                        v(t, !1, function (t) {
                            e.resolve(t).then(n.resolve, r)
                        })
                    });
                return o.e && r(o.v), n.promise
            }
        })
    }, function (t, e, n) {
        "use strict";
        var r = n(7),
            o = n(1),
            i = n(3),
            u = n(52),
            a = n(49);
        r(r.P + r.R, "Promise", {
            finally: function (t) {
                var e = u(this, o.Promise || i.Promise),
                    n = "function" == typeof t;
                return this.then(n ? function (n) {
                    return a(e, t()).then(function () {
                        return n
                    })
                } : t, n ? function (n) {
                    return a(e, t()).then(function () {
                        throw n
                    })
                } : t)
            }
        })
    }, function (t, e, n) {
        "use strict";
        var r = n(7),
            o = n(23),
            i = n(48);
        r(r.S, "Promise", {
            try: function (t) {
                var e = o.f(this),
                    n = i(t);
                return (n.e ? e.reject : e.resolve)(n.v), e.promise
            }
        })
    }, function (t, e, n) {
        ! function (e, n) {
            t.exports = n()
        }(this, function () {
            "use strict";

            function t(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) t[r] = n[r]
                }
                return t
            }

            function e(n, r) {
                function o(e, o, i) {
                    if ("undefined" != typeof document) {
                        i = t({}, r, i), "number" == typeof i.expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                        var u = "";
                        for (var a in i) i[a] && (u += "; " + a, i[a] !== !0 && (u += "=" + i[a].split(";")[0]));
                        return document.cookie = e + "=" + n.write(o, e) + u
                    }
                }

                function i(t) {
                    if ("undefined" != typeof document && (!arguments.length || t)) {
                        for (var e = document.cookie ? document.cookie.split("; ") : [], r = {}, o = 0; o < e.length; o++) {
                            var i = e[o].split("="),
                                u = i.slice(1).join("=");
                            try {
                                var a = decodeURIComponent(i[0]);
                                if (r[a] = n.read(u, a), t === a) break
                            } catch (t) {}
                        }
                        return t ? r[t] : r
                    }
                }
                return Object.create({
                    set: o,
                    get: i,
                    remove: function (e, n) {
                        o(e, "", t({}, n, {
                            expires: -1
                        }))
                    },
                    withAttributes: function (n) {
                        return e(this.converter, t({}, this.attributes, n))
                    },
                    withConverter: function (n) {
                        return e(t({}, this.converter, n), this.attributes)
                    }
                }, {
                    attributes: {
                        value: Object.freeze(r)
                    },
                    converter: {
                        value: Object.freeze(n)
                    }
                })
            }
            var n = {
                    read: function (t) {
                        return '"' === t[0] && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                    },
                    write: function (t) {
                        return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
                    }
                },
                r = e(n, {
                    path: "/"
                });
            return r
        })
    }, function (t, e) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(t) {
            if (f === setTimeout) return setTimeout(t, 0);
            if ((f === n || !f) && setTimeout) return f = setTimeout, setTimeout(t, 0);
            try {
                return f(t, 0)
            } catch (e) {
                try {
                    return f.call(null, t, 0)
                } catch (e) {
                    return f.call(this, t, 0)
                }
            }
        }

        function i(t) {
            if (l === clearTimeout) return clearTimeout(t);
            if ((l === r || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);
            try {
                return l(t)
            } catch (e) {
                try {
                    return l.call(null, t)
                } catch (e) {
                    return l.call(this, t)
                }
            }
        }

        function u() {
            v && d && (v = !1, d.length ? h = d.concat(h) : m = -1, h.length && a())
        }

        function a() {
            if (!v) {
                var t = o(u);
                v = !0;
                for (var e = h.length; e;) {
                    for (d = h, h = []; ++m < e;) d && d[m].run();
                    m = -1, e = h.length
                }
                d = null, v = !1, i(t)
            }
        }

        function c(t, e) {
            this.fun = t, this.array = e
        }

        function s() {}
        var f, l, p = t.exports = {};
        ! function () {
            try {
                f = "function" == typeof setTimeout ? setTimeout : n
            } catch (t) {
                f = n
            }
            try {
                l = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (t) {
                l = r
            }
        }();
        var d, h = [],
            v = !1,
            m = -1;
        p.nextTick = function (t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            h.push(new c(t, e)), 1 !== h.length || v || o(a)
        }, c.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = s, p.addListener = s, p.once = s, p.off = s, p.removeListener = s, p.removeAllListeners = s, p.emit = s, p.prependListener = s, p.prependOnceListener = s, p.listeners = function (t) {
            return []
        }, p.binding = function (t) {
            throw new Error("process.binding is not supported")
        }, p.cwd = function () {
            return "/"
        }, p.chdir = function (t) {
            throw new Error("process.chdir is not supported")
        }, p.umask = function () {
            return 0
        }
    }])
});