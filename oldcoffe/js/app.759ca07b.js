;(function (e) {
  function t (t) {
    for (
      var a, r, c = t[0], i = t[1], s = t[2], l = 0, p = [];
      l < c.length;
      l++
    )
      (r = c[l]),
        Object.prototype.hasOwnProperty.call(o, r) && o[r] && p.push(o[r][0]),
        (o[r] = 0)
    for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
    f && f(t)
    while (p.length) p.shift()()
    return u.push.apply(u, s || []), n()
  }
  function n () {
    for (var e, t = 0; t < u.length; t++) {
      for (var n = u[t], a = !0, r = 1; r < n.length; r++) {
        var c = n[r]
        0 !== o[c] && (a = !1)
      }
      a && (u.splice(t--, 1), (e = i((i.s = n[0]))))
    }
    return e
  }
  var a = {},
    r = { app: 0 },
    o = { app: 0 },
    u = []
  function c (e) {
    return (
      i.p +
      'js/' +
      ({ about: 'about' }[e] || e) +
      '.' +
      { about: '8a304fc5' }[e] +
      '.js'
    )
  }
  function i (t) {
    if (a[t]) return a[t].exports
    var n = (a[t] = { i: t, l: !1, exports: {} })
    return e[t].call(n.exports, n, n.exports, i), (n.l = !0), n.exports
  }
  ;(i.e = function (e) {
    var t = [],
      n = { about: 1 }
    r[e]
      ? t.push(r[e])
      : 0 !== r[e] &&
        n[e] &&
        t.push(
          (r[e] = new Promise(function (t, n) {
            for (
              var a =
                  'css/' +
                  ({ about: 'about' }[e] || e) +
                  '.' +
                  { about: 'a3b9c2e2' }[e] +
                  '.css',
                o = i.p + a,
                u = document.getElementsByTagName('link'),
                c = 0;
              c < u.length;
              c++
            ) {
              var s = u[c],
                l = s.getAttribute('data-href') || s.getAttribute('href')
              if ('stylesheet' === s.rel && (l === a || l === o)) return t()
            }
            var p = document.getElementsByTagName('style')
            for (c = 0; c < p.length; c++) {
              ;(s = p[c]), (l = s.getAttribute('data-href'))
              if (l === a || l === o) return t()
            }
            var f = document.createElement('link')
            ;(f.rel = 'stylesheet'),
              (f.type = 'text/css'),
              (f.onload = t),
              (f.onerror = function (t) {
                var a = (t && t.target && t.target.src) || o,
                  u = new Error(
                    'Loading CSS chunk ' + e + ' failed.\n(' + a + ')'
                  )
                ;(u.code = 'CSS_CHUNK_LOAD_FAILED'),
                  (u.request = a),
                  delete r[e],
                  f.parentNode.removeChild(f),
                  n(u)
              }),
              (f.href = o)
            var d = document.getElementsByTagName('head')[0]
            d.appendChild(f)
          }).then(function () {
            r[e] = 0
          }))
        )
    var a = o[e]
    if (0 !== a)
      if (a) t.push(a[2])
      else {
        var u = new Promise(function (t, n) {
          a = o[e] = [t, n]
        })
        t.push((a[2] = u))
        var s,
          l = document.createElement('script')
        ;(l.charset = 'utf-8'),
          (l.timeout = 120),
          i.nc && l.setAttribute('nonce', i.nc),
          (l.src = c(e))
        var p = new Error()
        s = function (t) {
          ;(l.onerror = l.onload = null), clearTimeout(f)
          var n = o[e]
          if (0 !== n) {
            if (n) {
              var a = t && ('load' === t.type ? 'missing' : t.type),
                r = t && t.target && t.target.src
              ;(p.message =
                'Loading chunk ' + e + ' failed.\n(' + a + ': ' + r + ')'),
                (p.name = 'ChunkLoadError'),
                (p.type = a),
                (p.request = r),
                n[1](p)
            }
            o[e] = void 0
          }
        }
        var f = setTimeout(function () {
          s({ type: 'timeout', target: l })
        }, 12e4)
        ;(l.onerror = l.onload = s), document.head.appendChild(l)
      }
    return Promise.all(t)
  }),
    (i.m = e),
    (i.c = a),
    (i.d = function (e, t, n) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
    }),
    (i.r = function (e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (i.t = function (e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e
      var n = Object.create(null)
      if (
        (i.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var a in e)
          i.d(
            n,
            a,
            function (t) {
              return e[t]
            }.bind(null, a)
          )
      return n
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e['default']
            }
          : function () {
              return e
            }
      return i.d(t, 'a', t), t
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (i.p = ''),
    (i.oe = function (e) {
      throw (console.error(e), e)
    })
  var s = (window['webpackJsonp'] = window['webpackJsonp'] || []),
    l = s.push.bind(s)
  ;(s.push = t), (s = s.slice())
  for (var p = 0; p < s.length; p++) t(s[p])
  var f = l
  u.push([0, 'chunk-vendors']), n()
})({
  0: function (e, t, n) {
    e.exports = n('56d7')
  },
  2395: function (e, t, n) {},
  '56d7': function (e, t, n) {
    'use strict'
    n.r(t)
    n('4de4'),
      n('fb6a'),
      n('d3b7'),
      n('4d63'),
      n('ac1f'),
      n('25f0'),
      n('5319'),
      n('5246')
    var a = n('6b41'),
      r = (n('66b9'), n('b650')),
      o = (n('38d5'), n('772a')),
      u = (n('be7f'), n('565f')),
      c = (n('c3a6'), n('ad06')),
      i = (n('e7e5'), n('d399')),
      s = (n('9a83'), n('f564')),
      l = (n('66cf'), n('343b')),
      p = (n('7844'), n('5596')),
      f = (n('4b0a'), n('2bb1')),
      d = (n('5852'), n('d961')),
      b = (n('da3c'), n('0b33')),
      h = (n('bda7'), n('5e46')),
      m = (n('93ac'), n('bb33')),
      g = (n('ef6f'), n('82a8')),
      v = (n('591c'), n('7713')),
      y = (n('f06a'), n('20fb')),
      w = (n('4467'), n('c36e')),
      S = (n('c194'), n('7744')),
      j = (n('0653'), n('34e9')),
      x = (n('3c32'), n('417e')),
      E = (n('a909'), n('3acc')),
      O = (n('be39'), n('efa0')),
      C = (n('e17f'), n('2241')),
      P = (n('91d5'), n('f0ca')),
      k = (n('537a'), n('ac28')),
      _ = (n('a52c'), n('2ed4')),
      T = (n('acb7'), n('67bb')),
      M = (n('869a'), n('6869')),
      A = (n('29ea'), n('df1a')),
      D = (n('8a58'), n('e41f')),
      L = (n('480b'), n('a37c')),
      N = (n('e930'), n('8f80')),
      B = (n('e260'), n('e6cf'), n('cca6'), n('a79d'), n('2b0e')),
      F = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n('div', { attrs: { id: 'app' } }, [n('router-view')], 1)
      },
      R = [],
      $ = (n('7c55'), n('2877')),
      U = {},
      q = Object($['a'])(U, F, R, !1, null, null, null),
      H = q.exports,
      J = n('8c4f')
    B['a'].use(J['a'])
    var V = [
        {
          path: '/login',
          name: 'Login',
          component: function () {
            return n.e('about').then(n.bind(null, 'a55b'))
          }
        },
        {
          path: '/main',
          name: 'Main',
          component: function () {
            return n.e('about').then(n.bind(null, 'cd56'))
          },
          children: [
            {
              path: 'shouye',
              name: 'Shouye',
              component: function () {
                return n.e('about').then(n.bind(null, 'de88'))
              }
            },
            {
              path: 'shop',
              name: 'Shop',
              component: function () {
                return n.e('about').then(n.bind(null, '8ea5'))
              }
            },
            {
              path: 'my',
              name: 'My',
              component: function () {
                return n.e('about').then(n.bind(null, '6740'))
              }
            },
            {
              path: 'caidan',
              name: 'Caidan',
              component: function () {
                return n.e('about').then(n.bind(null, '6a8d'))
              }
            },
            {
              path: 'dingdan',
              name: 'Dingdan',
              component: function () {
                return n.e('about').then(n.bind(null, 'b394'))
              }
            }
          ]
        },
        {
          path: '/detail',
          name: 'Detail',
          component: function () {
            return n.e('about').then(n.bind(null, 'c84b'))
          }
        },
        {
          path: '/tijiao',
          name: 'Tijiao',
          component: function () {
            return n.e('about').then(n.bind(null, '0bdf'))
          }
        },
        {
          path: '/collect',
          name: 'Collect',
          component: function () {
            return n.e('about').then(n.bind(null, '0c03'))
          }
        },
        {
          path: '/site',
          name: 'Site',
          component: function () {
            return n.e('about').then(n.bind(null, 'e910'))
          }
        },
        {
          path: '/personal',
          name: 'Personal',
          component: function () {
            return n.e('about').then(n.bind(null, '90ab'))
          }
        },
        {
          path: '/safety',
          name: 'Safety',
          component: function () {
            return n.e('about').then(n.bind(null, '131c'))
          }
        },
        {
          path: '/setpasswo',
          name: 'setpasswo',
          component: function () {
            return n.e('about').then(n.bind(null, 'c2a5'))
          }
        },
        {
          path: '/forgetpassword',
          name: 'Forgetpassword',
          component: function () {
            return n.e('about').then(n.bind(null, 'c3ee'))
          }
        },
        {
          path: '/fromparticulars',
          name: 'fromparticulars',
          component: function () {
            return n.e('about').then(n.bind(null, '7463'))
          }
        },
        { path: '*', redirect: { name: 'Shouye' } }
      ],
      G = new J['a']({ routes: V }),
      I = G,
      K = (n('44ce'), n('a342'), n('82ae')),
      Q = n.n(K),
      W = n('e7aa'),
      X = n.n(W)
    B['a']
      .use(a['a'])
      .use(r['a'])
      .use(o['a'])
      .use(u['a'])
      .use(c['a'])
      .use(i['a'])
      .use(s['a'])
      .use(l['a'])
      .use(p['a'])
      .use(f['a'])
      .use(d['a'])
      .use(b['a'])
      .use(h['a'])
      .use(m['a'])
      .use(g['a'])
      .use(v['a'])
      .use(y['a'])
      .use(w['a'])
      .use(S['a'])
      .use(j['a'])
      .use(x['a'])
      .use(E['a'])
      .use(O['a'])
      .use(C['a'])
      .use(P['a'])
      .use(k['a'])
      .use(_['a'])
      .use(T['a'])
      .use(M['a'])
      .use(A['a'])
      .use(D['a'])
      .use(L['a'])
      .use(N['a'])
    var Y = J['a'].prototype.push
    ;(J['a'].prototype.push = function (e) {
      return Y.call(this, e).catch(function (e) {
        return e
      })
    }),
      B['a'].use(X.a, Q.a),
      (Q.a.defaults.baseURL = 'http://www.kangliuyong.com:10002'),
      (Q.a.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded;charset=utf-8'),
      (B['a'].prototype.appkey =
        'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='),
      (B['a'].config.productionTip = !1),
      B['a'].filter('formatDate', function (e, t) {
        var n = new Date(e),
          a = n.getFullYear()
        if (/(y+)/.test(t)) {
          var r = RegExp.$1
          t = t.replace(r, a.toString().slice(4 - r.length))
        }
        var o = {
          M: n.getMonth() + 1,
          d: n.getDate(),
          h: n.getHours(),
          m: n.getMinutes(),
          s: n.getSeconds()
        }
        for (var u in o) {
          var c = new RegExp('('.concat(u, '+)'))
          if (c.test(t)) {
            var i = RegExp.$1,
              s = o[u] >= 10 ? o[u] : 2 == i.length ? '0' + o[u] : o[u]
            t = t.replace(i, s)
          }
        }
        return t
      }),
      new B['a']({
        router: I,
        render: function (e) {
          return e(H)
        }
      }).$mount('#app')
  },
  '7c55': function (e, t, n) {
    'use strict'
    var a = n('2395'),
      r = n.n(a)
    r.a
  },
  a342: function (e, t, n) {}
})
//# sourceMappingURL=app.759ca07b.js.map
