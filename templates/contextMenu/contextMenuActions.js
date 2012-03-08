/**
 * Created by PyCharm.
 * User: nora
 * Date: 2/25/12
 * Time: 2:31 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $('#projectTreeView').contextMenu('projectTreeViewCM',{
            bindings:{
                'open': function(t)
                {
                    alert("you have pressed " + t.id + " action was open");
                },
                'paste': function(t)
                {
                    alert("you have pressed " + t.id + " action was paste");
                },
                'rename':function(t)
                {
                    //$('.inline_run').open();
                    //alert("you have pressed " + t.id + " action was rename");
                }
            },

        menuStyle:
        {
            border: 'none',
            backgroundColor:'white'
        },

        itemStyle:
        {
            fontFamily: 'verdana',
            backgroundColor:'#666',
            color:'yellow',
            border:'3 px'
        },

        itemHoverStyle:
        {
            color:'yellow',
            backgroundColor:'purple',
            border:'1 px'
        }});

    $('#codeAreaDivID').contextMenu("codeAreaCM",{
            menuStyle:{
                border: 'none',
                backgroundColor:'white'
            },
            itemStyle:{
                fontFamily: 'verdana',
                backgroundColor:'#666',
                color:'yellow',
                border:'3 px'
            },
            itemHoverStyle:{
                color:'yellow',
                backgroundColor:'purple',
                border:'1 px'
            }
        }
    );

});
