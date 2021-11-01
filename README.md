# theta-poc
poc for theta network utilizing the thetavideoapi and the theta p2p js library

# Usage

> Create an app on thetavideoapi.com to generate the api keys
## Arguments
- ``--api-id`` (required) -> defines api id from the [theta video api](thetavideoapi.com)
- ``--api-secret`` (required) -> defines api secret from [theta video api](thetavideoapi.com)
- ``--ip`` (optional) -> defines ip on which run the web server (default value is localhost)
- ``--port`` (optional) -> defines port on which to run the web server (default value is 8001)
---
build binary
```go build http.go```

run binary with the api key/secret as arguments and optionally define the ip and port
```./http --api-id {API Key} --api-secret {API Secret} --ip {ip address} --port {port number} 

web server runs on port 8001

# Dependencies
## Golang
- "bytes"
- "encoding/json"
- "flag"
- "fmt"
- "html/template"
- "io/ioutil"
- "log"
- "net/http"
- "net/url"
- "strings"
- "time"
- "github.com/alexedwards/scs"
- "github.com/gorilla/mux"
## JavaScript/CSS
- tailwindcss 
- video.js v7.10.2 https://vjs.zencdn.net/7.10.2/video.min.js/https://vjs.zencdn.net/7.10.2/video-js.min.css
- hls.js v0.12.4 https://cdn.jsdelivr.net/npm/hls.js@0.12.4
- theta.js v0.0.0 https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js
- theta hls.js plugin v0.0.0 https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.js
- theta video.js plugin v0.0.0 https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js
- theta web widget v0.0.0 https://theta-web-widgets.thetatoken.org/js/ThetaWebWidgets.js
