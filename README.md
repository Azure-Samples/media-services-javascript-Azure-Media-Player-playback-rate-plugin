---
services: media-services
platforms: javascript
author: Amit Rajput
---
# Media Services: Playback rate plugin Azure Media Player


##Information
Attributions:  amitr@microsoft.com

#Introduction
This plugin overlays text over the player in a configurable position when the viewer hovers over it. If mouse is inactive or located outside the context of the player, the text disappears. 

## Getting Started
Include the plugin CSS/javascript *after* the AMP script in the `<head>` of your html page:


```<script src="playbackrate.js"></script>```

register the plugin like so:

``` 
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
See index.html for more details
## Options
there are no configurable options for this plugin today, initiliazing the plugin enables the followinf playback speeds: 


##To-Do


# Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
