/* Shopify Money Format */
export const formatMoney = function (t, e = simply.money_format) {
  function o(t, e) {
    return void 0 === t ? e : t
  }
  function i(t, e, i, r) {
    if (e = o(e, 2),
      i = o(i, ","),
      r = o(r, "."),
      isNaN(t) || null == t)
      return 0;
    t = (t / 100).toFixed(e);
    var n = t.split(".");
    return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (n[1] ? r + n[1] : "")
  }
  "string" == typeof t && (t = t.replace(".", ""));
  var r = ""
    , n = /\{\{\s*(\w+)\s*\}\}/
    , a = e || this.money_format;
  switch (a.match(n)[1]) {
    case "amount":
      r = i(t, 2);
      break;
    case "amount_no_decimals":
      r = i(t, 0);
      break;
    case "amount_with_comma_separator":
      r = i(t, 2, ".", ",");
      break;
    case "amount_with_space_separator":
      r = i(t, 2, " ", ",");
      break;
    case "amount_with_period_and_space_separator":
      r = i(t, 2, " ", ".");
      break;
    case "amount_no_decimals_with_comma_separator":
      r = i(t, 0, ".", ",");
      break;
    case "amount_no_decimals_with_space_separator":
      r = i(t, 0, " ");
      break;
    case "amount_with_apostrophe_separator":
      r = i(t, 2, "'", ".")
  }
  return a.replace(n, r)
};

export const findSiblings = (element) => {
  let siblings = [],
    node = element.parentNode.firstChild;
  while (node) {
    if (node !== element && node.nodeType === Node.ELEMENT_NODE)
      siblings.push(node);
    node = node.nextElementSibling || node.nextSibling;
  }
  return siblings;
}

export const removeClassFromElements = (items, className) => {
  items.forEach((item) => {
    item.classList.remove(className);
  });
}

export const handleize = e => {
  return e.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "")
}
export const param = (data) => {
  let url = Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
  return url;
}

/* Add to Cart */
export const addToCart = async (data, cb = undefined) => {
  let res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  res = await res.json();
  if (cb) {
    cb();
  }
}
/* change cart quantity*/

export const cartChange = async (data, cb = undefined) => {
  let res = await fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  res = await res.json();
  if (cb) {
    cb();
  }
}
export const clearCart = async function(cb = undefined){
  let respo = await fetch("/cart/clear.js", {
    method: "GET"
  });
  respo = await respo.json();
  if (cb) {
    cb();
  }
}