//@author: Demouser
var mi = mi || {};

mi.auth = { //entry point
    whiteListedPages : [
        mi.sitemap.LOGIN
    ],
    init: function(){
        mi.auth.verifyAuth();
        mi.auth.bindEvents();
    },
    bindEvents: function(){
        $(window).on('focus', function(){
            mi.auth.verifyAuth();
        });
    },
    verifyAuth: function(){
        var self = mi.auth;
        if(self.isSessionExpiered())
            self.redirectToLoginPage();
        else
            self.dontStayInLoginPage();
    },
    isSessionExpiered: function(){
        var sessionExpired = false;
        var sessionToken = mi.storage.getToken();
        if(sessionToken == '' || _.isUndefined(sessionToken) || _.isEmpty(sessionToken))
            sessionExpired = true;
        return sessionExpired;
    },
    redirectToLoginPage: function(){
        var self = mi.auth,
            canProceed = self.canRedirectToLoginPage();
        if(canProceed)
            window.location = mi.sitemap.LOGIN;
    },
    canRedirectToLoginPage: function(){
        var pageName = mi.util.getPageNameFromPath(),
            canRedirect = true;
        if(_.contains(mi.auth.whiteListedPages, pageName))
            canRedirect = false;
        return canRedirect;
    },
    dontStayInLoginPage: function(){
        var pageName = mi.util.getPageNameFromPath();
        if(pageName == mi.sitemap.LOGIN)
            window.location = mi.sitemap.USER_PAGE;
    },
    doLogout: function(){
        mi.storage.clearSession();
        mi.storage.clearToken();
        window.location = mi.sitemap.LOGIN;
    }
}