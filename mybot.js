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
