(function (d3) {
    "use strict";

    var widthEcran = document.documentElement.clientWidth * 0.95;
    var heightEcran = document.documentElement.clientHeight * 0.95;

    var nbClick = 0;
    var canvas = baseCanvas(widthEcran, heightEcran);
    baseText(canvas, widthEcran, heightEcran);
    baseBouton(canvas,widthEcran,heightEcran, nbClick);

    var waffleTaille = 19;

    d3.csv("./data/DataFile.csv").then(function (data) {
        dataParse(data);
        var names = dataNames(data);
        var AllStats = dataOrg(data, names);

        graphLine(canvas, AllStats, widthEcran, heightEcran);

        canvas.selectAll(".Button_0")
            .on("click", function () {
                nbClick++;
                cleanGraph1(widthEcran);
                canvas = baseCanvas(widthEcran, heightEcran);

                wafflePre(canvas, widthEcran, heightEcran, waffleTaille);
                Text1(canvas, widthEcran, heightEcran);
                baseBouton(canvas, widthEcran, heightEcran, nbClick);

                canvas.selectAll(".Button_1")
                    .on("click", function () {
                        nbClick++;
                        moveWafflePre(canvas,widthEcran,heightEcran);
                        Text2(canvas, widthEcran, heightEcran);
                        waffleMaker(canvas,widthEcran, heightEcran, AllStats, waffleTaille);

                        AllStats.provinces.forEach(function (d) {
                            var province = cleanProvince(d);
                            canvas.selectAll(".Button_" + province)
                                .on("click", function () {
                                    removeWaffles(canvas, AllStats, d.province, heightEcran);

                                    if (d.villes.length > 0) {
                                        waffleMaker2(canvas, widthEcran, heightEcran, d, waffleTaille);

                                        d.villes.forEach(function (dd) {
                                            var ville = cleanVille(dd);
                                            canvas.selectAll(".Button_" + ville)
                                                .on("click", function () {
                                                    removeWaffles2(canvas, d.villes, ville, heightEcran);
                                                    removeText2(canvas);

                                                    graphLine(canvas, dd, widthEcran, heightEcran);
                                                    baseReload(canvas, widthEcran, heightEcran);
                                                    canvas.selectAll(".Reload")
                                                        .on("click", function () {
                                                            location.reload();
                                                        })
                                                        .on("mouseover", function () {
                                                        baseHover(canvas, "R");
                                                        })
                                                        .on("mouseout", function () {
                                                            baseHoverOut(canvas, "R");
                                                        });
                                                })
                                                .on("mouseover", function () {
                                                    baseHover(canvas, ville);
                                                })
                                                .on("mouseout", function () {
                                                    baseHoverOut(canvas, ville);
                                                });
                                        });
                                    }
                                    else {
                                        removeText2(canvas);
                                        graphLine(canvas, d, widthEcran, heightEcran);
                                        baseReload(canvas, widthEcran, heightEcran);
                                        canvas.selectAll(".Reload")
                                            .on("click", function () {
                                                location.reload();
                                            })
                                            .on("mouseover", function () {
                                            baseHover(canvas, "R");
                                            })
                                            .on("mouseout", function () {
                                                baseHoverOut(canvas, "R");
                                            });
                                    }
                                })
                                .on("mouseover", function () {
                                    baseHover(canvas, province);
                                })
                                .on("mouseout", function () {
                                    baseHoverOut(canvas, province);
                                });
                        });
                    })
                    .on("mouseover", function () {
                        baseHover(canvas, nbClick);
                    })
                    .on("mouseout", function () {
                        baseHoverOut(canvas, nbClick);
                    });
            })
            .on("mouseover", function() {
                baseHover(canvas, nbClick);
            })
            .on("mouseout", function() {
                baseHoverOut(canvas, nbClick);
            });
    });
})(d3);