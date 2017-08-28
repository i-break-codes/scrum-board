/**
 * scrum-board
 *
 * @category   scrum-board
 * @author     Vaibhav Mehta <vaibhav@decodingweb.com>
 * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0 Beta
 */

var App = function() {
  function init() {
    tips();
    preset();
    addStatusColumns();
    changeStatus();
    draggable();
    droppable();
    openCard();
    createTask();
    closeModal();
    printNotes();
    editTask();
    exitEditMode();
  }
  
  function preset() {
    $('#remove').on('click', function(e) {
      e.preventDefault();
    });
    
    var defaultTask = {
      id: 1,
      title: 'This is a sample task',
      description: 'Sample tasks are useful to get started',
      remote_url: 'https://asana.com/12345/1234',
      assigned_to: 'Jon Doe',
      status: 'pending'
    }
    
    if(!LocalStorage.get('appInitialized', true)) {
      LocalStorage.set('taskCounter', 1);
      LocalStorage.set('status', JSON.stringify([
        {key: 'rejected', value: 'Rejected'}, 
        {key: 'pending', value: 'Pending'}, 
        {key: 'development', value: 'Development'}, 
        {key: 'testing', value: 'Testing'}, 
        {key: 'production', value: 'Production'}]));
      LocalStorage.set('task-1', JSON.stringify(defaultTask));
      LocalStorage.set('appInitialized', true);
    }
  }

  function addStatusColumns(){

    var statusArr = JSON.parse(LocalStorage.get('status'));
    var headerObj = $('header ul');
    var myDashboard = $('#dashboard');
    statusArr.map(function(item){
      var newLi = $('<li>' + item.value + '</li>');
      newLi.attr('data-id', item.key);
      headerObj.append(newLi);

      var newDiv = $('<div id=' + item.key + ' class=' + item.key + '></div>');
      myDashboard.append(newDiv);
    });
    
  }

  function changeStatus(){
    $('header li').on('dblclick', function(e){
        e.preventDefault();
        var statusToChange = $(this).attr('data-id');
        
        $('#change-status-modal').removeClass('hide');

        $('#new_status').val($(this).text());

        $('#change-status-modal').find('form').on('submit', function(e){
            e.preventDefault();
            var newStatus = $('#new_status').val();
            var currentStatus = JSON.parse(LocalStorage.get('status'));
            currentStatus.map(function(obj){
                if(obj.key == statusToChange)
                {
                  obj.value = newStatus;
                }
            });

            $('header ul li[data-id=' + statusToChange + ']').html(newStatus);

            LocalStorage.set('status', JSON.stringify(currentStatus));

            
            $('.close-modal').trigger('click');

        });
    });
  }
  
  function createTask() {
    var source = $("#task-card-template").html();
    var template = Handlebars.compile(source);
    
    $('#add-task').on('click', function(e) {
      e.preventDefault();
      $('#add-task-modal').removeClass('hide');
      
      $('#add-task-modal').find('form').on('submit', function(e) {
        e.preventDefault();
        var obj = {};
        var params = $(this).serialize();
        var splitParams = params.split('&');
        
        for(var i = 0, l = splitParams.length; i < l; i++) {
          var keyVal = splitParams[i].split('=');
          obj[keyVal[0]] = unescape(keyVal[1]);
        }

        // TODO: Add validations
        if(obj.description === '' || obj.title === '') {
          return;
        }
        
        var iid = LocalStorage.get('taskCounter');
        obj.id = ++iid;
        obj.status = 'pending';
        LocalStorage.set('task-' + obj.id, JSON.stringify(obj));
        LocalStorage.set('taskCounter', iid);
        
        var newCard = template([obj]);
        $('#dashboard #' + obj.status).append(newCard);
        draggable();
        
        $('.close-modal').trigger('click');
        
        //Clear form fields after submit
        $(this).find('input[type=text], textarea').val('');
      });
      
    });
  }
  
  function editTask() {
    $(document).on('dblclick', '.card-details', function(e) {
      e.stopPropagation();
      $(this).find('p').attr('contenteditable','true').parents('.card').addClass('edit-mode');
    });
    
    $(document).on('input', '.card p', function() {
      var taskId = $(this).parents('.card').data('task-id');
      var fieldToEdit = $(this).data('field');
      var getTaskData = JSON.parse(LocalStorage.get('task-' + taskId));
      
      getTaskData[fieldToEdit] = $(this).text();
      
      LocalStorage.set('task-' + taskId, JSON.stringify(getTaskData));
    });
  }
  
  function exitEditMode() {
    $(document).on('dblclick', function(e) {
      $('.card').removeClass('edit-mode').find('[contenteditable]').removeAttr('contenteditable');
    });
  }
  
  function closeModal() {
    $('.close-modal').on('click', function() {
      $('.modal').addClass('hide');
    })
  }
  
  function draggable() {
    $('.card').draggable({
      handle: 'h5',
      revert: false,
      helper: function(e) {
        //Cloning element, to enable draggable elements move out of scrollable parent element.
        var original = $(e.target).hasClass("ui-draggable") ? $(e.target) : $(e.target).closest(".ui-draggable");
        return original.clone().css({
          width: original.width()
        });
      },
      scroll: false,
      cursor: 'move',
      start: function(event, ui) {},
      stop: function(event, ui) {}
    });
  }
  
  function droppable() {
    var droppableConfig = {
      tolerance: 'pointer',
      drop: function(event, ui) {
        var elm = ui.draggable,
            parentId = elm.parent().attr('id'),
            currentId = $(this).attr('id'),
            taskId = elm.data('task-id');
        
        if($(this).attr('id') == 'remove') {
          //Deletes task
          elm.remove();
          LocalStorage.remove('task-' + taskId);
          $('#removed-task-notification').text('Task removed successfully').removeClass('hide');
          
          
          setTimeout(function() {
            $('#removed-task-notification').text('').addClass('hide');
          }, 3000);
        } else {
          //Moves task
          if(parentId != currentId) {
            $(elm).detach().removeAttr('style').appendTo(this);
            
            var getTaskData = JSON.parse(LocalStorage.get('task-' + taskId));
            getTaskData.status = currentId;
            
            LocalStorage.set('task-' + taskId, JSON.stringify(getTaskData));
          }
        }
        
        $(this).removeClass('dragged-over');
      },
      over: function(event, ui) {
        $(this).addClass('dragged-over');
      },
      out: function(event, ui) {
        $(this).removeClass('dragged-over');
      }
    }
    
    $('#dashboard > div, #remove').droppable(droppableConfig);
  }
  
  function openCard() {
    $(document).on('click', '.expand-card', function(e) {
      $(this).parent().toggleClass('expanded');
      e.preventDefault();
    });
  }
  
  function getAllNotes() {
    var getAllData = localStorage;
    var getTasks = [];
    
    for(var data in getAllData) {
      if(data.split('-')[0] == 'task') {
        getTasks.push(JSON.parse(localStorage[data]));
      }
    }
    
    return getTasks;
  }
  
  function printNotes() {
    var source = $("#task-card-template").html();
    var template = Handlebars.compile(source);
    
    var status = JSON.parse(LocalStorage.get('status'));
    
    for(var i = 0, l = status.length; i < l; i++) {
      var result = App.getAllNotes().filter(function(obj) {
        return obj.status == status[i].key;
      });
      
      if(result) {
        var cards = template(result);
        $('#dashboard #' + status[i].key).append(cards);
        draggable();
      }
    }
  }
  
  function tips() {
    if(!JSON.parse(LocalStorage.get('showedTip'))) {
      $('#tips').removeClass('hide').addClass('tips');
    }
    
    $('#tips').on('click', function() {
      $(this).addClass('hide');
      LocalStorage.set('showedTip', true);
    });
  }
  
  return {
    init: init,
    getAllNotes: getAllNotes
  }
}();

App.init();