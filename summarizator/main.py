from typing import Union, Optional

from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from db import init_db, Summary, SessionLocal
from summarizer import summarize_pipeline

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class SummaryRequest(BaseModel):
    url: str

class SummaryResponse(BaseModel):
    id: int
    url: str
    summary: Optional[str] = None
    status: str

def process_summary(summary_id: int, url: str):
    db = SessionLocal()
    try:
        # Update status to processing
        summary_item = db.query(Summary).filter(Summary.id == summary_id).first()
        if summary_item:
            summary_item.status = "processing"
            db.commit()
        
        # Run pipeline
        try:
            summary_text = summarize_pipeline(summary_id, url)
            
            # Update with result
            summary_item = db.query(Summary).filter(Summary.id == summary_id).first()
            if summary_item:
                summary_item.summary = summary_text
                summary_item.status = "completed"
                db.commit()
        except Exception as e:
            print(f"Error processing summary {summary_id}: {e}")
            summary_item = db.query(Summary).filter(Summary.id == summary_id).first()
            if summary_item:
                summary_item.status = "failed"
                summary_item.summary = "-"
                db.commit()
    finally:
        db.close()

@app.post("/create", response_model=SummaryResponse)
def create_item(item: SummaryRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        new_item = Summary(url=item.url, status="pending")
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        
        background_tasks.add_task(process_summary, new_item.id, new_item.url)
        
        return {"id": new_item.id, "url": new_item.url, "summary": new_item.summary, "status": new_item.status}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-all-items")
def get_all_items(db: Session = Depends(get_db)):
    items = db.query(Summary).all()
    return items

@app.get("/items/{item_id}", response_model=SummaryResponse)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Summary).filter(Summary.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": item.id, "url": item.url, "summary": item.summary, "status": item.status}
