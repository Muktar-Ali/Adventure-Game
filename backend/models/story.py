from sqlalchemy import Column, Integer, String, JSON, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base


# Story model representing the main story entity in the database
class Story(Base):
    __tablename__ = "stories"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    session_id = Column(String, index=True)
    content = Column(JSON)  # Store the story content as JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    nodes = relationship("StoryNode", back_populates="story")

class StoryNode(Base):
    __tablename__ = "story_nodes"
    
    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("stories.id"), index=True)
    content = Column(String)
    is_root = Column(Boolean, default=False)  # Flag to indicate if this node is the root of the story
    is_ending = Column(Boolean, default=False)  # Flag to indicate if this node is an ending
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_winning = Column(Boolean, default=False)
    options = Column(JSON, default=list)

    story = relationship("Story", back_populates="nodes")

