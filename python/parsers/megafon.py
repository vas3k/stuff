# -*- coding: utf-8 -*-
import urllib2
from xml.etree import ElementTree

def megafon_balance(login, password):
    MEGAFON_API = "https://sibsg.megafon.ru/ROBOTS/SC_TRAY_INFO?X_Username=%s&X_Password=%s"
    data = urllib2.urlopen(MEGAFON_API % (login, password)).read()
    balance = ElementTree.fromstring(data).find("BALANCE").text
    return float(balance)
