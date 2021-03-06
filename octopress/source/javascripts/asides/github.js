var github = (function(){
  function render(target, repos){
    var i = 0, t = $(target)[0];
    var fragment = '<li class="nav-header">GitHub Repos</li>';

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+'</p></li>';
    }
    t.innerHTML = fragment;
  }
  function renderCommits(target, commits, repo){
    var i = 0, t = $(target)[0];
    var fragment = '<li class="nav-header">Commits '+repo+'</li>';
    if (commits.length > 0) {
      for(i = 0; i < commits.length; i++) {
        var web_url = commits[i].url;
        web_url = web_url.replace("api.github.com/repos","github.com").replace("commits/","commit/");
        var author = 'Anonymous';
        if (commits[i].author) {
          if (commits[i].author.name) author = commits[i].author.name;
          if (commits[i].author.login) author = commits[i].author.login;
        } else {
          if (commits[i].commit.author.name) author = commits[i].commit.author.name;
          if (commits[i].commit.author.login) author = commits[i].commit.author.login;
        }
        var message = 'No message';
        if (commits[i].commit.message && commits[i].commit.message.trim().length > 0) message = commits[i].commit.message;
        fragment += '<li><a href="'+web_url+'">'+message+'</a> by '+author+'</li>';
      }
    } else {
      fragment += '<li>None</i>';
    }
    t.innerHTML = fragment;
  }
  return {
    showCommits: function(options){
      $.getJSON("https://api.github.com/repos/"+options.user+"/"+options.repo+"/commits?since="+options.since+"&until="+options.until+"&callback=?", 
        function(response) {
          var commits = [];
          if (!response || response.data.length == 0 || response.data.message != null) { 
             renderCommits(options.target, commits, options.repo);
             return; 
          }
          for (var i = 0; i < response.data.length; i++) {
            commits.push(response.data[i]);
          }
          commits.sort(function(a, b) {
            var aDate = new Date(a.commit.committer.date).valueOf(),
                bDate = new Date(b.commit.committer.date).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });
          renderCommits(options.target, commits, options.repo);
      });
    },
    showRepos: function(options){

      $.getJSON("https://api.github.com/users/"+options.user+"/repos?sort=updated&direction=desc&callback=?", 
        function(response) {
          var repos = [];
          if (!response || response.data.length == 0) { return; }
          for (var i = 0; i < response.data.length; i++) {
            if((options.skip_forks && !response.data[i].fork) &&
              (repos.length < options.count)) {
              repos.push(response.data[i]);
            }
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          
          render(options.target, repos);
        
      });
    }
  };
})();
