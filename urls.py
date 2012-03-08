from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    (r'^home/$', 'Test.testApp.views.home'),
    (r'^compiler/$', 'Test.testApp.views.compiler'),
    (r'^compile/$', 'Test.testApp.views.compile'),
    (r'^about/$', 'Test.testApp.views.about'),
    (r'^feedback/$', 'Test.testApp.views.feedback'),
    (r'^ide/$', 'Test.testApp.views.ide'),
    (r'^login/$', 'Test.testApp.views.login'),
    (r'^signup/$', 'Test.testApp.views.signup'),
    (r'^testprogram/$', 'Test.testApp.views.testprogram'),
    (r'^runprogram/$', 'Test.testApp.views.runprogram'),
    (r'^shell/$', 'Test.testApp.views.shell'),
    (r'^initShell/$', 'Test.testApp.views.initShell'),
    (r'^executeShellCommand/$', 'Test.testApp.views.executeShellCommand'),
    (r'^finalizeShell/$', 'Test.testApp.views.finalizeShell'),

    (r'^loadTProjectree/$', 'Test.testApp.views.loadTProjectree'),
    (r'^openFile/$', 'Test.testApp.views.openFile'),
    (r'^saveFile/$', 'Test.testApp.views.saveFile'),
    (r'^compileAndLoad/$', 'Test.testApp.views.compileAndLoad'),
    (r'^runRemoteServer/$', 'Test.testApp.views.runRemoteServer'),
    (r'^deleteFile/$', 'Test.testApp.views.deleteFile'),
    (r'^testColorbox/$', 'Test.testApp.views.testColorbox'),


    # Examples:
    # url(r'^$', 'Test.views.home', name='home'),
    # url(r'^Test/', include('Test.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    ('^admin/', include(admin.site.urls)),
)
