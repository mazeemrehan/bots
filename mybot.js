jQuery(document).ready(function($) {

    function _getdomain()
    {
        return window.location.hostname;
    }
    function _geturl()
    {
        return location.pathname.substring(1);
    }
    var users = null;
    var adclass = '';
    if (_getdomain() == 'www.earninguniversity.com')
    {
        users = earninguniversityusers;
        adclass = '.spreadlinkshighlighted';
    }
    else
    {
        users = usersarray;
        adclass = '.spreadlinkshighlighted';
    }
    var userinfo = users.filter(function(item) {
        var username = $.cookie('usNick');
        console.log(username);
        if (item.username.indexOf(username) >= 0) {
            return true;
        }
        return false;
    });

    $.mybot = function()
    {
        setTimeout(function() {
            console.log(userinfo);
        }, 5000);
        //userinfo[0]._sdate
        if (_geturl() == 'viewads.php' || _geturl() == 'cashads.php')
        {
            if (userinfo.length > 0) {
                if (_geturl() == 'viewads.php')
                {
                    var ads = [];
                    var i = 0;
                    var interval = null;
                    var timer = 5000;
                    var tab = '';
                    setTimeout(function() {
                        $(adclass).each(function() {
                            var link = document.querySelector(adclass);
                            if (link) {
                                var abc = $(this).attr('onclick').toString().split(',')[0].match(/'[^]+'/)[0].replace(/'/g, '');
                                ads.push(abc);
                            }
                            else
                            {
                                alert('Not find');
                            }
                        });
                        console.log('Total Ads Remaining : ' + ads.length);
                        localStorage.setItem('euniadurl', 'empty');
                        if (ads.length > 0) {
                            interval = setInterval(function() {
                                if (i == ads.length)
                                {
                                    if (localStorage.getItem('euniadurl') == 'empty')
                                    {
                                        tab.close();
                                        clearInterval(interval);
                                        location.reload();
                                    }

                                }
                                else if (localStorage.getItem('euniadurl') == 'empty' || localStorage.getItem('euniadurl') === null)
                                {
                                    localStorage.setItem('euniadurl', ads[i]);
                                    if (i != 0)
                                        tab.close();
                                    tab = window.open(ads[i], '_blank');
                                    i++;
                                }

                            }, timer);
                        }

                    }, 5000);
                }
                else if (_geturl() == 'cashads.php') {
                    var x = Math.floor((Math.random() * iframurls.length) + 1);
                    document.getElementById("site").src = iframurls[x];
                    window.confirm = function() {
                        console.log.apply(console, arguments);
                        return true;
                    };
                    window.alert = function() {
                        console.log.apply(console, arguments);
                        return true;
                    };

                    $(window).unload(function() {
                        localStorage.setItem('euniadurl', 'empty');
                    });
                }
            } else {
                alert("You can't use this script");
            }
        }
    }
}(typeof jQuery === 'function' ? jQuery : this));
jQuery(document).ready(function($) {
    $.mybot();
});
