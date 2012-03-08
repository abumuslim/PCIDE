
function refreshTreeHandlers()
{
   $('.treeItemFile').click(function()
   {
       console.log("doubleclick");

       var filePath = $(this).attr('fileid');

       currentOpenedFilePath = filePath;
       selectedFileFolderName =  $(this).children("span").text();

       if(tapIsOpened(filePath))
       {
           activateTap(filePath);
       }
       else
       {
           var request = $.ajax(
               {
                   type: "POST",
                   url: "/openFile/",
                   dataType: "json",
                   accepts: "json",
                   headers:
                   {
                       "X-CSRFToken": getCookie('csrftoken')
                   },
                   data:
                   {
                       'filePath': filePath
                   },
                   success: function(file)
                   {
                       addTap(filePath, file.file);
                   }
               });
       }
       selectedTapPath = filePath;
   });
}


/*
 function refreshTreeHandlers()
 {
 $('.treeItemName').click( // Select/highlight
 function()
 {
 selectedFileFolderPath = $(this).children('.file_folder_id').html();
 $('.treeItemName').removeClass("selected");
 $(this).addClass("selected");
 });

 $('.treeItemButton').click(
 function()
 {
 if ($(this).hasClass('opened'))
 {
 $(this).removeClass('opened').addClass('closed');
 $(this).parent().siblings('.subtree').animate({
 opacity: 'toggle'
 }, 200, function() {
 $(this).css('display', 'none');
 });
 }
 else // has class "closed"
 {
 $(this).removeClass('closed').addClass('opened');
 $(this).parent().siblings('.subtree').animate({
 opacity: 'toggle'
 }, 200, function() {
 $(this).css('display', 'block');
 });
 }
 });

 $('.treeItemOpenButton').click(
 function()
 {
 selectedFileFolderPath = $(this).siblings('.file_folder_id').html();
 deleteFolderFromClosedFolders(selectedFileFolderPath);
 //refreshProjectTree();
 });

 } // end of refresh

 */
