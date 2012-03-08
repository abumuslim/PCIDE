
import getpass
import subprocess
import datetime
import os
import StringIO
import sys



def backend_compile (str):
    file = open("__code.py", "w")
    file.write(str)
    file.close()

    os.system("python __code.py 2> __compilationErrors.txt > output.txt")

    compilationErrors = open("__compilationErrors.txt")

    errors = compilationErrors.read()

    if len(errors) >= 1:
        ret = {}
        ret["result"] = errors
        ret["success"] = 0
        return ret

    else:
        file = open("output.txt")
        output  = file.read()

        ret = {}
        ret["result"] = output
        ret["success"] = 1
        return ret


#write = sys.stdout.write # similar to #deine
class Node:
    def getDirectories(self):
        return [(sub, os.path.join(self.location, sub)) for sub in os.listdir(self.location)]

    def extractChildren(self):
        if self.isFolder == True:
            childrenLocations = self.getDirectories()
            for child in childrenLocations:
                self.children.append(Node(child))

    def __init__(self):
        self.children = []
        self.isFolder = False
        self.location = ""
        self.name = ""
        self.isOpened = True
        self.extension = None

    def __init__(self, name_location):
        self.name = name_location[0]
        self.location = name_location[1]
        self.children = []
        self.isFolder = os.path.isdir(self.location)
        self.isOpened = True
        if self.isFolder == False:
            self.extension = os.path.splitext(self.name)[1]
        else:
            self.extension = None


def generateHTML(node, level):
    code = ''
    if(node.extension == '.pyc'
       or node.extension == '.xml'
       or node.name == '.idea'
       or node.name == 'scopes'
       or node.name == 'inspectionProfiles'
       or node.name.endswith('~') == True):
        return code


    elif node.isFolder == False: # leaf/file
        if(node.extension == '.html'):
            fileType = 'html'
        elif (node.extension == '.js'):
            fileType = 'js'
        elif (node.extension == '.css'):
            fileType = 'css'
        elif (node.extension == '.py'):
            fileType = 'py'
        else:
            fileType = 'doc'

        code += "<li class=\"file treeItemFile "+ fileType +"\" fileid=\""+node.location+"\"><span class=\"treefilename>\">"+ node.name +"</span></li>"
        return code

    else: # folder
        code += "<li>"
        code += "<label for=\""+node.name+"\" class=\"treeItemFolder\" >" + node.name + "</label>"
        code += "<input type=\"checkbox\" checked id=\""+ node.name +"\"" + "/>"

        #start of sublist
        code += "<ol>\n"
        node.extractChildren()
        for sub in  node.children:
            code += generateHTML(sub, level+1)
        code += "</ol>\n"
        #end of sublist

        code += "</li>\n"
        return code


def backend_getProjectTree(projectPath, projectName):
    node = Node((projectName, projectPath))

    htmlCode = generateHTML(node, 0)
    return "<ol class=\"tree\">" + htmlCode + "</ol>"


def backend_initShell():
    default_stdout, mystdout
    default_stdout = sys.stdout
    sys.stdout = mystdout = StringIO.StringIO()

def backend_executeShellCommand(command):
    print "inside execute command"
    #default_stdout, mystdout
    default_stdout = sys.stdout
    sys.stdout = mystdout = StringIO.StringIO()
    exec(command, globals(), globals()) # x=1 \n x \n y = x + 1
    sys.stdout = sys.__stdout__
    return mystdout.getvalue()

def backend_finalizeShell():
    global default_stdout, default_stderr
    sys.stdout = default_stdout

def backend_runProgram(code, inputData):
    currentTime = "{0}.py".format(datetime.datetime.now())
    currentTime = currentTime.replace(' ', '')
    codeFile = open(currentTime, "w")
    codeFile.write(code)
    codeFile.close()

    process = subprocess.Popen(["python", currentTime], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    result = process.communicate(input=inputData)
    os.remove(currentTime)
    return {'stdout': result[0], 'stderr': result[1]}


def retrieveFile(filePath): #Nora
    f = open("{0}".format(filePath), "r")
    fileData = f.read(-1)
    return fileData

#rewrite the file in it's path
def backend_saveFile(filePath, fileData):
    f = open("{0}".format(filePath), "w")
    f.write(fileData)
    f.close()

#returns the path of the project of test (UserTest)
def openProject():
    return "/home/{0}/PycharmProjects/userTest".format(getpass.getuser())

#recieve each of fileName, fileLocation
#remove the file from the Test Project path
def backend_deleteFile(filePath):
    os.system("rm {0}".format(filePath))

#recieve each of fileName, fileLocation and the data in file
#do the same functionality of the saveFile(fileName, fileLocation, fileData)
def addFile(fileName, fileLocation, fileData):
    saveFile(fileName, fileLocation, fileData)

#run the server of the UserTest Project
def backend_runRemoteServer(port):
    os.system("python /home/{0}/PycharmProjects/userTest/manage.py runserver {1}".format(getpass.getuser(), port))


#Copy Template (.html) into the destination file in the UserTest project
#Copy View (function Block) into the destination file in the UserTest Project
#Run the server of UserTest project At port 8080
#Retrun the URL of the view generated !
def backend_compileAndLoad(port):
    StrUrl = "http://127.0.0.1:{0}/run/".format(port)
    return StrUrl

