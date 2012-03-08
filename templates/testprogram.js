
$(document).ready(function()
    {


    });


function runProgram()
{
    //console.log("Here!");

    var code = $('#shellCodeTextarea').val();
    var input = $('#shellInputTextarea').val();

    console.log( putDelimiterPerLine(code, '$') );
    console.log( "new: " + replaceAll(code, '\n', '$'));

    var request = $.ajax(
        {
            type: "POST",
            url: "/runprogram/",
            dataType: "json",
            accepts: "json",
            headers:
            {
                "X-CSRFToken": getCookie('csrftoken')
            },
            data:
            {
                'code': code,
                'input': input
            },

            success: function(compilationResult)
            {
                if(compilationResult.stderr.length == 0)
                {
                    $('#shellOutputTextarea').val(compilationResult.stdout);
                    $('#response').html('stdout');
                    $('#response').css("background-color", "green");
                }
                else
                {
                    $('#shellOutputTextarea').val(compilationResult.stderr);
                    $('#response').html('stderr');
                    $('#response').css("background-color", "red");
                }
            }
        });

    request.fail( function(jqXHR, textStatus)
    {
        alert(textStatus);
    });
}
