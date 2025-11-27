import { ref, withCtx, unref, createTextVNode, createVNode, withDirectives, vModelText, vModelSelect, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-CpbHJZNQ.js";
import "./BaseLayout-BsMrMdpN.js";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    discountCodes: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status || "");
    const typeFilter = ref(props.filters.type || "");
    const searchDiscountCodes = () => {
      const params = new URLSearchParams();
      if (search.value) params.append("search", search.value);
      if (statusFilter.value) params.append("status", statusFilter.value);
      if (typeFilter.value) params.append("type", typeFilter.value);
      const url = "/admin/discount-codes" + (params.toString() ? "?" + params.toString() : "");
      window.location.href = url;
    };
    const deleteDiscountCode = (code) => {
      if (confirm(`Are you sure you want to permanently delete discount code "${code.code}"? This action cannot be undone.`)) {
        router.delete("/admin/discount-codes/" + code.id);
      }
    };
    const toggleDiscountCode = (code) => {
      if (code.status === "active") {
        if (confirm(`Are you sure you want to deactivate discount code "${code.code}"? This will stop it from being usable.`)) {
          router.post("/admin/discount-codes/" + code.id + "/deactivate");
        }
      } else {
        if (confirm(`Are you sure you want to activate discount code "${code.code}"? This will make it usable again.`)) {
          router.post("/admin/discount-codes/" + code.id + "/activate");
        }
      }
    };
    const getStatusClass = (status) => {
      const classes = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        expired: "bg-red-100 text-red-800",
        scheduled: "bg-yellow-100 text-yellow-800",
        exhausted: "bg-orange-100 text-orange-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusLabel = (status) => {
      const labels = {
        active: "Active",
        inactive: "Inactive",
        expired: "Expired",
        scheduled: "Scheduled",
        exhausted: "Exhausted"
      };
      return labels[status] || "Unknown";
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Discount Codes </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/discount-codes/create",
              class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Discount Code `);
                } else {
                  return [
                    createTextVNode(" Create Discount Code ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Discount Codes "),
                createVNode(unref(Link), {
                  href: "/admin/discount-codes/create",
                  class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Create Discount Code ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6"${_scopeId}><div class="p-6"${_scopeId}><div class="flex flex-col sm:flex-row gap-4"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Search by code, name, or description..." class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="flex gap-2"${_scopeId}><select class="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}${_scopeId}>All Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "active") : ssrLooseEqual(statusFilter.value, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="inactive"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "inactive") : ssrLooseEqual(statusFilter.value, "inactive")) ? " selected" : ""}${_scopeId}>Inactive</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "expired") : ssrLooseEqual(statusFilter.value, "expired")) ? " selected" : ""}${_scopeId}>Expired</option><option value="scheduled"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "scheduled") : ssrLooseEqual(statusFilter.value, "scheduled")) ? " selected" : ""}${_scopeId}>Scheduled</option></select><select class="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(typeFilter.value) ? ssrLooseContain(typeFilter.value, "") : ssrLooseEqual(typeFilter.value, "")) ? " selected" : ""}${_scopeId}>All Types</option><option value="percentage"${ssrIncludeBooleanAttr(Array.isArray(typeFilter.value) ? ssrLooseContain(typeFilter.value, "percentage") : ssrLooseEqual(typeFilter.value, "percentage")) ? " selected" : ""}${_scopeId}>Percentage</option><option value="fixed_amount"${ssrIncludeBooleanAttr(Array.isArray(typeFilter.value) ? ssrLooseContain(typeFilter.value, "fixed_amount") : ssrLooseEqual(typeFilter.value, "fixed_amount")) ? " selected" : ""}${_scopeId}>Fixed Amount</option></select></div></div></div></div><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Code </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Type </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Value </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Usage </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Created </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.discountCodes.data, (code) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-mono font-medium text-gray-900"${_scopeId}>${ssrInterpolate(code.code)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(code.name)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([code.type === "percentage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800", "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(code.type === "percentage" ? "Percentage" : "Fixed Amount")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(code.formatted_value)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(code.used_count)}${ssrInterpolate(code.max_redemptions ? "/" + code.max_redemptions : "")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([getStatusClass(code.status), "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(code.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(code.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/admin/discount-codes/" + code.id,
                class: "text-blue-600 hover:text-blue-900"
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
                href: "/admin/discount-codes/" + code.id + "/edit",
                class: "text-indigo-600 hover:text-indigo-900"
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
              _push2(`<button class="${ssrRenderClass(code.status === "active" ? "text-orange-600 hover:text-orange-900" : "text-green-600 hover:text-green-900")}"${_scopeId}>${ssrInterpolate(code.status === "active" ? "Deactivate" : "Activate")}</button><button class="text-red-600 hover:text-red-900"${_scopeId}> Delete </button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.discountCodes.links) {
              _push2(`<div class="px-6 py-3 border-t border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.discountCodes.from)} to ${ssrInterpolate(__props.discountCodes.to)} of ${ssrInterpolate(__props.discountCodes.total)} results </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.discountCodes.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url,
                  class: [
                    "px-3 py-2 text-sm border",
                    link.active ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  ],
                  disabled: !link.url
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                        createVNode("div", { class: "flex-1" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => search.value = $event,
                            type: "text",
                            placeholder: "Search by code, name, or description...",
                            class: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            onInput: searchDiscountCodes
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, search.value]
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                            class: "border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            onChange: searchDiscountCodes
                          }, [
                            createVNode("option", { value: "" }, "All Status"),
                            createVNode("option", { value: "active" }, "Active"),
                            createVNode("option", { value: "inactive" }, "Inactive"),
                            createVNode("option", { value: "expired" }, "Expired"),
                            createVNode("option", { value: "scheduled" }, "Scheduled")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, statusFilter.value]
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => typeFilter.value = $event,
                            class: "border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                            onChange: searchDiscountCodes
                          }, [
                            createVNode("option", { value: "" }, "All Types"),
                            createVNode("option", { value: "percentage" }, "Percentage"),
                            createVNode("option", { value: "fixed_amount" }, "Fixed Amount")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, typeFilter.value]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Code "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Name "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Type "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Value "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Usage "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Created "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.discountCodes.data, (code) => {
                            return openBlock(), createBlock("tr", {
                              key: code.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-mono font-medium text-gray-900" }, toDisplayString(code.code), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(code.name), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", code.type === "percentage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"]
                                }, toDisplayString(code.type === "percentage" ? "Percentage" : "Fixed Amount"), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(code.formatted_value), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(code.used_count) + toDisplayString(code.max_redemptions ? "/" + code.max_redemptions : ""), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusClass(code.status)]
                                }, toDisplayString(getStatusLabel(code.status)), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(code.created_at)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode("div", { class: "flex justify-end space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: "/admin/discount-codes/" + code.id,
                                    class: "text-blue-600 hover:text-blue-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" View ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode(unref(Link), {
                                    href: "/admin/discount-codes/" + code.id + "/edit",
                                    class: "text-indigo-600 hover:text-indigo-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Edit ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => toggleDiscountCode(code),
                                    class: code.status === "active" ? "text-orange-600 hover:text-orange-900" : "text-green-600 hover:text-green-900"
                                  }, toDisplayString(code.status === "active" ? "Deactivate" : "Activate"), 11, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteDiscountCode(code),
                                    class: "text-red-600 hover:text-red-900"
                                  }, " Delete ", 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    __props.discountCodes.links ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "px-6 py-3 border-t border-gray-200"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.discountCodes.from) + " to " + toDisplayString(__props.discountCodes.to) + " of " + toDisplayString(__props.discountCodes.total) + " results ", 1),
                        createVNode("div", { class: "flex space-x-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.discountCodes.links, (link) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: link.label,
                              href: link.url,
                              innerHTML: link.label,
                              class: [
                                "px-3 py-2 text-sm border",
                                link.active ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                              ],
                              disabled: !link.url
                            }, null, 8, ["href", "innerHTML", "class", "disabled"]);
                          }), 128))
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/DiscountCodes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
