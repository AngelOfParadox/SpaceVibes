var resultsHeader = document.querySelector('h2');

var textarea = document.querySelector('textarea');
textarea.addEventListener('input', function() {
  var text = this.value.trim();
  if (/[\.\?!;:]$/.test(text)) {
    /* We can also choose the language we want, 
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
        var dataString = '';
        response.documents.forEach(function(document) {
          document.sentences.forEach(function(sentence, index) {
            dataString += 'S' + (index+1) + ': ' + sentence.sentiment;
            dataString += ' (POS: ' + sentence.confidenceScores.positive.toFixed(2);
            dataString += ', NEU: ' + sentence.confidenceScores.neutral.toFixed(2);
            dataString += ', NEG: ' + sentence.confidenceScores.negative.toFixed(2) + ')<br>';
          });
        });
        resultsHeader.innerHTML = dataString;
      }
    });

    xhr.open("POST", "https://microsoft-text-analytics1.p.rapidapi.com/sentiment");
    xhr.setRequestHeader("content-type", "application/json");
    // Get your key at: https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-text-analytics1
    xhr.setRequestHeader("X-RapidAPI-Key", "YOUR_KEY_HERE");
    xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-text-analytics1.p.rapidapi.com");
    xhr.send(data);
    
  }
  
});

window.onload = function() {
document.getElementsByTagName("h2").focus();
}

// Transparency for api: https://learn.microsoft.com/en-us/legal/cognitive-services/language-service/transparency-note-sentiment-analysis?context=%2Fazure%2Fcognitive-services%2Flanguage-service%2Fcontext%2Fcontext