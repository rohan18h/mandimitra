"""
MandiMitra — Python Data Models
Defines all domain models for Farmers, Crops, Centres, Slots, Bookings, and Audit Logs.
"""

from dataclasses import dataclass, field, asdict
from typing import List, Optional, Dict, Any
from datetime import datetime

@dataclass
class District:
    id: str
    name_mr: str
    name_hi: str
    name_en: str

@dataclass
class Crop:
    id: str
    name_mr: str
    name_hi: str
    name_en: str
    msp_per_quintal: float
    scheme_name: str
    season_start: str
    season_end: str
    max_moisture_pct: float
    max_foreign_matter_pct: float
    icon: str

@dataclass
class ProcurementCentre:
    id: str
    name_mr: str
    name_hi: str
    name_en: str
    district: str
    location: str
    contact_phone: str
    status: str  # 'OPEN', 'DELAYED', 'CLOSED'
    status_reason: str
    last_updated: str
    working_hours: str
    weighing_lines: int
    avg_minutes_per_farmer: int
    daily_capacity_quintals: float
    max_daily_farmers: int
    handled_crops: List[str]
    waiting_estimate_minutes: int

@dataclass
class CapacitySlot:
    id: str
    centre_id: str
    date: str
    time_window: str
    capacity: int
    booked: int
    waitlist: List[str] = field(default_factory=list)

@dataclass
class FarmerProfile:
    id: str
    name: str
    phone: str
    aadhaar_masked: str
    district: str
    taluka: str
    village: str
    land_holding_acres: float
    has_712_extract: bool
    bank_linked_aadhaar: bool

@dataclass
class QualityCheck:
    moisture_pct: float
    foreign_matter_pct: float
    grade: str
    inspector_name: str
    passed: bool
    rejection_reason: Optional[str] = None

@dataclass
class BookingHistoryEntry:
    stage: str
    timestamp: str
    actor_role: str
    note_mr: str
    note_hi: str
    note_en: str

@dataclass
class Booking:
    id: str
    farmer_id: str
    farmer_name: str
    phone: str
    aadhaar_masked: str
    district: str
    centre_id: str
    crop_id: str
    estimated_qty_quintals: float
    date: str
    time_window: str
    slot_id: str
    status: str  # 'BOOKED', 'ARRIVED', 'QUALITY_CHECKED', 'ACCEPTED', 'RECHECK_REQUIRED', 'PAYMENT_INITIATED', 'CANCELLED'
    created_at: str
    quality_check: Optional[Dict[str, Any]] = None
    actual_weight_quintals: Optional[float] = None
    payment_ref: Optional[str] = None
    history: List[Dict[str, Any]] = field(default_factory=list)

@dataclass
class AuditLog:
    id: str
    timestamp: str
    actor_role: str
    actor_name: str
    action: str
    target_id: str
    details: str
