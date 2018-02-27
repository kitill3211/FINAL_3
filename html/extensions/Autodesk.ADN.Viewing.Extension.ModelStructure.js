///////////////////////////////////////////////////////////////////////////////
// ModelStructure viewer extension
// by Philippe Leefsma, March 2016
//
///////////////////////////////////////////////////////////////////////////////

AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.ModelStructure = function (viewer, options) {

  Autodesk.Viewing.Extension.call(this, viewer, options);


  var _self = this;
    var _panel = null;
    var _viewer = viewer;
    var _name = null;
    var i = 1000;
  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  _self.load = function() {
      
    console.log('Autodesk.ADN.Viewing.Extension.ModelStructure loaded');
    
      
     viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,_self.getId);
     
       console.log('Autodesk.ADN.Viewing.Extension.PropertyListPanel loaded');
    

    return true;
  }

  ///////////////////////////////////////////////////////////////////
  // A demo task
  //
  ///////////////////////////////////////////////////////////////////
  _self.getId=function(event){
      var dbId = event.dbIdArray[0];
      if(dbId!==undefined){buildModelTree(dbId);};
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  _self.unload = function () {
      
       _panel.setVisible(false);

        _panel.uninitialize();

    console.log('Autodesk.ADN.Viewing.Extension.ModelStructure unloaded');
    return true;
  };

  ///////////////////////////////////////////////////////////////////
  // Recursively builds the model tree
  //
  ///////////////////////////////////////////////////////////////////
  function buildModelTree(dbId){
      var instanceTree = viewer.model.getData().instanceTree;
      //var name = viewer.model.getData().name;
      
      
    function _buildModelTreeRec(node){
       
      instanceTree.enumNodeChildren(dbId,
            function(childId) {

              var childNode = {
                dbId: dbId,
                name: instanceTree.getNodeName(dbId),
               
              };
            var Sid;
                if(dbId%2===1){
                    Sid=(dbId-1)/2;
                     
                }else{
                    Sid=dbId/2;
                     
                }
          
                    console.log(data[Sid].id+' '+dbId);
          _name = data[Sid].name;
         // _panel=new PropertyPanel(_viewer.container,'PropPanel',_name);
           
          
            
        },function(){console.log('((((((((((()))))))))))')});
    };
      _buildModelTreeRec();
      if(_panel){
          _panel.uninitialize();
      }
     
      Autodesk.ADN.Viewing.Extension.ModelStructure.Panel = function(parentContainer,id,title,x,y){
          this.content = document.createElement('div');
          Autodesk.Viewing.UI.DockingPanel.call(this,parentContainer,id,title,{shadow:true});
          
          this.container.style.top = y+'px';
          this.container.style.left = x+'px';
          
          this.container.style.width = 'auto'+20;
          this.container.style.height = '0px';
          this.container.style.resize = 'null';
          
//          this.createScrollContainer({
//              left: false,
//              heightAdjustment: 0,
//              marginTop: 0
//          }); 
        
      }
      
      
      function guid(){
          var d = new Date().getTime();
          
          var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c){
              var r = (d +Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x'?r: (r& 0x7 | 0x8)).toString(16);
          });
          return guid;
      };
      Autodesk.ADN.Viewing.Extension.ModelStructure.Panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
      
      Autodesk.ADN.Viewing.Extension.ModelStructure.Panel.prototype.constructor = Autodesk.ADN.Viewing.Extension.ModelStructure.Panel;
      
      Autodesk.ADN.Viewing.Extension.ModelStructure.Panel.prototype.initialize = function(){
          this.title = this.createTitleBar(this.titleLabel || this.container.id);
          
          this.closer = this.createCloseButton();
          
          this.container.appendChild(this.title);
          this.title.appendChild(this.closer);
         // this.container.appendChild(this.content);
          
          this.initializeMoveHandlers(this.container);
          this.initializeCloseHandler(this.closer);
      };
      
      _panel = new Autodesk.ADN.Viewing.Extension.ModelStructure.Panel(_viewer.container,guid(),_name,30,0);
      _panel.setVisible(true);

    
  }

  ///////////////////////////////////////////////////////////////////
  // Recursively execute task on model tree
  //
  ///////////////////////////////////////////////////////////////////
 
};
Autodesk.ADN.Viewing.Extension.ModelStructure.prototype =
  Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.ModelStructure.prototype.constructor =
  Autodesk.ADN.Viewing.Extension.ModelStructure;

Autodesk.Viewing.theExtensionManager.registerExtension(
  'Autodesk.ADN.Viewing.Extension.ModelStructure',
  Autodesk.ADN.Viewing.Extension.ModelStructure)
