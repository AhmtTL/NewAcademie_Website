import { ref, watch, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, withDirectives, vModelText, vModelSelect, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-CpbHJZNQ.js";
import { router, Head } from "@inertiajs/vue3";
import "./BaseLayout-BsMrMdpN.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    registrations: Object,
    filters: Object,
    stats: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const status = ref(props.filters.status || "");
    watch([search, status], ([searchValue, statusValue]) => {
      router.get(route("admin.workshop-registrations.index"), {
        search: searchValue,
        status: statusValue
      }, {
        preserveState: true,
        replace: true
      });
    });
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString();
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    const getStatusBadgeClass = (isCheckedIn) => {
      return isCheckedIn ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
    };
    const checkIn = (registrationId) => {
      if (confirm("Mark this registration as checked in?")) {
        router.post(route("admin.workshop-registrations.check-in", registrationId), {}, {
          preserveScroll: true
        });
      }
    };
    const uncheckIn = (registrationId) => {
      if (confirm("Uncheck this registration?")) {
        router.post(route("admin.workshop-registrations.uncheck-in", registrationId), {}, {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Workshop Registrations" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Workshop Registrations </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Workshop Registrations ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Registrations</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_registrations)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Checked In</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.checked_in)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Pending Check-in</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.pending_checkin)}</dd></dl></div></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 border-b border-gray-200"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label for="search" class="sr-only"${_scopeId}>Search registrations</label><div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></div><input id="search"${ssrRenderAttr("value", search.value)} type="text" placeholder="Search by code, name, email, or program..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div></div><div${_scopeId}><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "") : ssrLooseEqual(status.value, "")) ? " selected" : ""}${_scopeId}>All Statuses</option><option value="checked_in"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "checked_in") : ssrLooseEqual(status.value, "checked_in")) ? " selected" : ""}${_scopeId}>Checked In</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "pending") : ssrLooseEqual(status.value, "pending")) ? " selected" : ""}${_scopeId}>Pending Check-in</option></select></div></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Registration Code </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Attendee </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Program </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Session </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Registered </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.registrations.data, (registration) => {
              var _a, _b, _c, _d, _e, _f;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-mono font-bold text-indigo-600"${_scopeId}>${ssrInterpolate(registration.unique_code)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 h-8 w-8"${_scopeId}><div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"${_scopeId}><span class="text-xs font-medium text-white"${_scopeId}>${ssrInterpolate((((_a = registration.user) == null ? void 0 : _a.name) || registration.guest_name || "Guest").charAt(0))}</span></div></div><div class="ml-3"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_b = registration.user) == null ? void 0 : _b.name) || registration.guest_name || "Guest User")}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_c = registration.user) == null ? void 0 : _c.email) || registration.guest_email || "No email")}</div><div class="text-sm text-gray-500"${_scopeId}> School: ${ssrInterpolate(((_d = registration.payment) == null ? void 0 : _d.guest_school_name) || "N/A")}</div><div class="text-sm text-gray-500"${_scopeId}> Grade: ${ssrInterpolate(((_e = registration.payment) == null ? void 0 : _e.guest_grade) || "N/A")}</div></div></div></td><td class="px-6 py-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_f = registration.program) == null ? void 0 : _f.title) || "Unknown Program")}</div></td><td class="px-6 py-4"${_scopeId}>`);
              if (registration.workshop_session) {
                _push2(`<div class="text-sm text-gray-900"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(registration.workshop_session.location || "N/A")}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(registration.workshop_session.date ? formatDate(registration.workshop_session.date) : "TBA")}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(registration.workshop_session.time || "TBA")}</div></div>`);
              } else {
                _push2(`<div class="text-sm text-gray-400"${_scopeId}>No session</div>`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(registration.is_checked_in)])}"${_scopeId}>${ssrInterpolate(registration.is_checked_in ? "Checked In" : "Pending")}</span>`);
              if (registration.checked_in_at) {
                _push2(`<div class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(formatDateTime(registration.checked_in_at))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDateTime(registration.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}>`);
              if (!registration.is_checked_in) {
                _push2(`<button class="text-green-600 hover:text-green-900 font-medium"${_scopeId}> Check In </button>`);
              } else {
                _push2(`<button class="text-orange-600 hover:text-orange-900 font-medium"${_scopeId}> Undo </button>`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
            if (__props.registrations.prev_page_url) {
              _push2(`<a${ssrRenderAttr("href", __props.registrations.prev_page_url)} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"${_scopeId}> Previous </a>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.registrations.next_page_url) {
              _push2(`<a${ssrRenderAttr("href", __props.registrations.next_page_url)} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"${_scopeId}> Next </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.registrations.from || 0)} to ${ssrInterpolate(__props.registrations.to || 0)} of ${ssrInterpolate(__props.registrations.total)} results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"${_scopeId}>`);
            if (__props.registrations.prev_page_url) {
              _push2(`<a${ssrRenderAttr("href", __props.registrations.prev_page_url)} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"${_scopeId}> Previous </a>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.registrations.next_page_url) {
              _push2(`<a${ssrRenderAttr("href", __props.registrations.next_page_url)} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"${_scopeId}> Next </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</nav></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-blue-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Registrations"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_registrations), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-green-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Checked In"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.checked_in), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-6 w-6 text-yellow-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Pending Check-in"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.pending_checkin), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 border-b border-gray-200" }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "search",
                            class: "sr-only"
                          }, "Search registrations"),
                          createVNode("div", { class: "relative" }, [
                            createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-5 w-5 text-gray-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                })
                              ]))
                            ]),
                            withDirectives(createVNode("input", {
                              id: "search",
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              type: "text",
                              placeholder: "Search by code, name, email, or program...",
                              class: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, search.value]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => status.value = $event,
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          }, [
                            createVNode("option", { value: "" }, "All Statuses"),
                            createVNode("option", { value: "checked_in" }, "Checked In"),
                            createVNode("option", { value: "pending" }, "Pending Check-in")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, status.value]
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Registration Code "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Attendee "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Program "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Session "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Registered "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.registrations.data, (registration) => {
                            var _a, _b, _c, _d, _e, _f;
                            return openBlock(), createBlock("tr", {
                              key: registration.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-mono font-bold text-indigo-600" }, toDisplayString(registration.unique_code), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "flex-shrink-0 h-8 w-8" }, [
                                    createVNode("div", { class: "h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center" }, [
                                      createVNode("span", { class: "text-xs font-medium text-white" }, toDisplayString((((_a = registration.user) == null ? void 0 : _a.name) || registration.guest_name || "Guest").charAt(0)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_b = registration.user) == null ? void 0 : _b.name) || registration.guest_name || "Guest User"), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(((_c = registration.user) == null ? void 0 : _c.email) || registration.guest_email || "No email"), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, " School: " + toDisplayString(((_d = registration.payment) == null ? void 0 : _d.guest_school_name) || "N/A"), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, " Grade: " + toDisplayString(((_e = registration.payment) == null ? void 0 : _e.guest_grade) || "N/A"), 1)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_f = registration.program) == null ? void 0 : _f.title) || "Unknown Program"), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                registration.workshop_session ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm text-gray-900"
                                }, [
                                  createVNode("div", { class: "font-medium" }, toDisplayString(registration.workshop_session.location || "N/A"), 1),
                                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(registration.workshop_session.date ? formatDate(registration.workshop_session.date) : "TBA"), 1),
                                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(registration.workshop_session.time || "TBA"), 1)
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-sm text-gray-400"
                                }, "No session"))
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(registration.is_checked_in)]
                                }, toDisplayString(registration.is_checked_in ? "Checked In" : "Pending"), 3),
                                registration.checked_in_at ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-gray-500 mt-1"
                                }, toDisplayString(formatDateTime(registration.checked_in_at)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDateTime(registration.created_at)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                !registration.is_checked_in ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => checkIn(registration.id),
                                  class: "text-green-600 hover:text-green-900 font-medium"
                                }, " Check In ", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => uncheckIn(registration.id),
                                  class: "text-orange-600 hover:text-orange-900 font-medium"
                                }, " Undo ", 8, ["onClick"]))
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.registrations.prev_page_url ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: __props.registrations.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, " Previous ", 8, ["href"])) : createCommentVNode("", true),
                        __props.registrations.next_page_url ? (openBlock(), createBlock("a", {
                          key: 1,
                          href: __props.registrations.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, " Next ", 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.registrations.from || 0) + " to " + toDisplayString(__props.registrations.to || 0) + " of " + toDisplayString(__props.registrations.total) + " results ", 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" }, [
                            __props.registrations.prev_page_url ? (openBlock(), createBlock("a", {
                              key: 0,
                              href: __props.registrations.prev_page_url,
                              class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            }, " Previous ", 8, ["href"])) : createCommentVNode("", true),
                            __props.registrations.next_page_url ? (openBlock(), createBlock("a", {
                              key: 1,
                              href: __props.registrations.next_page_url,
                              class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            }, " Next ", 8, ["href"])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/WorkshopRegistrations/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
