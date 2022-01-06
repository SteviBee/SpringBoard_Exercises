from unittest import TestCase

from app import app
from models import db, User, Post

# TOOD 1/5/22 PM - make test for new functions and routes!!!!

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewTestCase(TestCase):
    """testing the views for the users"""

    def setUp(self):
        """adding test user"""

        User.query.delete()

        user = User(first_name='TESTF', last_name='TESTL')
        db.session.add(user)
        db.session.commit()
        
        self.user_id = user.id

    def tearDown(self):
        """Cleaning up fouled transactions"""

        db.session.rollback()

    def test_homepage(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TESTF', html)
    
    def test_show_user_list(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h1>TESTF TESTL</h1>", html)

    def test_adding_user(self):
        with app.test_client() as client:
            d = {"first": "TESTF2", "last": "TESTL2", "url": "www.google.com"}
            resp = client.post('/users', data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)
            print("CODODOGODOG", resp.status_code)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("TESTF2", html)


# class PostViewTestCase(TestCase):
#     """testing the views for the posts"""

#     def setUp(self):
#         """adding test user"""

#         User.query.delete()
#         Post.query.delete()

#         user = User(first_name='test-first', last_name='test-last')
#         db.session.add(user)
        
#         # get_user = User.query.get_or_404(user.id)

#         post = Post(title='TESTTITLE', content='test_content', user=user)
#         db.session.add(post)
#         db.session.commit()
    
#         self.user_id = user.id 
#         self.post_id = post.id

#     def tearDown(self):
#         """Cleaning up fouled transactions"""

#         db.session.rollback()   

#     # def test_view_create_post(self):
#     #     with app.test_client() as client:
#     #         resp = client.get('/')

#     #         self.assertEqual(resp.status_code, 200)

#     def test_weird(self):
#         self.assertTrue(True)



