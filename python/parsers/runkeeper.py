# -*- coding: utf-8 -*-
import requests
from datetime import datetime, timedelta
from sns.models import SocialNetworkActivity, SocialNetwork


def update_runkeeper(social):
    activities = requests.get("http://api.runkeeper.com/fitnessActivities?access_token=%s" % social.token).json()
    for activity in activities["items"]:
        id = activity["uri"].replace("/fitnessActivities/", "")
        data = requests.get("http://api.runkeeper.com/fitnessActivities/%s/?access_token=%s" % (id, social.token)).text
        activity, created = SocialNetworkActivity.objects.get_or_create(
            social=social,
            uniq=id,
            defaults=dict(
                data=data,
                created_at=datetime.now()
            )
        )