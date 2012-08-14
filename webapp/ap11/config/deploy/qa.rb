# Your HTTP server, Apache/etc
role :web, ''
# This may be the same as your Web server
role :app, ''
# This is where Rails migrations will run
role :db,  '', :primary => true

