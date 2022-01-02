from unittest import TestCase

from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class UserModelTestCase(TestCase):
    """testing models in user test DB"""

    def setUp(self):
        """cleaning up exisiting users"""
        User.query.delete()
    
    def tearDown(self):
        """cleaning up fouled tranactions"""

        db.session.rollback()

    def test_get_full_name(self):
        user = User(first_name='TestF', last_name='TestL')

        self.assertEqual(user.get_full_name(), "TestL, TestF")
    
    # TODO doubel check this is working correctly even tho it passes
    def test_no_name(self):
        User(last_name='TestL')
   
        self.assertRaises(SystemError)
