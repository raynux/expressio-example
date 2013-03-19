web: supervisor --quiet --watch . --ignore node_modules -- app.js --cluster
redis: redis-server /usr/local/etc/redis.conf
mongo: mongod --dbpath ./db --quiet
guard: bundle exec guard
