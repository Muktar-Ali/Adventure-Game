#Type of data API will be sending to the frontend
#Schemas are structure of data coming in 
from typing import List, Optional, Dict
from datetime import datetime
from pydantic import BaseModel

class StoryOptionsSchema(BaseModel):
    text: str
    node_id: Optional[int] = None

class StoryNodeBase(BaseModel):
    content: str
    is_ending: bool = False
    is_winning_ending: bool = False

class CompleteStoryModeResponse(StoryNodeBase):
    id: int
    options: List[StoryOptionsSchema] = []

    class Config:
        from_attributes = True

class StoryBase(BaseModel):
    title: str
    session_id: Optional[str] = None

    class Config:
        from_attributes = True

class CreateStoryRequest(StoryBase):
    theme: str

class CompleteStoryResponse(StoryBase):
    id: int
    created_at: datetime
    root_node: CompleteStoryModeResponse
    all_nodes: Dict[int, CompleteStoryModeResponse]
    
    class Config:
        from_attributes = True
