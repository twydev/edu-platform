- Google Cloud SQL setup - https://cloud.google.com/python/django/appengine
- Reference code to connect to GAE DB - https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/appengine/standard_python37/django
- Django install guide - https://www.digitalocean.com/community/tutorials/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-16-04
- Django Basic Tutorial - https://docs.djangoproject.com/en/2.2/intro/tutorial01/
- Django REST Framework quickstart - https://www.django-rest-framework.org/tutorial/quickstart/
- Troubleshoot installation of MySqlClient - https://pypi.org/project/mysqlclient/
- Enable CORS on server - https://www.techiediaries.com/django-cors/
- Django referencing User model - https://wsvincent.com/django-referencing-the-user-model/
- Django Settings References - https://docs.djangoproject.com/en/2.2/ref/settings/
- Django Securing the admin site - https://opensource.com/article/18/1/10-tips-making-django-admin-more-secure

NOTE: BETTER PREPARE A REQUIREMENTS FILE for this project's dependencies
- MySqlClient
- Django REST Framework

NOTE: also need to find a way to serve static files in production environment

remember to use python3 virtual env (initial creation)
- virtualenv -p python3 django-gae

activate virtual env
- . django-gae/bin/activate

deactivate virtual env
- deactivate

activate cloud sql proxy
- ./cloud_sql_proxy -instances="[YOUR_INSTANCE_CONNECTION_NAME]"=tcp:3306

start server
- python manage.py runserver

create new migration files from updated data models
- python manage.py makemigrations [django-app]
- python manage.py migrate

before deploying to production
- set Debug = False in settings
- python manage.py collectstatic

Structure:
```
backendProject/
 |_ cloud_sql_proxy (remember to initialise for local dev)
 |_ manage.py
 |
 |_ backendProject/ (Django Server)
 |  |_ settings.py (currently referencing env variables)
 |  |_ .env (configure your own)
 |  |_ ...other scripts...
 |
 |_ backendApp/ (REST API logic)
    |_ migration/
    |_ ...other scripts...

```