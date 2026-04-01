from typing import Optional
from datetime import datetime
from pydantic import BaseModel

# Type of data API will be sending to the frontend
class StoryJobBase(BaseModel):
    theme: str

# Type of data API will be receiving from the frontend when creating a new job
class StoryJobRequest(BaseModel):
    theme: str
    status: str
    created_at: datetime
    story_id: Optional[int] = None
    completed_at: Optional[datetime] = None
    error: Optional[str] = None
    
    class Config:
        from_attributes = True



class StoryJobCreate(StoryJobBase):
    pass