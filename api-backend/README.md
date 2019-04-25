- Google Cloud SQL setup - https://cloud.google.com/python/django/appengine
- Reference code to connect to GAE DB - https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/appengine/standard_python37/django
- Django install guide - https://www.digitalocean.com/community/tutorials/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-16-04
- Django Basic Tutorial - https://docs.djangoproject.com/en/2.2/intro/tutorial01/
- Django REST Framework quickstart - https://www.django-rest-framework.org/tutorial/quickstart/
- Troubleshoot installation of MySqlClient - https://pypi.org/project/mysqlclient/

NOTE: BETTER PREPARE A REQUIREMENTS FILE for this project's dependencies

remember to use python3 virtual env
- virtualenv -p python3 django-gae

activate virtual env
- . django-gae/bin/activate

deactivate virtual env
- deactivate


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