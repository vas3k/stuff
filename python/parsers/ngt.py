# -*- coding: utf-8 -*-
import json
import urllib2
from datetime import datetime, timedelta

STATIONS = {
    u"MARKS": u"Площадь Маркса",
    u"STUD": u"Студенческая",
    u"RECHV": u"Речной Вокзал",
    u"OKT": u"Октябрьская",
    u"LENIN": u"Площадь Ленина",
    u"KR-PR": u"Красный Проспект",
    u"GAGAR": u"Гагаринская",
    u"ZAELC": u"Заельцовская",
    u"POKR": u"Покрышкина",
    u"BEREZ": u"Березовая Роща",
    u"NIVA": u"Золотая Нива",
    u"G-M": u"Гарина-Михайловского",
}
T_KARTA_CREDIT_URL = "https://t-karta.ru/ek/SitePages/TransportServicePage.aspx?functionName=GetCardCreditHistory&pan=%(pan)s&dateFrom=%(dateFrom)s&dateTo=%(dateTo)s"
T_KARTA_CHECK_URL = "https://t-karta.ru/ek/SitePages/TransportServicePage.aspx?functionName=GetCardTripsHistory&pan=%(pan)s&dateFrom=%(dateFrom)s&dateTo=%(dateTo)s"
T_KARTA_INFO_URL = "https://t-karta.ru/ek/SitePages/TransportServicePage.aspx?functionName=GetCardInfo&pan=%(pan)s&dateFrom=%(dateFrom)s&dateTo=%(dateTo)s"
T_KARTA_COOKIE_STR = "ASP.NET_SessionId=%(session_id)s; tcard_ek_pan=%(card_number)s"


def ngt_balance(number, session):
    opener = urllib2.build_opener()
    opener.addheaders.append(("Cookie", T_KARTA_COOKIE_STR % {
        "session_id": session,
        "card_number": number,
    }))
    opener.addheaders.append(("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.99 Safari/537.22"))
    opener.addheaders.append(("Referer", "https://t-karta.ru/ek/SitePages/default.aspx"))

    result = json.loads(opener.open(T_KARTA_INFO_URL % {
        "pan": number,
        "dateFrom": (datetime.now() - timedelta(days=7)).strftime("%d.%m.%Y"),
        "dateTo": datetime.now().strftime("%d.%m.%Y"),
    }).read())

    return result.get("CardSum", 0) / 100.0


def ngt_trips(number, session):
    opener = urllib2.build_opener()
    opener.addheaders.append(("Cookie", T_KARTA_COOKIE_STR % {
        "session_id": session,
        "card_number": number,
    }))
    opener.addheaders.append(("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.99 Safari/537.22"))
    opener.addheaders.append(("Referer", "https://t-karta.ru/ek/SitePages/default.aspx"))

    return json.loads(opener.open(T_KARTA_CHECK_URL % {
        "pan": number,
        "dateFrom": (datetime.now() - timedelta(days=10)).strftime("%d.%m.%Y"),
        "dateTo": datetime.now().strftime("%d.%m.%Y"),
    }).read())["TripsHistory"]


def ngt_credits(number, session):
    opener = urllib2.build_opener()
    opener.addheaders.append(("Cookie", T_KARTA_COOKIE_STR % {
        "session_id": session,
        "card_number": number,
    }))
    opener.addheaders.append(("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.99 Safari/537.22"))
    opener.addheaders.append(("Referer", "https://t-karta.ru/ek/SitePages/default.aspx"))

    return json.loads(opener.open(T_KARTA_CREDIT_URL % {
        "pan": number,
        "dateFrom": (datetime.now() - timedelta(days=10)).strftime("%d.%m.%Y"),
        "dateTo": datetime.now().strftime("%d.%m.%Y"),
    }).read())["CreditHistory"]
