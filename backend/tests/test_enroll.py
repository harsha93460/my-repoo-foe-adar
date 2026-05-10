import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')

class TestEnrollEndpoint:
    """Test /api/enroll POST endpoint"""

    def test_enroll_success(self):
        resp = requests.post(f"{BASE_URL}/api/enroll", json={
            "name": "Test User",
            "phone": "9876543210",
            "location": "Khajaguda, Hyderabad",
            "course": "Basic 2-Wheeler Riding",
            "message": "Test enrollment"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("success") == True
        assert "message" in data

    def test_enroll_saved_to_db(self):
        """Verify enrollment is saved - check via GET enrollments"""
        # First create
        requests.post(f"{BASE_URL}/api/enroll", json={
            "name": "TEST_DBVerify",
            "phone": "9876543211",
            "location": "Manikonda, Hyderabad",
            "course": "License Preparation",
            "message": ""
        })
        # Verify via GET
        resp = requests.get(f"{BASE_URL}/api/enrollments")
        assert resp.status_code == 200
        enrollments = resp.json()
        names = [e.get("name") for e in enrollments]
        assert "TEST_DBVerify" in names
        created = next((e for e in enrollments if e.get("name") == "TEST_DBVerify"), None)
        assert created is not None
        assert created.get("location") == "Manikonda, Hyderabad"

    def test_enroll_without_optional_message(self):
        resp = requests.post(f"{BASE_URL}/api/enroll", json={
            "name": "Test NoMessage",
            "phone": "9123456789",
            "location": "Kondapur, Hyderabad",
            "course": "Both Courses"
        })
        assert resp.status_code == 200
        assert resp.json().get("success") == True

    def test_enroll_missing_required_fields(self):
        resp = requests.post(f"{BASE_URL}/api/enroll", json={
            "name": "Test Missing",
        })
        assert resp.status_code == 422

    def test_enroll_missing_location(self):
        resp = requests.post(f"{BASE_URL}/api/enroll", json={
            "name": "Test Missing Location",
            "phone": "9988776655",
            "course": "Basic 2-Wheeler Riding",
            "message": "No location provided"
        })
        assert resp.status_code == 422

    def test_api_root(self):
        resp = requests.get(f"{BASE_URL}/api/")
        assert resp.status_code == 200
