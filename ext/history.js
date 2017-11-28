function showAll(e) {
  var root = document.getElementById("history");
  root.innerHTML = "";
  chrome.history.search(
    {text: "www.youtube.com/watch?v=", maxResults: 20},
    function(results) {
      if (results.length < 1) {
        var li = document.createElement('li');
        var tn = document.createTextNode('Empty.');
        li.appendChild(tn);
        root.appendChild(li);
      } else {
        for (var k in results) {
          var li = document.createElement('li');
          var history = results[k];
       
          var tn = document.createTextNode(" URL: " + history.url + ", Title:" + history.title + ", Last visited:" + history.lastVisitTime + ",  Visit count: " + history.visitCount);
          li.appendChild(tn);
          root.appendChild(li);
        }
      }
    }
  );
}

document.getElementById('update').addEventListener('click', showAll);

