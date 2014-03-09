# -*- coding: utf-8 -*-
import re
import json
import urllib2
import oauth2 as oauth
from datetime import datetime, timedelta
from sns.models import SocialNetworkActivity, SocialNetwork


def update_twitter(social):
    endpoint = "https://api.twitter.com/1.1/statuses/user_timeline.json?include_entities=false&include_rts=false&screen_name=%s&count=100" % social.user
    consumer = oauth.Consumer(
        "API_KEY",
        "API_SECRET"
    )
    access_token = oauth.Token(
        key=social.key,
        secret=social.token
    )
    client = oauth.Client(consumer, token=access_token)
    response, data = client.request(endpoint, "GET")
    tweets = json.loads(data)

    for tweet in tweets:
        created_at = datetime.strptime(tweet["created_at"], "%a %b %d %H:%M:%S +0000 %Y") + timedelta(hours=7)
        try:
            tweet["text"] = re.sub("(http://[^ ]+)", lambda x: urllib2.urlopen(x.group(0)).url, tweet["text"])
        except:
            pass

        activity, created = SocialNetworkActivity.objects.get_or_create(
            social=social,
            uniq=tweet["id_str"],
            defaults=dict(
                data=json.dumps(tweet),
                created_at=created_at
            )
        )
