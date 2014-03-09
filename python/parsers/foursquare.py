# -*- coding: utf-8 -*-
import re
import json
import urllib2
from lxml import etree
from datetime import datetime, timedelta
from sns.models import SocialNetworkActivity


def update_foursquare(social):
    url = urllib2.urlopen("https://feeds.foursquare.com/history/%s?count=20" % social.key)
    tree = etree.fromstring(url.read())

    for placemark in tree.find("Folder").findall("Placemark"):
        text = re.sub(r'@<a href=".*">.*?</a>', "", etree.tostring(placemark.find("description")))
        text = text.replace("<description>", "").replace("</description>", "")
        created_at = datetime.strptime(placemark.find("published").text, "%a, %d %b %y %H:%M:%S +0000") + timedelta(hours=7)
        activity, created = SocialNetworkActivity.objects.get_or_create(
            social=social,
            uniq=created_at.strftime("%Y-%m-%d %H:%M:%S"),
            defaults=dict(
                data=json.dumps({
                    "name": placemark.find("name").text,
                    "text": text,
                    "coordinates": placemark.find("Point").find("coordinates").text
                }),
                created_at=created_at
            )
        )