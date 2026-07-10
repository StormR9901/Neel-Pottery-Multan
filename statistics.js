(function () {
  "use strict";

  var BRAND_NAME = "عمران جھنڈیر";
  var SALES_KEY = "neel-pottery-sales";
  var MONTHS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var SEED_SALES = [
    { id: "ORD-1001", date: "2026-06-21", customer: "Bilal Ahmed", city: "Multan", items: [{ name: "Multani Motif Vases with Yellow Highlights (Set of 2)", qty: 1, price: 1200 }, { name: "Checkered Miniature Vases (Set of 2)", qty: 1, price: 1150 }], total: 2350, status: "Delivered" },
    { id: "ORD-1002", date: "2026-06-21", customer: "Hina Farooq", city: "Peshawar", items: [{ name: "Hand-Painted Peacock Ceramic Plate", qty: 1, price: 1350 }], total: 1350, status: "Delivered" },
    { id: "ORD-1003", date: "2026-06-21", customer: "Kamran Ali", city: "Faisalabad", items: [{ name: "Ceramic Rearing Horse Statue (عمران جھنڈیر سپیشل)", qty: 1, price: 1250 }], total: 1250, status: "Delivered" },
    { id: "ORD-1004", date: "2026-06-21", customer: "Maryam Iqbal", city: "Rawalpindi", items: [{ name: "Vibrant Multi-Color Floral Vases (Set of 2)", qty: 1, price: 1500 }], total: 1500, status: "Delivered" },
    { id: "ORD-1005", date: "2026-06-22", customer: "Tariq Mehmood", city: "Sialkot", items: [{ name: "Ceramic Rearing Horse Statue (عمران جھنڈیر سپیشل)", qty: 2, price: 1250 }], total: 2500, status: "Delivered" },
    { id: "ORD-1006", date: "2026-06-24", customer: "Ayesha Khan", city: "Lahore", items: [{ name: "Hand-Painted Peacock Ceramic Plate", qty: 1, price: 1350 }], total: 1350, status: "Delivered" },
    { id: "ORD-1007", date: "2026-06-27", customer: "Waqas Nadeem", city: "Islamabad", items: [{ name: "Traditional Blue and White Floral Jar", qty: 2, price: 1450 }, { name: "Elegant Multani Floral Ceramic Vase", qty: 2, price: 1100 }], total: 5100, status: "Delivered" },
    { id: "ORD-1008", date: "2026-06-27", customer: "Fatima Siddiqui", city: "Quetta", items: [{ name: "Traditional Blue and White Floral Jar", qty: 1, price: 1450 }], total: 1450, status: "Delivered" },
    { id: "ORD-1009", date: "2026-06-28", customer: "Omar Farooq", city: "Hyderabad", items: [{ name: "Checkered Miniature Vases (Set of 2)", qty: 1, price: 1150 }], total: 1150, status: "Delivered" },
    { id: "ORD-1010", date: "2026-06-28", customer: "Rabia Noor", city: "Gujranwala", items: [{ name: "Traditional Blue and White Floral Jar", qty: 1, price: 1450 }, { name: "Classic Blue & Orange Floral Vases (Set of 2)", qty: 1, price: 1300 }], total: 2750, status: "Delivered" },
    { id: "ORD-1011", date: "2026-06-28", customer: "Hassan Raza", city: "Karachi", items: [{ name: "Ceramic Rearing Horse Statue (عمران جھنڈیر سپیشل)", qty: 1, price: 1250 }], total: 1250, status: "Delivered" },
    { id: "ORD-1012", date: "2026-06-30", customer: "Zainab Qureshi", city: "Bahawalpur", items: [{ name: "Multani Motif Vases with Yellow Highlights (Set of 2)", qty: 2, price: 1200 }, { name: "Classic Blue & Orange Floral Vases (Set of 2)", qty: 1, price: 1300 }], total: 3700, status: "Delivered" },
    { id: "ORD-1013", date: "2026-07-01", customer: "Asad Javed", city: "Abbottabad", items: [{ name: "Vibrant Multi-Color Floral Vases (Set of 2)", qty: 1, price: 1500 }], total: 1500, status: "Delivered" },
    { id: "ORD-1014", date: "2026-07-01", customer: "Sana Malik", city: "Multan", items: [{ name: "Checkered Miniature Vases (Set of 2)", qty: 1, price: 1150 }], total: 1150, status: "Delivered" },
    { id: "ORD-1015", date: "2026-07-01", customer: "Javed Anwar", city: "Lahore", items: [{ name: "Multani Motif Vases with Yellow Highlights (Set of 2)", qty: 1, price: 1200 }, { name: "Classic Blue & Orange Floral Vases (Set of 2)", qty: 1, price: 1300 }, { name: "Elegant Multani Floral Ceramic Vase", qty: 1, price: 1100 }], total: 3600, status: "Delivered" },
    { id: "ORD-1016", date: "2026-07-03", customer: "Kiran Bibi", city: "Rawalpindi", items: [{ name: "Hand-Painted Peacock Ceramic Plate", qty: 1, price: 1350 }], total: 1350, status: "Delivered" },
    { id: "ORD-1017", date: "2026-07-04", customer: "Usman Tariq", city: "Peshawar", items: [{ name: "Vibrant Multi-Color Floral Vases (Set of 2)", qty: 1, price: 1500 }], total: 1500, status: "Delivered" },
    { id: "ORD-1018", date: "2026-07-04", customer: "Amna Sheikh", city: "Multan", items: [{ name: "Classic Blue & Orange Floral Vases (Set of 2)", qty: 1, price: 1300 }], total: 1300, status: "Delivered" },
    { id: "ORD-1019", date: "2026-07-05", customer: "Faisal Butt", city: "Karachi", items: [{ name: "Elegant Multani Floral Ceramic Vase", qty: 1, price: 1100 }], total: 1100, status: "Delivered" },
    { id: "ORD-1020", date: "2026-07-06", customer: "Mehwish Tariq", city: "Sargodha", items: [{ name: "Elegant Multani Floral Ceramic Vase", qty: 1, price: 1100 }], total: 1100, status: "Delivered" },
    { id: "ORD-1021", date: "2026-07-07", customer: "Shahid Mahmood", city: "Lahore", items: [{ name: "Traditional Blue and White Floral Jar", qty: 1, price: 1450 }, { name: "Vibrant Multi-Color Floral Vases (Set of 2)", qty: 1, price: 1500 }], total: 2950, status: "Delivered" },
    { id: "ORD-1022", date: "2026-07-07", customer: "Noreen Abbas", city: "Sialkot", items: [{ name: "Ceramic Rearing Horse Statue (عمران جھنڈیر سپیشل)", qty: 1, price: 1250 }], total: 1250, status: "Delivered" },
    { id: "ORD-1023", date: "2026-07-08", customer: "Kamran Ali", city: "Faisalabad", items: [{ name: "Hand-Painted Peacock Ceramic Plate", qty: 1, price: 1350 }], total: 1350, status: "Shipped" },
    { id: "ORD-1024", date: "2026-07-08", customer: "Bilal Ahmed", city: "Multan", items: [{ name: "Multani Motif Vases with Yellow Highlights (Set of 2)", qty: 1, price: 1200 }], total: 1200, status: "Shipped" },
    { id: "ORD-1025", date: "2026-07-10", customer: "Ayesha Khan", city: "Lahore", items: [{ name: "Checkered Miniature Vases (Set of 2)", qty: 2, price: 1150 }], total: 2300, status: "Processing" },
    { id: "ORD-1026", date: "2026-07-10", customer: "Hassan Raza", city: "Karachi", items: [{ name: "Ceramic Rearing Horse Statue (عمران جھنڈیر سپیشل)", qty: 1, price: 1250 }, { name: "Hand-Painted Peacock Ceramic Plate", qty: 1, price: 1350 }], total: 2600, status: "Processing" },
    { id: "ORD-1027", date: "2026-07-10", customer: "Fatima Siddiqui", city: "Islamabad", items: [{ name: "Traditional Blue and White Floral Jar", qty: 1, price: 1450 }], total: 1450, status: "Processing" }
  ];

  function $(sel) { return document.querySelector(sel); }

  function formatPrice(n) {
    return "Rs. " + n.toLocaleString("en-PK");
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getStoredSales() {
    try {
      var stored = localStorage.getItem(SALES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function getAllSales() {
    var live = getStoredSales();
    return live.length ? live.concat(SEED_SALES) : SEED_SALES.slice();
  }

  function countItems(sales) {
    var count = 0;
    for (var i = 0; i < sales.length; i++) {
      for (var j = 0; j < sales[i].items.length; j++) {
        count += sales[i].items[j].qty;
      }
    }
    return count;
  }

  function sumRevenue(sales) {
    var total = 0;
    for (var i = 0; i < sales.length; i++) total += sales[i].total;
    return total;
  }

  function productStats(sales) {
    var map = {};
    for (var i = 0; i < sales.length; i++) {
      for (var j = 0; j < sales[i].items.length; j++) {
        var item = sales[i].items[j];
        if (!map[item.name]) map[item.name] = { qty: 0, revenue: 0 };
        map[item.name].qty += item.qty;
        map[item.name].revenue += item.price * item.qty;
      }
    }
    var list = [];
    for (var name in map) {
      if (Object.prototype.hasOwnProperty.call(map, name)) {
        list.push({ name: name, qty: map[name].qty, revenue: map[name].revenue });
      }
    }
    list.sort(function (a, b) { return b.qty - a.qty; });
    return list;
  }

  function cityStats(sales) {
    var map = {};
    for (var i = 0; i < sales.length; i++) {
      var city = sales[i].city;
      if (!map[city]) map[city] = { orders: 0, revenue: 0 };
      map[city].orders++;
      map[city].revenue += sales[i].total;
    }
    var list = [];
    for (var c in map) {
      if (Object.prototype.hasOwnProperty.call(map, c)) {
        list.push({ city: c, orders: map[c].orders, revenue: map[c].revenue });
      }
    }
    list.sort(function (a, b) { return b.orders - a.orders; });
    return list;
  }

  function monthlyStats(sales) {
    var map = {};
    for (var i = 0; i < sales.length; i++) {
      var parts = sales[i].date.split("-");
      var key = parts[0] + "-" + parts[1];
      if (!map[key]) map[key] = 0;
      map[key] += sales[i].total;
    }
    var keys = Object.keys(map).sort();
    var list = [];
    for (var k = 0; k < keys.length; k++) {
      var monthParts = keys[k].split("-");
      list.push({
        key: keys[k],
        label: MONTHS[parseInt(monthParts[1], 10) - 1] + " " + monthParts[0],
        revenue: map[keys[k]]
      });
    }
    return list;
  }

  function formatDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
  }

  function statusClass(status) {
    if (status === "Delivered") return "stats-badge--delivered";
    if (status === "Shipped") return "stats-badge--shipped";
    return "stats-badge--processing";
  }

  function renderKpis(sales) {
    var revenue = sumRevenue(sales);
    var orders = sales.length;
    var items = countItems(sales);
    var avg = orders ? Math.round(revenue / orders) : 0;

    $("#kpi-revenue").textContent = formatPrice(revenue);
    $("#kpi-orders").textContent = orders.toLocaleString("en-PK");
    $("#kpi-items").textContent = items.toLocaleString("en-PK");
    $("#kpi-avg").textContent = formatPrice(avg);
    $("#stats-updated").textContent = "Last updated: " + new Date().toLocaleString("en-PK", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }

  function renderMonthlyChart(months) {
    var el = $("#stats-monthly-chart");
    if (!el || !months.length) return;

    var max = 0;
    for (var i = 0; i < months.length; i++) {
      if (months[i].revenue > max) max = months[i].revenue;
    }

    var html = "";
    for (var j = 0; j < months.length; j++) {
      var pct = max ? Math.round((months[j].revenue / max) * 100) : 0;
      html += '<div class="stats-bar-col">' +
        '<div class="stats-bar-wrap"><div class="stats-bar" style="height:' + pct + '%" title="' + formatPrice(months[j].revenue) + '"></div></div>' +
        '<span class="stats-bar-label">' + escapeHtml(months[j].label) + '</span>' +
        '<span class="stats-bar-value">' + formatPrice(months[j].revenue) + '</span>' +
        '</div>';
    }
    el.innerHTML = html;
  }

  function renderTopProducts(products) {
    var el = $("#stats-top-products");
    if (!el) return;

    var top = products.slice(0, 5);
    var max = top.length ? top[0].qty : 1;
    var html = "";

    for (var i = 0; i < top.length; i++) {
      var pct = Math.round((top[i].qty / max) * 100);
      html += '<div class="stats-product-row">' +
        '<div class="stats-product-meta">' +
        '<strong>' + escapeHtml(top[i].name) + '</strong>' +
        '<span>' + top[i].qty + ' sold · ' + formatPrice(top[i].revenue) + '</span>' +
        '</div>' +
        '<div class="stats-progress"><div class="stats-progress-fill" style="width:' + pct + '%"></div></div>' +
        '</div>';
    }
    el.innerHTML = html;
  }

  function renderCityBreakdown(cities) {
    var el = $("#stats-cities");
    if (!el) return;

    var top = cities.slice(0, 6);
    var html = "";
    for (var i = 0; i < top.length; i++) {
      html += '<div class="stats-city-row">' +
        '<span class="stats-city-name">' + escapeHtml(top[i].city) + '</span>' +
        '<span class="stats-city-orders">' + top[i].orders + ' orders</span>' +
        '<span class="stats-city-revenue">' + formatPrice(top[i].revenue) + '</span>' +
        '</div>';
    }
    el.innerHTML = html;
  }

  function itemsSummary(items) {
    var parts = [];
    for (var i = 0; i < items.length; i++) {
      parts.push(items[i].name + (items[i].qty > 1 ? " ×" + items[i].qty : ""));
    }
    return parts.join(", ");
  }

  function renderSalesTable(sales) {
    var tbody = $("#stats-sales-body");
    if (!tbody) return;

    var sorted = sales.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
    });

    var html = "";
    for (var i = 0; i < sorted.length; i++) {
      var sale = sorted[i];
      html += "<tr>" +
        "<td><code>" + escapeHtml(sale.id) + "</code></td>" +
        "<td>" + formatDate(sale.date) + "</td>" +
        "<td>" + escapeHtml(sale.customer) + "</td>" +
        "<td>" + escapeHtml(sale.city) + "</td>" +
        '<td class="stats-table-items">' + escapeHtml(itemsSummary(sale.items)) + "</td>" +
        "<td><strong>" + formatPrice(sale.total) + "</strong></td>" +
        '<td><span class="stats-badge ' + statusClass(sale.status) + '">' + escapeHtml(sale.status) + "</span></td>" +
        "</tr>";
    }
    tbody.innerHTML = html;
    $("#stats-order-count").textContent = sorted.length + " total orders";
  }

  function initFilters(sales) {
    var search = $("#stats-search");
    var statusFilter = $("#stats-status-filter");
    if (!search || !statusFilter) return;

    function applyFilters() {
      var query = search.value.trim().toLowerCase();
      var status = statusFilter.value;
      var filtered = sales.filter(function (sale) {
        var matchStatus = status === "all" || sale.status === status;
        var haystack = (sale.id + " " + sale.customer + " " + sale.city + " " + itemsSummary(sale.items)).toLowerCase();
        var matchQuery = !query || haystack.indexOf(query) !== -1;
        return matchStatus && matchQuery;
      });
      renderSalesTable(filtered);
    }

    search.addEventListener("input", applyFilters);
    statusFilter.addEventListener("change", applyFilters);
  }

  function init() {
    var sales = getAllSales();
    renderKpis(sales);
    renderMonthlyChart(monthlyStats(sales));
    renderTopProducts(productStats(sales));
    renderCityBreakdown(cityStats(sales));
    renderSalesTable(sales);
    initFilters(sales);

    var header = $(".stats-header");
    if (header) {
      window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 20);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
