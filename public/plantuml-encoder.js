// PlantUML Encoder
(function(window) {
  // Deflate implementation
  const Deflater = function() {
    this.strm = new window.pako.Deflate({
      raw: true,
      level: 9
    });
  };

  Deflater.prototype.append = function(data) {
    this.strm.push(data, false);
  };

  Deflater.prototype.flush = function() {
    this.strm.push(new Uint8Array(0), true);
    return this.strm.result;
  };

  window.Deflater = Deflater;
})(window); 