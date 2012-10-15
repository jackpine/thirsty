describe("SensorSite", function() {
  describe("#initialize", function() {
    it("should associate it's samples on initialize", function() {
      jasmine.Ajax.useMock();
      var sensor_site = new SensorSite({id: 5});
      sensor_site.sensor_samples.fetch();

      mostRecentAjaxRequest().response(MockXhrResponses.SensorSample.list.success);

      expect(sensor_site.sensor_samples.length).toBe(3);
    });
  });
});
