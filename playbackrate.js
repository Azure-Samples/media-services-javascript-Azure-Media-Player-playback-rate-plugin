(function (mediaPlayer) {
    mediaPlayer.plugin('playbackrate', function (options) {

        amp.options.languages['de']["Playback Speed"] = "Geschwindigkeit";
        amp.options.languages['es']["Playback Speed"] = "Velocidad";
        amp.options.languages['ca']["Playback Speed"] = "Velocitat";

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".amp-default-skin .vjs-control-bar .amp-playbackrate-control:before{width:22px;height:22px;font-size:16px;line-height:1em;margin:6px 0 0 6px;padding:0;text-align:left;content:'\\e62f'}.amp-default-skin .vjs-control-bar .amp-playbackrate-control:hover{background-color:rgba(255,255,255,.1)}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu{border-color:transparent;min-width:100px;left:-40px;width:auto}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu:after{content:'';display:block;width:150px;height:12px;position:relative;z-index:10;top:0;left:0}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content{padding:25px 18px 10px 15px;left:0;min-width:76px;width:85%;background-color:rgba(60,69,79,.8);box-shadow:none}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .amp-menu-header{text-transform:uppercase;position:absolute;top:5px;width:100%;font-size:11px;font-family:'Segoe UI';font-weight:700;pointer-events:none;white-space:nowrap}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .amp-menu-header:focus,.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .amp-menu-header:hover{background-color:none}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item{text-transform:none;text-align:left;color:rgba(255,255,255,.7);box-shadow:none;font-size:11px;font-family:'Segoe UI semibold','Segoe UI';line-height:14px;text-indent:12px;width:100%;padding-right:12px;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item.vjs-selected{color:#fff}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item.vjs-selected:before{content:'\\e62c';font-family:azuremediaplayer;font-size:8px;width:0;height:0;overflow:visible;position:absolute;left:1px}.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item.vjs-selected,.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item.vjs-selected:focus,.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item.vjs-selected:hover,.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item:focus,.amp-default-skin .vjs-control-bar .amp-playbackrate-control .vjs-menu .vjs-menu-content .vjs-menu-item:hover{background-color:transparent}";
        document.head.appendChild(css);

        var player = this,
            menuTitle = !!options && !!options.menuTitle ? options.menuTitle : 'Playback Speed',
            selectedItemIndex = !!options && !!options.selectedItem ? options.selectedItem : 1,
            controlBarButtonCssClass = 'amp-playbackrate-control',
            playbackRates = [0.5, 1.0, 1.25, 1.5, 1.75, 2.0],
            pluginActive = 0;
        function changePlaybackRate(item) {
            var buttonComponent = player.controlBar.playbackRateButton,
                oldSelectedItemIndex = selectedItemIndex,
                newSelectedItemIndex = buttonComponent.items.indexOf(item);
            if (oldSelectedItemIndex !== newSelectedItemIndex) {
                buttonComponent.items[oldSelectedItemIndex].selected(false);
                item.selected(true);
                selectedItemIndex = newSelectedItemIndex;
                updatePlaybackRateIcon(buttonComponent, newSelectedItemIndex);
                var videoElement = document.getElementById(player.id_ + "_html5_api");
                videoElement.playbackRate = playbackRates[newSelectedItemIndex];
            }
        }
        function getPlaybackRates() {
            if (!playbackRates) {
                return
            }
            var items = [];
            var startIndex = 1;
            for (var i = 0; i < playbackRates.length; i++) {
                var rate = playbackRates[i];
                if (rate == 1) {
                    startIndex = i;
                }
                items[i] = { text: rate + "x" };

            }
            items[startIndex].selected = true;
            selectedItemIndex = startIndex;
            return items
        }
        function updatePlaybackRateIcon(buttonComponent, newIndex) {
            var playbackRateIcon = buttonComponent.el().className.match(/playbackrate-\d/);
            if (playbackRates[newIndex] == 1) {
                buttonComponent.el().className = buttonComponent.el().className.replace(playbackRateIcon, 'playbackrate-inactive')
            }
            else {
                buttonComponent.el().className = buttonComponent.el().className.replace(playbackRateIcon, 'playbackrate-active')
            }
        }

        mediaPlayer.PlaybackRateMenuItem = mediaPlayer.MenuItem.extend({
            init: function (player, item) {
                var options = {
                    label: item.text, value: item.value, selected: item.selected
                };
                mediaPlayer.MenuItem.call(this, player, options);
                this.addClass('amp-menu-item');
                this.on('click', this.onClick)
            }
        });
        mediaPlayer.PlaybackRateMenuItem.prototype.onClick = function (event) {
            if (event.type !== "keydown") {
                event.stopImmediatePropagation()
            }
            changePlaybackRate(this)
        };
        mediaPlayer.PlaybackRateButton = mediaPlayer.MenuButton.extend({
            init: function (player, options) {
                options = options || {};
                options.name = 'playbackRateButton';
                mediaPlayer.MenuButton.call(this, player, options);
                player.addEventListener(amp.eventName.loadedmetadata, amp.bind(this, playbackRateLoadedMetadataHandler));
                if (this.items != undefined && this.items.length > 0) {
                    var menuTitleComponent = new mediaPlayer.Component(player, {
                        el: vjs.createEl('li', {
                            className: 'amp-menu-header', innerHTML: vjs.util.htmlEncode(this.localize(menuTitle)), tabindex: -1
                        })
                    });
                    this.menu.addItem(menuTitleComponent);
                    this.el().className += ' playbackrate-inactive';
                }
                else {
                    this.hide()
                }
            }
        });
        mediaPlayer.PlaybackRateButton.prototype.buttonText = menuTitle;
        mediaPlayer.PlaybackRateButton.prototype.className = controlBarButtonCssClass;
        mediaPlayer.PlaybackRateButton.prototype.createItems = function () {
            var rates = getPlaybackRates() || [],
                menuItems = [];
            for (var i = 0; i < rates.length; i++) {
                var menuItem = new mediaPlayer.PlaybackRateMenuItem(player, rates[i]);
                menuItems.push(menuItem)
            }
            return menuItems
        };
        player.ready(function () {
            var button = new mediaPlayer.PlaybackRateButton(player, { selectedItemIndex: selectedItemIndex });
            var controlBarChildren = player.controlBar.children();
            var playbackRateButton;

            if (player.currentTechName() == "AzureHtml5JS" || player.currentTechName() == "Html5") {
                for (var i = 0; i < controlBarChildren.length; i++) {
                    if (controlBarChildren[i].el() && controlBarChildren[i].el().className === "amp-controlbaricons-right") {
                        var rightControlBar = player.controlBar.children()[i];
                        playbackRateButton = rightControlBar.addChild(button);
                        
                        if (rightControlBar.children().length > 1) {
                            var domRightControlBar = rightControlBar.el();
                            domRightControlBar.insertBefore(domRightControlBar.children[domRightControlBar.children.length - 1], domRightControlBar.children[0]);
                        }
                        break;
                    }
                }
                if (playbackRateButton) {
                    player.controlBar.playbackRateButton = playbackRateButton;
                }
                //adds to the more options menu
                player.options_.plugins.moreOptions.controls.push("playbackRateButton");

                //used for handling the IE bug where playbackRate is not remembered
                player.addEventListener("play", seekHandler);
                pluginActive = 1;
            }
        });
        mediaPlayer.PlaybackRateButton.prototype.refresh = function () {
            //note: there is a bug here when you change sources and load a different tech 
            //playback rate icon doesn't get added (if wasn't there before) or get removed (if was there before), 
            //source change scenario is not in STREAM and tech change scenario is not in OFFICE VIDEOS so ignoring for now
            this.removeChild(this.menu);
            this.menu = this.createMenu();
            this.addChild(this.menu);
            if (pluginActive == 1) {
                player.removeEventListener("play", seekHandler);
            }

            if (this.items != undefined && this.items.length > 0 && (player.currentTechName() == "AzureHtml5JS" || player.currentTechName() == "Html5")) {

                var menuTitleComponent = new mediaPlayer.Component(player, {
                    el: vjs.createEl('li', {
                        className: 'amp-menu-header', innerHTML: vjs.util.htmlEncode(this.localize(menuTitle)), tabindex: -1
                    })
                });
                this.menu.addItem(menuTitleComponent);
                selectedItemIndex = 1;
                if (this.el().className.match(/playbackrate-\d/) == null) {

                    if (playbackRates[selectedItemIndex] == 1) {
                        this.el().className += ' playbackrate-inactive';
                    }
                    else {
                        this.el().className += ' playbackrate-active';
                    }
                }
                this.show()
                player.addEventListener("play", seekHandler);
                pluginActive = 1;
            }
            else {
                this.hide()
            }
        };

        function playbackRateLoadedMetadataHandler() {
            this.refresh();
        }
        function seekHandler() {
            if (vjs.IS_IE && player.currentTechName() == "AzureHtml5JS") {
                var videoElement = document.getElementById(player.id_ + "_html5_api");
                videoElement.playbackRate = playbackRates[selectedItemIndex];
            }
        }

    })
}(window.amp));
