

var str = "https://raw.githubusercontent.com/grace-boop/counter/main/ccount.json";
url =str;
$(document).ready(function() {
    $.getJSON(url, {}, function (data) {
      //取得d3顏色
      var fill = d3.scaleOrdinal(d3.schemeCategory10);
      var data_ori =  [
        {text: "a", size: 100},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1},
        {text: "a", size: 1}
      ];
      console.log(data_ori);
      console.log("data");
      for (var i = 0, len = data.nodes.length; i < 20; i++) {
          //console.log(data.nodes[i].id);
          data_ori[i].text = data.nodes[i].id;
          data_ori[i].size = data.nodes[i].times/3;
          console.log(data_ori[i].text);
      }
      console.log(data_ori);

      //取得呈現處的寬、高
      var w = parseInt(d3.select("#tag").style("width"), 10);
      var h = parseInt(d3.select("#tag").style("height"), 10);

      d3.layout.cloud().size([w, h])
              .words(data_ori)
              .padding(2)
              .rotate(function () {
                  return ~~(Math.random() * 2) * 90;
              })
              .rotate(function () {
                  return 0;
              })
              .fontSize(function (d) {
                  return d.size;
              })
              .on("end", draw)
              .start();

      function draw(words) {
          d3.select("#tag").append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .append("g")
                  .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
                  .selectAll("text")
                  .data(words)
                  .enter().append("text")
                  .style("font-size", function (d) {
                      return d.size + "px";
                  })
                  .style("font-family", "Microsoft JhengHei")
                  .style("cursor", 'pointer')
                  .style("fill", function (d, i) {
                      return fill(i);
                  })
                  .attr("text-anchor", "middle")
                  .attr("transform", function (d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function (d) {
                      return d.text;
                  })
                  .on("click", function (d) {
                      window.open("https://www.google.com/search?q=" + d.text, '_blank');
                  });
      }
    });
});
