# -*- coding: utf-8 -*-
import urllib2
from datetime import datetime
from bs4 import BeautifulSoup
from weather.models import Weather


def gismeteo_weather(city_id):
    page = urllib2.urlopen("http://www.gismeteo.ru/city/hourly/%s/" % city_id).read()
    soup = BeautifulSoup(page)

    temp_elem = soup.select("dd.value.m_temp.c")
    temp = temp_elem[0].contents[0]
    temp = temp.replace(u"\u2212", "-")

    pressure_elem = soup.select("dd.value.m_press.torr")
    pressure = pressure_elem[0].contents[0]

    hum_elem = soup.select("div.wicon.hum")
    humidity = hum_elem[0].contents[0]

    cloudness = soup.select("dl.cloudness > dt.png")
    conditions = cloudness[0].get("title") if cloudness else None
    icon = cloudness[0].get("style")[22:-1] if cloudness else None

    return {
        "conditions": conditions,
        "icon": icon,
        "temperature": float(temp),
        "pressure": float(pressure),
        "humidity": float(humidity)
    }
