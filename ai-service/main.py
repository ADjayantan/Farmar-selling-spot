from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import datetime

app = FastAPI(title="FARM'O CONNECT AI Microservice")

class DemandRequest(BaseModel):
    crop: str
    region: str
    quantity: Optional[int] = None
    month: Optional[str] = None

class DemandResponse(BaseModel):
    demandLevel: str
    suggestedPriceRange: str
    confidence: str
    shortExplanation: str

class RouteRequest(BaseModel):
    pickup: str
    destination: str
    vehicleType: str
    loadKg: int

class RouteResponse(BaseModel):
    estimatedDistance: float
    estimatedDuration: float
    suggestedFare: float
    routeSummary: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/forecast/demand", response_model=DemandResponse)
def forecast_demand(req: DemandRequest):
    # Deterministic demo logic
    crop = req.crop.lower()
    if "rice" in crop or "paddy" in crop:
        return DemandResponse(
            demandLevel="HIGH",
            suggestedPriceRange="₹2100 - ₹2400 per quintal",
            confidence="85%",
            shortExplanation="High demand driven by upcoming festival season and lower local stockpiles."
        )
    elif "tomato" in crop:
        return DemandResponse(
            demandLevel="MEDIUM",
            suggestedPriceRange="₹20 - ₹35 per kg",
            confidence="70%",
            shortExplanation="Steady demand, moderate supply from neighboring regions."
        )
    else:
        return DemandResponse(
            demandLevel="LOW",
            suggestedPriceRange="Varies",
            confidence="60%",
            shortExplanation="Current market trends indicate sufficient supply and lower buyer interest."
        )

@app.post("/route/recommendation", response_model=RouteResponse)
def route_recommendation(req: RouteRequest):
    # Deterministic demo logic
    dist = 348.0
    dur = 6.5
    if "Thanjavur" in req.pickup and "Chennai" in req.destination:
        dist = 348.0
        dur = 390.0 # 6.5 hours in mins
    elif "Trichy" in req.pickup:
        dist = 330.0
        dur = 360.0
    
    # Fare logic
    base_fare = 1500
    per_km = 20.0
    if req.loadKg > 2000:
        per_km = 30.0
        
    suggested_fare = base_fare + (dist * per_km)
    
    return RouteResponse(
        estimatedDistance=dist,
        estimatedDuration=dur,
        suggestedFare=suggested_fare,
        routeSummary=f"Fastest route via NH38. Expected traffic around destination."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
