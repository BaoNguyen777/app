#!/usr/bin/env python3
"""
Backend API Testing for Contact Form Submission
Testing contact form API for copywriting portfolio website
"""

import requests
import json
import uuid
import os
from datetime import datetime
from pymongo import MongoClient
import sys

# Configuration
BASE_URL = "https://content-craft-72.preview.emergentagent.com"
API_ENDPOINT = f"{BASE_URL}/api/contact"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "copywriting_portfolio"

def get_db_connection():
    """Get MongoDB database connection"""
    try:
        client = MongoClient(MONGO_URL)
        db = client[DB_NAME]
        return client, db
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        return None, None

def test_valid_contact_submission():
    """Test 1: Valid contact form submission"""
    print("\n🧪 Test 1: Valid Contact Form Submission")
    print("=" * 50)
    
    try:
        # Test data
        test_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@email.com",
            "message": "Hello! I'm interested in your copywriting services for my e-commerce business. Could we schedule a consultation?"
        }
        
        print(f"📤 Sending POST request to: {API_ENDPOINT}")
        print(f"📄 Request data: {json.dumps(test_data, indent=2)}")
        
        # Send request
        response = requests.post(
            API_ENDPOINT,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"📊 Response status: {response.status_code}")
        print(f"📄 Response headers: {dict(response.headers)}")
        
        if response.status_code == 201:
            response_data = response.json()
            print(f"✅ Success response: {json.dumps(response_data, indent=2)}")
            
            # Verify response structure
            assert 'success' in response_data
            assert response_data['success'] is True
            assert 'message' in response_data
            assert 'data' in response_data
            assert 'id' in response_data['data']
            assert 'name' in response_data['data']
            assert 'email' in response_data['data']
            
            submission_id = response_data['data']['id']
            print(f"🆔 Generated submission ID: {submission_id}")
            
            # Verify MongoDB storage
            client, db = get_db_connection()
            if db is not None:
                contact = db.contacts.find_one({"id": submission_id})
                if contact:
                    print("✅ Contact found in MongoDB:")
                    print(f"   - ID: {contact.get('id')}")
                    print(f"   - Name: {contact.get('name')}")
                    print(f"   - Email: {contact.get('email')}")
                    print(f"   - Message: {contact.get('message')}")
                    print(f"   - Status: {contact.get('status')}")
                    print(f"   - CreatedAt: {contact.get('createdAt')}")
                    print(f"   - UpdatedAt: {contact.get('updatedAt')}")
                    
                    # Verify all required fields
                    required_fields = ['id', 'name', 'email', 'message', 'status', 'createdAt', 'updatedAt']
                    for field in required_fields:
                        assert field in contact, f"Missing field: {field}"
                    
                    # Verify UUID format
                    try:
                        uuid.UUID(contact['id'])
                        print("✅ ID is valid UUID format")
                    except ValueError:
                        print("❌ ID is not valid UUID format")
                        return False
                    
                    print("✅ Test 1 PASSED: Valid contact submission works correctly")
                    client.close()
                    return True
                else:
                    print("❌ Contact not found in MongoDB")
                    client.close()
                    return False
            else:
                print("❌ Could not verify MongoDB storage")
                return False
        else:
            print(f"❌ Expected status 201, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test 1 FAILED with error: {e}")
        return False

def test_missing_name():
    """Test 2: Missing name field validation"""
    print("\n🧪 Test 2: Missing Name Field Validation")
    print("=" * 50)
    
    try:
        test_data = {
            "email": "test@email.com",
            "message": "This is a test message"
        }
        
        print(f"📤 Sending POST request with missing name field")
        print(f"📄 Request data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(
            API_ENDPOINT,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"📊 Response status: {response.status_code}")
        
        if response.status_code == 400:
            response_data = response.json()
            print(f"✅ Error response: {json.dumps(response_data, indent=2)}")
            
            assert 'error' in response_data
            print("✅ Test 2 PASSED: Missing name validation works")
            return True
        else:
            print(f"❌ Expected status 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test 2 FAILED with error: {e}")
        return False

def test_missing_email():
    """Test 3: Missing email field validation"""
    print("\n🧪 Test 3: Missing Email Field Validation")
    print("=" * 50)
    
    try:
        test_data = {
            "name": "John Doe",
            "message": "This is a test message"
        }
        
        print(f"📤 Sending POST request with missing email field")
        print(f"📄 Request data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(
            API_ENDPOINT,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"📊 Response status: {response.status_code}")
        
        if response.status_code == 400:
            response_data = response.json()
            print(f"✅ Error response: {json.dumps(response_data, indent=2)}")
            
            assert 'error' in response_data
            print("✅ Test 3 PASSED: Missing email validation works")
            return True
        else:
            print(f"❌ Expected status 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test 3 FAILED with error: {e}")
        return False

