/* =============================================================
* VARIABLES
============================================================= */

const video = document.getElementById('main-video');
const scripts = document.getElementsByClassName('script');
const transcriptDiv = document.querySelector('.transcript');

/* =============================================================
* SETUP for MEDIA ELEMENT PLAYER
============================================================= */

$('#main-video').mediaelementplayer({
  videoWidth: '100%',
  videoHeight: '100%',
  stretching: 'auto'
});

/* =============================================================
* HIGHLIGHT the CURRENT SCRIPT
============================================================= */

video.addEventListener('timeupdate', function() {
  let currentTime = this.currentTime;

  // loop through each script
  for (let i = 0; i < scripts.length; i += 1) {
    let scriptStart;
    let scriptEnd;

    // remove highlight
    scripts[i].classList.remove('active');

    // get the script's starting time
    // ** each script's starting time is saved in 'title' attribute
    scriptStart = scripts[i].getAttribute('title');

    // get the script's ending time
    if (scripts[i+1] === undefined) {  // if the script is last one,
      scriptEnd = this.duration;       // then the ending time will be
                                       // the total duration of the video
    } else {
      // the next script's starting time will be
      // the ending time of the current script
      scriptEnd = scripts[i+1].getAttribute('title');
    }

    if (scriptStart <= currentTime && currentTime < scriptEnd) {
      scripts[i].classList.add('active');
    }
  }
});

/* =============================================================
* MOVE to the CORRESPONDING TIME on VIDEO when SCRIPT clicked
============================================================= */

transcriptDiv.addEventListener('click', function(e) {
  let script = e.target;
  let scriptTime = Number(script.title);
  video.setCurrentTime(scriptTime);
  video.play();
});
