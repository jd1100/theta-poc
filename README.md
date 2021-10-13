# theta-poc
poc for theta network utilizing the thetavideoapi and the theta p2p js library

# Usage

> Create an app on thetavideoapi.com to generate the api keys

build binary
```go build http.go```

run binary with the api keys as arguments
```./http --api-id="{API Key}" --api-secret="{API Secret}"

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
## JavaScript/CSS
- video.js v7.10.2 https://vjs.zencdn.net/7.10.2/video.min.js/https://vjs.zencdn.net/7.10.2/video-js.min.css
- hls.js v0.12.4 https://cdn.jsdelivr.net/npm/hls.js@0.12.4
- theta.js v0.0.0 https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js
- theta hls.js plugin v0.0.0 https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.js
- theta video.js plugin v0.0.0 https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js
- theta web widget v0.0.0 https://theta-web-widgets.thetatoken.org/js/ThetaWebWidgets.js