def test_missing_message():
    """Test 4: Missing message field validation"""
    print("\n🧪 Test 4: Missing Message Field Validation")
    print("=" * 50)
    
    try:
        test_data = {
            "name": "John Doe",
            "email": "john@email.com"
        }
        
        print(f"📤 Sending POST request with missing message field")
        print(f"📄 Request data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(
            API_ENDPOINT,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"📊 Response status: {response.status_code}")
        
        if response.status_code == 400:
            response_data = response.json()
            print(f"✅ Error response: {json.dumps(response_data, indent=2)}")
            
            assert 'error' in response_data
            print("✅ Test 4 PASSED: Missing message validation works")
            return True
        else:
            print(f"❌ Expected status 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test 4 FAILED with error: {e}")
        return False

def test_invalid_email():
    """Test 5: Invalid email format validation"""
    print("\n🧪 Test 5: Invalid Email Format Validation")
    print("=" * 50)
    
    try:
        test_data = {
            "name": "John Doe",
            "email": "invalid-email-format",
            "message": "This is a test message"
        }
        
        print(f"📤 Sending POST request with invalid email format")
        print(f"📄 Request data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(
            API_ENDPOINT,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"📊 Response status: {response.status_code}")
        
        if response.status_code == 400:
            response_data = response.json()
            print(f"✅ Error response: {json.dumps(response_data, indent=2)}")
            
            assert 'error' in response_data
            print("✅ Test 5 PASSED: Invalid email validation works")
            return True
        else:
            print(f"❌ Expected status 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test 5 FAILED with error: {e}")
        return False

def test_additional_email_formats():
    """Test 6: Additional invalid email formats"""
    print("\n🧪 Test 6: Additional Invalid Email Format Tests")
    print("=" * 50)
    
    invalid_emails = [
        "test@",
        "@domain.com",
        "test@domain",
        "test.domain.com",
        ""
    ]
    
    passed_tests = 0
    total_tests = len(invalid_emails)
    
    for email in invalid_emails:
        try:
            test_data = {
                "name": "Test User",
                "email": email,
                "message": "Test message"
            }
            
            print(f"📤 Testing email: '{email}'")
            
            response = requests.post(
                API_ENDPOINT,
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 400:
                print(f"✅ Email '{email}' correctly rejected")
                passed_tests += 1
            else:
                print(f"❌ Email '{email}' was accepted (status: {response.status_code})")
                
        except Exception as e:
            print(f"❌ Error testing email '{email}': {e}")
    
    if passed_tests == total_tests:
        print("✅ Test 6 PASSED: All invalid email formats correctly rejected")
        return True
    else:
        print(f"❌ Test 6 FAILED: {passed_tests}/{total_tests} invalid emails were correctly rejected")
        return False

def test_database_connection():
    """Test 7: Database connection verification"""
    print("\n🧪 Test 7: Database Connection Verification")
    print("=" * 50)
    
    try:
        client, db = get_db_connection()
        if db:
            # Test database connectivity
            collections = db.list_collection_names()
            print(f"✅ Connected to MongoDB database '{DB_NAME}'")
            print(f"📋 Available collections: {collections}")
            
            # Check if contacts collection exists or can be created
            if 'contacts' not in collections:
                print("📝 Contacts collection doesn't exist yet (will be created on first insert)")
            else:
                count = db.contacts.count_documents({})
                print(f"📊 Contacts collection has {count} documents")
            
            client.close()
            print("✅ Test 7 PASSED: Database connection works")
            return True
        else:
            print("❌ Test 7 FAILED: Could not connect to database")
            return False
            
    except Exception as e:
        print(f"❌ Test 7 FAILED with error: {e}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("\n" + "=" * 70)
    print("🚀 STARTING CONTACT FORM API BACKEND TESTS")
    print("=" * 70)
    print(f"🎯 Target URL: {API_ENDPOINT}")
    print(f"🗄️  Database: {MONGO_URL}/{DB_NAME}")
    print(f"📅 Test started at: {datetime.now().isoformat()}")
    
    # Test results tracking
    tests = [
        ("Database Connection", test_database_connection),
        ("Valid Contact Submission", test_valid_contact_submission),
        ("Missing Name Validation", test_missing_name),
        ("Missing Email Validation", test_missing_email),
        ("Missing Message Validation", test_missing_message),
        ("Invalid Email Validation", test_invalid_email),
        ("Additional Email Format Tests", test_additional_email_formats)
    ]
    
    passed = 0
    failed = 0
    
    for test_name, test_func in tests:
        try:
            if test_func():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ {test_name} failed with unexpected error: {e}")
            failed += 1
    
    # Final summary
    print("\n" + "=" * 70)
    print("📊 TEST SUMMARY")
    print("=" * 70)
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED! Contact form API is working correctly.")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed. Contact form API has issues.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)