from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from core.config import settings
# Database setup
engine = create_engine(
    settings.DATABASE_URL
)

Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base() #models inherit from base class to create tables in the database

#Get a database session and close it after use
def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()
        
#Create tables in the database
def create_tables():
    Base.metadata.create_all(bind=engine)