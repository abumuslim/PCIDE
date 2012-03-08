/**
 * Created by PyCharm.
 * User: abumuslim
 * Date: 2/29/12
 * Time: 10:23 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){

    //initShell();

    $('#shellCodeTextarea').keypress(function(e) {
        if(e.keyCode == 13)
        {
            //alert('um here!')
            executeCommand();
        }
    });

});

function executeCommand()
{
    var command = getLastCommand( $('#shellCodeTextarea').val() );

    alert("command: " + command);

    var request = $.ajax(
        {
            type: "POST",
            url: "/executeShellCommand/",
            dataType: "json",
            accepts: "json",
            headers:
            {
                "X-CSRFToken": getCookie('csrftoken')
            },
            data:
            {
                'command': command
            },

            success: function(ret)
            {
                alert("ret: " + ret.executionResponse);

                if(ret.executionResponse.length != 0)
                {
                    var newVal = $('#shellCodeTextarea').val();
                    newVal += ret.executionResponse + "\n";
                    newVal += '>>> ';
                    $('#shellCodeTextarea').val(newVal);
                }
                else
                {
                    var newVal = $('#shellCodeTextarea').val();
                    newVal += '>>> ';
                    $('#shellCodeTextarea').val(newVal);
                }
            }
        });
}

function initShell()
{
    var request = $.ajax(
        {
            type: "POST",
            url: "/initShell/",
            //dataType: "json",
            accepts: "json",
            headers:
            {
                "X-CSRFToken": getCookie('csrftoken')
            },
            data:
            {},

            success: function(ret)
            {}
        });
}

function finalizeShell()
{
    var request = $.ajax(
        {
            type: "POST",
            url: "/finalizeShell/",
            //dataType: "json",
            accepts: "json",
            headers:
            {
                "X-CSRFToken": getCookie('csrftoken')
            },
            data:
            {},

            success: function(ret)
            {}
        });
}

function getLastCommand(textAreaValue)
{
    var lastIndxOfPipes = textAreaValue.lastIndexOf('>');
    return textAreaValue.substring(lastIndxOfPipes+2);
}