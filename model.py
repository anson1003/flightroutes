from mongoengine import Document, StringField, FloatField, IntField, DateTimeField, ReferenceField


class Airports(Document):

    code = StringField(required=True)
    lat = FloatField()
    lon = FloatField()
    name = StringField()
    city = StringField()
    state = StringField()
    country = StringField()
    woeid = IntField()
    icao = StringField()
    direct_flights = IntField()
    created_on = DateTimeField()
    modified_on = DateTimeField()

class Airlines(Document):
    name = StringField(required=True)
    ICAO = StringField()
    IATA = StringField()
    callsign = StringField()
    country = StringField()
    flights_last_24_hours = IntField()
    location = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()


class Routes(Document):
    route_id = IntField()  # Use IntField for 'id'
    airportFrom = ReferenceField('Airports', dbref=True)
    airportTo = ReferenceField('Airports', dbref=True)
    airline = ReferenceField('Airlines', dbref=True)
    day1 = IntField()
    day2 = IntField()
    day3 = IntField()
    day4 = IntField()
    day5 = IntField()
    day6 = IntField()
    day7 = IntField()
    class_first = IntField()
    class_business = IntField()
    class_economy = IntField()
    common_duration = IntField()
    min_duration = IntField()
    max_duration = IntField()
    flights_per_week = IntField()
    flights_per_day = IntField()