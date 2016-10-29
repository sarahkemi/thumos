const microevent = require('microevent')
const clm = require('./node_modules/clmtrackr/clmtrackr')
const pModel = require('clmtrackr/models/model_pca_20_svm')

var Thumos = function (videoId, overlayId) {
  var self = this
  var video = document.getElementById(videoId)
  var overlay = document.getElementById(overlayId)
  var overlayCC = overlay.getContext('2d')
  var positions

  var ctrack = new clm.tracker({useWebGL: true})
  ctrack.init(pModel)

  // start tracking
  ctrack.start(video)
  // start loop to draw face
  drawLoop()
  // print position data to console
  positionLoop()

  setInterval(function emitDeltaPosition () {
    var deltaPositions = []
    var startPositions = positions
    var endPositions
    var startTime
    var endTime
    startTime = new Date()
    setTimeout(function deltas () {
      endPositions = positions
      endTime = new Date()
      for (var i = 0; i < startPositions.length; i++) {
        // deltaPositions.push([endPositions[i][0] - startPositions[i][0], endPositions[i][1] - startPositions[i][1]])
        // find euclidean differences between start and end points and average that
        deltaPositions.push(Math.sqrt(Math.pow(endPositions[i][0] - startPositions[i][0], 2) + Math.pow(endPositions[i][1] - startPositions[i][1], 2)))
      }
      var faceDelta = deltaPositions.reduce(function (a, b) { return a + b }) / deltaPositions.length
      self.trigger('faceMoving', {'start': startTime, 'end': endTime, 'now': new Date(), 'delta': faceDelta})
    }, 5000)
  }, 10000)

  function drawLoop () {
    clm.requestAnimFrame(drawLoop)
    overlayCC.clearRect(0, 0, 400, 300)
    if (ctrack.getCurrentPosition()) {
      ctrack.draw(overlay)
    }
  }

  function positionLoop () {
    clm.requestAnimFrame(positionLoop)
    positions = ctrack.getCurrentPosition()
  }
}

microevent.mixin(Thumos)

module.exports = Thumos

