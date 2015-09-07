angular.module("TodoApp", [ "ngStorage", "ngMaterial", "ngAnimate", "ui.sortable"]).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("gb")
        .primaryPalette("red",{"default": "900", "hue-1":"600", "hue-2":"200", "hue-3":"A100"})
        .warnPalette("indigo",{"default": "800", "hue-1":"600", "hue-2":"200", "hue-3":"A100"})
        .accentPalette("grey");
    $mdThemingProvider.theme("ie")
        .primaryPalette("green",{"default": "900", "hue-1":"600", "hue-2":"200", "hue-3":"A100"})
        .warnPalette("orange",{"default": "800", "hue-1":"600", "hue-2":"200", "hue-3":"A100"})
        .accentPalette("grey");
    $mdThemingProvider.setDefaultTheme("irl");
    $mdThemingProvider.alwaysWatchTheme(true);

});
