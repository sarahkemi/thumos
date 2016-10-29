const Thumos = require('../thumos.js')
const alert = require('alerts')
const getUserMedia = require('getusermedia')
const attachmediastream = require('attachmediastream')

getUserMedia(function (err, stream) {
  if (err) {
    console.log('couldnt get user media!', err)
    alert('Thumos couldnt get your user media. give it access to audio and try again!')
    throw err
  } else {
    console.log('got a stream!')
    attachmediastream(stream, document.querySelector('#vid video'))
    document.querySelector('#vid video').muted = true
    var faceEvents = new Thumos('box0', 'overlay')
    faceEvents.bind('faceMoving', function () {
      console.log('face movement event is being emitted!!')
    })
  }
})
