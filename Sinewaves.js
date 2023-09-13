// Function that is executed when the page is loaded
window.onload = function() {
  // A new instance is created
  var waves = new SineWaves({
      el: document.getElementById('waves'),
      speed: 3.5,
      ease: 'SineInOut',
      wavesWidth: '95%',
      // Useless, for now: rotate: 0,
      waves: [ 
        // Define all the waves, with their own settings
        {
          timeModifier: 1,
          lineWidth: 2.5,
          amplitude: -25,
          wavelength: 25
        },
        {
          timeModifier: 1.1,
          lineWidth: 2.6,
          amplitude: -30,
          wavelength: 30
        },
        {
          timeModifier: 1.2,
          lineWidth: 2.7,
          amplitude: -35,
          wavelength: 35
        },
        {
          timeModifier: 1.3,
          lineWidth: 2.8,
          amplitude: -40,
          wavelength: 40
        },
        {
          timeModifier: 1.4,
          lineWidth: 2.9,
          amplitude: -45,
          wavelength: 45
        },
        {
          timeModifier: 1.5,
          lineWidth: 3,
          amplitude: -50,
          wavelength: 50 
        },
        {
          timeModifier: 1.6,
          lineWidth: 3.1,
          amplitude: -55,
          wavelength: 55
        },
        {
          timeModifier: 1.7,
          lineWidth: 3.2,
          amplitude: -60,
          wavelength: 60
        },
        {
          timeModifier: 1.8,
          lineWidth: 3.3,
          amplitude: -65,
          wavelength: 65
        },
        {
          timeModifier: 1.9,
          lineWidth: 3.4,
          amplitude: -70,
          wavelength: 70
        },
        {
          timeModifier: 2,
          lineWidth: 3.5,
          amplitude: -75,
          wavelength: 75
        },
        {
          timeModifier: 2.1,
          lineWidth: 3.6,
          amplitude: -80,
          wavelength: 80
        },
        {
          timeModifier: 2.2,
          lineWidth: 3.7,
          amplitude: -85,
          wavelength: 85
        },
        {
          timeModifier: 2.3,
          lineWidth: 3.8,
          amplitude: -90,
          wavelength: 90
        },
        {
          timeModifier: 2.4,
          lineWidth: 3.9,
          amplitude: -95,
          wavelength: 95
        },
        {
          timeModifier: 2.5,
          lineWidth: 4,
          amplitude: -100,
          wavelength: 100, 
        }
        
        ],
          
              
              resizeEvent: function() {
                  var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
                  gradient.addColorStop(0,"rgba(25, 255, 255, 0)");
                  gradient.addColorStop(0.5,"rgba(255, 25, 255, 0.75)");
                  gradient.addColorStop(1,"rgba(255, 255, 25, 0");
        
                  /*
                  Others styles (red) 
                  gradient.addColorStop(0,"rgba(255, 45, 0, 0)");
                  gradient.addColorStop(0.5,"rgba(255, 0, 0, 0.75)");
                  gradient.addColorStop(1,"rgba(255, 45, 0, 0"); 
                  Others styles (white)
                  gradient.addColorStop(0,"rgba(255, 255, 255, 0)");
                  gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.75)");
                  gradient.addColorStop(1,"rgba(255, 255, 255, 0");
                  Others styles (favorite)
                  gradient.addColorStop(0,"rgba(25, 255, 255, 0)");
                  gradient.addColorStop(0.5,"rgba(255, 25, 255, 0.75)");
                  gradient.addColorStop(1,"rgba(255, 255, 25, 0");
                  */
                  
                  var index = -1;
                  var length = this.waves.length;
                  while(++index < length){
                      this.waves[index].strokeStyle = gradient;
                  }
                  index = void 0;
                  length = void 0;
                  gradient = void 0;
              }
          });
  // We obtain the text, which the user will put to send it to the Microsoft api
    var textarea = document.querySelector('textarea');
    textarea.addEventListener('input', function() {
    var text = this.value.trim();
    // When a sentence ends with the following punctuation marks, it will be sent
    if (/[\.\?!;:\s]$/.test(text)) {
      var lastChar = text[text.length - 1];
      if (lastChar === ' ') {
        return; 
      }
      /*
      In addition, we can also choose the language we want, 
      microsoft offers more than 90,
      but for the moment we will only use English, you can find more information at:
      https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/sentiment-opinion-mining/language-support
      */
      var data = JSON.stringify({
        "documents": [
          { "language": "en", "id": "1", "text": text }
        ]
      });

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          var response = JSON.parse(this.responseText);
          response.documents.forEach(function(document) {
            document.sentences.forEach(function(sentence) {
              var sentiment = sentence.sentiment;
              switch(sentiment) {
                case 'positive':
                  waves.waves.forEach(function(wave) {
                    wave.timeModifier -= 1.5;
                    if (wave.timeModifier < 0.5) {
                      wave.timeModifier = 1.5;
                    }
                  });
                  break;
                case 'neutral':
                  break;
                case 'negative':
                  waves.waves.forEach(function(wave) {
                    wave.timeModifier += 8;
                    if (wave.timeModifier > 7.5) {
                      wave.timeModifier = 5.5;
                    }
                  });
                  break;
              }
            });
          });
        }
      });

      xhr.open("POST", "https://microsoft-text-analytics1.p.rapidapi.com/sentiment");
      xhr.setRequestHeader("content-type", "application/json");
      // Get your key at: https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-text-analytics1
      xhr.setRequestHeader("X-RapidAPI-Key", "67589d2c79msh73a2a6b366160cdp1ffc2ejsn199c10d4a9c6");
      xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-text-analytics1.p.rapidapi.com");
      xhr.send(data);
    }
  });
}
