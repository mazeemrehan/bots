// @version 1.0.1
var usersarray = [
    {'username': 'soharwardi', '_sdate': '55/25/2014'},
    {'username': 'ali', '_sdate': '55/25/25514'},
    {'username': 'azeemrehan', '_sdate': '55/25/20004'}
];
var earninguniversityusers = [
    {'username': 'soharwardi', '_sdate': '55/25/2014'},
    {'username': 'mazeemrehasns', '_sdate': '55/25/25514'}
];
var iframurls = ['http://www.sayfixit.com', 'http://www.sayfixit.com/category/programin',
    'http://www.sayfixit.com/category/programin/php', 'http://www.sayfixit.com/category/programin/c-programing'];

var adclass = '';
var siteinfo = [];
var users = null;
if (window.location.hostname == 'www.earninguniversity.com')
{
    users = earninguniversityusers;
    siteinfo['adsclass'] = '.spreadlinkshighlighted';
    siteinfo['iframid'] = 'site';
    siteinfo['adstatus'] = 'euniadurl';
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
jQuery(function($) {

    function _getdomain()
    {
        return window.location.hostname;
    }
    function _geturl()
    {
        return location.pathname.substring(1);
    }
    $.mybot = function()
    {
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
                        $(siteinfo['adsclass']).each(function() {
                            var link = document.querySelector(siteinfo['adsclass']);
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
                        localStorage.setItem(siteinfo['adstatus'], 'empty');
                        if (ads.length > 0) {
                            interval = setInterval(function() {
                                if (i == ads.length)
                                {
                                    if (localStorage.getItem(siteinfo['adstatus']) == 'empty')
                                    {
                                        tab.close();
                                        clearInterval(interval);
                                        location.reload();
                                    }

                                }
                                else if (localStorage.getItem(siteinfo['adstatus']) == 'empty' || localStorage.getItem(siteinfo['adstatus']) === null)
                                {
                                    localStorage.setItem(siteinfo['adstatus'], ads[i]);
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
                    document.getElementById(siteinfo['iframid']).src = '';//iframurls[x];
                    window.confirm = function() {
                        console.log.apply(console, arguments);
                        return true;
                    };
                    window.alert = function() {
                        console.log.apply(console, arguments);
                        return true;
                    };

                    $(window).unload(function() {
                        localStorage.setItem(siteinfo['adstatus'], 'empty');
                    });
                }
            } else {
                alert("You can't use this script");
            }
        }
    }
}(typeof jQuery === 'function' ? jQuery : this));
