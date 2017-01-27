/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

function Translate(document, index) {
    var l = GetFirstBrowserLanguage();

    if (l == "en")
        return;

    var t = new Language(l);

    switch (index) {   
        case 0: //Main
            document.title = t.Str("Title");
            document.getElementById("Description").innerHTML = t.Str("Description");
            document.getElementById("Download").innerHTML = t.Str("Download");
            document.getElementById("Help").innerHTML = t.Str("Help");
            document.getElementById("Source").innerHTML = t.Str("Source");
            document.getElementById("Donate").innerHTML = t.Str("Donate");

            //document.getElementById("txFooter").innerHTML = t.Str("Footer");
            break;   
        case 1: //Downloads

            break;
        case 2: //Donate

            break;
    }
}

var GetFirstBrowserLanguage = function() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i, language;

    //Support for HTML 5.1 "navigator.languages".
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    //Support for other well known properties in browsers.
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};

function Language(lang) {
    if (lang.length > 2)
        lang = lang.substring(0, 2);

    var pt = {
        Description: "Gravador de tela, webcam e quadro virtual com um editor integrado.",
        Title: "ScreenToGif - Grave sua tela, edite e salve como Gif ou vídeo",
        Download: "Download",
        Help: "Manual do Usuário",
        Source: "Código Fonte",
        Donate: "Doações",
    };

    var __construct = function() {
        if (eval('typeof ' + lang) == 'undefined') {
            lang = "en";
        }
        return;
    }()

    this.Str = function(str, defaultStr) {
        var retStr = eval('eval(lang).' + str);
        if (typeof retStr != 'undefined') {
            return retStr;
        } else {
            if (typeof defaultStr != 'undefined') {
                return defaultStr;
            } else {
                return eval('en.' + str);
            }
        }
    }
}