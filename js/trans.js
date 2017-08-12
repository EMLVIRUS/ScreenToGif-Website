/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

function Translate(d, index) {
    var l = GetFirstBrowserLanguage();

    if (l.startsWith("en") || (l != "pt_br" && l != "zh_cn"))
        return;

    setState(d.baseURI.withParam('l', l));

    var t = new Language(l);

    // if (eval('typeof ' + l) == 'undefined')
    //     return;

    d.title = t.Str("Title");

    t.Trnslt(d, "Home");
    t.Trnslt(d, "Downloads");
    t.Trnslt(d, "Screenshot");
    t.Trnslt(d, "Donate");
    t.Trnslt(d, "Changelog");
    t.Trnslt(d, "Source");
    t.Trnslt(d, "Chat");
    t.Trnslt(d, "Copyright", " © 2013-2017 Nicke Manarin");

    switch (index) {   
        case 0: //Main
            t.Trnslt(d, "Description");

            t.Trnslt(d, "Download");
            t.Trnslt(d, "DownloadPort");
            t.Trnslt(d, "Help");
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
            d.getElementById("Downloads2").innerHTML = d.getElementById("Downloads").innerHTML;
            t.Trnslt(d, "Requirements");
            t.Trnslt(d, "Windows");
            t.Trnslt(d, "Framework");

            t.Trnslt(d, "Releases");
            t.Trnslt(d, "Release");
            t.Trnslt(d, "Installer");
            t.Trnslt(d, "Portable2");
            t.Trnslt(d, "Download");
            //t.Trnslt(d, "Size");
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

    if (l != "pt_br" && l != "zh_cn")
        return;

    var t = new Language(l);

    return {
        "Version": t.Str("Version"),
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

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    var lang = getParam("l");

    if (lang != null)
        return lang.replace("-", "_").toLowerCase();

    //Support for HTML 5.1 "navigator.languages".
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length)
                return language.replace("-", "_").toLowerCase();
        }
    }

    //Support for other well known properties in browsers.
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length)
            return language.replace("-", "_").toLowerCase();
    }

    return null;
};

String.prototype.withParam = function(name, value) {
    var url = this,
        parameterName = name,
        parameterValue = value || '',
        atStart,
        cl,
        urlParts,
        urlhash,
        sourceUrl,
        newQueryString,
        parameters,
        parameterParts,
        i,
        replaceDuplicates = true;

    if (url.indexOf('#') > 0) {
        cl = url.indexOf('#');
        urlhash = url.substring(url.indexOf('#'), url.length);
    } else {
        urlhash = '';
        cl = url.length;
    }

    sourceUrl = url.substring(0, cl);

    urlParts = sourceUrl.split('?');
    newQueryString = '';

    if (urlParts.length > 1) {
        parameters = urlParts[1].split('&');

        for (i = 0;
            (i < parameters.length); i++) {
            parameterParts = parameters[i].split('=');

            if (!(replaceDuplicates && parameterParts[0] === parameterName)) {
                if (newQueryString === '')
                    newQueryString = '?';
                else
                    newQueryString += '&';

                newQueryString += parameterParts[0] + '=' + (parameterParts[1] ? parameterParts[1] : '');
            }
        }
    }

    if (newQueryString === '')
        newQueryString = '?';

    if (newQueryString !== '' && newQueryString != '?')
        newQueryString += '&';

    newQueryString += parameterName + '=' + (parameterValue ? parameterValue : '');

    return urlParts[0] + newQueryString + urlhash;
};

function setState(url) {
    try {
        history.replaceState(null, "ScreenToGif", url);
        return false;
    } catch (e) {}
    location.hash = '#' + document.search;
}

function getParam(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function Language(lang) {
    var pt_br = {
        Home: "Início",
        Downloads: "Downloads",
        Screenshot: "Imagens",
        Changelog: "Detalhes da Versão",
        Chat: "Converse no Gitter",
        Description: "Gravador de tela, webcam e quadro virtual com um editor integrado.",
        Title: "ScreenToGif - Grave sua tela, edite e salve como Gif ou vídeo",
        Download: "Download",
        DownloadPort: "Download (Portátil)",
        Help: "Manual do Usuário",
        Source: "Código Fonte",
        Donate: "Doações",
        Donate2: "Doações",
        More: "Mais Imagens",
        Features: "Recursos",
        Portable: "Um aplicativo portátil, com apenas um pequeno executável de ~610KB! (comprimido em um Zip).",
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
        Installer: "Instalador",
        Portable2: "Portátil",
        //Size: "Tamanho do arquivo",
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

    var zh_cn = {
        Home: "首页",
        Downloads: "下载",
        Screenshot: "截图",
        Changelog: "更新日志",
        Chat: "在 Gitter 聊天",
        Description: "屏幕，摄像头和白板录像机与集成编辑器。",
        Title: "ScreenToGif - 录制您的屏幕，编辑并保存为 GIF 或视频",
        Download: "下载",
        DownloadPort: "下载 (便携版)",
        Help: "用户指南",
        Source: "开源",
        Donate: "捐赠",
        Donate2: "捐赠",
        More: "更多截图",
        Features: "特点",
        Portable: "一个便携式，单个可执行和非常小的应用程序，仅 611KB! (已压缩)。",
        Free: "免费和开源的应用程序，没有任何广告!",
        Recorders: "3 种方式录制您的内容：屏幕，摄像头和白板。",
        Powerful: "一个强大的编辑器！您可以编辑录制，甚至编辑其它来源的 GIF。",
        Export: "您可以导出为 GIF，视频或另存为项目以后进行编辑。",
        Clean: "一个干净，一致的界面，由 WPF 提供支持。",
        Languages: "超过 18 种不同的语言。自动检测系统的语言，默认为英文。",
        Options: "很多选项。甚至可以更改录像机的颜色。:)",
        Active: "积极接收用户需求整合。非常欢迎您的反馈!",
        Requirements: "要求",
        Windows: "Windows Vista 或更高版本",
        Framework: ".Net Framework 4.6.1 或更高版本",
        Copyright: "版权所有",
        Releases: "最新发布",
        Release: "发布名称",
        Installer: "安装程序",
        Portable2: "便携版",
        Count: "下载次数",
        Date: "发布日期",
        Days: "活跃天数",
        Support: "支持我们",
        Links: "链接",
        Info1: "这是一个免费的开源应用程序。没有广告，没有任何恶意代码。如果您有任何疑问，请随时询问或浏览源代码。",
        Info2: "捐赠是 ScreenToGif 的唯一收入来源。如果你想支持这个项目，那么请考虑捐赠支持软件开发。",
        Info3: "可以通过 Patreon，Paypal 或 Steam（可以捐赠游戏或信用）3 种方式来捐赠。",
        Donators: "Patrons/捐赠者",
        Donator: "姓名",
        Website: "网站",
        Amount: "捐赠总额",
        From: "从",
        Version: "版本: ",
        Released: "已发布: ",
        DaysAgo: " 天前",
        HoursAgo: " 小时前",
        DownloadCount: "下载次数: ",
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