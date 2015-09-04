angular.module("TodoApp", [ "ngStorage", "ngMaterial", "ngAnimate", "ui.sortable"]).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("green")
        .accentPalette("orange",{'default': '500', "hue-1":"600", "hue-2":"200", "hue-3":"A100"})
        .warnPalette("blue-grey")
        .backgroundPalette("grey",{'default': '50', "hue-1":"600", "hue-2":"200", "hue-3":"A100"});
        //.backgroundPalette("grey").dark();
});
