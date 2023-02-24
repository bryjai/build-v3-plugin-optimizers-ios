
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;
window.lazySizesConfig.classListToExclude = [];

FABuild.internal.initLazyLoading = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        FABuild.internal.optimizerImgs();
    })
};

FABuild.internal.optimizerImgs = function() {
    var queryString = "img:not(.fa-optimized)";
    window.lazySizesConfig.classListToExclude.forEach(function(className) {
        queryString = queryString + ':not(.' + className + ')';
    });
    console.log("Classes to ignore string : "+ queryString);
    document.querySelectorAll(queryString).forEach(function (img) {
        img.setAttribute("data-src", img.src);
        img.removeAttribute("src");
        img.classList.add("fa-optimized");
        img.classList.add("lazyload");

        //img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    });
    
    // window.lazySizesConfig.loadMode = 0;
    lazySizes.init();
}
