# -*- coding: utf-8 -*-
import urllib2
from datetime import datetime
import xml.etree.ElementTree as ElementTree

def ntk_balance(login, password_hash):
    NTK_API = "https://api.novotelecom.ru/billing/?method=userInfo&login=%s&passwordHash=%s"
    data = urllib2.urlopen(NTK_API % (login, password_hash)).read()
    etree = ElementTree.fromstring(data)
    return round(float(etree.find("balance").text), 2)
