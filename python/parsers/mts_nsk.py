# -*- coding: utf-8 -*-
import cookielib, urllib, urllib2, re
from xml.etree import ElementTree


def mts_nsk_balance(login, password):
    cj = cookielib.CookieJar()
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

    def postCall(url, postargs):
        req = urllib2.Request(url)
        req.add_data(urllib.urlencode(postargs))
        return opener.open(req)

    API_URL = "https://ihelper.sib.mts.ru/SelfCarePda/Security.mvc/LogOn"
    data = postCall(API_URL,{'_stateParam': '', '_forwardName': '', '_expandStatus':"", '_resetBreadCrumbs': "",'ecareAction': 'login', 'userName': login, 'password': password}).read()
    regex = re.compile(r'<strong>(.+?)</strong>', re.UNICODE)
    result = regex.findall(data)[2].split(' ')[0].replace(',', '.') # я не осилил юникодо-проблемы в регэкспе, поэтому такой костыль
    return float(result)

