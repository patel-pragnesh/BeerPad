var args = arguments[0] || {};
var beersCollection = Alloy.createCollection('beers');
beersCollection.fetch();

function getImage() {
    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.alloy_id + '.jpg');  
    return f.read();  
}

$.BeerDetail.setTitle(args.title);

$.image.image = getImage();

Alloy.Globals.mapLabelText($, args);

if (OS_IOS) {
    var editButton = Ti.UI.createButton({ title: "Edit" });
    $.BeerDetail.setRightNavButton(editButton);
    
    editButton.addEventListener("click", function (e) {
        args.edit = true;
        var window = Alloy.createController('addBeer', args).getView();
        window.open({
            modal:true,
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });   
    });
}

Ti.App.addEventListener("app:updateBeer", function(e) {
    beersCollection.fetch();
    var test = beersCollection.where({"alloy_id": args.alloy_id})[0].toJSON();
    
    $.BeerDetail.setTitle(test.title);
    
    $.image.image = getImage();
    
    Alloy.Globals.mapLabelText($, test);
    
    args = test;
});