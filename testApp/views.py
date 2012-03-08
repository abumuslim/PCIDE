# Create your views here.

from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.utils import simplejson
from testApp.backend import backend_compile
from testApp.backend import backend_getProjectTree
from testApp.backend import retrieveFile
from testApp.backend import backend_saveFile
from testApp.backend import backend_compileAndLoad
from testApp.backend import backend_runRemoteServer
from testApp.backend import backend_deleteFile
from testApp.backend import backend_runProgram
from testApp.backend import backend_initShell
from testApp.backend import backend_executeShellCommand
from testApp.backend import backend_finalizeShell

def home(request):
    return render_to_response('mainviews/home.html', context_instance=RequestContext(request))

def compiler(request):
    return render_to_response('mainviews/compiler.html', context_instance=RequestContext(request))

def runprogram(request):
    code = request.REQUEST.get('code', None)
    input = request.REQUEST.get('input', None)

    #print code
    compilationResults = backend_runProgram( code, input )

    # Create response dictionary
    response_dict = {}
    response_dict['stdout'] = compilationResults['stdout']
    response_dict['stderr'] = compilationResults['stderr']

    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def testprogram(request):
    return render_to_response('mainviews/testprogram.html', context_instance=RequestContext(request))


def shell(request):
    return render_to_response('mainviews/shell.html', context_instance=RequestContext(request))

def initShell(request):
    backend_initShell()
    return HttpResponse(simplejson.dumps({}), mimetype='application/json')

def finalizeShell(request):
    backend_finalizeShell()
    return HttpResponse(simplejson.dumps({}), mimetype='application/json')

def executeShellCommand(request):
    command = request.REQUEST.get('command', None)

    executionResponse = backend_executeShellCommand( command )

    # Create response dictionary
    response_dict = {}
    response_dict['executionResponse'] = executionResponse;
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def testtree(request):
    return render_to_response('testtree.html', context_instance=RequestContext(request))

def zoom(request):
    return render_to_response('zoom.html', context_instance=RequestContext(request))

def feedback(request):
    return render_to_response('mainviews/feedback.html', context_instance=RequestContext(request))

def login(request):
    return render_to_response('mainviews/login.html', context_instance=RequestContext(request))

def signup(request):
    return render_to_response('mainviews/signup.html', context_instance=RequestContext(request))

def compile(request):
    code = request.REQUEST.get('code', None)

    #print code
    compilationResults = backend_compile( code )

    # Create response dictionary
    response_dict = {}
    response_dict['result'] = compilationResults['result']
    response_dict['success'] = compilationResults['success']

    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')


def about(request):
    return render_to_response('mainviews/about.html', context_instance=RequestContext(request))

def ide(request):
    return render_to_response('mainviews/ide.html', context_instance=RequestContext(request))

def loadTProjectree(request):
    projectPath = request.REQUEST.get('projectPath', None)
    projectName = request.REQUEST.get('projectName', None)

    htmlCode = backend_getProjectTree(projectPath, projectName)
    response_dict = {}
    response_dict['htmlCode'] = htmlCode
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def openFile(request):
    filePath = request.REQUEST.get('filePath', None)
    filePath = filePath.strip()

    file = retrieveFile(filePath)
    #file = readFile(filePath)
    response_dict = {}
    response_dict['file'] = file
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def saveFile(request):
    filePath = request.REQUEST.get('filePath', None)
    fileData = request.REQUEST.get('fileData', None)
    filePath = filePath.strip()

    backend_saveFile(filePath, fileData)

    response_dict = {}
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def compileAndLoad(request):
    port = request.REQUEST.get('port', None)
    url = backend_compileAndLoad(port)
    response_dict = {}
    response_dict['url'] = url
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def runRemoteServer(request):
    port = request.REQUEST.get('port', None)
    backend_runRemoteServer(port)
    response_dict = {}
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')

def testColorbox(request):
    return render_to_response('testColorbox.html', context_instance=RequestContext(request))

def deleteFile(request):
    filePath = request.REQUEST.get('filePath', None)
    backend_deleteFile(filePath)
    response_dict = {}
    return HttpResponse(simplejson.dumps(response_dict), mimetype='application/json')
