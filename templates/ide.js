
var selectedFileFolderPath;
var selectedFileFolderName;
var currentOpenedFilePath;

var projectName = "userTest";
var projectPath = "/home/abumuslim/PycharmProjects/userTest";

var concurent_project1_Name = "concurent_project1";
var concurent_project1_Path = "/home/abumuslim/PycharmProjects/concurent_project1";

var concurent_project2_Name = "concurent_project2";
var concurent_project2_Path = "/home/abumuslim/PycharmProjects/concurent_project2";

var port = "8081"
var taps = new Array();
var selectedTapPath;

$(document).ready(function()
{
    $('#codeAreaDivID').width(screen.width - 320);

    $('#runButton').click(
        function()
        {
            compileAndLoad();
            runServer();
        });

    $('#openProjectButton').click(
        function()
        {
            /*
            var request = $.ajax(
                {
                    type: "POST",
                    url: "/loadTProjectree/",
                    dataType: "json",
                    accepts: "json",
                    headers:
                    {
                        "X-CSRFToken": getCookie('csrftoken')
                    },
                    data:
                    {
                        'projectPath': projectPath,
                        'projectName': projectName
                    },
                    success: function(data)
                    {
                        loadProjectTree(data.htmlCode);
                        refreshTapsHandlers();
                    }
                });
                */
        });

    $('#openProjectButton1').click(
        function()
        {
            var request = $.ajax(
                {
                    type: "POST",
                    url: "/loadTProjectree/",
                    dataType: "json",
                    accepts: "json",
                    headers:
                    {
                        "X-CSRFToken": getCookie('csrftoken')
                    },
                    data:
                    {
                        'projectPath': concurent_project1_Path,
                        'projectName': concurent_project1_Name
                    },
                    success: function(data)
                    {
                        loadProjectTree(data.htmlCode);
                        refreshTreeHandlers();
                    }
                });
        });

    $('#openProjectButton2').click(
        function()
        {
            var request = $.ajax(
                {
                    type: "POST",
                    url: "/loadTProjectree/",
                    dataType: "json",
                    accepts: "json",
                    headers:
                    {
                        "X-CSRFToken": getCookie('csrftoken')
                    },
                    data:
                    {
                        'projectPath': concurent_project2_Path,
                        'projectName': concurent_project2_Name
                    },
                    success: function(data)
                    {
                        loadProjectTree(data.htmlCode);
                        refreshTreeHandlers();
                    }
                });
        });

    $('#saveButton').click(
        function()
        {
            saveFile(selectedTapPath);
        });

    $(".inline_rename").colorbox(
        {
            inline:true,
            width:"500px",
            onOpen: function()
                {
                    //console.log("inside onOpen");
                    var currentName = $('.selected').text();
                    $('#newname').val(currentName);
                }
        });

    $(".iframe_run").colorbox(
        {
            iframe: true,
            width:"80%",
            height: "80%"
        });

});// end of doc.ready event

function changeTheme()
{
    var selectedTheme = $('#selectThemeID').val(); // .options[ $('#selectThemeID').selectedIndex ].innerHTML;
    for(var tapIndx in taps)
    {
        taps[tapIndx].editor.setOption("theme", selectedTheme);
        taps[tapIndx].editor.refresh();
    }
}

function saveFile(filePath)
{
    var fileData = getEditorData(filePath);
    var request = $.ajax(
    {
        type: "POST",
        url: "/saveFile/",
        //dataType: "json",
        accepts: "json",
        headers:
        {
            "X-CSRFToken": getCookie('csrftoken')
        },
        data:
        {
            'filePath': filePath,
            'fileData': fileData
        }
    });
}

function getEditorData(filePath)
{
    for(var tapIndx in taps)
    {
        if(taps[tapIndx].filePath == filePath)
            return taps[tapIndx].editor.getValue();
    }
}


function refreshTapsHandlers()
{
    $('.tap').click(
        function()
        {
            // get clicked filefolderid path
            selectedTapPath = $(this).children('.tap_mid').children('.tapfilefolderid').html();
            activateTap(selectedTapPath);
        });

    $('.tapclosebutton').click(
        function()
        {
            var tapPath = $(this).siblings('.tapfilefolderid').html();

            alert(tapPath);
            // remove tap from taps bar
            $(this).parent().parent().remove();

            //closeTap(tapPath);
        });
}


