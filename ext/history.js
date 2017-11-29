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
           var con_d = history.lastVisitTime;
           //var fin = new Date(con_d);
            //fin.setUTCSeconds(con_d);
            var t=history.lastVisitTime;
            var ex="/Date("+t+")/"
            var dateVal =ex;
            var date = new Date( parseFloat( dateVal.substr(6 )));
             
              var con_d =  (date.getMonth() + 1) + "/" +
              date.getDate() + "/" +date.getFullYear() + 
              " " + date.getHours() + ":" + 
              date.getMinutes() + ":" +
              date.getSeconds();
            
          var tn = document.createTextNode(" URL: " + history.url + ", Title:" + history.title + ", Last visited:" + con_d + ",  Visit count: " + history.visitCount);
          li.appendChild(tn);
          root.appendChild(li);
        }
      }
    }
  );
}

document.getElementById('update').addEventListener('click', showAll);

