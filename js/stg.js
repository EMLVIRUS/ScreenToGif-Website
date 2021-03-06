/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

var $window = $(window);

function GetLatestReleaseInfo() {
    $.getJSON("https://api.github.com/repos/NickeManarin/ScreenToGif/releases/latest").done(function(release) {
        //$.getJSON("https://api.github.com/repos/NickeManarin/ScreenToGif-Website-Alpha/releases/latest").done(function(release) {
        InitDownloadButton(release, ".stg-download", 1);
        InitDownloadButton(release, ".stg-download-portable", 0);

        // if (release.assets[1] == undefined) {
        //     document.getElementById("DownloadPort").className = "btn stg-download-portable hidden";
        //     return;
        // }
    });
}

function InitDownloadButton(release, className, index) {
    var asset = release.assets[index];
    var downloadCount = release.assets[index].download_count;

    var oneHour = 60 * 60 * 1000;
    var oneDay = 24 * oneHour;
    var dateDiff = new Date() - new Date(asset.updated_at);

    var trans = GetTooltipTranslation();

    var timeAgo;
    if (dateDiff < oneDay) {
        timeAgo = (dateDiff / oneHour).toFixed(1) + (trans != undefined ? trans["HoursAgo"] : " hours ago");
    } else {
        timeAgo = (dateDiff / oneDay).toFixed(1) + (trans != undefined ? trans["DaysAgo"] : " days ago");
    }
    var releaseInfo = (trans != undefined ? trans["Version"] : "Version: ") + release.tag_name +
        "\n" + (trans != undefined ? trans["Released"] : "Released: ") + timeAgo +
        "\n" + (trans != undefined ? trans["DownloadCount"] : "Download count: ") + downloadCount.toLocaleString();
    $(className).attr("href", asset.browser_download_url);
    $(className).attr("title", "<a href='downloads/'><div>" + releaseInfo + "</div></a>");

    InitTooltip($(className));
}

function InitTooltip(obj, fadeDelay = 100) {
    obj.tooltip({ trigger: "manual", html: true, animation: false })
        .on("mouseenter", function() { obj.tooltip("show"); })
        .on("mouseleave", function() {
            setTimeout(function() {
                if ($(obj[0].className + ':hover').length === 0 && $(".tooltip:hover").length === 0) {
                    obj.tooltip("hide");
                }
            }, fadeDelay);
        });

    obj.parent().on("mouseleave", ".tooltip", function() {
        setTimeout(function() {
            if ($(obj[0].className + ':hover').length === 0 && $(".tooltip:hover").length === 0) {
                obj.tooltip("hide");
            }
        }, fadeDelay);
    });

    if (obj.is(":hover")) {
        obj.tooltip("show");
    }
}

$(document).ready(function() {
    GetLatestReleaseInfo();

    $(".stg-screenshots2").fancybox({
        padding: 5,
        margin: 0,
        autoSize: false,
        width: "90%",
        height: "90%",
        helpers: {
            overlay: {
                locked: false,
                css: {
                    "background": "rgba(0, 0, 0, 0.5)"
                }
            }
        },
        openEffect: "fade",
        closeEffect: "fade",
        iframe: {
            preload: false
        }
    });

    $(".stg-video").fancybox({
        padding: 5,
        margin: 0,
        autoSize: false,
        width: "1280px",
        height: "720px",
        helpers: {
            overlay: {
                locked: false,
                css: {
                    "background": "rgba(0, 0, 0, 0.5)"
                }
            }
        },
        openEffect: "fade",
        closeEffect: "fade",
        iframe: {
            preload: false
        }
    });
});