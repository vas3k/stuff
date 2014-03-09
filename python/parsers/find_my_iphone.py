# -*- coding: utf-8 -*-
from pyicloud import PyiCloudService
from locations.models import LocationProvider, Location


def icloud_position(login, password, code):
    api = PyiCloudService(login, password)
    return api.devices[code].location()


if __name__ == "__main__":
    items = LocationProvider.objects.filter(service="icloud")
    for item in items:
        location = icloud_position(item.login, item.password, item.code)
        if location:
            Location.create_location(
                provider=item,
                latitude=float(location["latitude"]),
                longitude=float(location["longitude"])
            )
