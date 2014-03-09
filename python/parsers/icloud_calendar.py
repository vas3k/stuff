# -*- coding: utf-8 -*-
from datetime import datetime, timedelta
from pyicloud import PyiCloudService
from acalendar.models import Calendar, Event

def make_datetime(ical):
    return datetime(year=ical[1], month=ical[2], day=ical[3], hour=ical[4], minute=ical[5])


def icloud_calendar(calendar):
    api = PyiCloudService(calendar.login, calendar.password)
    from_dt = datetime.now()
    to_dt = datetime.now() + timedelta(days=30)
    for event in api.calendar.events(from_dt, to_dt):
        obj, created = Event.objects.get_or_create(
            uniq=event["guid"],
            defaults=dict(
                name=event["title"],
            )
        )
        obj.name = event["title"]
        obj.description = event["pGuid"]
        obj.begin = make_datetime(event["startDate"])
        obj.end = make_datetime(event["endDate"])
        obj.place = event["location"]
        obj.save()
