if (location.pathname !== '/') {
    location.href = location.protocol + '//'
                  + location.hostname + '/?p='
                  + location.pathname.substr(1);
}
