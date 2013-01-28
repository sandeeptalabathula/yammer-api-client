var yammer = new function () {

    configure = function () {
        try {
            yam.config({ appId: "xxxxxxxxx" });
        } catch (e) {
            showMessage('error', e);
        }
    },


checkYmrAuthentication = function () {
    try {
        yam.getLoginStatus(function (response) {
            if (response.authResponse) {
                showMessage('success', 'logged in and connected user, someone you know');
            } else {
                showMessage('error', 'no user session available, someone you don’t know or not authorized.');
            }
        });
    } catch (e) {
        showMessage('error', e);
    }
},

getYmrAuthenticated = function () {
    try {
        yam.getLoginStatus(function (response) {
            if (response.authResponse) {
                showMessage('success', 'logged in and connected user, someone you know');
            } else {
                showMessage('error', 'no user session available, someone you don’t know or not authorized.');

                yam.login(function (response) {
                    if (response.success) {
                        showMessage('success', 'user successfully logged in with app access token :' + response.access_token.access_token.token);
                    } else {
                        showMessage('warning', 'user cancelled login');
                    }
                });
            }
        });
    } catch (e) {
        showMessage('error', e);
    }

},

logoutOfYmr = function () {
    try {
        yam.getLoginStatus(function (response) {
            if (response.authResponse) {
                yam.logout(function (response) {
                    showMessage('success', 'user is logged out of Yammer');
                });
                showMessage('success', 'user is logged out of Yammer');
            } else {
                showMessage('error', 'no valid yammer session or user already logged out of Yammer');
            }
        });
    } catch (e) {
        showMessage('error', e);
    }
},

getGroups = function () {
    try {

        this.getYmrAuthenticated();

        yam.request(
            { url: "https://www.yammer.com/api/v1/groups.json"
            , method: "GET"
            , data: {}
            , success: function (msg) {
                $('.ymrresponse').empty();

                $("#ymrresponse").append("GROUPS <br/> <table>");

                $.each(msg, function (i, item) {
                    $("#ymrresponse").append("<tr><td><img src='" + item.mugshot_url + "' width='50' height='50' /></td><td>" + item.name + "</td></tr>");
                });

                $("#ymrresponse").append("</table>");
            }
            , error: function (msg) { console.log("Get request was Unsuccessful..." + msg); }
            }
        );

    } catch (e) {
        showMessage('error', e);
    }
},

getUserDetail = function (email) {
    try {
        console.log("processing getUserDetail with input(s)" + email);

        if (email == null || email == '') {
            showMessage('warning', 'User Email ID is required to process this request.');
            return;
        } 

        this.getYmrAuthenticated();

        yam.request(
            { url: "https://www.yammer.com/api/v1/users/by_email.json"
            , method: "GET"
            , data: "email= " + email
            , success: function (msg) {
                $('.ymrresponse').empty();
                $("#ymrresponse").append("<table>");
                console.log(msg);
                $.each(msg, function (i, item) {
                    $("#ymrresponse").append("<tr><td><img src='" + item.mugshot_url + "' width='42' height='42' /> </td><td>" + item.full_name + "</td></tr>");
                    $("#ymrresponse").append("<tr><td colspan='2'>" + item.job_title + "</td></tr>");
                    $("#ymrresponse").append("<tr><td colspan='2'>" + item.department + "</td></tr>");
                    $("#ymrresponse").append("<tr><td colspan='2'><strong>" + item.stats.following + "</strong> following</td></tr>");
                    $("#ymrresponse").append("<tr><td colspan='2'><strong>" + item.stats.followers + "</strong> followers</td></tr>");
                    console.log(item);
                });

                $("#ymrresponse").append("</table>");
            }
            , error: function (msg) {
                console.log("Get request was Unsuccessful..." + msg);
            }
            }
        );

    } catch (e) {
        showMessage('error', e);
    }
},

postToYammer = function (val) {

    this.getYmrAuthenticated();

    if (val == null || val == '') {
        val = "Please ignore this post. This Post was Made Using the Yammer API. ";
    }

    yam.request({ url: "https://www.yammer.com/api/v1/messages.json"
                  , method: "POST"
                  , data: { "body": val }
                  , success: function (msg) {
                      showMessage('success', 'Successfully posted to Yammer Network.<br/> text:' + val);
                      console.log("Post was Successful!: " + msg);
                  }
                  , error: function (msg) {
                      showMessage('error', 'Post was Unsuccessful...!');
                      console.log("Post was Unsuccessful...!" + msg);
                  }
    });
},

getYammerFeed = function () {
    this.getYmrAuthenticated();
    $('.ymrresponse').empty();
    yam.connect.embedFeed(
        { container: '#ymrresponse'
        , network: 'deloitte.com'
        , feedType: 'group'
        , feedId: '372393'
        });
}

    return {
        configure: configure,
        checkYmrAuthentication: checkYmrAuthentication,
        getYmrAuthenticated: getYmrAuthenticated,
        logoutOfYmr: logoutOfYmr,
        getGroups: getGroups,
        getUserDetail: getUserDetail,
        postToYammer: postToYammer,
        getYammerFeed: getYammerFeed
    };

} (); 