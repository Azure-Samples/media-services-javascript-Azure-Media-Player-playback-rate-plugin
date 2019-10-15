---
page_type: sample
languages:
- javascript
- html
products:
- azure
description: "This plugin overlays text over the player in a configurable position when the viewer hovers over it."
urlFragment: media-services-javascript-Azure-Media-Player-playback-rate-plugin
---

# Media Services: Playback rate plugin Azure Media Player


## Introduction

This plugin overlays text over the player in a configurable position when the viewer hovers over it. If mouse is inactive or located outside the context of the player, the text disappears. 

### Getting Started

Include the plugin CSS/javascript *after* the AMP script in the `<head>` of your html page:


```html
<script src="playbackrate.js"></script>
```

Register the plugin like so:

```javascript
var myOptions = {         
      autoplay: true,         
      controls: true,         
      width: "640",            
      height: "400",            
      poster: "",            
      plugins: {        
            "playbackrate": {}                
        }            
    };  
```
 
See `index.html` for more details

### Options

There are no configurable options for this plugin today.

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
