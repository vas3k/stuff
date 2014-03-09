# -*- coding: utf-8 -*-
import json
import requests
from datetime import datetime, timedelta
from sns.models import SocialNetworkActivity, SocialNetwork
from metrics.models import Metric


def update_instagram(social):
    feed = requests.get("https://api.instagram.com/v1/users/17522907/media/recent/?access_token=%s" % social.token).json()
    for item in feed["data"]:
        activity, created = SocialNetworkActivity.objects.get_or_create(
            social=social,
            uniq=item["id"],
            defaults=dict(
                data=json.dumps(item),
                created_at=datetime.fromtimestamp(int(item["created_time"]))
            )
        )