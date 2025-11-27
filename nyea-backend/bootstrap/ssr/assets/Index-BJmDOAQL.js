import { ref, watch, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, withDirectives, vModelText, vModelSelect, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-CpbHJZNQ.js";
import { router, Head, Link } from "@inertiajs/vue3";
import "./BaseLayout-BsMrMdpN.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    payments: Object,
    filters: Object,
    stats: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const status = ref(props.filters.status || "");
    const dateFrom = ref(props.filters.date_from || "");
    const dateTo = ref(props.filters.date_to || "");
    watch([search, status, dateFrom, dateTo], ([searchValue, statusValue, fromValue, toValue]) => {
      router.get(route("admin.payments.index"), {
        search: searchValue,
        status: statusValue,
        date_from: fromValue,
        date_to: toValue
      }, {
        preserveState: true,
        replace: true
      });
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString();
    };
    const getStatusBadgeClass = (status2) => {
      const classes = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        processing: "bg-blue-100 text-blue-800",
        refunded: "bg-gray-100 text-gray-800"
      };
      return classes[status2] || "bg-gray-100 text-gray-800";
    };
    const exportPayments = () => {
      const params = new URLSearchParams({
        status: status.value,
        date_from: dateFrom.value,
        date_to: dateTo.value
      });
      window.location.href = route("admin.payments.export") + "?" + params.toString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Payments" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Payments </h2><button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"${_scopeId}> Export CSV </button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Payments "),
                createVNode("button", {
                  onClick: exportPayments,
                  class: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                }, " Export CSV ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Revenue</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.total_revenue))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Pending Amount</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.pending_amount))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Failed Payments</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.failed_count)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Transactions</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_transactions)}</dd></dl></div></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 border-b border-gray-200"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}><div${_scopeId}><label for="search" class="sr-only"${_scopeId}>Search payments</label><div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></div><input id="search"${ssrRenderAttr("value", search.value)} type="text" placeholder="Search by user or program..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div></div><div${_scopeId}><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "") : ssrLooseEqual(status.value, "")) ? " selected" : ""}${_scopeId}>All Statuses</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "paid") : ssrLooseEqual(status.value, "paid")) ? " selected" : ""}${_scopeId}>Paid</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "pending") : ssrLooseEqual(status.value, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="processing"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "processing") : ssrLooseEqual(status.value, "processing")) ? " selected" : ""}${_scopeId}>Processing</option><option value="failed"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "failed") : ssrLooseEqual(status.value, "failed")) ? " selected" : ""}${_scopeId}>Failed</option><option value="refunded"${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "refunded") : ssrLooseEqual(status.value, "refunded")) ? " selected" : ""}${_scopeId}>Refunded</option></select></div><div${_scopeId}><input${ssrRenderAttr("value", dateFrom.value)} type="date" placeholder="From date" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div><div${_scopeId}><input${ssrRenderAttr("value", dateTo.value)} type="date" placeholder="To date" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${_scopeId}></div></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> User </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Program </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Date </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.payments.data, (payment) => {
              var _a, _b, _c, _d;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0 h-8 w-8"${_scopeId}><div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center"${_scopeId}><span class="text-xs font-medium text-white"${_scopeId}>${ssrInterpolate((((_a = payment.user) == null ? void 0 : _a.name) || payment.guest_name || "Guest User").charAt(0))}</span></div></div><div class="ml-3"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_b = payment.user) == null ? void 0 : _b.name) || payment.guest_name || "Guest User")}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_c = payment.user) == null ? void 0 : _c.email) || payment.guest_email || "No email")}</div>`);
              if (payment.guest_school_name) {
                _push2(`<div class="text-xs text-blue-600"${_scopeId}> School: ${ssrInterpolate(payment.guest_school_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payment.guest_grade) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}> Grade: ${ssrInterpolate(payment.guest_grade)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payment.guest_city) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}> City: ${ssrInterpolate(payment.guest_city)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!payment.user && payment.guest_phone) {
                _push2(`<div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(payment.guest_phone)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_d = payment.program) == null ? void 0 : _d.title) || "Unknown Program")}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payment.program ? formatCurrency(payment.program.price) : "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(payment.amount))}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(payment.status)])}"${_scopeId}>${ssrInterpolate(payment.status)}</span>`);
              if (payment.manual_override) {
                _push2(`<div class="text-xs text-orange-600 mt-1"${_scopeId}>Manual</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}><div${_scopeId}>${ssrInterpolate(formatDateTime(payment.created_at))}</div>`);
              if (payment.paid_at) {
                _push2(`<div class="text-xs text-green-600"${_scopeId}> Paid: ${ssrInterpolate(formatDate(payment.paid_at))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}>`);
              if (payment.id) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin.payments.show", payment.id),
                  class: "text-blue-600 hover:text-blue-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View Details `);
                    } else {
                      return [
                        createTextVNode(" View Details ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span class="text-gray-400"${_scopeId}>No ID</span>`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
            if (__props.payments.prev_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.prev_page_url,
                class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Previous `);
                  } else {
                    return [
                      createTextVNode(" Previous ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.payments.next_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.next_page_url,
                class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Next `);
                  } else {
                    return [
                      createTextVNode(" Next ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.payments.from)} to ${ssrInterpolate(__props.payments.to)} of ${ssrInterpolate(__props.payments.total)} results </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"${_scopeId}>`);
            if (__props.payments.prev_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.prev_page_url,
                class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Previous `);
                  } else {
                    return [
                      createTextVNode(" Previous ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.payments.next_page_url) {
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.payments.next_page_url,
                class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Next `);
                  } else {
                    return [
                      createTextVNode(" Next ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</nav></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8" }, [
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
                                d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Revenue"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.total_revenue)), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Pending Amount"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.pending_amount)), 1)
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
                              class: "h-6 w-6 text-red-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Failed Payments"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.failed_count), 1)
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
                              class: "h-6 w-6 text-blue-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Transactions"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_transactions), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 border-b border-gray-200" }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "search",
                            class: "sr-only"
                          }, "Search payments"),
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
                              placeholder: "Search by user or program...",
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
                            createVNode("option", { value: "paid" }, "Paid"),
                            createVNode("option", { value: "pending" }, "Pending"),
                            createVNode("option", { value: "processing" }, "Processing"),
                            createVNode("option", { value: "failed" }, "Failed"),
                            createVNode("option", { value: "refunded" }, "Refunded")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, status.value]
                          ])
                        ]),
                        createVNode("div", null, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => dateFrom.value = $event,
                            type: "date",
                            placeholder: "From date",
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, dateFrom.value]
                          ])
                        ]),
                        createVNode("div", null, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => dateTo.value = $event,
                            type: "date",
                            placeholder: "To date",
                            class: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, dateTo.value]
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " User "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Program "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Date "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.payments.data, (payment) => {
                            var _a, _b, _c, _d;
                            return openBlock(), createBlock("tr", {
                              key: payment.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "flex-shrink-0 h-8 w-8" }, [
                                    createVNode("div", { class: "h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center" }, [
                                      createVNode("span", { class: "text-xs font-medium text-white" }, toDisplayString((((_a = payment.user) == null ? void 0 : _a.name) || payment.guest_name || "Guest User").charAt(0)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "ml-3" }, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_b = payment.user) == null ? void 0 : _b.name) || payment.guest_name || "Guest User"), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(((_c = payment.user) == null ? void 0 : _c.email) || payment.guest_email || "No email"), 1),
                                    payment.guest_school_name ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-blue-600"
                                    }, " School: " + toDisplayString(payment.guest_school_name), 1)) : createCommentVNode("", true),
                                    payment.guest_grade ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "text-xs text-gray-500"
                                    }, " Grade: " + toDisplayString(payment.guest_grade), 1)) : createCommentVNode("", true),
                                    payment.guest_city ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "text-xs text-gray-500"
                                    }, " City: " + toDisplayString(payment.guest_city), 1)) : createCommentVNode("", true),
                                    !payment.user && payment.guest_phone ? (openBlock(), createBlock("div", {
                                      key: 3,
                                      class: "text-xs text-gray-400"
                                    }, toDisplayString(payment.guest_phone), 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_d = payment.program) == null ? void 0 : _d.title) || "Unknown Program"), 1),
                                createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(payment.program ? formatCurrency(payment.program.price) : "N/A"), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatCurrency(payment.amount)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusBadgeClass(payment.status)]
                                }, toDisplayString(payment.status), 3),
                                payment.manual_override ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-orange-600 mt-1"
                                }, "Manual")) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, [
                                createVNode("div", null, toDisplayString(formatDateTime(payment.created_at)), 1),
                                payment.paid_at ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-green-600"
                                }, " Paid: " + toDisplayString(formatDate(payment.paid_at)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                payment.id ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: _ctx.route("admin.payments.show", payment.id),
                                  class: "text-blue-600 hover:text-blue-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" View Details ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-gray-400"
                                }, "No ID"))
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.payments.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.payments.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.payments.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.payments.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.payments.from) + " to " + toDisplayString(__props.payments.to) + " of " + toDisplayString(__props.payments.total) + " results ", 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" }, [
                            __props.payments.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: __props.payments.prev_page_url,
                              class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Previous ")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true),
                            __props.payments.next_page_url ? (openBlock(), createBlock(unref(Link), {
                              key: 1,
                              href: __props.payments.next_page_url,
                              class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Next ")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Payments/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
