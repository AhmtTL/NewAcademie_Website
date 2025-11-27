import { ref, computed, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-CpbHJZNQ.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./BaseLayout-BsMrMdpN.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    sessions: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const filteredSessions = computed(() => {
      if (!search.value) return props.sessions.data;
      return props.sessions.data.filter(
        (session) => {
          var _a, _b, _c;
          return session.location.toLowerCase().includes(search.value.toLowerCase()) || ((_a = session.city) == null ? void 0 : _a.toLowerCase().includes(search.value.toLowerCase())) || ((_b = session.country) == null ? void 0 : _b.toLowerCase().includes(search.value.toLowerCase())) || ((_c = session.program) == null ? void 0 : _c.title.toLowerCase().includes(search.value.toLowerCase()));
        }
      );
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getUrgencyClass = (urgencyLevel) => {
      switch (urgencyLevel) {
        case "critical":
          return "bg-red-100 text-red-800 border-red-200";
        case "high":
          return "bg-orange-100 text-orange-800 border-orange-200";
        default:
          return "bg-green-100 text-green-800 border-green-200";
      }
    };
    const getUrgencyText = (session) => {
      if (session.remaining_spots <= 5) return "🔥 CRITICAL";
      if (session.remaining_spots <= 10) return "⚡ HIGH DEMAND";
      return "✅ AVAILABLE";
    };
    const deleteSession = (sessionId) => {
      if (confirm("Are you sure you want to delete this workshop session?")) {
        router.delete(route("admin.workshop-sessions.destroy", sessionId));
      }
    };
    const duplicateSession = (sessionId) => {
      if (confirm("Are you sure you want to duplicate this workshop session? A copy will be created with updated details.")) {
        router.post(route("admin.workshop-sessions.duplicate", sessionId));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Workshop Sessions Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>Workshop Sessions</h2><p class="text-gray-600 mt-1"${_scopeId}>Manage workshop sessions across multiple locations</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.workshop-sessions.create"),
              class: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ➕ Add New Session `);
                } else {
                  return [
                    createTextVNode(" ➕ Add New Session ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-6"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Search by location, city, country, or workshop name..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Workshop</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Location</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Date &amp; Time</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Availability</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Price</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(filteredSessions.value, (session) => {
              var _a, _b;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate((_a = session.program) == null ? void 0 : _a.title)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate((_b = session.program) == null ? void 0 : _b.slug)}</div></td><td class="px-6 py-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(session.location)}</div>`);
              if (session.venue_name) {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(session.venue_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (session.city || session.country) {
                _push2(`<div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate([session.city, session.country].filter(Boolean).join(", "))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(session.date))}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(session.time)}</div>`);
              if (session.timezone) {
                _push2(`<div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(session.timezone)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(session.remaining_spots)}/${ssrInterpolate(session.available_spots)} available </div><div class="w-full bg-gray-200 rounded-full h-2 mt-1"${_scopeId}><div class="${ssrRenderClass(`h-2 rounded-full ${session.remaining_spots <= 5 ? "bg-red-500" : session.remaining_spots <= 10 ? "bg-orange-500" : "bg-green-500"}`)}" style="${ssrRenderStyle({ width: `${session.booked_spots / session.available_spots * 100}%` })}"${_scopeId}></div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(session.formatted_effective_price)}</div>`);
              if (session.price_difference !== 0) {
                _push2(`<div class="${ssrRenderClass([session.price_difference > 0 ? "text-purple-600" : "text-green-600", "text-xs"])}"${_scopeId}>${ssrInterpolate(session.price_difference > 0 ? "+" : "")}$${ssrInterpolate(Math.abs(session.price_difference))} vs base </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass(`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyClass(session.urgency_level)}`)}"${_scopeId}>${ssrInterpolate(getUrgencyText(session))}</span>`);
              if (session.is_featured) {
                _push2(`<div class="mt-1"${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"${_scopeId}> ⭐ Featured </span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex items-center justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.workshop-sessions.show", session.id),
                class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View `);
                  } else {
                    return [
                      createTextVNode(" View ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.workshop-sessions.edit", session.id),
                class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Edit `);
                  } else {
                    return [
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm" title="Duplicate this session"${_scopeId}> Duplicate </button><button class="text-red-600 hover:text-red-800 bg-gray-100 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm"${_scopeId}> Delete </button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.sessions.links) {
              _push2(`<div class="mt-6"${_scopeId}><nav class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.sessions.from)} to ${ssrInterpolate(__props.sessions.to)} of ${ssrInterpolate(__props.sessions.total)} results </p></div><div class="flex items-center space-x-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.sessions.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url,
                  class: `px-3 py-2 text-sm rounded-md transition-colors ${link.active ? "bg-blue-600 text-white" : link.url ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"}`
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, "Workshop Sessions"),
                          createVNode("p", { class: "text-gray-600 mt-1" }, "Manage workshop sessions across multiple locations")
                        ]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.workshop-sessions.create"),
                          class: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" ➕ Add New Session ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "mb-6" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          type: "text",
                          placeholder: "Search by location, city, country, or workshop name...",
                          class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, search.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Workshop"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Location"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date & Time"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Availability"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Price"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredSessions.value, (session) => {
                              var _a, _b;
                              return openBlock(), createBlock("tr", {
                                key: session.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString((_a = session.program) == null ? void 0 : _a.title), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString((_b = session.program) == null ? void 0 : _b.slug), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(session.location), 1),
                                  session.venue_name ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-sm text-gray-500"
                                  }, toDisplayString(session.venue_name), 1)) : createCommentVNode("", true),
                                  session.city || session.country ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-xs text-gray-400"
                                  }, toDisplayString([session.city, session.country].filter(Boolean).join(", ")), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(session.date)), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(session.time), 1),
                                  session.timezone ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-gray-400"
                                  }, toDisplayString(session.timezone), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(session.remaining_spots) + "/" + toDisplayString(session.available_spots) + " available ", 1),
                                  createVNode("div", { class: "w-full bg-gray-200 rounded-full h-2 mt-1" }, [
                                    createVNode("div", {
                                      class: `h-2 rounded-full ${session.remaining_spots <= 5 ? "bg-red-500" : session.remaining_spots <= 10 ? "bg-orange-500" : "bg-green-500"}`,
                                      style: { width: `${session.booked_spots / session.available_spots * 100}%` }
                                    }, null, 6)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(session.formatted_effective_price), 1),
                                  session.price_difference !== 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: ["text-xs", session.price_difference > 0 ? "text-purple-600" : "text-green-600"]
                                  }, toDisplayString(session.price_difference > 0 ? "+" : "") + "$" + toDisplayString(Math.abs(session.price_difference)) + " vs base ", 3)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyClass(session.urgency_level)}`
                                  }, toDisplayString(getUrgencyText(session)), 3),
                                  session.is_featured ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-1"
                                  }, [
                                    createVNode("span", { class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200" }, " ⭐ Featured ")
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex items-center justify-end space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin.workshop-sessions.show", session.id),
                                      class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" View ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin.workshop-sessions.edit", session.id),
                                      class: "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors text-sm"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Edit ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode("button", {
                                      onClick: ($event) => duplicateSession(session.id),
                                      class: "text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-sm",
                                      title: "Duplicate this session"
                                    }, " Duplicate ", 8, ["onClick"]),
                                    createVNode("button", {
                                      onClick: ($event) => deleteSession(session.id),
                                      class: "text-red-600 hover:text-red-800 bg-gray-100 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm"
                                    }, " Delete ", 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.sessions.links ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode("nav", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("p", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.sessions.from) + " to " + toDisplayString(__props.sessions.to) + " of " + toDisplayString(__props.sessions.total) + " results ", 1)
                          ]),
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sessions.links, (link) => {
                              return openBlock(), createBlock(unref(Link), {
                                key: link.label,
                                href: link.url,
                                innerHTML: link.label,
                                class: `px-3 py-2 text-sm rounded-md transition-colors ${link.active ? "bg-blue-600 text-white" : link.url ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"}`
                              }, null, 8, ["href", "innerHTML", "class"]);
                            }), 128))
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WorkshopSessions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
