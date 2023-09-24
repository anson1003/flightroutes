from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Body, Response
from fastapi.middleware.cors import CORSMiddleware
from mongoengine import connect, Document, StringField, FloatField, IntField, Q
from pydantic import BaseModel, datetime_parse

from model import Airports, Airlines, Routes

app = FastAPI()

# Enable CORS to allow cross-origin requests
origins = [
    "http://localhost",
    "http://localhost:3000",  # Add the port your frontend is running on
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection setup
connect("flightsDB", host="mongodb+srv://byteme:ARKS@cluster0.l1gtqus.mongodb.net/")


# Pydantic models for request and response
class FlightInput(BaseModel):
    class_: Optional[List[str]] = []
    airlines: Optional[List[str]] = []
    routes: List[dict]


class AirlineInput(BaseModel):
    airline: str


class AirportResponse(BaseModel):
    _id: str
    code: str
    lat: float
    lon: float
    name: str
    city: str
    state: str
    country: str
    woeid: int
    icao: str
    direct_flights: int


class AirlineResponse(BaseModel):
    _id: str
    name: str
    ICAO: str
    IATA: str
    callsign: str
    country: str
    flights_last_24_hours: int
    location: str


class AirportRes(BaseModel):
    code: str
    name: str


class AirlineRes(BaseModel):
    name: str
    ICAO: str
    IATA: str


class AirlineRequest(BaseModel):
    airline_code: str


@app.post("/recommend_airline_routes/")
async def recommend_airline_routes(flight_input: AirlineInput):
    response = []

    airline_iata = flight_input.airline  # Get the airline IATA code from the input

    pipeline = [
        {
            '$lookup': {
                'from': 'airlines',
                'localField': 'airline.$id',
                'foreignField': '_id',
                'as': 'airline'
            }
        },
        {
            '$unwind': {
                'path': '$airline'
            }
        },
        {
            '$lookup': {
                'from': 'airports',
                'localField': 'airportFrom.$id',
                'foreignField': '_id',
                'as': 'airportFrom'
            }
        },
        {
            '$unwind': {
                'path': '$airportFrom'
            }
        },
        {
            '$lookup': {
                'from': 'airports',
                'localField': 'airportTo.$id',
                'foreignField': '_id',
                'as': 'airportTo'
            }
        },
        {
            '$unwind': {
                'path': '$airportTo'
            }
        },
        {
            "$match": {
                "airline.IATA": airline_iata
            }
        },
        {
            '$project': {
                '_id': 0,
                'airportFromCode': "$airportFrom.code",
                'airportFromName': "$airportFrom.name",
                'airportToCode': "$airportTo.code",
                'airportToName': "$airportTo.name",
                'common_duration': 1
            }
        }
    ]

    # Execute the aggregation pipeline
    routes = list(Routes.objects.aggregate(*pipeline))
    response.append(routes)

    return response


# Create a route to fetch all airports
@app.get("/airlines/", response_model=List[AirlineRes])
async def get_all_airlines():
    airlines = Airlines.objects.all()

    # Map Airport objects to AirportRes objects, handling null/empty name values
    airline_res_list = [
        AirlineRes(name=airline.name or "Unknown", ICAO=airline.ICAO or "Unknown", IATA=airline.IATA or "Unknown") for
        airline in airlines]

    return airline_res_list


# Create a route to fetch all airports
@app.get("/airports/", response_model=List[AirportRes])
async def get_all_airports():
    airports = Airports.objects.all()

    # Map Airport objects to AirportRes objects, handling null/empty name values
    airport_res_list = [AirportRes(code=airport.code, name=airport.name or "Unknown") for airport in airports]

    return airport_res_list


@app.post("/airport_autocomplete/")
async def airport_autocomplete(search_data: dict):
    search_string = search_data.get("search_string")
    if not search_string:
        raise HTTPException(status_code=400, detail="search_string is required in the request body")

    # Query the database for airports and select only the necessary fields
    airports = Airports.objects.filter(Q(name__icontains=search_string) | Q(code__icontains=search_string)).only('code',
                                                                                                                 'name',
                                                                                                                 'city',
                                                                                                                 'state',
                                                                                                                 'country')[
               :5]

    results = []
    for airport in airports:
        result = AirportRes(
            code=airport.code,
            name=airport.name,
            city=airport.city,
            state=airport.state,
            country=airport.country,
        )
        results.append(result)

    return {"search_string": search_string, "results": results}


@app.get("/airport/{code}", response_model=AirportResponse)
async def get_airport_by_code(code: str):
    airport = Airports.objects(code=code).first()
    if airport:
        return airport
    else:
        raise HTTPException(status_code=404, detail="Airport not found")


@app.get("/airline/{code}", response_model=AirlineResponse)
async def get_airline_by_code(code: str):
    airline = Airlines.objects(IATA=code).first()
    if airline:
        return airline
    else:
        raise HTTPException(status_code=404, detail="Airline not found")


@app.post("/recommend_flights/")
async def recommend_flights(flight_input: FlightInput):
    response = []

    for route_input in flight_input.routes:
        date_str = route_input["date"]  # Get the date as a string
        date = datetime.strptime(date_str, "%Y-%m-%d")  # Parse the string into a datetime object
        departure = route_input["departure"]
        arrival = route_input["arrival"]
        class_field_mapping = {
            "economy": "class_economy",
            "business": "class_business",
            "first": "class_first"
        }

        pipeline = [
            {
                '$lookup': {
                    'from': 'airports',
                    'localField': 'airportFrom.$id',
                    'foreignField': '_id',
                    'as': 'airportFrom'
                }
            },
            {
                '$unwind': {
                    'path': '$airportFrom'
                }
            },
            {
                '$lookup': {
                    'from': 'airports',
                    'localField': 'airportTo.$id',
                    'foreignField': '_id',
                    'as': 'airportTo'
                }
            },
            {
                '$unwind': {
                    'path': '$airportTo'
                }
            },
            {
                '$lookup': {
                    'from': 'airlines',
                    'localField': 'airline.$id',
                    'foreignField': '_id',
                    'as': 'airline'
                }
            },
            {
                '$unwind': {
                    'path': '$airline'
                }
            },
            {
                "$match": {
                    "$and": [
                        {"airportFrom.code": departure},
                        {"airportTo.code": arrival},
                        {f"day{date.weekday() + 1}": 1}
                    ]
                }
            }
        ]

        if flight_input.airlines:  # Check if airlines are provided
            pipeline[-1]["$match"]["airline.IATA"] = {"$in": flight_input.airlines}

        if flight_input.class_:  # Check if class filters are provided
            class_filters = [class_field_mapping.get(cls.lower(), cls.lower()) for cls in flight_input.class_]
            for class_filter in class_filters:
                pipeline[-1]["$match"][class_filter] = 1

        pipeline.append(
            {
                '$project': {
                    '_id': 0,
                    'route_id': 1,
                    'airportFromCode': "$airportFrom.code",
                    'airportFromName': "$airportFrom.name",
                    'airportToCode': "$airportTo.code",
                    'airportToName': "$airportTo.name",
                    'airlineIATA': "$airline.IATA",
                    'airlineName': "$airline.name",
                    'departureData': date_str,
                    'common_duration': 1,

                }
            }
        )

        # Execute the aggregation pipeline
        routes = list(Routes.objects.aggregate(*pipeline))
        response.append(routes)

    return response


# @app.get("/airlines", response_model=list[AirlinesResponse])
# async def get_airlines():
#     # Retrieve specific fields using only()
#     airlines = list(Airlines.objects.only("name", "ICAO", "IATA"))
#     return airlines


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
