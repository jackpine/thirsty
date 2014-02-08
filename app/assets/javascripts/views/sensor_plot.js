var SensorPlot = Backbone.View.extend({

  render: function() {
    "use strict";

    var samples = this.model.sensor_samples.models;

    var margin = 60,
      width = 700 - margin,
      height = 500 - margin;

    this.$el.empty();

    d3.select(this.el).
      append("svg").
        attr("width", width).
        attr("height", height).
      append("g").
        attr("class", "chart");

    d3.select("svg").
      selectAll("circle").
      data(samples).
      enter().
      append("circle").
        attr("class", function(sample) { return sample.get('value') == 0 ? "zero" : "non-zero" });

    var non_zero_value_samples =  _.reject(samples, function(sample) { return sample.get('value') == 0 });
    var value_extent = d3.extent(
      non_zero_value_samples,
      function(sample) { return sample.get('value'); }
    );

    var value_scale = d3.scale.linear().
      domain(value_extent).
      range([height, margin]);

    var time_extent = d3.extent(
      samples,
      function(sample) { return Date.parse(sample.get('sampled_at')); }
    );

    var time_scale = d3.time.scale().
      domain(time_extent).
      range([margin, width]);

    var non_zero_value_samples =  _.reject(samples, function(sample) { return sample.get('value') == 0 });
    var value_extent = d3.extent(
      non_zero_value_samples,
      function(sample) { return sample.get('value'); }
    );

    var value_scale = d3.scale.linear().
      domain(value_extent).
      range([height, margin]);

    var time_extent = d3.extent(
      samples,
      function(sample) { return Date.parse(sample.get('sampled_at')); }
    );

    var time_scale = d3.time.scale().
      domain(time_extent).
      range([margin, width]);

    d3.selectAll("circle").
      attr("cx", function(sample) { return time_scale(Date.parse(sample.get('sampled_at'))); }).
      attr("cy", function(sample) { return sample.get('value') == 0.0 ? height : value_scale(sample.get('value')); }).
      attr("r", 3);

    var time_axis = d3.svg.axis().
      scale(time_scale);

    d3.select('svg').
      append('g').
      attr("class", "x axis").
      attr("transform", "translate(0, " + height + ")").
      call(time_axis);

    var value_axis = d3.svg.axis().
      scale(value_scale).
      orient("left");

    d3.select("svg").
      append('g').
      attr("class", "y axis").
      attr("transform", "translate(" + margin + ")").
      call(value_axis);

    return this.el;

  }

});
