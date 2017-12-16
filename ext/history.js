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

          var a = document.createElement('a');
          a.setAttribute('href',"#");
          a.onclick=function(evt){
            var text= evt.target.parentElement.innerText;
            var url= text.split(' ')[1];
            var title= text.substring(text.indexOf('Title:')+7,text.indexOf(evt.target.innerText)+1);
            addBookmark(url,title);
          };
          a.innerHTML = 'Add Bookmark';
          li.appendChild(tn);
          li.appendChild(a);
          root.appendChild(li);
        }
      }
    }
  );
}

function addBookmark(url,title){
  chrome.bookmarks.search(url,function(result){
    if (result.length==0){
      chrome.bookmarks.create({'parentId': '1','title': title,'url':url});
    }
  })
   
}

document.getElementById('update').addEventListener('click', showAll);