function closeTap(tapPath)
{
    // 0) save tap
    saveFile(tapPath);

    // 1) delete the textarea
    var textArea = document.getElementById(tapPath);
    $(textArea).remove();

    // 2) delete the editor
    var editor = document.getElementById(tapPath);
    $(editor).remove();


    // delete it from the opened taps
    for(var tapIndx in taps)
    {
        if(taps[tapIndx].filePath == tapPath)
        {
            taps.splice(tapIndx, 1);
            break;
        }
    }

    if(taps.length > 0)
        activateTap(taps[0].filePath);
}

function runServer()
{
    console.log("starting runserver");
    // runserver
    $.ajax(
    {
        type: "POST",
        url: "/runRemoteServer/",
        //dataType: "json",
        accepts: "json",
        headers:
        {
            "X-CSRFToken": getCookie('csrftoken')
        },
        data:
        {
            'port': port
        },
        success: function()
        {
            //console.log("starting success of runserver");
            //$('inline_run').open();
            //console.log("ending success of runserver");
        },
        error: function(e)
        {
            console.log(e);
        }
    });
    console.log("ending runserver");
}

function compileAndLoad()
{
    //console.log("starting compile and load");
    $.ajax(
    {
        type: "POST",
        url: "/compileAndLoad/",
        dataType: "json",
        accepts: "json",
        headers:
        {
            "X-CSRFToken": getCookie('csrftoken')
        },
        data:
        {
            'port': port
        },
        success: function(data)
        {
            //console.log("dah elly rage3: " + data.url);
            //console.log("starting runButton success event");

            //$('.iframe_run').attr("href", data.url);
            $('#koko').attr("href", data.url);

            //console.log("ending runButton success event");
        }
    });
    //console.log("ending compile and load");
}

function loadProjectTree(htmlCode)
{
    $('#projectTreeView').html(htmlCode);
    refreshTreeHandlers();
}

function closeRenameForm()
{
    $.colorbox.close();
}

function renameFile()
{
    var newName = $('#newname').text();
}

function deleteFile()
{
    console.log("started deleting: " + selectedFileFolderPath);
    var request = $.ajax(
    {
        type: "POST",
        url: "/deleteFile/",
        //dataType: "json",
        accepts: "json",
        headers:
        {
            "X-CSRFToken": getCookie('csrftoken')
        },
        data:
        {
            'filePath': selectedFileFolderPath
        },
        success: function()
        {
            refreshProjectTree();
        },
        error: function(e)
        {
            console.log(e);
        }
    });
    console.log("deleting Done!");
}

function activateTap(filePath)
{
    for(var tapIndx in taps)
    {
        deactivateTap(taps[tapIndx].filePath);
    }
    document.getElementById(filePath).style.display = "block";
}

function deactivateTap(filePath)
{
    document.getElementById(filePath).style.display = "none";
}

function tapIsOpened(filePath)
{
    for(var tapIndx in taps)
    {
        if(taps[tapIndx].filePath == filePath)
            return true;
    }
    return false;
}

function addTap(filePath, fileData)
{
    console.log("adding Tap...");
    $('.openedtap').removeClass('openedtap');

    // add tap header
    $('#tapsbody').append(
        '<div class="tap openedtap">' +
            '<div class="tap_left"></div>' +
            '<div class="tap_mid">' +
                '<div class="tapname">' + selectedFileFolderName +'</div>'+
                '<div class="tapclosebutton rounded-corners"> X </div>'+
                '<div class="tapfilefolderid">'+ filePath +'</div>'+
            '</div>'+
            '<div class="tap_right"></div>' +
        '</div>'
    );

    // add new textarea
    var newTabTextarea;
    $('#editors').append(newTabTextarea = $(
        '<textarea id="'+ filePath+"poo" +'">'+
            '#Write your blody code here!'+
        '</textarea>')
    );

    // create new codeMirror object over the new textarea
    var editor = CodeMirror.fromTextArea(document.getElementById(filePath+"poo"),
        {
            lineNumbers: true,
            extraKeys: {"Ctrl-Space": function(cm) {CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);}},
            theme: "night",
            smartIndent: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: true,
            lineWrapping: true,
            gutter: true,
            fixedGutter: true
        });
    editor.setValue(fileData);

    var generatedFormattedEditor = newTabTextarea.next("div");
    generatedFormattedEditor.attr("id", filePath+"poo");

    taps.push({
        'filePath': filePath,
        'editor': editor
        });

    activateTap(filePath);
    refreshTapsHandlers();
}

function getCookie(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie != '')
    {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++)
        {
            var cookie = trim(cookies[i]);

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '='))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function trim(str, chars)
{
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars)
{
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars)
{
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}