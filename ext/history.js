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
          var tn = document.createTextNode("URL: " + history.url + ", Title: " + history.title+' ');
          var a = document.createElement('a');
          var b = document.createElement('b');
          b.setAttribute('href',"#");
          a.setAttribute('href',"#");
          b.onclick=function(evt){
            var text= evt.target.parentElement.innerText;
            var url= text.split(' ')[1];
            window.open(url);
          }
          a.onclick=function(evt){
            var text= evt.target.parentElement.innerText;
            var url= text.split(' ')[1];
            var title= text.substring(text.indexOf('Title:')+7,text.indexOf(evt.target.innerText)+1);
            addBookmark(url,title);
          };

          a.innerHTML = 'Add Bookmark';
          b.innerHTML = 'Click To Open '
          li.appendChild(b);
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

