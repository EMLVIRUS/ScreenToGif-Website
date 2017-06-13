/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

function Translate(d, index) {
    var l = GetFirstBrowserLanguage();

    if (l == "en") // || l != "pt")
        return;

    if (l.length > 2)
        l = l.substring(0, 2);

    if (l != "pt")
        return;

    var t = new Language(l);

    // if (eval('typeof ' + l) == 'undefined')
    //     return;

    d.title = t.Str("Title");

    t.Trnslt(d, "Home");
    t.Trnslt(d, "Downloads");
    t.Trnslt(d, "Screenshot");
    t.Trnslt(d, "Donate");
    t.Trnslt(d, "Changelog");
    t.Trnslt(d, "Chat");
    t.Trnslt(d, "Copyright", " © 2013-2017 Nicke Manarin");

    switch (index) {   
        case 0: //Main
            t.Trnslt(d, "Description");

            t.Trnslt(d, "Download");
            t.Trnslt(d, "Help");
            t.Trnslt(d, "Source");
            t.Trnslt(d, "Donate2");
            t.Trnslt(d, "More");

            t.Trnslt(d, "Features");
            t.Trnslt(d, "Portable");
            t.Trnslt(d, "Free");
            t.Trnslt(d, "Recorders");
            t.Trnslt(d, "Powerful");
            t.Trnslt(d, "Export");
            t.Trnslt(d, "Clean");
            t.Trnslt(d, "Languages");
            t.Trnslt(d, "Options");
            t.Trnslt(d, "Active");
            t.Trnslt(d, "Requirements");
            t.Trnslt(d, "Windows");
            t.Trnslt(d, "Framework");
            break;   
        case 1: //Downloads
            t.Trnslt(d, "Requirements");
            t.Trnslt(d, "Windows");
            t.Trnslt(d, "Framework");

            t.Trnslt(d, "Releases");
            t.Trnslt(d, "Release");
            t.Trnslt(d, "Size");
            t.Trnslt(d, "Count");
            t.Trnslt(d, "Date");
            t.Trnslt(d, "Days");
            break;
        case 2: //Donate
            t.Trnslt(d, "Support");
            t.Trnslt(d, "Info1");
            t.Trnslt(d, "Info2");
            t.Trnslt(d, "Info3");
            t.Trnslt(d, "Support");
            t.Trnslt(d, "Links");
            t.Trnslt(d, "Donators");
            t.Trnslt(d, "Donator");
            t.Trnslt(d, "Website");
            t.Trnslt(d, "Amount");
            t.Trnslt(d, "From");
            break;
    }
}

function GetTooltipTranslation() {
    var l = GetFirstBrowserLanguage();

    if (l == "en") // || l != "pt")
        return;

    if (l.length > 2)
        l = l.substring(0, 2);

    var t = new Language(l);

    return {
        "Version": t.Str("VersionTitle"),
        "Released": t.Str("Released"),
        "DaysAgo": t.Str("DaysAgo"),
        "HoursAgo": t.Str("HoursAgo"),
        "DownloadCount": t.Str("DownloadCount")
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
    var pt = {
        Home: "Início",
        Downloads: "Downloads",
        Screenshot: "Imagens",
        Changelog: "Detalhes da Versão",
        Chat: "Converse no Gitter",
        Description: "Gravador de tela, webcam e quadro virtual com um editor integrado.",
        Title: "ScreenToGif - Grave sua tela, edite e salve como Gif ou vídeo",
        Download: "Download",
        Help: "Manual do Usuário",
        Source: "Código Fonte",
        Donate: "Doações",
        Donate2: "Doações",
        More: "Mais Imagens",
        Features: "Recursos",
        Portable: "Um aplicativo portátil, com apenas um pequeno executável de ~600KB! (comprimido em um Zip).",
        Free: "Aplicação de graça e com código aberto. Além disso, sem propagandas!",
        Recorders: "3 maneiras de gravar seu conteúdo: Tela, Webcam e Quadro de desenho.",
        Powerful: "Um editor poderoso com muitas opções! Você pode editar sua gravação ou até gifs de outras fontes.",
        Export: "Você pode exportar como Gif, Vídeo ou salvar como um projeto para editar depois.",
        Clean: "Uma interface limpa e consistente, feita com C# e WPF.",
        Languages: "Mais de 18 diferentes idiomas, inclusive Português (Brasil e Portugal). Detecta automaticamente o idioma do seu sistema.",
        Options: "Várias opções disponíveis. Você pode até mudar a cor do sistema. :)",
        Active: "Desenvolvimento ativo, integrado com as necessidades dos usuários. Comentários são muito bem vindos!",
        Requirements: "Requerimentos",
        Windows: "Windows Vista ou mais recente",
        Framework: ".Net Framework 4.6.1 ou mais recente",
        Copyright: "Direitos reservados",
        Releases: "Últimas versões",
        Release: "Nome da versão",
        Size: "Tamanho do arquivo",
        Count: "Quantidade de downloads",
        Date: "Data de lançamento",
        Days: "Dias ativos",
        Support: "Nos ajude",
        Links: "Atalhos",
        Info1: "É um aplicativo de graça e com código aberto. Sem propagandas, nada obscuro ou escondido. Se você tem alguma dúvida, sinta-se livre em me questionar ou olhar o código fonte.",
        Info2: "Doações são a única forma de lucro do ScreenToGif. Se você deseja ajudar o projeto então considere fazer uma doação.",
        Info3: "É possível doar de 3 maneiras diferentes, via Patreon, Paypal, ou Steam (é possível doar jogos ou créditos).",
        Donators: "Doadores",
        Donator: "Nome",
        Website: "Site",
        Amount: "Quantia",
        From: "De",
        Version: "Versão: ",
        Released: "Lançamento: ",
        DaysAgo: " dias atrás",
        HoursAgo: " horas atrás",
        DownloadCount: "Quantidade de downloads: ",
    };

    var __construct = function() {
        if (eval('typeof ' + lang) == 'undefined') {
            lang = "en";
        }
        return;
    }()

    this.Str = function(str, d, defaultStr) {
        var retStr = eval('eval(lang).' + str);

        if (typeof retStr != 'undefined') {
            return retStr;
        } else {
            if (typeof defaultStr != 'undefined') {
                return defaultStr;
            } else {
                return d.getElementById(str).innerHTML; // eval('en.' + str);
            }
        }
    }

    this.Trnslt = function(d, str, extr) {
        d.getElementById(str).innerHTML = this.Str(str, d) + (extr == undefined ? "" : extr);
    }
}