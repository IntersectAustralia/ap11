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
        fragment += '<li><a href="'+web_url+'">'+commits[i].commit.message+'</a> by '+commits[i].author.login+'</li>';
      }
    } else {
      fragment += '<li>None</i>';
    }
    t.innerHTML = fragment;
  }
  return {
    showCommits: function(options){
      $.getJSON("https://api.github.com/repos/"+options.user+"/"+options.repo+"/commits?since="+options.since+"&until="+options.until, 
        function(response) {
          var commits = [];
          if (!response || response.length == 0) { return; }
          for (var i = 0; i < response.length; i++) {
            commits.push(response[i]);
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
