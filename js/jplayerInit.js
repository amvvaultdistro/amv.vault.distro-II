/*---------------------------------------------------------
  AMV Vault (Abantu Musik Vault) - Audio Player Engine
  Handles high-fidelity music distribution previews.
---------------------------------------------------------*/

(function($) {

    initAMVVaultPlayer();
    
    function initAMVVaultPlayer() {
        var players = $('.jplayer');
        players.each( function(e) {
            var player = $(this);
            var ancestor = player.data('ancestor');
            var songUrl = player.data('url');
            
            player.jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: songUrl
                    });
                },
                play: function() { 
                    // AMV Standard: Ensure only one track from the Vault plays at a time.
                    $(this).jPlayer("pauseOthers");
                    try {
                        wavesurfer.pause();
                    } catch(err) {
                        return;
                    }
                },
                swfPath: "jPlayer",
                supplied: "mp3",
                cssSelectorAncestor: ancestor,
                wmode: "window",
                globalVolume: false,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                solution: 'html',
                preload: 'metadata',
                volume: 0.9, // AMV Default Volume Boost
                muted: false,
                backgroundColor: '#050505', // Matched to AMV Deep Black
                errorAlerts: false,
                warningAlerts: false
            });
        });
    }

    // Aligns the timestamp specifically for the AMV Gold playbar
    function currentTimeAlign () {
        $('.jp-progress').each(function() {
            var jpPBarW = $(this).find('.jp-play-bar').innerWidth();
            if(jpPBarW > 40 ) {
                $(this).addClass('middle');
            } else {
                $(this).removeClass('middle');
            }
        });
    }
    setInterval(currentTimeAlign, 10);
    
    // Artist Preview Controls
    $('.single_player').each( function() {
        var rwaction,
            rewinding,
            fastforward,
            thisItem = $(this),
            player = thisItem.find('.jplayer');

        // AMV Vault Skip Controls
        thisItem.find('.jp-next').click(function (e) { 
            FastforwardTrack();
        });

        thisItem.find('.jp-prev').click(function (e) { 
            RewindTrack();
        });


        function GetPlayerProgress() {
            return (thisItem.find('.jp-play-bar').width() / $('.jp-seek-bar').width() * 100);
        }

        function RewindTrack() {
            var currentProgress = GetPlayerProgress();
            var futureProgress = currentProgress - 5; // Skip back 5%
            
            if (futureProgress <= 0) {
                rewinding = false;
                window.clearInterval(rwaction);
                player.jPlayer("pause", 0);
            }
            else {
                player.jPlayer("playHead", parseInt(futureProgress, 10));
            }
        }

        function FastforwardTrack() {
            var currentProgress = GetPlayerProgress();
            var futureProgress = currentProgress + 5; // Skip forward 5%
            
            if (futureProgress >= 100) {
                fastforward = false;
                window.clearInterval(ffaction);
                player.jPlayer("playHead", parseInt($('.jp-duration').text().replace(':', '')));
            }
            else {
                player.jPlayer("playHead", parseInt(futureProgress, 10));
            }
        }
    });

})(jQuery);