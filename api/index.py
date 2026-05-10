"""
Vercel Serverless Function entry point.
This wraps the FastAPI backend app for Vercel's Python runtime.
"""
import sys
from pathlib import Path

# Add the backend directory to the Python path so imports work
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from server import app  # noqa: E402
