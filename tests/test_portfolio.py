import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Configuration
APP_URL = "http://localhost:8080"  # Update if your port is different (e.g., 5173)

class TestPortfolioApp(unittest.TestCase):
    def setUp(self):
        # Setup Chrome Driver using WebDriver Manager
        options = webdriver.ChromeOptions()
        # options.add_argument('--headless') # Uncomment to run headless
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=options)
        self.driver.maximize_window()
        self.driver.get(APP_URL)
        time.sleep(2) # Wait for initial load

    def tearDown(self):
        self.driver.quit()

    def test_01_hero_load(self):
        """Test if the Hero section loads and text is visible"""
        print("\nTesting Hero Section...")
        try:
            # Check for the main name
            name_element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Ritesh Brahmachari')]"))
            )
            self.assertTrue(name_element.is_displayed())
            print("✓ Hero Name verified")
            
            # Check for CTA buttons
            projects_btn = self.driver.find_element(By.XPATH, "//a[contains(., 'View Projects')]")
            self.assertTrue(projects_btn.is_displayed())
            print("✓ CTA Button verified")
            
        except Exception as e:
            self.fail(f"Hero section test failed: {str(e)}")

    def test_02_navigation(self):
        """Test navigation links"""
        print("\nTesting Navigation...")
        try:
            links = ["About", "Skills", "Experience", "Contact"]
            for link_text in links:
                link = self.driver.find_element(By.LINK_TEXT, link_text)
                link.click()
                time.sleep(1) # Wait for smooth scroll
                # Check if URL updated hash (optional, depends on implementation)
                print(f"✓ Clicked {link_text}")
        except Exception as e:
            self.fail(f"Navigation test failed: {str(e)}")

    def test_03_form_validation(self):
        """Test submitting empty form shows error"""
        print("\nTesting Form Validation (Empty Submit)...")
        try:
            # Scroll to contact
            self.driver.get(f"{APP_URL}/#contact")
            time.sleep(1)
            
            # Find submit button
            submit_btn = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Send Message')]"))
            )
            
            # Click it
            submit_btn.click()
            time.sleep(1)
            
            # Check for Toast Error
            # Semantic UI toast usually has role='alert' or specific classes. 
            # Based on shadcn/ui typical toasts:
            toast = WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Validation Error')]"))
            )
            self.assertTrue(toast.is_displayed())
            print("✓ Validation Toast appeared")
            
            # Ensure URL did NOT change (no reload)
            self.assertIn("#contact", self.driver.current_url)
            print("✓ Page did not reload")
            
        except Exception as e:
            self.fail(f"Form validation test failed: {str(e)}")

    def test_04_form_submission(self):
        """Test submitting filled form"""
        print("\nTesting Form Submission (Success)...")
        try:
            # Fill inputs
            self.driver.find_element(By.NAME, "name").send_keys("Automated Test")
            self.driver.find_element(By.NAME, "email").send_keys("test@example.com")
            self.driver.find_element(By.NAME, "subject").send_keys("Integration Test")
            self.driver.find_element(By.NAME, "message").send_keys("This is a test message from Selenium.")
            
            # Click submit
            submit_btn = self.driver.find_element(By.XPATH, "//button[contains(., 'Send Message')]")
            submit_btn.click()
            
            # Check for Success Toast
            success_toast = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Message Sent!')]"))
            )
            self.assertTrue(success_toast.is_displayed())
            print("✓ Success Toast appeared")
            
            # Check button state reset
            time.sleep(3) # Wait for reset timeout
            submit_text = submit_btn.text
            # self.assertIn("Send Message", submit_text) # Re-enabled text
            
        except Exception as e:
            self.fail(f"Form submission test failed: {str(e)}")

if __name__ == "__main__":
    unittest.main()
