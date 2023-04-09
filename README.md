# UESTC IPTV Frontend

## TODO

- [ ] Chromecast support: Wait [upstream](https://github.com/silvermine/videojs-chromecast) for videojs 8.
- [ ] Airplay support: Wait [upstream](https://github.com/silvermine/videojs-airplay) for videojs 8.
- [ ] Service worker

## Deploy

### .env

```
VITE_VIDEO_ENDPOINT=https://iptv.uestc.edu.cn/hhls/
VITE_SNAPSHOT_ENDPOINT=https://iptv.uestc.edu.cn/snapshot/
```

### Build

```
yarn && yarn build
```