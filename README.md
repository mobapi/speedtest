## Ookla / speedtest.net servers list

https://www.speedtestserver.com/

## Create docker image

docker build -t speedtest .

## Run docker image

docker run -it \
  -e SPEEDTEST_SERVER_ID=<speedtest server id or undefined> \
  -e SPEEDTEST_TIMEOUT_MS=<speedtest timeout> \
  -e IFTTT_MAKER_EVENTNAME=<IFTTT Maker event name> \
  -e IFTTT_MAKER_KEY=<IFTTT security key> \
  speedtest
