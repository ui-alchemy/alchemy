angular.module("alch-templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("demo/views/example.html",
    "<div>" +
    "  <h3>example-directive</h3>" +
    "</div>" +
    "");
}]);
